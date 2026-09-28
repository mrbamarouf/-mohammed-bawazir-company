from pathlib import Path
import json,re,html
from urllib.parse import unquote,quote
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent
load=lambda f:json.loads((root/f).read_text())
queue=load('audit/asset-queue.json'); media={m['id']:m for m in load('audit/raw/media.json')};pages={p['id']:p for p in load('audit/raw/pages.json')};cats={c['id']:c for c in load('audit/raw/product_cat.json')}
def norm(u):return quote(unquote(re.sub(r'-(?:thegem-[a-z0-9-]+|[0-9]+x[0-9]+)(?=\.[^.]+$)','',u.replace('http://','https://').split('?')[0])),safe=':/')
def asset(u):
 d=queue.get(norm(u));return '/'+d['path'].removeprefix('public/') if d else ''
def mid(i):return asset(media[i]['source_url']) if i in media else ''
def clean(s):
 soup=BeautifulSoup(s,'html.parser')
 for x in soup(['script','style']):x.decompose()
 t=html.unescape(soup.get_text(' ',strip=True));t=re.sub(r'\[[^\]]*\]',' ',t)
 return re.sub(r'\s+',' ',t).strip()
def anc(ids):
 out=set(ids)
 for i in ids:
  while i in cats and cats[i]['parent'] and cats[i]['parent'] not in out:i=cats[i]['parent'];out.add(i)
 return out
branddefs=[
('reem','Reem','ريم',24768,'2018/05/client1.png',[24,126],'food'),('catch-me','Catch Me','كاتش مي',24788,'2018/05/client12.png',[76,127],'food'),('tropicana-slim','Tropicana Slim','تروبيكانا سليم',34314,'2021/09/tspic.jpeg',[389,407],'food'),('wings','Mie Sedaap','مي سيداب',35512,'2023/08/2-1.jpg',[423],'food'),('lool','LOOL','لول',24806,'2024/04/client1.png',[457],'food'),('fantastic','Fantastic','فانتاستيك',24778,'2025/07/clientFantastic.png',[453],'food'),('nutrisari','NutriSari','نوتري ساري',24808,'2023/08/3.jpg',[455],'beverages'),('bull-dose','Bull Dose','بول دوز',24782,'2023/08/4.jpg',[],'beverages'),('pons','Pons','بونس',24782,'2018/05/client11.png',[73,125],'food'),('adonis','Adonis','أدونيس',24783,'2018/05/client3.png',[75,119],'food'),('mayora','Mayora','مايورا',24772,'2018/05/clientbig1-1.png',[149,410],'food'),('anchor','Anchor','أنكور',24779,'2018/05/cleint5.png',[],'food'),('ali-cafe','Alicafé','علي كافيه',24770,'2018/05/client6.png',[],'beverages'),('delicio','Delicio','ديليسيو',24771,'2018/05/client4.png',[],'food'),('al-ghurair','Al Ghurair','الغرير',24784,'2018/05/client10.png',[],'food'),('mdsf','MDSF','إم دي إس إف',35795,'', [426],'food'),('reckitt','Reckitt','ريكيت',35977,'',[429,430],'household'),('purity','Purity Laboratories','بيوريتي لابوراتوريز',24822,'2018/05/clientbig3.png',[],'personal-care'),('foramed','Foramed','فوراميد',24825,'2018/05/clientbig5.png',[],'personal-care'),('medcity','Medcity Pharmacy','صيدلية ميدسيتي',24832,'2018/06/medcity-box.png',[],'pharma'),('neopharma','Neopharma','نيوفارما',24823,'2018/06/neopharma-box.png',[],'pharma'),('indo-coal','Indo Coal','إندو كول',35394,'2018/05/client14.png',[422],'household'),('falcon','Falcon','فالكون',35574,'2018/05/clientbig6.png',[424,425],'household'),('alfakher','Al Fakher','الفاخر',35807,'2024/04/2-2.jpg',[427],'tobacco'),('dinner-lady','Dinner Lady','دينر ليدي',36018,'2024/04/5-2.jpg',[],'tobacco'),('tcisl','TCISL','تي سي آي إس إل',24846,'',[93,145],'tobacco')]
brands=[]
for slug,en,ar,pid,u,ids,div in branddefs:
 desc=clean(pages[pid]['content']['rendered'])
 # Old templates repeat footers; preserve source text in the inventory, not public UI.
 desc=re.split(r'Our Brand Partners|Get in touch|Contact Us Now',desc)[0].strip()
 if len(desc)>700 or not desc or '[' in desc or '{' in desc:desc=''
 if len(desc)<50:desc=f'{en} is featured in the MBT company portfolio. Explore the available catalogue and company source records.'
 brands.append({'slug':slug,'name':{'en':en,'ar':ar},'division':div,'image':asset('https://www.mbtksa.com/wp-content/uploads/'+u) if u else '', 'source':pages[pid]['link'],'categoryIds':ids,'description':{'en':desc,'ar':f'{ar} من الأسماء الواردة في محفظة شركة محمد باوزير للتجارة. استعرض سجلات المنتجات والمعلومات المنشورة في مصدر الشركة.'}})
products=[]
for p in load('audit/raw/product.json'):
 ids=p['product_cat']; ancestors=anc(ids); cs=[html.unescape(cats[i]['name']) for i in ids if i in cats];name=html.unescape(p['title']['rendered'])
 brand=next((b['slug'] for b in brands if set(b['categoryIds'])&ancestors),'')
 div=next((b['division'] for b in brands if b['slug']==brand),'food' if {23,113}&ancestors else 'tobacco' if {86,141}&ancestors else 'household')
 products.append({'id':p['id'],'slug':str(p['id'])+'-'+p['slug'][:95],'name':name,'description':clean(p['content']['rendered']),'image':mid(p['featured_media']),'categoryIds':ids,'categories':cs,'division':div,'brand':brand,'source':p['link'],'language':'ar' if re.search('[\u0600-\u06ff]',name) or any('-ar' in cats[i]['slug'] for i in ids if i in cats) else 'en'})
translations={36463:'MBT تشارك في مبادرة «أسبوع بلا سكر»',36455:'وفد تجاري إندونيسي يزور MBT في جدة',36450:'الأعمال والمسؤولية الاجتماعية',36384:'رعاية رياضة البادل',36375:'معرض التجارة الإندونيسي: إندونيسيا المذهلة للحج 2025',36365:'المعرض الوطني للصناعات الاستهلاكية 2025',36345:'شركة محمد باوزير للتجارة تنال جائزة بريمادوتا 2024',36123:'وفد وزارة التجارة والصناعة التايلاندية يزور MBT',35005:'توقيع مذكرة تفاهم مع مورّدين إندونيسيين',34986:'المشاركة في منتدى معرض التجارة الإندونيسي 2021',34916:'بحث توسيع وصول المنتجات الإندونيسية إلى السوق السعودي',34819:'افتتاح المكتب التجاري الإندونيسي في جدة',34807:'معرض الحج الإندونيسي وقمة الحلال 2020',34795:'حملة توعية صحية بالتعاون مع مجمع الملك عبدالله',34758:'العلاقات التجارية السعودية الإندونيسية',34833:'أسبوع المهرجان الإندونيسي',34845:'زيارة قنصل السنغال إلى المقر الرئيسي',34779:'زيارة القنصل الإندونيسي والفريق الاقتصادي',34762:'MBT تنال جائزة بريمادوتا 2019',34748:'فعالية فَوّرها في جدة',34736:'تروبيكانا سليم تنضم إلى محفظة الشركاء',34720:'معرض المنتجات الوطنية والاستهلاكية 2019',12500:'ريم في جلفود 2018: اليوم الرابع',12247:'ريم في جلفود 2018: اليوم الثالث',11991:'ريم في جلفود 2018: اليوم الثاني',11697:'ريم في جلفود 2018: اليوم الأول',9365:'زيارة فريق وزارة التجارة الإندونيسية إلى جدة',9338:'فريق MBT يتأهل إلى نصف نهائي بطولة رمضان',9115:'إطلاق علي كافيه في المنطقة الوسطى والغربية',9107:'إطلاق علي كافيه في الرياض',8831:'ريم في المنتدى الاقتصادي السعودي الأردني',8602:'جلفود 2017',26737:'لقاء فيتاين سي'}
shorttitles={36123:'Thai trade delegation visits MBT',35005:'A memorandum of understanding with Indonesian suppliers',34986:'Trade Expo Indonesia 2021',34758:'Saudi–Indonesian trade relations',34779:'Indonesian Consul General visits MBT',34762:'Primaduta Award 2019',34736:'Welcoming Tropicana Slim to the portfolio',9338:'MBT football team reaches the Ramadan semi-finals'}
articles=[]
for p in load('audit/raw/posts.json'):
 raw=html.unescape(p['content']['rendered']).replace('\\/','/');gallery=[]
 for u in re.findall(r'https?://(?:www\.)?mbtksa.com/wp-content/uploads/[^"<>\)\n]+?\.(?:jpg|png|jpeg|webp)',raw,re.I):
  a=asset(u)
  if a and a not in gallery:gallery.append(a)
 title=shorttitles.get(p['id'],html.unescape(p['title']['rendered']));body=clean(p['content']['rendered'])
 if p['id']==36463:body='MBT Group participated in the “A Week Without Sugar” initiative with Abdul Latif Jameel Hospital in Saudi Arabia. The event brought the company’s community activities to hospital employees and visitors, with samples of its Monk Fruit product.'
 if p['id']==36450:body='In collaboration with Abdul Latif Jameel, MBT shared Monk Fruit product samples with employees at Auto Hub on Madinah Road in Jeddah as part of its community activities.'
 arbody={36463:'شاركت مجموعة MBT بالتعاون مع مستشفى عبداللطيف جميل في المملكة العربية السعودية في مبادرة «أسبوع بلا سكر». وتضمنت المشاركة تقديم عينات من منتج مونك فروت للموظفين والزوار ضمن الأنشطة المجتمعية للشركة.',36455:'استضافت شركة محمد باوزير للتجارة في جدة السيدة فجرياني، مديرة إدارة تطوير الصادرات الإندونيسية، والوفد الحكومي المرافق لها. تناولت المناقشات فرص التعاون وتعزيز الشراكات التجارية بين MBT والشركات الإندونيسية.',36450:'قدمت MBT بالتعاون مع عبداللطيف جميل عينات من منتج مونك فروت لموظفي أوتو هب على طريق المدينة في جدة، ضمن مبادرات الشركة المجتمعية.',36345:'حصلت شركة محمد باوزير للتجارة المحدودة على جائزة بريمادوتا الرئاسية لعام 2024 تقديرًا لالتزامها وأدائها في التعاون التجاري مع الشركات الإندونيسية. وقدمت القنصلية الإندونيسية في جدة الجائزة بحضور عدد من الشركاء الإندونيسيين.'}.get(p['id'],'')
 articles.append({'id':p['id'],'slug':str(p['id'])+'-'+re.sub('[^a-z0-9]+','-',title.lower()).strip('-')[:90],'title':{'en':title,'ar':translations[p['id']]},'date':p['date'][:10],'body':{'en':body,'ar':arbody},'image':mid(p['featured_media']) or (gallery[0] if gallery else ''),'gallery':gallery,'source':p['link']})
for fn,obj in [('products',products),('brands',brands),('articles',articles),('categories',[{'id':c['id'],'name':html.unescape(c['name']),'parent':c['parent']} for c in cats.values()])]:
 (root/f'content/{fn}.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2))
# Gallery/content modules retain all extra source pages in a separate structured archive.
archive=[]
for p in pages.values():
 if p['id'] in [24926,11450,26127,26131,26130,26132,26133,26139,24930,25889,25888,25931,34111]:
  raw=html.unescape(p['content']['rendered']).replace('\\/','/');images=[]
  for u in re.findall(r'https?://(?:www\.)?mbtksa.com/wp-content/uploads/[^"<>\)\n]+?\.(?:jpg|png|jpeg|webp)',raw,re.I):
   a=asset(u)
   if a and a not in images:images.append(a)
  archive.append({'id':p['id'],'slug':p['slug'],'title':html.unescape(p['title']['rendered']),'text':clean(raw),'images':images,'source':p['link']})
(root/'content/archive.json').write_text(json.dumps(archive,ensure_ascii=False,indent=2))
keys={'food':'https://www.mbtksa.com/wp-content/uploads/2018/06/food.jpg','household':'https://www.mbtksa.com/wp-content/uploads/2018/06/cleaning.jpg','logo':'https://www.mbtksa.com/wp-content/uploads/2015/08/mbt-png-logo.png','promo':'https://www.mbtksa.com/wp-content/uploads/2018/05/client13.png','whitegate':'https://www.mbtksa.com/wp-content/uploads/2018/05/clientbig4.png'}
(root/'content/assets.json').write_text(json.dumps({k:asset(v) for k,v in keys.items()}))
print('Content written',len(products),'products',len(brands),'brands',len(articles),'articles')
