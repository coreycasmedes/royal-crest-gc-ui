import { useInView } from '../hooks/useInView';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const services = [
  {
    title: 'Custom Home Builds',
    desc: 'We bring your dream home to life with meticulous attention to detail, premium materials, and craftsmen who take pride in every finish.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Kitchen Remodels',
    desc: 'Transform your kitchen into a chefs paradise with custom cabinetry, stone countertops, premium fixtures, and expert tile work.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Bathroom Renovations',
    desc: 'Create your personal spa with luxury tilework, custom vanities, frameless glass, and premium plumbing fixtures.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6 C9 3.79 10.79 2 13 2 C15.21 2 17 3.79 17 6 L17 12" />
        <path d="M3 12 L21 12 L21 14 C21 17.31 18.31 20 15 20 L9 20 C5.69 20 3 17.31 3 14 Z" />
        <line x1="11" y1="20" x2="11" y2="22" />
        <line x1="13" y1="20" x2="13" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Home Additions',
    desc: 'Expand your living space seamlessly with additions that perfectly match your homes character — from new bedrooms to sunrooms.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Roofing & Exterior',
    desc: 'Protect your investment with premium roofing, siding, and exterior craftsmanship built to withstand Texas weather for decades.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Commercial Construction',
    desc: 'Professional commercial spaces designed and built to maximize function, impress clients, and meet every code requirement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 22V9l11-7 11 7v13" />
        <path d="M9 22V12h6v10" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
];

export default function Services() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  const delays = ['delay-1','delay-2','delay-3','delay-4','delay-5','delay-6'];

  return (
    <section id="services" className="py-24 lg:py-28" style={{ background: 'var(--color-dark)' }}>
      <div className="max-w-[1260px] mx-auto px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div ref={headRef} className={`reveal ${headIn ? 'visible' : ''}`}>
            <p className="label">What We Build</p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight">
              Our Core Services
            </h2>
            <p className="mt-3 text-muted max-w-md leading-relaxed">
              End-to-end construction and remodeling services backed by two decades of Dallas craftsmanship.
            </p>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 text-[0.8rem] font-bold tracking-[0.08em] uppercase rounded-sm bg-transparent text-ink border border-gold-border hover:border-gold hover:text-gold transition-all hover:-translate-y-0.5 flex-shrink-0"
          >
            Request a Service
          </button>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'var(--color-gold-border)', border: '1px solid var(--color-gold-border)' }}
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className={`relative overflow-hidden p-10 lg:p-11 group reveal ${delays[i]} ${gridIn ? 'visible' : ''}`}
              style={{ background: 'var(--color-card)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-card-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-card)')}
            >
              {/* Gold top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              {/* Ghost number */}
              <span className="absolute top-4 right-5 font-heading font-bold text-[4.5rem] leading-none select-none pointer-events-none" style={{ color: 'rgba(201,168,76,0.055)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 text-gold mb-6">{svc.icon}</div>

              {/* Text */}
              <h3 className="font-heading font-bold text-xl text-ink mb-3">{svc.title}</h3>
              <p className="text-[0.88rem] text-muted leading-[1.75] mb-6">{svc.desc}</p>

              {/* CTA */}
              <span className="inline-flex items-center gap-1.5 text-[0.74rem] font-bold tracking-[0.1em] uppercase text-gold group-hover:gap-2.5 transition-all">
                Learn More →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
