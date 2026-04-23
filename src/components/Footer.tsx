const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Crown = () => (
  <svg viewBox="0 0 40 40" fill="none" style={{ width: '1.4rem', height: '1.4rem', color: 'var(--color-gold)' }} aria-hidden>
    <path d="M20 7 L27 20 L36 13 L32 30 H8 L4 13 L13 20 Z" fill="currentColor" />
    <rect x="9" y="31" width="22" height="3.5" rx="1" fill="currentColor" opacity="0.8" />
  </svg>
);

const nav = [
  { label: 'Services',  id: 'services'     },
  { label: 'Portfolio', id: 'portfolio'    },
  { label: 'About',     id: 'why'          },
  { label: 'Reviews',   id: 'testimonials' },
  { label: 'Contact',   id: 'contact'      },
];

const svcList = [
  'Custom Home Builds',
  'Kitchen Remodels',
  'Bathroom Renovations',
  'Home Additions',
  'Roofing & Exterior',
];

export default function Footer() {
  return (
    <footer style={{ background: '#f2ece3', borderTop: '1px solid rgba(26,23,20,0.09)' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12 pt-16 pb-8">

        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-14">

          {/* Brand */}
          <div className="max-w-[240px]">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 mb-4">
              <Crown />
              <span className="font-heading font-bold text-[0.95rem]" style={{ color: 'var(--color-ink)' }}>
                Royal Crest GC
              </span>
            </button>
            <p className="text-[0.84rem] leading-[1.75] mb-3" style={{ color: 'var(--color-muted)' }}>
              Dallas's premier general contractor since 2004.
            </p>
            <p className="text-[0.76rem] font-medium" style={{ color: 'var(--color-faint)' }}>
              (214) 555-0187
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 lg:gap-16">
            <div className="flex flex-col gap-2.5">
              <p className="text-[0.66rem] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: 'var(--color-ink)' }}>
                Navigate
              </p>
              {nav.map(({ label, id }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="text-left text-[0.84rem] transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}>
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-[0.66rem] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: 'var(--color-ink)' }}>
                Services
              </p>
              {svcList.map(s => (
                <button key={s} onClick={() => scrollTo('services')}
                  className="text-left text-[0.84rem] transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <p className="text-[0.66rem] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: 'var(--color-ink)' }}>
              Ready to Build?
            </p>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 text-[0.75rem] font-semibold tracking-[0.1em] uppercase transition-all duration-200"
              style={{ background: 'var(--color-ink)', color: '#fafaf8' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-ink)'; }}
            >
              Get a Free Quote
            </button>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t"
          style={{ borderColor: 'rgba(26,23,20,0.08)' }}
        >
          <p className="text-[0.74rem]" style={{ color: 'var(--color-faint)' }}>
            © {new Date().getFullYear()} Royal Crest General Contractors LLC
          </p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Accessibility'].map(l => (
              <button key={l} className="text-[0.72rem] transition-colors"
                style={{ color: 'var(--color-faint)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-faint)')}>
                {l}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
