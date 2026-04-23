import gaf from '../assets/images/gaf.avif';
import brava from '../assets/images/brava.avif';
import certainteed from '../assets/images/certainteed.avif';
import abc from '../assets/images/abc.avif';

const badges = [
  { src: gaf,         alt: 'GAF American Owned'          },
  { src: brava,       alt: 'Brava Authorized Contractor'  },
  { src: certainteed, alt: 'CertainTeed Saint-Gobain'     },
  { src: abc,         alt: 'ABC Supply Co.'               },
];

export default function Badges() {
  return (
    <section
      className="py-14 border-y"
      style={{ borderColor: 'rgba(26,23,20,0.08)', background: '#fafaf8' }}
    >
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <p
          className="text-center text-[0.66rem] font-semibold tracking-[0.26em] uppercase mb-10"
          style={{ color: 'var(--color-faint)' }}
        >
          Partners &amp; Certifications
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {badges.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-14 w-auto object-contain transition-all duration-300"
              style={{ filter: 'grayscale(1) opacity(0.55)' }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0) opacity(1)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1) opacity(0.55)')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
