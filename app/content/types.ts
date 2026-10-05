export type Equation = {id:string;latex:string;meaning:string;derivation:string[];symbols?:string;caveat?:string};
export type CoursePage = {page:number;chapter:number;title:string;overview:string;why:string;prerequisites:string[];recap:string;sections:{title:string;body:string;equations?:Equation[]}[];figureNotes?:string[]};
