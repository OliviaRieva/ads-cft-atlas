import {env} from 'cloudflare:workers';
import {getQuizDb} from '../../../db';
import {validateResearchUpdate,writerAuthorized,type ResearchEntry} from '../../../lib/news';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export async function GET(){try{const db=getQuizDb();const entries=await db.prepare('SELECT data FROM research_news ORDER BY event_date DESC, id LIMIT 150').all<{data:string}>();const check=await db.prepare('SELECT checked_at FROM research_checks ORDER BY checked_at DESC LIMIT 1').first<{checked_at:string}>();return Response.json({checkedAt:check?.checked_at??null,entries:entries.results.map(row=>JSON.parse(row.data) as ResearchEntry)},{headers});}catch(error){console.error('Research feed read unavailable',error);return Response.json({error:'Research updates are temporarily unavailable.'},{status:503,headers});}}
export async function POST(request:Request){
 const expected=(env as unknown as {NEWS_WRITER_SHA256?:string}).NEWS_WRITER_SHA256;
 if(!await writerAuthorized(request.headers.get('X-Atlas-News-Writer'),expected))return Response.json({error:'An authorized research updater is required.'},{status:403,headers});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return Response.json({error:'JSON required.'},{status:415,headers});
 const text=await request.text();if(text.length>120000)return Response.json({error:'Update too large.'},{status:413,headers});
 try{const data=validateResearchUpdate(JSON.parse(text)),db=getQuizDb();
  const rows=data.entries.map(e=>db.prepare('INSERT INTO research_news(id,data,event_date,checked_at) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,event_date=excluded.event_date,checked_at=excluded.checked_at WHERE excluded.checked_at>=research_news.checked_at').bind(e.id,JSON.stringify(e),e.latestVersionDate,data.checkedAt));
  rows.push(db.prepare('INSERT INTO research_checks(checked_at,count) VALUES(?,?) ON CONFLICT(checked_at) DO UPDATE SET count=excluded.count').bind(data.checkedAt,data.entries.length));
  await db.batch(rows);return Response.json({saved:data.entries.length,checkedAt:data.checkedAt},{headers});
 }catch(error){if(error instanceof SyntaxError||error instanceof Error&&/Provide|article|field|Authors|dates|URL|Invalid URL/.test(error.message))return Response.json({error:(error as Error).message},{status:400,headers});console.error('Research update failed',error);return Response.json({error:'Could not save the research update; retry later.'},{status:503,headers});}
}
