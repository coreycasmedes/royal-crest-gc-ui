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
// The frame is a fixed-ratio box, so the card height never depends on the
// image having loaded. `aspect` sets that ratio (see WIDE / NARROW below) and
// `position` is the object-position class that keeps each photo's subject
// inside the crop.
const ImageHeader = ({
  src,
  alt,
  width,
  height,
  aspect,
  position = 'object-center',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: string;
  position?: string;
}) => (
  <div className={`relative w-full shrink-0 overflow-hidden rounded-lg bg-surface ${aspect}`}>
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

// From lg up the grid is five columns: rows alternate a wide card (3 columns)
// with a narrow one (2 columns), so the block has a rhythm instead of four
// equal tiles. The photo ratios are chosen so a wide and a narrow photo come
// out the same height, keeping both cards in a row level. Below lg every card
// is the same width and uses 3:2.
const WIDE = { span: 'lg:col-span-3', aspect: 'aspect-[3/2] lg:aspect-[16/9]' };
const NARROW = { span: 'lg:col-span-2', aspect: 'aspect-[3/2] lg:aspect-[9/8]' };

const items = [
  {
    title: 'Roofing',
    description: 'Premium protection built for Texas weather.',
    icon: <IconHammer aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    span: WIDE.span,
    header: (
      <ImageHeader
        src={bigRoofImg}
        width={2000}
        height={1500}
        aspect={WIDE.aspect}
        alt="Aerial view of a roofing project by Royal Crest General Contractors"
      />
    ),
  },
  {
    title: 'Exterior',
    description: 'Painting, stucco, and exterior finish work that lasts.',
    icon: <IconHome2 aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    span: NARROW.span,
    header: (
      <ImageHeader
        src={exteriorWorkImg}
        width={956}
        height={900}
        aspect={NARROW.aspect}
        position="object-[50%_60%]"
        alt="Exterior finish work by Royal Crest General Contractors"
      />
    ),
  },
  {
    title: 'Home Improvement',
    description: 'Upgrades and repairs that raise the value of your home.',
    icon: <IconHomeCog aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    span: NARROW.span,
    header: (
      <ImageHeader
        src={gutterImg}
        width={1500}
        height={2000}
        aspect={NARROW.aspect}
        position="object-[50%_78%]"
        alt="Copper gutter installation by Royal Crest General Contractors"
      />
    ),
  },
  {
    title: 'Decks & Outdoor Living',
    description: 'Custom decks, patios, and outdoor spaces built for how Texans actually live.',
    icon: <IconFence aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />,
    span: WIDE.span,
    header: (
      <ImageHeader
        src={backyardDeckImg}
        width={2000}
        height={1125}
        aspect={WIDE.aspect}
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
            Get a Quote <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* One column on phones, two equal columns from 640px, and the
            wide/narrow rows from 1024px. The reveal sits on a wrapper so its
            transition and stagger delay do not override the card's own hover
            transition. */}
        <div ref={gridRef}>
          <BentoGrid className="lg:grid-cols-5">
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`${item.span} reveal delay-${i + 1} ${gridIn ? 'visible' : ''}`}
              >
                <BentoGridItem
                  href="#contact"
                  linkLabel={`${item.title}: get a quote`}
                  cta="Get a Quote"
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
