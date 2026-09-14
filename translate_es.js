const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translate() {
  const en = require('./messages/en.json');
  const targetKeys = ['wav_to_mp3_page'];
  const langs = [
    { code: 'es', name: 'Spanish' },
  ];

  for (const lang of langs) {
    console.log(`Translating for ${lang.name}...`);
    const file = `./messages/${lang.code}.json`;
    const targetJson = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    for (const key of targetKeys) {
      const sourceObj = en[key];
      const prompt = `Translate the following JSON values to ${lang.name}. Keep the JSON structure and keys exactly the same. Do not translate HTML tags or placeholders. Return ONLY valid JSON, no markdown blocks.

${JSON.stringify(sourceObj, null, 2)}`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
        });
        
        let text = response.text.trim();
        if (text.startsWith('```json')) text = text.replace(/```json\n?/, '');
        if (text.startsWith('```')) text = text.replace(/```\n?/, '');
        if (text.endsWith('```')) text = text.replace(/```$/, '');
        
        targetJson[key] = JSON.parse(text);
        console.log(`Translated ${key} for ${lang.code}`);
      } catch (e) {
        console.error(`Error translating ${key} for ${lang.code}:`, e);
      }
    }
    
    fs.writeFileSync(file, JSON.stringify(targetJson, null, 2));
  }
}

translate().catch(console.error);
