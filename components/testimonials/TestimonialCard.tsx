"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  metric: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  position: "center" | "left" | "right";
  direction?: 1 | -1;
}

const cardTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1] as const,
};

const SLIDE_DISTANCE = 35;

const slideVariants = {
  enter: (d: number) => ({
    x: d * SLIDE_DISTANCE,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (d: number) => ({
    x: d * -SLIDE_DISTANCE,
    opacity: 0,
  }),
};

export function TestimonialCard({
  testimonial,
  position,
  direction = 1,
}: TestimonialCardProps) {
  const isCenter = position === "center";

  return (
    <motion.div
      animate={{
        opacity: isCenter ? 1 : 0.7,
        scale: isCenter ? 1 : 0.88,
        y: isCenter ? 0 : 16,
        width: isCenter ? 420 : 340,
        borderColor: isCenter
          ? "rgba(0, 255, 136, 0.3)"
          : "rgba(255, 255, 255, 0.08)",
        boxShadow: isCenter
          ? "0 0 40px rgba(0, 255, 136, 0.12), 0 20px 40px rgba(0, 0, 0, 0.4)"
          : "0 8px 24px rgba(0, 0, 0, 0.2)",
      }}
      transition={cardTransition}
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        maxWidth: "calc(100vw - 48px)",
        zIndex: isCenter ? 2 : 1,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderWidth: 1,
        borderStyle: "solid",
        padding: "36px 32px",
      }}
    >
      {/* Decorative quote mark — top-right (static, no crossfade) */}
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

      {/* Directional slide on testimonial change */}
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={testimonial.name}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
        >
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
      </AnimatePresence>
    </motion.div>
  );
}
