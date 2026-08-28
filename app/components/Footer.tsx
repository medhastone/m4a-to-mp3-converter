import { Link } from "../../src/i18n/routing";
import { useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-auto border-t border-white/10 bg-surface py-16">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="flex flex-col xl:flex-row gap-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          <div>
            <h3 className="font-bold text-white mb-4">
              {t("devices_systems_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/metadata-viewer"
                  className="hover:text-primary transition-colors"
                >
                  {t("metadata_viewer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/iphone-voice-memos"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("iphone_voice_memos")}
                </Link>
              </li>
              <li>
                <Link
                  href="/windows"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("windows_fix")}
                </Link>
              </li>
              <li>
                <Link
                  href="/mac"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("mac_android_chromebook")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">
              {t("audio_fidelity_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/320kbps"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("studio_master_320kbps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#specs"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("standard_mp3_192kbps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#specs"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("speech_bitrate_128kbps")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">
              {t("tools_performance_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/batch-converter"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("batch_converter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/client-side-safe"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("client_side_safe")}
                </Link>
              </li>
              <li>
                <Link
                  href="/client-side-safe"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("zero_upload_architecture")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">
              {t("platform_legal_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("terms_of_service")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("about_us")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full xl:w-72 shrink-0 flex flex-col items-center xl:items-start">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center w-full max-w-[260px]">
            <h3 className="font-bold text-white mb-1.5 text-sm">Support This Free Tool</h3>
            <p className="text-slate-400 text-xs mb-3 leading-snug">
              Scan with any payment app or camera to buy a coffee ☕
            </p>
            <div className="bg-white p-2 rounded-xl mb-3 w-full flex justify-center max-w-[120px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/qr-code.png`} alt="Buy Me a Coffee QR Code" className="w-full h-auto aspect-square object-contain" />
            </div>
            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-semibold flex items-center gap-1"
            >
              Or open direct link <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-on-surface-variant">
            <a
              href="https://www.facebook.com/share/1FadEdrneX/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="Meta"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/zentova_in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/medha_stone?igsi=MXZzaDFta2VwMTNqdQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@medhastone?si=bqXCsWFRsJGFUP18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
          <p className="text-on-surface-variant text-sm text-center md:text-left">
            {t.rich("copyright", {
              link: (chunks) => (
                <Link
                  href="https://zentova.in"
                  target="_blank"
                  rel="noopener"
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <div className="flex items-center gap-4 text-on-surface-variant text-sm font-medium">
            {t("local_processing_badge")}
          </div>
        </div>
      </div>
    </footer>
  );
}
