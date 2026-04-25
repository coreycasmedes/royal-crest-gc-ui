import { useState, useEffect } from 'react';
import logo from '../assets/images/royal_crest_logo.svg';

const links = [
  { label: 'Services',  id: 'services'     },
  { label: 'Portfolio', id: 'portfolio'    },
  { label: 'About',     id: 'why'          },
  { label: 'Reviews',   id: 'testimonials' },
  { label: 'Contact',   id: 'contact'      },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        className={`fixed top-0 left-0 right-0 z-[70] bg-white transition-all duration-300 ${
          scrolled ? 'py-3 shadow-[0_1px_24px_rgba(0,0,0,0.07)]' : 'py-5'
        }`}
        style={{ borderBottom: '1px solid rgba(26,23,20,0.07)' }}
      >
        <div className="max-w-[1260px] mx-auto px-6 lg:px-10 flex items-center">
          <button onClick={() => scrollTo('hero')} className="flex items-center flex-shrink-0">
            <img src={logo} alt="Royal Crest General Contractors" className="h-16 w-auto" />
          </button>

          <nav className="hidden md:flex items-center gap-8 ml-auto">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[0.82rem] font-medium transition-colors"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo('contact')}
            className="rounded-2xl hidden md:inline-flex ml-8 items-center px-5 py-2.5 text-[0.76rem] font-semibold tracking-[0.07em] uppercase transition-all duration-200"
            style={{ background: 'var(--color-ink)', color: '#fafaf8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-ink)'; }}
          >
            Get a Quote
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden ml-auto flex flex-col gap-[5px] p-2"
          >
            <span className={`block w-5 h-[1.5px] bg-ink transition-all origin-center ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} style={{ background: 'var(--color-ink)' }} />
            <span className={`block w-5 h-[1.5px] transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} style={{ background: 'var(--color-ink)' }} />
            <span className={`block w-5 h-[1.5px] transition-all origin-center ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} style={{ background: 'var(--color-ink)' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white flex flex-col px-8 pt-24 pb-12 transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => nav(id)}
            className="font-heading text-[2.2rem] font-semibold text-left py-4 border-b"
            style={{ color: 'var(--color-ink)', borderColor: 'rgba(26,23,20,0.08)' }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => nav('contact')}
          className="rounded-2xl mt-10 w-full py-4 text-[0.85rem] font-semibold tracking-widest uppercase"
          style={{ background: 'var(--color-ink)', color: '#fafaf8' }}
        >
          Get a Free Quote
        </button>
      </div>
    </>
  );
}
