"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import MathFormula from '../Math';
import {foundations} from '../content/foundations';
export default function Foundations(){
 const[query,setQuery]=useState('');
 useEffect(()=>{setQuery(new URLSearchParams(location.search).get('q')||'')},[]);
 const words=query.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w=>w.length>2&&!['and','the','for','with','from'].includes(w));
 const relevant=foundations.filter(f=>!words.length||words.some(w=>(f.title+' '+f.purpose+' '+f.ideas.map(i=>i.title+' '+i.text).join(' ')).toLowerCase().includes(w)));
 return <main className="foundations-page"><div className="eyebrow">BEFORE AND ALONGSIDE THE COURSE</div><h1>The tools behind the equations</h1><p className="page-lead">The mathematical and physical tools used in the derivations.</p><label className="search-label">Find a prerequisite<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. matrix, variation, curvature…"/></label>{query&&<p>{relevant.length} related tools. <button className="secondary" onClick={()=>setQuery('')}>Show all foundations</button></p>}<nav className="foundation-index" aria-label="Foundation topics">{relevant.map(f=><a key={f.id} href={`#${f.id}`}>{f.title}</a>)}</nav>{!relevant.length&&<p>No direct match. Clear the search to browse all tools, or search for a shorter term.</p>}{relevant.map(f=><section className="foundation-section" id={f.id} key={f.id}><div className="eyebrow">FOUNDATION {String(foundations.indexOf(f)+1).padStart(2,'0')}</div><h2>{f.title}</h2><p className="purpose">{f.purpose}</p>{f.ideas.map((idea,j)=><article key={j}><h3>{idea.title}</h3><p>{idea.text}</p>{idea.tex&&<MathFormula tex={idea.tex}/>} {idea.steps&&<ol>{idea.steps.map(s=><li key={s}>{s}</li>)}</ol>}</article>)}<div className="lesson-links">Used in the course: {f.next.map(p=><Link href={`/learn?page=${p}`} key={p}>page {p}</Link>)}</div></section>)}</main>
}
