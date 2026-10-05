# Royal Crest GC — UI

Single-page marketing website for **Royal Crest General Contractors** (Dallas, TX). Built with Vite + React 19 + TypeScript + Tailwind CSS v4. Hosted on GitHub Pages at `www.royalcrestgc.com`.

## Commands

```bash
npm run dev      # dev server (http://localhost:5173)
npm run build    # tsc + vite build → dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Stack

| Layer      | Choice                                      |
|------------|---------------------------------------------|
| Bundler    | Vite 8 (`@tailwindcss/vite` plugin)         |
| Framework  | React 19 + TypeScript 6                     |
| Styling    | Tailwind CSS v4 (no config file)            |
| Fonts      | Geist Variable (headings + body) via local woff2 |
| Animation  | `motion/react` (Motion v12)                 |
| Icons      | `@tabler/icons-react`                       |

`@/` is an alias for `src/` (set in `vite.config.ts` and `tsconfig.app.json`).

## Tailwind Setup

Tailwind v4 uses **no `tailwind.config.js`**. Configuration lives entirely in `src/index.css`, which also declares the two Geist `@font-face` rules. The `@theme` block:

```css
@import "tailwindcss";

@theme {
  --color-bg:      #f7f7f2;
  --color-surface: #e4e6c3;
  --color-accent:  #899878;
  --color-accent-ink: #5f6e51;
  --color-text:    #222725;
  --color-deep:    #121113;

  --font-heading: "Geist", ui-sans-serif, system-ui;
  --font-body:    "Geist", ui-sans-serif, system-ui;
  --font-geist:   "Geist", ui-sans-serif, system-ui;
  --font-sans:    "Geist", ui-sans-serif, system-ui;
}
```

Custom utilities (`label`, `reveal`, stagger delays `delay-1`…`delay-6`, `shadow-input`, `grid-pattern`, `animate-scroll-bob`) are defined in `@layer utilities` inside the same file, along with the `prefers-reduced-motion` block. Do **not** create a separate config file.

The Vite plugin is wired in `vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss()]
```

## Design Guardrails
- **Avoid:** "AI-default" aesthetics (Inter font, heavy drop shadows, dark navy backgrounds).
- **Embrace:** Light, minimal construction aesthetic. Off-white base, muted sage accent, hairline border dividers.
- **Rounded corners are deliberate.** Buttons and CTAs use `rounded-2xl`, cards use `rounded-xl`, form fields `rounded-md`, avatars `rounded-full`. The owner has decided to keep them; do not "fix" them to sharp edges, and match these radii when adding new elements.
- **Reference:** The structural layout of uniqueconstruction.com.

## Design Tokens (CSS custom properties)

| Token             | Value       | Tailwind class   | Usage                          |
|-------------------|-------------|------------------|--------------------------------|
| `--color-bg`      | `#f7f7f2`   | `bg-bg`          | Page background (porcelain)    |
| `--color-surface` | `#e4e6c3`   | `bg-surface`     | Cards, borders, gap fills      |
| `--color-accent`  | `#899878`   | `text-accent`    | Brand accent — decoration only (icons, fills); 2.9:1 on bg, too light for text |
| `--color-accent-ink` | `#5f6e51` | `text-accent-ink` | Accent for text, hover states and focus rings (5.1:1 on bg) |
| `--color-text`    | `#222725`   | `text-text`      | Primary text (carbon black)    |
| `--color-deep`    | `#121113`   | `bg-deep`        | CTAs, dark fills (onyx)        |

### Opacity modifier syntax (Tailwind v4)
Use `/` modifiers for opacity variants — no inline styles needed:
- `text-text/70` — secondary text (lowest opacity that passes 4.5:1 comfortably)
- `text-text/65` — meta / placeholder text (4.7:1; don't go lower for readable text)
- `bg-accent/20` — subtle accent tint
- `border-text/10` — hairline borders

### Color mapping cheatsheet
| Old pattern                          | New class                        |
|--------------------------------------|----------------------------------|
| `style={{ color: 'var(--color-ink)' }}` | `text-text`                   |
| `style={{ color: 'var(--color-muted)' }}` | `text-text/70`              |
| `style={{ color: 'var(--color-faint)' }}` | `text-text/65`              |
| `style={{ color: 'var(--color-gold)' }}` | `text-accent-ink` (text) / `text-accent` (icons) |
| `style={{ background: '#fafaf8' }}`  | `bg-bg`                          |
| `style={{ background: 'var(--color-ink)' }}` | `bg-deep`               |
| `rgba(26,23,20,0.09)` border/gap     | `bg-surface` / `border-surface`  |

## Project Structure

Components are listed in the order `App.tsx` renders them.

```
index.html              — Meta/Open Graph tags, JSON-LD, font and hero image preloads
vite.config.ts          — Plugins, `@` alias, `base` from VITE_BASE_URL (PR previews)
public/                 — Copied to the site root unchanged
  404.html              — Standalone not-found page (inline CSS, no JS)
  robots.txt, sitemap.xml
  favicon.png, favicon-32.png, apple-touch-icon.png, og-image.jpg
.github/workflows/
  deploy.yml            — Production deploy on push to main
  pr-preview.yml        — Per-pull-request preview deploy
src/
  main.tsx              — React root
  App.tsx               — <MotionConfig reducedMotion="user"> + all sections in order
  index.css             — Tailwind entry, @font-face, @theme tokens, @layer utilities
  components/
    Header.tsx          — Fixed nav, scroll-aware background, mobile overlay menu
    Hero.tsx            — Video-masked headline (VideoText), CTAs, responsive hero image
    Stats.tsx           — Three-metric stats band
    Badges.tsx          — Partner/certification logos (grayscale → color on hover)
    Services.tsx        — Bento grid of service cards with photos (BentoGrid)
    Portfolio.tsx       — Project photo grid with click-to-expand cards (LayoutGrid)
    WhyUs.tsx           — "Why choose us" section
    Team.tsx            — Co-owner profiles in a gap-px grid
    Testimonials.tsx    — Client reviews (AnimatedTestimonials)
    Contact.tsx         — Quote form (SignupForm), contact details, service-area map
    Footer.tsx          — Logo, nav, services list, CTA
    ui/
      video-text.tsx            — Video clipped to text by an SVG mask, with poster fallback
      bento-grid.tsx            — BentoGrid + BentoGridItem (Aceternity)
      layout-grid.tsx           — LayoutGrid with click-to-expand (Aceternity)
      animated-testimonials.tsx — Stacked photo + quote carousel (Aceternity)
      multi-step-loader.tsx     — Auto-advancing checklist (Aceternity)
      input.tsx                 — Text input with a pointer-following gradient border
      label.tsx                 — Radix UI label wrapper
      signup-form.tsx           — Quote request form; submits to Web3Forms
  hooks/
    useInView.ts        — IntersectionObserver hook; fires once, then disconnects
  lib/
    utils.ts            — cn() utility (clsx + tailwind-merge)
  assets/               — Photos, video, logos and fonts (see Images)
```

## Scroll Animation Pattern

Most sections use `useInView` to trigger a CSS reveal animation (the hero, badges and footer do not):

```tsx
const { ref, inView } = useInView(0.08); // 8% visibility threshold; default is 0.12
<div ref={ref} className={`reveal ${inView ? 'visible' : ''}`} />
```

For staggered children, apply `delay-1` through `delay-6` alongside `reveal`. The grid container is the observed element.

## Styling Conventions

- **Tailwind only** — no `style={{ color: ... }}` or `style={{ background: ... }}` anywhere. All colors come from token classes.
- **Inline `style` only for layout values** — `fontSize: 'clamp(...)'`, `paddingTop`, etc. Never for colors.
- **No `onMouseEnter`/`onMouseLeave` for color changes** — use Tailwind `hover:` variants instead.
- `font-heading` utility class maps to the Geist variable font.
- Section heading: `<p className="label">` eyebrow above an `<h2 className="font-heading font-bold ...">` sized with `clamp(2.2rem, 4vw, 3.2rem)`.
- Section padding: `py-24 lg:py-28` for the main sections.
- Max content width: `max-w-[1260px] mx-auto px-8 lg:px-12`.
- Gap-px grid pattern: set `gap-px bg-surface` on the grid, `bg-bg` on each cell — the surface color bleeds through as hairline dividers.
- `grid-pattern` is a blueprint-grid background utility for card headers that have no photo.

## Button Patterns

In-page navigation uses real links (`<a href="#contact">`), not buttons with `scrollIntoView`; smooth scrolling comes from CSS. Use `<button>` only for actions.

```tsx
// Primary CTA
className="rounded-2xl bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"

// Outline underline link
className="border-b border-text text-text hover:text-accent-ink hover:border-accent-ink transition-colors duration-200"

// Nav link
className="text-text/70 hover:text-text transition-colors"
```

## Performance and accessibility

These decisions are easy to undo by accident. Keep them when editing nearby code.

- **The hero image is the LCP element.** It must render immediately: no entrance animation, no `motion` wrapper, no `loading="lazy"`. It keeps `fetchPriority="high"`.
- **Hero `srcSet`/`sizes` must match the preload in `index.html`.** `HERO_SRCSET` and `HERO_SIZES` in `Hero.tsx` mirror the `imagesrcset`/`imagesizes` on `<link rel="preload" as="image">`. Change both together, or the browser downloads the hero twice.
- **The headline video must not compete with the first paint.** Its poster is preloaded and shown first; the video itself is only fetched after the page has loaded, and not at all under reduced motion.
- **Below-the-fold images need `loading="lazy"` and real `width`/`height`** (the file's actual pixel dimensions), so they reserve their space and do not shift the page when they arrive. `Services.tsx` shows the pattern.
- **Reduced motion is respected in two places.** `App.tsx` wraps everything in `<MotionConfig reducedMotion="user">` for `motion/react` animations, and `index.css` has a `prefers-reduced-motion` block that disables smooth scrolling and the `reveal` transition. Timers and autoplay are not covered by either: guard them with `useReducedMotion()`.
- **Nothing should animate endlessly without a way to pause it.** Anything that autoplays, loops or cycles must stop under reduced motion and either pause on hover and focus or offer a control.
- **Text contrast:** use `text-accent-ink`, not `text-accent`, for text; do not go below `text-text/65`.

## Images

Media lives in `src/assets/` and is imported from components, so Vite fingerprints it and the paths work under the PR-preview base path. Photos are `.webp`.

- `hero-800.webp`, `hero-1200.webp`, `hero-1500.webp` — the hero image at three widths (4:3), served through `srcSet`
- `drone_roof_540.mp4` — headline video (960×540)
- `drone_roof_poster.webp` — poster frame for the headline video
- `home.webp` — luxury home exterior
- `big_roof.webp` — aerial roofing shot
- `roof_birdseye.webp` — birdseye roof view
- `roofing_team.webp` — crew on site
- `backyard_deck1.webp` — backyard deck
- `IMG_4673.webp` — copper gutter installation
- `IMG_3919_edited.webp` — exterior finish work
- `IMG_4454.webp` — copper downspout close-up
- `alan.webp`, `dan.webp` — co-owner portraits
- `images/` — partner logos (`gaf`, `brava`, `certainteed`, `abc`, all `.avif`) and `royal_crest_logo.svg`
- `fonts/` — `Geist-Variable.woff2`, `Geist-Italic[wght].woff2`

Kept as originals and **not shipped** (nothing imports them, so they are not in `dist/`): `72959.webp` (uncropped portrait original of the hero image) and `drone_roof.mp4` (1280×720 original of the headline video). Do not import them.

## Deployment

GitHub Pages serves the `gh-pages` branch at `www.royalcrestgc.com`. Never commit to `gh-pages` by hand.

- **Production** (`deploy.yml`): every push to `main` runs lint and build, then publishes `dist/` to the root of `gh-pages`. Files that are no longer in the build are deleted; `pr-preview/` is excluded from that clean-up.
- **PR previews** (`pr-preview.yml`): each pull request is built with `VITE_BASE_URL=/pr-preview/pr-<number>/` and published to that directory on `gh-pages`, then removed when the PR closes.
- GitHub Pages reads the custom domain from `CNAME` at the root of `gh-pages`, and `.nojekyll` there stops it running Jekyll. `deploy.yml` writes both into `dist/` before every production deploy. Do not move them to `public/`: they would be copied into every PR preview, and the preview action does not delete them when a preview is removed.
- The site is served from a sub-path in previews, so reference assets by import (or `import.meta.env.BASE_URL`), never by a hard-coded `/assets/...` path.

## Brand

- **Company**: Royal Crest General Contractors LLC
- **Location**: Dallas, TX (also serves Plano, Frisco, Highland Park area)
- **Phone**: (469) 432 0341
- **Email**: royalcrestgeneralcontracting@outlook.com
- **Theme**: Light minimalist — off-white base, sage green accent (#899878), Geist font, rounded corners
