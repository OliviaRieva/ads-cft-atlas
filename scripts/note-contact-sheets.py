"""Readable inspection sheets of selected source images; originals stay untouched."""
from pathlib import Path
import json, sys
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/(sys.argv[1] if len(sys.argv)>1 else 'tmp/notes-current-review')
DEST=SOURCE/'sheets'
DEST.mkdir(exist_ok=True)
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',20)
manifest=[]
for ti in range(2,9):
    tab=json.loads((SOURCE/f'tab-{ti}.json').read_text())
    for start in range(0,len(tab['images']),12):
        sheet=Image.new('RGB',(1800,1680),'#eeeeee')
        draw=ImageDraw.Draw(sheet)
        entries=[]
        for pos,item in enumerate(tab['images'][start:start+12]):
            x=(pos%3)*600;y=(pos//3)*420
            draw.rectangle((x+3,y+3,x+597,y+417),fill='white')
            label=f'{start+pos+1}: {item["id"]}'
            draw.text((x+12,y+10),label,fill='#111111',font=font)
            try:
                image=Image.open(item['path']).convert('RGB')
                original=image.size
                image.thumbnail((570,365))
                sheet.paste(image,(x+15+(570-image.width)//2,y+44+(365-image.height)//2))
                entries.append({'id':item['id'],'path':item['path'],'original':original,'large':original[1]>400})
            except Exception:
                draw.text((x+15,y+70),'MISSING ORIGINAL',fill='red',font=font)
                entries.append({'id':item['id'],'missing':True})
        filename=f'tab-{ti}-{start//12+1:02}.jpg'
        sheet.save(DEST/filename,quality=94)
        manifest.append({'tab':ti,'file':str(DEST/filename),'images':entries})
(DEST/'index.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'sheets':len(manifest),'images':sum(len(s['images']) for s in manifest)}))
