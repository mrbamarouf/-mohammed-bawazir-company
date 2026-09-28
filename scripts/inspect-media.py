from audit import ROOT,get
from PIL import Image,ImageDraw
import json,concurrent.futures,io,re
m=json.loads((ROOT/'audit/raw/media.json').read_text()); seen=set();items=[]
for x in m:
 u=x['source_url'];w=x.get('media_details',{}).get('width',0);h=x.get('media_details',{}).get('height',0)
 if u in seen:continue
 seen.add(u)
 if ('/2026/05/Slide' in u or (w>=1000 and h>=450 and any(t in u.lower() for t in ['mbt','office','building','operations','2018/07','2018/06','slide2.jpg','slide3.jpg','2025/08','2025/01']))) and not re.search(r'\d+x\d+|thegem',u):items.append(x)
def dl(x):
 u=x['source_url'];p=ROOT/'audit'/('inspect-'+str(x['id'])+'.jpg')
 if not p.exists():
  b,h=get(u)
  if not b:return None
  try:Image.open(io.BytesIO(b)).convert('RGB').save(p)
  except:return None
 return x
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:items=[x for x in ex.map(dl,items) if x]
for start in range(0,len(items),60):
 part=items[start:start+60];im=Image.new('RGB',(1250,155*((len(part)+4)//5)),'white');d=ImageDraw.Draw(im)
 for i,x in enumerate(part):
  a=Image.open(ROOT/'audit'/('inspect-'+str(x['id'])+'.jpg'));a.thumbnail((240,126));col=i%5*250;row=i//5*155;im.paste(a,(col,row));d.text((col,row+128),str(x['id'])+' '+x['source_url'].split('/')[-1][:26],fill='black')
 im.save(ROOT/'audit'/f'inspect-sheet-{start//60}.jpg')
print('Candidate images',len(items),flush=True)
