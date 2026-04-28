"use client";

import { motion } from "framer-motion";
import { GlowCard } from "./GlowCard";
import { ServiceIcon, type IconVariant } from "./ServiceIcon";

interface ServiceCardProps {
  badge: string;
  title: string;
  price: string;
  cadence: string;
  priceCompare?: string;
  description: string;
  bullets: string[];
  exclusions: string[];
  cta: string;
  href: string;
  iconVariant: IconVariant;
  index: number;
  isInView: boolean;
}

const STAGGER_DELAY = 0.08;

export function ServiceCard({
  badge,
  title,
  price,
  cadence,
  priceCompare,
  description,
  bullets,
  exclusions,
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
        duration: 0.5,
        delay: 0.2 + index * STAGGER_DELAY,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <GlowCard className="group h-full rounded-2xl transition-transform duration-300 hover:-translate-y-2">
        <div className="relative flex h-full flex-col p-6 sm:p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.15),0_8px_30px_rgba(0,0,0,0.3)]">
          {/* Icon */}
          <div className="mb-5">
            <ServiceIcon variant={iconVariant} isInView={isInView} />
          </div>

          {/* Card-level badge */}
          <span
            className="mb-3 inline-block self-start rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
            style={{
              backgroundColor: "var(--ath-green-dim)",
              color: "var(--ath-green)",
              border: "1px solid rgba(0, 255, 136, 0.25)",
            }}
          >
            {badge}
          </span>

          {/* Title */}
          <h3
            className="mb-2 text-xl font-semibold sm:text-2xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="mb-5 text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-secondary)",
            }}
          >
            {description}
          </p>

          {/* Price block */}
          <div className="mb-5">
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl font-bold tabular-nums sm:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                }}
              >
                {price}
              </span>
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {cadence}
              </span>
            </div>
            {priceCompare ? (
              <p
                className="mt-1.5 text-xs font-medium tabular-nums"
                style={{ color: "var(--ath-green)" }}
              >
                {priceCompare}
              </p>
            ) : null}
          </div>

          {/* Divider */}
          <div
            className="mb-5 h-px w-full"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          />

          {/* Bullets */}
          <ul className="mb-6 flex flex-grow flex-col gap-2.5">
            {bullets.map((bullet, i) => (
              <li
                key={`inc-${i}`}
                className="flex items-start gap-2.5 text-sm leading-snug"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-secondary)",
                }}
              >
                <CheckMark />
                <span>{bullet}</span>
              </li>
            ))}
            {exclusions.map((excl, i) => (
              <li
                key={`exc-${i}`}
                className="flex items-start gap-2.5 text-sm leading-snug"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "rgba(255, 255, 255, 0.4)",
                }}
              >
                <Minus />
                <span>{excl}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta mt-auto inline-flex min-h-[44px] cursor-pointer items-center py-3"
          >
            <span
              className="relative text-sm font-medium sm:text-base"
              style={{ color: "var(--ath-green)" }}
            >
              {cta}
              <span
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover/cta:w-full"
                style={{ backgroundColor: "var(--ath-green)" }}
              />
            </span>
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

function CheckMark() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 3 8.5 L 6.5 12 L 13 4.5"
        stroke="var(--ath-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Minus() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 4 8 L 12 8"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
