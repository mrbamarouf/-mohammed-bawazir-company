from bs4 import BeautifulSoup
import json,re,html,pathlib
root=pathlib.Path(__file__).resolve().parent.parent
records=[]
for kind in ['pages','posts','product']:
 for p in json.loads((root/f'audit/raw/{kind}.json').read_text()):
  s=BeautifulSoup(p['content']['rendered'],'html.parser')
  for e in s(['script','style']):e.decompose()
  text=html.unescape(s.get_text(' ',strip=True)); headings=re.findall(r'(?:title|text)=["“”\']([^"“”″\']+)',text)
  clean=re.sub(r'\[[^\]]*\]',' ',text)
  records.append({'id':p['id'],'type':p['type'],'title':html.unescape(p['title']['rendered']),'url':p['link'],'slug':p['slug'],'headings':headings,'text':re.sub(r'\s+',' ',clean),'media':p['featured_media'],'sourceLanguage':'ar' if re.search('[\u0600-\u06ff]',p['title']['rendered']) else 'en','date':p['date']})
(root/'audit/content-extracted.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
lines=['# Official content inventory','','Source: https://www.mbtksa.com/ · Audited 2026-09-28','', 'The public WordPress API, public HTML pages, product taxonomy, media library and linked image-based company profiles were inspected. All raw content is retained under `audit/raw`. Browser-era plugins often expose broken shortcodes, so these were parsed explicitly rather than discarded.','','## Record inventory','','- 101 published pages, including English and Arabic records sharing URLs.','- 33 news/event posts.','- 394 product records with original categories, image references and descriptions.','- 83 product categories; no entries in the separate product_brand taxonomy.','- 6,717 media records returned across all 74 public API pages (API reports 7,339 total, likely language filtering; the mismatch is retained for review).','','## Preservation decisions','','- `/en` and `/ar` are independently editable routes. Original product records are not merged where sizes/names disagree.','- About contains company overview, principles, history and source-attributed leadership.','- Business retains food, beverages, household, personal care, pharma and tobacco information.','- Brands preserves principal/brand pages, including legacy relationships without claiming present exclusivity.','- Distribution preserves named branch cities and links operations, coverage and source documents.','- Companies preserves MBT, Promo Insight and White Gate source profiles.','- News retains all 33 records and publication dates.','- Marketing retains display, sales tools and event material.','- Careers preserves the official HR application destination.','- Contact preserves verified HQ address, telephone, fax, hours and email.','- Profile images are retained as dated source archives.','- Conflicts and uncertain details are tracked in `CONTENT_REVIEW.md`.','','## Page register','','| ID | Language | Title | Source |','|---|---|---|---|']
for p in records:
 if p['type']=='page':lines.append(f"| {p['id']} | {p['sourceLanguage']} | {p['title'].replace('|','/')} | {p['url']} |")
(root/'CONTENT_INVENTORY.md').write_text('\n'.join(lines))
