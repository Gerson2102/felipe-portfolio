interface CandlestickBar {
  left: string;
  width: string;
  height: string;
  opacity: number;
  duration: string;
  delay: string;
  isGreen: boolean;
}

const candlestickBars: CandlestickBar[] = [
  { left: "5%", width: "2%", height: "45%", opacity: 0.07, duration: "18s", delay: "0s", isGreen: false },
  { left: "15%", width: "1.5%", height: "65%", opacity: 0.09, duration: "22s", delay: "-5s", isGreen: true },
  { left: "28%", width: "2.2%", height: "55%", opacity: 0.08, duration: "19s", delay: "-8s", isGreen: false },
  { left: "42%", width: "2%", height: "80%", opacity: 0.1, duration: "24s", delay: "-3s", isGreen: true },
  { left: "55%", width: "1.7%", height: "50%", opacity: 0.07, duration: "21s", delay: "-15s", isGreen: false },
  { left: "68%", width: "1.9%", height: "70%", opacity: 0.09, duration: "22s", delay: "-9s", isGreen: false },
  { left: "80%", width: "2.4%", height: "85%", opacity: 0.11, duration: "20s", delay: "-11s", isGreen: true },
  { left: "92%", width: "1.8%", height: "60%", opacity: 0.08, duration: "23s", delay: "-1s", isGreen: false },
];

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--hero-bg-base)" }}
      />

      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, var(--hero-bg-mid) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 20%, var(--ath-green-glow) 0%, transparent 50%)",
        }}
      />

      {/* Candlestick bars */}
      {candlestickBars.map((bar, index) => (
        <div
          key={index}
          className="animate-drift-up absolute bottom-0"
          style={{
            left: bar.left,
            width: bar.width,
            height: bar.height,
            opacity: bar.opacity,
            backgroundColor: bar.isGreen ? "var(--ath-green)" : "#ffffff",
            ["--drift-duration" as string]: bar.duration,
            animationDelay: bar.delay,
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
