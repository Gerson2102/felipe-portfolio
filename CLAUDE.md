# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint (Core Web Vitals + TypeScript rules)
npm run start     # Start production server
node scripts/optimize-images.mjs  # Optimize/resize images with Sharp
npm run generate-blur             # Generate blur placeholders for all images
```

No test framework is configured.

## Architecture

Single-page portfolio site for a crypto educator. Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion.

### Page Structure

`app/page.tsx` renders 9 sections in sequence: Hero → ImageCarousel → About → Metrics → Testimonials → Services → FeaturedConnections → FAQ → FinalCTA. There are no other routes or API endpoints.

### Component Organization

Components live in `components/` organized by feature section (hero/, about/, carousel/, metrics/, testimonials/, services/, connections/, faq/, cta/). Each folder has an `index.ts` barrel export. Shared primitives (ShineButton, RevealText, SocialLinks) are in `components/ui/`.

All content data (testimonials, FAQs, services, carousel images, metrics) is hardcoded in the respective component files — there is no CMS, database, or API.

### Custom Hooks (`hooks/`)

All hooks are `"use client"` and respect `prefers-reduced-motion`:

- **useInView** — Intersection Observer trigger for scroll animations. Returns `{ ref, isInView }`.
- **useCountUp** — Animates number from 0→end with easeOutQuart. Used in MetricsSection.
- **useProgress** — Animates 0→100% progress. Used by timeline.
- **useTimelineOrchestration** — State machine (IDLE→TRAVELING→PAUSED→COMPLETE) driving the About timeline. Manages milestone activations and ripple animations.
- **useTypingEffect** — Typewriter cycle through phrases. State machine: typing→pausing→deleting→waiting.

### Animation Layers

Three animation systems coexist:
1. **CSS keyframes** (`globals.css`) — drift-up, pulse-glow, blink, scroll-left/right, shine-sweep, fade-in-*, ring-ripple, etc.
2. **requestAnimationFrame hooks** — useCountUp, useProgress, useTimelineOrchestration, CarouselRow infinite scroll.
3. **Framer Motion** — RevealText word-by-word reveals, testimonial card spring physics, FAQ toggle transitions, service card entrances.

### Styling

- Tailwind CSS v4 via PostCSS (no tailwind.config file — theme extended inline in `globals.css` `@theme`)
- CSS custom properties in `:root` for brand color (`--ath-green: #00ff88`), dark backgrounds (`--hero-bg-base: #050505`), and text variants
- Fonts: Space Grotesk (display/headings), Geist (body) — loaded via `next/font` in `layout.tsx`
- JSX scoped styles (`<style jsx>`) used in carousel components for responsive CSS variable overrides

### Image Handling

- Next.js `<Image>` with AVIF/WebP formats configured in `next.config.ts`
- Images organized by section in `public/images/` (hero/, about/, carousel/, connections/)
- `scripts/optimize-images.mjs` batch-processes originals with Sharp (resize, format convert, quality settings)
- `components/ui/blur-placeholders.ts` (auto-generated) provides base64 blur data URLs for all images — regenerate with `npm run generate-blur` after adding/changing images

### Path Alias

`@/*` maps to the project root (tsconfig paths).
