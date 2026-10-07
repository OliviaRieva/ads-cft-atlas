import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import katex from 'katex';
import {createHash} from 'node:crypto';
function load(file){const module={exports:{}};const code=ts.transpileModule(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('module','exports',code)(module,module.exports);return module.exports;}
const {classifyQuadric,sectionAxes,sectionPoint,minkowskiPoint,poincarePoint,sphereArea}=load('lib/quadrics.ts');
test('every sign choice in dimensions zero through ten has a consistent signature and exact section',()=>{
 let count=0;
 for(let D=0;D<=10;D++)for(let mask=0;mask<2**(D+1);mask++)for(const level of [-1,1]){
  const signs=Array.from({length:D+1},(_,i)=>(mask>>i)&1?-1:1),c=classifyQuadric(signs,level,1.2);count++;
  if(c.empty){assert.equal(c.R,null);continue;}
  assert.equal(c.positive+c.negative,D);if(D<2){assert.equal(c.K,null);assert.equal(c.R,0);}
  const ss=sectionAxes(signs).map(i=>signs[i]);for(const sheet of [-1,1]){const pt=sectionPoint(ss,level,1.2,.6,1.1,sheet);assert.ok(Math.abs(pt.reduce((a,x,i)=>a+ss[i]*x*x,0)-level*1.2**2)<1e-10);}
 }assert.equal(count,8188);
});
test('causal maps and spherical measures keep their conventions',()=>{
 for(const t of [-3,0,4])for(const x of [-2,0,3]){const p=minkowskiPoint(t,x,1.3),u=1.3*Math.tan(p.T-p.R),v=1.3*Math.tan(p.T+p.R);assert.ok(Math.abs((u+v)/2-t)<1e-10);assert.ok(Math.abs((v-u)/2-x)<1e-10);}
 const p=poincarePoint(0,0,2);assert.equal(p.z,2);assert.equal(p.t,0);assert.equal(p.A,1);
 assert.ok(Math.abs(poincarePoint(Math.PI/2,0).A)<1e-10);
 assert.ok(Math.abs(sphereArea(2,2)-16*Math.PI)<1e-10);assert.ok(Math.abs(sphereArea(1,2)-4*Math.PI)<1e-10);
});
test('new displayed TeX is intact and renders, with no escaped control characters',()=>{
 for(const file of ['app/geometry/CausalLab.tsx','app/de-sitter/FalloffLab.tsx','app/de-sitter/page.tsx']){
  const source=fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
  assert.doesNotMatch(source,/[\x00-\x08\x0b-\x1f]/);
  for(const m of source.matchAll(/String\.raw`([^`]+)`/g))assert.doesNotThrow(()=>katex.renderToString(m[1],{throwOnError:true,strict:'error'}),m[1]);
 }
 for(const s of load('app/content/research.ts').dsFoundations)for(const tex of s.equations)assert.doesNotThrow(()=>katex.renderToString(tex,{throwOnError:true,strict:false}));
});
test('news validation preserves dates and authorized writer rejects anonymous/incorrect credentials',async()=>{
 const {validateResearchUpdate,writerAuthorized}=load('lib/news.ts'),entries=load('app/content/research.ts').initialResearch;
 assert.equal(validateResearchUpdate({checkedAt:'2026-10-07',entries}).entries.length,9);
 assert.throws(()=>validateResearchUpdate({checkedAt:'2026-10-07',entries:[{...entries[0],latestVersionDate:'2099-01-01'}]}));
 assert.throws(()=>validateResearchUpdate({checkedAt:'2026-10-07',entries:[{...entries[0],url:'javascript:alert(1)'}]}));
 const hash=createHash('sha256').update('test-only-value').digest('hex');
 assert.equal(await writerAuthorized(null,hash),false);assert.equal(await writerAuthorized('wrong',hash),false);assert.equal(await writerAuthorized('test-only-value',hash),true);
});
