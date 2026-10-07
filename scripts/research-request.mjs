// Owner-side updater verification utility. Credentials enter hidden stdin only.
import {createHash} from 'node:crypto';
if(process.stdin.isTTY)process.stdin.setRawMode(true);
process.stdout.write('Ready for research request JSON (input hidden).\n');
let buffer='';
process.stdin.on('data',async chunk=>{buffer+=chunk.toString();if(!buffer.includes('\n'))return;process.stdin.pause();try{
 const input=JSON.parse(buffer.trim());
 if(input.mode==='hash'){process.stdout.write(JSON.stringify({hash:createHash('sha256').update(input.token).digest('hex')})+'\n');process.exit(0);}
 const url=new URL(input.path,'https://holographic-atlas.oliviarieva.chatgpt.site');
 if(url.origin!=='https://holographic-atlas.oliviarieva.chatgpt.site')throw Error('Site origin mismatch');
 const response=await fetch(url,{method:input.method||'GET',redirect:'error',headers:{...(input.token?{'X-Atlas-News-Writer':input.token}:{}),...(input.body?{'Content-Type':'application/json'}:{})},...(input.body?{body:JSON.stringify(input.body)}:{})});
 process.stdout.write(JSON.stringify({status:response.status,data:await response.json()})+'\n');process.exit(response.ok?0:1);
 }catch(error){process.stderr.write(String(error.message)+'\n');process.exit(1);}});
