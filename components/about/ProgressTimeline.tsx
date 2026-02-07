"use client";

import { useState, useEffect } from "react";
import { useTimelineOrchestration } from "@/hooks/useTimelineOrchestration";
import { useLanguage } from "@/lib/i18n/context";

interface Milestone {
  year: string;
  label: string;
  position: number;
}

interface ProgressTimelineProps {
  isInView?: boolean;
}

export function ProgressTimeline({
  isInView = false,
}: ProgressTimelineProps) {
  const { t } = useLanguage();

  const milestones: Milestone[] = [
    { year: "2015", label: t("timeline.0.label"), position: 0 },
    { year: "2017", label: t("timeline.1.label"), position: 25 },
    { year: "2020", label: t("timeline.2.label"), position: 50 },
    { year: "2024", label: t("timeline.3.label"), position: 75 },
    { year: "2025", label: t("timeline.4.label"), position: 100 },
  ];
  const [isMobile, setIsMobile] = useState(false);

  const milestonePositions = milestones.map((m) => m.position);

  const timelineState = useTimelineOrchestration({
    enabled: isInView,
    milestonePositions,
    travelDuration: 1600,
    pauseDuration: 600,
    finalPauseDuration: 1000,
  });

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <MobileTimeline milestones={milestones} timelineState={timelineState} />;
  }

  return <DesktopTimeline milestones={milestones} timelineState={timelineState} />;
}

// Desktop horizontal layout
function DesktopTimeline({
  milestones,
  timelineState,
}: {
  milestones: Milestone[];
  timelineState: ReturnType<typeof useTimelineOrchestration>;
}) {
  const { progress, milestones: milestoneStates, pulseVisible, phase } = timelineState;
  const isFinalMilestone = (index: number) => index === milestones.length - 1;

  return (
    <div className="mt-8 w-full px-[9px]">
      {/* Container with fixed height for proper positioning */}
      <div className="relative" style={{ height: "120px" }}>
        {/* Track Layer - centered vertically */}
        <div
          className="absolute left-0 right-0"
          style={{ top: "40px" }}
        >
          {/* Base Line */}
          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              top: "0",
            }}
          />

          {/* Progress Line with glow */}
          <div
            className="absolute left-0 h-[2px]"
            style={{
              backgroundColor: "var(--ath-green)",
              width: `${progress}%`,
              top: "0",
              boxShadow:
                "0 0 8px rgba(0, 255, 136, 0.5), 0 0 16px rgba(0, 255, 136, 0.3)",
              transition: phase === "PAUSED" ? "none" : "width 0.05s linear",
            }}
          />

          {/* Traveling Pulse with comet trail */}
          {pulseVisible && (
            <div
              className="absolute"
              style={{
                left: `${progress}%`,
                top: "1px",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Comet trail */}
              <div
                className="absolute"
                style={{
                  width: "40px",
                  height: "4px",
                  right: "6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background:
                    "linear-gradient(to right, transparent, rgba(0, 255, 136, 0.3), rgba(0, 255, 136, 0.6))",
                  borderRadius: "2px",
                }}
              />
              {/* Pulse orb */}
              <div
                className="animate-pulse-orb"
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.9) 0%, var(--ath-green) 60%, rgba(0,255,136,0.5) 100%)",
                  boxShadow:
                    "0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4)",
                }}
              />
            </div>
          )}
        </div>

        {/* Milestone Nodes - absolutely positioned */}
        {milestones.map((milestone, index) => {
          const state = milestoneStates[index];
          const isActivated = state?.isActivated || false;
          const isAnimatingRipple = state?.isAnimatingRipple || false;
          const isFinal = isFinalMilestone(index);

          return (
            <div
              key={milestone.year}
              className="absolute"
              style={{
                left: `${milestone.position}%`,
                top: "40px",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Ring ripple effects */}
              {isAnimatingRipple && (
                <>
                  <div
                    className="animate-ring-ripple absolute"
                    style={{
                      width: "20px",
                      height: "20px",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      border: `2px solid ${isFinal ? "rgba(0, 255, 136, 0.9)" : "rgba(0, 255, 136, 0.7)"}`,
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    className="animate-ring-ripple absolute"
                    style={{
                      width: "20px",
                      height: "20px",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      border: "2px solid rgba(0, 255, 136, 0.5)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                      animationDelay: "100ms",
                    }}
                  />
                  {isFinal && (
                    <div
                      className="animate-ring-ripple absolute"
                      style={{
                        width: "20px",
                        height: "20px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        border: "2px solid rgba(0, 255, 136, 0.4)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                        animationDelay: "200ms",
                      }}
                    />
                  )}
                </>
              )}

              {/* Node circle */}
              <div
                className="relative z-10"
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: `2px solid ${isActivated ? "var(--ath-green)" : "rgba(255, 255, 255, 0.2)"}`,
                  backgroundColor: isActivated
                    ? "var(--ath-green)"
                    : "var(--hero-bg-dark)",
                  boxShadow: isActivated
                    ? isFinal
                      ? "0 0 16px rgba(0, 255, 136, 0.8), 0 0 32px rgba(0, 255, 136, 0.4)"
                      : "0 0 12px rgba(0, 255, 136, 0.6)"
                    : "none",
                  transition:
                    "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
                }}
              />

              {/* Labels */}
              <div
                className="absolute left-1/2 flex flex-col items-center"
                style={{
                  top: "28px",
                  transform: "translateX(-50%)",
                }}
              >
                {/* Year */}
                <span
                  className="text-sm font-semibold whitespace-nowrap"
                  style={{
                    color: isActivated
                      ? "var(--ath-green)"
                      : "rgba(255, 255, 255, 0.3)",
                    opacity: isActivated ? 1 : 0,
                    transform: isActivated ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
                  }}
                >
                  {milestone.year}
                </span>

                {/* Description */}
                <span
                  className="mt-1 max-w-[100px] text-center text-xs whitespace-nowrap"
                  style={{
                    color: isActivated
                      ? "var(--text-muted)"
                      : "rgba(255, 255, 255, 0.2)",
                    opacity: isActivated ? 1 : 0,
                    transform: isActivated ? "translateY(0)" : "translateY(8px)",
                    transition:
                      "opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s",
                  }}
                >
                  {milestone.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mobile vertical layout
function MobileTimeline({
  milestones,
  timelineState,
}: {
  milestones: Milestone[];
  timelineState: ReturnType<typeof useTimelineOrchestration>;
}) {
  const { progress, milestones: milestoneStates, pulseVisible, phase } = timelineState;
  const isFinalMilestone = (index: number) => index === milestones.length - 1;

  return (
    <div className="mt-8 w-full">
      {/* Container with proper height */}
      <div className="relative ml-4" style={{ height: "320px" }}>
        {/* Track Layer - left edge */}
        <div
          className="absolute"
          style={{
            left: "9px",
            top: "0",
            bottom: "0",
            width: "2px",
          }}
        >
          {/* Base Line */}
          <div
            className="absolute w-full"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              top: "0",
              height: "100%",
            }}
          />

          {/* Progress Line with glow */}
          <div
            className="absolute w-full"
            style={{
              backgroundColor: "var(--ath-green)",
              height: `${progress}%`,
              top: "0",
              boxShadow:
                "0 0 8px rgba(0, 255, 136, 0.5), 0 0 16px rgba(0, 255, 136, 0.3)",
              transition: phase === "PAUSED" ? "none" : "height 0.05s linear",
            }}
          />
        </div>

        {/* Traveling Pulse with trail (vertical) */}
        {pulseVisible && (
          <div
            className="absolute"
            style={{
              left: "10px",
              top: `${progress}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Comet trail (above the orb for downward movement) */}
            <div
              className="absolute"
              style={{
                width: "4px",
                height: "40px",
                left: "50%",
                bottom: "6px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(to bottom, transparent, rgba(0, 255, 136, 0.3), rgba(0, 255, 136, 0.6))",
                borderRadius: "2px",
              }}
            />
            {/* Pulse orb */}
            <div
              className="animate-pulse-orb"
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.9) 0%, var(--ath-green) 60%, rgba(0,255,136,0.5) 100%)",
                boxShadow:
                  "0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4)",
              }}
            />
          </div>
        )}

        {/* Milestone Nodes - absolutely positioned */}
        {milestones.map((milestone, index) => {
          const state = milestoneStates[index];
          const isActivated = state?.isActivated || false;
          const isAnimatingRipple = state?.isAnimatingRipple || false;
          const isFinal = isFinalMilestone(index);

          return (
            <div
              key={milestone.year}
              className="absolute flex items-center"
              style={{
                left: "0",
                top: `${milestone.position}%`,
                transform: "translateY(-50%)",
              }}
            >
              {/* Node container */}
              <div className="relative">
                {/* Ring ripple effects */}
                {isAnimatingRipple && (
                  <>
                    <div
                      className="animate-ring-ripple absolute"
                      style={{
                        width: "18px",
                        height: "18px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        border: `2px solid ${isFinal ? "rgba(0, 255, 136, 0.9)" : "rgba(0, 255, 136, 0.7)"}`,
                        borderRadius: "50%",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      className="animate-ring-ripple absolute"
                      style={{
                        width: "18px",
                        height: "18px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        border: "2px solid rgba(0, 255, 136, 0.5)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                        animationDelay: "100ms",
                      }}
                    />
                    {isFinal && (
                      <div
                        className="animate-ring-ripple absolute"
                        style={{
                          width: "18px",
                          height: "18px",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                          border: "2px solid rgba(0, 255, 136, 0.4)",
                          borderRadius: "50%",
                          pointerEvents: "none",
                          animationDelay: "200ms",
                        }}
                      />
                    )}
                  </>
                )}

                {/* Node circle */}
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: `2px solid ${isActivated ? "var(--ath-green)" : "rgba(255, 255, 255, 0.2)"}`,
                    backgroundColor: isActivated
                      ? "var(--ath-green)"
                      : "var(--hero-bg-dark)",
                    boxShadow: isActivated
                      ? isFinal
                        ? "0 0 16px rgba(0, 255, 136, 0.8), 0 0 32px rgba(0, 255, 136, 0.4)"
                        : "0 0 12px rgba(0, 255, 136, 0.6)"
                      : "none",
                    transition:
                      "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
                  }}
                />
              </div>

              {/* Labels */}
              <div
                className="ml-4 flex flex-col"
                style={{
                  opacity: isActivated ? 1 : 0,
                  transform: isActivated ? "translateX(0)" : "translateX(-8px)",
                  transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
                }}
              >
                {/* Year */}
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: isActivated
                      ? "var(--ath-green)"
                      : "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {milestone.year}
                </span>

                {/* Description */}
                <span
                  className="text-xs"
                  style={{
                    color: isActivated
                      ? "var(--text-muted)"
                      : "rgba(255, 255, 255, 0.2)",
                    opacity: isActivated ? 1 : 0,
                    transition: "opacity 0.4s ease-out 0.2s",
                  }}
                >
                  {milestone.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
