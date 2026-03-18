"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      autoResize: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const frameId = requestAnimationFrame(raf);

    // Stop Lenis if user enables reduced motion while page is open
    const handleChange = () => {
      if (mq.matches) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
    mq.addEventListener("change", handleChange);

    return () => {
      cancelAnimationFrame(frameId);
      mq.removeEventListener("change", handleChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
