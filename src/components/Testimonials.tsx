import { useInView } from "../hooks/useInView";

const testimonials = [
  {
    quote:
      "We were thoroughly impressed with the professionalism and attention to detail exhibited by Royal Crest General Contracting. Their work truly speaks for itself.",
    name: "Ryan Jeffrey",
    designation: "Exterior · Highland Park",
  },
  {
    quote:
      "Royal Crest General Contracting transformed our vision into reality with their impeccable workmanship and dedication. Highly recommended!",
    name: "Nima Mojahed",
    designation: "Roof · Frisco",
  },
  {
    quote:
      "From start to finish, the team at Royal Crest General Contracting demonstrated reliability, skill, and a genuine passion for their craft. They exceeded our expectations in every way.",
    name: "Christopher Strenger",
    designation: "Roof · Plano",
  },
];

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <section id="testimonials" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div
          ref={headRef}
          className={`mb-12 lg:mb-16 reveal ${headIn ? "visible" : ""}`}
        >
          <p className="label">Client Reviews</p>
          <h2
            className="font-heading font-bold leading-tight text-text"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
          >
            What Clients Say
          </h2>
        </div>

        {/* One framed block, hairline dividers between reviews. Stacked on
            mobile, quote-beside-name rows on tablets, three across on desktop. */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 border border-surface divide-y divide-surface lg:divide-y-0 lg:divide-x"
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`reveal delay-${i + 1} ${gridIn ? "visible" : ""} flex flex-col p-6 sm:p-8 md:max-lg:flex-row md:max-lg:gap-8 md:max-lg:p-10 xl:p-10`}
            >
              <div className="md:max-lg:flex-1">
                <span
                  aria-hidden="true"
                  className="block h-11 font-heading font-bold text-[4.5rem] leading-none text-accent select-none"
                >
                  &ldquo;
                </span>
                <blockquote>
                  <p className="text-[1.02rem] leading-[1.75] text-text">
                    {t.quote}
                  </p>
                </blockquote>
              </div>

              <figcaption className="mt-auto pt-8 md:max-lg:mt-0 md:max-lg:w-60 md:max-lg:shrink-0 md:max-lg:self-stretch md:max-lg:border-l md:max-lg:border-surface md:max-lg:pt-11 md:max-lg:pl-8">
                <span
                  aria-hidden="true"
                  className="block w-8 h-px bg-accent mb-5 md:max-lg:hidden"
                />
                <span className="block font-heading font-bold text-[1.05rem] leading-snug text-text">
                  {t.name}
                </span>
                <span className="block mt-1.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-accent-ink">
                  {t.designation}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
