import fs from 'fs';

const path = 'app/components/MobileMenu.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `
                <Link onClick={() => setIsOpen(false)} href="/wav-to-mp3" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🌊</span> {t('wav_to_mp3_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/video-to-mp3" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎬</span> {t('mp4_to_mp3_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/mp3-to-m4a" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔄</span> {t('mp3_to_m4a_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/iphone-voice-memos" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">📱</span> {t('iphone_voice_memos')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/320kbps" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎵</span> {t('studio_master')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/batch-converter" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🗂️</span> {t('batch_audio_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/windows" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">💻</span> {t('windows_pc_fix')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/mac" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🍏</span> {t('mac_android_chromeos')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/metadata-viewer" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🏷️</span> {t('metadata_viewer')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/audio-metadata-remover" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🛡️</span> Metadata Remover
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/client-side-safe" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/acx-checker" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎙️</span> ACX Audio Checker
                </Link>
`;

const regex = /<Link onClick=\{\(\) => setIsOpen\(false\)\} href="\/iphone-voice-memos"(?:.|\n)*?ACX Audio Checker\s*<\/Link>/;

if (regex.test(content)) {
  content = content.replace(regex, replacement.trim());
  fs.writeFileSync(path, content);
  console.log('MobileMenu updated.');
} else {
  console.log('Regex did not match.');
}
