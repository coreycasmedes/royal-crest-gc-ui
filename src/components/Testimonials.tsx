import { useInView } from '../hooks/useInView';

const reviews = [
  {
    text:    'We were thoroughly impressed with the professionalism and attention to detail exhibited by Royal Crest General Contracting. Their work truly speaks for itself.',
    name:    'Ryan Jeffrey',
    project: 'Custom Home · Highland Park',
  },
  {
    text:    "Royal Crest General Contracting transformed our vision into reality with their impeccable workmanship and dedication. Highly recommended!",
    name:    'Nima Mojahed',
    project: 'Commercial Office · Frisco',
  },
  {
    text:    'From start to finish, the team at Royal Crest General Contracting demonstrated reliability, skill, and a genuine passion for their craft. They exceeded our expectations in every way',
    name:    'Christopher Strenger',
    project: 'Kitchen Renovation · Plano',
  },
];

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <section id="testimonials" className="py-24 lg:py-28" style={{ background: '#fafaf8' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div ref={headRef} className={`mb-14 reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Client Reviews</p>
          <h2
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-ink)' }}
          >
            What Clients Say
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'rgba(26,23,20,0.09)' }}
        >
          {reviews.map(({ text, name, project }, i) => (
            <div
              key={name}
              className={`p-9 lg:p-10 reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              style={{ background: '#fafaf8' }}
            >
              <div className="flex gap-0.5 mb-6" style={{ color: 'var(--color-gold)' }}>
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j} className="text-sm">{s}</span>
                ))}
              </div>

              <p
                className="text-[0.93rem] leading-[1.82] italic mb-8"
                style={{ color: 'var(--color-muted)' }}
              >
                "{text}"
              </p>

              <div
                className="pt-5 border-t"
                style={{ borderColor: 'rgba(26,23,20,0.08)' }}
              >
                <p className="font-semibold text-[0.88rem]" style={{ color: 'var(--color-ink)' }}>{name}</p>
                <p className="text-[0.74rem] mt-0.5" style={{ color: 'var(--color-faint)' }}>{project}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
