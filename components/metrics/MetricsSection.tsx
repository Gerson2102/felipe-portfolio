"use client";

import { useInView } from "@/hooks/useInView";
import { useLanguage } from "@/lib/i18n/context";
import { CountUpNumber } from "./CountUpNumber";

interface MetricData {
  end: number;
  suffix: string;
}

const metricValues: MetricData[] = [
  { end: 11, suffix: "+" },
  { end: 500, suffix: "+" },
  { end: 4, suffix: "" },
  { end: 50, suffix: "+" },
  { end: 6000, suffix: "+" },
  { end: 2500, suffix: "+" },
];

export function MetricsSection() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="metrics"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 lg:py-24"
      style={{ backgroundColor: "var(--hero-bg-base)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-0 lg:grid-cols-6 lg:gap-0">
          {metricValues.map((metric, index) => (
            <div
              key={index}
              className={`px-4 lg:px-6 ${index < metricValues.length - 1 ? "lg:border-r" : ""}`}
              style={{
                borderColor: isInView
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                transition: `border-color 0.6s ease-out ${400 + index * 200}ms`,
              }}
            >
              <CountUpNumber
                end={metric.end}
                suffix={metric.suffix}
                label={t(`metrics.${index}.label`)}
                enabled={isInView}
                delay={index * 150}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
