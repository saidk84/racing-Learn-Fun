const assert=require('node:assert/strict');
const fs=require('node:fs');
const L=require('../src/data.js');
assert.equal(L.cars.length,10);assert.equal(new Set(L.cars.map(c=>c.shape)).size,10);assert.equal(new Set(L.cars.map(c=>c.color)).size,10);
let levels=0;
for(const w of L.worlds){let seen={};for(let n=1;n<=L.levelCount(w);n++){levels++;const p=L.plan(w,n);assert.equal(p.targets.length,10);assert.ok(p.seconds>=2.6);for(const t of p.targets){seen[t.id]=(seen[t.id]||0)+1;assert.ok(fs.existsSync(`assets/audio/${w.id}-${t.id}.mp3`));}}for(const i of w.items)assert.ok(seen[i.id]>=6,`${i.label} repeated in every practice round`);}
assert.equal(levels,105);assert.equal(L.worlds.find(w=>w.id==='numbers').items.length,100);
for(const [c,w,m,stars] of [[0,0,0,0],[4,6,0,0],[5,5,0,1],[7,3,0,2],[9,1,0,3],[10,0,0,3],[4,0,6,0]]){let r=L.result(c,w,m);assert.equal(r.stars,stars);assert.equal(r.score,r.accuracy*10);}
assert.equal(fs.readFileSync('index.html','utf8'),fs.readFileSync('android/app/src/main/assets/index.html','utf8'));
console.log('PASS: 105 levels, complete curriculum repetition, 10 distinct cars, offline voice coverage, accuracy thresholds, identical Android asset');
