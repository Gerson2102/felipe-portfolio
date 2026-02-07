"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "./TestimonialCard";
import { CarouselDots } from "./CarouselDots";

const TESTIMONIAL_COUNT = 5;

const DEBOUNCE_MS = 350;

export function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { t } = useLanguage();

  const testimonialsData: Testimonial[] = useMemo(
    () =>
      Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => ({
        quote: t(`testimonials.${i}.quote`),
        name: t(`testimonials.${i}.name`),
        context: t(`testimonials.${i}.context`),
        metric: t(`testimonials.${i}.metric`),
      })),
    [t],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const startDebounce = useCallback(() => {
    setIsAnimating(true);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setIsAnimating(false);
    }, DEBOUNCE_MS);
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    startDebounce();
  }, [total, isAnimating, startDebounce]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    startDebounce();
  }, [total, isAnimating, startDebounce]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      startDebounce();
    },
    [isAnimating, startDebounce, currentIndex],
  );

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
    } else if (diff < -50) {
      goToPrev();
    }
  };

  const headlineWords = t("testimonials.headline").split(" ");

  const chevronButton = (dir: "prev" | "next") => (
    <button
      onClick={dir === "prev" ? goToPrev : goToNext}
      disabled={isAnimating}
      className="flex items-center justify-center flex-shrink-0 p-3 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        opacity: isAnimating ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "rgba(0, 255, 136, 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.05)";
      }}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
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
          points={dir === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
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
            {t("testimonials.badge")}
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
              <TestimonialCard
                key="slot-left"
                testimonial={testimonialsData[visibleIndices[0]]}
                position="left"
                direction={direction}
              />
              <TestimonialCard
                key="slot-center"
                testimonial={testimonialsData[visibleIndices[1]]}
                position="center"
                direction={direction}
              />
              <TestimonialCard
                key="slot-right"
                testimonial={testimonialsData[visibleIndices[2]]}
                position="right"
                direction={direction}
              />
            </div>

            {chevronButton("next")}
          </div>

          {/* Tablet: 1 card + arrows (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center justify-center gap-6">
            {chevronButton("prev")}

            <div className="flex items-center justify-center" style={{ maxWidth: 420 }}>
              <TestimonialCard
                key="slot-single"
                testimonial={testimonialsData[currentIndex]}
                position="center"
                direction={direction}
              />
            </div>

            {chevronButton("next")}
          </div>

          {/* Mobile: 1 card, swipe only (<md) */}
          <div className="flex md:hidden items-center justify-center">
            <div
              className="flex items-center justify-center w-full"
              style={{ maxWidth: 420 }}
            >
              <TestimonialCard
                key="slot-mobile"
                testimonial={testimonialsData[currentIndex]}
                position="center"
                direction={direction}
              />
            </div>
          </div>
        </div>

        {/* Dots navigation */}
        <div className="mt-8 flex items-center justify-center">
          <CarouselDots total={total} current={currentIndex} onSelect={goToIndex} />
        </div>

        {/* Mobile swipe hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-xs mt-4 md:hidden"
          style={{ color: "var(--text-muted)" }}
        >
          {t("testimonials.swipe")}
        </motion.p>
      </div>
    </section>
  );
}
