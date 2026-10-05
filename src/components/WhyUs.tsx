import { useInView } from "../hooks/useInView";
import alanImg from "../assets/alan.webp";
import danImg from "../assets/dan.webp";

// width/height are the files' real dimensions so the lazy-loaded portraits
// reserve their space before they arrive.
const owners = [
  {
    name: "Alan",
    role: "Co-owner",
    bio: "Alan co-founded Royal Crest on a simple principle: build it right, or don't build it at all. He oversees every project personally, holding each job to the standard of craftsmanship Dallas expects from Royal Crest.",
    src: alanImg,
    width: 1362,
    height: 2000,
    objectPosition: "center 10%",
    zoom: 1,
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
  },
];

const promises = [
  "Family-owned personal accountability on every single job.",
  "Top-tier suppliers only. No material substitutions, ever.",
  "Transparent timelines, costs, and zero surprises.",
  "Design, permits, and inspections all handled for you.",
];

export default function WhyUs() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: ownersRef, inView: ownersIn } = useInView(0.08);
  const { ref: promiseRef, inView: promiseIn } = useInView();

  return (
    <section id="why" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        {/* Source order is heading, owners, promises so phones end on the
            call to action; from lg up the promises sit under the heading. */}
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          <div
            ref={headRef}
            className={`lg:col-span-5 lg:row-start-1 reveal ${headIn ? "visible" : ""}`}
          >
            <h2
              className="font-heading font-bold leading-tight text-text"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              The Standard Others Aspire To
            </h2>
            <p className="mt-5 max-w-[44ch] text-[0.95rem] leading-[1.78] text-text/70">
              Real craft, honesty, and delivering on our word, across Dallas
              and beyond.
            </p>
          </div>

          {/* The people who answer for it */}
          <div
            ref={ownersRef}
            className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12"
          >
            {owners.map((owner, i) => (
              <figure
                key={owner.name}
                className={`reveal delay-${i + 1} ${ownersIn ? "visible" : ""} ${
                  i === 1 ? "sm:mt-16" : ""
                }`}
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={owner.src}
                    alt={`${owner.name}, ${owner.role} at Royal Crest General Contractors`}
                    width={owner.width}
                    height={owner.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[5/6] sm:aspect-[4/5] w-full object-cover"
                    style={{
                      filter: "saturate(0.9) brightness(1.02)",
                      objectPosition: owner.objectPosition,
                      transform: `scale(${owner.zoom})`,
                      transformOrigin: "center top",
                    }}
                  />
                </div>
                <figcaption className="mt-5">
                  <h3 className="font-heading font-bold text-xl text-text">
                    {owner.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-text/65">{owner.role}</p>
                  <p className="mt-3 text-[0.88rem] leading-[1.78] text-text/70">
                    {owner.bio}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div
            ref={promiseRef}
            className={`lg:col-span-5 lg:row-start-2 reveal ${promiseIn ? "visible" : ""}`}
          >
            <ul className="border-t border-surface">
              {promises.map((promise) => (
                <li
                  key={promise}
                  className="border-b border-surface py-4 text-[0.98rem] leading-snug text-text"
                >
                  {promise}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-block rounded-2xl px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
