"use client";

import { motion } from "framer-motion";

interface SocialLinksProps {
  isInView: boolean;
  baseDelay?: number;
}

// Simple SVG icons
const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/fesparrago.ath/" },
  { name: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/in/felipe-esparrag%C3%B3-0a50a0123/" },
  { name: "X", icon: XIcon, href: "https://x.com/fesparrago07" },
];

export function SocialLinks({ isInView, baseDelay = 1.5 }: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: baseDelay + index * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,255,136,0.08)] hover:text-[var(--ath-green)]"
          aria-label={social.name}
        >
          <social.icon />
        </motion.a>
      ))}
    </div>
  );
}
