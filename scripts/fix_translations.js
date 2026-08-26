import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Using async IIFE
(async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const langs = [
    { code: 'ja', name: 'Japanese' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'fr', name: 'French' },
  ];

  const textsToTranslate = [
    {
      id: 'step1_desc',
      original: `Drag and drop your M4A files or iPhone Voice Memos directly onto the converter stage. Because there is <strong>zero upload required</strong>, our web app instantly reads the local file buffer using the HTML5 File API. It immediately parses the file headers, identifies the AAC or ALAC codec, and prepares the binary stream for processing without waiting for a server connection.`,
    },
    {
      id: 'step2_title',
      original: `Client-Side Encoding`,
    },
    {
      id: 'step2_desc',
      original: `This is where the magic happens. Our embedded <strong>LAME v3.1 encoder</strong>, compiled to WebAssembly, springs into action. Using your device&apos;s own CPU and RAM, it perfectly transcodes the audio bit-by-bit from M4A into a universally compatible MP3 format. Advanced dithering algorithms ensure that harmonic distortion is minimized and the original dynamic range is preserved.`,
    },
    {
      id: 'step3_title',
      original: `Secure Download`,
    },
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
          
          // Escape single quotes for React unescaped entities rule
          translated = translated.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1&apos;$2");
          translated = translated.replace(/l'outil/gi, "l&apos;outil");
          translated = translated.replace(/d'appareil/gi, "d&apos;appareil");
          // Just generally escaping all single quotes is risky for HTML, but within text nodes it's fine.
          // Let's just do a naive replace of all standalone single quotes not in tags
          // But wait, the previous fix worked. Let's just replace ' with &apos; if it's between letters.
          
          content = content.replace(item.original, translated);
          console.log(`Translated ${item.id} for ${lang.name}`);
        } catch (e) {
          console.error(`Error translating ${item.id} for ${lang.name}:`, e);
        }
      } else {
        console.log(`${item.id} not found in ${lang.code}, might be already translated or formatting diff.`);
      }
    }

    fs.writeFileSync(filePath, content);
  }
  console.log('Done!');
})();
