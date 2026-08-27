const fs = require('fs'); 
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8')); 
['de', 'es', 'fr', 'pt'].forEach(lang => { 
    const target = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8')); 
    let missing = []; 
    function check(enObj, targetObj, path) { 
        for(let k in enObj) { 
            if (!targetObj || !targetObj[k]) {
                missing.push(path ? path + '.' + k : k);
            } else if (typeof enObj[k] === 'object') {
                check(enObj[k], targetObj[k], path ? path + '.' + k : k); 
            } else if (typeof targetObj[k] === 'string' && targetObj[k].includes(`[${lang.toUpperCase()}]`)) {
                missing.push((path ? path + '.' + k : k) + ' (has placeholder)'); 
            } 
        } 
    } 
    check(en, target, ''); 
    if(missing.length) console.log(`${lang} missing:`, missing); 
    else console.log(`${lang} is complete.`); 
});
