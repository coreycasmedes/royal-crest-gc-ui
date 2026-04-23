import { useInView } from '../hooks/useInView';

const stats = [
  { num: '20+',  label: 'Years Experience'       },
  { num: '850+', label: 'Projects Completed'      },
  { num: '4.9★', label: 'Average Client Rating'  },
  { num: '5yr',  label: 'Workmanship Warranty'   },
];

export default function Stats() {
  const { ref, inView } = useInView();

  return (
    <section
      id="stats"
      className="py-20 border-y"
      style={{ background: '#fafaf8', borderColor: 'rgba(26,23,20,0.08)' }}
    >
      <div ref={ref} className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map(({ num, label }, i) => (
            <div
              key={label}
              className={`text-center py-4 lg:border-r last:border-r-0 reveal delay-${i + 1} ${inView ? 'visible' : ''}`}
              style={{ borderColor: 'rgba(26,23,20,0.08)' }}
            >
              <p
                className="font-heading font-black leading-none mb-2"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', color: 'var(--color-ink)' }}
              >
                {num}
              </p>
              <p
                className="text-[0.7rem] font-medium tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-muted)' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
