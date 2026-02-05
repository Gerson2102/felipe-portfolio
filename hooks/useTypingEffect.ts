"use client";

import { useState, useEffect, useCallback } from "react";

type Phase = "typing" | "pausing" | "deleting" | "waiting";

export interface TypingPhrase {
  text: string;
  prefix?: string;
}

interface UseTypingEffectOptions {
  phrases: TypingPhrase[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  waitDuration?: number;
}

interface UseTypingEffectReturn {
  displayText: string;
  currentPrefix: string;
  isTyping: boolean;
  currentPhraseIndex: number;
}

export function useTypingEffect({
  phrases,
  typeSpeed = 65,
  deleteSpeed = 40,
  pauseDuration = 2500,
  waitDuration = 500,
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const currentPhrase = phrases[currentPhraseIndex];
  const currentPrefix = currentPhrase.prefix ?? "";

  const handleTyping = useCallback(() => {
    if (displayText.length < currentPhrase.text.length) {
      setDisplayText(currentPhrase.text.slice(0, displayText.length + 1));
    } else {
      setPhase("pausing");
    }
  }, [displayText, currentPhrase.text]);

  const handleDeleting = useCallback(() => {
    if (displayText.length > 0) {
      setDisplayText(displayText.slice(0, -1));
    } else {
      setPhase("waiting");
    }
  }, [displayText]);

  const handleWaiting = useCallback(() => {
    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    setPhase("typing");
  }, [phrases.length]);

  const handlePausing = useCallback(() => {
    setPhase("deleting");
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (phase) {
      case "typing":
        timeout = setTimeout(handleTyping, typeSpeed);
        break;
      case "pausing":
        timeout = setTimeout(handlePausing, pauseDuration);
        break;
      case "deleting":
        timeout = setTimeout(handleDeleting, deleteSpeed);
        break;
      case "waiting":
        timeout = setTimeout(handleWaiting, waitDuration);
        break;
    }

    return () => clearTimeout(timeout);
  }, [
    phase,
    handleTyping,
    handlePausing,
    handleDeleting,
    handleWaiting,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    waitDuration,
  ]);

  return {
    displayText,
    currentPrefix,
    isTyping: phase === "typing",
    currentPhraseIndex,
  };
}
