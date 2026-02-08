"use client";

import { useLanguage } from "@/lib/i18n/context";

export function FooterCredit() {
  const { t } = useLanguage();

  return (
    <footer className="w-full text-center py-6 px-4 bg-[#050505]">
      <p className="inline-flex items-center gap-1.5 text-[13px] text-white/35">
        <span>{t("footer.madeWith")}</span>
        <span
          className="inline-block text-red-500 animate-[heartbeat_1s_ease-in-out_infinite]"
          aria-label="love"
        >
          &#10084;
        </span>
        <span>{t("footer.by")}</span>
        <a
          href="https://www.instagram.com/websites_by_ger?igsh=azk3cGVhN2pnOWpz&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 font-medium hover:text-red-500 transition-colors border-b border-white/15 hover:border-red-500/40"
        >
          @websites_by_ger
        </a>
      </p>
    </footer>
  );
}
