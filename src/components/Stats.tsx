import { useInView } from "../hooks/useInView";

const stats = [
  { num: "250+", label: "Projects Completed" },
  { num: "4.9★", label: "Average Client Rating" },
  { num: "5yr", label: "Workmanship Warranty" },
];

export default function Stats() {
  const { ref, inView } = useInView();

  return (
    <section id="stats" className="py-20 bg-bg">
      <div ref={ref} className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-3">
          {stats.map(({ num, label }, i) => (
            <div
              key={label}
              className={`text-center px-2 sm:px-6 py-4 border-r last:border-r-0 border-surface reveal delay-${i + 1} ${inView ? "visible" : ""}`}
            >
              <p
                className="font-heading font-black leading-none mb-2 text-text"
                style={{ fontSize: "clamp(1.9rem, 8vw, 4rem)" }}
              >
                {num}
              </p>
              <p className="text-[0.6rem] sm:text-[0.7rem] font-medium tracking-[0.1em] sm:tracking-[0.18em] uppercase text-text/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
