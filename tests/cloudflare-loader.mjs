// Non-API HTML smoke tests do not access D1. A minimal binding shim lets the
// emitted Worker render under Node; persistence is tested against real SQLite.
export async function resolve(specifier,context,nextResolve){
 if(specifier==='cloudflare:workers')return {url:'data:text/javascript,export const env = {};',shortCircuit:true};
 return nextResolve(specifier,context);
}
