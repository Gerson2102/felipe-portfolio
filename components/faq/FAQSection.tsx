"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { FAQCard } from "./FAQCard";

const FAQ_COUNT = 6;

export function FAQSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { language, t } = useLanguage();

  const faqData = useMemo(
    () =>
      Array.from({ length: FAQ_COUNT }, (_, i) => ({
        question: t(`faq.${i}.question`),
        answer: t(`faq.${i}.answer`),
      })),
    [t],
  );

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const [prevLanguage, setPrevLanguage] = useState(language);

  // Reset accordion on language change
  if (prevLanguage !== language) {
    setPrevLanguage(language);
    setOpenIndex(0);
  }

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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headlineWords = t("faq.headline").split(" ");

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 lg:py-32"
      style={{ backgroundColor: "var(--hero-bg-dark)" }}
    >
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
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
            {t("faq.badge")}
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
          className="mb-12 text-center text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px]"
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

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQCard
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
