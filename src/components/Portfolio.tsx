import { useInView } from '../hooks/useInView';

const projects = [
  {
    seed:  'house-luxury-1',
    tag:   'Custom Residential',
    title: 'The Ashwood Estate',
    meta:  '5,800 sqft · Dallas, TX · 2023',
  },
  {
    seed:  'modern-office-2',
    tag:   'Commercial Build',
    title: 'Pinnacle Office Center',
    meta:  '18,000 sqft · Plano, TX · 2023',
  },
  {
    seed:  'kitchen-interior-3',
    tag:   'Kitchen Remodel',
    title: 'The Harrington Kitchen',
    meta:  'Award-Winning · Frisco, TX · 2024',
  },
];

export default function Portfolio() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <section id="portfolio" className="py-24 lg:py-28" style={{ background: 'var(--color-dark-2)' }}>
      <div className="max-w-[1260px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div ref={headRef} className={`reveal ${headIn ? 'visible' : ''}`}>
            <p className="label">Our Work</p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight">
              Recent Projects
            </h2>
            <p className="mt-3 text-muted max-w-md leading-relaxed">
              A curated selection of builds that showcase our commitment to quality and craftsmanship.
            </p>
          </div>
          <button className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 text-[0.8rem] font-bold tracking-[0.08em] uppercase rounded-sm bg-transparent text-ink border border-gold-border hover:border-gold hover:text-gold transition-all hover:-translate-y-0.5 flex-shrink-0">
            View All Projects
          </button>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(({ seed, tag, title, meta }, i) => (
            <div
              key={title}
              className={`relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              style={{ background: 'var(--color-card)' }}
            >
              {/* Image */}
              <img
                src={`https://picsum.photos/seed/${seed}/800/600`}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 brightness-75 saturate-50 group-hover:scale-[1.09] group-hover:brightness-50 group-hover:saturate-50"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,13,20,0.96) 25%, rgba(10,13,20,0.15) 75%)' }} />

              {/* Text */}
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-gold mb-1.5">{tag}</p>
                <h3 className="font-heading font-bold text-xl text-white mb-1.5">{title}</h3>
                <p className="text-[0.8rem] text-white/50 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  {meta}
                </p>
              </div>

              {/* Arrow badge */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gold flex items-center justify-center text-dark font-bold text-sm opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
