"use client";

import { motion } from "framer-motion";

export type IconVariant =
  | "free"
  | "academy"
  | "flash"
  | "mentorship"
  | "couples"
  | "vip";

interface ServiceIconProps {
  variant: IconVariant;
  isInView: boolean;
}

const STROKE_WIDTH = 2;

function FreeIcon({ isInView }: { isInView: boolean }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.rect
        x="12"
        y="22"
        width="24"
        height="18"
        rx="2"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        d="M 18 22 V 16 a 6 6 0 0 1 12 0"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.circle
        cx="24"
        cy="31"
        r="2"
        fill="var(--ath-green)"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      />
    </svg>
  );
}

function AcademyIcon({ isInView }: { isInView: boolean }) {
  const bars = [
    { height: 8, delay: 0 },
    { height: 14, delay: 0.1 },
    { height: 20, delay: 0.2 },
    { height: 28, delay: 0.3 },
    { height: 36, delay: 0.4 },
  ];

  return (
    <div className="flex h-12 w-12 items-end justify-center gap-1" aria-hidden="true">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="w-1.5 rounded-t-sm"
          style={{ backgroundColor: "var(--ath-green)" }}
          initial={{ height: 0 }}
          animate={isInView ? { height: bar.height } : { height: 0 }}
          transition={{
            duration: 0.5,
            delay: bar.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
}

function FlashIcon({ isInView }: { isInView: boolean }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.path
        d="M 28 4 L 12 26 L 22 26 L 20 44 L 36 22 L 26 22 Z"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        fill="rgba(0, 255, 136, 0.12)"
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={
          isInView
            ? { scale: 1, rotate: 0, opacity: 1 }
            : { scale: 0, rotate: -20, opacity: 0 }
        }
        transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </svg>
  );
}

function MentorshipIcon({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center" aria-hidden="true">
      <motion.div
        className="absolute h-8 w-8 rounded-full"
        style={{ border: "2px solid var(--ath-green)", left: "4px" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div
        className="absolute h-8 w-8 rounded-full"
        style={{ border: "2px solid var(--ath-green)", right: "4px" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.div
        className="absolute h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--ath-green)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={
          isInView
            ? { opacity: [0, 1, 0.7, 1], scale: [0, 1.2, 0.9, 1] }
            : {}
        }
        transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatDelay: 2 }}
      />
    </div>
  );
}

function CouplesIcon({ isInView }: { isInView: boolean }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.circle
        cx="16"
        cy="18"
        r="6"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.circle
        cx="32"
        cy="18"
        r="6"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25 }}
      />
      <motion.path
        d="M 6 40 Q 6 30 16 30 Q 24 30 24 38"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.path
        d="M 24 38 Q 24 30 32 30 Q 42 30 42 40"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      />
    </svg>
  );
}

function VipIcon({ isInView }: { isInView: boolean }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.path
        d="M 8 18 L 16 8 L 32 8 L 40 18 L 24 40 Z"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        fill="rgba(0, 255, 136, 0.08)"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.path
        d="M 8 18 L 24 18 L 40 18"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.path
        d="M 16 8 L 24 18 L 32 8 M 24 18 L 24 40"
        stroke="var(--ath-green)"
        strokeWidth={STROKE_WIDTH}
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      />
    </svg>
  );
}

export function ServiceIcon({ variant, isInView }: ServiceIconProps) {
  switch (variant) {
    case "free":
      return <FreeIcon isInView={isInView} />;
    case "academy":
      return <AcademyIcon isInView={isInView} />;
    case "flash":
      return <FlashIcon isInView={isInView} />;
    case "mentorship":
      return <MentorshipIcon isInView={isInView} />;
    case "couples":
      return <CouplesIcon isInView={isInView} />;
    case "vip":
      return <VipIcon isInView={isInView} />;
    default:
      return null;
  }
}
