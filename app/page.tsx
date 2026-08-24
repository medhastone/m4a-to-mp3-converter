import Converter from './components/Converter';
import { Gauge, Activity, AudioLines } from 'lucide-react';

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="h-20 w-full px-5 lg:px-10 flex items-center justify-between mx-auto max-w-[1440px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded flex items-center justify-center shadow-lg">
               <AudioLines className="text-on-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-xl tracking-tight">M4A to MP3.com</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 mx-12">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="#">How it Works</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="#">Technical Specs</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="#">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(123,208,255,0.15)]">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_5px_rgba(123,208,255,0.8)]"></div>
              <span className="text-secondary font-jb-mono text-xs font-medium uppercase tracking-wider">100% Client-Side</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center cursor-pointer hover:bg-surface-bright transition-colors">
              <span className="text-on-surface-variant text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 w-full pb-20 relative z-0">
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

          {/* Asymmetric Data Visualization & Features */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
            {/* Feature Card 1 */}
            <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden group border border-white/5">
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-secondary/10 rounded-full blur-[40px] group-hover:bg-secondary/20 transition-colors duration-500"></div>
              <Gauge className="text-secondary w-10 h-10 mb-2 relative z-10" />
              <h3 className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 relative z-10">WASM Accelerated</h3>
              <p className="text-on-surface-variant flex-1 relative z-10">
                Utilizing WebAssembly for near-native FFmpeg execution directly in your browser. No queue lines.
              </p>
              <div className="mt-auto pt-6 border-t border-outline-variant/20 font-jb-mono text-xs text-on-surface-variant flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]"></div> 
                0% Server Overhead
              </div>
            </div>

            {/* Feature Card 2 (Hero Width) */}
            <div className="md:col-span-8 bg-surface-container-low rounded-2xl flex flex-col md:flex-row overflow-hidden group border border-white/5">
              <div className="p-8 flex flex-col justify-center gap-4 flex-1 z-10 relative bg-gradient-to-r from-surface-container-low to-transparent">
                <Activity className="text-primary w-8 h-8 mb-1 md:hidden" />
                <h3 className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">Waveform Integrity</h3>
                <p className="text-on-surface-variant text-base leading-relaxed max-w-md">
                  Our transcoding pipeline ensures minimal harmonic distortion, preserving the original dynamic range of your M4A files through advanced dither algorithms.
                </p>
                <div className="flex gap-3 mt-4">
                  <div className="bg-surface-dim px-3 py-1.5 rounded border border-outline-variant/30 font-jb-mono text-xs text-primary shadow-inner">320kbps Max</div>
                  <div className="bg-surface-dim px-3 py-1.5 rounded border border-outline-variant/30 font-jb-mono text-xs text-secondary shadow-inner">44.1kHz / 48kHz</div>
                </div>
              </div>
              
              {/* Abstract Waveform Graphic */}
              <div className="w-full md:w-5/12 min-h-[200px] relative bg-surface-dim/40 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full text-secondary opacity-30 drop-shadow-[0_0_15px_rgba(123,208,255,0.3)] absolute inset-0 scale-125" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d="M 0,50 Q 25,10 50,50 T 100,50 T 150,50 T 200,50" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                  <path className="text-primary opacity-40" d="M 0,50 Q 25,90 50,50 T 100,50 T 150,50 T 200,50" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-surface-container-low/50 to-surface-container-low hidden md:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-surface-container-low md:hidden"></div>
              </div>
            </div>
          </section>

          {/* Technical Specs Table (Bento Style) */}
          <section className="mt-8 flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight">Codec Comparison</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-outline-variant/40 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              {/* Headers */}
              <div className="hidden sm:block bg-surface-container p-6"></div>
              
              <div className="bg-surface-container p-6 flex flex-col items-center justify-center">
                <span className="font-semibold text-lg text-on-surface">M4A <span className="text-on-surface-variant font-normal">(Source)</span></span>
                <span className="font-jb-mono text-[10px] text-on-surface-variant uppercase tracking-[0.15em] mt-2 bg-surface-dim px-2 py-1 rounded">AAC / ALAC</span>
              </div>
              
              <div className="bg-surface-container-high p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
                <span className="font-bold text-xl text-primary drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]">MP3 <span className="text-primary-container font-normal">(Target)</span></span>
                <span className="font-jb-mono text-[10px] text-primary-container uppercase tracking-[0.15em] mt-2 bg-primary/10 px-2 py-1 rounded border border-primary/20">MPEG-1 Audio Layer III</span>
              </div>
              
              {/* Row 1 */}
              <div className="bg-surface-container-low p-5 flex items-center sm:justify-end">
                <span className="text-on-surface-variant text-sm font-medium">Compression Type</span>
              </div>
              <div className="bg-surface p-5 flex items-center justify-center">
                <span className="text-on-surface">Lossy / Lossless</span>
              </div>
              <div className="bg-surface p-5 flex items-center justify-center">
                <span className="text-on-surface">Lossy</span>
              </div>
              
              {/* Row 2 */}
              <div className="bg-surface-container-low p-5 flex items-center sm:justify-end">
                <span className="text-on-surface-variant text-sm font-medium">Compatibility</span>
              </div>
              <div className="bg-surface p-5 flex items-center justify-center text-center">
                <span className="text-on-surface">Apple Ecosystem, Modern Players</span>
              </div>
              <div className="bg-surface-dim p-5 flex items-center justify-center relative overflow-hidden group text-center">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <span className="text-primary font-bold relative z-10 drop-shadow-sm">Universal (99.9% Devices)</span>
              </div>
              
              {/* Row 3 */}
              <div className="bg-surface-container-low p-5 flex items-center sm:justify-end">
                <span className="text-on-surface-variant text-sm font-medium">File Extension</span>
              </div>
              <div className="bg-surface p-5 flex items-center justify-center">
                <code className="font-jb-mono text-xs bg-surface-container-highest px-3 py-1.5 rounded-md text-on-surface-variant border border-outline-variant/30">.m4a</code>
              </div>
              <div className="bg-surface p-5 flex items-center justify-center">
                <code className="font-jb-mono text-xs bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-md text-primary font-bold shadow-inner">.mp3</code>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-8 relative z-10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8">
              <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
              <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Use</a>
              <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Contact</a>
            </div>
            <p className="text-on-surface-variant text-sm flex items-center gap-2">
              &copy; 2024 M4A to MP3.com. All processing happens locally.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
