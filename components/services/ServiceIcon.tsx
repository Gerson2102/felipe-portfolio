"use client";

import { motion } from "framer-motion";

type IconVariant = "academy" | "mentorship" | "speaking";

interface ServiceIconProps {
  variant: IconVariant;
  isInView: boolean;
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
    <div className="flex h-12 w-12 items-end justify-center gap-1">
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

function MentorshipIcon({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {/* First circle */}
      <motion.div
        className="absolute h-8 w-8 rounded-full"
        style={{
          border: "2px solid var(--ath-green)",
          left: "4px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      {/* Second circle (overlapping) */}
      <motion.div
        className="absolute h-8 w-8 rounded-full"
        style={{
          border: "2px solid var(--ath-green)",
          right: "4px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      {/* Center pulse */}
      <motion.div
        className="absolute h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--ath-green)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={
          isInView
            ? {
                opacity: [0, 1, 0.7, 1],
                scale: [0, 1.2, 0.9, 1],
              }
            : {}
        }
        transition={{
          duration: 1,
          delay: 0.4,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </div>
  );
}

function SpeakingIcon({ isInView }: { isInView: boolean }) {
  const arcs = [
    { size: 16, delay: 0.2 },
    { size: 24, delay: 0.35 },
    { size: 32, delay: 0.5 },
  ];

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {/* Center dot */}
      <motion.div
        className="absolute h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--ath-green)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      {/* Broadcast arcs */}
      {arcs.map((arc, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: arc.size,
            height: arc.size,
            border: "2px solid var(--ath-green)",
            borderLeftColor: "transparent",
            borderBottomColor: "transparent",
            transform: "rotate(-45deg)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView
              ? {
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 1.2],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            delay: arc.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  );
}

export function ServiceIcon({ variant, isInView }: ServiceIconProps) {
  switch (variant) {
    case "academy":
      return <AcademyIcon isInView={isInView} />;
    case "mentorship":
      return <MentorshipIcon isInView={isInView} />;
    case "speaking":
      return <SpeakingIcon isInView={isInView} />;
    default:
      return null;
  }
}
