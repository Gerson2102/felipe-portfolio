"use client";

import { ReactNode } from "react";

interface ShineButtonProps {
  children: ReactNode;
  variant?: "filled" | "outline";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function ShineButton({
  children,
  variant = "filled",
  href,
  className = "",
  onClick,
}: ShineButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg overflow-hidden transition-all duration-300";

  const variantStyles =
    variant === "filled"
      ? "bg-[#00ff88] text-[#050505] hover:bg-[#00e67a] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,136,0.25)] active:scale-[0.98]"
      : "border border-[#00ff88] text-[#00ff88] bg-transparent hover:bg-[rgba(0,255,136,0.08)] hover:scale-[1.02] active:scale-[0.98]";

  const combinedStyles = `${baseStyles} ${variantStyles} ${className}`;

  const shineElement =
    variant === "filled" ? (
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-none group-hover:animate-[shine-sweep_0.6s_ease-out]"
        />
      </span>
    ) : null;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={`group ${combinedStyles}`}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {shineElement}
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {children}
          {isExternal && (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
              <span className="sr-only"> (opens in new tab)</span>
            </>
          )}
        </span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`group ${combinedStyles}`}>
      {shineElement}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
