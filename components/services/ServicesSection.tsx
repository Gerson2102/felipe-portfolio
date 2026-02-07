"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { ServiceCard } from "./ServiceCard";

type IconVariant = "academy" | "mentorship" | "speaking";

const servicesMeta: { href: string; iconVariant: IconVariant }[] = [
  { href: "https://go.alltimehigh.academy/", iconVariant: "academy" },
  { href: "https://www.alltimehigh.academy/", iconVariant: "mentorship" },
  { href: "https://www.instagram.com/fesparrago.ath/", iconVariant: "speaking" },
];

export function ServicesSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { t } = useLanguage();
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);

  const servicesData = useMemo(
    () =>
      servicesMeta.map((meta, i) => ({
        title: t(`services.${i}.title`),
        description: t(`services.${i}.description`),
        cta: t(`services.${i}.cta`),
        ...meta,
      })),
    [t],
  );

  // Blinking cursor that stops after 2 blinks
  useEffect(() => {
    if (!isInView || blinkCount >= 4) {
      setShowCursor(true);
      return;
    }

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
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
          className="mb-12 text-center text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px] lg:mb-16"
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
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
