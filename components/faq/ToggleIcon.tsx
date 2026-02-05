"use client";

interface ToggleIconProps {
  isOpen: boolean;
}

export function ToggleIcon({ isOpen }: ToggleIconProps) {
  return (
    <div className="relative h-5 w-5 flex-shrink-0">
      {/* Horizontal bar (always visible) */}
      <span
        className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: "var(--ath-green)",
          transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isOpen
            ? "translate(-50%, -50%) rotate(45deg)"
            : "translate(-50%, -50%) rotate(0deg)",
        }}
      />
      {/* Vertical bar (morphs to X) */}
      <span
        className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: "var(--ath-green)",
          transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isOpen
            ? "translate(-50%, -50%) rotate(-45deg)"
            : "translate(-50%, -50%) rotate(90deg)",
        }}
      />
    </div>
  );
}
