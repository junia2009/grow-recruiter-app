import re
import sys
from pathlib import Path

p = Path(__file__).resolve().parent.parent / 'index.html'
if not p.exists():
    print('index.html not found at', p)
    sys.exit(2)
text = p.read_text(encoding='utf-8')

required_ids = ['candidateSelect','addCandidate','goal','reality','options','will','save','sessionsList','exportCSV','printPdf']
missing = []
for idname in required_ids:
    if not re.search(r'id\s*=\s*["\']%s["\']' % re.escape(idname), text):
        missing.append(idname)

required_funcs = ['function loadSession','function openEditModal','function openHistoryModal']
missing_funcs = [f for f in required_funcs if f not in text]

if missing:
    print('MISSING_ELEMENTS', missing)
if missing_funcs:
    print('MISSING_FUNCTIONS', missing_funcs)

if not missing and not missing_funcs:
    print('OK: static smoke tests passed')
    sys.exit(0)
else:
    sys.exit(1)
