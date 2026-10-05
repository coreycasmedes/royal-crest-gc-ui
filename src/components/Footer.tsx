import logo from '../assets/images/royal_crest_logo.svg';

const nav = [
  { label: 'Services',  id: 'services'     },
  { label: 'Portfolio', id: 'portfolio'    },
  { label: 'About',     id: 'why'          },
  { label: 'Reviews',   id: 'testimonials' },
  { label: 'Contact',   id: 'contact'      },
];

const svcList = [
  'Kitchen Remodels',
  'Bathroom Renovations',
  'Home Additions',
  'Roofing & Exterior',
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-surface">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12 pt-16 pb-8">

        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-14">

          {/* Brand */}
          <div className="max-w-[240px]">
            <a href="#hero" className="flex items-center mb-4">
              <img src={logo} alt="Royal Crest General Contractors" className="h-16 w-auto" />
            </a>
            <p className="text-[0.84rem] leading-[1.75] mb-3 text-text/70">
              Dallas's premier general contractor.
            </p>
            <a
              href="tel:+14694320341"
              className="text-[0.76rem] font-medium text-text/65 hover:text-accent-ink transition-colors"
            >
              (469) 432 0341
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 lg:gap-16">
            <div className="flex flex-col gap-2.5">
              <p className="text-[0.66rem] font-bold tracking-[0.22em] uppercase mb-1 text-text">
                Navigate
              </p>
              {nav.map(({ label, id }) => (
                <a key={id} href={`#${id}`}
                  className="text-left text-[0.84rem] text-text/70 hover:text-text transition-colors">
                  {label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-[0.66rem] font-bold tracking-[0.22em] uppercase mb-1 text-text">
                Services
              </p>
              {svcList.map(s => (
                <a key={s} href="#services"
                  className="text-left text-[0.84rem] text-text/70 hover:text-text transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <p className="text-[0.66rem] font-bold tracking-[0.22em] uppercase mb-4 text-text">
              Ready to Build?
            </p>
            <a
              href="#contact"
              className="inline-block rounded-2xl px-6 py-3 text-[0.75rem] font-semibold tracking-[0.1em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
            >
              Get a Free Quote
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-surface">
          <p className="text-[0.74rem] text-text/65">
            © {new Date().getFullYear()} Royal Crest General Contractors LLC
          </p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Accessibility'].map(l => (
              <button key={l} className="text-[0.72rem] text-text/65 hover:text-text transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
