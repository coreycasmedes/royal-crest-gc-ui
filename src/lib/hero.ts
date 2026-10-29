import hero800 from '@/assets/hero-800.webp'
import hero1200 from '@/assets/hero-1200.webp'
import hero1500 from '@/assets/hero-1500.webp'

// Hero.astro and index.astro's preload both read this, so the LCP photo is never downloaded twice.
export const HERO = {
  src: hero1200.src,
  srcset: [hero800, hero1200, hero1500].map((img) => `${img.src} ${img.width}w`).join(', '),
  sizes: '(min-width: 1280px) 1160px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 88px)',
  width: hero1500.width,
  height: hero1500.height,
}
