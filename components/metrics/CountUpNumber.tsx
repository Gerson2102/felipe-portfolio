"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  label: string;
  enabled?: boolean;
  delay?: number;
}

export function CountUpNumber({
  end,
  suffix = "",
  label,
  enabled = false,
  delay = 0,
}: CountUpNumberProps) {
  const { formattedValue } = useCountUp({
    end,
    duration: 2000,
    enabled,
    suffix,
  });

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        opacity: enabled ? 1 : 0,
        transform: enabled ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      <span
        className="text-[40px] font-bold sm:text-[48px] md:text-[56px] lg:text-[64px]"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--ath-green)",
          fontVariantNumeric: "tabular-nums",
          display: "inline-block",
          minWidth: `${(String(end).length + suffix.length) * 0.65}em`,
          textAlign: "center",
        }}
      >
        {formattedValue}
      </span>
      <span
        className="mt-2 text-sm font-medium uppercase tracking-wider sm:text-base"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}
