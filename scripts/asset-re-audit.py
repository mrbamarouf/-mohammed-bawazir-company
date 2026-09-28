"""Inspect missing official brand artwork and relevant linked assets; do not edit originals."""
from audit import ROOT,get
from pathlib import Path
import json,re,hashlib,concurrent.futures,urllib.parse,html
from PIL import Image,ImageDraw
base=ROOT/'audit/redesign';media=json.loads((base/'raw/media.json').read_text());old=json.loads((ROOT/'audit/assets.json').read_text());names=json.loads((ROOT/'content/brands.json').read_text());sources={}
terms=['logo','client','cleint','brand','reem','catch','lool','fantastic','tropicana','nutrisari','nutri-sari','wings','sedaap','mayora','anchor','alicafe','ali-cafe','delicio','ghurair','adonis','pons','foramed','purity','medcity','neopharma','mbtech','whitegate','white-gate','promo','elfy','reckitt','nakhla','alfakher','dinner','indo','falcon','viva','elmore','vitaene','exotica','tiger','bull-dose','bull_dose','beverly','axis','chemical','evan','mymi','bright','majid']
for m in media:
 u=m['source_url'];file=urllib.parse.unquote(u.rsplit('/',1)[-1]).lower();w=m.get('media_details',{}).get('width',0);h=m.get('media_details',{}).get('height',0)
 if not m.get('mime_type','').startswith('image/'):continue
 if any(t in file for t in terms) and not re.search(r'thegem|dummy|gem_logo|clients-bg|client-logo-\d|logo-white|logo-dark|restaurant|photography',file):
  sources.setdefault(u,{'id':m['id'],'title':m['title']['rendered'],'width':w,'height':h,'kind':'candidate','source':u})
# Preserve all directly mentioned artwork and media IDs in page content.
byid={m['id']:m for m in media}
for kind in ['pages','posts','product']:
 for p in json.loads((base/'raw'/f'{kind}.json').read_text()):
  raw=html.unescape(p['content']['rendered'])
  ids=[]
  for val in re.findall(r'(?:image|images|ids|image_id|attachment_id)[=：]["“”″\']([^"“”″\']+)',raw):ids+=map(int,re.findall(r'\b\d{3,6}\b',val))
  ids += [p.get('featured_media',0)]
  for id in ids:
   if id in byid:
    m=byid[id];u=m['source_url']
    sources.setdefault(u,{'id':id,'title':m['title']['rendered'],'width':m.get('media_details',{}).get('width',0),'height':m.get('media_details',{}).get('height',0),'kind':'linked','source':u})
def dl(pair):
 u,d=pair
 prev=old.get(u,{})
 if prev.get('path') and (ROOT/prev['path']).exists():d.update({'path':prev['path'],'status':'DOWNLOADED','new':False});return u,d
 file=re.sub('[^a-zA-Z0-9.\-_]','-',urllib.parse.unquote(u.rsplit('/',1)[-1]));folder='brands' if d['kind']=='candidate' else 'company';p='public/assets/'+folder+'/'+hashlib.sha1(u.encode()).hexdigest()[:7]+'-'+file
 data,h=get(u)
 if not data:d.update({'status':'MISSING','error':h.get('error')});return u,d
 (ROOT/p).write_bytes(data);d.update({'path':p,'status':'DOWNLOADED','new':True,'bytes':len(data)});return u,d
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:result=dict(ex.map(dl,sources.items()))
(base/'asset-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
logos=[]
for u,d in result.items():
 if d['status']!='DOWNLOADED' or d['kind']!='candidate':continue
 try:
  im=Image.open(ROOT/d['path'])
  # Keep full inventory; sheets prioritize brand art instead of enormous product arrays.
  if im.width<=1400 and im.height<=1400:
   d['mode']=im.mode;d['transparent']=im.mode in ['RGBA','P'] and ('transparency' in im.info or (im.mode=='RGBA' and im.getextrema()[-1][0]<255));logos.append(d)
 except:pass
(base/'logo-candidates.json').write_text(json.dumps(logos,ensure_ascii=False,indent=2))
for start in range(0,len(logos),60):
 part=logos[start:start+60];sheet=Image.new('RGB',(1440,160*((len(part)+5)//6)),'#deded9');draw=ImageDraw.Draw(sheet)
 for i,d in enumerate(part):
  im=Image.open(ROOT/d['path']).convert('RGBA');im.thumbnail((224,122));x=i%6*240;y=i//6*160;sheet.paste(im,(x,y),im);draw.text((x,y+125),str(start+i)+' '+d['title'][:26],fill='black');draw.text((x,y+141),str(d['id'])+' '+str((d['width'],d['height'])),fill='black')
 sheet.save(base/f'logos-{start//60}.jpg')
print('Candidates',len(sources),'downloaded',sum(d['status']=='DOWNLOADED' for d in result.values()),'new',sum(d.get('new',False) for d in result.values()),'logo-sheet-items',len(logos))
