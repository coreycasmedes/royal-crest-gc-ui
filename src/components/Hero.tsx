import { motion } from "motion/react";
import heroImg800 from "../assets/hero-800.webp";
import heroImg1200 from "../assets/hero-1200.webp";
import heroImg1500 from "../assets/hero-1500.webp";
import droneRoofVideo from "../assets/drone_roof_540.mp4";
import droneRoofPoster from "../assets/drone_roof_poster.webp";
// import { TextGenerateEffect } from "./ui/text-generate-effect";
import { VideoText } from "./ui/video-text";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

//const staticHeadlineLines = ["Royal Crest", "General", "Contracting"];
const staticHeadlineLines = ["The Gold", "Standard of", "Construction"];
// Single source of truth — the container height is exactly
// lines * lineHeight * fontSize (no extra buffer), so it wraps the rendered
// text tightly and can't drift out of sync with VideoText's mask. The 9rem
// cap keeps the headline from growing unbounded on very large viewports.
const HEADLINE_FONT_SIZE = "clamp(2.4rem, 16vw, 9rem)";
const HEADLINE_LINE_HEIGHT_EM = 1.05;
// Keep in sync with the <link rel="preload" as="image"> in index.html.
const HERO_SRCSET = `${heroImg800} 800w, ${heroImg1200} 1200w, ${heroImg1500} 1500w`;
const HERO_SIZES =
  "(min-width: 1280px) 1160px, (min-width: 1024px) calc(100vw - 120px), calc(100vw - 88px)";
// const cyclingWords = [
//   "Full Renovations",
//   "Kitchens & Baths",
//   "Roofs & Exteriors",
// ];
// const INITIAL_DELAY = staticHeadlineLines.join(" ").split(" ").length * 0.1; // sync with last static word

export default function Hero() {
  // const [wordIndex, setWordIndex] = useState(0);
  // const [cycleDelay, setCycleDelay] = useState(INITIAL_DELAY);

  // useEffect(() => {
  //   let interval: ReturnType<typeof setInterval>;
  //   const timeout = setTimeout(() => {
  //     setCycleDelay(0);
  //     interval = setInterval(() => {
  //       setWordIndex((prev) => (prev + 1) % cyclingWords.length);
  //     }, 2500);
  //   }, 1800);
  //   return () => {
  //     clearTimeout(timeout);
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center bg-bg"
      style={{ paddingTop: "88px" }}
    >
      <div className="w-full max-w-7xl mx-auto px-8 py-10 md:py-16 lg:px-12">
        <h1
          className="relative font-heading z-10 mx-auto max-w-4xl text-center font-black leading-tight tracking-tight text-text"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mx-auto w-full"
            style={{
              height: `calc(${staticHeadlineLines.length} * ${HEADLINE_LINE_HEIGHT_EM} * ${HEADLINE_FONT_SIZE})`,
            }}
          >
            <VideoText
              src={droneRoofVideo}
              poster={droneRoofPoster}
              startOnLoad
              playbackRate={0.5}
              lineHeight={HEADLINE_LINE_HEIGHT_EM}
              fontSize={HEADLINE_FONT_SIZE}
              fontWeight={900}
              letterSpacing="-0.04em"
              fontFamily="Geist, ui-sans-serif, system-ui"
              className="font-heading"
            >
              {staticHeadlineLines}
            </VideoText>
          </motion.div>

          {/* Third line (fixed) */}
          {/* <span className="block ">
            <TextGenerateEffect
              key={cyclingWords[wordIndex]}
              words={cyclingWords[wordIndex]}
              delay={cycleDelay}
              duration={0.75}
              className="text-accent"
            />
          </span> */}
        </h1>

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="relative z-10 mx-auto mt-6 max-w-xl text-center text-base font-normal leading-relaxed text-text/60"
        >
          Royal Crest General Contractors delivers luxury residential and
          commercial construction across Dallas, Plano, Frisco, and Highland
          Park.
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative z-10 mt-3 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            onClick={() => scrollTo("portfolio")}
            className="rounded-2xl w-52 transform px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase bg-deep text-bg hover:bg-accent transition-colors duration-300 hover:-translate-y-0.5"
          >
            View Our Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-2xl w-52 transform border border-text/20 text-text px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase hover:border-text transition-all duration-300 hover:-translate-y-0.5"
          >
            Get a Quote
          </button>
        </motion.div>

        {/* LCP element — rendered without an entrance animation on purpose */}
        <div className="relative z-10 mt-16 p-3">
          <div className="w-full overflow-hidden">
            <img
              src={heroImg1200}
              srcSet={HERO_SRCSET}
              sizes={HERO_SIZES}
              alt="Residential exterior with copper roofline built by Royal Crest — Dallas, TX"
              width={1500}
              height={1125}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] h-auto w-full object-cover rounded-2xl"
              style={{ filter: "saturate(0.82) brightness(1.02)" }}
            />
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-surface">
          <p className="text-[0.68rem] font-medium tracking-[0.22em] uppercase text-text/40">
            Dallas · Plano · Frisco · Highland Park
          </p>
          <p className="text-[0.68rem] font-medium tracking-[0.22em] uppercase text-text/40">
            Licensed & Insured
          </p>
        </div>
      </div>
    </section>
  );
}
