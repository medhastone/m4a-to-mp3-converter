import re

with open('app/[locale]/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'Header from' not in content:
    content = content.replace("import { Inter, JetBrains_Mono } from 'next/font/google';", "import { Inter, JetBrains_Mono } from 'next/font/google';\nimport Header from '../components/Header';\nimport Footer from '../components/Footer';")
    
    content = content.replace("{children}", "<Header />\n        {children}\n        <Footer />")
    
    with open('app/[locale]/layout.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
        print("Updated layout with Header and Footer")
