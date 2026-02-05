"use client";

import { motion } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  metric: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  position: "center" | "left" | "right";
}

export function TestimonialCard({ testimonial, position }: TestimonialCardProps) {
  const isCenter = position === "center";

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{
        opacity: isCenter ? 1 : 0.55,
        scale: isCenter ? 1 : 0.93,
        y: isCenter ? 0 : 16,
        filter: isCenter ? "blur(0px)" : "blur(1px)",
      }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.9,
      }}
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: isCenter ? 420 : 340,
        maxWidth: "calc(100vw - 48px)",
        zIndex: isCenter ? 2 : 1,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: isCenter
          ? "1px solid rgba(0, 255, 136, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isCenter
          ? "0 0 40px rgba(0, 255, 136, 0.12), 0 20px 40px rgba(0, 0, 0, 0.4)"
          : "0 8px 24px rgba(0, 0, 0, 0.2)",
        padding: "36px 32px",
      }}
    >
      {/* Decorative quote mark — top-right */}
      <span
        className="absolute top-4 right-5 select-none pointer-events-none"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 72,
          lineHeight: 1,
          color: "var(--ath-green)",
          opacity: 0.15,
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* TOP: Person info */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{
            backgroundColor: "var(--ath-green-dim)",
            color: "var(--ath-green)",
            fontFamily: "var(--font-display)",
          }}
        >
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-xs truncate"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-muted)",
            }}
          >
            {testimonial.context}
          </p>
        </div>
      </div>

      {/* MIDDLE: Quote text */}
      <p
        className="mb-5"
        style={{
          fontSize: 15,
          lineHeight: 1.75,
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Thin divider */}
      <div
        className="w-full mb-4"
        style={{
          height: 1,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
      />

      {/* BOTTOM: Transformation metric */}
      <p
        className="text-xs font-medium"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--ath-green)",
        }}
      >
        {testimonial.metric}
      </p>
    </motion.div>
  );
}
