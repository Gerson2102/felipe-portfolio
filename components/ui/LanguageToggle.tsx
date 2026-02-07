"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="relative inline-flex items-center gap-0.5 rounded-full p-0.5"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
        background: "rgba(255, 255, 255, 0.03)",
        height: "32px",
      }}
    >
      {(["en", "es"] as const).map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className="relative z-10 flex items-center justify-center rounded-full px-3"
            style={{
              height: "26px",
              fontSize: "12px",
              fontWeight: isActive ? 600 : 400,
              textTransform: "uppercase",
              color: isActive ? "#00ff88" : "rgba(255, 255, 255, 0.4)",
              transition: "color 0.2s",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)";
              }
            }}
            aria-label={lang === "en" ? "Switch to English" : "Cambiar a Espa\u00f1ol"}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "rgba(0, 255, 136, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{lang.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
