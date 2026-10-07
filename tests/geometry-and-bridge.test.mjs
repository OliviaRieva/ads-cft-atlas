import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import katex from 'katex';
function load(file){const module={exports:{}};const code=ts.transpileModule(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('module','exports',code)(module,module.exports);return module.exports;}
const {quadricPoint,quadricNorm,quadricMetric}=load('lib/geometry.ts');
test('all three embeddings obey their constraints and have the displayed induced metrics',()=>{
 for(const kind of ['ads','ds','hyperbolic'])for(const L of [.6,1,1.6])for(const r of [.1,.45,1.4])for(const a of [0,1,3,6]){
  const p=quadricPoint(kind,L,r,a);
  assert.ok(Math.abs(quadricNorm(kind,p)-(kind==='ds'?1:-1)*L*L)<1e-12);
  const h=1e-5,dr=quadricPoint(kind,L,r+h,a).map((v,i)=>(v-quadricPoint(kind,L,r-h,a)[i])/(2*h)),da=quadricPoint(kind,L,r,a+h).map((v,i)=>(v-quadricPoint(kind,L,r,a-h)[i])/(2*h));
  const metric=quadricMetric(kind,L,r),dot=(v,w)=>-v[0]*w[0]+(kind==='ads'?-1:1)*v[1]*w[1]+v[2]*w[2];
  assert.ok(Math.abs(dot(dr,dr)-metric[0])<1e-7);
  assert.ok(Math.abs(dot(da,da)-metric[1])<1e-7);
  assert.ok(Math.abs(dot(dr,da))<1e-7);
 }
});
test('all twelve dictionary pairs have valid formulas and source-linked explanations',()=>{
 const {bridges}=load('app/content/bridges.ts');
 assert.equal(bridges.length,12);assert.equal(new Set(bridges.map(b=>b.id)).size,12);
 for(const b of bridges){assert.ok(b.connection);for(const side of ['cft','ads']){assert.ok(b[side].steps.length>=2);assert.ok(b[side].page>=1&&b[side].page<=98);assert.doesNotThrow(()=>katex.renderToString(b[side].tex,{throwOnError:true,strict:false}));}}
});
test('expanded questions have valid inline formulas and primary reference links',()=>{
 const {extraQuestions}=load('app/content/questions-extra.ts');
 assert.equal(extraQuestions.length,176);
 assert.ok(extraQuestions.filter(q=>q.reference).length>=75);
 for(const q of extraQuestions){if(q.reference)assert.ok(q.reference.url.startsWith('https://'),q.id);for(const str of [q.prompt,...q.options,q.explanation]){
  assert.equal((str.match(/\$/g)||[]).length%2,0,q.id);
  for(const match of str.matchAll(/\$([^$]+)\$/g))assert.doesNotThrow(()=>katex.renderToString(match[1],{throwOnError:true,strict:'error',trust:false}),q.id+': '+match[1]);
 }}
});
