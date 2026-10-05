import {
  IconClipboardCheck,
  IconHomeHeart,
  IconReceipt,
  IconShieldCheck,
} from "@tabler/icons-react";
import { useInView } from "../hooks/useInView";

const pillars = [
  {
    title: "Family-owned",
    text: "Personal accountability on every single job.",
    Icon: IconHomeHeart,
  },
  {
    title: "No substitutions",
    text: "Top-tier suppliers only. Materials are never swapped out.",
    Icon: IconShieldCheck,
  },
  {
    title: "No surprises",
    text: "Transparent timelines and transparent costs.",
    Icon: IconReceipt,
  },
  {
    title: "Permits handled",
    text: "Design, permitting, and inspections all taken care of for you.",
    Icon: IconClipboardCheck,
  },
];

// Placeholder wording: the owners still have to confirm how they describe
// their process. Keep it generic until then (no timeframes, prices or
// warranty terms).
const steps = [
  {
    title: "Free estimate",
    text: "Tell us what you need done and we put together an estimate at no cost.",
  },
  {
    title: "Written scope and price",
    text: "You get the scope of work and the price in writing before anything starts.",
  },
  {
    title: "Build",
    text: "We carry out the work as written in the agreed scope.",
  },
  {
    title: "Walkthrough and warranty",
    text: "We walk the finished job with you and go over your warranty.",
  },
];

export default function WhyUs() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: pillarsRef, inView: pillarsIn } = useInView(0.08);
  const { ref: stepsRef, inView: stepsIn } = useInView(0.08);

  return (
    <section id="why" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        {/* Heading + four pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 lg:items-center">
          <div ref={headRef} className={`reveal ${headIn ? "visible" : ""}`}>
            <p className="label">Why Choose Us</p>
            <h2
              className="font-heading font-bold leading-tight mb-5 text-text"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              The Standard <br className="hidden lg:block" />
              Others <br className="hidden lg:block" />
              Aspire To
            </h2>
            <p className="max-w-md text-[0.9rem] leading-[1.78] text-text/70">
              Real craft, honesty, and delivering on our word, across Dallas
              and beyond.
            </p>
          </div>

          <div
            ref={pillarsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface border border-surface"
          >
            {pillars.map(({ title, text, Icon }, i) => (
              <div key={title} className="bg-bg p-6 sm:p-8 lg:p-10">
                <div
                  className={`flex gap-4 sm:block reveal delay-${i + 1} ${pillarsIn ? "visible" : ""}`}
                >
                  <Icon
                    aria-hidden="true"
                    stroke={1.5}
                    className="h-6 w-6 shrink-0 text-accent sm:mb-5"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-lg leading-snug text-text mb-2">
                      {title}
                    </h3>
                    <p className="text-[0.88rem] leading-[1.7] text-text/70">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div
          ref={stepsRef}
          className="mt-20 lg:mt-24 pt-12 lg:pt-14 border-t border-surface"
        >
          <p
            id="how-it-works"
            className={`label reveal ${stepsIn ? "visible" : ""}`}
          >
            How It Works
          </p>

          <ol
            role="list"
            aria-labelledby="how-it-works"
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 sm:gap-y-10 lg:gap-x-12"
          >
            {steps.map(({ title, text }, i) => (
              <li
                key={title}
                className={`relative flex gap-4 sm:block border-t border-surface pt-6 reveal delay-${i + 1} ${stepsIn ? "visible" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-10 bg-deep"
                />
                <span
                  aria-hidden="true"
                  className="block w-7 shrink-0 font-heading font-bold text-[0.8rem] leading-7 tracking-[0.18em] text-accent-ink sm:w-auto sm:leading-normal sm:mb-4"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg leading-snug text-text mb-2">
                    {title}
                  </h3>
                  <p className="text-[0.88rem] leading-[1.7] text-text/70">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className={`mt-12 reveal delay-5 ${stepsIn ? "visible" : ""}`}
          >
            <a
              href="#contact"
              className="inline-block rounded-2xl px-6 py-3 text-[0.75rem] font-semibold tracking-[0.1em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
