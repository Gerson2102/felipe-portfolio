"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { CTABackground } from "./CTABackground";
import { PathCard } from "./PathCard";
import { RevealText } from "@/components/ui/RevealText";
import { SocialLinks } from "@/components/ui/SocialLinks";

// Icons
const AcademyIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const MentorshipIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="12" r="6" />
    <circle cx="15" cy="12" r="6" />
  </svg>
);

const attribution = "\u2014 Felipe Esparrag\u00f3";

export function FinalCTASection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { t } = useLanguage();

  const academyCard = {
    icon: <AcademyIcon />,
    title: t("cta.academy.title"),
    description: t("cta.academy.description"),
    ctaText: t("cta.academy.cta"),
    ctaVariant: "filled" as const,
    ctaHref: "https://go.alltimehigh.academy/",
  };

  const mentorshipCard = {
    icon: <MentorshipIcon />,
    title: t("cta.mentorship.title"),
    description: t("cta.mentorship.description"),
    ctaText: t("cta.mentorship.cta"),
    ctaVariant: "outline" as const,
    ctaHref: "https://www.instagram.com/fesparrago.ath/",
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <CTABackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Part 1: The Message */}
        <div className="mb-20 text-center md:mb-28">
          <RevealText
            text={t("cta.quote")}
            isInView={isInView}
            staggerDelay={0.06}
            baseDelay={0}
            as="blockquote"
            className="mx-auto mb-8 max-w-3xl text-[22px] font-medium italic leading-relaxed text-white sm:text-[26px] md:text-[30px] lg:text-[34px]"
          />

          {/* Attribution with line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 bg-[rgba(255,255,255,0.2)]" />
            <span
              className="text-base text-[rgba(255,255,255,0.5)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {attribution}
            </span>
            <div className="h-[1px] w-12 bg-[rgba(255,255,255,0.2)]" />
          </motion.div>
        </div>

        {/* Part 2: The Two Paths */}
        <div className="relative mb-20 grid grid-cols-1 gap-8 md:mb-28 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          {/* Academy Card */}
          <PathCard
            {...academyCard}
            index={0}
            isInView={isInView}
            gradientPosition="left"
          />

          {/* "or" Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 1.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex items-center justify-center"
          >
            {/* Desktop: Vertical circle */}
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] md:flex">
              <span className="text-sm font-medium text-[rgba(255,255,255,0.4)]">
                {t("cta.or")}
              </span>
            </div>

            {/* Mobile/Tablet: Horizontal line with "or" */}
            <div className="flex w-full items-center gap-4 md:hidden">
              <div className="h-[1px] flex-1 bg-[rgba(255,255,255,0.1)]" />
              <span className="text-sm font-medium text-[rgba(255,255,255,0.4)]">
                {t("cta.or")}
              </span>
              <div className="h-[1px] flex-1 bg-[rgba(255,255,255,0.1)]" />
            </div>
          </motion.div>

          {/* Mentorship Card */}
          <PathCard
            {...mentorshipCard}
            index={1}
            isInView={isInView}
            gradientPosition="right"
          />
        </div>

        {/* Part 3: The Closer */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 1.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="mb-8 text-lg text-[rgba(255,255,255,0.5)]"
          >
            {t("cta.closer")}
          </motion.p>

          <SocialLinks isInView={isInView} baseDelay={1.5} />
        </div>
      </div>
    </section>
  );
}
