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

| Layer      | Choice                            |
|------------|-----------------------------------|
| Bundler    | Vite 8 (`@tailwindcss/vite` plugin) |
| Framework  | React 19 + TypeScript 6           |
| Styling    | Tailwind CSS v4 (no config file)  |
| Fonts      | Playfair Display (headings) · Inter (body) via Google Fonts |

## Tailwind Setup

Tailwind v4 uses **no `tailwind.config.js`**. Configuration lives entirely in `src/index.css` via `@theme` blocks:

```css
@import "tailwindcss";

@theme {
  --color-gold: #c9a84c;
  /* … */
  --font-family-heading: 'Playfair Display', Georgia, serif;
}
```

Custom utilities (`reveal`, `bg-hatch`, `bg-hero-grid`, `animate-scroll-bob`, stagger delays) are defined in `@layer utilities` inside the same file. Do **not** create a separate config file.

The Vite plugin is wired in `vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss()]
```

## Design Guardrails
- **Avoid:** "AI-default" aesthetics (Inter font, 12px border radius, 0.1 opacity shadows).
- **Embrace:** Professional construction minimalism. Sharp edges, high-contrast monochrome with one bold accent, and heavy use of grid lines.
- **Reference:** The structural layout of uniqueconstruction.com.

## Design Tokens (CSS custom properties)

| Token                 | Value                       | Usage                    |
|-----------------------|-----------------------------|--------------------------|
| `--color-dark`        | `#0a0d14`                   | Primary background       |
| `--color-dark-2`      | `#0f1420`                   | Alternate section bg     |
| `--color-card`        | `#141b2d`                   | Card background          |
| `--color-card-hover`  | `#1a2238`                   | Card hover state         |
| `--color-gold`        | `#c9a84c`                   | Brand accent             |
| `--color-gold-light`  | `#e8c870`                   | Gold hover               |
| `--color-gold-dim`    | `rgba(201,168,76,0.12)`     | Subtle gold tint         |
| `--color-gold-border` | `rgba(201,168,76,0.22)`     | Borders and dividers     |
| `--color-ink`         | `#f0ede6`                   | Primary text             |
| `--color-muted`       | `#8090a8`                   | Secondary text           |
| `--color-faint`       | `#4a5568`                   | Placeholder / meta text  |

Reference them in JSX inline styles as `var(--color-gold)` or as Tailwind classes like `text-gold`, `bg-gold`, `border-gold-border`.

## Project Structure

```
src/
  components/
    Header.tsx        — Fixed nav, scroll-aware bg, mobile overlay menu
    Hero.tsx          — Full-viewport hero with grid overlay and scroll indicator
    Services.tsx      — 6-card service grid with stagger reveal
    Stats.tsx         — Gold band with 4 key metrics
    Portfolio.tsx     — 3-card project showcase (picsum placeholder images)
    WhyUs.tsx         — Differentiators + feature tiles
    Testimonials.tsx  — 3 client review cards
    Contact.tsx       — Split layout: form + info panel with hours
    Footer.tsx        — 4-column footer with social links
  hooks/
    useInView.ts      — IntersectionObserver hook; fires once, disconnects
  App.tsx             — Composes all sections in order
  index.css           — Tailwind entry + @theme tokens + @layer utilities
  App.css             — Intentionally empty (styles live in index.css)
main.tsx              — React root
index.html            — Google Fonts preconnect + meta
```

## Scroll Animation Pattern

Every section uses `useInView` to trigger a CSS reveal animation:

```tsx
const { ref, inView } = useInView(0.08); // 8% visibility threshold
<div ref={ref} className={`reveal ${inView ? 'visible' : ''}`} />
```

For staggered children (service cards, project cards), apply `delay-1` through `delay-6` classes alongside `reveal`. The grid container itself is the observed element.

## Styling Conventions

- **Tailwind first**: use utility classes for all layout, spacing, typography.
- **Inline `style` for tokens**: when a Tailwind class doesn't exist for a CSS variable (e.g. card backgrounds, border colors that change on hover), use `style={{ background: 'var(--color-card)' }}`.
- **`onMouseEnter`/`onMouseLeave`** for hover state changes that require CSS variable swaps (Tailwind can't reference runtime variables in `hover:` variants without a workaround).
- `font-heading` utility class maps to `--font-family-heading` (Playfair Display).
- Section padding: `py-24 lg:py-28` (~96px / 112px).
- Max content width: `max-w-[1260px] mx-auto px-6`.

## Images

Portfolio cards use **Lorem Picsum** placeholder images (`https://picsum.photos/seed/{seed}/{w}/{h}`). These are deterministic by seed — same seed always returns the same image. Replace with real project photography before production.

## Brand

- **Company**: Royal Crest General Contractors LLC
- **Location**: Dallas, TX (also serves Plano, Frisco, Highland Park area)
- **Phone**: (214) 555-0187
- **Email**: info@royalcrestgc.com
- **Theme**: Dark luxury — navy/charcoal backgrounds, gold (#c9a84c) accent, Playfair Display headings
