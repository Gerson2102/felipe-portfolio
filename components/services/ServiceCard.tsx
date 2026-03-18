"use client";

import { motion } from "framer-motion";
import { GlowCard } from "./GlowCard";
import { ServiceIcon } from "./ServiceIcon";

type IconVariant = "academy" | "mentorship" | "speaking";

interface ServiceCardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  iconVariant: IconVariant;
  index: number;
  isInView: boolean;
}

export function ServiceCard({
  title,
  description,
  cta,
  href,
  iconVariant,
  index,
  isInView,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <GlowCard className="group h-full rounded-2xl transition-transform duration-300 hover:-translate-y-2">
        <div
          className="relative flex h-full flex-col p-6 sm:p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.15),0_8px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Icon */}
          <div className="mb-5">
            <ServiceIcon variant={iconVariant} isInView={isInView} />
          </div>

          {/* Title */}
          <h3
            className="mb-3 text-xl font-semibold sm:text-2xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="mb-6 flex-grow text-sm leading-relaxed sm:text-base"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-secondary)",
            }}
          >
            {description}
          </p>

          {/* CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex cursor-pointer items-center py-3"
          >
            <span
              className="relative text-sm font-medium sm:text-base"
              style={{ color: "var(--ath-green)" }}
            >
              {cta}
              {/* Underline reveal */}
              <span
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover/cta:w-full"
                style={{ backgroundColor: "var(--ath-green)" }}
              />
            </span>
            {/* Arrow */}
            <span
              className="ml-2 inline-block transition-transform duration-300 group-hover/cta:translate-x-1"
              style={{ color: "var(--ath-green)" }}
            >
              →
            </span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </GlowCard>
    </motion.div>
  );
}
