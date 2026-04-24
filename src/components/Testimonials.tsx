import { useInView } from '../hooks/useInView';
import { AnimatedTestimonials } from './ui/animated-testimonials';
import abcImg from '../assets/big_roof.jpg';
import certainteedImg from '../assets/roof_birdseye.jpg';
import gafImg from '../assets/roofing_team.jpg';

const testimonials = [
  {
    quote: 'We were thoroughly impressed with the professionalism and attention to detail exhibited by Royal Crest General Contracting. Their work truly speaks for itself.',
    name: 'Ryan Jeffrey',
    designation: 'Custom Home · Highland Park',
    src: abcImg,
  },
  {
    quote: "Royal Crest General Contracting transformed our vision into reality with their impeccable workmanship and dedication. Highly recommended!",
    name: 'Nima Mojahed',
    designation: 'Commercial Office · Frisco',
    src: certainteedImg,
  },
  {
    quote: 'From start to finish, the team at Royal Crest General Contracting demonstrated reliability, skill, and a genuine passion for their craft. They exceeded our expectations in every way.',
    name: 'Christopher Strenger',
    designation: 'Kitchen Renovation · Plano',
    src: gafImg,
  },
];

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="testimonials" className="py-24 lg:py-28" style={{ background: '#fafaf8' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div ref={headRef} className={`mb-6 reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Client Reviews</p>
          <h2
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-ink)' }}
          >
            What Clients Say
          </h2>
        </div>

        <AnimatedTestimonials testimonials={testimonials} autoplay />

      </div>
    </section>
  );
}
