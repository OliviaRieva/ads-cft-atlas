"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export default function SiteNav(){const p=usePathname();return <header className="site-header"><Link href="/" className="brand"><span>∂</span><div>THE HOLOGRAPHIC ATLAS<small>AdS/CFT · FROM FIRST PRINCIPLES</small></div></Link><nav aria-label="Main navigation">{[['/learn','Learn'],['/foundations','Foundations'],['/labs','Explore'],['/quiz','Practice'],['/notes','Your notes']].map(([href,label])=><Link key={href} href={href} className={p===href?'active':''}>{label}</Link>)}</nav><Link className="header-source" href="/sources/lecture-notes-ggd-2021.pdf" target="_blank">GGD notes ↗</Link></header>}
