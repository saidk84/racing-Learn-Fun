/* Shared learning content and deterministic progression, also used by tests. */
const Learning = (() => {
 const item=(id,label,glyph,color)=>({id,label,glyph: glyph||label,color});
 const worlds=[
  {id:'letters',name:'Alphabet Avenue',topic:'Letters',icon:'ABC',color:'#e9e0ff',description:'Little letters, big adventures',items:Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ',c=>item(c,`letter ${c}`,c))},
  {id:'colors',name:'Rainbow Road',topic:'Colors',icon:'🌈',color:'#ffe1eb',description:'A wonderful world of colors',items:[['red','#ef636b'],['blue','#528de0'],['yellow','#f5cf42'],['green','#54b786'],['orange','#f79b4b'],['purple','#a07cdb'],['pink','#ed91b7'],['brown','#a47553'],['black','#36415b'],['white','#ffffff']].map(([c,h])=>item(c,c,'●',h))},
  {id:'numbers',name:'Number Highway',topic:'Numbers',icon:'123',color:'#dceffc',description:'Count your way from 1 to 100',items:Array.from({length:100},(_,i)=>item(String(i+1),String(i+1)))},
  {id:'animals',name:'Safari Speedway',topic:'Animals',icon:'🦁',color:'#def3db',description:'Meet your favorite animal friends',items:[['cat','🐱'],['dog','🐶'],['lion','🦁'],['elephant','🐘'],['monkey','🐵'],['rabbit','🐰'],['bear','🐻'],['panda','🐼'],['frog','🐸'],['tiger','🐯'],['pig','🐷'],['cow','🐮'],['fox','🦊'],['mouse','🐭'],['horse','🐴'],['sheep','🐑'],['duck','🦆'],['penguin','🐧'],['butterfly','🦋'],['bee','🐝']].map(([n,g])=>item(n,n,g))},
  {id:'fruits',name:'Fruit Garden',topic:'Fruits',icon:'🍓',color:'#ffe9ce',description:'Pick a basket of fruity favorites',items:[['apple','🍎'],['banana','🍌'],['orange','🍊'],['strawberry','🍓'],['grapes','🍇'],['watermelon','🍉'],['pear','🍐'],['pineapple','🍍'],['cherry','🍒'],['peach','🍑'],['lemon','🍋'],['kiwi','🥝']].map(([n,g])=>item(n,n,g))}
 ];
 const cars=[
 ['sunny','Sunny Bug','#ffd264','bug'],['berry','Berry Racer','#ef8cae','sport'],['sky','Sky Coupe','#74c9eb','coupe'],['mint','Mint Camper','#86cdb0','van'],['grape','Grape Rocket','#b5a0e6','formula'],['tangerine','Orange Pickup','#f8a36e','pickup'],['ocean','Ocean Explorer','#5ba3cf','suv'],['cherry','Cherry Firetruck','#e97673','truck'],['lilac','Lilac Limo','#cfade3','limo'],['leaf','Leaf Buggy','#a3c87b','buggy']
 ].map(([id,name,color,shape])=>({id,name,color,shape}));
 function levelCount(world){return Math.ceil(world.items.length/5)*3;}
 function plan(world,level){const groups=Math.ceil(world.items.length/5),group=(level-1)%groups,round=Math.floor((level-1)/groups);const pool=world.items.slice(group*5,group*5+5);return {pool,round,targets:Array.from({length:10},(_,i)=>pool[(i+round)%pool.length]),seconds:Math.max(2.6,5-round*.7)};}
 function result(correct,wrong,missed){const attempts=correct+wrong+missed;const accuracy=attempts?correct/attempts:0;return {accuracy:Math.round(accuracy*100),score:Math.round(accuracy*1000),stars:accuracy>=.9?3:accuracy>=.7?2:accuracy>=.5?1:0};}
 return {worlds,cars,levelCount,plan,result};
})();
if(typeof module!=='undefined')module.exports=Learning;
