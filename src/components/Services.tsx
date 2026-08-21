import {
  IconHome2,
  IconHomeCog,
  IconHammer,
  IconFence,
} from '@tabler/icons-react';
import { useInView } from '../hooks/useInView';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import backyardDeckImg from '../assets/backyard_deck1.webp';
import gutterImg from '../assets/IMG_4673.webp';
import exteriorWorkImg from '../assets/IMG_3919_edited.webp';
import bigRoofImg from '../assets/big_roof.webp';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      style={{ filter: 'saturate(0.9) brightness(1.02)' }}
    />
  </div>
);

const items = [
  {
    title: 'Exterior',
    description: 'Painting, stucco, and exterior finish work that lasts.',
    icon: <IconHome2 className="h-5 w-5 text-accent" />,
    className: 'md:col-span-1',
    header: <ImageHeader src={exteriorWorkImg} alt="Exterior finish work by Royal Crest General Contractors" />,
  },
  {
    title: 'Home Improvement',
    description: 'Upgrades and repairs that raise the value of your home.',
    icon: <IconHomeCog className="h-5 w-5 text-accent" />,
    className: 'md:col-span-1',
    header: <ImageHeader src={gutterImg} alt="Copper gutter installation by Royal Crest General Contractors" />,
  },
  {
    title: 'Roofing',
    description: 'Premium protection built for Texas weather.',
    icon: <IconHammer className="h-5 w-5 text-accent" />,
    className: 'md:col-span-1',
    header: <ImageHeader src={bigRoofImg} alt="Aerial view of a roofing project by Royal Crest General Contractors" />,
  },
  {
    title: 'Decks & Outdoor Living',
    description: 'Custom decks, patios, and outdoor spaces built for how Texans actually live.',
    icon: <IconFence className="h-5 w-5 text-accent" />,
    className: 'md:col-span-2',
    header: (
      <ImageHeader
        src={backyardDeckImg}
        alt="Custom backyard deck built by Royal Crest General Contractors"
      />
    ),
  },
];

export default function Services() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.06);

  return (
    <section id="services" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div
          ref={headRef}
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 reveal ${headIn ? 'visible' : ''}`}
        >
          <div>
            <p className="label">What We Build</p>
            <h2
              className="font-heading font-bold leading-tight text-text"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              Our Services
            </h2>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="self-start sm:self-auto text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b border-text text-text hover:text-accent hover:border-accent transition-colors duration-200"
          >
            Request a Service →
          </button>
        </div>

        <div ref={gridRef}>
          <BentoGrid>
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={<span className="text-text">{item.title}</span>}
                description={<span className="text-text/60">{item.description}</span>}
                header={item.header}
                icon={item.icon}
                className={`${item.className} reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              />
            ))}
          </BentoGrid>
        </div>

      </div>
    </section>
  );
}
