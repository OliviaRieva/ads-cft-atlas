export type ResearchEntry={id:string;title:string;authors:string[];firstSubmitted:string;latestVersionDate:string;status:string;newsType:string;track:string;url:string;headline:string;claim:string;limitations:string;whyUseful:string};
export type ResearchUpdate={checkedAt:string;entries:ResearchEntry[]};
const date=(s:unknown)=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s));
export function validateResearchUpdate(input:unknown):ResearchUpdate{
 const data=input as ResearchUpdate;
 if(!data||!date(data.checkedAt)||data.checkedAt>new Date().toISOString().slice(0,10)||!Array.isArray(data.entries)||data.entries.length>32)throw Error('Provide checkedAt (past/current YYYY-MM-DD) and up to 32 entries.');
 const seen=new Set();
 for(const e of data.entries){
  if(!e||!/^[a-zA-Z0-9._-]{3,100}$/.test(e.id)||seen.has(e.id))throw Error('Each article needs a unique stable ID.');seen.add(e.id);
  for(const key of ['title','status','newsType','track','headline','claim','limitations','whyUseful'] as const)if(typeof e[key]!=='string'||e[key].length<3||e[key].length>3000)throw Error('Invalid field: '+key);
  if(!Array.isArray(e.authors)||!e.authors.length||e.authors.length>60||e.authors.some(a=>typeof a!=='string'||a.length>150))throw Error('Authors required.');
  if(!date(e.firstSubmitted)||!date(e.latestVersionDate)||e.firstSubmitted>e.latestVersionDate||e.latestVersionDate>data.checkedAt)throw Error('Verify publication/revision dates.');
  const url=new URL(e.url);if(url.protocol!=='https:'||!['arxiv.org','doi.org','journals.aps.org','link.springer.com','iopscience.iop.org','scipost.org','www.ias.edu'].includes(url.hostname)||url.username||url.password)throw Error('Use a primary scholarly source URL.');
 }
 return data;
}
export async function writerAuthorized(token:string|null,expected:string|undefined){
 if(!token||!expected||token.length>500)return false;
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))).map(b=>b.toString(16).padStart(2,'0')).join('');
 let diff=hash.length^expected.length;for(let i=0;i<hash.length;i++)diff|=hash.charCodeAt(i)^(expected.charCodeAt(i)||0);return diff===0;
}
