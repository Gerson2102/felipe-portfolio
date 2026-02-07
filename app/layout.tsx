import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { LanguageProvider } from "@/lib/i18n/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Felipe Esparragó | Crypto Educator & Blockchain Expert",
  description:
    "Your guide to understanding blockchain technology, cryptocurrency investment strategies, and navigating the path to financial freedom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#00ff88] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#050505]"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
