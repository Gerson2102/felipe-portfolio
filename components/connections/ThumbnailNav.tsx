"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { blurMap } from "@/components/ui/blur-placeholders";

interface ThumbnailNavProps {
  photos: Array<{
    src: string;
    alt: string;
  }>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function ThumbnailNav({ photos, currentIndex, onSelect }: ThumbnailNavProps) {
  return (
    <div className="hidden md:flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Photo navigation">
      {photos.map((photo, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          role="tab"
          aria-selected={index === currentIndex}
          className="relative rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            // @ts-expect-error CSS custom properties
            "--tw-ring-color": "var(--ath-green)",
            "--tw-ring-offset-color": "var(--hero-bg-base)",
          }}
          aria-label={`Go to photo ${index + 1}`}
        >
          <motion.div
            animate={{
              opacity: index === currentIndex ? 1 : 0.4,
              scale: index === currentIndex ? 1 : 0.95,
            }}
            transition={{ duration: 0.3 }}
            className="relative w-12 h-[60px] rounded-lg overflow-hidden"
            style={{
              border:
                index === currentIndex
                  ? "2px solid var(--ath-green)"
                  : "2px solid transparent",
              boxShadow:
                index === currentIndex
                  ? "0 0 10px rgba(0, 255, 136, 0.3)"
                  : "none",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="48px"
              placeholder={blurMap[photo.src] ? "blur" : "empty"}
              blurDataURL={blurMap[photo.src]}
            />
          </motion.div>
        </button>
      ))}
    </div>
  );
}
