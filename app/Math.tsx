import katex from 'katex';
export default function MathFormula({tex,inline=false}:{tex:string;inline?:boolean}){
  const html=katex.renderToString(tex,{displayMode:!inline,throwOnError:false,trust:false,strict:false,output:'htmlAndMathml'});
  return inline?<span className="math-inline" dangerouslySetInnerHTML={{__html:html}}/>:<div className="math-display" dangerouslySetInnerHTML={{__html:html}}/>;
}
