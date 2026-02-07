"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { blurMap } from "@/components/ui/blur-placeholders";
import { useLanguage } from "@/lib/i18n/context";

interface PhotoFrameProps {
  src: string;
  alt: string;
  eventName: string;
  personName: string;
  personTitle: string;
  location: string;
  index: number;
  isInView: boolean;
  objectPosition?: string;
  aspectRatio?: string;
}

export function PhotoFrame({
  src,
  alt,
  eventName,
  personName,
  personTitle,
  location,
  index,
  isInView,
  objectPosition = "center center",
  aspectRatio = "4/5",
}: PhotoFrameProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer h-[320px] sm:h-[370px] lg:h-[420px]"
      style={{
        aspectRatio,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: isHovered ? "saturate(1)" : "saturate(0.85)",
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition }}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 32vw"
          placeholder={blurMap[src] ? "blur" : "empty"}
          blurDataURL={blurMap[src]}
        />
      </motion.div>

      {/* Frosted glass overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <p
          className="text-sm font-semibold mb-1"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          {eventName}
        </p>
        <p
          className="text-xs mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-secondary)",
          }}
        >
          {t("connections.with")} {personName}, {personTitle}
        </p>
        <span
          className="inline-flex items-center px-2 py-1 rounded-full text-xs"
          style={{
            backgroundColor: "var(--ath-green-dim)",
            color: "var(--ath-green)",
            border: "1px solid rgba(0, 255, 136, 0.3)",
          }}
        >
          📍 {location}
        </span>
      </motion.div>

      {/* Mobile: Always show partial overlay */}
      <div
        className="md:hidden absolute bottom-0 left-0 right-0 p-3"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 70%, transparent 100%)",
        }}
      >
        <p
          className="text-xs font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          {eventName}
        </p>
        <p
          className="text-xs opacity-80"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-secondary)",
          }}
        >
          {t("connections.with")} {personName}
        </p>
      </div>
    </motion.div>
  );
}
