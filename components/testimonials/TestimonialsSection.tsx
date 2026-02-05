"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "./TestimonialCard";
import { CarouselDots } from "./CarouselDots";

const testimonialsData: Testimonial[] = [
  {
    quote:
      "Before joining the Academy, I was making emotional trades and panic selling at every dip. Felipe taught me to think in cycles, not days. Now I actually sleep at night knowing my strategy is sound.",
    name: "Carlos M.",
    context: "Academy Student, 2024",
    metric: "8 months \u00b7 from panic selling to strategic holding",
  },
  {
    quote:
      "I was completely confused by all the conflicting advice online. The 1-on-1 mentorship cut through the noise. Felipe helped me build a plan that fits my risk tolerance and goals.",
    name: "Mar\u00eda L.",
    context: "1-on-1 Mentorship Client",
    metric: "3 months \u00b7 from confused to confident",
  },
  {
    quote:
      "The structured curriculum in ATH Academy gave me what years of YouTube videos couldn\u2019t\u2014a real foundation. I finally understand why things move, not just that they move.",
    name: "Andr\u00e9s R.",
    context: "Academy Student, 2023",
    metric: "1 year \u00b7 from scattered learning to structured growth",
  },
  {
    quote:
      "I started as a complete beginner with zero technical knowledge. The Academy\u2019s step-by-step approach made everything click. Now I research projects on my own and make decisions with confidence.",
    name: "Luc\u00eda V.",
    context: "Academy Student, 2024",
    metric: "5 months \u00b7 from complete beginner to self-directed",
  },
  {
    quote:
      "The mentorship wasn\u2019t just theory\u2014Felipe helped me actually execute. We reviewed my portfolio together, identified weak spots, and built a system I still use today.",
    name: "Diego P.",
    context: "1-on-1 Mentorship Client",
    metric: "6 months \u00b7 from theory to real-world execution",
  },
];

export function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = testimonialsData.length;

  // Blinking cursor that stops after 2 blinks
  useEffect(() => {
    if (!isInView || blinkCount >= 4) {
      setShowCursor(true);
      return;
    }
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
      setBlinkCount((prev) => prev + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [isInView, blinkCount]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-advance every 7s, pause on hover
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(goToNext, 7000);
    return () => clearInterval(timer);
  }, [isPaused, isInView, goToNext]);

  // Visible triplet for desktop: [prev, current, next]
  const visibleIndices = useMemo(() => {
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return [prev, currentIndex, next];
  }, [currentIndex, total]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      goToNext();
      setIsPaused(true);
    } else if (diff < -50) {
      goToPrev();
      setIsPaused(true);
    }
  };

  const headlineWords = "Real People, Real Results".split(" ");

  const chevronButton = (direction: "prev" | "next") => (
    <button
      onClick={direction === "prev" ? goToPrev : goToNext}
      className="flex items-center justify-center flex-shrink-0 p-3 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "rgba(0, 255, 136, 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.05)";
      }}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--ath-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline
          points={direction === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
        />
      </svg>
    </button>
  );

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--hero-bg-base)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Terminal-style badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center"
        >
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.2em]"
            style={{
              backgroundColor: "var(--ath-green-dim)",
              color: "var(--ath-green)",
              border: "1px solid rgba(0, 255, 136, 0.3)",
            }}
          >
            TESTIMONIALS
            <span
              className="ml-1"
              style={{
                opacity: showCursor ? 1 : 0,
                transition: "opacity 100ms",
              }}
            >
              _
            </span>
          </span>
        </motion.div>

        {/* Word-by-word headline */}
        <h2
          className="mb-12 text-center text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px] lg:mb-16"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Carousel — Desktop: 3 cards | Tablet/Mobile: 1 card */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop: 3-card flex layout (lg+) */}
          <div className="hidden lg:flex items-center justify-center gap-8 px-4">
            {chevronButton("prev")}

            <div className="flex flex-1 min-w-0 items-start justify-center gap-8">
              <AnimatePresence mode="popLayout">
                {visibleIndices.map((i) => {
                  const position =
                    i === currentIndex
                      ? "center"
                      : i === visibleIndices[0]
                        ? "left"
                        : "right";
                  return (
                    <TestimonialCard
                      key={`${i}-${testimonialsData[i].name}`}
                      testimonial={testimonialsData[i]}
                      position={position as "center" | "left" | "right"}
                    />
                  );
                })}
              </AnimatePresence>
            </div>

            {chevronButton("next")}
          </div>

          {/* Tablet: 1 card + arrows (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center justify-center gap-6">
            {chevronButton("prev")}

            <div className="flex items-center justify-center" style={{ maxWidth: 420 }}>
              <AnimatePresence mode="popLayout">
                <TestimonialCard
                  key={`mobile-${currentIndex}-${testimonialsData[currentIndex].name}`}
                  testimonial={testimonialsData[currentIndex]}
                  position="center"
                />
              </AnimatePresence>
            </div>

            {chevronButton("next")}
          </div>

          {/* Mobile: 1 card, swipe only (<md) */}
          <div className="flex md:hidden items-center justify-center">
            <div
              className="flex items-center justify-center w-full"
              style={{ maxWidth: 420 }}
            >
              <AnimatePresence mode="popLayout">
                <TestimonialCard
                  key={`sm-${currentIndex}-${testimonialsData[currentIndex].name}`}
                  testimonial={testimonialsData[currentIndex]}
                  position="center"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dots navigation + pause/play */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <CarouselDots total={total} current={currentIndex} onSelect={goToIndex} />
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: "rgba(0, 255, 136, 0.1)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
            }}
            aria-label={isPaused ? "Play testimonial carousel" : "Pause testimonial carousel"}
          >
            {isPaused ? (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="var(--ath-green)">
                <polygon points="0,0 12,7 0,14" />
              </svg>
            ) : (
              <svg width="10" height="14" viewBox="0 0 10 14" fill="var(--ath-green)">
                <rect x="0" y="0" width="3" height="14" />
                <rect x="7" y="0" width="3" height="14" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile swipe hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-xs mt-4 md:hidden"
          style={{ color: "var(--text-muted)" }}
        >
          Swipe to explore
        </motion.p>
      </div>
    </section>
  );
}
