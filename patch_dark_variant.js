const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css = css.replace('@custom-variant dark (&:is(.dark *));', '@custom-variant dark (&:where(.dark, .dark *));');
fs.writeFileSync('app/globals.css', css);
