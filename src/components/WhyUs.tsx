import { useInView } from '../hooks/useInView';

const pillars = [
  { num: '01', title: 'Family-Owned',       desc: 'Personal accountability from the owner on every single job.' },
  { num: '02', title: 'Premium Materials',  desc: 'Top-tier suppliers only. No substitutions, ever.'            },
  { num: '03', title: 'On-Time, On-Budget', desc: 'Transparent timelines and costs — no surprises.'            },
  { num: '04', title: 'Full-Service',       desc: 'Design, permits, subs, inspections — all handled for you.'  },
];

export default function WhyUs() {
  const { ref: leftRef, inView: leftIn } = useInView();
  const { ref: rightRef, inView: rightIn } = useInView(0.06);

  return (
    <section id="why" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left */}
          <div ref={leftRef} className={`reveal ${leftIn ? 'visible' : ''}`}>
            <p className="label">Why Choose Us</p>
            <h2
              className="font-heading font-bold leading-tight mb-5 text-text"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              The Standard<br />Others<br />Aspire To
            </h2>
            <p className="text-[0.9rem] leading-[1.78] text-text/60">
              Twenty years of craft, honesty, and delivering on our word — across Dallas and beyond.
            </p>
          </div>

          {/* Right — 4 pillars */}
          <div
            ref={rightRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface"
          >
            {pillars.map(({ num, title, desc }, i) => (
              <div
                key={title}
                className={`p-9 lg:p-10 bg-bg reveal delay-${i + 1} ${rightIn ? 'visible' : ''}`}
              >
                <p className="text-[0.6rem] font-bold tracking-[0.24em] uppercase mb-4 text-text/40">
                  {num}
                </p>
                <h4 className="font-heading font-bold text-[1.15rem] mb-2 text-text">
                  {title}
                </h4>
                <p className="text-[0.87rem] leading-[1.7] text-text/60">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
