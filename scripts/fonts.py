"""Rebuild the complete Arabic webfonts from a pinned, verified upstream file.

Run with .venv/bin/python scripts/fonts.py (fonttools[woff] required).
No character subsetting and no editing of outlines or OpenType shaping tables.
Latin faces are already static WOFF2 assets and are intentionally untouched.
"""
from pathlib import Path
from io import BytesIO
import hashlib
import json
import urllib.request
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
REVISION = '8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5'
URL = f'https://raw.githubusercontent.com/google/fonts/{REVISION}/ofl/readexpro/ReadexPro%5BHEXP%2Cwght%5D.ttf'
EXPECTED = '268bba7e1e8f3b14d798b3fb0e40ebaa3fc39308c9ac0020e2faf6df181cc30e'
data = urllib.request.urlopen(URL).read()
assert hashlib.sha256(data).hexdigest() == EXPECTED, 'Unexpected upstream font'
manifest = []
for weight in (400, 500, 600, 700):
    face = instantiateVariableFont(TTFont(BytesIO(data)), {'wght': weight, 'HEXP': 0})
    assert 'fvar' not in face and face['OS/2'].usWeightClass == weight
    assert 'GSUB' in face and 'GPOS' in face
    face.flavor = 'woff2'
    path = ROOT / f'public/assets/fonts/readex-arabic-{weight}.woff2'
    face.save(path)
    manifest.append({'file': path.name, 'weight': weight, 'variable': False,
                     'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                     'bytes': path.stat().st_size, 'codepoints': len(face.getBestCmap())})
license_url = f'https://raw.githubusercontent.com/google/fonts/{REVISION}/ofl/readexpro/OFL.txt'
(ROOT / 'public/assets/fonts/ReadexPro-OFL.txt').write_bytes(urllib.request.urlopen(license_url).read())
(ROOT / 'audit/typography/font-manifest.json').write_text(json.dumps(
    {'source': URL, 'sourceSha256': EXPECTED, 'instances': manifest}, indent=2) + '\n')
print('Verified four complete static Arabic faces: 400, 500, 600, 700.')
