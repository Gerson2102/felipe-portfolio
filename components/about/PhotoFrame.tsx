"use client";

import Image from "next/image";
import { blurMap } from "@/components/ui/blur-placeholders";

interface PhotoFrameProps {
  imageSrc?: string;
  imageAlt?: string;
  isInView?: boolean;
}

export function PhotoFrame({
  imageSrc = "/images/Felipe Headshot.png",
  imageAlt = "Felipe Esparragó",
  isInView = false,
}: PhotoFrameProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Container sizes: mobile 320px, tablet 360px, desktop 420px */}
      <div className="relative h-[320px] w-[320px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px]">
        {/* Outer Glow Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 255, 136, 0.12) 0%, rgba(0, 255, 136, 0.04) 50%, transparent 70%)",
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
          aria-hidden="true"
        />

        {/* Rotating SVG with Arc and Orbit Dots */}
        <svg
          viewBox="0 0 440 440"
          className="animate-rotate-arc absolute inset-0 h-full w-full"
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
          aria-hidden="true"
        >
          <circle
            cx="220"
            cy="220"
            r="205"
            fill="none"
            stroke="rgba(0, 255, 136, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="966 322"
            strokeLinecap="round"
          />
          <circle cx="220" cy="15" r="3" fill="rgba(0, 255, 136, 0.6)" />
          <circle cx="425" cy="220" r="3" fill="rgba(0, 255, 136, 0.4)" />
          <circle cx="120" cy="400" r="2.5" fill="rgba(0, 255, 136, 0.5)" />
        </svg>

        {/* Circle Container with Image - properly centered */}
        <div
          className="absolute left-1/2 top-1/2 h-[260px] w-[260px] overflow-hidden rounded-full sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px]"
          style={{
            transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.95})`,
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 360px"
            className="object-cover object-center"
            priority
            placeholder={blurMap[imageSrc] ? "blur" : "empty"}
            blurDataURL={blurMap[imageSrc]}
          />
        </div>

        {/* Since 2015 Badge */}
        <div
          className="absolute bottom-4 right-0 rounded-full px-4 py-2 shadow-lg sm:bottom-6 sm:right-2 lg:bottom-8 lg:right-4"
          style={{
            backgroundColor: "var(--hero-bg-base)",
            border: "1px solid var(--ath-green)",
            boxShadow: "0 0 20px rgba(0, 255, 136, 0.2)",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateX(0)" : "translateX(-20px)",
            transition:
              "opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s",
          }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--ath-green)" }}
          >
            Since 2015
          </span>
        </div>
      </div>
    </div>
  );
}
