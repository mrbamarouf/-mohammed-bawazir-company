import urllib.request, urllib.parse, json, pathlib, concurrent.futures, re, time, html
ROOT=pathlib.Path(__file__).resolve().parent.parent
BASE='https://www.mbtksa.com/'

def get(url):
 for attempt in range(3):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'MBT-Website-Migration/1.0'}),timeout=40) as r: return r.read(),dict(r.headers)
  except Exception as e:
   if attempt==2: return None,{'error':str(e)}
   time.sleep(1)

def endpoint(kind):
 out=[]; page=1
 while True:
  data,headers=get(BASE+'wp-json/wp/v2/'+kind+'?per_page=100&page='+str(page))
  if not data: break
  obj=json.loads(data)
  if not isinstance(obj,list): break
  out+=obj
  if page>=int(headers.get('X-WP-TotalPages','1')): break
  page+=1
 (ROOT/'audit/raw'/f'{kind}.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
 print(kind,len(out),flush=True)
 return kind,out

if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: data=dict(pool.map(endpoint,['pages','posts','product','media','categories','product_cat','product_brand']))
 for name in ['robots.txt','wp-sitemap.xml','sitemap_index.xml']:
  body,h=get(BASE+name)
  if body:(ROOT/'audit/raw'/name).write_bytes(body)
 pages=data['pages']+data['posts']+data['product']
 summary=[]
 for p in pages:
  text=html.unescape(re.sub('<[^>]+>',' ',p.get('content',{}).get('rendered','')))
  summary.append({'id':p['id'],'type':p['type'],'slug':p['slug'],'title':html.unescape(p['title']['rendered']),'url':p['link'],'date':p['date'],'text':re.sub(r'\s+',' ',text),'media':p.get('featured_media'),'categories':p.get('product_cat',p.get('categories',[]))})
 (ROOT/'audit/content-extracted.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
 print('Saved complete API content',flush=True)
