import { useInView } from '../hooks/useInView';
import { LayoutGrid } from './ui/layout-grid';
import homeImg from '../assets/home.webp';
import roofBirdseyeImg from '../assets/roof_birdseye.webp';
import roofingTeamImg from '../assets/roofing_team.webp';

function CardContent({ tag, title, meta }: { tag: string; title: string; meta: string }) {
  return (
    <div>
      <p className="text-[0.6rem] font-semibold tracking-[0.24em] uppercase mb-1.5 text-accent">
        {tag}
      </p>
      <h3 className="font-bold text-white text-2xl mb-1">{title}</h3>
      <p className="text-sm text-white/75">{meta}</p>
    </div>
  );
}

const cards = [
  {
    id: 2,
    alt: "Aerial view of a completed roof, Lakewood Estate, Dallas",
    content: <CardContent tag="Roofing" title="Lakewood Estate" meta="2023 · Dallas, TX" />,
    className: "md:col-span-1",
    thumbnail: roofBirdseyeImg,
  },
  {
    id: 3,
    alt: "Front of a home with a new roof, Frisco Residence",
    content: <CardContent tag="Residential" title="Frisco Residence" meta="2024 · Frisco, TX" />,
    className: "md:col-span-1",
    thumbnail: homeImg,
  },
  {
    id: 4,
    alt: "Crew installing a roof, Prestonwood, Dallas",
    content: <CardContent tag="Roofing" title="Prestonwood Installation" meta="2024 · Dallas, TX" />,
    className: "md:col-span-2",
    thumbnail: roofingTeamImg,
  },
];

export default function Portfolio() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="portfolio" className="py-24 lg:py-28 bg-bg">

      <div className="max-w-[1260px] mx-auto px-8 lg:px-12 mb-12">
        <div
          ref={headRef}
          className={`flex items-end justify-between gap-6 reveal ${headIn ? 'visible' : ''}`}
        >
          <div>
            <p className="label">Our Work</p>
            <h2
              className="font-heading font-bold leading-tight text-text"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              Recent Projects
            </h2>
          </div>
          <button
            className="hidden sm:block text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b border-text text-text hover:text-accent-ink hover:border-accent-ink transition-colors duration-200 flex-shrink-0"
          >
            View All →
          </button>
        </div>
      </div>

      <div className="h-[1200px] md:h-[900px]">
        <LayoutGrid cards={cards} />
      </div>

    </section>
  );
}
