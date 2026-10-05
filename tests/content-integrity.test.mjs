import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import katex from 'katex';
const require=createRequire(import.meta.url);
const root=new URL('../',import.meta.url);
function load(file){const module={exports:{}};const code=ts.transpileModule(fs.readFileSync(new URL(file,root),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','module','exports',code)(require,module,module.exports);return module.exports;}
const pages=[...load('app/content/course-early.ts').pagesEarly,...load('app/content/course-late.ts').pagesLate];
const equations=pages.flatMap(p=>p.sections.flatMap(s=>s.equations||[]));
const foundations=load('app/content/foundations.ts').foundations;
const notes=Array.from({length:17},(_,n)=>JSON.parse(fs.readFileSync(new URL(`public/notes-data/tab-${n}.json`,root),'utf8')));
test('all 98 original course pages have lessons and source images',()=>{
 assert.deepEqual(pages.map(p=>p.page).sort((a,b)=>a-b),Array.from({length:98},(_,i)=>i+1));
 for(const p of pages){assert.ok(p.title&&p.overview&&p.why&&p.sections.length);assert.ok(fs.existsSync(new URL(`public/course-pages/page-${String(p.page).padStart(3,'0')}.png`,root)));}
 assert.ok(equations.length>=448);
 assert.equal(new Set(equations.map(e=>e.id)).size,equations.length);
 for(const e of equations)assert.ok(e.latex&&e.meaning&&e.derivation.length,`Incomplete equation ${e.id}`);
});
test('all course, foundation and native-document formulas render without KaTeX errors',()=>{
 const formulas=[...equations.map(e=>e.latex),...foundations.flatMap(f=>f.ideas.filter(i=>i.tex).map(i=>i.tex)),...notes.flatMap(t=>t.blocks.flatMap(b=>b.parts.filter(p=>p.math!==undefined).map(p=>p.math)))];
 assert.ok(formulas.length>=815);
 for(const tex of formulas)assert.doesNotThrow(()=>katex.renderToString(tex,{throwOnError:true,strict:false,trust:false}),tex);
});
test('all 3891 note images and 330 native equations are preserved across 17 tabs',()=>{
 const index=JSON.parse(fs.readFileSync(new URL('public/notes-data/index.json',root),'utf8'));
 assert.equal(index.length,17);
 let images=0,math=0;
 for(const t of notes){let ti=0,tm=0;for(const b of t.blocks)for(const p of b.parts){if(p.image){images++;ti++;assert.ok(fs.existsSync(new URL(`public/notes-images/${p.image}.png`,root)),p.image);}if(p.math!==undefined){math++;tm++;}}
 assert.equal(ti,index[t.tab].images);assert.equal(tm,index[t.tab].math);assert.equal(t.blocks.length,index[t.tab].blocks);}
 assert.equal(images,3891);assert.equal(math,330);
});
test('all populated learning-note tabs have source-linked reader guides',()=>{
 const insights={...load('app/content/notes-insights-early.ts').notesInsightsEarly,...load('app/content/notes-insights-late.ts').notesInsightsLate,...load('app/content/notes-insights-extra.ts').notesInsightsExtra};
 for(const i of [0,2,3,4,5,6,7,8,9,10,11,16]){const g=insights[i];assert.ok(g&&g.summary&&g.connections.length&&g.clarifications.length,`Missing guide ${i}`);for(const c of g.clarifications){assert.ok(c.question&&c.answer);assert.ok(c.pages.every(p=>p>=1&&p<=98));}}
});
