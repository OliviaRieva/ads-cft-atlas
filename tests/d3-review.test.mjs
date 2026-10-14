import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import katex from 'katex';

const require=createRequire(import.meta.url);
const transpile=(file,jsx=false)=>ts.transpileModule(fs.readFileSync(new URL(file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,...(jsx?{jsx:ts.JsxEmit.ReactJSX}:{})}}).outputText;
const load=(code,loader=require)=>{const mod={exports:{}};new Function('module','exports','require',code)(mod,mod.exports,loader);return mod.exports;};
const d=load(transpile('../lib/d3.ts'));
const close=(actual,expected,tol=1e-10)=>assert.ok(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${actual} != ${expected}`);
const p={N:1200,lambda:200,alphaPrime:.2};

test('translating centres and observers together preserves geometry and frequency ratios',()=>{
  const c=d.centresFor(p.N,[-2,.5,3]),a=[-.8,.6],b=[2.3,4.1],shift=4.25;
  const moved=c.map(v=>({...v,u:v.u+shift})),move=v=>[v[0]+shift,v[1]];
  for(const model of ['full','throat']){
    close(d.harmonicU(move(a),moved,p,model==='full'),d.harmonicU(a,c,p,model==='full'));
    close(d.frequencyRatio(move(a),move(b),moved,p,model),d.frequencyRatio(a,b,c,p,model));
  }
});

test('multi-centre harmonic coefficients match physical six-dimensional distances',()=>{
  const c=d.centresFor(p.N,[-2,1,4]),u=[1.5,2.5],physical=u.map(v=>v*p.alphaPrime),{gs}=d.parameters(p);
  const physicalH=1+c.reduce((sum,v)=>sum+4*Math.PI*gs*v.charge*p.alphaPrime**2/((physical[0]-p.alphaPrime*v.u)**2+physical[1]**2)**2,0);
  close(d.harmonicU(u,c,p),physicalH);
});

test('lapse squared and scaled time coefficient describe the same metric',()=>{
  const c=d.centresFor(p.N,[0,0]);
  for(const model of ['full','throat','thermal'])for(const U of [1.2,2,8]){
    close(d.lapse([0,U],c,p,model,1)**2,p.alphaPrime*d.scaledMetric(U,p,model,1).time);
  }
});

test('fixed-U redshift ratios survive the limit while an exterior receiver sees vanishing energy',()=>{
  const c=d.centresFor(p.N,[0]),near=[0,.7],farInThroat=[0,2.4];
  let previous=Infinity;
  for(const alphaPrime of [1,.1,.01,.001,.0001]){
    const q={...p,alphaPrime};
    close(d.frequencyRatio(near,farInThroat,c,q,'throat'),.7/2.4);
    const outside=d.observerU({anchor:'r',position:[0,8]},q);
    const ratio=d.frequencyRatio(near,outside,c,q,'full');
    assert.ok(ratio<previous);previous=ratio;
  }
  assert.ok(previous<.002);
});

test('a fixed physical coordinate is not a fixed throat coordinate',()=>{
  const a={anchor:'U',position:[2,3]},b={anchor:'r',position:[2,3]};
  assert.deepEqual(d.observerU(a,{...p,alphaPrime:.01}),[2,3]);
  assert.deepEqual(d.observerU(b,{...p,alphaPrime:.01}),[200,300]);
  close(d.stretchedMass(-2,3),5/(2*Math.PI));
});

test('discarded constant gives the exact full/throat metric discrepancy',()=>{
  for(const alphaPrime of [1,.1,.0001])for(const U of [.5,1,4]){
    const q={...p,alphaPrime},full=d.scaledMetric(U,q,'full'),throat=d.scaledMetric(U,q,'throat'),eps=d.discardedConstant(U,q);
    close(full.time/throat.time,1/Math.sqrt(1+eps));
    close(full.radial/throat.radial,Math.sqrt(1+eps));
    close(full.sphere/throat.sphere,Math.sqrt(1+eps));
  }
});

test('thermal zero-horizon limit recovers the extremal throat',()=>{
  const c=d.centresFor(p.N,[0]);
  close(d.lapse([0,2],c,p,'thermal',0),d.lapse([0,2],c,p,'throat'));
  assert.deepEqual(d.scaledMetric(2,p,'thermal',0),d.scaledMetric(2,p,'throat'));
  assert.equal(d.thermalTemperature(0,p),0);
});

test('throat cylinder is asymptotic to the full embedding, not its entire flared profile',()=>{
  const profile=d.throatEmbedding(500,.0001,3);
  close(profile[0].radius,1,1e-12);
  assert.ok(profile.at(-1).radius>3,'The full H=1+L⁴/r⁴ geometry retains a flat exterior flare.');
  const a=profile[0],b=profile[1];
  close((b.height-a.height)/Math.log(b.rho/a.rho),1,1e-8);
});

// A focused callback-level harness, not a browser/layout test. It exercises the
// actual component's event handlers and effect dependencies without a DOM.
function labHarness(){
  const cells=[];let cursor=0,dirty=false,effects=[],tree;
  const React={
    useState(initial){const slot=cursor++;if(!cells[slot])cells[slot]={value:typeof initial==='function'?initial():initial};const set=next=>{const value=typeof next==='function'?next(cells[slot].value):next;if(!Object.is(value,cells[slot].value)){cells[slot].value=value;dirty=true;}};return[cells[slot].value,set];},
    useMemo(fn){cursor++;return fn();},
    useCallback(fn){cursor++;return fn;},
    useRef(initial){const slot=cursor++;if(!cells[slot])cells[slot]={current:initial};return cells[slot];},
    useEffect(fn,deps){const slot=cursor++,old=cells[slot]?.deps;if(!deps||!old||deps.some((v,i)=>!Object.is(v,old[i]))){cells[slot]={deps};effects.push(fn);}},
  };
  const MathFormula=()=>null;
  const component=load(transpile('../app/correspondence/D3Lab.tsx',true),name=>name==='react'?React:name==='../Math'?{default:MathFormula}:name==='../../lib/d3'?d:require(name)).default;
  const render=()=>{for(let pass=0;pass<12;pass++){dirty=false;cursor=0;effects=[];tree=component();for(const effect of effects)effect();if(!dirty)return tree;}throw Error('Component did not settle after effects.');};
  const all=(node=tree,out=[])=>{if(Array.isArray(node)){for(const child of node)if(child!==undefined)all(child,out);}else if(node&&typeof node==='object'&&node.props){out.push(node);if(node.props.children!==undefined)all(node.props.children,out);}return out;};
  const text=node=>Array.isArray(node)?node.map(text).join(''):node&&typeof node==='object'?text(node.props?.children):node==null?'':String(node);
  const find=predicate=>{const node=all().find(predicate);assert.ok(node,'Expected control not found');return node;};
  render();
  return{render,all,text,click(label){find(node=>node.type==='button'&&text(node)===label).props.onClick();render();},change(label,value){find(node=>node.props['aria-label']===label).props.onChange({target:{value}});render();},math(){return all().filter(node=>node.type===MathFormula).map(node=>node.props.tex);},find};
}

test('thermal observer presets keep both static clocks outside the horizon',()=>{
  const lab=labHarness();lab.click('Thermal AdS black brane');
  for(const horizon of [1,3]){
    lab.change('Thermal horizon radius',String(horizon));
    for(const preset of ['A in throat, B outside','Both stay in the throat','Put B beside A']){
      lab.click(preset);
      assert.ok(!lab.math().some(tex=>/not defined|\\text\{undefined\}|NaN/.test(String(tex))),`Invalid static clock after preset ${preset}, Uh=${horizon}`);
    }
  }
});

test('reducing charge cannot leave an unavailable bundle choice or mass from hidden branes',()=>{
  const lab=labHarness();lab.change('Number of brane bundles','6');lab.click('Separate the bundles');lab.change('Total D3 charge N',String(Math.log10(2)));
  const select=lab.find(node=>node.props['aria-label']==='Number of brane bundles');
  const options=Array.isArray(select.props.children)?select.props.children:[select.props.children];
  assert.ok(options.some(option=>String(option.props.value??option.props.children)===String(select.props.value)),'Selected bundle count must exist among its options.');
  const active=lab.all().filter(node=>node.type==='input'&&/^Brane bundle \d+ position$/.test(node.props['aria-label']??'')).map(node=>Number(node.props.value));
  const maxMass=(Math.max(...active)-Math.min(...active))/(2*Math.PI);
  const eq=lab.math().find(tex=>String(tex).includes('\\max(m_{ab})'));
  const displayed=Number(String(eq).match(/=([0-9.e+\-]+)/)?.[1]);
  assert.ok(Math.abs(displayed-maxMass)<.001,`Mass ${displayed} should use active bundles only (${maxMass}).`);
});

test('throat observer marker is invariant when its stack and observer translate together',()=>{
  const lab=labHarness();lab.change('Number of brane bundles','1');
  lab.change('Observer A horizontal position','0');lab.change('Observer A vertical position','1');lab.click('See the throat');
  const marker=()=>{
    const figure=lab.find(node=>typeof node.type==='function'&&node.type.name==='Throat');
    const tree=figure.type(figure.props),dot=lab.all(tree).find(node=>node.type==='circle'&&node.props.fill==='#007c8d');
    assert.ok(dot,'Observer A should be visible in the throat figure.');return[dot.props.cx,dot.props.cy];
  };
  const before=marker();lab.change('Brane bundle 1 position','4');lab.change('Observer A horizontal position','4');
  const after=marker();before.forEach((v,i)=>close(after[i],v));
});

test('dynamic D3 equations render as strict KaTeX at parameter extremes in every model',()=>{
  const lab=labHarness();
  const cases=[{n:4,gs:0,alpha:-5},{n:4,gs:-4,alpha:-5},{n:Math.log10(2),gs:-4,alpha:0},{n:3,gs:-1.7,alpha:-2.5}];
  let formulas=0,sawScientificNotation=false;
  for(const {n,gs,alpha} of cases){
    lab.change('Total D3 charge N',String(n));lab.change('String coupling',String(gs));lab.change('Alpha prime decoupling limit',String(alpha));
    for(const model of ['Full D3 geometry','Near-horizon limit','Thermal AdS black brane']){
      lab.click(model);if(model==='Thermal AdS black brane')lab.change('Thermal horizon radius','3');
      for(const preset of ['A in throat, B outside','Both stay in the throat']){
        lab.click(preset);
        for(const tex of lab.math()){
          assert.doesNotMatch(tex,/not defined|\\text\{undefined\}|NaN|Infinity/);
          assert.doesNotMatch(tex,/\d(?:\.\d+)?e[+-]\d/,'Math should use ×10ⁿ rather than raw JavaScript exponential notation.');
          katex.renderToString(tex,{throwOnError:true,strict:'error',displayMode:true});formulas++;
          if(tex.includes('\\times10^{'))sawScientificNotation=true;
        }
      }
    }
  }
  assert.ok(formulas>300);assert.ok(sawScientificNotation,'Extreme values should exercise the exponential formatter.');
});

test('displayed pure-throat profile is a cylinder and full geometry retains its flare',()=>{
  const lab=labHarness();lab.click('Bring into one stack');lab.click('See the throat');
  const radii=()=>{
    const figure=lab.find(node=>typeof node.type==='function'&&node.type.name==='Throat');
    return lab.all(figure.type(figure.props)).filter(node=>node.type==='ellipse').map(node=>node.props.rx);
  };
  const full=radii();assert.ok(Math.max(...full)>1.5*Math.min(...full));
  lab.click('Near-horizon limit');const throat=radii();assert.ok(throat.length>3);
  for(const radius of throat)close(radius,throat[0]);
  lab.click('Full D3 geometry');assert.deepEqual(radii(),full);
});
