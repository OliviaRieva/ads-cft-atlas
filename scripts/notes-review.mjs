import fs from 'node:fs/promises';
const base=new URL('../',import.meta.url);
const data=JSON.parse(await fs.readFile(new URL('tmp/notes-native.json',base),'utf8'));
const ocr=Object.fromEntries(JSON.parse(await fs.readFile(new URL('tmp/notes-ocr.json',base),'utf8')).map(i=>[i.id,i]));
await fs.mkdir(new URL('tmp/notes-review/',base),{recursive:true});
for(const [i,tab] of data.tabs.entries()){
 const text=tab.blocks.map((b,bi)=>`[${bi}] `+b.parts.map(p=>p.text??(p.image?` ⟦${p.image}: ${ocr[p.image]?.text||'VISUAL DIAGRAM / UNRECOGNIZED'}⟧ `:' [NATIVE EQUATION] ')).join('')).join('');
 await fs.writeFile(new URL(`tmp/notes-review/tab-${i}.txt`,base),`# ${tab.title}\n\n${text}`);
}
console.log('17 review texts prepared');
