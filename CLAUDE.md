# Royal Crest GC — UI

Marketing website for **Royal Crest General Contractors** (Dallas, TX). Built with Astro 7 (static output, React 19 islands) + TypeScript + Tailwind CSS v4. Every page is pre-rendered to HTML at build time. Hosted on GitHub Pages at `www.royalcrestgc.com`.

## Commands

```bash
npm run dev      # dev server (http://localhost:4321)
npm run build    # astro check + astro build → dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Stack

| Layer      | Choice                                      |
|------------|---------------------------------------------|
| Framework  | Astro 7, `output: static` (Vite 8 under it) |
| Islands    | React 19 + TypeScript 6 via `@astrojs/react` |
| Images     | `astro:assets` (`<Image>`, `getImage`)      |
| Styling    | Tailwind CSS v4 (no config file)            |
| Fonts      | Geist Variable (headings + body) via local woff2 |
| Animation  | `motion/react` (Motion v12)                 |
| Icons      | `@tabler/icons-react`                       |

`@/` is an alias for `src/` (set in `tsconfig.json`).

## Tailwind Setup

Tailwind v4 uses **no `tailwind.config.js`**. Configuration lives entirely in `src/styles/global.css` (imported by `src/layouts/Base.astro`), which also declares the two Geist `@font-face` rules. The `@theme` block:

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

Custom utilities (`label`, `reveal`, stagger delays `delay-1`…`delay-6`, `shadow-input`, `grid-pattern`, `animate-scroll-bob`, `animate-hero-headline`, `animate-hero-actions`) are defined in `@layer utilities` inside the same file, along with the `prefers-reduced-motion` block. Do **not** create a separate config file.

The Vite plugin is wired in `astro.config.mjs`:
```js
import tailwindcss from '@tailwindcss/vite'
vite: { plugins: [tailwindcss()] }
```

## Design Guardrails
- **Avoid:** "AI-default" aesthetics (Inter font, heavy drop shadows, dark navy backgrounds).
- **Embrace:** Light, minimal construction aesthetic. Off-white base, muted sage accent, hairline border dividers.
- **Rounded corners are deliberate.** Buttons and CTAs use `rounded-2xl`, as does the full-width hero photo. Cards and photos in a grid use `rounded-xl`; a photo or control nested inside a card or photo uses `rounded-lg`. Form fields use `rounded-md`, avatars `rounded-full`. The owner has decided to keep them; do not "fix" them to sharp edges, and match these radii when adding new elements.
- **Reference:** The structural layout of uniqueconstruction.com.
- **Design-taste rules** (from the `design-taste-frontend` skill, applied 2026-10-21):
  - No em dash or en dash in visible text, alt text included. Use a hyphen, comma or parentheses.
  - At most one section eyebrow per three sections, with two sections between eyebrows (currently Badges and Contact).
  - One label per action: quote buttons say "Get a Quote" everywhere.
  - No text over photos. Captions go below the image.
  - No pure black or white: use `deep` and `bg`, and tint shadows (`shadow-deep/30`).
  - Hero: headline, one subhead, buttons. Nothing else.
  - No `window.addEventListener('scroll')`. Use an IntersectionObserver or Motion's `useScroll`.
  - Stacking order comes from `src/lib/layers.ts`; do not add new z-index values without adding them there.

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

Sections are listed in the order `src/pages/index.astro` renders them. `.astro` components render to plain HTML with no JavaScript. `.tsx` components are React islands, hydrated in the browser with the `client:*` directive shown.

```
astro.config.mjs        — site URL, `base` from VITE_BASE_URL (PR previews), trailingSlash 'always', React + Tailwind
public/                 — Copied to the site root unchanged
  robots.txt
  favicon.png, favicon-32.png, apple-touch-icon.png, og-image.jpg
.github/workflows/
  deploy.yml            — Production deploy on push to main
  pr-preview.yml        — Per-pull-request preview deploy
src/
  pages/
    index.astro         — Home page: sections in order, hero preloads
    404.astro           — Standalone not-found page (inline CSS, no JS) → dist/404.html
    sitemap.xml.ts      — /sitemap.xml, built from the .astro files in pages/
  layouts/
    Base.astro          — <html>, <head> (Seo, favicons, font preload), scroll-reveal script
  styles/
    global.css          — Tailwind entry, @font-face, @theme tokens, @layer utilities
  components/
    Seo.astro           — title, description, canonical, Open Graph, JSON-LD (from business.ts)
    Header.tsx          — client:load. Fixed nav, scroll-aware background, mobile overlay menu
    Hero.astro          — Video-masked headline (VideoText, client:load), CTAs, hero image
    Stats.astro         — Three-metric stats band
    Badges.astro        — Partner/certification logos (grayscale → color on hover)
    Services.astro      — Wide/narrow grid of service cards (ServiceCard)
    Portfolio.astro     — Project photos (LayoutGrid, client:visible) with click-to-expand
    Team.astro          — Co-owner profiles
    Testimonials.astro  — Client review excerpts
    Contact.astro       — Quote form (SignupForm, client:visible), contact details, map
    Footer.astro        — Logo, nav, services list, CTA
    MobileActionBar.tsx — client:idle. Call / Get a Quote bar on phones
    ui/
      ServiceCard.astro         — Service card with a responsive photo; whole card is a link
      video-text.tsx            — Video clipped to text by an SVG mask, with poster fallback
      layout-grid.tsx           — LayoutGrid with click-to-expand (Aceternity)
      input.tsx                 — Text input with a pointer-following gradient border
      label.tsx                 — Radix UI label wrapper
      signup-form.tsx           — Quote request form; submits to Web3Forms
  lib/
    business.ts         — Every business fact: name, phone, email, hours, areas, stats
    links.ts            — page() and section() hrefs that respect the PR-preview base path
    hero.ts             — Hero image src/srcset/sizes, shared by Hero.astro and the preload
    layers.ts           — z-index scale (LAYER class strings)
    utils.ts            — cn() utility (clsx + tailwind-merge)
  assets/               — Photos, video, logos and fonts (see Images)
```

## Business facts

Name, phone, email, hours, service area and the stats band come from `src/lib/business.ts`. Components, the JSON-LD and the 404 page all read it, so never write a phone number or the business name into a component. The 2026-10-28 SEO audit found conflicting phone numbers, names and founding dates in outside listings. Change a value only after the owner approves it.

## Islands

Only interactive parts are React islands. Everything else is `.astro`. An island:
- is a `.tsx` file used from an `.astro` file with a `client:*` directive (`client:load` above the fold, `client:visible` below it, `client:idle` for chrome like the action bar).
- is rendered to HTML at build time too, so it must not touch `window`, `document` or `localStorage` during render. Read browser state in effects, or through `useSyncExternalStore` with a server snapshot (see `signup-form.tsx`).
- is hydrated on its own. If it uses `motion`, wrap it in `<MotionConfig reducedMotion="user">`.
- gets strings and arrays as props, not as children: Astro passes children to islands as rendered HTML.
- links to home-page sections with `section('contact')` from `src/lib/links.ts`, so the link also works from other pages and in PR previews.

## Scroll Animation Pattern

Most sections reveal on scroll (the hero, badges and footer do not). Put `data-reveal` on the observed element and `reveal` on whatever should animate. The script in `Base.astro` adds `visible` once the element is in view:

```astro
<div data-reveal="0.08" class="grid ...">   <!-- threshold; default 0.12 -->
  <div class="reveal delay-1">...</div>
</div>
```

`data-reveal` and `reveal` can sit on the same element. For staggered children, apply `delay-1` through `delay-6` alongside `reveal`. Do not nest `data-reveal` elements. Without JavaScript, a `<noscript>` style shows every `.reveal`.

## Styling Conventions

- **Tailwind only** — no `style={{ color: ... }}` or `style={{ background: ... }}` anywhere. All colors come from token classes.
- **Inline `style` only for layout values** — `fontSize: 'clamp(...)'`, `paddingTop`, etc. Never for colors.
- **No `onMouseEnter`/`onMouseLeave` for color changes** — use Tailwind `hover:` variants instead.
- `font-heading` utility class maps to the Geist variable font.
- Section heading: an `<h2 className="font-heading font-bold ...">` sized with `clamp(2.2rem, 4vw, 3.2rem)`. A `<p className="label">` eyebrow above it only within the eyebrow limit in Design Guardrails.
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

- **The hero image is the LCP element.** It must render immediately: no entrance animation, no island, no `loading="lazy"`. It keeps `fetchpriority="high"`.
- **Hero `srcset`/`sizes` must match its preload.** Both `Hero.astro` and the `<link rel="preload" as="image">` in `index.astro` read `HERO` from `src/lib/hero.ts`. Keep it that way, or the browser downloads the hero twice. The three hero files are hand-encoded and served as they are, not through `<Image>`.
- **The headline video must not compete with the first paint.** Its poster is preloaded and shown first; the video itself is only fetched after the page has loaded, and not at all under reduced motion.
- **Below-the-fold photos use `<Image>` from `astro:assets`** with `widths` and a `sizes` that matches the layout, so each is downloaded at the size it is shown. `<Image>` sets `loading="lazy"` and the real `width`/`height`, so the photo reserves its space. `ServiceCard.astro` shows the pattern; an island gets the same from `getImage()` (see `Portfolio.astro`).
- **Reduced motion is respected in two places.** Every island that uses `motion/react` wraps itself in `<MotionConfig reducedMotion="user">`, and `global.css` has a `prefers-reduced-motion` block that disables smooth scrolling, the hero entrance and the `reveal` transition. Timers and autoplay are not covered by either: guard them with `useReducedMotion()`.
- **Nothing should animate endlessly without a way to pause it.** Anything that autoplays, loops or cycles must stop under reduced motion and either pause on hover and focus or offer a control.
- **Text contrast:** use `text-accent-ink`, not `text-accent`, for text; do not go below `text-text/65`.

## Images

Media lives in `src/assets/` and is imported from components, so it is fingerprinted into `dist/_astro/` and the paths work under the PR-preview base path. Photos rendered through `<Image>`/`getImage()` ship only as resized copies, never as the original file. Photos are `.webp`.

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
- The site is served from a sub-path in previews, so reference assets by import and pages with `page()`/`section()` from `src/lib/links.ts`, never by a hard-coded `/...` path.
- Pages build to `<name>/index.html` (`trailingSlash: 'always'`), which GitHub Pages serves at `/<name>/`. Unknown URLs get `404.html` with a real 404 status. Do not add a catch-all redirect to the home page.

## Brand

- **Company**: Royal Crest General Contractors LLC
- **Location**: Dallas, TX (also serves Plano, Frisco, Highland Park area)
- **Phone**: (469) 432 0341
- **Email**: royalcrestgeneralcontracting@outlook.com
- **Theme**: Light minimalist — off-white base, sage green accent (#899878), Geist font, rounded corners
