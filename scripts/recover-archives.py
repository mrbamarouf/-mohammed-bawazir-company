"""Recover shortcode galleries and downloadable documents without replacing curated content."""
from audit import ROOT,get
import html,json,re,hashlib,concurrent.futures
from urllib.parse import quote,unquote
from PIL import Image
load=lambda name:json.loads((ROOT/name).read_text())
media={m['id']:m for m in load('audit/raw/media.json')}
pages={p['id']:p for p in load('audit/raw/pages.json')}
archive=load('content/archive.json'); assets=load('audit/assets.json')
def norm(u):return quote(unquote(re.sub(r'-(?:thegem-[a-z0-9-]+|[0-9]+x[0-9]+)(?=\.[^.]+$)','',u.replace('http://','https://').split('?')[0])),safe=':/')
refs={}
for p in archive:
 raw=html.unescape(pages[p['id']]['content']['rendered']); ids=[]
 for val in re.findall(r'(?:images|ids)=["“”″\']([^"“”″\']+)',raw):ids+=map(int,re.findall(r'\b\d{3,6}\b',val))
 refs[p['id']]=list(dict.fromkeys(ids))
missing=sorted({id for ids in refs.values() for id in ids if id not in media})
extra=[]
for off in range(0,len(missing),100):
 data,h=get('https://www.mbtksa.com/wp-json/wp/v2/media?per_page=100&include='+','.join(map(str,missing[off:off+100])))
 if data:
  items=json.loads(data)
  if isinstance(items,list):extra+=items;media.update({m['id']:m for m in items})
(ROOT/'audit/raw/media-supplement.json').write_text(json.dumps(extra,ensure_ascii=False,indent=2))
print('Recovered media metadata',len(extra),'of',len(missing),flush=True)
urls=set(norm(media[id]['source_url']) for ids in refs.values() for id in ids if id in media)
pdfs=list(dict.fromkeys(norm(m['source_url']) for m in media.values() if m.get('mime_type')=='application/pdf'))
urls.update(pdfs)
def dl(u):
 d=assets.get(u,{})
 if not d:
  name=re.sub('[^a-zA-Z0-9.\-_]','-',unquote(u).split('/')[-1]);group='history' if u.endswith('.pdf') else 'company'
  d={'path':f'public/assets/{group}/'+hashlib.sha1(u.encode()).hexdigest()[:7]+'-'+name,'group':group}
 p=ROOT/d['path']
 if not p.exists():
  data,h=get(u)
  if not data:d['error']=h.get('error');return u,d
  p.write_bytes(data)
 d['bytes']=p.stat().st_size;d.pop('error',None)
 try:
  im=Image.open(p);d['width'],d['height']=im.size
 except:pass
 return u,d
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for u,d in pool.map(dl,urls):assets[u]=d
for p in archive:
 for id in refs[p['id']]:
  if id not in media:continue
  d=assets.get(norm(media[id]['source_url']),{})
  if d.get('bytes'):
   local='/'+d['path'].removeprefix('public/')
   if local not in p['images']:p['images'].append(local)
 print('Gallery',p['id'],len(p['images']),flush=True)
(ROOT/'content/archive.json').write_text(json.dumps(archive,ensure_ascii=False,indent=2))
(ROOT/'audit/assets.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2))
(ROOT/'audit/pdf-downloads.json').write_text(json.dumps({u:assets[u] for u in pdfs},ensure_ascii=False,indent=2))
print('PDFs',[(u,assets[u].get('bytes',assets[u].get('error'))) for u in pdfs],flush=True)
