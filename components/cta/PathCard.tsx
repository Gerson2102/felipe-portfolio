"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { GlowCard } from "@/components/services/GlowCard";
import { ShineButton } from "@/components/ui/ShineButton";

interface PathCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText: string;
  ctaVariant: "filled" | "outline";
  ctaHref: string;
  index: number;
  isInView: boolean;
  gradientPosition?: "left" | "right";
}

export function PathCard({
  icon,
  title,
  description,
  ctaText,
  ctaVariant,
  ctaHref,
  index,
  isInView,
  gradientPosition = "left",
}: PathCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <GlowCard className="h-full">
        <div
          className="relative flex h-full min-h-[320px] flex-col rounded-[20px] border border-[rgba(255,255,255,0.08)] p-10 transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(0,255,136,0.25)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4),0_0_40px_rgba(0,255,136,0.08)] md:p-12"
          style={{
            background: "#0a0a0a",
          }}
        >
          {/* Internal gradient in corner */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[20px]"
            style={{
              background:
                gradientPosition === "left"
                  ? "radial-gradient(300px circle at 0% 100%, rgba(0, 255, 136, 0.06), transparent 50%)"
                  : "radial-gradient(300px circle at 100% 100%, rgba(0, 255, 136, 0.06), transparent 50%)",
            }}
          />

          {/* Icon */}
          <div className="relative mb-6 text-[var(--ath-green)]">{icon}</div>

          {/* Title */}
          <h3
            className="relative mb-4 text-xl font-bold text-white md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="relative mb-8 flex-grow text-base leading-relaxed text-[rgba(255,255,255,0.6)]">
            {description}
          </p>

          {/* CTA Button */}
          <div className="relative">
            <ShineButton variant={ctaVariant} href={ctaHref}>
              {ctaText}
            </ShineButton>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
