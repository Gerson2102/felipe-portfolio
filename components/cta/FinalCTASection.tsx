"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
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

const quote =
  "The best time to start was years ago. The second best time is right now. Let's get you to your all-time high.";
const attribution = "— Felipe Esparragó";

const academyCard = {
  icon: <AcademyIcon />,
  title: "Join the Academy",
  description:
    "Structured courses, live sessions, and a community of serious learners. Start building real knowledge and confidence in crypto — at your own pace.",
  ctaText: "Explore the Academy",
  ctaVariant: "filled" as const,
  ctaHref: "https://go.alltimehigh.academy/",
};

const mentorshipCard = {
  icon: <MentorshipIcon />,
  title: "Book a Consultation",
  description:
    "Get personalized guidance from someone who's been in the trenches since 2015. One conversation can change your entire trajectory.",
  ctaText: "Schedule a Call",
  ctaVariant: "outline" as const,
  ctaHref: "https://www.instagram.com/fesparrago.ath/",
};

export function FinalCTASection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

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
            text={quote}
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
        <div className="relative mb-20 grid grid-cols-1 gap-8 md:mb-28 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
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
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] lg:flex">
              <span className="text-sm font-medium text-[rgba(255,255,255,0.4)]">
                or
              </span>
            </div>

            {/* Mobile/Tablet: Horizontal line with "or" */}
            <div className="flex w-full items-center gap-4 lg:hidden">
              <div className="h-[1px] flex-1 bg-[rgba(255,255,255,0.1)]" />
              <span className="text-sm font-medium text-[rgba(255,255,255,0.4)]">
                or
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
            Ready to reach your ATH?
          </motion.p>

          <SocialLinks isInView={isInView} baseDelay={1.5} />
        </div>
      </div>
    </section>
  );
}
