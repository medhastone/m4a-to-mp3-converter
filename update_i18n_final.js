const fs = require('fs');

// Error keys
const errorKeys = {
  "title": "Something went wrong!",
  "default_message": "An unexpected error occurred.",
  "try_again": "Try again"
};

// WavToMp3SEO keys
const seoKeys = {
  "seo_how_to_title": "How to Convert WAV to MP3 Online in 3 Simple Steps With Our WAV to MP3 Converter",
  "seo_how_to_desc": "Wondering <strong>how to convert wav to mp3</strong> without installing clunky desktop audio editors or exposing your master stems to external cloud servers? Our client-side <strong>wav to mp3 converter</strong> delivers lightning-fast processing with zero file size limits, making your <strong>wav to mp3</strong> tasks effortless.",
  "seo_step1_label": "Step 1",
  "seo_step1_title": "Select or Drop Your WAV Audio File",
  "seo_step1_desc": "Drag your track or choose multiple files. Our <strong>online wav to mp3 converter</strong> handles high-resolution 24-bit/96kHz and 16-bit/44.1kHz studio exports seamlessly to <strong>convert wav to mp3</strong> with zero upload delays for optimal <strong>wav to mp3</strong> speed.",
  "seo_step2_label": "Step 2",
  "seo_step2_title": "Choose Output Quality &amp; Bitrate",
  "seo_step2_desc": "Select your preferred output profile. We recommend 320 kbps CBR (Constant Bitrate) for pristine acoustic dynamics or 192 kbps for balanced file sizes when you <strong>turn wav to mp3</strong> for streaming, securing a clean <strong>wav to mp3</strong> conversion.",
  "seo_step3_label": "Step 3",
  "seo_step3_title": "Transfer WAV to MP3 Instantly",
  "seo_step3_desc": "Click convert to process your audio locally. The engine transcodes the stream and lets you download your lightweight MP3 immediately or grab a ZIP package if you <strong>bulk wav to mp3</strong> convert using our fast <strong>wav to mp3</strong> processor.",
  "seo_wasm_title": "Client-Side WebAssembly vs. Remote Cloud Audio Converters",
  "seo_wasm_desc1": "Traditional web converters like CloudConvert and FreeConvert rely on server queues and mandatory cloud uploads. When dealing with uncompressed <strong>wav audio file to mp3</strong> conversions, uploading 50MB to 500MB WAV masters consumes enormous bandwidth, stalls on unstable mobile connections, and introduces data privacy vulnerabilities.",
  "seo_wasm_desc2": "Our advanced <strong>wav files to mp3 converter</strong> shifts the entire DSP (Digital Signal Processing) pipeline into client memory via compiled WebAssembly (WASM) and multi-threaded Web Workers. By leveraging your personal CPU cores, you <strong>convert wav to mp3</strong> with infinite throughput, zero file upload caps, and 100% airtight privacy.",
  "seo_wasm_client_title": "Our Client-Side WASM Engine",
  "seo_wasm_client_1": "<strong>Zero Server Uploads:</strong> Audio data is processed strictly in local RAM. Files never traverse public networks.",
  "seo_wasm_client_2": "<strong>No File Size Restrictions:</strong> Convert massive 1GB+ live concert recordings or entire albums without artificial paywalls.",
  "seo_wasm_client_3": "<strong>Parallel Multi-Core Concurrency:</strong> Concurrently <strong>bulk wav to mp3</strong> convert tracks utilizing browser web workers.",
  "seo_wasm_client_4": "<strong>Instantaneous Processing:</strong> Zero upload queuing, zero server delays, and instant offline-ready encoding.",
  "seo_wasm_legacy_title": "Legacy Cloud Converters",
  "seo_wasm_legacy_1": "<strong>Remote Upload Mandate:</strong> Large WAV files must upload to remote servers, risking interception of proprietary stems.",
  "seo_wasm_legacy_2": "<strong>Strict File Size Caps:</strong> Free tiers throttle conversion at 25MB or 50MB, demanding paid monthly subscriptions.",
  "seo_wasm_legacy_3": "<strong>Server Queue Bottlenecks:</strong> Conversions wait in shared queues during peak hours, creating frustrating delays.",
  "seo_wasm_legacy_4": "<strong>Bandwidth Wastage:</strong> Requires uploading large WAVs and re-downloading MP3s, consuming costly mobile data.",
  "seo_matrix_title": "Uncompressed WAV vs Compressed MP3: Bitrate & File Size Matrix",
  "seo_matrix_desc": "Compare the engineering properties of uncompressed Linear PCM WAV audio versus high-efficiency perceptual MP3 encoding. Converting your <strong>wav audio to mp3</strong> allows you to achieve up to a 90% reduction in file footprint while preserving psychoacoustically transparent audio reproduction.",
  "seo_matrix_h1": "Metric / Specification",
  "seo_matrix_h2": "Uncompressed WAV (Linear PCM)",
  "seo_matrix_h3": "Converted MP3 (LAME 320kbps)",
  "seo_matrix_r1_c1": "Audio Encoding / Container",
  "seo_matrix_r1_c2": "Linear PCM (Uncompressed)",
  "seo_matrix_r1_c3": "MPEG-1 Audio Layer III (Lossy Perceptual Coding)",
  "seo_matrix_r2_c1": "Bitrate",
  "seo_matrix_r2_c2": "1,411 kbps (16-bit / 44.1kHz Stereo)",
  "seo_matrix_r2_c3": "Up to 320 kbps (LAME CBR)",
  "seo_matrix_r3_c1": "Storage Footprint (per minute)",
  "seo_matrix_r3_c2": "~10.5 MB per minute",
  "seo_matrix_r3_c3": "~2.4 MB per minute (80%–90% storage reduction)",
  "seo_matrix_r4_c1": "Dynamic Range & Fidelity",
  "seo_matrix_r4_c2": "100% Lossless Master",
  "seo_matrix_r4_c3": "Psychoacoustically Optimized",
  "seo_matrix_r5_c1": "Primary Use Cases",
  "seo_matrix_r5_c2": "Digital Audio Workstations (DAWs, Audacity, Pro Tools)",
  "seo_matrix_r5_c3": "Universal Streaming, Car Stereos, Mobile Devices",
  "seo_use_cases_title": "Built for Audio Engineers, Podcasters, and Audacity Creators Who Need Fast WAV to MP3 Conversion",
  "seo_use_cases_desc": "Whether you are an audio engineer handling DAW stem exports or an audiobook narrator exporting from voice recorders, converting <strong>wav audio to mp3</strong> format is a vital everyday workflow. The need to <strong>convert wav to mp3</strong> frequently demands a reliable <strong>wav to mp3 converter</strong> that can handle <strong>bulk wav to mp3</strong> tasks. Our free <strong>online wav to mp3 converter</strong> provides the best <strong>wav to mp3</strong> experience for all creators.",
  "seo_use_case1_title": "Audacity WAV to MP3 Exports",
  "seo_use_case1_desc": "Skip cumbersome missing LAME library alerts. Export your raw master as WAV and use our <strong>audacity wav to mp3</strong> workflow to generate crisp 320kbps MP3s effortlessly in seconds. Our <strong>wav to mp3</strong> tool is ideal for this.",
  "seo_use_case2_title": "Studio Stems & Multi-Tracks",
  "seo_use_case2_desc": "When sharing multi-track stems with vocalists or clients, <strong>transfer wav to mp3</strong> in bulk to shrink a 2GB drum and bass session down to an easily shareable 200MB zip file using our <strong>wav to mp3</strong> engine.",
  "seo_use_case3_title": "Podcasts & ACX Compliance",
  "seo_use_case3_desc": "Publishing platforms like Spotify and Apple Podcasts require Constant Bitrate (CBR) MP3s. Our <strong>wav to mp3 converter</strong> delivers broadcast-standard encoding with zero compression artifacts during the <strong>wav to mp3</strong> transcoding.",
  "seo_faq_title": "Frequently Asked Questions About Converting WAV into MP3",
  "seo_faq1_q": "How do I convert a WAV audio file to MP3 for free?",
  "seo_faq1_a": "To convert a <strong>wav audio file to mp3</strong> for free, simply drag and drop your WAV tracks into the upload area above, select your desired bitrate (such as 320 kbps for studio quality), and click the Convert WAV to MP3 button. The conversion happens 100% in your browser using WebAssembly, meaning you can <strong>convert wav to mp3</strong> with no software installations, no accounts, and no file size limits. This makes our tool the premier <strong>free wav to mp3 converter</strong> for creators.",
  "seo_faq2_q": "How much smaller is an MP3 file compared to an uncompressed WAV audio file?",
  "seo_faq2_a": "An MP3 file encoded at 320 kbps is approximately 75% to 85% smaller than an uncompressed 16-bit/44.1kHz WAV audio file, and up to 90% smaller when encoded at 192 kbps. While a 5-minute uncompressed WAV file consumes over 50 MB of disk space, converting that <strong>wav audio to mp3</strong> at 320 kbps reduces the file size to roughly 11 MB while maintaining imperceptible psychoacoustic clarity. This dramatic compression is why many choose to <strong>transfer wav to mp3</strong> for distribution.",
  "seo_faq3_q": "How do I turn an Audacity WAV export into an MP3?",
  "seo_faq3_a": "To <strong>turn wav to mp3</strong> from an Audacity project, export your multi-track mix as a standard 16-bit or 24-bit WAV file, then drag the exported `.wav` file directly into this <strong>online wav to mp3 converter</strong>. This eliminates the need to install or configure external LAME libraries or FFmpeg binaries in Audacity, letting you achieve flawless <strong>audacity wav to mp3</strong> conversions directly in your browser.",
  "seo_faq4_q": "Does this wav files to mp3 converter support bulk or batch conversions?",
  "seo_faq4_a": "Yes, this <strong>wav files to mp3 converter</strong> fully supports <strong>bulk wav to mp3</strong> conversions. You can select dozens of audio tracks simultaneously. Our multi-threaded WebAssembly worker pool processes each file concurrently using your computer CPU cores with zero queue limits, allowing you to <strong>convert wav to mp3</strong> in batches and download all completed MP3 files in a convenient ZIP archive.",
  "seo_faq5_q": "Does converting WAV to 320kbps MP3 result in noticeable sound loss?",
  "seo_faq5_a": "Converting a <strong>wav audio file to mp3</strong> at 320 kbps CBR uses advanced psychoacoustic modeling to discard frequencies outside the normal human hearing range while preserving critical transient attacks, stereo imaging, and bass response. For 99% of listeners, studio monitors, and consumer headphones, our <strong>wav to mp3</strong> process is acoustically transparent, maintaining musical transparency while removing inaudible frequencies.",
  "seo_faq6_q": "Is it safe to convert proprietary or confidential audio on this site?",
  "seo_faq6_a": "Yes, it is completely safe to <strong>convert wav to mp3</strong> on this platform. Unlike conventional cloud audio converters that transmit your audio files across external internet servers, our <strong>online wav to mp3 converter</strong> performs every computation locally inside your device RAM via our zero-upload WebAssembly privacy model. Your files never leave your computer or web browser, ensuring complete confidentiality for sensitive podcasts, interviews, musical stems, and voice memos."
};

const wavPageKeys = {
  "meta_title": "WAV to MP3 Converter – Free, Fast & Private Online Tool",
  "meta_desc": "Convert WAV to MP3 online at 320kbps for free. Fast, client-side bulk audio conversion with zero file size limits—files never leave your web browser.",
  "og_title": "WAV to MP3 Converter – Unlimited, Fast & 100% In-Browser",
  "og_desc": "Convert studio WAV audio files to high-bitrate 320kbps MP3 without uploading to remote servers. Bulk processing, no file limits, and complete privacy.",
  "jsonLd_software_name": "WAV to MP3 Converter",
  "jsonLd_software_desc": "Free online client-side wav to mp3 converter with batch processing and zero file size limits for fast wav to mp3 workflows.",
  "jsonLd_howto_name": "How to Convert WAV to MP3 Online in 3 Simple Steps",
  "jsonLd_howto_desc": "Convert uncompressed studio WAV audio files into universally compatible, high-fidelity 320kbps MP3s in 3 simple steps using our wav to mp3 engine.",
  "jsonLd_step1_name": "Select or Drop Your WAV Audio File",
  "jsonLd_step1_text": "Drag your track or choose multiple files. Our online wav to mp3 converter handles high-resolution 24-bit/96kHz and 16-bit/44.1kHz studio exports seamlessly to ensure the best wav to mp3 experience.",
  "jsonLd_step2_name": "Choose Output Quality & Bitrate",
  "jsonLd_step2_text": "Select your preferred output profile. We recommend 320 kbps CBR (Constant Bitrate) for pristine acoustic dynamics or 192 kbps for balanced file sizes in your wav to mp3 output.",
  "jsonLd_step3_name": "Transfer WAV to MP3 Instantly",
  "jsonLd_step3_text": "Click convert to process your audio locally. The engine transcodes the stream and lets you download your lightweight MP3 immediately after the wav to mp3 process.",
  "jsonLd_faq1_q": "How do I convert a WAV audio file to MP3 for free?",
  "jsonLd_faq1_a": "To convert a wav audio file to mp3 for free, drag and drop your WAV tracks into the upload area, select your desired bitrate (up to 320 kbps for studio quality), and click the Convert WAV to MP3 button. The wav to mp3 conversion executes 100% locally in your web browser memory via WebAssembly without queues or fees.",
  "jsonLd_faq2_q": "How much smaller is an MP3 file compared to an uncompressed WAV audio file?",
  "jsonLd_faq2_a": "An MP3 file encoded at 320 kbps is approximately 75% to 85% smaller than an uncompressed 16-bit/44.1kHz WAV audio file, and up to 90% smaller when encoded at 192 kbps. While a 5-minute uncompressed WAV file consumes over 50 MB, the converted 320kbps MP3 requires only ~11 MB while maintaining imperceptible psychoacoustic difference after the wav to mp3 conversion.",
  "jsonLd_faq3_q": "How do I turn an Audacity WAV export into an MP3?",
  "jsonLd_faq3_a": "To turn wav to mp3 from an Audacity session, export your mix as standard WAV audio, then drop the file directly into our online wav to mp3 converter. You do not need to install additional LAME encoder binaries or FFmpeg libraries in Audacity for this wav to mp3 workflow.",
  "jsonLd_faq4_q": "Does this wav files to mp3 converter support bulk or batch conversions?",
  "jsonLd_faq4_a": "Yes, our wav files to mp3 converter natively supports multi-track bulk wav to mp3 conversions. Select multiple tracks at once and our parallel Web Worker architecture will transcode them concurrently, allowing you to download all files individually or as a single ZIP archive after the wav to mp3 tasks finish.",
  "jsonLd_faq5_q": "Does converting WAV to 320kbps MP3 result in noticeable sound loss?",
  "jsonLd_faq5_a": "Converting wav audio to mp3 at 320kbps CBR uses advanced psychoacoustic modeling to eliminate inaudible high frequencies while preserving transient dynamics, stereo imaging, and deep bass. For standard listening, studio monitors, and car stereos, our wav to mp3 output is acoustically transparent.",
  "jsonLd_faq6_q": "Is it safe to convert proprietary or confidential audio on this site?",
  "jsonLd_faq6_a": "Yes, it is 100% safe. Unlike traditional cloud converters that upload your audio to third-party servers, our wav to mp3 converter runs entirely in client-side WebAssembly. Your audio files never leave your device memory or traverse the network during the wav to mp3 encoding."
};

let en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

en.error = { ...en.error, ...errorKeys };

// Note: I will overwrite wav_to_mp3_seo
en.wav_to_mp3_seo = { ...seoKeys };
en.wav_to_mp3_page = { ...wavPageKeys };

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

// Update error.tsx
fs.writeFileSync('/app/applet/app/[locale]/error.tsx', `'use client';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  const t = useTranslations('error');
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold text-red-500">{t('title')}</h2>
      <p className="text-on-surface-variant max-w-md text-center">{error?.message || t('default_message')}</p>
      <button onClick={() => reset()} className="bg-primary px-6 py-2 rounded-lg text-on-primary font-medium">{t('try_again')}</button>
    </div>
  );
}`);

console.log("Updated en.json and error.tsx");
