"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export interface MilestoneState {
  isActivated: boolean;
  isAnimatingRipple: boolean;
  activatedAt: number | null;
}

export interface TimelineState {
  progress: number;
  phase: "IDLE" | "TRAVELING" | "PAUSED" | "COMPLETE";
  currentSegment: number;
  milestones: MilestoneState[];
  isComplete: boolean;
  pulseVisible: boolean;
}

interface UseTimelineOrchestrationOptions {
  enabled?: boolean;
  milestonePositions?: number[];
  travelDuration?: number;
  pauseDuration?: number;
  finalPauseDuration?: number;
}

// Easing function for smooth segment travel
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function useTimelineOrchestration({
  enabled = false,
  milestonePositions = [0, 25, 50, 75, 100],
  travelDuration = 1600,
  pauseDuration = 600,
  finalPauseDuration = 1000,
}: UseTimelineOrchestrationOptions = {}): TimelineState {
  // Store positions in a ref to avoid dependency issues
  const positionsRef = useRef(milestonePositions);
  positionsRef.current = milestonePositions;

  const [state, setState] = useState<TimelineState>(() => ({
    progress: 0,
    phase: "IDLE",
    currentSegment: 0,
    milestones: milestonePositions.map(() => ({
      isActivated: false,
      isAnimatingRipple: false,
      activatedAt: null,
    })),
    isComplete: false,
    pulseVisible: false,
  }));

  const rafRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const activateMilestone = useCallback((index: number) => {
    setState((prev) => {
      const newMilestones = [...prev.milestones];
      newMilestones[index] = {
        isActivated: true,
        isAnimatingRipple: true,
        activatedAt: Date.now(),
      };
      return { ...prev, milestones: newMilestones };
    });

    // Clear ripple animation after it completes
    setTimeout(() => {
      setState((prev) => {
        const newMilestones = [...prev.milestones];
        if (newMilestones[index]) {
          newMilestones[index] = {
            ...newMilestones[index],
            isAnimatingRipple: false,
          };
        }
        return { ...prev, milestones: newMilestones };
      });
    }, 700);
  }, []);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && enabled) {
      setState({
        progress: 100,
        phase: "COMPLETE",
        currentSegment: positionsRef.current.length - 1,
        milestones: positionsRef.current.map(() => ({
          isActivated: true,
          isAnimatingRipple: false,
          activatedAt: Date.now(),
        })),
        isComplete: true,
        pulseVisible: false,
      });
      return;
    }

    if (!enabled || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    const positions = positionsRef.current;

    // Animation state (kept in closure, not React state, to avoid re-render issues)
    let currentSegment = 0;
    let phase: "TRAVELING" | "PAUSED" | "COMPLETE" = "TRAVELING";
    let segmentStart = positions[0];
    let segmentEnd = positions[1];
    let segmentStartTime: number | null = null;
    let pauseStartTime: number | null = null;

    // Activate first milestone immediately
    activateMilestone(0);
    setState((prev) => ({
      ...prev,
      phase: "TRAVELING",
      pulseVisible: true,
    }));

    const animate = (timestamp: number) => {
      if (phase === "TRAVELING") {
        if (segmentStartTime === null) {
          segmentStartTime = timestamp;
        }

        const elapsed = timestamp - segmentStartTime;
        const isLastSegment = currentSegment === positions.length - 2;

        // Last segment travels slightly slower for dramatic effect
        const actualTravelDuration = isLastSegment
          ? travelDuration * 1.2
          : travelDuration;
        const rawProgress = Math.min(elapsed / actualTravelDuration, 1);
        const easedProgress = easeInOutCubic(rawProgress);

        const currentProgress = segmentStart + (segmentEnd - segmentStart) * easedProgress;

        setState((prev) => ({
          ...prev,
          progress: currentProgress,
          phase: "TRAVELING",
          currentSegment,
        }));

        if (rawProgress >= 1) {
          // Arrived at milestone - activate it and pause
          const nextMilestoneIndex = currentSegment + 1;
          activateMilestone(nextMilestoneIndex);

          // Transition to pause
          phase = "PAUSED";
          pauseStartTime = timestamp;

          setState((prev) => ({
            ...prev,
            phase: "PAUSED",
            progress: segmentEnd,
          }));
        }

        rafRef.current = requestAnimationFrame(animate);
      } else if (phase === "PAUSED") {
        const pauseElapsed = timestamp - (pauseStartTime || timestamp);
        const isLastMilestone = currentSegment === positions.length - 2;
        const currentPauseDuration = isLastMilestone
          ? finalPauseDuration
          : pauseDuration;

        if (pauseElapsed >= currentPauseDuration) {
          // Check if we have more segments
          if (currentSegment < positions.length - 2) {
            // Move to next segment
            currentSegment++;
            segmentStart = positions[currentSegment];
            segmentEnd = positions[currentSegment + 1];
            segmentStartTime = timestamp;
            phase = "TRAVELING";

            setState((prev) => ({
              ...prev,
              phase: "TRAVELING",
              currentSegment,
            }));

            rafRef.current = requestAnimationFrame(animate);
          } else {
            // Animation complete - fade out pulse
            phase = "COMPLETE";

            setState((prev) => ({
              ...prev,
              phase: "COMPLETE",
              isComplete: true,
              pulseVisible: false,
            }));

            return; // Stop animation loop
          }
        } else {
          rafRef.current = requestAnimationFrame(animate);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, travelDuration, pauseDuration, finalPauseDuration, activateMilestone]);

  return state;
}
