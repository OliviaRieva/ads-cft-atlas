import {readingCft} from './reading-cft';
import {readingAds} from './reading-ads';
import {readingSusyStrings} from './reading-susy-strings';
export const readingConnections=[
 {id:'link:generators',label:'The same generators',sections:['reading-conformal-generators','reading-ads-isometries']},
 {id:'link:signature',label:'Why SO(d,2)?',sections:['reading-conformal-so','reading-ads-global']},
 {id:'link:killing',label:'Killing flows and charges',sections:['reading-killing-current','reading-ads-isometries']},
 {id:'link:scaling',label:'Scaling and radial depth',sections:['reading-cft-dimensions','reading-ads-radial-scale']},
 {id:'link:charge',label:'The same N: colour and flux',sections:['reading-d3-chan-paton','reading-d3-flux']},
 {id:'link:scalars',label:'Six scalars, six positions',sections:['reading-d3-ten-dimensional-origin','reading-d3-t-duality']},
 {id:'link:limit',label:'The same low-energy limit',sections:['reading-d3-open-limit','reading-d3-scaled-limit','reading-d3-throat-strings-survive']},
 {id:'link:separation',label:'Keep stretched masses finite',sections:['reading-d3-coulomb','reading-d3-scaled-limit']},
 {id:'link:tension',label:'Brane tension sources geometry',sections:['reading-d3-dbi','reading-d3-gravity-scale']},
 {id:'link:boundary',label:'Where the boundary is',sections:['reading-where-cft-lives','reading-ads-compactification']},
 {id:'link:source',label:'Sources are boundary conditions',sections:['reading-source-generator','reading-two-boundary-conditions','reading-ads-boundary-data']},
];
export const readingSections=[...readingCft,...readingAds,...readingSusyStrings].sort((a,b)=>a.order-b.order).map(s=>({...s,concepts:[...readingConnections.filter(c=>c.sections.includes(s.id)).map(c=>c.id),...s.concepts]}));
export const readingChapters:Record<number,string>={1:'Field theory',2:'Conformal field theory',3:'Anti-de Sitter space',4:'The field/operator dictionary',5:'Supersymmetry',6:'String theory',7:'The D3-brane correspondence'};
export const notesDocument='https://docs.google.com/document/d/1cMUiQK6Ewq8XAGUeytY9Foa1AUtiwi291rWLL_cm3i8/edit';
