"""Preserve native Google notes order, image assets, OCR, and Word native math."""
import json, pathlib, zipfile, xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).resolve().parents[1]
M='{http://schemas.openxmlformats.org/officeDocument/2006/math}'
greek={'α':r'\alpha ','β':r'\beta ','γ':r'\gamma ','δ':r'\delta ','ε':r'\epsilon ','ϵ':r'\epsilon ','θ':r'\theta ','λ':r'\lambda ','μ':r'\mu ','ν':r'\nu ','π':r'\pi ','ρ':r'\rho ','σ':r'\sigma ','τ':r'\tau ','φ':r'\phi ','ϕ':r'\phi ','ψ':r'\psi ','ω':r'\omega ','Γ':r'\Gamma ','Δ':r'\Delta ','Φ':r'\Phi ','Ψ':r'\Psi ','Ω':r'\Omega ','∂':r'\partial ','∫':r'\int ','∑':r'\sum ','∞':r'\infty ','→':r'\to ','⇒':r'\Rightarrow ','↔':r'\leftrightarrow ','⟨':r'\langle ','⟩':r'\rangle ','≤':r'\leq ','≥':r'\geq ','≠':r'\ne ','∈':r'\in ','∝':r'\propto ','×':r'\times ','⋅':r'\cdot ','−':'-','ℏ':r'\hbar ','ℒ':r'\mathcal L ','ℝ':r'\mathbb R ','ℂ':r'\mathbb C '}
def literal(s):
 return ''.join(greek.get(c, ('\\'+c if c in ['%','&','#','_','{','}'] else c)) for c in (s or '')).replace('\u200b','')
def tex(e):
 tag=e.tag.split('}')[-1]
 def child(n):
  c=e.find(M+n)
  return tex(c) if c is not None else ''
 def prop(p,n,default=''):
  c=e.find(M+p+'/'+M+n)
  return c.get(M+'val',default) if c is not None else default
 if tag.endswith('Pr') or tag in ['ctrlPr','brk']:return ''
 if tag=='t':return literal(e.text)
 if tag=='f':return r'\frac{'+child('num')+'}{'+child('den')+'}'
 if tag=='sSub':return '{'+child('e')+'}_{'+child('sub')+'}'
 if tag=='sSup':return '{'+child('e')+'}^{'+child('sup')+'}'
 if tag=='sSubSup':return '{'+child('e')+'}_{'+child('sub')+'}^{'+child('sup')+'}'
 if tag=='rad':return r'\sqrt'+('['+child('deg')+']' if child('deg') else '')+'{'+child('e')+'}'
 if tag=='d':
  b=prop('dPr','begChr','(');end=prop('dPr','endChr',')')
  return literal(b)+''.join(tex(c) for c in e if c.tag==M+'e')+literal(end)
 if tag=='nary':return literal(prop('naryPr','chr','∫'))+'_{'+child('sub')+'}^{'+child('sup')+'}'+child('e')
 if tag=='acc':
  kind={'̂':r'\hat','̄':r'\bar','⃗':r'\vec','̇':r'\dot','̈':r'\ddot','̃':r'\tilde'}.get(prop('accPr','chr','̂'),r'\hat')
  return kind+'{'+child('e')+'}'
 if tag=='bar':return r'\overline{'+child('e')+'}'
 if tag=='limLow':return '{'+child('e')+'}_{'+child('lim')+'}'
 if tag=='limUpp':return '{'+child('e')+'}^{'+child('lim')+'}'
 if tag=='func':return child('fName')+' '+child('e')
 if tag=='eqArr':return r'\begin{gathered}'+r'\\'.join(tex(c) for c in e if c.tag==M+'e')+r'\end{gathered}'
 if tag=='m':return r'\begin{matrix}'+r'\\'.join('&'.join(tex(c) for c in row if c.tag==M+'e') for row in e if row.tag==M+'mr')+r'\end{matrix}'
 return ''.join(tex(c) for c in e)
source=json.loads((ROOT/'tmp/notes-native.json').read_text())
ocr={x['id']:x for x in json.loads((ROOT/'tmp/notes-ocr.json').read_text())}
native={}
for tab,name in [(2,'notes-export'),(6,'supersymmetry'),(10,'t-duality-closed'),(11,'t-duality-open')]:
 with zipfile.ZipFile(ROOT/f'tmp/{name}.docx') as z:doc=ET.fromstring(z.read('word/document.xml'))
 native[tab]=[tex(e) for e in doc.findall('.//'+M+'oMath')]
out=ROOT/'public/notes-data';out.mkdir(exist_ok=True)
index=[]
for ti,tab in enumerate(source['tabs']):
 images={x['id']:x['object'] for x in tab['images']};blocks=[];mathindex=0
 for bi,b in enumerate(tab['blocks']):
  parts=[]
  for part in b['parts']:
   if 'text' in part:parts.append({'text':part['text']})
   elif 'image' in part:
    iid=part['image'];obj=images.get(iid,{}) or {};size=obj.get('size',{});item={'image':iid,'width':size.get('width',{}).get('magnitude',240)*4/3,'height':size.get('height',{}).get('magnitude',30)*4/3,'ocr':ocr.get(iid,{}).get('text','')}
    if iid=='kix.p4nl26830v16':item['caption']='Native drawing: top diagram E=3, V=2, F=3 gives N²λ; bottom E=6, V=4, F=2 gives N⁰λ². The original drawing overlays these counts on the two ribbon graphs.';item['ocr']='Ribbon graph color counting: E=3 V=2 F=3 N²λ versus E=6 V=4 F=2 N⁰λ²'
    parts.append(item)
   elif 'equation' in part:
    value=native.get(ti,[])[mathindex] if mathindex<len(native.get(ti,[])) else ''
    parts.append({'math':value});mathindex+=1
  if any(p.get('text','').strip() or p.get('image') or p.get('math') for p in parts):blocks.append({'id':bi,'style':b.get('style'),'parts':parts})
 expected=sum('equation' in p for b in tab['blocks'] for p in b['parts'])
 assert expected==len(native.get(ti,[])),(ti,expected,len(native.get(ti,[])))
 public={'tab':ti,'id':tab['id'],'title':tab['title'],'blocks':blocks}
 (out/f'tab-{ti}.json').write_text(json.dumps(public,ensure_ascii=False))
 index.append({'tab':ti,'id':tab['id'],'title':tab['title'],'blocks':len(blocks),'images':len(images),'math':mathindex})
(out/'index.json').write_text(json.dumps(index,ensure_ascii=False))
(ROOT/'tmp/native-equations.json').write_text(json.dumps(native,ensure_ascii=False))
print(json.dumps({'tabs':len(index),'images':sum(i['images'] for i in index),'nativeMath':sum(i['math'] for i in index),'blocks':sum(i['blocks'] for i in index)}))
