import { useInView } from '../hooks/useInView';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const services = [
  { num: '01', title: 'Custom Home Builds',     desc: 'Ground-up construction built to your exact vision.' },
  { num: '02', title: 'Kitchen Remodels',        desc: 'Custom cabinetry, stone surfaces, premium fixtures.' },
  { num: '03', title: 'Bathroom Renovations',    desc: "Spa-grade tilework, frameless glass, luxury finishes." },
  { num: '04', title: 'Home Additions',           desc: "Seamless expansions that match your home's character." },
  { num: '05', title: 'Roofing & Exterior',      desc: 'Premium protection built for Texas weather.' },
  { num: '06', title: 'Commercial Construction', desc: 'Professional spaces designed to impress and perform.' },
];

export default function Services() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.06);

  return (
    <section id="services" className="py-24 lg:py-28" style={{ background: '#f2ece3' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div
          ref={headRef}
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 reveal ${headIn ? 'visible' : ''}`}
        >
          <div>
            <p className="label">What We Build</p>
            <h2
              className="font-heading font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-ink)' }}
            >
              Our Services
            </h2>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="self-start sm:self-auto text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b transition-colors duration-200"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
          >
            Request a Service →
          </button>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(26,23,20,0.09)' }}
        >
          {services.map(({ num, title, desc }, i) => (
            <div
              key={title}
              className={`p-9 lg:p-11 transition-colors duration-300 reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              style={{ background: '#f2ece3' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fafaf8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#f2ece3')}
            >
              <p className="text-[0.6rem] font-bold tracking-[0.24em] uppercase mb-5" style={{ color: 'var(--color-faint)' }}>
                {num}
              </p>
              <h3 className="font-heading font-bold text-[1.2rem] mb-2" style={{ color: 'var(--color-ink)' }}>
                {title}
              </h3>
              <p className="text-[0.87rem] leading-[1.7]" style={{ color: 'var(--color-muted)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
