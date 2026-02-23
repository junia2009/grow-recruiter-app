const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const file = path.join(__dirname, '..', 'index.html');

JSDOM.fromFile(file, { runScripts: 'dangerously', resources: 'usable' }).then(dom => {
  const win = dom.window;
  // wait for load event or a short delay
  function runChecks(){
    try{
      const doc = win.document;
      const required = ['candidateSelect','addCandidate','goal','reality','options','will','save','sessionsList','exportCSV','printPdf'];
      const missing = required.filter(id => !doc.getElementById(id));
      if(missing.length){
        console.error('MISSING_ELEMENTS', missing);
        process.exit(2);
      }
      const funcs = ['loadSession','openEditModal','openHistoryModal'];
      const missingFuncs = funcs.filter(f => typeof win[f] !== 'function');
      if(missingFuncs.length){
        console.error('MISSING_FUNCTIONS', missingFuncs);
        process.exit(3);
      }
      console.log('OK: smoke tests passed');
      process.exit(0);
    }catch(err){
      console.error('ERROR', err);
      process.exit(1);
    }
  }

  if (win.document.readyState === 'complete') {
    runChecks();
  } else {
    win.addEventListener('load', runChecks);
    setTimeout(() => {
      // fallback
      if (win.document.readyState === 'complete') runChecks();
      else { console.error('TIMEOUT waiting for load'); process.exit(4); }
    }, 3000);
  }
}).catch(err=>{ console.error('JSDOM ERROR', err); process.exit(5); });
