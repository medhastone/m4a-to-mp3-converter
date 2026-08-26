import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

(async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const langs = [
    { code: 'es', name: 'Spanish' },
  ];
  
  const textsToTranslate = [
    {
      id: 'step3_desc',
      original: `Once the CPU finishes the transcoding cycle, the new MP3 file is generated directly in your browser&apos;s local memory. A secure Blob URL is created, triggering an immediate download to your local hard drive or smartphone storage. Fast, incredibly efficient, and mathematically impossible for us to access your data.`,
    },
    {
      id: 'faq1_desc',
      original: `<strong>Absolutely not.</strong> Our application strictly adheres to a zero-upload architecture. All audio processing, decoding, and MP3 encoding happens locally inside your web browser using WebAssembly. Your files never touch our servers, meaning we never see, store, or transmit your private audio. It is mathematically impossible for us to access your data.`,
    },
    {
      id: 'faq2_desc',
      original: `<strong>M4A</strong> is an audio container primarily used by Apple. It generally uses the Advanced Audio Coding (AAC) codec, which offers excellent sound quality at lower bitrates. However, it often fails to play on non-Apple devices. <strong>MP3</strong> is the undisputed universal standard for digital audio. Converting your M4A to MP3 ensures flawless playback on older car stereos, smart TVs, Windows PCs, Android devices, and legacy hardware.`,
    }
  ];
  
  for (const lang of langs) {
    console.log(`Processing ${lang.name}...`);
    const filePath = path.join(process.cwd(), 'app', lang.code, 'page.tsx');
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const item of textsToTranslate) {
      if (content.includes(item.original)) {
        const prompt = `Translate the following English text to ${lang.name}. Return ONLY the translated text, preserving any HTML tags like <strong> exactly as they are. If there are HTML entities like &apos;, translate it naturally but feel free to output proper characters like ' or escape them as needed (though &apos; is fine). Do not include any other markdown formatting or intro/outro.\n\nText: ${item.original}`;
        
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
          });
          let translated = response.text.trim();
          translated = translated.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1&apos;$2");
          content = content.replace(item.original, translated);
          console.log(`Translated ${item.id} for ${lang.name}`);
        } catch (e) {
          console.error(`Error translating ${item.id} for ${lang.name}:`, e);
        }
      }
    }
    fs.writeFileSync(filePath, content);
  }
  console.log('Done!');
})();
