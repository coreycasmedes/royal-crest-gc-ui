import { useInView } from '../hooks/useInView';

const stats = [
  { num: '20+',  label: 'Years in Business'    },
  { num: '850+', label: 'Projects Completed'   },
  { num: '4.9★', label: 'Average Client Rating' },
  { num: '100%', label: 'Licensed & Insured'   },
];

export default function Stats() {
  const { ref, inView } = useInView();

  return (
    <section id="stats" className="relative overflow-hidden py-20 bg-gold">
      {/* Hatching texture */}
      <div className="absolute inset-0 pointer-events-none bg-hatch" />

      <div ref={ref} className="relative max-w-[1260px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map(({ num, label }, i) => (
            <div
              key={label}
              className={`reveal delay-${i + 1} ${inView ? 'visible' : ''}`}
            >
              <p className="font-heading font-black leading-none text-dark mb-1.5" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
                {num}
              </p>
              <p className="text-[0.74rem] font-bold tracking-[0.12em] uppercase" style={{ color: 'rgba(10,13,20,0.65)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
