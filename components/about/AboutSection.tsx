"use client";

import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { PhotoFrame } from "./PhotoFrame";
import { ProgressTimeline } from "./ProgressTimeline";

export function AboutSection() {
  const { t } = useLanguage();
  const sectionLabel = t("about.label");
  const headline = t("about.headline");
  const paragraphs = [t("about.p1"), t("about.p2"), t("about.p3")];
  const imageSrc = "/images/about/felipe-headshot.webp";
  const imageAlt = "Felipe Esparrag\u00f3";
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
