"use client";
import Link from 'next/link';
import {useEffect,useMemo,useRef,useState} from 'react';
import MathFormula from '../Math';
import {notesDocument,readingChapters,readingSections,readingConnections} from '../content/reading';
import type {ReadingBlock,ReadingSection} from '../content/reading-types';

type Mode='build'|'dictionary'|'branes'|'all';
const modes:{id:Mode;label:string}[]=[{id:'build',label:'Build CFT & AdS'},{id:'dictionary',label:'Chapter 4 · the dictionary'},{id:'branes',label:'Chapter 7 · D3-branes'},{id:'all',label:'All selected notes'}];
const pretty=(s:string)=>readingConnections.find(c=>c.id===s)?.label||s.replaceAll('-',' ');

function Block({block}:{block:ReadingBlock}){
 if(block.type==='math')return <div className="reading-equation"><MathFormula tex={block.tex}/>{block.explain&&<p>{block.explain}</p>}</div>;
 if(block.type==='p')return <p>{block.text}</p>;
 if(block.type==='callout')return <aside className="reading-clarification"><h4>{block.title}</h4><p>{block.text}</p></aside>;
 if(block.type==='steps')return <ol className="reading-steps">{block.items.map((text,i)=><li key={i}>{text}</li>)}</ol>;
 return <ul>{block.items.map((text,i)=><li key={i}>{text}</li>)}</ul>;
}

export default function ReadingRoom(){
 const [mode,setMode]=useState<Mode>('build'),[selected,setSelected]=useState<{concept:string;from:string}|null>(null);
 const root=useRef<HTMLDivElement>(null),[paths,setPaths]=useState<{d:string;start:[number,number];end:[number,number]}[]>([]);
 const [drawing,setDrawing]=useState({width:0,height:0});
 const sections=useMemo(()=>readingSections.filter(s=>mode==='all'||(mode==='build'?s.chapter!==4&&s.chapter!==7:mode==='dictionary'?s.chapter===4:s.chapter===7)),[mode]);
 const lanes={cft:sections.filter(s=>s.side==='cft'),ads:sections.filter(s=>s.side==='ads'),bridge:sections.filter(s=>s.side==='bridge')};
 const matches=selected?sections.filter(s=>s.id!==selected.from&&s.concepts.includes(selected.concept)):[];
 useEffect(()=>{const url=new URL(location.href);const v=url.searchParams.get('view');if(modes.some(m=>m.id===v))setMode(v as Mode);else if(url.searchParams.get('chapter')==='4')setMode('dictionary');else if(url.searchParams.get('chapter')==='7')setMode('branes');else if(url.hash&&readingSections.some(s=>'#'+s.id===url.hash))setMode('all');},[]);
 useEffect(()=>{if(!location.hash)return;requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());},[mode]);
 useEffect(()=>{
  const container=root.current;if(!container)return;
  let frame=0;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const box=container.getBoundingClientRect();setDrawing({width:box.width,height:box.height});
   if(!selected||!selected.concept.startsWith('link:')){setPaths([]);return;}
   const from=container.querySelector<HTMLElement>(`[data-reading-id="${selected.from}"]`);
   if(!from){setPaths([]);return;}
   const origin=from.getBoundingClientRect(),side=from.dataset.side;
   const targets=Array.from(container.querySelectorAll<HTMLElement>('[data-reading-id]')).filter(el=>el!==from&&el.dataset.side!==side&&el.dataset.side!=='bridge'&&sections.find(s=>s.id===el.dataset.readingId)?.concepts.includes(selected.concept));
   const wide=window.innerWidth>900;
   setPaths(targets.slice(0,6).map(el=>{const to=el.getBoundingClientRect();const sx=(wide?(side==='cft'?origin.right:origin.left):origin.right)-box.left;const ex=(wide?(el.dataset.side==='cft'?to.right:to.left):to.right)-box.left;const sy=origin.top-box.top+42,ey=to.top-box.top+42;const bend=wide?box.width/2:box.width-8;return {d:`M${sx},${sy} C${bend},${sy} ${bend},${sy} ${bend},${sy+Math.sign(ey-sy)*28} L${bend},${ey-Math.sign(ey-sy)*28} Q${bend},${ey} ${ex},${ey}`,start:[sx,sy] as [number,number],end:[ex,ey] as [number,number]};}));
  });};
  const ro=new ResizeObserver(update);ro.observe(container);window.addEventListener('resize',update);document.fonts.ready.then(update);update();return()=>{cancelAnimationFrame(frame);ro.disconnect();window.removeEventListener('resize',update);};
 },[selected,sections]);
 const switchMode=(value:Mode)=>{setMode(value);setSelected(null);const url=new URL(location.href);url.searchParams.delete('chapter');url.searchParams.set('view',value);url.hash='';history.replaceState({},'',url);};
 const jump=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 const section=(s:ReadingSection)=><article key={s.id} id={s.id} data-reading-id={s.id} data-side={s.side} className={`reading-section ${selected&&s.concepts.includes(selected.concept)?'reading-linked':''}`}><div className="reading-section-meta"><span>{readingChapters[s.chapter]}</span><a href={`#${s.id}`} aria-label={`Link to ${s.title}`}>§</a></div><h3>{s.title}</h3><p className="reading-lead">{s.lead}</p><div className="reading-blocks">{s.blocks.map((b,i)=><Block key={i} block={b}/>)}</div><div className="reading-concepts">{s.concepts.filter(c=>sections.some(t=>t.id!==s.id&&t.concepts.includes(c))).map(c=><button key={c} aria-pressed={selected?.concept===c&&selected.from===s.id} onClick={()=>setSelected(selected?.concept===c&&selected.from===s.id?null:{concept:c,from:s.id})}>↗ {pretty(c)}</button>)}</div>{selected?.from===s.id&&<div className="reading-related"><span>Related passages · {pretty(selected.concept)}</span>{matches.map(t=><button key={t.id} onClick={()=>jump(t.id)}>{t.side==='ads'?'AdS / strings':t.side==='cft'?'CFT / fields':'Dictionary'} → {t.title}</button>)}</div>}<details className="reading-source"><summary>Source & lecture pages</summary><p>Rewritten from selected Google Doc tab {s.source.tab}; source blocks {s.source.ranges.map(([a,b])=>a===b?a:`${a}–${b}`).join(', ')}. Repeated material is consolidated; physics corrections are marked in the text.</p><div>{s.source.lecturePages.map(p=><Link key={p} href={`/learn?page=${p}`}>GGD p. {p}</Link>)}<a href={notesDocument} target="_blank" rel="noreferrer">Original notes ↗</a></div></details></article>;
 return <main className="reading-room"><header className="reading-hero"><div><span className="eyebrow">YOUR GREEN NOTES · NATIVE EQUATIONS · CHAPTER 7</span><h1>Two theories.<br/><span>Follow the connection.</span></h1><p>Build each theory in its own order. Keep the shared ideas within reach.</p></div><div className="reading-hero-map" aria-label="The CFT lives on the conformal boundary; the gravitational description lives in the AdS bulk"><span>CFT<small>boundary observables</small></span><b>≃</b><span>AdS<small>bulk fields & geometry</small></span><p>One physics. Two descriptions.</p></div></header>
  <div className="reading-essential"><strong>The CFT is on the conformal boundary, not inside the AdS bulk.</strong><span>Its operators encode bulk physics. “Dual” does not mean a second material living in the same space.</span><Link href="/correspondence">See the correspondence ↗</Link></div>
  <nav className="reading-mode" aria-label="Reading sequence">{modes.map(m=><button key={m.id} aria-pressed={mode===m.id} onClick={()=>switchMode(m.id)}>{m.label}</button>)}</nav>
  <details className="reading-contents"><summary>Contents · {sections.length} sections</summary><div>{sections.map(s=><button key={s.id} onClick={()=>jump(s.id)}><small>{s.chapter} · {s.side==='bridge'?'shared':s.side.toUpperCase()}</small>{s.title}</button>)}</div></details>
  {mode==='dictionary'&&<div className="reading-chapter-intro"><span className="eyebrow">CHAPTER 4 · WHY THESE STEPS?</span><h2>Ask on the boundary.<br/>Calculate in the bulk.</h2><p>Choose a source → solve a bulk boundary-value problem → evaluate and renormalize the action → differentiate to recover CFT observables.</p><Link href="/correspondence#boundary-walk">See these steps together ↗</Link></div>}
  {mode==='branes'&&<div className="reading-chapter-intro"><h2>One D3 stack, viewed twice.</h2><p>Follow the open-string and geometric constructions separately. The common parameter map and comparison follow below.</p><Link href="/correspondence#d3-lab">Move the branes and follow the limit ↗</Link></div>}
  <div className="reading-body" ref={root}>
   {!!(lanes.cft.length||lanes.ads.length)&&<div className="reading-columns"><div className="reading-lane reading-cft"><header><span>01 / FIELD THEORY</span><h2>CFT</h2><p>Symmetries, operators, supersymmetry.<br/>Then the open-string construction.</p></header>{lanes.cft.map(section)}</div><div className="reading-lane reading-ads"><header><span>02 / GEOMETRY & STRINGS</span><h2>AdS</h2><p>Curvature, coordinates, bulk fields.<br/>Then the closed-string construction.</p></header>{lanes.ads.map(section)}</div></div>}
   {paths.length>0&&<svg className="reading-routes" width={drawing.width} height={drawing.height} aria-hidden="true"><defs><linearGradient id="reading-bridge-gradient"><stop stopColor="#007a88"/><stop offset=".48" stopColor="#99bba5"/><stop offset="1" stopColor="#8950b3"/></linearGradient><marker id="reading-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="#8950b3"/></marker></defs>{paths.map((p,i)=><g key={i}><path d={p.d} fill="none" stroke="url(#reading-bridge-gradient)" strokeWidth="2.5" markerEnd="url(#reading-arrow)"/><circle cx={p.start[0]} cy={p.start[1]} r="4" fill="#007a88"/></g>)}</svg>}
   {!!lanes.bridge.length&&<section className="reading-shared"><header><span className="eyebrow">THE COMMON LANGUAGE</span><h2>{mode==='dictionary'?'The dictionary, step by step':'Where the two constructions meet'}</h2><p>These passages belong to both sides. They retain their chapter order.</p></header>{lanes.bridge.map(section)}</section>}
  </div>
  {selected&&<aside className="reading-connection-bar" aria-live="polite"><span>Linked idea: <strong>{pretty(selected.concept)}</strong> · {matches.length+1} passages</span><button onClick={()=>jump(selected.from)}>Back to origin ↑</button><button onClick={()=>setSelected(null)} aria-label="Clear linked passages">Clear ×</button></aside>}
  <footer className="reading-footer"><p>Source snapshot: 13 October 2026, including the newly green-highlighted SUSY additions. Selected prose and image equations, plus chapter 7, are rewritten here; duplicate material is consolidated. Source coverage is mapped by passage, not yet by every individual equation occurrence. The source archive preserves the earlier image-based version.</p><Link href="/notes/source">Earlier source archive</Link><a href={notesDocument} target="_blank" rel="noreferrer">Live Google Doc ↗</a><Link href="/correspondence">Interactive correspondence →</Link></footer>
 </main>;
}
