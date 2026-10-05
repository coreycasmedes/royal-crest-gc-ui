import { useInView } from '../hooks/useInView';
import { LayoutGrid } from './ui/layout-grid';
import type { Card } from './ui/layout-grid';
import homeImg from '../assets/home.webp';
import roofBirdseyeImg from '../assets/roof_birdseye.webp';
import roofingTeamImg from '../assets/roofing_team.webp';

const cards: Card[] = [
  {
    id: 2,
    alt: "Aerial view of a completed roof, Lakewood Estate, Dallas",
    tag: "Roofing",
    title: "Lakewood Estate",
    meta: "2023 · Dallas, TX",
    className: "md:col-span-1",
    thumbnail: roofBirdseyeImg,
  },
  {
    id: 3,
    alt: "Front of a home with a new roof, Frisco Residence",
    tag: "Residential",
    title: "Frisco Residence",
    meta: "2024 · Frisco, TX",
    className: "md:col-span-1",
    thumbnail: homeImg,
  },
  {
    id: 4,
    alt: "Crew installing a roof, Prestonwood, Dallas",
    tag: "Roofing",
    title: "Prestonwood Installation",
    meta: "2024 · Dallas, TX",
    className: "md:col-span-2",
    thumbnail: roofingTeamImg,
  },
];

export default function Portfolio() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="portfolio" className="py-24 lg:py-28 bg-bg">

      <div className="max-w-[1260px] mx-auto px-8 lg:px-12 mb-12">
        <div ref={headRef} className={`reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Our Work</p>
          <h2
            className="font-heading font-bold leading-tight text-text"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
          >
            Recent Projects
          </h2>
        </div>
      </div>

      <div className="h-[1200px] md:h-[900px]">
        <LayoutGrid cards={cards} />
      </div>

    </section>
  );
}
