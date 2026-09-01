const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');
if (!css.includes('@plugin "@tailwindcss/typography"')) {
    css = css.replace('@import "tailwindcss";', '@import "tailwindcss";\n@plugin "@tailwindcss/typography";');
    fs.writeFileSync('app/globals.css', css);
    console.log('Patched globals.css');
}
