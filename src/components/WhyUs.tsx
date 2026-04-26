import { useInView } from "../hooks/useInView";
import { MultiStepLoader } from "./ui/multi-step-loader";

const steps = [
  { text: "Family-owned personal accountability on every single job." },
  { text: "Top-tier suppliers only. No material substitutions, ever." },
  { text: "Transparent timelines, costs, and zero surprises." },
  { text: "Design, permits, subs, inspections — all handled for you." },
];

export default function WhyUs() {
  const { ref: leftRef, inView: leftIn } = useInView();
  const { ref: rightRef, inView: rightIn } = useInView(0.06);

  return (
    <section id="why" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
          {/* Left */}
          <div ref={leftRef} className={`reveal ${leftIn ? "visible" : ""}`}>
            <p className="label">Why Choose Us</p>
            <h2
              className="font-heading font-bold leading-tight mb-5 text-text"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              The Standard
              <br />
              Others
              <br />
              Aspire To
            </h2>
            <p className="text-[0.9rem] leading-[1.78] text-text/60">
              Twenty years of craft, honesty, and delivering on our word —
              across Dallas and beyond.
            </p>
          </div>

          {/* Right — cycling process steps */}
          <div ref={rightRef} className={`reveal ${rightIn ? "visible" : ""}`}>
            <MultiStepLoader loadingStates={steps} duration={2200} loop />
          </div>
        </div>
      </div>
    </section>
  );
}
