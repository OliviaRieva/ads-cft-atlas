import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildIndex,loadContent,githubOutput} from '../scripts/maintenance-index.mjs';

test('maintenance index is deterministic, linked and contains no artificial activity markers',()=>{
 const data=loadContent(),first=buildIndex(data),second=buildIndex(data);
 assert.equal(first,second);
 assert.match(first,new RegExp(`${data.sections.length} rewritten reading sections`));
 assert.match(first,new RegExp(`${data.questions.length} practice questions`));
 assert.equal((first.match(/notes\?view=all#/g)||[]).length,data.sections.length);
 assert.doesNotMatch(first,/Last (?:updated|checked):|generated at|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/i);
 assert.match(first,/not a certification/);
 assert.notEqual(buildIndex({...data,questions:data.questions.slice(1)}),first);
});
test('maintenance output preserves Unicode and never writes unchecked content into workflow commands',()=>{
 const document='AdS₅ · equation <not HTML>\nline 2';
 const out=githubOutput({changed:true,document});
 const encoded=out.split('\n').find(l=>l.startsWith('content=')).slice(8);
 assert.equal(Buffer.from(encoded,'base64').toString('utf8'),document);
 assert.match(out,/^changed=true\ncontent=[A-Za-z0-9+/=]+\n$/);
});
test('scheduled writes are restricted to a tested generated document; pull requests are read-only',()=>{
 const yaml=fs.readFileSync(new URL('../.github/workflows/daily-maintenance.yml',import.meta.url),'utf8');
 assert.match(yaml,/timezone: Europe\/Copenhagen/);
 assert.match(yaml,/cron: '17 9 \* \* \*'/);
 assert.match(yaml,/contents: read/);
 assert.doesNotMatch(yaml,/pull_request_target|--allow-empty|git push --force|user\.name=Olivia/);
 const writer=yaml.slice(yaml.indexOf('  refresh-index:'));
 assert.match(writer,/needs: checks/);
 assert.match(writer,/github\.event_name == 'schedule'/);
 assert.match(writer,/vars\.ATLAS_MAINTENANCE_PAUSED != 'true'/);
 assert.match(writer,/docs\/CONTENT_INDEX\.md/);
 assert.match(writer,/head\.data\.sha !== process\.env\.TESTED_SHA/);
 assert.doesNotMatch(writer,/actions\/checkout|npm (?:ci|install)|pull-requests: write/);
});

// Exercise the exact isolated writer from the workflow with a mocked GitHub API,
// including concurrent edits. No token, remote repository or network is used.
async function runWriter({head='tested',tree='updated',updateError,document='# Content index\n\nGenerated from the authored course, reading and question data.'}={}){
 const yaml=fs.readFileSync(new URL('../.github/workflows/daily-maintenance.yml',import.meta.url),'utf8');
 const script=yaml.split('          script: |\n')[1].split('\n').map(line=>line.replace(/^ {12}/,'')).join('\n');
 const calls=[],messages=[];
 const response=(method,data)=>async args=>{calls.push({method,args});if(method==='updateRef'&&updateError)throw updateError;return {data};};
 const github={rest:{repos:{getCommit:response('getCommit',{sha:head})},git:{
  getCommit:response('getBase',{tree:{sha:'original'}}),
  createBlob:response('createBlob',{sha:'blob'}),
  createTree:response('createTree',{sha:tree}),
  createCommit:response('createCommit',{sha:'commit'}),
  updateRef:response('updateRef',{})
 }}};
 const core={notice:m=>messages.push(m),warning:m=>messages.push(m)};
 const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
 await new AsyncFunction('github','context','core','process',script)(github,{repo:{owner:'OliviaRieva',repo:'ads-cft-atlas'}},core,{env:{TESTED_SHA:'tested',INDEX_CONTENT:Buffer.from(document).toString('base64')}});
 return {calls,messages};
}
test('writer refuses stale validation before creating any Git objects',async()=>{
 const {calls,messages}=await runWriter({head:'newer'});
 assert.deepEqual(calls.map(c=>c.method),['getCommit']);
 assert.match(messages[0],/main changed/);
});
test('writer creates no commit for an identical tree',async()=>{
 const {calls}=await runWriter({tree:'original'});
 assert.ok(!calls.some(c=>c.method==='createCommit'||c.method==='updateRef'));
});
test('writer changes only the index and never forces over concurrent work',async()=>{
 for(const updateError of [undefined,Object.assign(new Error('not fast-forward'),{status:422})]){
  const {calls,messages}=await runWriter({updateError});
  const tree=calls.find(c=>c.method==='createTree').args;
  assert.equal(tree.base_tree,'original');
  assert.deepEqual(tree.tree,[{path:'docs/CONTENT_INDEX.md',mode:'100644',type:'blob',sha:'blob'}]);
  const commit=calls.find(c=>c.method==='createCommit').args;
  assert.deepEqual(commit.parents,['tested']);
  assert.match(commit.message,/automated/);
  assert.deepEqual(commit.author,{name:'github-actions[bot]',email:'41898282+github-actions[bot]@users.noreply.github.com'});
  assert.deepEqual(commit.committer,commit.author);
  assert.deepEqual(calls.find(c=>c.method==='updateRef').args,{owner:'OliviaRieva',repo:'ads-cft-atlas',ref:'heads/main',sha:'commit',force:false});
  if(updateError)assert.match(messages[0],/no changes were pushed/);
 }
});
test('writer rejects unexpected documents and surfaces genuine API failures',async()=>{
 await assert.rejects(runWriter({document:'Unrelated file'}),/Unexpected generated document/);
 await assert.rejects(runWriter({updateError:Object.assign(new Error('API unavailable'),{status:503})}),/API unavailable/);
});
