import { useState, useEffect } from 'react';
import { IconPhone } from '@tabler/icons-react';
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
        // Solid while the mobile menu is open too: on short phones the menu
        // scrolls, and its links must pass behind the header, not through it.
        className={`fixed top-0 left-0 right-0 z-[70] border-b transition-all duration-300 ${
          scrolled ? 'py-3 shadow-[0_1px_24px_rgba(0,0,0,0.07)]' : 'py-5'
        } ${
          scrolled || open
            ? 'bg-bg border-surface'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[1260px] mx-auto px-6 lg:px-10 flex items-center">
          <a href="#hero" onClick={close} className="flex items-center flex-shrink-0">
            <img src={logo} alt="Royal Crest General Contractors" className="h-16 w-auto" />
          </a>

          <nav aria-label="Main" className="hidden md:flex items-center gap-5 lg:gap-8 ml-auto">
            {links.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                // Between md and lg there isn't room for every link plus the
                // phone number; "Contact" goes first because the "Get a Quote"
                // button beside it leads to the same section.
                className={`text-[0.82rem] font-medium text-text/70 hover:text-text transition-colors ${
                  id === 'contact' ? 'hidden lg:inline' : ''
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+14694320341"
            aria-label="Call (469) 432 0341"
            className="hidden md:inline-flex ml-5 lg:ml-8 items-center gap-1.5 whitespace-nowrap text-[0.82rem] font-semibold tabular-nums text-text hover:text-accent-ink transition-colors"
          >
            <IconPhone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-accent" />
            (469) 432 0341
          </a>

          <a
            href="#contact"
            className="rounded-2xl hidden md:inline-flex ml-4 lg:ml-6 items-center whitespace-nowrap px-5 py-2.5 text-[0.76rem] font-semibold tracking-[0.07em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
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
        className={`md:hidden fixed inset-0 z-[60] bg-bg flex flex-col overflow-y-auto px-8 pt-24 pb-12 transition-all duration-300 ${
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
        <a
          href="tel:+14694320341"
          onClick={close}
          aria-label="Call (469) 432 0341"
          className="rounded-2xl mt-3 w-full py-4 flex flex-shrink-0 items-center justify-center gap-2 border border-text/20 text-[0.95rem] font-semibold tabular-nums text-text hover:border-text transition-colors duration-200"
        >
          <IconPhone aria-hidden="true" className="h-[1.125rem] w-[1.125rem] flex-shrink-0 text-accent" />
          (469) 432 0341
        </a>
      </nav>
    </>
  );
}
