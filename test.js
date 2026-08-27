const fs = require('fs');
const code = fs.readFileSync('node_modules/lamejs/lame.all.js', 'utf8');
const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
console.log(Object.keys(sandbox));
