import { useInView } from '../hooks/useInView';
import bigRoofImg from '../assets/big_roof.jpg';
import roofBirdseyeImg from '../assets/roof_birdseye.jpg';
import roofingTeamImg from '../assets/roofing_team.jpg';

const projects = [
  {
    img:      bigRoofImg,
    tag:      'Roofing & Exterior',
    title:    'Highland Park Residence',
    meta:     '2024 · Dallas, TX',
    featured: true,
  },
  {
    img:      roofBirdseyeImg,
    tag:      'Roofing',
    title:    'Lakewood Estate',
    meta:     '2023 · Dallas, TX',
    featured: false,
  },
  {
    img:      roofingTeamImg,
    tag:      'Roofing',
    title:    'Frisco Custom Build',
    meta:     '2024 · Frisco, TX',
    featured: false,
  },
];

export default function Portfolio() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.06);
  const [featured, ...rest] = projects;

  return (
    <section id="portfolio" className="py-24 lg:py-28" style={{ background: '#fafaf8' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div
          ref={headRef}
          className={`flex items-end justify-between gap-6 mb-12 reveal ${headIn ? 'visible' : ''}`}
        >
          <div>
            <p className="label">Our Work</p>
            <h2
              className="font-heading font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-ink)' }}
            >
              Recent Projects
            </h2>
          </div>
          <button
            className="hidden sm:block text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b transition-colors duration-200 flex-shrink-0"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
          >
            View All →
          </button>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3"
          style={{ minHeight: '600px' }}
        >
          {/* Featured — 2 cols × 2 rows */}
          <div
            className={`relative overflow-hidden cursor-pointer group lg:col-span-2 lg:row-span-2 reveal delay-1 ${gridIn ? 'visible' : ''}`}
            style={{ minHeight: '300px' }}
          >
            <img
              src={featured.img}
              alt={featured.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ position: 'absolute', inset: 0, filter: 'saturate(0.75)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.88) 0%, transparent 55%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <p
                className="text-[0.6rem] font-semibold tracking-[0.24em] uppercase mb-1.5"
                style={{ color: 'var(--color-gold)' }}
              >
                {featured.tag}
              </p>
              <h3 className="font-heading font-bold text-2xl text-white mb-1">{featured.title}</h3>
              <p className="text-[0.78rem]" style={{ color: 'rgba(255,255,255,0.45)' }}>{featured.meta}</p>
            </div>
          </div>

          {rest.map(({ img, tag, title, meta }, i) => (
            <div
              key={title}
              className={`relative overflow-hidden cursor-pointer group reveal delay-${i + 2} ${gridIn ? 'visible' : ''}`}
              style={{ minHeight: '200px' }}
            >
              <img
                src={img}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                style={{ position: 'absolute', inset: 0, filter: 'saturate(0.75)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.85) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <p
                  className="text-[0.56rem] font-semibold tracking-[0.22em] uppercase mb-1"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {tag}
                </p>
                <h3 className="font-heading font-bold text-lg text-white">{title}</h3>
                <p className="text-[0.72rem]" style={{ color: 'rgba(255,255,255,0.4)' }}>{meta}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
