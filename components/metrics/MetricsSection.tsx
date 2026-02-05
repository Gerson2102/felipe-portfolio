"use client";

import { useInView } from "@/hooks/useInView";
import { CountUpNumber } from "./CountUpNumber";

interface Metric {
  end: number;
  suffix: string;
  label: string;
}

interface MetricsSectionProps {
  metrics?: Metric[];
}

const defaultMetrics: Metric[] = [
  { end: 11, suffix: "+", label: "Years Experience" },
  { end: 500, suffix: "+", label: "Students Taught" },
  { end: 4, suffix: "", label: "Market Cycles" },
  { end: 15, suffix: "+", label: "Countries Reached" },
];

export function MetricsSection({ metrics = defaultMetrics }: MetricsSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="metrics"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 lg:py-24"
      style={{ backgroundColor: "var(--hero-bg-base)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={index < metrics.length - 1 ? "lg:border-r" : ""}
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
                label={metric.label}
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
