import MathFormula from '../Math';

export default function QuizText({text}:{text:string}){
  return <span className="quiz-rich">{text.split(/(\$[^$]+\$)/g).map((part,i)=>part.startsWith('$')&&part.endsWith('$')?<MathFormula key={i} tex={part.slice(1,-1)} inline/>:<span key={i}>{part}</span>)}</span>;
}
