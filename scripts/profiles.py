from audit import ROOT,get
from urllib.parse import quote,unquote
import json,re,html,hashlib,concurrent.futures
ps={p['id']:p for p in json.loads((ROOT/'audit/raw/pages.json').read_text())};m=json.loads((ROOT/'audit/raw/media.json').read_text());q=json.loads((ROOT/'audit/asset-queue.json').read_text());out=json.loads((ROOT/'content/profiles.json').read_text());jobs=[]
for key,pid in [('historic',24757),('promo',25889),('whitegate',25888),('recent',None)]:
 if pid:
  raw=html.unescape(ps[pid]['content']['rendered']).replace('\\/','/')
  urls=list(dict.fromkeys(re.findall(r'"src":"([^"]+)"',raw)))
 else:urls=sorted(set(x['source_url'] for x in m if '/2026/05/Slide' in x['source_url']),key=lambda u:int(re.search(r'Slide(\d+)',u)[1]))
 out[key]['images']=[]
 for u in urls:
  u=quote(unquote(u.replace('http://','https://')),safe=':/');name=re.sub('[^a-zA-Z0-9.\-_]','-',unquote(u).split('/')[-1]);path='public/assets/history/'+hashlib.sha1(u.encode()).hexdigest()[:7]+'-'+name
  out[key]['images'].append('/'+path[7:]);jobs.append((u,path))
  q[u]={'group':'history','path':path}
def dl(job):
 u,p=job;p=ROOT/p
 if not p.exists():
  data,h=get(u)
  if not data:return {'url':u,'error':h.get('error')}
  p.write_bytes(data)
 return {'url':u,'bytes':p.stat().st_size}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:results=list(ex.map(dl,jobs))
(ROOT/'content/profiles.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));(ROOT/'audit/profiles.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));(ROOT/'audit/asset-queue.json').write_text(json.dumps(q,ensure_ascii=False,indent=2))
print({k:len(v['images']) for k,v in out.items()});print('Errors',[r for r in results if 'error' in r])
