from audit import get, ROOT, BASE
from bs4 import BeautifulSoup
from urllib.parse import urljoin,urlsplit,urlunsplit,quote
import json,re,concurrent.futures,hashlib
pages=json.loads((ROOT/'audit/raw/pages.json').read_text())+json.loads((ROOT/'audit/raw/posts.json').read_text())+json.loads((ROOT/'audit/raw/product.json').read_text())
urls=set(p['link'] for p in pages)
urls|={BASE,'https://www.mbtksa.com/ar/','https://www.mbtksa.com/en/','https://www.mbtksa.com/shop/'}
for t in json.loads((ROOT/'audit/raw/product_cat.json').read_text()):urls.add(BASE+'product-category/'+t['slug']+'/')
visited={}
def crawl(url):
 body,h=get(url)
 if not body:return url,{'error':h.get('error')},[]
 s=BeautifulSoup(body,'html.parser')
 main=s.select_one('main') or s.select_one('#main') or s
 for e in main.select('script,style,.onetap-frontend,.gtranslate_wrapper,header,footer,nav'):e.decompose()
 text=re.sub(r'\s+',' ',re.sub(r'\[[^\]]*\]',' ',main.get_text(' ',strip=True)))
 links=[]
 for a in s.select('a[href]'):
  u=urljoin(url,a['href']); part=urlsplit(u)
  if part.hostname in ['www.mbtksa.com','mbtksa.com'] and not re.search(r'wp-|feed|xmlrpc|/cart|/checkout|add-to-cart|replytocom|\.\w{2,5}$',part.path) and not part.query:
   links.append(urlunsplit(('https','www.mbtksa.com',part.path,'','')))
 return url,{'title':s.title.get_text() if s.title else '', 'text':text,'images':[a.get('src') for a in main.select('img[src]')]},links
rounds=0
while urls:
 rounds+=1; new=set()
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
  for u,d,ls in pool.map(crawl,sorted(urls)):
   visited[u]=d
   new.update(x for x in ls if x not in visited)
   if len(visited)%50==0:print('Crawled',len(visited),flush=True)
 (ROOT/'audit/crawl.json').write_text(json.dumps(visited,ensure_ascii=False,indent=2))
 urls=new-set(visited)
 print('Round',rounds,'done, remaining',len(urls),flush=True)
 if rounds>=5:break
print('Done',len(visited),flush=True)
