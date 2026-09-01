const fs = require('fs');

// Patch AcxCheckerArticle.tsx
let article = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');
article = article.replace('prose-slate prose-invert', 'dark:prose-invert');
article = article.replace(/divide-slate-800/g, 'divide-outline-variant');
article = article.replace(/text-emerald-400/g, 'text-emerald-600 dark:text-emerald-400');
fs.writeFileSync('app/components/AcxCheckerArticle.tsx', article);

// Patch AcxChecker.tsx
let checker = fs.readFileSync('app/components/AcxChecker.tsx', 'utf8');
checker = checker.replace('text-slate-600', 'text-outline-variant');
checker = checker.replace('bg-white text-slate-900 hover:bg-slate-200', 'bg-surface text-on-surface hover:bg-surface-dim border border-outline-variant');
checker = checker.replace(/text-red-400/g, 'text-red-600 dark:text-red-400');
checker = checker.replace(/text-emerald-400/g, 'text-emerald-600 dark:text-emerald-400');
fs.writeFileSync('app/components/AcxChecker.tsx', checker);
