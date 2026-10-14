export type ReadingSide = 'cft' | 'ads' | 'bridge';
export type ReadingBlock =
  | {type:'p'; text:string}
  | {type:'math'; tex:string; explain?:string}
  | {type:'steps'|'list'; items:string[]}
  | {type:'callout'; title:string; text:string};
export type ReadingSection = {
  id:string;
  side:ReadingSide;
  chapter:number;
  order:number;
  title:string;
  lead:string;
  blocks:ReadingBlock[];
  concepts:string[];
  source:{tab:number; ranges:[number,number][]; lecturePages:number[]};
};
