# Royal Crest GC — UI

Single-page marketing website for **Royal Crest General Contractors** (Dallas, TX). Built with Vite + React 19 + TypeScript + Tailwind CSS v4.

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
| Animation  | `motion/react` (Framer Motion v11+)         |
| Icons      | `@tabler/icons-react`                       |

## Tailwind Setup

Tailwind v4 uses **no `tailwind.config.js`**. Configuration lives entirely in `src/index.css` via `@theme` blocks:

```css
@import "tailwindcss";

@theme {
  --color-bg:      #f7f7f2;
  --color-surface: #e4e6c3;
  --color-accent:  #899878;
  --color-text:    #222725;
  --color-deep:    #121113;

  --font-heading: "Geist", ui-sans-serif, system-ui;
  --font-body:    "Geist", ui-sans-serif, system-ui;
}
```

Custom utilities (`reveal`, `grid-pattern`, `animate-scroll-bob`, `shadow-input`, stagger delays) are defined in `@layer utilities` inside the same file. Do **not** create a separate config file.

The Vite plugin is wired in `vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss()]
```

## Design Guardrails
- **Avoid:** "AI-default" aesthetics (Inter font, round corners everywhere, heavy drop shadows, dark navy backgrounds).
- **Embrace:** Light, minimal construction aesthetic. Off-white base, sharp edges, muted sage accent, heavy use of grid lines and border dividers.
- **Reference:** The structural layout of uniqueconstruction.com.

## Design Tokens (CSS custom properties)

| Token             | Value       | Tailwind class   | Usage                          |
|-------------------|-------------|------------------|--------------------------------|
| `--color-bg`      | `#f7f7f2`   | `bg-bg`          | Page background (porcelain)    |
| `--color-surface` | `#e4e6c3`   | `bg-surface`     | Cards, borders, gap fills      |
| `--color-accent`  | `#899878`   | `text-accent`    | Brand accent (palm leaf green) |
| `--color-text`    | `#222725`   | `text-text`      | Primary text (carbon black)    |
| `--color-deep`    | `#121113`   | `bg-deep`        | CTAs, dark fills (onyx)        |

### Opacity modifier syntax (Tailwind v4)
Use `/` modifiers for opacity variants — no inline styles needed:
- `text-text/60` — secondary text
- `text-text/40` — meta / placeholder text
- `bg-accent/20` — subtle accent tint
- `border-text/10` — hairline borders

### Color mapping cheatsheet
| Old pattern                          | New class                        |
|--------------------------------------|----------------------------------|
| `style={{ color: 'var(--color-ink)' }}` | `text-text`                   |
| `style={{ color: 'var(--color-muted)' }}` | `text-text/60`              |
| `style={{ color: 'var(--color-faint)' }}` | `text-text/40`              |
| `style={{ color: 'var(--color-gold)' }}` | `text-accent`                |
| `style={{ background: '#fafaf8' }}`  | `bg-bg`                          |
| `style={{ background: 'var(--color-ink)' }}` | `bg-deep`               |
| `rgba(26,23,20,0.09)` border/gap     | `bg-surface` / `border-surface`  |

## Project Structure

```
src/
  components/
    Header.tsx        — Fixed nav, scroll-aware bg, mobile overlay menu
    Hero.tsx          — Word-by-word animated headline, home.jpg hero image
    Services.tsx      — 6-card bento grid (BentoGrid + BentoGridItem)
    Stats.tsx         — 4-metric stats band
    Badges.tsx        — Partner/certification logos (grayscale → color on hover)
    Portfolio.tsx     — 4-card layout grid (LayoutGrid) with real project photos
    WhyUs.tsx         — 4 pillars in a gap-px grid
    Testimonials.tsx  — Animated testimonials (AnimatedTestimonials)
    Contact.tsx       — Form (SignupForm) + contact info panel
    Footer.tsx        — Logo, nav, services list, CTA
  ui/
    bento-grid.tsx        — BentoGrid + BentoGridItem (Aceternity)
    layout-grid.tsx       — LayoutGrid with click-to-expand (Aceternity)
    animated-testimonials.tsx — Stacked photo + quote carousel (Aceternity)
    input.tsx             — Motion-powered radial gradient input
    label.tsx             — Radix UI label wrapper
    signup-form.tsx       — Contact/quote request form
  hooks/
    useInView.ts      — IntersectionObserver hook; fires once, disconnects
  lib/
    utils.ts          — cn() utility (clsx + tailwind-merge)
  App.tsx             — Composes all sections in order
  index.css           — Tailwind entry + @theme tokens + @layer utilities
main.tsx              — React root
index.html            — Favicon + meta
```

## Scroll Animation Pattern

Every section uses `useInView` to trigger a CSS reveal animation:

```tsx
const { ref, inView } = useInView(0.08); // 8% visibility threshold
<div ref={ref} className={`reveal ${inView ? 'visible' : ''}`} />
```

For staggered children, apply `delay-1` through `delay-6` alongside `reveal`. The grid container is the observed element.

## Styling Conventions

- **Tailwind only** — no `style={{ color: ... }}` or `style={{ background: ... }}` anywhere. All colors come from token classes.
- **Inline `style` only for layout values** — `fontSize: 'clamp(...)'`, `paddingTop`, etc. Never for colors.
- **No `onMouseEnter`/`onMouseLeave` for color changes** — use Tailwind `hover:` variants instead.
- `font-heading` utility class maps to the Geist variable font.
- Section padding: `py-24 lg:py-28`.
- Max content width: `max-w-[1260px] mx-auto px-8 lg:px-12`.
- Gap-px grid pattern: set `gap-px bg-surface` on the grid, `bg-bg` on each cell — the surface color bleeds through as hairline dividers.
- Blueprint grid header (bento cards): use `className="grid-pattern ..."` — defined in `@layer utilities`.

## Button Patterns

```tsx
// Primary CTA
className="bg-deep text-bg hover:bg-accent transition-colors duration-200"

// Outline underline link
className="border-b border-text text-text hover:text-accent hover:border-accent transition-colors duration-200"

// Nav link
className="text-text/60 hover:text-text transition-colors"
```

## Images

Project photos live in `src/assets/`:
- `big_roof.jpg` — aerial roofing shot
- `roof_birdseye.jpg` — birdseye roof view
- `roofing_team.jpg` — crew on site
- `home.jpg` — luxury home exterior

## Brand

- **Company**: Royal Crest General Contractors LLC
- **Location**: Dallas, TX (also serves Plano, Frisco, Highland Park area)
- **Phone**: (469) 432 0341
- **Email**: royalcrestgeneralcontracting@outlook.com
- **Theme**: Light minimalist — off-white base, sage green accent (#899878), Geist font, sharp edges
