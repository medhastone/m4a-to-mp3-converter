const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

css = css.replace(
  /:root \{[\s\S]*?--surface-container-highest: #cbd5e1;/m,
  `:root {
  --surface: #f4f4f1; 
  --surface-dim: #ebebe6;
  --surface-bright: #f9f9f8;
  --surface-container-lowest: #ffffff;
  --surface-container-low: #f9f9f8;
  --surface-container: #f4f4f1;
  --surface-container-high: #ebebe6;
  --surface-container-highest: #e2e2dc;`
);

fs.writeFileSync('app/globals.css', css);
