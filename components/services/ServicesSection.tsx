"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { ServiceCard } from "./ServiceCard";
import type { IconVariant } from "./ServiceIcon";
import { ATH_LINKS } from "@/lib/links";

interface ServiceMeta {
  href: string;
  iconVariant: IconVariant;
  hasPriceCompare?: boolean;
}

const servicesMeta: ServiceMeta[] = [
  { href: ATH_LINKS.freeCourse, iconVariant: "free" },
  { href: ATH_LINKS.pricing, iconVariant: "academy" },
  { href: ATH_LINKS.pricing, iconVariant: "flash" },
  { href: ATH_LINKS.pricing, iconVariant: "mentorship" },
  { href: ATH_LINKS.pricing, iconVariant: "couples", hasPriceCompare: true },
  { href: ATH_LINKS.pricing, iconVariant: "vip" },
];

function splitLines(value: string): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ServicesSection() {
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const { t } = useLanguage();
  const [blinkCount, setBlinkCount] = useState(0);
  const showCursor = !isInView || blinkCount >= 4 || blinkCount % 2 === 0;

  const servicesData = useMemo(
    () =>
      servicesMeta.map((meta, i) => {
        const priceCompareKey = `services.${i}.priceCompare`;
        const rawPriceCompare = meta.hasPriceCompare ? t(priceCompareKey) : "";
        return {
          ...meta,
          badge: t(`services.${i}.badge`),
          title: t(`services.${i}.title`),
          price: t(`services.${i}.price`),
          cadence: t(`services.${i}.cadence`),
          priceCompare:
            rawPriceCompare && rawPriceCompare !== priceCompareKey
              ? rawPriceCompare
              : undefined,
          description: t(`services.${i}.description`),
          bullets: splitLines(t(`services.${i}.bullets`)),
          exclusions: splitLines(t(`services.${i}.exclusions`)),
          cta: t(`services.${i}.cta`),
        };
      }),
    [t],
  );

  // Blinking cursor that stops after 4 toggles (2 blinks)
  useEffect(() => {
    if (!isInView || blinkCount >= 4) return;
    const interval = setInterval(() => {
      setBlinkCount((prev) => prev + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [isInView, blinkCount]);

  const headlineWords = t("services.headline").split(" ");

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 lg:py-24"
      style={{ backgroundColor: "var(--hero-bg-base)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
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
            {t("services.badge")}
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
          className="mb-4 text-center text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px]"
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

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed sm:text-lg lg:mb-16"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-muted)",
          }}
        >
          {t("services.subheadline")}
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              badge={service.badge}
              title={service.title}
              price={service.price}
              cadence={service.cadence}
              priceCompare={service.priceCompare}
              description={service.description}
              bullets={service.bullets}
              exclusions={service.exclusions}
              cta={service.cta}
              href={service.href}
              iconVariant={service.iconVariant}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
