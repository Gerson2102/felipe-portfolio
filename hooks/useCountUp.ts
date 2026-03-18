"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
  suffix?: string;
}

interface UseCountUpReturn {
  value: number;
  formattedValue: string;
  isComplete: boolean;
}

// easeOutQuart easing function
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp({
  end,
  duration = 2000,
  enabled = false,
  suffix = "",
}: UseCountUpOptions): UseCountUpReturn {
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !enabled) return;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * end);

      setValue(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, enabled, prefersReducedMotion]);

  const finalValue = prefersReducedMotion && enabled ? end : value;
  const finalComplete = prefersReducedMotion && enabled ? true : isComplete;

  return {
    value: finalValue,
    formattedValue: `${finalValue}${suffix}`,
    isComplete: finalComplete,
  };
}
