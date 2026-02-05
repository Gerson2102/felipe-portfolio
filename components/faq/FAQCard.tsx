"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ToggleIcon } from "./ToggleIcon";

interface FAQCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function FAQCard({ question, answer, isOpen, onToggle, index }: FAQCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isOpen
          ? "inset 3px 0 0 var(--ath-green)"
          : "inset 3px 0 0 transparent",
        transition: "box-shadow 300ms ease-out, border-color 300ms ease-out, background-color 300ms ease-out",
      }}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.boxShadow = "inset 3px 0 0 var(--ath-green)";
          e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.2)";
        }
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.boxShadow = "inset 3px 0 0 transparent";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
        }
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-[rgba(255,255,255,0.03)] sm:p-6"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span
          className="pr-4 text-base font-medium sm:text-lg"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {question}
        </span>
        <ToggleIcon isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 sm:px-6 sm:pb-6"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-display)",
              }}
            >
              <p className="text-sm leading-relaxed sm:text-base">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
