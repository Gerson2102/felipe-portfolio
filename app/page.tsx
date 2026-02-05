import { HeroSection } from "@/components/hero";
import { ImageCarousel } from "@/components/carousel";
import { AboutSection } from "@/components/about";
import { MetricsSection } from "@/components/metrics";
import { TestimonialsSection } from "@/components/testimonials";
import { ServicesSection } from "@/components/services";
import { FeaturedConnectionsSection } from "@/components/connections";
import { FAQSection } from "@/components/faq";
import { FinalCTASection } from "@/components/cta";
import { Navbar } from "@/components/navbar";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ImageCarousel />
        <AboutSection />
        <MetricsSection />
        <TestimonialsSection />
        <ServicesSection />
        <FeaturedConnectionsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <BackToTop />
    </>
  );
}
