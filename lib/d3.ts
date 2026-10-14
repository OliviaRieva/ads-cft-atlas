/** D3 lab. Course convention: gYM²=2πgs, lambda=NgYM², L⁴=2 lambda alpha′².
 * Numerical lengths use one fixed reference length; U has its inverse units.
 * Drawn strings are probes, not additional source terms in the geometry.
 */
export type Point2 = [number,number];
export type D3Centre = {u:number;charge:number};
export type D3Parameters = {N:number;lambda:number;alphaPrime:number};
export type D3Model = 'full'|'throat'|'thermal';
export type Observer = {anchor:'U'|'r';position:Point2};
export const clamp=(x:number,a:number,b:number)=>Math.max(a,Math.min(b,x));
export function parameters(p:D3Parameters){
 const L4=2*p.lambda*p.alphaPrime**2;
 return {L4,L:L4**.25,ls:Math.sqrt(p.alphaPrime),gs:p.lambda/(2*Math.PI*p.N),gYM2:p.lambda/p.N,curvature:1/Math.sqrt(2*p.lambda),loop:(p.lambda/(2*Math.PI*p.N))**2};
}
export function centresFor(N:number,positions:number[]):D3Centre[]{
 const n=Math.min(N,positions.length),q=Math.floor(N/n),extra=N%n;
 return positions.slice(0,n).map((u,i)=>({u,charge:q+(i<extra?1:0)}));
}
export function groupedCentres(centres:D3Centre[]){
 const out:D3Centre[]=[];
 for(const c of centres){const found=out.find(x=>Math.abs(x.u-c.u)<1e-7);if(found)found.charge+=c.charge;else out.push({...c});}
 return out.sort((a,b)=>a.u-b.u);
}
export function harmonicU(point:Point2,centres:D3Centre[],p:D3Parameters,includeOne=true){
 const sum=centres.reduce((v,c)=>v+c.charge/Math.max(1e-20,((point[0]-c.u)**2+point[1]**2)**2),0);
 return (includeOne?1:0)+2*p.lambda/(p.N*p.alphaPrime**2)*sum;
}
export function observerU(o:Observer,p:D3Parameters):Point2{return o.anchor==='U'?o.position:[o.position[0]/p.alphaPrime,o.position[1]/p.alphaPrime];}
export function changeAnchor(o:Observer,anchor:Observer['anchor'],p:D3Parameters):Observer{
 const u=observerU(o,p);return {anchor,position:anchor==='U'?u:[u[0]*p.alphaPrime,u[1]*p.alphaPrime]};
}
export function lapse(point:Point2,centres:D3Centre[],p:D3Parameters,model:D3Model='full',horizonU=1){
 if(model==='thermal'){
  const U=Math.hypot(...point);if(U<=horizonU)return NaN;
  const {L}=parameters(p);return p.alphaPrime*U/L*Math.sqrt(1-(horizonU/U)**4);
 }
 return harmonicU(point,centres,p,model==='full')**(-.25);
}
export function frequencyRatio(a:Point2,b:Point2,centres:D3Centre[],p:D3Parameters,model:D3Model='full',horizonU=1){return lapse(a,centres,p,model,horizonU)/lapse(b,centres,p,model,horizonU);}
export function stretchedMass(a:number,b:number){return Math.abs(a-b)/(2*Math.PI);}
export function scaledMetric(U:number,p:D3Parameters,model:D3Model='full',horizonU=1){
 const h=1+2*p.lambda/(p.alphaPrime**2*U**4),c=Math.sqrt(2*p.lambda);
 if(model==='full')return {time:1/(Math.sqrt(h)*p.alphaPrime),space:1/(Math.sqrt(h)*p.alphaPrime),radial:Math.sqrt(h)*p.alphaPrime,sphere:Math.sqrt(h)*p.alphaPrime*U**2};
 const f=model==='thermal'?1-(horizonU/U)**4:1;
 return {time:U**2/c*f,space:U**2/c,radial:c/(U**2*f),sphere:c};
}
export function thermalTemperature(horizonU:number,p:D3Parameters){return horizonU/(Math.PI*Math.sqrt(2*p.lambda));}
/** Embedding of an equatorial spatial 2-slice of the coincident extremal solution.
 * R/L=(rho^4+1)^1/4 and d(Z/L)/dlogrho=sqrt(2rho^4+1)/(rho^4+1)^3/4.
 */
export function throatEmbedding(count=90,minRho=.001,maxRho=3){
 const out:{rho:number;radius:number;height:number}[]=[];let z=0;
 const step=Math.log(maxRho/minRho)/(count-1);
 const slope=(r:number)=>Math.sqrt(2*r**4+1)/(r**4+1)**.75;
 for(let i=0;i<count;i++){const rho=minRho*Math.exp(i*step);if(i)z+=.5*(slope(rho)+slope(out[i-1].rho))*step;out.push({rho,radius:(rho**4+1)**.25,height:z});}
 return out;
}
export function discardedConstant(U:number,p:D3Parameters){return p.alphaPrime**2*U**4/(2*p.lambda);}
