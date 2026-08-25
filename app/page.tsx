import Converter from './components/Converter';
import MobileMenu from './components/MobileMenu';
import { Gauge, Activity, AudioLines, Mic, Monitor, Smartphone, Layers, ShieldCheck, ChevronDown, Twitter, Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="h-20 w-full px-5 lg:px-10 flex items-center justify-between mx-auto max-w-[1440px]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
               <AudioLines className="text-on-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors">M4A to MP3 Converter<span className="text-primary">.com</span></span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 mx-12">
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="/#how-it-works">How it Works</Link>
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="/#specs">Technical Specs</Link>
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="/#faq">FAQ</Link>
                
            <div className="relative group">
              <button className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm flex items-center gap-1">
                Presets & Tools <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-50">
                <a href="/iphone-voice-memos.html" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">📱</span> iPhone Voice Memos
                </a>
                <a href="/320kbps.html" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🎵</span> 320kbps Studio Master
                </a>
                <a href="/batch-converter.html" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🗂️</span> Batch Audio Converter
                </a>
                <a href="/windows.html" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">💻</span> Windows 11 / 10 PC Fix
                </a>
                <a href="/mac.html" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🍏</span> Mac, Android & ChromeOS
                </a>
                <a href="/client-side-safe.html" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🔒</span> 100% Client-Side Safe
                </a>
              </div>
            </div>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
              <span className="text-emerald-400 font-jb-mono text-xs font-medium uppercase tracking-wider hidden sm:block">100% Client-Side</span>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="pt-28 w-full pb-20 relative z-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "M4A to MP3 Converter.com",
              "url": "https://m4atomp3converter.com/",
              "description": "A fast, 100% client-side M4A to MP3 audio converter. No server uploads, entirely private, and works instantly in your browser.",
              "applicationCategory": "MultimediaApplication",
              "browserRequirements": "Requires JavaScript. Runs entirely offline in the browser.",
              "operatingSystem": "Any",
              "featureList": [
                "100% Client-Side Processing",
                "Zero Server Uploads",
                "Instant Conversion",
                "High Fidelity 320kbps MP3 Output",
                "iPhone Voice Memo Support"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "M4A to MP3 Converter.com"
              },
              "author": {
                "@type": "Person",
                "name": "Medhastone",
                "url": "https://zentova.in"
              },
              "creator": {
                "@type": "Person",
                "name": "Medhastone",
                "url": "https://zentova.in"
              }
            })
          }}
        />
        {/* Interactive Background Element */}
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[150px] mix-blend-screen"></div>
          {/* Ambient Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-5 lg:px-10 flex flex-col gap-16 mt-8">
          
          {/* Hero / Converter Workspace */}
          <section className="w-full flex flex-col md:flex-row gap-8 items-start">
            {/* Typography Sidebar */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 pt-4 relative">
              <div className="absolute -left-5 top-4 w-1.5 h-24 bg-primary shadow-[0_0_20px_rgba(255,182,144,0.5)] rounded-r-full"></div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-sm">
                Studio-Grade <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary-container/40 drop-shadow-[0_4px_12px_rgba(249,115,22,0.3)]">Conversion.</span>
              </h1>
              <p className="text-white/70 mix-blend-plus-lighter max-w-sm mt-4 text-lg leading-relaxed">
                Locally transcode M4A to high-fidelity MP3. Zero server uploads. Absolute privacy. Maximum bit depth retention.
              </p>
              
              {/* Decorative Specs */}
              <div className="mt-8 flex gap-8 border-t border-outline-variant/30 pt-8">
                <div className="flex flex-col">
                  <span className="font-jb-mono text-[11px] text-secondary tracking-[0.1em] uppercase mb-1">Engine</span>
                  <span className="font-semibold text-lg text-on-surface">LAME v3.1</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-jb-mono text-[11px] text-secondary tracking-[0.1em] uppercase mb-1">Latency</span>
                  <span className="font-semibold text-lg text-on-surface">&lt; 200ms</span>
                </div>
              </div>
            </div>

            {/* Glassmorphism Converter Card */}
            <Converter />
          </section>

          {/* SEO Enhanced Sections: How it works, Technical Specs, FAQ */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent my-12"></div>

          <section id="how-it-works" className="mt-8 flex flex-col gap-10 scroll-mt-24">
            <div className="flex flex-col gap-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">How It Works: The Future of Browser-Native Audio Conversion</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Most traditional online audio converters force you to upload your personal iPhone Voice Memos, podcasts, and music files to a remote cloud server. This outdated process is slow, wastes bandwidth, and exposes your private audio files to third-party databases. 
                <br/><br/>
                We completely reimagined this architecture. By leveraging cutting-edge <strong>WebAssembly (WASM)</strong> technology, our tool runs the world-class FFmpeg audio engine <em>directly inside your web browser</em>. This means your computer or smartphone does all the work locally. The result? Instant conversions, zero upload wait times, and 100% guaranteed privacy. Here is the step-by-step breakdown of how our zero-upload transcoding pipeline operates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col gap-5 border border-white/5 shadow-xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
                  <span className="font-black text-9xl text-on-surface">1</span>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary mb-2 shadow-inner">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl text-on-surface">Select & Parse</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  Drag and drop your M4A files or iPhone Voice Memos directly onto the converter stage. Because there is <strong>zero upload required</strong>, our web app instantly reads the local file buffer using the HTML5 File API. It immediately parses the file headers, identifies the AAC or ALAC codec, and prepares the binary stream for processing without waiting for a server connection.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col gap-5 border border-white/5 shadow-xl relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
                  <span className="font-black text-9xl text-on-surface">2</span>
                </div>
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20 text-secondary mb-2 shadow-inner">
                  <Activity className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl text-on-surface">Client-Side Encoding</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  This is where the magic happens. Our embedded <strong>LAME v3.1 encoder</strong>, compiled to WebAssembly, springs into action. Using your device&apos;s own CPU and RAM, it perfectly transcodes the audio bit-by-bit from M4A into a universally compatible MP3 format. Advanced dithering algorithms ensure that harmonic distortion is minimized and the original dynamic range is preserved.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col gap-5 border border-white/5 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
                  <span className="font-black text-9xl text-on-surface">3</span>
                </div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 mb-2 shadow-inner">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl text-on-surface">Secure Download</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  Once the CPU finishes the transcoding cycle, the new MP3 file is generated directly in your browser&apos;s local memory. A secure Blob URL is created, triggering an immediate download to your local hard drive or smartphone storage. Fast, incredibly efficient, and mathematically impossible for us to access your data.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specs Table (Expanded) */}
          <section id="specs" className="mt-20 flex flex-col gap-10 scroll-mt-24">
            <div className="flex flex-col gap-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">Deep Technical Specifications & Codec Comparison</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Audio fidelity matters. Whether you are transcoding a quick iPhone voice memo for a Windows PC or converting a high-fidelity studio master track for archival, our tool offers full control over bitrate topology, sample rates, and file integrity. We utilize the industry-standard LAME encoder to ensure your MP3s sound incredible. Review our deep technical specifications and compare the M4A and MP3 formats below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-outline-variant/30 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              {/* Headers */}
              <div className="hidden sm:block bg-surface-container p-6"></div>
              
              <div className="bg-surface-container p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-surface-container-highest"></div>
                <span className="font-semibold text-2xl text-on-surface">M4A <span className="text-on-surface-variant font-normal text-lg">(Source)</span></span>
                <span className="font-jb-mono text-[11px] text-on-surface-variant uppercase tracking-[0.15em] mt-3 bg-surface-dim px-3 py-1.5 rounded-md border border-outline-variant/50 shadow-inner">AAC / ALAC Codec</span>
              </div>
              
              <div className="bg-surface-container-high p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                <span className="font-bold text-2xl text-primary drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]">MP3 <span className="text-primary-container font-normal text-lg">(Target)</span></span>
                <span className="font-jb-mono text-[11px] text-primary-container uppercase tracking-[0.15em] mt-3 bg-primary/10 px-3 py-1.5 rounded-md border border-primary/30 shadow-inner">MPEG-1 Audio Layer III</span>
              </div>
              
              {/* Row 1 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">Data Compression</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">Lossy (AAC) or Lossless (ALAC)</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">Strictly Lossy Compression</span>
              </div>
              
              {/* Row 2 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">Device Compatibility</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">Apple Ecosystem (iOS, macOS)</span>
              </div>
              <div className="bg-surface-dim p-6 flex items-center justify-center relative overflow-hidden group text-center border-t border-outline-variant/10">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <span className="text-primary font-bold relative z-10 drop-shadow-sm text-base">Universal (99.9% Hardware)</span>
              </div>
              
              {/* Row 3 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">Supported Bitrates</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">Variable, up to 320kbps+</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">Selectable: 128kbps, 192kbps, 320kbps</span>
              </div>

              {/* Row 4 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">Metadata Support</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">MP4 tags (iTunes metadata)</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">ID3v2 tags (Title, Artist, Album)</span>
              </div>
            </div>
          </section>

          {/* Comprehensive FAQ Section */}
          <section id="faq" className="mt-24 mb-12 flex flex-col gap-10 scroll-mt-24">
            <div className="flex flex-col gap-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">Frequently Asked Questions</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Have questions about converting your M4A audio files to MP3? We have compiled detailed answers regarding audio quality, privacy guarantees, technical limitations, and cross-platform compatibility. Read through our comprehensive FAQ below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Question 1 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Mic className="w-5 h-5" /></span>
                  Are my voice memos and private audio files uploaded to your servers?
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  <strong>Absolutely not.</strong> Our application strictly adheres to a zero-upload architecture. All audio processing, decoding, and MP3 encoding happens locally inside your web browser using WebAssembly. Your files never touch our servers, meaning we never see, store, or transmit your private audio. It is mathematically impossible for us to access your data.
                </p>
              </div>

              {/* Question 2 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Layers className="w-5 h-5" /></span>
                  What is the primary difference between M4A and MP3?
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  <strong>M4A</strong> is an audio container primarily used by Apple. It generally uses the Advanced Audio Coding (AAC) codec, which offers excellent sound quality at lower bitrates. However, it often fails to play on non-Apple devices. <strong>MP3</strong> is the undisputed universal standard for digital audio. Converting your M4A to MP3 ensures flawless playback on older car stereos, smart TVs, Windows PCs, Android devices, and legacy hardware.
                </p>
              </div>

              {/* Question 3 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Smartphone className="w-5 h-5" /></span>
                  How do I convert an iPhone Voice Memo to MP3?
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  Apple saves all voice memos in the M4A format by default. To convert them: open the Voice Memos app on your iPhone, tap the share icon on your recording, and select &quot;Save to Files&quot;. Then, open our converter in Safari or Chrome, click the upload area, select your saved M4A file from iCloud or local storage, and click convert. The new MP3 will instantly save to your Downloads folder.
                </p>
              </div>

              {/* Question 4 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><AudioLines className="w-5 h-5" /></span>
                  Does converting M4A to MP3 reduce my audio quality?
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  Both AAC (the codec inside M4A) and MP3 are lossy compression formats. Converting from one lossy format to another inherently causes a tiny bit of quality degradation, known as generation loss. However, if you select our <strong>320kbps Maximum Fidelity</strong> preset in the settings panel above, the difference is practically imperceptible to the human ear, even on studio monitors.
                </p>
              </div>
              
              {/* Question 5 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Activity className="w-5 h-5" /></span>
                  Is there a file size limit for audio conversion?
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  Because everything happens locally in your browser&apos;s memory (RAM), the limit depends on your specific device rather than our servers. There are no artificial limits imposed by us. Most modern smartphones and laptop computers can easily handle audio files ranging from a few megabytes up to 2GB in size without crashing or slowing down.
                </p>
              </div>

              {/* Question 6 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Monitor className="w-5 h-5" /></span>
                  Can I edit the ID3 tags (Title, Artist) during conversion?
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  Yes! We have built a robust ID3 metadata tagging system directly into the converter. Before you click &quot;Convert to MP3&quot;, you can optionally enter a custom Track Title, Artist Name, and Album. These tags will be permanently embedded into the resulting MP3 file, ensuring your audio is perfectly organized when imported into media players like Spotify, iTunes, or Windows Media Player.
                </p>
              </div>
              
            </div>
          </section>

        </div>
      </main>


      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 pt-16 pb-8 relative z-10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1 */}
            <div>
              <h4 className="font-bold text-on-surface mb-4">Devices & Systems</h4>
              <ul className="flex flex-col gap-3">
                <li><a href="/iphone-voice-memos.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">iPhone Voice Memos</a></li>
                <li><a href="/windows.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Windows 11 / 10 PC Fix</a></li>
                <li><a href="/mac.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Mac, Android & Chromebook</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold text-on-surface mb-4">Audio Fidelity</h4>
              <ul className="flex flex-col gap-3">
                <li><a href="/320kbps.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">320kbps Studio Master</a></li>
                <li><a href="https://m4atomp3converter.com/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">192kbps Standard MP3</a></li>
                <li><a href="https://m4atomp3converter.com/" className="text-sm text-on-surface-variant hover:text-primary transition-colors">128kbps Speech Bitrate</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-on-surface mb-4">Tools & Performance</h4>
              <ul className="flex flex-col gap-3">
                <li><a href="/batch-converter.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Batch Converter (No Limit)</a></li>
                <li><a href="/client-side-safe.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">100% Client-Side Safe</a></li>
                <li><a href="/client-side-safe.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Zero Upload Architecture</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-bold text-on-surface mb-4">Platform & Legal</h4>
              <ul className="flex flex-col gap-3">
                <li><a href="https://m4atomp3converter.com/privacy-policy.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="https://m4atomp3converter.com/terms.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="https://m4atomp3converter.com/about.html" className="text-sm text-on-surface-variant hover:text-primary transition-colors">About M4A to MP3 Converter.com</a></li>
              </ul>
            </div>

          </div>
          
          <div className="border-t border-outline-variant/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-on-surface-variant text-sm md:flex-1">
              &copy; 2026 M4A to MP3 Converter.com &bull; Engineered by <a href="https://zentova.in" target="_blank" rel="noopener" className="text-orange-400 hover:text-orange-300 font-semibold underline decoration-orange-500/30 transition">Medhastone</a> &bull; Support: medhastone@gmail.com
            </p>
            <div className="flex items-center gap-5 justify-center md:flex-1">
              <a href="https://x.com/zentova_in" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-transform hover:scale-110" aria-label="X (Twitter)">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1FadEdrneX/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-transform hover:scale-110" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@medhastone?si=bqXCsWFRsJGFUP18" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-transform hover:scale-110" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-on-surface-variant/60 text-xs font-jb-mono md:flex-1 md:text-right">
              100% Local In-Browser Processing • Zero Server Bandwidth
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
