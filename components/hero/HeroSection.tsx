import Image from "next/image";
import { AnimatedBackground } from "./AnimatedBackground";
import { TypingText } from "./TypingText";
import { ShineButton } from "@/components/ui/ShineButton";
import { TypingPhrase } from "@/hooks/useTypingEffect";


interface HeroSectionProps {
  eyebrow?: string;
  headlineStart?: string;
  typingPhrases?: TypingPhrase[];
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function HeroSection({
  eyebrow = "FELIPE ESPARRAGÓ",
  headlineStart = "I'm ",
  typingPhrases = [
    { text: "Crypto Educator", prefix: "a " },
    { text: "Blockchain Expert", prefix: "a " },
    { text: "Investment Mentor", prefix: "an " },
    { text: "Your Guide to ATH", prefix: "" },
  ],
  description = "Empowering individuals to navigate the world of cryptocurrency and blockchain technology. From understanding the fundamentals to advanced investment strategies, I help you build the knowledge and confidence to achieve financial freedom.",
  imageSrc = "/images/hero/felipe-metrics.png",
  imageAlt = "Felipe Esparragó",
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pt-24 pb-8 lg:px-8 lg:pb-0">
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[60%_40%] lg:gap-4">
          {/* Left: Text Content */}
          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            {/* Eyebrow */}
            <span
              className="animate-fade-in-up mb-4 text-xs font-medium tracking-[0.3em] opacity-0"
              style={{
                color: "var(--ath-green)",
                animationDelay: "0.1s",
                animationFillMode: "forwards",
              }}
            >
              {eyebrow}
            </span>

            {/* Headline */}
            <h1
              className="animate-fade-in-up mb-6 text-[32px] font-bold leading-tight opacity-0 sm:text-[40px] md:text-[48px] lg:text-[44px] xl:text-[56px]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                animationDelay: "0.2s",
                animationFillMode: "forwards",
              }}
            >
              {headlineStart}
              <TypingText phrases={typingPhrases} />
            </h1>

            {/* Description */}
            <p
              className="animate-fade-in-up max-w-xl text-base leading-relaxed opacity-0 sm:text-lg"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                animationDelay: "0.4s",
                animationFillMode: "forwards",
              }}
            >
              {description}
            </p>

            {/* CTA Button */}
            <div
              className="animate-fade-in-up mt-8 opacity-0"
              style={{
                animationDelay: "0.5s",
                animationFillMode: "forwards",
              }}
            >
              <ShineButton
                variant="filled"
                href="https://go.alltimehigh.academy/"
              >
                Join the Academy
              </ShineButton>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex items-center justify-center lg:items-end lg:justify-end">
            <div className="relative">
              {/* Green glow circle */}
              <div
                className="animate-pulse-glow absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px] lg:h-[460px] lg:w-[460px] xl:h-[520px] xl:w-[520px]"
                style={{ backgroundColor: "var(--ath-green-dim)" }}
                aria-hidden="true"
              />

              {/* Photo */}
              <div
                className="animate-fade-in-scale relative h-[320px] w-[280px] opacity-0 sm:h-[400px] sm:w-[340px] md:h-[480px] md:w-[400px] lg:h-[580px] lg:w-[460px] xl:h-[680px] xl:w-[540px]"
                style={{
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 80vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
