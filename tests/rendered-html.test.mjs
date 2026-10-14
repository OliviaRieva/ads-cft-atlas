import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { register } from 'node:module';
register('./cloudflare-loader.mjs',import.meta.url);
const {default:worker}=await import('../dist/server/index.js');

for (const [route,heading] of [
 ["/","Two theories."], ["/learn","Where quantum field theory begins"],
 ["/foundations","The tools behind the equations"], ["/labs","Physics experiments"],
 ["/notes","Follow the connection"], ["/notes/source","Your notes"], ["/correspondence","Different language"], ["/quiz","practice"],
 ["/geometry","What do the signs build?"], ["/de-sitter","de Sitter correspondences"], ["/news","research watch"],
]) {
 test(`production HTML renders ${route}`,async()=>{
  const response=await worker.fetch(new Request(`https://atlas.example${route}`,{headers:{accept:"text/html",host:"atlas.example"}}),{ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},{waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200);
  assert.match(response.headers.get("content-type")||"",/text\/html/);
  const html=await response.text();
  assert.match(html,/The Holographic Atlas/);
  if(route!=="/learn") assert.ok(html.toLowerCase().includes(heading.toLowerCase()),`Missing ${heading}`);
  else { assert.match(html,/GGD page/); assert.match(html,/eq-derivation/); }
  assert.doesNotMatch(html,/codex-preview|react-loading-skeleton|Your site is taking shape/);
  assert.doesNotMatch(html,/class="katex-error"/);
  assert.ok(html.includes('https://atlas.example/og.png'),'Social image URL should use the request host');
 });
}
test("finished site removes loading skeleton dependency",async()=>{
 const pkg=JSON.parse(await readFile(new URL("../package.json",import.meta.url),"utf8"));
 assert.equal(pkg.dependencies["react-loading-skeleton"],undefined);
});
