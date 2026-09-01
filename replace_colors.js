const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Map dark mode hardcoded colors to semantic theme colors
            content = content.replace(/text-white/g, 'text-on-surface');
            content = content.replace(/text-slate-100/g, 'text-on-surface');
            content = content.replace(/text-slate-200/g, 'text-on-surface');
            content = content.replace(/text-slate-300/g, 'text-on-surface-variant');
            content = content.replace(/text-slate-400/g, 'text-on-surface-variant');
            content = content.replace(/text-slate-500/g, 'text-outline');
            
            content = content.replace(/bg-slate-950/g, 'bg-surface');
            content = content.replace(/bg-slate-900/g, 'bg-surface-container-high');
            content = content.replace(/bg-slate-800/g, 'bg-surface-container-highest');
            content = content.replace(/bg-slate-700/g, 'bg-surface-container-highest');
            
            content = content.replace(/border-slate-800/g, 'border-outline-variant');
            content = content.replace(/border-slate-700/g, 'border-outline');
            
            content = content.replace(/border-white\/10/g, 'border-outline-variant\/30');
            content = content.replace(/border-white\/5/g, 'border-outline-variant\/10');
            content = content.replace(/bg-white\/5/g, 'bg-on-surface\/5');
            content = content.replace(/bg-white\/10/g, 'bg-on-surface\/10');
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDir('app');
