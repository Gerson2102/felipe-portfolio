"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FAQCard } from "./FAQCard";

const faqData = [
  {
    question: "What is ATH Academy?",
    answer:
      "ATH Academy is a comprehensive cryptocurrency education platform designed to take you from beginner to confident investor. It features structured courses, live trading sessions, community support, and proven strategies developed from years of market experience.",
  },
  {
    question: "Who is this mentorship program for?",
    answer:
      "The mentorship program is ideal for anyone serious about cryptocurrency investing—whether you're just starting out or looking to refine your existing strategy. It's designed for individuals who want personalized guidance and accountability on their crypto journey.",
  },
  {
    question: "How is Felipe's approach different from other crypto educators?",
    answer:
      "Unlike many educators who focus solely on hype or short-term gains, Felipe emphasizes risk management, market cycle awareness, and sustainable wealth building. His teaching is grounded in real experience navigating multiple bull and bear markets since 2015.",
  },
  {
    question: "What can I expect from 1-on-1 mentorship sessions?",
    answer:
      "Each session is tailored to your specific goals and current portfolio. We cover portfolio analysis, entry and exit strategies, risk assessment, and market psychology. You'll receive actionable insights and a personalized roadmap for your investment journey.",
  },
  {
    question: "Does Felipe offer corporate workshops or speaking engagements?",
    answer:
      "Yes! Felipe regularly speaks at conferences, corporate events, and workshops. Topics range from blockchain fundamentals to advanced trading strategies. Each presentation is customized to your audience's knowledge level and objectives.",
  },
  {
    question: "How do I get started?",
    answer:
      "The best way to start is by exploring ATH Academy's free resources or booking an initial consultation call. From there, we can discuss which program best fits your goals—whether that's self-paced learning, group courses, or personalized mentorship.",
  },
];

export function FAQSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);

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

  const headlineWords = "Questions? We've Got Answers.".split(" ");

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
            FAQ
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
