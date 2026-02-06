"use client";

import { motion } from "framer-motion";
import { ElementType } from "react";

interface RevealTextProps {
  text: string;
  isInView: boolean;
  staggerDelay?: number;
  baseDelay?: number;
  className?: string;
  as?: ElementType;
}

export function RevealText({
  text,
  isInView,
  staggerDelay = 0.06,
  baseDelay = 0.2,
  className = "",
  as: Component = "p",
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: baseDelay + index * staggerDelay,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
