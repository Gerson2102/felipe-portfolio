"use client";

import { CarouselRow } from "./CarouselRow";

// Row 1 (7 images)
const row1Images = [
  { src: "/images/carousel/felipe-speaking3.webp", alt: "Felipe speaking at conference" },
  { src: "/images/carousel/felipe-missuniverse7.webp", alt: "Group photo at Miss Universe Costa Rica event" },
  { src: "/images/carousel/felipe-mountain.webp", alt: "Felipe mountain adventure" },
  { src: "/images/carousel/btc-100k.webp", alt: "Bitcoin reaching 100K milestone" },
  { src: "/images/carousel/ath-bj4.webp", alt: "Felipe on stage at Blockchain Jungle, black and white" },
  { src: "/images/carousel/felipe-startup-house.webp", alt: "Felipe at Startup House" },
  { src: "/images/carousel/felipe-ath.webp", alt: "Felipe ATH moment" },
];

// Row 2 (8 images)
const row2Images = [
  { src: "/images/carousel/felipe-speaking4.webp", alt: "Felipe keynote presentation" },
  { src: "/images/carousel/felipe-missuniverse4.webp", alt: "Felipe at Miss Universe Organization meeting, outdoor formal attire" },
  { src: "/images/carousel/felipe-computer.webp", alt: "Felipe working on computer" },
  { src: "/images/carousel/ath-bj1.webp", alt: "All Time High Academy booth at Blockchain Jungle" },
  { src: "/images/carousel/felipe-missuniverse.webp", alt: "Felipe at Miss Universe event" },
  { src: "/images/carousel/felipe-paolo-ardoino.webp", alt: "Felipe with Paolo Ardoino" },
  { src: "/images/carousel/felipe-missuniverse2.webp", alt: "Felipe at Miss Universe Organization lounge meeting" },
  { src: "/images/carousel/bitcoin-genesis-block.webp", alt: "Bitcoin genesis block" },
];

// Row 3 (8 images)
const row3Images = [
  { src: "/images/carousel/felipe-speaking2.webp", alt: "Felipe speaking engagement" },
  { src: "/images/carousel/felipe-missuniverse3.webp", alt: "Miss Universe Organization document at meeting" },
  { src: "/images/carousel/felipe-speaking6.webp", alt: "Felipe panel discussion" },
  { src: "/images/carousel/ny-times-banks.webp", alt: "NY Times banks headline" },
  { src: "/images/carousel/ath-bj2.webp", alt: "Audience view of Felipe's ATH presentation at Blockchain Jungle" },
  { src: "/images/carousel/felipe-jack-mallers.webp", alt: "Felipe with Jack Mallers" },
  { src: "/images/carousel/felipe-storms.webp", alt: "Felipe at Storms event" },
  { src: "/images/carousel/felipe-speaking-event.webp", alt: "Felipe at speaking event" },
];

export function ImageCarousel() {
  return (
    <section
      id="gallery"
      className="carousel-section relative w-full overflow-hidden py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: "#050505" }}
      aria-label="Image carousel showcasing Felipe's work and connections"
    >
      {/* Edge fade gradients */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full"
        style={{
          background: "linear-gradient(to right, #050505, transparent)",
          width: "var(--edge-fade-width, 100px)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full"
        style={{
          background: "linear-gradient(to left, #050505, transparent)",
          width: "var(--edge-fade-width, 100px)",
        }}
      />

      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <CarouselRow
          images={row1Images}
          direction="right"
          speed={38}
          height={180}
          tabletHeight={140}
          mobileHeight={100}
        />
        <CarouselRow
          images={row2Images}
          direction="left"
          speed={28}
          height={220}
          tabletHeight={180}
          mobileHeight={140}
        />
        <CarouselRow
          images={row3Images}
          direction="right"
          speed={20}
          height={160}
          tabletHeight={120}
          mobileHeight={90}
        />
      </div>

      <style jsx>{`
        .carousel-section {
          --edge-fade-width: 100px;
        }

        @media (max-width: 1024px) {
          .carousel-section {
            --edge-fade-width: 60px;
          }
        }

        @media (max-width: 640px) {
          .carousel-section {
            --edge-fade-width: 40px;
          }
        }
      `}</style>
    </section>
  );
}
