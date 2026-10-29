import { useState, useEffect, useRef } from 'react';
import { IconPhone } from '@tabler/icons-react';
import logo from '@/assets/images/royal_crest_logo.svg';
import { LAYER } from '@/lib/layers';
import { BUSINESS, callLabel, telHref } from '@/lib/business';
import { section } from '@/lib/links';

const links = [
  { label: 'Services',  id: 'services'     },
  { label: 'Portfolio', id: 'portfolio'    },
  { label: 'About',     id: 'about'        },
  { label: 'Reviews',   id: 'testimonials' },
  { label: 'Contact',   id: 'contact'      },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollMarkerRef = useRef<HTMLDivElement>(null);

  // Observes a 40px marker instead of listening to scroll, so nothing runs per scroll frame.
  useEffect(() => {
    const marker = scrollMarkerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(marker);
    return () => observer.disconnect();
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
      <div
        ref={scrollMarkerRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-10 w-px"
      />
      <header
        // Solid while the menu is open: on short phones its links scroll behind the header.
        className={`fixed top-0 left-0 right-0 ${LAYER.header} border-b transition-all duration-300 ${
          scrolled ? 'py-3 shadow-[0_1px_24px_rgba(0,0,0,0.07)]' : 'py-5'
        } ${
          scrolled || open
            ? 'bg-bg border-surface'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[1260px] mx-auto px-6 lg:px-10 flex items-center">
          <a href={section('hero')} onClick={close} className="flex items-center flex-shrink-0">
            <img src={logo.src} alt={BUSINESS.name} width={logo.width} height={logo.height} className="h-16 w-auto" />
          </a>

          <nav aria-label="Main" className="hidden md:flex items-center gap-5 lg:gap-8 ml-auto">
            {links.map(({ label, id }) => (
              <a
                key={id}
                href={section(id)}
                // No room for every link below lg; "Get a Quote" already leads to Contact.
                className={`text-[0.82rem] font-medium text-text/70 hover:text-text transition-colors ${
                  id === 'contact' ? 'hidden lg:inline' : ''
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={telHref}
            aria-label={callLabel}
            className="hidden md:inline-flex ml-5 lg:ml-8 items-center gap-1.5 whitespace-nowrap text-[0.82rem] font-semibold tabular-nums text-text hover:text-accent-ink transition-colors"
          >
            <IconPhone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-accent" />
            {BUSINESS.phone.display}
          </a>

          <a
            href={section('contact')}
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

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        inert={!open}
        className={`md:hidden fixed inset-0 ${LAYER.mobileMenu} bg-bg flex flex-col overflow-y-auto px-8 pt-24 pb-12 transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map(({ label, id }) => (
          <a
            key={id}
            href={section(id)}
            onClick={close}
            className="font-heading text-[2.2rem] font-semibold text-left py-4 border-b border-surface text-text"
          >
            {label}
          </a>
        ))}
        <a
          href={section('contact')}
          onClick={close}
          className="rounded-2xl mt-10 w-full py-4 text-center text-[0.85rem] font-semibold tracking-widest uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
        >
          Get a Quote
        </a>
        <a
          href={telHref}
          onClick={close}
          aria-label={callLabel}
          className="rounded-2xl mt-3 w-full py-4 flex flex-shrink-0 items-center justify-center gap-2 border border-text/20 text-[0.95rem] font-semibold tabular-nums text-text hover:border-text transition-colors duration-200"
        >
          <IconPhone aria-hidden="true" className="h-[1.125rem] w-[1.125rem] flex-shrink-0 text-accent" />
          {BUSINESS.phone.display}
        </a>
      </nav>
    </>
  );
}
