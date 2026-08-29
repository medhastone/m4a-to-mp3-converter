with open("app/components/Mp3ToM4aSEO.tsx", "r") as f:
    seo = f.read()

# Add useTranslations
if "import { useTranslations } from" not in seo:
    seo = "import { useTranslations } from 'next-intl';\n" + seo

seo = seo.replace(
    "export default function Mp3ToM4aSEO() {\n  return",
    "export default function Mp3ToM4aSEO() {\n  const t = useTranslations('mp3_to_m4a');\n  return"
)

# Replace all the text with t() and t.rich()
# Because there's a lot, I will write a quick regex replacement or just string replaces.

replacements = [
    ("How to Convert MP3 to M4A in 3 Simple Steps", "{t('step_title')}"),
    (">Upload Audio<", ">{t('step1_title')}<"),
    ("Drag & drop single or multiple MP3 audio files into the secure conversion zone above.", "{t('step1_desc')}"),
    (">Select Bitrate<", ">{t('step2_title')}<"),
    ("Choose your desired AAC bitrate preset (128 kbps, 192 kbps, 256 kbps, or 320 kbps) for optimal quality.", "{t('step2_desc')}"),
    (">Convert & Download<", ">{t('step3_title')}<"),
    ("Click convert and download individual M4A tracks or batch export as a convenient ZIP file instantly.", "{t('step3_desc')}"),
    (">          Why Convert MP3 to AAC/M4A?\n        <", ">          {t('why_title')}\n        <"),
    (">          While MP3 has been the standard for decades, it is functionally a legacy format. Converting your files to the M4A container (using the advanced AAC codec) provides significant technical advantages. AAC was designed to be the successor to MP3, offering superior acoustic efficiency and broader frequency spectrum retention at lower file sizes.\n        <", ">\n          {t('why_p1')}\n        <"),
    (
        "If you are entrenched in the Apple ecosystem, this format is highly recommended. M4A offers seamless playback across Apple devices like the iPhone, iPad, Mac, and iTunes. Additionally, if you need a reliable <strong>mp3 to m4a ringtone converter</strong>, standardizing your files to M4A ensures perfect compatibility with modern mobile operating systems.",
        "{t.rich('why_p2', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (">Detailed Bitrate & Quality Guide<", ">{t('bitrate_title')}<"),
    (">Preset Bitrate<", ">{t('bitrate_th1')}<"),
    (">Codec Standard<", ">{t('bitrate_th2')}<"),
    (">Best Use Case<", ">{t('bitrate_th3')}<"),
    (">Relative File Size & Quality<", ">{t('bitrate_th4')}<"),
    (">Voice / Podcasts<", ">{t('bitrate_128_use')}<"),
    (">Smallest size; acceptable acoustic quality for speech.<", ">{t('bitrate_128_desc')}<"),
    (">Everyday Listening<", ">{t('bitrate_192_use')}<"),
    (">Balanced size; transparent quality for standard car speakers or casual earbuds.<", ">{t('bitrate_192_desc')}<"),
    (">Apple Music Standard<", ">{t('bitrate_256_use')}<"),
    (">Slightly larger; practically indistinguishable from the original CD source for most listeners.<", ">{t('bitrate_256_desc')}<"),
    (">Studio / Orchestral<", ">{t('bitrate_320_use')}<"),
    (">Largest size; preserves complex frequency details for high-end acoustic gear.<", ">{t('bitrate_320_desc')}<"),
    (">          Key Features of Our Client-Side Audio Engine\n        <", ">          {t('features_title')}\n        <"),
    (">100% Client-Side Privacy<", ">{t('feat1_title')}<"),
    (
        "No audio data ever touches a remote server. When you use this <strong>mp3 to m4a converter online free</strong>, all processing occurs directly in your browser.",
        "{t.rich('feat1_desc', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (">Batch Processing<", ">{t('feat2_title')}<"),
    (
        "Convert dozens of files simultaneously without server queue delays. This is the fastest <strong>batch mp3 to m4a converter online</strong> available.",
        "{t.rich('feat2_desc', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (">Preserved Audio Metadata<", ">{t('feat3_title')}<"),
    (
        "Retains your crucial ID3 tags (Artist, Album, Title) mapped automatically to MP4 atoms during the conversion process.",
        "{t('feat3_desc')}"
    ),
    (">No Software Installation<", ">{t('feat4_title')}<"),
    (
        "Seamlessly <strong>convert mp3 to aac m4a in browser</strong> across all modern desktop and mobile operating systems natively.",
        "{t.rich('feat4_desc', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (
        ">          Frequently Asked Questions\n        <",
        ">          {t('faq_title')}\n        <"
    ),
    (
        ">              How to convert MP3 to M4A without losing sound quality?\n            <",
        ">\n              {t('faq1_q')}\n            <"
    ),
    (
        "To <strong>convert mp3 to m4a without losing sound quality</strong>, you should match or slightly exceed the original bitrate of your MP3 file. For example, if your MP3 is 192kbps, selecting the 192kbps or <strong>mp3 to m4a 256kbps online</strong> preset ensures that you preserve all audible acoustic data during the codec transition.",
        "{t.rich('faq1_a', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (
        ">              Is there a file size limit when converting large audio files?\n            <",
        ">\n              {t('faq2_q')}\n            <"
    ),
    (
        "No. Because our engine operates entirely locally within your browser, there are no artificial caps. You can easily <strong>convert large mp3 to m4a online without server upload</strong> restrictions, limited only by your device&apos;s available RAM and processing power. It is the <strong>best mp3 to m4a audio converter online free no limit</strong> solution available.",
        "{t.rich('faq2_a', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (
        ">              Can I convert MP3 to M4A directly on iPhone without downloading an app?\n            <",
        ">\n              {t('faq3_q')}\n            <"
    ),
    (
        "Yes, you can absolutely <strong>convert mp3 to m4a on iphone</strong> directly through Safari. Since the tool relies on modern WebAssembly and the Web Audio API, the entire process runs natively in your mobile browser, saving you from downloading bulky third-party applications.",
        "{t.rich('faq3_a', { bold: (chunks) => <strong>{chunks}</strong> })}"
    ),
    (
        ">              Why is 256kbps AAC considered better than 320kbps MP3?\n            <",
        ">\n              {t('faq4_q')}\n            <"
    ),
    (
        "AAC (the audio codec used inside M4A files) is a much newer and more efficient algorithm than MP3. A 256kbps AAC file retains high-frequency clarity and transient details better than a legacy 320kbps MP3, while typically resulting in a smaller overall file size. This is why Apple Music uses 256kbps AAC as their standard encoding format.",
        "{t('faq4_a')}"
    ),
    (
        ">              Are my audio files uploaded to your server during conversion?\n            <",
        ">\n              {t('faq5_q')}\n            <"
    ),
    (
        "Never. Our architecture guarantees a <strong>fast mp3 to m4a without uploading</strong> experience. Your files remain entirely on your local hard drive or mobile storage. The conversion happens strictly client-side, ensuring your personal audio and intellectual property are completely private.",
        "{t.rich('faq5_a', { bold: (chunks) => <strong>{chunks}</strong> })}"
    )
]

for old, new in replacements:
    seo = seo.replace(old, new)

with open("app/components/Mp3ToM4aSEO.tsx", "w") as f:
    f.write(seo)
