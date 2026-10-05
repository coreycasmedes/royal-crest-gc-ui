import { useInView } from "../hooks/useInView";
import alanImg from "../assets/alan.webp";
import danImg from "../assets/dan.webp";

// width/height are the files' real dimensions so the lazy-loaded portraits
// reserve their space before they arrive.
//
// The portraits always sit side by side as a pair. On phones each bio runs
// full width underneath the pair; from sm up it sits under its own portrait.
// The second portrait is dropped 4rem from sm up, so the first bio is pulled
// back up by the same amount to stay tight under its portrait.
const team = [
  {
    name: "Alan",
    role: "Co-owner",
    bio: "Alan co-founded Royal Crest on a simple principle: build it right, or don't build it at all. He oversees every project personally, holding each job to the standard of craftsmanship Dallas expects from Royal Crest.",
    src: alanImg,
    width: 1362,
    height: 2000,
    objectPosition: "center 10%",
    zoom: 1,
    figureClass: "col-start-1 row-start-1",
    bioClass: "col-span-2 row-start-2 sm:col-span-1 sm:col-start-1 sm:-mt-16",
  },
  {
    name: "Daniel",
    role: "Co-owner",
    bio: "Daniel co-founded Royal Crest and keeps every job on schedule and on budget, coordinating trades and inspections so clients never have to. His background in luxury renovation means no detail goes unchecked.",
    src: danImg,
    width: 1050,
    height: 1247,
    objectPosition: "center top",
    // The file has a dark strip along its bottom edge; zoom from the top to crop it out.
    zoom: 1.05,
    figureClass: "col-start-2 row-start-1 sm:mt-16",
    bioClass: "col-span-2 row-start-3 sm:col-span-1 sm:col-start-2 sm:row-start-2",
  },
];

export default function Team() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <section id="about" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <div
            ref={headRef}
            className={`lg:col-span-4 reveal ${headIn ? "visible" : ""}`}
          >
            <h2
              className="font-heading font-bold leading-tight text-text"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              Our Team
            </h2>
          </div>

          <div
            ref={gridRef}
            className={`lg:col-span-8 grid grid-cols-2 content-start gap-x-4 gap-y-5 sm:gap-x-6 reveal ${gridIn ? "visible" : ""}`}
          >
            {team.map((member) => (
              <figure key={member.name} className={member.figureClass}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={member.src}
                    alt={`${member.name}, ${member.role} at Royal Crest General Contractors`}
                    width={member.width}
                    height={member.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                    style={{
                      filter: "saturate(0.9) brightness(1.02)",
                      objectPosition: member.objectPosition,
                      transform: `scale(${member.zoom})`,
                      transformOrigin: "center top",
                    }}
                  />
                </div>
                <figcaption className="mt-4">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-text">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-text/65">{member.role}</p>
                </figcaption>
              </figure>
            ))}
            {team.map((member) => (
              <p
                key={member.name}
                className={`text-[0.88rem] leading-[1.78] text-text/70 ${member.bioClass}`}
              >
                {member.bio}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
