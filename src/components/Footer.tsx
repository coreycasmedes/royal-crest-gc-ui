const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Crown = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 text-gold" aria-hidden>
    <path d="M20 7 L27 20 L36 13 L32 30 H8 L4 13 L13 20 Z" fill="currentColor" />
    <rect x="9" y="31" width="22" height="3.5" rx="1" fill="currentColor" opacity="0.8" />
  </svg>
);

const navLinks = [
  { label: 'Services',    id: 'services'    },
  { label: 'Portfolio',   id: 'portfolio'   },
  { label: 'Why Us',      id: 'why'         },
  { label: 'Reviews',     id: 'testimonials'},
  { label: 'Contact',     id: 'contact'     },
];

const serviceLinks = [
  'Custom Home Builds',
  'Kitchen Remodels',
  'Bathroom Renovations',
  'Home Additions',
  'Roofing & Exterior',
  'Commercial Construction',
];

const socials = ['fb', 'ig', 'in', 'yt'];

export default function Footer() {
  return (
    <footer style={{ background: '#060810', borderTop: '1px solid var(--color-gold-border)' }}>
      <div className="max-w-[1260px] mx-auto px-6 pt-20 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 mb-4">
              <Crown />
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-[1.05rem] text-ink">Royal Crest GC</span>
                <span className="text-[0.58rem] tracking-[0.22em] uppercase text-gold">General Contractors</span>
              </div>
            </button>
            <p className="text-[0.86rem] text-muted leading-[1.75] mb-6 max-w-[270px]">
              Dallas's premier general contractor delivering luxury residential and commercial construction since 2004.
            </p>
            <div className="flex gap-2.5">
              {socials.map(s => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gold text-[0.72rem] font-bold uppercase border transition-all hover:bg-gold hover:text-dark"
                  style={{ background: 'var(--color-gold-dim)', borderColor: 'var(--color-gold-border)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-ink mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-[0.84rem] text-muted hover:text-gold transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-ink mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map(s => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="text-[0.84rem] text-muted hover:text-gold transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-ink mb-4">Contact</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { dot: '◆', text: '(214) 555-0187' },
                { dot: '◆', text: 'info@royalcrestgc.com' },
                { dot: '◆', text: '1845 Oak Lawn Ave\nDallas, TX 75219' },
                { dot: '◆', text: 'Mon–Fri: 7 AM – 6 PM' },
              ].map(({ dot, text }) => (
                <li key={text} className="flex gap-2 text-[0.84rem] text-muted leading-relaxed">
                  <span className="text-gold text-[0.5rem] mt-1.5 flex-shrink-0">{dot}</span>
                  <span className="whitespace-pre-line">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <p className="text-[0.78rem]" style={{ color: 'var(--color-faint)' }}>
            © {new Date().getFullYear()} Royal Crest General Contractors LLC. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
              <button key={l} className="text-[0.76rem] transition-colors hover:text-gold" style={{ color: 'var(--color-faint)' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
