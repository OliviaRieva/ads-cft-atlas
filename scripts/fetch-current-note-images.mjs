import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const dir=path.join(root,process.argv[2]||'tmp/notes-current-review');
const images=[];
for(let i=2;i<=8;i++){const tab=JSON.parse(await fs.readFile(path.join(dir,`tab-${i}.json`),'utf8'));images.push(...tab.images.filter(x=>!x.exists));}
let cursor=0;const failures=[];
await Promise.all(Array.from({length:6},async()=>{while(cursor<images.length){const im=images[cursor++];try{if(!im.uri)throw Error('No image URI');const r=await fetch(im.uri,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error(`HTTP ${r.status}`);const buf=Buffer.from(await r.arrayBuffer());if(buf.length<50)throw Error('Empty image');await fs.writeFile(im.path,buf);}catch(e){failures.push({id:im.id,error:String(e)});}}}));
await fs.writeFile(path.join(dir,'image-download-failures.json'),JSON.stringify(failures,null,2));
console.log(JSON.stringify({requested:images.length,downloaded:images.length-failures.length,failures}));
