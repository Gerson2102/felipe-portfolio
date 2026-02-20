"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import { blurMap } from "@/components/ui/blur-placeholders";

interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselRowProps {
  images: CarouselImage[];
  direction: "left" | "right";
  speed: number;
  height: number;
  tabletHeight: number;
  mobileHeight: number;
}

export function CarouselRow({
  images,
  direction,
  speed,
  height,
  tabletHeight,
  mobileHeight,
}: CarouselRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const isReducedMotionRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const positionRef = useRef<number | null>(null);
  const cachedSetWidthRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Cache setElement.offsetWidth and update on resize
  const updateCachedWidth = useCallback(() => {
    if (setRef.current) {
      cachedSetWidthRef.current = setRef.current.offsetWidth;
    }
  }, []);

  const startAnimation = useCallback(() => {
    // Don't start if already running or conditions not met
    if (animationIdRef.current !== null) return;
    if (!isVisibleRef.current || isReducedMotionRef.current || isHoveredRef.current) return;

    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const track = trackRef.current;
      if (!track) return;

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Stop if conditions changed
      if (!isVisibleRef.current || isReducedMotionRef.current || isHoveredRef.current) {
        animationIdRef.current = null;
        return;
      }

      const setWidth = cachedSetWidthRef.current;
      if (setWidth > 0) {
        const pixelsPerSecond = setWidth / speed;

        if (direction === "left") {
          positionRef.current! -= pixelsPerSecond * deltaTime;
          if (positionRef.current! <= -setWidth) {
            positionRef.current! += setWidth;
          }
        } else {
          positionRef.current! += pixelsPerSecond * deltaTime;
          if (positionRef.current! >= 0) {
            positionRef.current! -= setWidth;
          }
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);
  }, [direction, speed]);

  const stopAnimation = useCallback(() => {
    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    const setElement = setRef.current;
    if (!setElement) return;

    // Initial width cache
    cachedSetWidthRef.current = setElement.offsetWidth;

    // Initialize position only once
    if (positionRef.current === null) {
      positionRef.current = direction === "left" ? 0 : -cachedSetWidthRef.current;
    }

    // Try to start animation
    startAnimation();

    // Update cached width on resize
    window.addEventListener("resize", updateCachedWidth);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", updateCachedWidth);
    };
  }, [direction, startAnimation, stopAnimation, updateCachedWidth]);

  // Visibility-based pause via IntersectionObserver
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(row);
    return () => observer.disconnect();
  }, [startAnimation, stopAnimation]);

  // Reduced motion preference (separate from hover)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [startAnimation, stopAnimation]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    stopAnimation();
  }, [stopAnimation]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    startAnimation();
  }, [startAnimation]);

  const renderImageSet = (keyPrefix: string, ref?: React.Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      className="carousel-set flex flex-shrink-0"
      style={{ gap: "1rem", paddingRight: "1rem" }}
    >
      {images.map((image, index) => (
        <div
          key={`${keyPrefix}-${image.src}-${index}`}
          className="carousel-image-wrapper relative flex-shrink-0 overflow-hidden rounded-[10px] border border-white/10 transition-transform duration-300 hover:scale-[1.03]"
          style={{ height: `var(--current-height)` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={Math.round((height * 4) / 3)}
            height={height}
            className="h-full w-auto object-cover"
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 300px"
            style={{
              height: "var(--current-height)",
              width: "auto",
            }}
            placeholder={blurMap[image.src] ? "blur" : "empty"}
            blurDataURL={blurMap[image.src]}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="carousel-row overflow-hidden"
      style={
        {
          "--row-height": `${height}px`,
          "--row-height-tablet": `${tabletHeight}px`,
          "--row-height-mobile": `${mobileHeight}px`,
          "--current-height": `${height}px`,
        } as React.CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="carousel-track flex"
      >
        {renderImageSet("set1", setRef)}
        {renderImageSet("set2")}
      </div>

      <style jsx>{`
        .carousel-row {
          --current-height: var(--row-height);
        }

        @media (max-width: 1024px) {
          .carousel-row {
            --current-height: var(--row-height-tablet);
          }
        }

        @media (max-width: 640px) {
          .carousel-row {
            --current-height: var(--row-height-mobile);
          }
        }
      `}</style>
    </div>
  );
}
