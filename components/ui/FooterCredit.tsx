"use client";

import { useLanguage } from "@/lib/i18n/context";

export function FooterCredit() {
  const { t } = useLanguage();

  return (
    <footer className="w-full text-center py-6 px-4 bg-[#050505]">
      <p className="text-[13px] text-white/35">
        {t("footer.credit")}{" "}
        <a
          href="https://www.instagram.com/websites_by_ger?igsh=azk3cGVhN2pnOWpz&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-[#00ff88] border-b border-white/15 hover:border-[#00ff88]/40 transition-all duration-300"
        >
          @websites_by_ger
        </a>
      </p>
    </footer>
  );
}
