from audit import ROOT,get
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote,quote
from PIL import Image,ImageOps,ImageDraw
import html,re,json,concurrent.futures,hashlib,io
media=json.loads((ROOT/'audit/raw/media.json').read_text()); byid={m['id']:m for m in media}
pages=json.loads((ROOT/'audit/raw/pages.json').read_text()); posts=json.loads((ROOT/'audit/raw/posts.json').read_text()); products=json.loads((ROOT/'audit/raw/product.json').read_text())
refs={}; seen={}
def add(url,group,mid=None):
 url=url.replace('http://','https://').split('?')[0]
 url=re.sub(r'-(?:thegem-[a-z0-9-]+|[0-9]+x[0-9]+)(?=\.[^.]+$)','',url)
 if 'mbtksa.com/wp-content/uploads/' not in url:return
 url=quote(unquote(url),safe=':/')
 if url not in refs:refs[url]={'group':group,'mediaId':mid}
for p in products:
 if p['featured_media'] in byid:add(byid[p['featured_media']]['source_url'],'products',p['featured_media'])
for group,items in [('news',posts),('company',pages)]:
 for p in items:
  s=html.unescape(p['content']['rendered']).replace('\\/','/')
  for u in re.findall(r'https?://(?:www\.)?mbtksa.com/wp-content/uploads/[^"<>\)\n]+?\.(?:jpg|png|jpeg|webp|pdf|mp4|svg)',s,re.I):add(u,group)
  mids=set()
  if p['featured_media']:mids.add(p['featured_media'])
  for match in re.findall(r'(?:image|images|ids|image_id|attachment_id)[=：]["“”″\']([^"“”″\']+)',s):
   mids.update(int(i) for i in re.findall(r'\b\d{3,6}\b',match))
  mids.update(int(i) for i in re.findall(r'wp-image-(\d+)',s))
  for mid in mids:
   if mid in byid:add(byid[mid]['source_url'],group,mid)
# identity and meaningful infrastructure candidates, exclude unrelated theme templates.
for m in media:
 name=unquote(m['source_url']).lower()
 if any(w in name for w in ['mbt-png-logo','client','cleint','warehouse','fleet','branch','head-office','bawazir','distribution','fawzi','raghad','hussam','truck','company-profile','logo_','mbt-building','/2026/05/Slide']):
  add(m['source_url'],'brands' if any(w in name for w in ['client','cleint']) else 'company',m['id'])
for u,d in refs.items():
 name=unquote(urlsplit(u).path).split('/')[-1]
 if 'client' in name.lower() or 'cleint' in name.lower():d['group']='brands'
 if 'logo_' in name or 'mbt-png-logo' in name:d['group']='mbt'
 if 'PROFILE' in name or 'profile' in name or 'real3dflipbook' in u:d['group']='history'
 safe=re.sub(r'[^a-zA-Z0-9.\-_]','-',name)
 d['path']='public/assets/'+d['group']+'/'+hashlib.sha1(u.encode()).hexdigest()[:7]+'-'+safe

def download(item):
 u,d=item;p=ROOT/d['path']
 if not p.exists():
  body,h=get(u)
  if not body:d['error']=h.get('error');return u,d
  p.write_bytes(body)
 d['bytes']=p.stat().st_size
 try:
  im=Image.open(p);d['width'],d['height']=im.size
 except:pass
 return u,d
(ROOT/'audit/asset-queue.json').write_text(json.dumps(refs,ensure_ascii=False,indent=2))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 result={}
 for i,(u,d) in enumerate(pool.map(download,refs.items())):
  result[u]=d
  if i%100==0:print('Assets',i,'/',len(refs),flush=True)
(ROOT/'audit/assets.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print('Downloaded',len(result),flush=True)
# Visual contact sheets of original company photography and profile pages.
items=[(u,d) for u,d in result.items() if d['group'] in ['company','history','mbt','brands'] and d.get('width',0)>0]
for batch in range(0,len(items),100):
 part=items[batch:batch+100];sheet=Image.new('RGB',(1000,160*((len(part)+4)//5)), '#eeeeee');draw=ImageDraw.Draw(sheet)
 for j,(u,d) in enumerate(part):
  im=Image.open(ROOT/d['path']).convert('RGB');im.thumbnail((190,125))
  x=(j%5)*200;y=(j//5)*160;sheet.paste(im,(x+(190-im.width)//2,y));draw.text((x+4,y+128),str(batch+j)+' '+unquote(u).split('/')[-1][:23],fill='black')
 sheet.save(ROOT/'audit'/f'sheet-{batch//100}.jpg')
(ROOT/'audit/sheet-index.json').write_text(json.dumps(items,ensure_ascii=False))
