"""Curated discovery metadata; source category IDs and original titles remain untouched."""
import json,re
from pathlib import Path
brands=json.load(open('content/brands.json'));products=json.load(open('content/products.json'));changes=[]
for b in brands:
 if b['slug']=='alkareem':b.update(slug='carina',name={'en':'Carina','ar':'كارينا'},source='https://www.mbtksa.com/food-4-2/al-ghurair/')
patterns=[('fuyl','Fuyl','فويل','tobacco',r'fuyl'),('pastadoro','Pastadoro','باستادورو','food',r'باستادور'),('el-rashidi','El Rashidi El Mizan','الرشيدي الميزان','food',r'الرشيدي'),('jadayel','Jadayel','جدايل','personal-care',r'جدايل'),('pokka','Pokka','بوكا','beverages',r'بوكا'),('tranquini','Tranquini','ترانكويني','beverages',r'ترانكويني'),('liptomil','Liptomil','ليبتوميل','food',r'ليبتوميل'),('carina','Carina','كارينا','food',r'كارينا')]
for slug,en,ar,division,pattern in patterns:
 matched=[p for p in products if re.search(pattern,p['name'],re.I)]
 if not any(b['slug']==slug for b in brands) and matched:
  brands.append({'slug':slug,'name':{'en':en,'ar':ar},'division':division,'image':'','source':matched[0]['source'],'categoryIds':[],'description':{'en':'Preserved in MBT’s published product records. Browse the associated catalogue entries or contact the company for current information.','ar':'علامة محفوظة في سجلات منتجات MBT المنشورة. استعرض المنتجات المرتبطة بها أو تواصل مع الشركة للمعلومات الحالية.'}})
lookup=[(s,d,p) for s,_,_,d,p in patterns]+[('delicio','food','ديليسيو'),('adonis','food','أدونيس'),('pons','food','بونس'),('bright','household','برايت'),('reem','food','^ريم'),('elmore','personal-care','إيلمور'),('ala-chemical','personal-care','دينتونيك'),('elfy','household','إيلفي'),('nakhla','tobacco','النخلة'),('anchor','food','أنكور'),('golden-coal','household','الفحم الذهبي')]
for p in products:
 if not p['brand']:
  for slug,division,pattern in lookup:
   if re.search(pattern,p['name'],re.I):
    changes.append({'id':p['id'],'name':p['name'],'previousDivision':p['division'],'division':division,'brand':slug,'basis':'explicit brand in official product title; original category IDs unchanged'});p['brand']=slug;p['division']=division;break
meta={x['path']:x for x in json.load(open('audit/redesign/clean-assets.json'))}
for p in products:
 if p['id']==9782:p['slug']='9782-pastadoro-pasta'
 if p['image'] in meta:p.update(imageWidth=meta[p['image']]['width'],imageHeight=meta[p['image']]['height'])
Path('content/products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2));Path('content/brands.json').write_text(json.dumps(brands,ensure_ascii=False,indent=2))
ledger=Path('audit/redesign/classification-corrections.json')
if changes or not ledger.exists():ledger.write_text(json.dumps(changes,ensure_ascii=False,indent=2))
print(len(changes),'classification corrections;',len(brands),'directory entries')
