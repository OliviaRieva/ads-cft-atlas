import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

export const projectRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const outputPath='docs/CONTENT_INDEX.md';

// Load only the repository's authored content modules; no API, credentials or
// original Google Doc downloads are involved in generating the public index.
export function loadContent(root=projectRoot){
 const cache=new Map();
 function load(relative){
  const filename=path.resolve(root,relative);
  if(!filename.startsWith(path.join(root,'app','content')+path.sep))throw new Error('Only authored content modules may be loaded');
  if(cache.has(filename))return cache.get(filename);
  const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const mod={exports:{}};
  const requireContent=name=>{if(!name.startsWith('.'))throw new Error('External content imports are not supported');return load(path.relative(root,path.resolve(path.dirname(filename),name+'.ts')));};
  new Function('require','module','exports',code)(requireContent,mod,mod.exports);
  cache.set(filename,mod.exports);return mod.exports;
 }
 const {readingSections:sections,readingChapters:chapters}=load('app/content/reading.ts');
 const pages=[...load('app/content/course-early.ts').pagesEarly,...load('app/content/course-late.ts').pagesLate];
 const {questions}=load('app/content/questions.ts');
 return {sections,chapters,pages,questions};
}

const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replace(/[\\`*_[\]|]/g,'\\$&').replace(/\r?\n/g,' ');
export function buildIndex({sections,chapters,pages,questions}){
 const mathCount=sections.reduce((n,s)=>n+s.blocks.filter(b=>b.type==='math').length,0);
 const courseEquations=pages.reduce((n,p)=>n+p.sections.reduce((a,s)=>a+(s.equations?.length||0),0),0);
 const lines=['# Content index','','Generated from the authored course, reading and question data. This index changes only when those data change; it contains no daily timestamp or activity counter.','',
  `- ${pages.length} course-page lessons and ${courseEquations} course equation entries.`,
  `- ${sections.length} rewritten reading sections and ${mathCount} native math blocks.`,
  `- ${questions.length} practice questions.`,
  '', 'These are inventory counts, not a certification of mathematical correctness or equation-by-equation source completeness. A math block may contain several equations. The archived Google Doc screenshots are not counted as newly transcribed equations.',
  '', '## Reading chapters','', '| Chapter | Sections | Math blocks |','| --- | ---: | ---: |'];
 for(const chapter of [...new Set(sections.map(s=>s.chapter))].sort((a,b)=>a-b)){
  const chosen=sections.filter(s=>s.chapter===chapter);
  lines.push(`| ${chapter}. ${escape(chapters[chapter])} | ${chosen.length} | ${chosen.reduce((n,s)=>n+s.blocks.filter(b=>b.type==='math').length,0)} |`);
 }
 lines.push('','## Practice topics','','| Topic | Foundation | Applied | Hard | Total |','| --- | ---: | ---: | ---: | ---: |');
 for(const topic of [...new Set(questions.map(q=>q.topic))].sort()){
  const chosen=questions.filter(q=>q.topic===topic);
  lines.push(`| ${escape(topic)} | ${['Foundation','Applied','Hard'].map(d=>chosen.filter(q=>q.difficulty===d).length).join(' | ')} | ${chosen.length} |`);
 }
 lines.push('','## Reading navigation','');
 for(const section of [...sections].sort((a,b)=>a.order-b.order||a.id.localeCompare(b.id))){
  lines.push(`- **${section.chapter} · ${section.side.toUpperCase()}** [${escape(section.title)}](https://holographic-atlas.oliviarieva.chatgpt.site/notes?view=all#${encodeURIComponent(section.id)})`);
 }
 lines.push('','## Editing and verification','','- Edit the source in [`app/content/`](../app/content/), not this generated file.','- Regenerate with `node scripts/maintenance-index.mjs --write`.','- Run `npm test` to check rendering, numerical invariants and quiz behavior.','- See [maintenance controls](MAINTENANCE.md) for the schedule, scope and stop instructions.','');
 return lines.join('\n');
}

export function generationState(root=projectRoot){
 const document=buildIndex(loadContent(root)),filename=path.join(root,outputPath);
 return {document,filename,changed:!fs.existsSync(filename)||fs.readFileSync(filename,'utf8')!==document};
}
export function githubOutput(state){return `changed=${state.changed}\ncontent=${Buffer.from(state.document).toString('base64')}\n`;}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2),state=generationState();
 for(const arg of args)if(!['--write','--check','--github-output'].includes(arg))throw new Error('Unknown argument: '+arg);
 if(args.includes('--write')&&state.changed){fs.mkdirSync(path.dirname(state.filename),{recursive:true});fs.writeFileSync(state.filename,state.document);}
 if(args.includes('--github-output')){
  if(!process.env.GITHUB_OUTPUT)throw new Error('GITHUB_OUTPUT must be set by the runner');
  fs.appendFileSync(process.env.GITHUB_OUTPUT,githubOutput(state));
 }else if(args.includes('--check')){
  console.log(state.changed?'Content index needs regeneration.':'Content index is up to date.');process.exitCode=state.changed?1:0;
 }else if(args.includes('--write'))console.log(state.changed?'Updated '+outputPath:'No content change; nothing written.');
 else process.stdout.write(state.document);
}
