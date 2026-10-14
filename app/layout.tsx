import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./atlas.css";
import "katex/dist/katex.min.css";
import "./observatory.css";
import "./daylight.css";
import "./reading.css";
import SiteNav from './SiteNav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
 const requestHeaders=await headers();
 const host=requestHeaders.get('x-forwarded-host')||requestHeaders.get('host')||'localhost:3002';
 const protocol=host.startsWith('localhost')||host.startsWith('127.0.0.1')?'http':'https';
 const imageUrl=`${protocol}://${host}/og.png`;
 return {
  title: "The Holographic Atlas — AdS/CFT from first principles",
  description: "Derive, visualize, and master Gauge/Gravity Duality from QFT and CFT through AdS, supersymmetry, strings, and D-branes.",
  openGraph:{title:'The Holographic Atlas',description:'AdS/CFT, from first principles. Derive, explore and practice.',type:'website',images:[{url:imageUrl,width:1732,height:908,alt:'The Holographic Atlas — AdS/CFT, from first principles.'}]},
  twitter:{card:'summary_large_image',title:'The Holographic Atlas',description:'AdS/CFT, from first principles. Derive, explore and practice.',images:[imageUrl]},
 };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
