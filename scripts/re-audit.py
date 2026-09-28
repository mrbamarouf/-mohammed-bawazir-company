"""Read-only complete re-audit. Keeps the first migration evidence intact."""
import urllib.request,urllib.parse,json,pathlib,concurrent.futures,re,html,hashlib,time,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
ROOT=pathlib.Path(__file__).resolve().parent.parent
OUT=ROOT/'audit/redesign';BASE='https://www.mbtksa.com/'
HEAD={'User-Agent':'MBT-Website-Migration/2.0','Accept':'application/json,text/html,application/xml,*/*'}
def get(u):
 for n in range(2):
  try:
   with urllib.request.urlopen(urllib.request.Request(u,headers=HEAD),timeout=25) as r:return r.read(),{'status':r.status,'headers':dict(r.headers),'finalUrl':r.url}
  except urllib.error.HTTPError as e:return b'',{'status':e.code,'error':str(e)}
  except Exception as e:
   if n:return b'',{'status':0,'error':str(e)}
   time.sleep(.6)
def jget(u):
 data,meta=get(u)
 try:return json.loads(data),meta
 except:return None,meta
summary={};records={}
for kind in ['types','taxonomies']:
 data,meta=jget(BASE+'wp-json/wp/v2/'+kind)
 (OUT/'raw'/f'{kind}.json').write_text(json.dumps({'data':data,'request':meta},ensure_ascii=False,indent=2))
for kind in ['pages','posts','product','product_cat','categories','product_brand','media']:
 first,meta=jget(BASE+'wp-json/wp/v2/'+kind+'?per_page=100&page=1')
 if not isinstance(first,list):summary[kind]={'error':meta};continue
 headers={k.lower():v for k,v in meta['headers'].items()};totalpages=int(headers.get('x-wp-totalpages',1));items=first;responses=[{'page':1,'count':len(first),'status':meta['status']}]
 def page(n):
  data,meta=jget(BASE+'wp-json/wp/v2/'+kind+'?per_page=100&page='+str(n));return n,data,meta
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
  for n,data,m in ex.map(page,range(2,totalpages+1)):
   responses.append({'page':n,'count':len(data) if isinstance(data,list) else 0,'status':m['status']})
   if isinstance(data,list):items+=data
 records[kind]=items
 old=json.loads((ROOT/'audit/raw'/f'{kind}.json').read_text()) if (ROOT/'audit/raw'/f'{kind}.json').exists() else []
 oldids={x['id'] for x in old};newids={x['id'] for x in items}
 summary[kind]={'reported':int(headers.get('x-wp-total',len(items))),'received':len(items),'uniqueIds':len(newids),'newIds':sorted(newids-oldids),'noLongerReturned':sorted(oldids-newids),'responses':responses}
 (OUT/'raw'/f'{kind}.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
 print(kind,summary[kind]['reported'],len(items),'new',len(newids-oldids),flush=True)
(OUT/'api-comparison.json').write_text(json.dumps(summary,indent=2))
# All current records, previous discovered links, sitemap pages, and both locale roots.
urls={BASE,BASE+'ar/',BASE+'en/'}
for k in ['pages','posts','product','product_cat','categories']:
 urls.update(x['link'] for x in records.get(k,[]) if x.get('link'))
oldcrawl=json.loads((ROOT/'audit/crawl.json').read_text());urls.update(oldcrawl)
sitemap_meta=[];sitemaps=[BASE+'wp-sitemap.xml',BASE+'sitemap_index.xml'];seen_sitemaps=set()
while sitemaps:
 u=sitemaps.pop()
 if u in seen_sitemaps:continue
 seen_sitemaps.add(u);body,meta=get(u);sitemap_meta.append({'url':u,**meta})
 if not body:continue
 (OUT/'raw'/('sitemap-'+hashlib.sha1(u.encode()).hexdigest()[:8]+'.xml')).write_bytes(body)
 try:
  root=ET.fromstring(body)
  for loc in root.findall('.//{*}loc'):
   if not loc.text:continue
   if 'sitemap' in root.tag:sitemaps.append(loc.text) if root.tag.endswith('sitemapindex') else urls.add(loc.text)
 except:pass
(OUT/'sitemaps.json').write_text(json.dumps(sitemap_meta,indent=2))
def norm(u):
 p=urllib.parse.urlsplit(u)
 if p.hostname not in ['mbtksa.com','www.mbtksa.com']:return None
 if re.search(r'wp-admin|wp-login|xmlrpc|/feed/?$|/cart/?$|/checkout/?$',p.path):return None
 if re.search(r'\.(?:jpg|jpeg|png|gif|webp|svg|pdf|mp4|css|js|zip|xml)$',p.path,re.I):return None
 if p.query and not re.fullmatch(r'(?:lang=(?:en|ar)|paged=\d+|page=\d+|p=\d+|page_id=\d+)',p.query):return None
 return urllib.parse.urlunsplit(('https','www.mbtksa.com',p.path or '/',p.query,''))
urls={n for u in urls if (n:=norm(u))};visited={}
def crawl(u):
 body,m=get(u)
 if not body:return u,m,[]
 soup=BeautifulSoup(body,'html.parser');links=[];assets=[]
 for a in soup.select('a[href]'):
  url=urllib.parse.urljoin(u,a['href']);n=norm(url)
  if n:links.append(n)
  if '/wp-content/uploads/' in url:assets.append(url)
 for a in soup.select('img[src],source[srcset],img[srcset]'):
  for attr in ['src','srcset']:
   if a.get(attr):assets.extend(re.findall(r'https?://[^,\s]+',a[attr]))
 menu=[{'label':a.get_text(' ',strip=True),'url':urllib.parse.urljoin(u,a['href'])} for a in soup.select('header a[href],nav a[href],footer a[href]')]
 main=soup.select_one('main') or soup.select_one('#main') or soup
 for x in main.select('script,style,.onetap-frontend,.gtranslate_wrapper'):x.decompose()
 text=re.sub(r'\s+',' ',main.get_text(' ',strip=True))
 title=soup.title.get_text() if soup.title else ''
 (OUT/'html'/(hashlib.sha1(u.encode()).hexdigest()+'.html')).write_bytes(body)
 return u,{'status':m['status'],'title':title,'text':text,'links':list(dict.fromkeys(links)),'assets':list(dict.fromkeys(assets)),'navigation':menu},links
round=0
while urls:
 round+=1;new=set()
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
  for u,d,ls in ex.map(crawl,sorted(urls)):
   visited[u]=d;new.update(ls)
   if len(visited)%100==0:print('Crawled',len(visited),flush=True)
 (OUT/'crawl.json').write_text(json.dumps(visited,ensure_ascii=False,indent=2))
 urls=new-set(visited)
 print('Depth',round,'completed; remaining',len(urls),flush=True)
(OUT/'crawl-comparison.json').write_text(json.dumps({'previous':len(oldcrawl),'current':len(visited),'newUrls':sorted(set(visited)-set(oldcrawl)),'errors':{u:d.get('status') for u,d in visited.items() if d.get('status')!=200}},indent=2))
print('COMPLETE',len(visited),flush=True)
