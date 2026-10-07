export type Sign=1|-1;
export function classifyQuadric(signs:Sign[],level:Sign,L:number){
 const D=signs.length-1,q=signs.filter(s=>s<0).length,p=D+1-q,empty=level===1?p===0:q===0;
 const positive=p-(level===1?1:0),negative=q-(level===-1?1:0);
 let name=level===1?'Pseudo-sphere':'Pseudo-hyperbolic quadric',kind='other';
 if(empty){name='No real points';kind='empty';}
 else if(D===0){name='Two points · S⁰';kind='points';}
 else if(q===0&&level===1){name=`Sphere S${superNumber(D)}`;kind='sphere';}
 else if(q===1&&level===-1){name=`Hyperbolic space H${superNumber(D)} · two sheets`;kind='hyperbolic';}
 else if(q===2&&level===-1){name=D===1?'Negative circle · formal AdS₁':`Anti-de Sitter · AdS${subNumber(D)}`;kind='ads';}
 else if(q===1&&level===1){name=D===1?'Two timelike lines · formal dS₁':`de Sitter · dS${subNumber(D)}`;kind='ds';}
 else if(p===0&&level===-1){name=`Sphere S${superNumber(D)} · negative metric`;kind='negative-sphere';}
 else if(p===1&&level===1){name='Hyperbolic sheets · negative metric';kind='negative-hyperbolic';}
 const sphere=level===1?p-1:q-1,flat=level===1?q:p;
 const topology=empty?'∅':flat===0?`S${superNumber(sphere)}`:sphere===0?`Two copies of ℝ${superNumber(flat)}`:`S${superNumber(sphere)} × ℝ${superNumber(flat)}`;
 return{D,p,q,positive,negative,empty,kind,name,topology,K:empty||D<2?null:level/L**2,R:empty?null:D<2?0:D*(D-1)*level/L**2,ricciFactor:empty?null:D<2?0:(D-1)*level/L**2};
}
export function superNumber(n:number){return String(n).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]??'⁻').join('');}
export function subNumber(n:number){return String(n).split('').map(c=>'₀₁₂₃₄₅₆₇₈₉'[+c]??'₋').join('');}
export function sectionAxes(signs:Sign[]){const neg=signs.flatMap((s,i)=>s<0?[i]:[]),pos=signs.flatMap((s,i)=>s>0?[i]:[]);return signs.length<=3?signs.map((_,i)=>i):[...neg.slice(0,neg.length>1?2:1),...pos.slice(0,neg.length>1?1:2),...neg,...pos].filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);}
// Parametrize the exact <=3-coordinate section, all other coordinates zero.
export function sectionPoint(signs:Sign[],level:Sign,L:number,r:number,a:number,sheet=1):number[]{
 const same=signs.flatMap((s,i)=>s===level?[i]:[]),other=signs.flatMap((s,i)=>s!==level?[i]:[]),v=signs.map(()=>0);
 if(!same.length)return v.map(()=>NaN);
 if(!other.length){if(same.length===1)v[same[0]]=sheet*L;else if(same.length===2){v[same[0]]=L*Math.cos(a);v[same[1]]=L*Math.sin(a);}else {v[0]=L*Math.cos(r)*Math.cos(a);v[1]=L*Math.cos(r)*Math.sin(a);v[2]=L*Math.sin(r);}return v;}
 if(same.length===2){v[same[0]]=L*Math.cosh(r)*Math.cos(a);v[same[1]]=L*Math.cosh(r)*Math.sin(a);v[other[0]]=L*Math.sinh(r);}
 else {v[same[0]]=sheet*L*Math.cosh(r);if(other.length===1)v[other[0]]=L*Math.sinh(r);else {v[other[0]]=L*Math.sinh(r)*Math.cos(a);v[other[1]]=L*Math.sinh(r)*Math.sin(a);}}
 return v;
}
export function sphereArea(n:number,r:number){if(r===0)return n===0?2:0;let gamma:number;if((n+1)%2===0){gamma=1;for(let i=1;i<(n+1)/2;i++)gamma*=i;}else{gamma=Math.sqrt(Math.PI);for(let i=.5;i<(n+1)/2;i++)gamma*=i;}return 2*Math.PI**((n+1)/2)/gamma*r**n;}
export function minkowskiPoint(t:number,r:number,scale=1){const U=Math.atan((t-r)/scale),V=Math.atan((t+r)/scale);return{T:(U+V)/2,R:(V-U)/2};}
export function poincarePoint(tau:number,rho:number,L=1,direction=1){const A=Math.cos(tau)+Math.sin(rho)*direction;return{A,z:L*Math.cos(rho)/A,t:L*Math.sin(tau)/A};}
