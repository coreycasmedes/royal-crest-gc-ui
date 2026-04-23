import { useInView } from '../hooks/useInView';

const reasons = [
  {
    title: 'Family-Owned & Operated',
    desc:  'We treat every project like it\'s our own home. Personal accountability from the owner — always.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Premium Materials Only',
    desc:  'We source from top-tier suppliers. No shortcuts — ever. Your project is built to last generations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'On-Time, On-Budget',
    desc:  'We honor our commitments. Our project management process keeps timelines and costs transparent.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Full-Service Management',
    desc:  'Design, permitting, subcontractors, inspections — we handle everything so you don\'t have to.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

const features = [
  { num: '20+',  label: 'Years of proven\nDallas craftsmanship' },
  { num: '850+', label: 'Completed projects\ndelivered on time' },
  { num: '$0',   label: 'Hidden fees —\never' },
  { num: '5yr',  label: 'Workmanship\nwarranty included' },
];

export default function WhyUs() {
  const { ref: leftRef,  inView: leftIn  } = useInView();
  const { ref: rightRef, inView: rightIn } = useInView();

  return (
    <section id="why" className="py-24 lg:py-28" style={{ background: 'var(--color-dark-2)' }}>
      <div className="max-w-[1260px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left */}
          <div ref={leftRef}>
            <div className={`reveal ${leftIn ? 'visible' : ''}`}>
              <p className="label">Why Royal Crest</p>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight">
                The Standard Others<br />Aspire To
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                In a crowded field, Royal Crest stands apart through relentless attention to craft,
                transparent communication, and an unwavering commitment to doing things right.
              </p>
            </div>

            <div className="flex flex-col gap-7 mt-11">
              {reasons.map(({ title, desc, icon }, i) => (
                <div
                  key={title}
                  className={`flex gap-4 items-start reveal delay-${i + 1} ${leftIn ? 'visible' : ''}`}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-sm flex-shrink-0 text-gold border"
                    style={{ background: 'var(--color-gold-dim)', borderColor: 'var(--color-gold-border)' }}
                  >
                    <div className="w-5 h-5">{icon}</div>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[1.05rem] text-ink mb-1">{title}</h4>
                    <p className="text-[0.87rem] text-muted leading-[1.7]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — feature tiles */}
          <div ref={rightRef} className="grid grid-cols-2 gap-4">
            {features.map(({ num, label }, i) => (
              <div
                key={num}
                className={`rounded-xl p-7 border transition-all duration-300 hover:-translate-y-1 reveal delay-${i + 1} ${rightIn ? 'visible' : ''}`}
                style={{
                  background: 'var(--color-card)',
                  borderColor: 'var(--color-gold-border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
              >
                <p className="font-heading font-black text-gold leading-none mb-2" style={{ fontSize: '2.4rem' }}>{num}</p>
                <p className="text-[0.8rem] text-muted leading-snug whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
