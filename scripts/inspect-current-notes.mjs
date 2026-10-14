import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const raw=JSON.parse(await fs.readFile(path.join(root,process.argv[2]||'tmp/notes-current-2026-10-13.json'),'utf8'));
const old=JSON.parse(await fs.readFile(path.join(root,'tmp/notes-ocr.json'),'utf8'));
const ocr=Object.fromEntries(old.map(x=>[x.id,x.text]));
const dir=path.join(root,process.argv[3]||'tmp/notes-current-review');
await fs.mkdir(dir,{recursive:true});
const isGreen=style=>{const c=style?.backgroundColor?.color?.rgbColor;return c&&(c.green||0)>.8&&(c.green||0)>(c.red||0)+.15&&(c.green||0)>(c.blue||0)+.15;};
const result=[];
for(const [ti,tab] of raw.tabs.entries()){
 let paragraphs=[];
 const walk=content=>{for(const b of content||[]){if(b.paragraph)paragraphs.push(b);if(b.table)for(const r of b.table.tableRows||[])for(const c of r.tableCells||[])walk(c.content);}};
 walk(tab.body?.content);
 const blocks=paragraphs.map((b,i)=>{
  const green=b.paragraph.elements.some(e=>isGreen(e.textRun?.textStyle)||isGreen(e.inlineObjectElement?.textStyle));
  const parts=b.paragraph.elements.map(e=>e.textRun?{text:e.textRun.content,green:isGreen(e.textRun.textStyle)}:e.inlineObjectElement?{image:e.inlineObjectElement.inlineObjectId,green:isGreen(e.inlineObjectElement.textStyle),ocr:ocr[e.inlineObjectElement.inlineObjectId]||''}:e.equation?{equation:true}:null).filter(Boolean);
  return {id:i,start:b.startIndex,end:b.endIndex,style:b.paragraph.paragraphStyle?.namedStyleType||'NORMAL_TEXT',green,selected:ti===8||green,parts};
 });
 const selected=blocks.filter(b=>b.selected);
 const imageIds=[...new Set(selected.flatMap(b=>b.parts.filter(p=>p.image).map(p=>p.image)))];
 const images=imageIds.map(id=>{const ob=tab.inlineObjects?.[id]?.inlineObjectProperties?.embeddedObject;return {id,size:ob?.size,uri:ob?.imageProperties?.contentUri,ocr:ocr[id]||'',path:path.join(root,'public/notes-images',`${id.replace(/[^a-zA-Z0-9.-]/g,'_')}.png`)};});
 for(const im of images){try{await fs.access(im.path);im.exists=true;}catch{im.exists=false;}}
 const data={tab:ti,id:tab.tabId,title:tab.title,blocks,images};
 await fs.writeFile(path.join(dir,`tab-${ti}.json`),JSON.stringify(data,null,2));
 const readable=blocks.map(b=>`[${b.id}; ${b.start}:${b.end}${b.selected?'; SELECTED':''}; ${b.style}] `+b.parts.map(p=>p.text??(p.image?` [IMAGE ${p.image}: ${p.ocr||'NEEDS VISUAL READING'}] `:' [NATIVE EQUATION] ')).join('')).join('\n');
 await fs.writeFile(path.join(dir,`tab-${ti}.txt`),`# ${tab.title}\n\n${readable}`);
 const greens=selected.map(b=>`[${b.id}; ${b.start}:${b.end}] `+b.parts.map(p=>p.text??(p.image?` [IMAGE ${p.image}: ${p.ocr||'NEEDS VISUAL READING'}] `:' [NATIVE EQUATION] ')).join('')).join('\n');
 await fs.writeFile(path.join(dir,`selected-${ti}.txt`),`# ${tab.title}\n\n${greens}`);
 result.push({tab:ti,title:tab.title,blocks:blocks.length,selected:selected.length,selectedImages:images.length,missingImages:images.filter(i=>!i.exists).length,nativeEquations:selected.flatMap(b=>b.parts).filter(p=>p.equation).length,selectedTextChars:greens.length});
}
await fs.writeFile(path.join(dir,'index.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
