import { useInView } from '../hooks/useInView';

const reviews = [
  {
    initials: 'RC',
    name:    'Robert & Lisa Chen',
    project: 'Custom Home Build · Highland Park',
    text:    'Royal Crest built our forever home and we couldnt be more thrilled. From the initial design phase through final walkthrough, every detail was handled with professionalism and care. The craftmanship is simply stunning.',
  },
  {
    initials: 'MW',
    name:    'Marcus Williams',
    project: 'Commercial Office · Plano, TX',
    text:    'As a business owner, I needed a contractor who understood deadlines. Royal Crest delivered our 12,000 sqft office two weeks early and under budget. My team loves the space. I\'ll never use anyone else.',
  },
  {
    initials: 'AT',
    name:    'Amanda Thornton',
    project: 'Kitchen Renovation · Frisco, TX',
    text:    'Our kitchen renovation completely transformed how we live in our home. The team was thoughtful, clean, and communicative every step of the way. The quartz counters and custom cabinetry are absolutely gorgeous.',
  },
];

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <section id="testimonials" className="py-24 lg:py-28" style={{ background: 'var(--color-dark)' }}>
      <div className="max-w-[1260px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className={`mb-14 reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Client Reviews</p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-muted max-w-md leading-relaxed">
            Real words from homeowners and business owners we've had the privilege of building for.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map(({ initials, name, project, text }, i) => (
            <div
              key={name}
              className={`relative rounded-xl p-9 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              style={{
                background: 'var(--color-card)',
                borderColor: 'var(--color-gold-border)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
            >
              {/* Big decorative quote */}
              <span
                className="absolute top-3 left-7 font-heading text-[5rem] leading-none select-none pointer-events-none"
                style={{ color: 'rgba(201,168,76,0.15)' }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-4 text-gold text-sm">
                {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
              </div>

              {/* Review text */}
              <p className="text-[0.92rem] text-muted leading-[1.78] italic mb-6">"{text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-gold text-[0.95rem] flex-shrink-0 border-2 border-gold"
                  style={{ background: 'var(--color-gold-dim)' }}
                >
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-[0.88rem] text-ink">{name}</p>
                  <p className="text-[0.73rem] text-faint mt-0.5">{project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
