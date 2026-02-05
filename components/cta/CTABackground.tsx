export function CTABackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base layer */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Radial gradient top-center - ATH green with breathing animation */}
      <div
        className="absolute inset-0 animate-cta-breathe"
        style={{
          background:
            "radial-gradient(900px circle at 50% 0%, rgba(0, 255, 136, 1), transparent 60%)",
          opacity: 0.04,
        }}
      />

      {/* Diagonal line from bottom-left corner (30° angle) */}
      <div
        className="absolute bottom-0 left-0 h-[200%] w-[1px] origin-bottom-left"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 255, 136, 0.04), transparent 70%)",
          transform: "rotate(-30deg)",
        }}
      />

      {/* Diagonal line from bottom-right corner (-30° angle) */}
      <div
        className="absolute bottom-0 right-0 h-[200%] w-[1px] origin-bottom-right"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 255, 136, 0.04), transparent 70%)",
          transform: "rotate(30deg)",
        }}
      />

      {/* Noise texture overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.02]">
        <filter id="cta-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-noise)" />
      </svg>
    </div>
  );
}
