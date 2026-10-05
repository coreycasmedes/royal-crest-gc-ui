import { useState, useEffect } from 'react';
import logo from '../assets/images/royal_crest_logo.svg';

const links = [
  { label: 'Services',  id: 'services'     },
  { label: 'Portfolio', id: 'portfolio'    },
  { label: 'About',     id: 'why'          },
  { label: 'Reviews',   id: 'testimonials' },
  { label: 'Contact',   id: 'contact'      },
];

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] border-b transition-all duration-300 ${
          scrolled
            ? 'bg-bg border-surface py-3 shadow-[0_1px_24px_rgba(0,0,0,0.07)]'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-[1260px] mx-auto px-6 lg:px-10 flex items-center">
          <a href="#hero" onClick={close} className="flex items-center flex-shrink-0">
            <img src={logo} alt="Royal Crest General Contractors" className="h-16 w-auto" />
          </a>

          <nav aria-label="Main" className="hidden md:flex items-center gap-8 ml-auto">
            {links.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-[0.82rem] font-medium text-text/70 hover:text-text transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-2xl hidden md:inline-flex ml-8 items-center px-5 py-2.5 text-[0.76rem] font-semibold tracking-[0.07em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
          >
            Get a Quote
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden ml-auto flex flex-col gap-[5px] p-2"
          >
            <span className={`block w-5 h-[1.5px] bg-text transition-all origin-center ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-text transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-text transition-all origin-center ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay — inert while closed so its links can't take focus */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        inert={!open}
        className={`md:hidden fixed inset-0 z-[60] bg-bg flex flex-col px-8 pt-24 pb-12 transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={close}
            className="font-heading text-[2.2rem] font-semibold text-left py-4 border-b border-surface text-text"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={close}
          className="rounded-2xl mt-10 w-full py-4 text-center text-[0.85rem] font-semibold tracking-widest uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
        >
          Get a Free Quote
        </a>
      </nav>
    </>
  );
}
