"use client";

import { motion } from "framer-motion";

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function CarouselDots({ total, current, onSelect }: CarouselDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2" role="tablist">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="relative flex items-center justify-center min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
          style={{
            // @ts-expect-error CSS custom properties
            "--tw-ring-color": "var(--ath-green)",
            "--tw-ring-offset-color": "var(--hero-bg-base)",
          }}
          role="tab"
          aria-selected={index === current}
          aria-label={`Go to testimonial ${index + 1}`}
        >
          <motion.span
            className={`block rounded-full ${index !== current ? "hover:scale-125" : ""}`}
            animate={{
              width: index === current ? 24 : 8,
              height: 8,
              backgroundColor:
                index === current ? "var(--ath-green)" : "rgba(255, 255, 255, 0.3)",
              boxShadow:
                index === current
                  ? "0 0 10px var(--ath-green), 0 0 20px rgba(0, 255, 136, 0.3)"
                  : "none",
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </button>
      ))}
    </div>
  );
}
