"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShineButton } from "@/components/ui/ShineButton";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n/context";

const NAV_IDS = ["about", "testimonials", "services", "connections", "faq"] as const;

function subscribeToMotionPref(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMotionPref() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionPrefServer() {
  return false;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPref, getMotionPref, getMotionPrefServer);
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll detection for background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    const sections = NAV_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    sections.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const scrollToSection = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      setMobileOpen(false);
    },
    [reducedMotion]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    setMobileOpen(false);
  }, [reducedMotion]);

  const ease = [0.25, 0.1, 0.25, 1] as const;
  const mobileMenuVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, height: 0 },
        visible: {
          opacity: 1,
          height: "auto" as const,
          transition: { duration: 0.3, ease },
        },
        exit: {
          opacity: 0,
          height: 0,
          transition: { duration: 0.2, ease },
        },
      };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(5, 5, 5, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:py-3 lg:px-8">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="text-xs font-medium tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80 py-3"
          style={{ color: "var(--ath-green)" }}
        >
          FELIPE ESPARRAG&Oacute;
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-sm font-medium transition-colors duration-200 py-3"
              style={{
                color:
                  activeSection === id
                    ? "var(--ath-green)"
                    : "rgba(255, 255, 255, 0.6)",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== id) {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  activeSection === id
                    ? "var(--ath-green)"
                    : "rgba(255, 255, 255, 0.6)";
              }}
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>

        {/* Desktop language toggle + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageToggle />
          <ShineButton
            variant="filled"
            href="https://go.alltimehigh.academy/"
            className="!px-5 !py-2.5 !text-sm !rounded-lg"
          >
            {t("nav.cta")}
          </ShineButton>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="lg:hidden flex flex-col items-center justify-center w-11 h-11 gap-[5px]"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className="block w-5 h-[2px] bg-white transition-all duration-300 origin-center"
            style={{
              transform: mobileOpen
                ? "translateY(3.5px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            className="block w-5 h-[2px] bg-white transition-all duration-300"
            style={{
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-[2px] bg-white transition-all duration-300 origin-center"
            style={{
              transform: mobileOpen
                ? "translateY(-3.5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden overflow-hidden"
            style={{
              backgroundColor: "rgba(5, 5, 5, 0.95)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div className="px-6 pb-6 pt-2 flex flex-col gap-1">
              {NAV_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="w-full text-left py-3 text-base font-medium transition-colors duration-200"
                  style={{
                    color:
                      activeSection === id
                        ? "var(--ath-green)"
                        : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {t(`nav.${id}`)}
                </button>
              ))}
              <div className="pt-4 flex items-center justify-center">
                <LanguageToggle />
              </div>
              <div className="pt-3">
                <ShineButton
                  variant="filled"
                  href="https://go.alltimehigh.academy/"
                  className="!w-full !px-5 !py-3 !text-sm !rounded-lg"
                >
                  {t("nav.cta")}
                </ShineButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
