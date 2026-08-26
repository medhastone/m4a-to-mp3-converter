import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const pages = ['terms', 'mac', 'about'];

async function main() {
  let allEnKeys = {};

  for (const page of pages) {
    console.log(`Processing ${page}...`);
    const filePath = `app/[locale]/${page}/page.tsx`;
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filePath}`);
        continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const prompt = `
    You are an expert React developer. I have a Next.js page component that currently uses a hardcoded HTML string inside dangerouslySetInnerHTML.
    I need you to rewrite the ENTIRE file so that:
    1. It is a proper React Server Component (remove 'use client' if it doesn't need it, or keep it if necessary, but since we use <Converter /> which is a client component, the page itself can be a server component).
    2. Convert all HTML to JSX (class -> className, for -> htmlFor, inline styles to objects, self-closing tags).
    3. REMOVE the massive \`useEffect\` with inline script loading vanilla JS.
    4. REPLACE the massive converter UI HTML (the part with dropzone, progress bars, bitrates) with simply:
       <Converter />
       (Make sure to import Converter from '../../components/Converter').
    5. Extract all user-facing text from the remaining SEO content (headings, paragraphs, lists) into translation keys.
    6. Use the next-intl hook:
       import { useTranslations } from 'next-intl';
       // Inside component: const t = useTranslations('${page.replace(/-/g, '_')}');
       // In JSX: <h1>{t('hero_title')}</h1>
    7. Retain the SEO HTML structure (tables, faq sections, icons).
    8. You must use lucide-react for icons instead of <i data-lucide="...">. E.g. <Apple className="w-4 h-4" /> instead of <i data-lucide="apple">. Import them from 'lucide-react'.

    Provide the output as a JSON object:
    {
      "newCode": "the complete new tsx file content",
      "enKeys": { "hero_title": "...", ... }
    }
    Respond ONLY with valid JSON. Do not wrap in markdown \`\`\`json.
    `;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [prompt, content]
      });
      let text = response.text;
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(text);
      
      fs.writeFileSync(filePath, result.newCode);
      allEnKeys[page.replace(/-/g, '_')] = result.enKeys;
      console.log(`Saved ${page}`);
    } catch (err) {
      console.error(`Error processing ${page}:`, err.message);
    }
  }

  fs.writeFileSync('remaining_keys.json', JSON.stringify(allEnKeys, null, 2));
  console.log('Done remaining!');
}

main();
