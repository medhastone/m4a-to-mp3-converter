const fs = require('fs');

let content = fs.readFileSync('app/components/VideoToMp3Converter.tsx', 'utf8');

// Add import
if (!content.includes("import { useTranslations } from 'next-intl';")) {
  content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport { useTranslations } from 'next-intl';");
}

// Add hook
if (!content.includes("const t = useTranslations('video_converter');")) {
  content = content.replace("export default function VideoToMp3Converter() {", "export default function VideoToMp3Converter() {\n  const t = useTranslations('video_converter');");
}

// Replace UI strings
content = content.replace(
  /<span>Convert <span className="text-orange-500">MP4 to MP3<\/span> High Quality Without Losing Sound<\/span>/g,
  `<span dangerouslySetInnerHTML={{ __html: t('title') }} />`
);

content = content.replace(
  /Extract high-quality audio from any video\. 100% private in-browser WebAssembly processing\./g,
  `{t('subtitle')}`
);

content = content.replace(
  /<label className="text-\[10px\] uppercase font-bold text-on-surface-variant tracking-wider">Audio Quality<\/label>/g,
  `<label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">{t('audio_quality')}</label>`
);

content = content.replace(
  /<option value="320">320 kbps \(Studio Best\)<\/option>/g,
  `<option value="320">{t('kbps_320')}</option>`
);

content = content.replace(
  /<option value="256">256 kbps \(High Quality\)<\/option>/g,
  `<option value="256">{t('kbps_256')}</option>`
);

content = content.replace(
  /<option value="192">192 kbps \(Standard\)<\/option>/g,
  `<option value="192">{t('kbps_192')}</option>`
);

content = content.replace(
  /<option value="128">128 kbps \(Compact\)<\/option>/g,
  `<option value="128">{t('kbps_128')}</option>`
);

content = content.replace(
  /<option value="vbr-v0">VBR V0 \(Variable\)<\/option>/g,
  `<option value="vbr-v0">{t('vbr_v0')}</option>`
);

content = content.replace(
  /<h3 className="text-xl font-bold text-on-surface mb-2">Drop Videos Here<\/h3>/g,
  `<h3 className="text-xl font-bold text-on-surface mb-2">{t('drop_videos')}</h3>`
);

content = content.replace(
  /<p className="text-on-surface-variant max-w-sm mb-4">\s*Supports MP4, MOV, MKV, WEBM, AVI, FLV\.\s*<\/p>/g,
  `<p className="text-on-surface-variant max-w-sm mb-4">{t('supports')}</p>`
);

content = content.replace(
  /<button className="bg-primary hover:bg-primary\/90 text-on-primary px-6 py-2\.5 rounded-xl font-semibold transition-colors shadow-lg shadow-primary\/20 pointer-events-none">\s*Select Files\s*<\/button>/g,
  `<button className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-primary/20 pointer-events-none">{t('select_files')}</button>`
);

content = content.replace(
  /<span>Failed to load converter: \{initError\}<\/span>/g,
  `<span>{t('failed_to_load')} {initError}</span>`
);

content = content.replace(
  /<span className="font-semibold text-sm">Processing \{tasks\.length\} file\{tasks\.length !== 1 \? 's' : ''\}<\/span>/g,
  `<span className="font-semibold text-sm">{t('processing_files', { count: tasks.length })}</span>`
);

content = content.replace(
  /Download ZIP/g,
  `{t('download_zip')}`
);

content = content.replace(
  />Extracting audio\.\.\. \{task\.progress\}%<\/span>/g,
  `>{t('extracting', { progress: task.progress })}</span>`
);

content = content.replace(
  />Waiting for engine\.\.\.<\/span>/g,
  `>{t('waiting')}</span>`
);

content = content.replace(
  />Queued<\/span>/g,
  `>{t('queued')}</span>`
);

fs.writeFileSync('app/components/VideoToMp3Converter.tsx', content);
