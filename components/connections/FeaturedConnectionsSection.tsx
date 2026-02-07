"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { PhotoFrame } from "./PhotoFrame";
import { ThumbnailNav } from "./ThumbnailNav";

interface Connection {
  src: string;
  alt: string;
  eventName: string;
  personName: string;
  personTitle: string;
  location: string;
  objectPosition?: string;
  aspectRatio?: string;
}

const connectionsData: Connection[] = [
  {
    src: "/images/connections/felipe-paolo-ardoino.webp",
    alt: "Felipe with Paolo Ardoino, CEO of Tether",
    eventName: "Plan B Forum 2026",
    personName: "Paolo Ardoino",
    personTitle: "Tether CEO",
    location: "El Salvador",
    objectPosition: "center top",
  },
  {
    src: "/images/connections/felipe-jack-mallers.webp",
    alt: "Felipe with Jack Mallers, CEO of Strike",
    eventName: "Plan B Forum 2026",
    personName: "Jack Mallers",
    personTitle: "Strike CEO",
    location: "El Salvador",
    objectPosition: "center center",
  },
  {
    src: "/images/connections/felipe-missuniverse5.webp",
    alt: "Felipe Esparragó at the 73rd Miss Universe stage",
    eventName: "73rd Miss Universe",
    personName: "Beauty Industry",
    personTitle: "Event Collaboration",
    location: "Mexico",
    objectPosition: "center center",
  },
  {
    src: "/images/connections/felipe-missuniverse6.webp",
    alt: "Felipe presenting Crowns of Time NFT to Miss Universe winner",
    eventName: "Miss Universe 73rd Edition",
    personName: "Crowns of Time",
    personTitle: "NFT Collection Presentation",
    location: "Mexico",
    objectPosition: "center top",
  },
  {
    src: "/images/connections/felipe-startup-house.webp",
    alt: "Felipe at Dojo Coding x Starknet event",
    eventName: "Dojo Coding x Starknet",
    personName: "Developer Community",
    personTitle: "Web3 Builders",
    location: "Nosara, Costa Rica",
    objectPosition: "center center",
    aspectRatio: "4/3",
  },
  {
    src: "/images/connections/ath-bj3.webp",
    alt: "Felipe Esparragó speaking at Blockchain Jungle on the Liana Stage",
    eventName: "Blockchain Jungle 2024",
    personName: "ATH Academy",
    personTitle: "Liana Stage Presentation",
    location: "Costa Rica",
    objectPosition: "center center",
  },
  {
    src: "/images/connections/felipe-speaking6.webp",
    alt: "Felipe at industry networking event",
    eventName: "Industry Networking",
    personName: "Crypto Leaders",
    personTitle: "Industry Executives",
    location: "Global",
    objectPosition: "center top",
  },
];

export function FeaturedConnectionsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Blinking cursor that stops after 2 blinks
  useEffect(() => {
    if (!isInView || blinkCount >= 4) {
      setShowCursor(true);
      return;
    }

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
      setBlinkCount((prev) => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [isInView, blinkCount]);

  // Find the card whose center is closest to the viewport center
  const findClosestCard = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const viewportCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  }, []);

  // Debounced scroll handler — waits for scroll to settle
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(findClosestCard, 150);
  }, [findClosestCard]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Scroll to specific photo using actual card position
  const scrollToPhoto = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollOffset =
      cardRect.left -
      containerRect.left -
      (containerRect.width - cardRect.width) / 2 +
      container.scrollLeft;
    container.scrollTo({
      left: scrollOffset,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const headlineWords = "Building Alongside the Best".split(" ");

  return (
    <section
      id="connections"
      ref={ref as React.RefObject<HTMLElement>}
      className="connections-section relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--hero-bg-dark)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Terminal-style badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center"
        >
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.2em]"
            style={{
              backgroundColor: "var(--ath-green-dim)",
              color: "var(--ath-green)",
              border: "1px solid rgba(0, 255, 136, 0.3)",
            }}
          >
            IN THE ARENA
            <span
              className="ml-1"
              style={{
                opacity: showCursor ? 1 : 0,
                transition: "opacity 100ms",
              }}
            >
              _
            </span>
          </span>
        </motion.div>

        {/* Word-by-word headline */}
        <h2
          className="mb-6 text-center text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px] lg:mb-10"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        {/* Edge fade - left */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full"
          style={{
            background: "linear-gradient(to right, var(--hero-bg-dark), transparent)",
            width: "var(--edge-fade-width, 100px)",
          }}
        />

        {/* Edge fade - right */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full"
          style={{
            background: "linear-gradient(to left, var(--hero-bg-dark), transparent)",
            width: "var(--edge-fade-width, 100px)",
          }}
        />

        {/* Scrollable film strip */}
        <div
          ref={scrollContainerRef}
          role="region"
          aria-label="Featured connections photo gallery"
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-8 py-4 cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: "x mandatory",
          }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Spacer for centering */}
          <div className="flex-shrink-0 w-[calc((100vw-256px)/2)] sm:w-[calc((100vw-296px)/2)] lg:w-[calc((100vw-336px)/2)]" />

          {connectionsData.map((connection, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: "center" }}
            >
              <PhotoFrame
                src={connection.src}
                alt={connection.alt}
                eventName={connection.eventName}
                personName={connection.personName}
                personTitle={connection.personTitle}
                location={connection.location}
                index={index}
                isInView={isInView}
                objectPosition={connection.objectPosition}
                aspectRatio={connection.aspectRatio}
              />
            </div>
          ))}

          {/* Spacer for centering */}
          <div className="flex-shrink-0 w-[calc((100vw-256px)/2)] sm:w-[calc((100vw-296px)/2)] lg:w-[calc((100vw-336px)/2)]" />
        </div>
      </div>

      {/* Tablet scroll progress bar */}
      <div className="hidden md:block lg:hidden mx-auto w-full max-w-7xl px-6 mt-4">
        <div
          className="relative h-1 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-transform duration-300 ease-out"
            style={{
              width: `${100 / connectionsData.length}%`,
              backgroundColor: "rgba(0, 255, 136, 0.5)",
              transform: `translateX(${currentIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <ThumbnailNav
          photos={connectionsData.map((c) => ({ src: c.src, alt: c.alt }))}
          currentIndex={currentIndex}
          onSelect={scrollToPhoto}
        />
      </div>

      {/* Mobile dots */}
      <div className="md:hidden flex items-center justify-center gap-2 mt-6">
        {connectionsData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPhoto(index)}
            className="flex items-center justify-center min-h-[44px] min-w-[44px]"
            aria-label={`Go to photo ${index + 1}`}
          >
            <span
              className="block w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index === currentIndex
                    ? "var(--ath-green)"
                    : "rgba(255, 255, 255, 0.3)",
                boxShadow:
                  index === currentIndex
                    ? "0 0 8px var(--ath-green)"
                    : "none",
              }}
            />
          </button>
        ))}
      </div>

      <style jsx>{`
        .connections-section {
          --edge-fade-width: 100px;
        }

        @media (max-width: 1024px) {
          .connections-section {
            --edge-fade-width: 60px;
          }
        }

        @media (max-width: 640px) {
          .connections-section {
            --edge-fade-width: 24px;
          }
        }
      `}</style>
    </section>
  );
}
