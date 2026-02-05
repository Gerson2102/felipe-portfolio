"use client";

import { useEffect, useState, useRef } from "react";

interface UseProgressOptions {
  duration?: number;
  enabled?: boolean;
}

interface UseProgressReturn {
  progress: number;
  isComplete: boolean;
}

// easeOutQuart easing function
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useProgress({
  duration = 3500,
  enabled = false,
}: UseProgressOptions): UseProgressReturn {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && enabled) {
      setProgress(100);
      setIsComplete(true);
      return;
    }

    if (!enabled) {
      return;
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(rawProgress);
      const currentProgress = Math.round(easedProgress * 100);

      setProgress(currentProgress);

      if (rawProgress < 1) {
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
  }, [duration, enabled]);

  return {
    progress,
    isComplete,
  };
}
