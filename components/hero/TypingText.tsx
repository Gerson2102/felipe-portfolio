"use client";

import { useTypingEffect, TypingPhrase } from "@/hooks/useTypingEffect";

interface TypingTextProps {
  phrases: TypingPhrase[];
  className?: string;
}

export function TypingText({ phrases, className = "" }: TypingTextProps) {
  const { displayText, currentPrefix, currentPhraseIndex } = useTypingEffect({
    phrases,
  });

  // Find the longest full string (prefix + text) to reserve width
  const longestPhrase = phrases.reduce((longest, phrase) => {
    const full = (phrase.prefix ?? "") + phrase.text;
    return full.length > longest.length ? full : longest;
  }, "");

  return (
    <span
      className={`relative inline-block ${className}`}
      aria-label={`${currentPrefix}${phrases[currentPhraseIndex].text}`}
      aria-live="polite"
    >
      {/* Invisible spacer to reserve width and prevent CLS */}
      <span className="invisible block h-0 overflow-hidden" aria-hidden="true">
        {longestPhrase}
      </span>
      {currentPrefix}
      {displayText}
      <span
        className="animate-blink ml-0.5 inline-block"
        style={{ color: "var(--ath-green)" }}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
}
