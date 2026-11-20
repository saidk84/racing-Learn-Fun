/* Curriculum, mode rules and fair accuracy scoring shared by the offline game and checks. */
const Learning=(()=>{
 const item=(id,label,glyph,color)=>({id,label,glyph:glyph||label,color});
 const worlds=[
  {id:'letters',name:'Alphabet Avenue',topic:'Letters',icon:'ABC',color:'#e9e0ff',description:'Find A to Z, one letter at a time',items:Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ',c=>item(c,`letter ${c}`,c))},
  {id:'colors',name:'Color Garden',topic:'Colors',icon:'🎨',color:'#ffe1eb',description:'Spot and name ten lovely colors',items:[['red','#ef636b'],['blue','#528de0'],['yellow','#f5cf42'],['green','#54b786'],['orange','#f79b4b'],['purple','#a07cdb'],['pink','#ed91b7'],['brown','#a47553'],['black','#36415b'],['white','#ffffff']].map(([c,h])=>item(c,c,'●',h))},
  {id:'numbers',name:'Number Road',topic:'Numbers',icon:'123',color:'#dceffc',description:'Practice numbers from 1 to 100',items:Array.from({length:100},(_,i)=>item(String(i+1),String(i+1)))},
  {id:'animals',name:'Animal Safari',topic:'Animals',icon:'🦁',color:'#def3db',description:'Meet twenty animal friends',items:[['cat','🐱'],['dog','🐶'],['lion','🦁'],['elephant','🐘'],['monkey','🐵'],['rabbit','🐰'],['bear','🐻'],['panda','🐼'],['frog','🐸'],['tiger','🐯'],['pig','🐷'],['cow','🐮'],['fox','🦊'],['mouse','🐭'],['horse','🐴'],['sheep','🐑'],['duck','🦆'],['penguin','🐧'],['butterfly','🦋'],['bee','🐝']].map(([n,g])=>item(n,n,g))},
  {id:'fruits',name:'Fruit Orchard',topic:'Fruits',icon:'🍎',color:'#ffe9ce',description:'Find twelve favorite fruits',items:[['apple','🍎'],['banana','🍌'],['orange','🍊'],['strawberry','🍓'],['grapes','🍇'],['watermelon','🍉'],['pear','🍐'],['pineapple','🍍'],['cherry','🍒'],['peach','🍑'],['lemon','🍋'],['kiwi','🥝']].map(([n,g])=>item(n,n,g))}
 ];
 for(const w of worlds)for(const it of w.items){it.category=w.id;it.voiceKey=`${w.id}-${it.id}`;}
 const mixed={id:'mixed',name:'Mixed Discovery',topic:'Everything',icon:'🧩',color:'#e7e8ff',description:'Letters, colors, numbers, animals and fruits',items:worlds.flatMap(w=>w.items)};
 const cars=[['sunny','Sunny Bug','#ffd264','bug'],['berry','Berry Racer','#ef8cae','sport'],['sky','Sky Coupe','#74c9eb','coupe'],['mint','Mint Camper','#86cdb0','van'],['grape','Grape Rocket','#b5a0e6','formula'],['tangerine','Orange Pickup','#f8a36e','pickup'],['ocean','Ocean Explorer','#5ba3cf','suv'],['cherry','Cherry Firetruck','#e97673','truck'],['lilac','Lilac Limo','#cfade3','limo'],['leaf','Leaf Buggy','#a3c87b','buggy']].map(([id,name,color,shape])=>({id,name,color,shape}));
 const modes=[{id:'preschool',name:'Little Racers',age:'3+',unlockStars:1,icon:'🌱',description:'Gentle clues and happy practice'},{id:'mixed',name:'Mix It Up',age:'ALL',unlockStars:1,icon:'🧩',description:'All five topics in one race'},{id:'challenge',name:'Challenge Circuit',age:'7+',unlockStars:2,icon:'🧠',description:'Logic, collections and sums'},{id:'senior',name:'Senior Speedway',age:'13+',unlockStars:2,icon:'🏁',description:'Quicker rounds and trickier targets'},{id:'free',name:'Free Race',age:'ALL',unlockStars:0,icon:'🏎️',description:'Just drive, collect and explore'}];
 const levelCount=()=>60;
 function plan(world,level,mode='preschool'){
  const safeLevel=Math.max(1,Math.min(60,level)),count=20,round=Math.floor((safeLevel-1)/20),group=world.id==='mixed'?safeLevel-1:Math.floor((safeLevel-1)%20),size=5;
  let pool=Array.from({length:size},(_,j)=>world.items[(group*size+j)%world.items.length]);
  let targets=Array.from({length:10},(_,i)=>pool[(i+round+group)%pool.length]);
  if(world.id==='mixed'){
   targets=Array.from({length:10},(_,i)=>{const topic=worlds[i%worlds.length],practice=Math.floor(i/worlds.length),index=((safeLevel-1)*2+practice)%topic.items.length;return topic.items[index];});
   pool=world.items;
  }
  if(mode==='challenge'&&world.id==='numbers'&&safeLevel%3===1){const parity=safeLevel%2;pool=world.items.filter(i=>Number(i.id)%2===parity).slice(group*size%48,(group*size%48)+size);targets=Array.from({length:10},(_,i)=>pool[(i+round+i)%pool.length]);}
  const speed=mode==='senior'?Math.max(1.05,2.5-safeLevel*.018):mode==='challenge'?Math.max(1.8,3.5-safeLevel*.022):Math.max(3.1,5-round*.65);
  const activity=mode==='challenge'?(['collect','logic','math'][safeLevel%3]):mode==='senior'?(['sequence','logic','math'][safeLevel%3]):'match';
  return {pool,round,targets,seconds:speed,mode,activity,level:safeLevel};
 }
 function result(correct,wrong,missed,mode='preschool'){
  const attempts=correct+wrong+missed,accuracy=attempts?correct/attempts:0,thresholds=mode==='challenge'?[.65,.8,.95]:mode==='senior'?[.7,.85,.95]:[.5,.7,.9];
  const stars=accuracy>=thresholds[2]?3:accuracy>=thresholds[1]?2:accuracy>=thresholds[0]?1:0;
  return {accuracy:Math.round(accuracy*100),score:Math.round(accuracy*1000),stars,starCriteria:thresholds.map(n=>Math.round(n*100))};
 }
 return {worlds,mixed,cars,modes,levelCount,plan,result};
})();
if(typeof module!=='undefined')module.exports=Learning;
