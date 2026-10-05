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

// width/height are the file's real dimensions, so the lazy-loaded image
// reserves its space before it arrives instead of pushing the page down.
// The frame is a fixed 3:2 box, so every card's photo is the same size and
// the card height never depends on the image having loaded. `position` is the
// object-position class that keeps each photo's subject inside that crop.
const ImageHeader = ({
  src,
  alt,
  width,
  height,
  position = 'object-center',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
}) => (
  <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-lg bg-surface">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/bento:scale-[1.03] ${position}`}
      style={{ filter: 'saturate(0.9) brightness(1.02)' }}
    />
  </div>
);

const items = [
  {
    title: 'Exterior',
    description: 'Painting, stucco, and exterior finish work that lasts.',
    icon: <IconHome2 aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    header: (
      <ImageHeader
        src={exteriorWorkImg}
        width={956}
        height={900}
        position="object-[50%_60%]"
        alt="Exterior finish work by Royal Crest General Contractors"
      />
    ),
  },
  {
    title: 'Home Improvement',
    description: 'Upgrades and repairs that raise the value of your home.',
    icon: <IconHomeCog aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    header: (
      <ImageHeader
        src={gutterImg}
        width={1500}
        height={2000}
        position="object-[50%_78%]"
        alt="Copper gutter installation by Royal Crest General Contractors"
      />
    ),
  },
  {
    title: 'Roofing',
    description: 'Premium protection built for Texas weather.',
    icon: <IconHammer aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    header: (
      <ImageHeader
        src={bigRoofImg}
        width={2000}
        height={1500}
        alt="Aerial view of a roofing project by Royal Crest General Contractors"
      />
    ),
  },
  {
    title: 'Decks & Outdoor Living',
    description: 'Custom decks, patios, and outdoor spaces built for how Texans actually live.',
    icon: <IconFence aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    header: (
      <ImageHeader
        src={backyardDeckImg}
        width={2000}
        height={1125}
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
          <a
            href="#contact"
            className="self-start sm:self-auto text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b border-text text-text hover:text-accent-ink hover:border-accent-ink transition-colors duration-200"
          >
            Request a Service →
          </a>
        </div>

        {/* One column on phones, two from 640px up, so the four cards always
            fill a complete block. The reveal sits on a wrapper so its
            transition and stagger delay do not override the card's own hover
            transition. */}
        <div ref={gridRef}>
          <BentoGrid>
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              >
                <BentoGridItem
                  href="#contact"
                  linkLabel={`${item.title}: get a quote`}
                  cta="Get a quote"
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className="h-full"
                />
              </div>
            ))}
          </BentoGrid>
        </div>

      </div>
    </section>
  );
}
