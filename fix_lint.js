const fs = require('fs');
let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

content = content.replace(/Let's look/g, 'Let&apos;s look');
content = content.replace(/\("P" and "B" sounds\)/g, '(&quot;P&quot; and &quot;B&quot; sounds)');
content = content.replace(/"digital silence"/g, '&quot;digital silence&quot;');
content = content.replace(/"Delete,"/g, '&quot;Delete,&quot;');
content = content.replace(/"inter-sample peaking\."/g, '&quot;inter-sample peaking.&quot;');
content = content.replace(/listener's/g, 'listener&apos;s');
content = content.replace(/ACX's/g, 'ACX&apos;s');
content = content.replace(/device's/g, 'device&apos;s');

fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
console.log('Fixed linting issues');
