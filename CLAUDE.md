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

Single-page portfolio site for Felipe Esparrago, crypto educator and founder of All Time High Academy. Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion.

### Page Structure

`app/page.tsx` renders 9 sections in sequence: Hero -> ImageCarousel -> About -> Metrics -> Testimonials -> Services -> FeaturedConnections -> FAQ -> FinalCTA, followed by `FooterCredit` and `BackToTop`. There are no other routes or API endpoints.

Full render order in `page.tsx`:
1. `<Navbar />` (fixed, outside `<main>`)
2. `<main id="main-content">`: HeroSection, ImageCarousel, AboutSection, MetricsSection, TestimonialsSection, ServicesSection, FeaturedConnectionsSection, FAQSection, FinalCTASection
3. `<FooterCredit />` (outside `<main>`)
4. `<BackToTop />` (fixed overlay)

### Component Organization

Components live in `components/` organized by feature section (hero/, about/, carousel/, metrics/, testimonials/, services/, connections/, faq/, cta/). Each folder has an `index.ts` barrel export. Shared primitives are in `components/ui/`. The navbar lives in `components/navbar/`.

All content data (testimonials, FAQs, services, carousel images, metrics, connections) is hardcoded in the respective component files — there is no CMS, database, or API. All user-visible text is internationalized via `lib/i18n/`.

### Component Directory Structure

```
components/
  about/          AboutSection, PhotoFrame, ProgressTimeline, Timeline (legacy)
  carousel/       ImageCarousel, CarouselRow
  connections/    FeaturedConnectionsSection, PhotoFrame, ThumbnailNav
  cta/            FinalCTASection, CTABackground, PathCard
  faq/            FAQSection, FAQCard, ToggleIcon
  hero/           HeroSection, AnimatedBackground, TypingText
  metrics/        MetricsSection, CountUpNumber
  navbar/         Navbar
  services/       ServicesSection, ServiceCard, GlowCard, ServiceIcon
  testimonials/   TestimonialsSection, TestimonialCard, CarouselDots
  ui/             ShineButton, RevealText, SocialLinks, MotionProvider, BackToTop,
                  LanguageToggle, FooterCredit, blur-placeholders.ts
```

### Client vs Server Components

Almost every component is `"use client"`. Only two are server components (no directive):
- `AnimatedBackground.tsx` — pure JSX, no hooks
- `CTABackground.tsx` — pure JSX, no hooks

### Cross-Folder Imports

- `PathCard` (cta/) imports `GlowCard` from `@/components/services/GlowCard` — the one case where a section component depends on another section's component directly
- `blur-placeholders.ts` is imported by path (not barrel-exported): used in `CarouselRow`, `about/PhotoFrame`, `connections/PhotoFrame`, `ThumbnailNav`

## Internationalization (i18n)

**Location:** `lib/i18n/` — three files: `types.ts`, `context.tsx`, `translations.ts`

- `LanguageProvider` wraps the app (in `layout.tsx`), stores preference in `localStorage` under `"preferred-language"`
- Default language: `"es"` (Spanish)
- Uses `useSyncExternalStore` (not useState + useEffect) for lint-clean state management
- Cross-tab sync via `"storage"` event + custom `"language-change"` event for same-tab sync
- `useLanguage()` hook exposes `{ language, setLanguage, t }` — `t(key)` does flat key lookup with fallback to key string
- `LanguageToggle` component: pill-style EN/ES switcher with Framer Motion spring-animated sliding indicator

### Translation Key Namespaces

`nav.*` (6), `hero.*` (8), `about.*` (6), `timeline.*` (5), `metrics.*` (6), `testimonials.*` (18), `services.*` (12), `connections.*` (22), `faq.*` (14), `cta.*` (9), `footer.*` (2)

Components using `useMemo([t])` for data arrays auto-rebuild on language switch.

## Key Content Data

- **About section**: Real bio — 10+ years in crypto, creator of first NFT collection in Costa Rica, Blockchain Jungle panelist, Gold Effie Award winner, ULACIT graduate. Uses the "Technological Translation Method" to teach crypto.
- **Timeline milestones**: 2015 (pos 0%) -> 2017 (25%) -> 2020 (50%) -> 2024 (75%) -> 2025 (100%)
- **Metrics**: 11+, 500+, 4, 50+, 6000+, 2500+ (Years, Students, Cycles, Classes, Hours, Sessions)
- **Services**: ATH Academy (`https://go.alltimehigh.academy/`), 1-on-1 Mentorship (`https://www.alltimehigh.academy/`), Speaking & Workshops (Instagram)
- **Connections**: 7 featured photos with event/person/location metadata
- **Testimonials**: 5 entries with quote, name, context, metric
- **FAQ**: 6 items (accordion, one open at a time, resets to index 0 on language change)
- **Social links**: Instagram, LinkedIn, X (Twitter) — hardcoded URLs in `SocialLinks.tsx`

## Custom Hooks (`hooks/`)

All hooks are `"use client"` and respect `prefers-reduced-motion`:

### useInView
- **API:** `useInView(options?) -> { ref, isInView }`
- **Options:** `threshold` (default 0.2), `triggerOnce` (default true)
- **Reduced motion:** Immediately returns `isInView = true`, skips IntersectionObserver
- **Used by:** AboutSection (0.3), MetricsSection (0.1), TestimonialsSection, ServicesSection, FeaturedConnectionsSection, FAQSection, FinalCTASection (all 0.2)

### useCountUp
- **API:** `useCountUp(options) -> { value, formattedValue, isComplete }`
- **Options:** `end`, `duration` (default 2000ms), `enabled`, `suffix`
- **Easing:** easeOutQuart (`1 - (1-t)^4`)
- **Used by:** `CountUpNumber` in MetricsSection

### useProgress
- **API:** `useProgress(options) -> { progress, isComplete }`
- **Options:** `duration` (default 3500ms), `enabled`
- **Note:** Legacy — was used by original timeline, superseded by `useTimelineOrchestration`. Still in codebase.

### useTimelineOrchestration
- **API:** `useTimelineOrchestration(options) -> TimelineState`
- **State machine:** IDLE -> TRAVELING -> PAUSED -> TRAVELING -> ... -> COMPLETE
- **Options:** `enabled`, `milestonePositions` ([0,25,50,75,100]), `travelDuration` (1600ms), `pauseDuration` (600ms), `finalPauseDuration` (1000ms)
- **Easing:** easeInOutCubic. Last segment travels 1.2x slower for dramatic effect.
- **Milestone activation:** Sets `isActivated: true` + `isAnimatingRipple: true`, clears ripple after 700ms
- **Used by:** `ProgressTimeline` in AboutSection

### useTypingEffect
- **API:** `useTypingEffect(options) -> { displayText, currentPrefix, isTyping, currentPhraseIndex }`
- **State machine:** typing (65ms/char) -> pausing (2500ms) -> deleting (40ms/char) -> waiting (500ms) -> next phrase
- **Note:** Does NOT handle reduced motion (text still cycles; low impact since it's text, not motion)
- **Used by:** `TypingText` in HeroSection

## Animation Layers

Three animation systems coexist, all respecting reduced motion:

### 1. CSS Keyframes (`globals.css`)

| Keyframe | Duration | Usage |
|---|---|---|
| `drift-up` | `--drift-duration` per element | Hero candlestick bars (8 bars, 18-24s each) |
| `pulse-glow` | 4s infinite | Hero green glow circle |
| `blink` | 1s step-end | Typing cursor |
| `fade-in-up` | 0.8s forwards | Hero eyebrow, h1, description, CTA (staggered 0.1-0.5s) |
| `fade-in-left` | 0.8s forwards | Available but unused |
| `fade-in-scale` | 0.8s forwards | Hero photo |
| `rotate-arc` | 25s linear | About section orbit ring |
| `milestone-bounce` | 0.4s | Available (superseded by hook-driven transitions) |
| `shine-sweep` | 0.6s on hover | ShineButton filled variant |
| `heartbeat` | 1s infinite | Footer heart emoji |
| `ring-ripple` | 0.6s forwards | Timeline milestone activation rings |
| `pulse-orb` | 0.8s infinite | Timeline traveling pulse orb |
| `scroll-left/right` | `--scroll-speed` | CSS fallback (superseded by rAF in CarouselRow) |
| `cta-breathe` | 8s infinite | CTA background gradient pulse |

### 2. requestAnimationFrame Hooks

- **useCountUp** — easeOutQuart number animation, cancels on complete
- **useProgress** — easeOutQuart 0-100% (legacy, unused)
- **useTimelineOrchestration** — multi-phase state machine, stops rAF on COMPLETE
- **CarouselRow** — frame-rate-independent infinite scroll (`pixelsPerSecond = setWidth / speed`), three independent loops. Pauses when: off-screen (IntersectionObserver), hovered, or reduced motion. Uses `positionRef` (no re-render per frame).

### 3. Framer Motion

Global config: `<MotionConfig reducedMotion="user">` via `MotionProvider` in layout.tsx.

Key usages:
- **Navbar mobile menu** — `AnimatePresence` + height/opacity animation (opacity-only in reduced motion)
- **RevealText** — word-by-word stagger (`opacity: 0, y: 20` -> `opacity: 1, y: 0`)
- **TestimonialCard** — two-layer: outer spring for card position/scale/blur, inner `AnimatePresence` for directional content slide (SLIDE_DISTANCE = 35)
- **FAQCard** — `AnimatePresence` for `height: 0 -> "auto"` expand/collapse
- **ServiceCard** — staggered entrance (`delay: 0.2 + index * 0.15`)
- **ServiceIcon** — three animated SVG icon variants (bar chart, Venn diagram, broadcast arcs)
- **PhotoFrame (connections)** — hover: saturate + scale image, slide-up frosted overlay
- **CarouselDots** — width 8px -> 24px pill animation on active dot
- **LanguageToggle** — `layoutId="language-pill"` spring animation (stiffness 400, damping 30)
- **SocialLinks** — staggered fade-in-up from baseDelay
- **PathCard** — entrance `opacity: 0, y: 50` -> `opacity: 1, y: 0`

### Recurring Animation Pattern: Terminal Badge + Word-by-Word Headline

TestimonialsSection, ServicesSection, FeaturedConnectionsSection, and FAQSection all share:
- Rounded pill badge with `--ath-green-dim` background, blinking `_` cursor (4 blinks via `setInterval` + `blinkCount` guard)
- H2 headline split on spaces, each word as `motion.span` with stagger (`delay: 0.2 + index * 0.08`)
- This pattern is inlined in each section (not using the `RevealText` component)

## Reduced Motion Handling (5 Layers)

1. **Framer Motion global:** `<MotionConfig reducedMotion="user">` suppresses all FM animations
2. **CSS media query:** `@media (prefers-reduced-motion: reduce)` — `animation: none` on all classes, `opacity: 1; transform: none` on fade-in classes, `scroll-behavior: auto`
3. **Hook-level checks:** useCountUp, useProgress, useTimelineOrchestration all jump to final state; useInView returns `isInView = true` immediately
4. **Navbar (live subscription):** `useSyncExternalStore` on `matchMedia` — toggles smooth vs instant scroll, opacity-only mobile menu variant
5. **CarouselRow (live listener):** `MediaQueryList` change event updates `isReducedMotionRef` each frame

## Styling

### Tailwind CSS v4

- No `tailwind.config` file — theme extended inline in `globals.css` `@theme inline {}`
- `@theme` only extends font and color tokens delegating to CSS vars — default spacing/breakpoint scales are unchanged
- Standard Tailwind breakpoints: `sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px

### CSS Custom Properties (`:root`)

| Variable | Value | Usage |
|---|---|---|
| `--hero-bg-base` | `#050505` | Hero, Metrics, Services, CTA, Carousel, Footer backgrounds |
| `--hero-bg-dark` | `#0a0a0a` | About, Connections, FAQ backgrounds |
| `--hero-bg-mid` | `#0d0d0d` | Hero radial gradient overlay only |
| `--ath-green` | `#00ff88` | Primary accent throughout |
| `--ath-green-dim` | `rgba(0,255,136,0.15)` | Badge backgrounds |
| `--ath-green-glow` | `rgba(0,255,136,0.10)` | Pulse-glow shadow, hero radial |
| `--text-primary` | `#ffffff` | Headings |
| `--text-secondary` | `rgba(255,255,255,0.8)` | Body copy |
| `--text-muted` | `rgba(255,255,255,0.6)` | Labels, metadata |

### Color Palette

Always-dark design (no theme toggle, no `dark:` Tailwind variant used). High-contrast dark aesthetic with neon green (`#00ff88`) accent — "crypto terminal" design language.

Additional colors used inline: `rgba(255,255,255,0.5)` (nav inactive), `rgba(255,255,255,0.3)` (social icons default), `rgba(255,255,255,0.03)` (card backgrounds), `rgba(255,255,255,0.08)` (card borders), `#ef4444` (footer heart/link only).

### Fonts

- **Space Grotesk** (`--font-display`) — headings, buttons, labels, metric numbers, FAQ text, card text. Weights: 400, 500, 600, 700. Applied via `style={{ fontFamily: "var(--font-display)" }}`.
- **Geist** (`--font-geist-sans` / Tailwind `font-sans`) — body default. Loaded via `next/font/google`.

### JSX Scoped Styles

`<style jsx>` blocks in three components for responsive CSS custom property overrides:
- `CarouselRow.tsx` — `--current-height` switching at 640px/1024px
- `ImageCarousel.tsx` — `--edge-fade-width` (100/60/40px)
- `FeaturedConnectionsSection.tsx` — `--edge-fade-width` (100/60/24px)

### Responsive Layout Decisions

| Section | Mobile | Tablet/md | Desktop/lg+ |
|---|---|---|---|
| Hero | stacked | stacked | `grid-cols-[60%_40%]` |
| About | stacked | stacked | `grid-cols-[45%_1fr]` |
| Metrics | `grid-cols-2` | `grid-cols-3` | `grid-cols-6` |
| Services | `grid-cols-1` | `grid-cols-1` | `grid-cols-3` |
| Testimonials | swipe only | 1 card + arrows | 3-card fan + arrows |
| Connections | dots + scroll | progress bar + thumbnails | thumbnails only |
| Timeline | vertical (320px) | horizontal | horizontal |

Max container widths: `max-w-7xl` (1280px) most sections, `max-w-[90rem]` (1440px) Metrics, `max-w-3xl` (768px) FAQ, `max-w-6xl` (1152px) CTA.

## UI Component APIs

### ShineButton
**Props:** `children`, `variant?: "filled" | "outline"`, `href?`, `className?`, `onClick?`
- Renders `<a>` (with href) or `<button>`. External links get `target="_blank"` + arrow icon.
- `filled`: green bg, dark text, shine sweep on hover. `outline`: transparent with green border.

### RevealText
**Props:** `text`, `isInView`, `staggerDelay?` (0.06), `baseDelay?` (0.2), `className?`, `as?` ("p")
- Splits text on spaces, each word is a staggered Framer Motion span.

### GlowCard
**Props:** `children`, `className?`
- Mouse-tracking spotlight: `radial-gradient(400px circle)` follows cursor. Hidden on touch devices via `@media (hover: none)`.

### BackToTop
- Fixed bottom-right, visible after 600px scroll. Passive scroll listener. Smooth scroll to top.

## Image Handling

- Next.js `<Image>` with AVIF/WebP formats configured in `next.config.ts`
- **Device sizes:** 640, 750, 828, 1080, 1200, 1920
- **Image sizes:** 16, 32, 48, 64, 96, 128, 256, 384
- Images: `public/images/hero/` (1 PNG), `about/` (1 WebP), `carousel/` (29 WebP, 600px), `connections/` (8 WebP, copied from carousel)
- `scripts/optimize-images.mjs` — one-time Sharp pipeline: backs up originals, resizes (500-800px), converts to WebP/PNG, normalizes filenames
- `scripts/generate-blur-placeholders.mjs` — auto-generates `components/ui/blur-placeholders.ts` (8x6px WebP at quality 20). Run `npm run generate-blur` after adding/changing images.
- All `<Image>` components use `placeholder="blur"` with data URLs from `blurMap`

## Interactive Elements

### Navbar
- Frosted glass at 50px scroll (`rgba(5,5,5,0.85)` + `blur(12px)`)
- Active section tracking via IntersectionObserver (threshold 0.3, rootMargin `-80px`)
- Mobile: hamburger -> X animation (CSS transforms), body scroll lock, Escape key close
- Reduced motion via `useSyncExternalStore` (live, SSR-safe)

### Testimonials Carousel
- Desktop: 3-card fan layout (center card pops, sides blur/shrink)
- Touch swipe: 50px threshold, direction detection
- 350ms debounce guard between navigations
- CarouselDots: 44px min touch target, active dot expands to pill shape

### Connections Gallery
- CSS `scroll-snap-type: x mandatory` + mouse drag (1.5x scroll multiplier)
- Active card detection: debounced scroll handler (150ms) finds closest card to viewport center
- Centering spacers at start/end for first/last card centering

### FAQ Accordion
- One card open at a time (`openIndex` state). Resets to index 0 on language change.
- ToggleIcon: CSS-only plus-to-X morph (400ms cubic-bezier)
- Accessibility: `aria-expanded`, `role="region"`, `aria-labelledby`

## Scripts Directory

| Script | Purpose |
|---|---|
| `optimize-images.mjs` | One-time Sharp image pipeline (resize, format convert, rename) |
| `generate-blur-placeholders.mjs` | Auto-generates blur-placeholders.ts from public/images/ |
| `audit.mjs` | Playwright visual/a11y audit (requires dev server at localhost:3000) |
| `audit-screenshots.mjs` | Playwright screenshot capture (desktop/tablet/mobile/interactions) |
| `audit-screenshots.cjs` | Puppeteer fallback for audit screenshots |

## Section IDs

`#about`, `#testimonials`, `#services`, `#connections`, `#faq` — observed by Navbar IntersectionObserver. `#main-content` — skip link target on `<main>`.

## Accessibility

- Skip link (`<a href="#main-content">`) in layout.tsx — `sr-only focus:not-sr-only`
- `MotionProvider` respects OS `prefers-reduced-motion` globally
- All interactive elements have 44px minimum touch targets
- FAQ: `aria-expanded`, `role="region"`, `aria-labelledby`
- TypingText: `aria-live="polite"`, `aria-label` with full phrase
- ShineButton: SR-only "(opens in new tab)" text for external links
- Hamburger: `aria-expanded`, `aria-controls`, `aria-label`
- Passive scroll listeners throughout (Navbar, BackToTop, CarouselRow)

## Dependencies

| Package | Version |
|---|---|
| next | 16.1.6 |
| react / react-dom | 19.2.3 |
| framer-motion | ^12.33.0 |
| tailwindcss | ^4 |
| @tailwindcss/postcss | ^4 |
| sharp | ^0.34.5 (dev) |
| playwright | ^1.58.1 (dev) |
| puppeteer-core | ^24.37.1 (dev) |

## Path Alias

`@/*` maps to the project root (tsconfig paths). `moduleResolution: "bundler"`, `target: "ES2017"`, `strict: true`.

## Performance Notes

- All CSS animations use GPU-composited transforms (translateX/Y, rotate, scale, opacity)
- No `will-change` declarations — transforms promote to composite layers implicitly
- CarouselRow caches `offsetWidth` in `cachedSetWidthRef` to avoid reflow per rAF frame
- rAF loops stop or short-circuit when off-screen/complete (no zombie animation loops)
- Image blur placeholders prevent CLS; TypingText renders invisible spacer for longest phrase
