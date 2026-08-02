import { useInView } from '../hooks/useInView';
import alanImg from '../assets/alan.webp';
import danImg from '../assets/dan.webp';

const team = [
  {
    name: 'Alan',
    role: 'Founder & General Contractor',
    bio: "With over two decades in residential and commercial construction, Alan founded Royal Crest General Contractors on a simple principle: build it right, or don't build it at all. He oversees every project personally, from permitting to final walkthrough, holding each job to the same standard of craftsmanship Dallas has come to expect from the Royal Crest name.",
    src: alanImg,
    objectPosition: 'center 22%',
  },
  {
    name: 'Daniel',
    role: 'Project Manager',
    bio: 'Daniel keeps every Royal Crest job on schedule and on budget, coordinating trades, suppliers, and inspections so clients never have to. His background in luxury home renovation means no detail — down to the trim work — goes unchecked, and every homeowner stays informed at every step.',
    src: danImg,
    objectPosition: 'center 15%',
  },
];

export default function Team() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <section id="team" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div ref={headRef} className={`mb-16 reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Meet the Team</p>
          <h2
            className="font-heading font-bold leading-tight text-text"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
          >
            Our Team
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface"
        >
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`reveal delay-${i + 1} ${gridIn ? 'visible' : ''} bg-bg p-8 lg:p-12 flex flex-col sm:flex-row gap-6`}
            >
              <img
                src={member.src}
                alt={`${member.name}, ${member.role} at Royal Crest General Contractors`}
                className="w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 rounded-full object-cover"
                style={{
                  filter: 'saturate(0.9) brightness(1.02)',
                  objectPosition: member.objectPosition ?? 'center',
                }}
              />
              <div>
                <h3 className="font-heading font-bold text-xl text-text">
                  {member.name}
                </h3>
                <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-accent mt-1 mb-4">
                  {member.role}
                </p>
                <p className="text-[0.88rem] leading-[1.78] text-text/60">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
