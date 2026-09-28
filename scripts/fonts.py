from audit import get,ROOT
import re,json
fonts={'manrope':'Manrope:wght@400;500;600;700','bodoni':'Bodoni+Moda:ital,wght@0,400;0,500;1,400','arabic':'Noto+Sans+Arabic:wght@400;500;600;700'}
css=[]
for name,q in fonts.items():
 b,h=get('https://fonts.googleapis.com/css2?family='+q+'&display=swap')
 text=b.decode()
 for i,u in enumerate(dict.fromkeys(re.findall(r'url\((https[^)]+)\)',text))):
  b,h=get(u);ext='woff2' if '.woff2' in u else 'ttf';path=f'/assets/fonts/{name}-{i}.{ext}';(ROOT/'public'/path.lstrip('/')).write_bytes(b);text=text.replace(u,path)
 css.append(text)
(ROOT/'app/fonts.css').write_text('\n'.join(css))
print('Fonts downloaded')
