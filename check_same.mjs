import fs from 'fs';
const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const deData = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let same = [];
function compare(en, de, path) {
    if (typeof en === 'string' && typeof de === 'string') {
        if (en === de) {
            same.push(path);
        }
        // Also check if de starts with [DE]
        if (de.startsWith('[DE]')) {
            console.log('Found [DE] placeholder at:', path);
        }
    } else if (typeof en === 'object' && en !== null && de !== null) {
        for (let k in en) {
            compare(en[k], de[k], path ? path + '.' + k : k);
        }
    }
}
compare(enData, deData, '');
console.log('Same keys:', same.length);
if (same.length > 0) console.log(same.slice(0, 20));
