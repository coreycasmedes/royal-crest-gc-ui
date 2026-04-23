import { useState, useEffect } from 'react';

const Crown = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 text-gold" aria-hidden>
    <path d="M20 7 L27 20 L36 13 L32 30 H8 L4 13 L13 20 Z" fill="currentColor" />
    <rect x="9" y="31" width="22" height="3.5" rx="1" fill="currentColor" opacity="0.8" />
  </svg>
);

const links = [
  { label: 'Services',     id: 'services'      },
  { label: 'Portfolio',    id: 'portfolio'      },
  { label: 'Why Us',       id: 'why'            },
  { label: 'Reviews',      id: 'testimonials'   },
  { label: 'Contact',      id: 'contact'        },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const nav = (id: string) => { scrollTo(id); setOpen(false); };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'py-3 bg-dark/95 backdrop-blur-xl border-b border-gold-border shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'py-5'
        }`}
      >
        <div className="max-w-[1260px] mx-auto px-6 flex items-center gap-8">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <Crown />
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-[1.1rem] text-ink tracking-wide">
                Royal Crest GC
              </span>
              <span className="text-[0.58rem] tracking-[0.22em] uppercase text-gold">
                General Contractors
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 ml-auto">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[0.78rem] font-semibold tracking-[0.09em] uppercase text-muted hover:text-ink transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all hover:after:w-full pb-0.5"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:inline-flex ml-2 items-center gap-2 px-6 py-3 text-[0.8rem] font-bold tracking-[0.08em] uppercase rounded-sm bg-gold text-dark border border-gold hover:bg-gold-light hover:border-gold-light transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]"
          >
            Get a Quote
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden ml-auto flex flex-col gap-[5px] p-2"
          >
            <span className={`block w-6 h-0.5 bg-ink transition-all origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition-all origin-center ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-dark flex flex-col px-8 pt-28 pb-12 border-t border-gold-border transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => nav(id)}
            className="font-heading text-[2rem] font-semibold text-ink text-left py-4 border-b border-white/5 hover:text-gold transition-colors"
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => nav('contact')}
          className="mt-10 w-full py-4 text-[0.85rem] font-bold tracking-widest uppercase bg-gold text-dark rounded-sm hover:bg-gold-light transition-colors"
        >
          Get a Free Quote
        </button>
      </div>
    </>
  );
}
