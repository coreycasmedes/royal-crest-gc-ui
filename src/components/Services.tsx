import {
  IconHome2,
  IconChefHat,
  IconBath,
  IconHomePlus,
  IconHammer,
  IconBuilding,
} from '@tabler/icons-react';
import { useInView } from '../hooks/useInView';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const GridHeader = () => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl"
    style={{
      background: 'rgba(196,151,90,0.04)',
      backgroundImage: `
        linear-gradient(rgba(196,151,90,0.14) 1px, transparent 1px),
        linear-gradient(90deg, rgba(196,151,90,0.14) 1px, transparent 1px)
      `,
      backgroundSize: '24px 24px',
    }}
  />
);

const items = [
  {
    title: 'Custom Home Builds',
    description: 'Ground-up construction built to your exact vision.',
    icon: <IconHome2 className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />,
    className: 'md:col-span-2',
  },
  {
    title: 'Kitchen Remodels',
    description: 'Custom cabinetry, stone surfaces, premium fixtures.',
    icon: <IconChefHat className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />,
    className: 'md:col-span-1',
  },
  {
    title: 'Bathroom Renovations',
    description: 'Spa-grade tilework, frameless glass, luxury finishes.',
    icon: <IconBath className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />,
    className: 'md:col-span-1',
  },
  {
    title: 'Home Additions',
    description: "Seamless expansions that match your home's character.",
    icon: <IconHomePlus className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />,
    className: 'md:col-span-1',
  },
  {
    title: 'Roofing & Exterior',
    description: 'Premium protection built for Texas weather.',
    icon: <IconHammer className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />,
    className: 'md:col-span-1',
  },
  {
    title: 'Commercial Construction',
    description: 'Professional spaces designed to impress and perform.',
    icon: <IconBuilding className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />,
    className: 'md:col-span-3',
  },
];

export default function Services() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.06);

  return (
    <section id="services" className="py-24 lg:py-28" style={{ background: '#fafaf8' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div
          ref={headRef}
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 reveal ${headIn ? 'visible' : ''}`}
        >
          <div>
            <p className="label">What We Build</p>
            <h2
              className="font-heading font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-ink)' }}
            >
              Our Services
            </h2>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="self-start sm:self-auto text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b transition-colors duration-200"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
          >
            Request a Service →
          </button>
        </div>

        <div ref={gridRef}>
          <BentoGrid>
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={<span style={{ color: 'var(--color-ink)' }}>{item.title}</span>}
                description={<span style={{ color: 'var(--color-muted)' }}>{item.description}</span>}
                header={<GridHeader />}
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
