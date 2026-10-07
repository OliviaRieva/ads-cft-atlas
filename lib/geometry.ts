export type QuadricKind='ads'|'ds'|'hyperbolic';
export type Vec3=[number,number,number];
export function quadricPoint(kind:QuadricKind,L:number,r:number,a:number):Vec3{
 if(kind==='ads')return[L*Math.cosh(r)*Math.cos(a),L*Math.cosh(r)*Math.sin(a),L*Math.sinh(r)];
 if(kind==='ds')return[L*Math.sinh(r),L*Math.cosh(r)*Math.cos(a),L*Math.cosh(r)*Math.sin(a)];
 return[L*Math.cosh(r),L*Math.sinh(r)*Math.cos(a),L*Math.sinh(r)*Math.sin(a)];
}
export function quadricNorm(kind:QuadricKind,[a,b,c]:Vec3){return-a*a+(kind==='ads'?-b*b:b*b)+c*c;}
export function quadricMetric(kind:QuadricKind,L:number,r:number):[number,number]{
 return kind==='ads'?[L*L,-L*L*Math.cosh(r)**2]:kind==='ds'?[-L*L,L*L*Math.cosh(r)**2]:[L*L,L*L*Math.sinh(r)**2];
}
