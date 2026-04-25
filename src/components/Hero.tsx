import { motion } from "motion/react";
import homeImg from '../assets/home.jpg';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const headline = "The Gold Standard of Dallas Construction";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex max-w-7xl flex-col items-center justify-center bg-bg"
      style={{ paddingTop: '88px' }}
    >
      {/* Left accent line */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-accent/20">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>

      {/* Right accent line */}
      <div className="absolute inset-y-0 right-0 h-full w-px bg-accent/20">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>

      {/* Bottom accent line */}
      {/* <div className="absolute inset-x-0 bottom-0 h-px w-full bg-accent/20">
        <div className="absolute inset-x-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div> */}

      <div className="w-full px-8 py-10 md:py-16 lg:px-12">

        <h1
          className="font-heading relative z-10 mx-auto max-w-4xl text-center font-black leading-tight tracking-tight text-text"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}
        >
          {headline.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="relative z-10 mx-auto mt-6 max-w-xl text-center text-base font-normal leading-relaxed text-text/60"
        >
          Royal Crest General Contractors delivers luxury residential and
          commercial construction across Dallas, Plano, Frisco, and Highland Park.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('portfolio')}
            className="rounded-2xl w-52 transform px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase bg-deep text-bg hover:bg-accent transition-colors duration-300 hover:-translate-y-0.5"
          >
            View Our Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="rounded-2xl w-52 transform border border-text/20 text-text px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase hover:border-text transition-all duration-300 hover:-translate-y-0.5"
          >
            Get a Quote
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="relative z-10 mt-16 p-3"
        >
          <div className="w-full overflow-hidden ">
            <img
              src={homeImg}
              alt="Royal Crest luxury home — Dallas, TX"
              width={1400}
              height={788}
              className="aspect-[16/9] h-auto w-full object-cover rounded-2xl"
              style={{ filter: 'saturate(0.82) brightness(1.02)' }}
            />
          </div>
        </motion.div>

        <div className="relative z-10 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-surface">
          <p className="text-[0.68rem] font-medium tracking-[0.22em] uppercase text-text/40">
            Dallas · Plano · Frisco · Highland Park
          </p>
          <p className="text-[0.68rem] font-medium tracking-[0.22em] uppercase text-text/40">
            Licensed & Insured · Est. 2004
          </p>
        </div>

      </div>
    </section>
  );
}
