"use client";

import { useInView } from "@/hooks/useInView";
import { PhotoFrame } from "./PhotoFrame";
import { ProgressTimeline } from "./ProgressTimeline";

interface AboutSectionProps {
  sectionLabel?: string;
  headline?: string;
  paragraphs?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export function AboutSection({
  sectionLabel = "ORIGIN STORY",
  headline = "From Curious Trader to Crypto Educator",
  paragraphs = [
    "My journey into cryptocurrency began in 2015, driven by a fascination with blockchain technology and its potential to revolutionize finance. What started as personal exploration quickly became a passion for understanding market dynamics and investment strategies.",
    "After navigating multiple market cycles—including the euphoric highs and devastating corrections—I realized that most people entering crypto lacked the foundational knowledge to succeed. They were making the same mistakes I had made years earlier.",
    "That realization sparked my mission: to bridge the knowledge gap and empower others with the tools, strategies, and mindset needed to thrive in the volatile world of cryptocurrency.",
  ],
  imageSrc = "/images/about/felipe-headshot.webp",
  imageAlt = "Felipe Esparragó",
}: AboutSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ backgroundColor: "var(--hero-bg-dark)" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[45%_1fr] lg:gap-12">
          {/* Left: Photo */}
          <div className="relative flex justify-center lg:justify-start">
            <PhotoFrame
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              isInView={isInView}
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            {/* Section label */}
            <span
              className="mb-4 text-xs font-medium tracking-[0.3em]"
              style={{
                color: "var(--ath-green)",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
              }}
            >
              {sectionLabel}
            </span>

            {/* Headline */}
            <h2
              className="mb-6 text-[28px] font-bold leading-tight sm:text-[32px] md:text-[40px] lg:text-[48px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
              }}
            >
              {headline}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed sm:text-lg"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease-out ${0.3 + index * 0.1}s, transform 0.6s ease-out ${0.3 + index * 0.1}s`,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline — full width, outside the grid */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.6s",
          }}
        >
          <ProgressTimeline isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
