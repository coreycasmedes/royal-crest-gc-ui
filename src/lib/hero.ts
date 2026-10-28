import hero800 from '@/assets/hero-800.webp'
import hero1200 from '@/assets/hero-1200.webp'
import hero1500 from '@/assets/hero-1500.webp'

// The hero photo is the LCP element. Hero.astro renders it and index.astro
// preloads it, both from these values, so the preload always matches the
// image the browser picks and it is never downloaded twice. The three files
// are hand-encoded and served as they are.
export const HERO = {
  src: hero1200.src,
  srcset: [hero800, hero1200, hero1500].map((img) => `${img.src} ${img.width}w`).join(', '),
  sizes: '(min-width: 1280px) 1160px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 88px)',
  width: hero1500.width,
  height: hero1500.height,
}
