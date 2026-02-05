"use client";

interface Milestone {
  year: string;
  label: string;
}

interface TimelineProps {
  milestones?: Milestone[];
  isInView?: boolean;
}

const defaultMilestones: Milestone[] = [
  { year: "2015", label: "Started Trading" },
  { year: "2017", label: "First Bull Run" },
  { year: "2020", label: "Began Teaching" },
  { year: "2021", label: "ATH Academy" },
  { year: "2025", label: "500+ Students" },
];

export function Timeline({
  milestones = defaultMilestones,
  isInView = false,
}: TimelineProps) {
  return (
    <div className="mt-8 w-full">
      {/* Timeline line */}
      <div className="relative">
        <div
          className="absolute top-2 h-[2px] w-full"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        />
        <div
          className="absolute top-2 h-[2px] transition-all duration-1000 ease-out"
          style={{
            backgroundColor: "var(--ath-green)",
            width: isInView ? "100%" : "0%",
          }}
        />

        {/* Milestones */}
        <div className="relative flex justify-between">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="flex flex-col items-center"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.5s ease-out ${index * 0.1 + 0.3}s, transform 0.5s ease-out ${index * 0.1 + 0.3}s`,
              }}
            >
              {/* Dot */}
              <div
                className="h-4 w-4 rounded-full border-2"
                style={{
                  borderColor: "var(--ath-green)",
                  backgroundColor: "var(--hero-bg-dark)",
                }}
              />
              {/* Year */}
              <span
                className="mt-2 text-sm font-semibold"
                style={{ color: "var(--ath-green)" }}
              >
                {milestone.year}
              </span>
              {/* Label */}
              <span
                className="mt-1 text-xs text-center max-w-[80px]"
                style={{ color: "var(--text-muted)" }}
              >
                {milestone.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
