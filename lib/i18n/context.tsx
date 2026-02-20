"use client";

import { createContext, useContext, useCallback, useEffect, useSyncExternalStore } from "react";
import type { Language, LanguageContextType } from "./types";
import { translations } from "./translations";

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "preferred-language";

// Custom event name for cross-component sync
const LANG_CHANGE_EVENT = "language-change";

function subscribeToLanguage(callback: () => void) {
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLanguageSnapshot(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  return "es";
}

function getLanguageServerSnapshot(): Language {
  return "es";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getLanguageServerSnapshot,
  );

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
  }, []);

  // Sync HTML lang attribute with selected language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language] as Record<string, string>;
      return dict[key] ?? key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
