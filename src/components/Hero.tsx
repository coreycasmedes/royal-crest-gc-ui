import { motion } from "motion/react";
import homeImg from '../assets/home.jpg';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const headline = "Build the luxury home you deserve";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex max-w-7xl flex-col items-center justify-center"
      style={{ paddingTop: '88px', background: '#fafaf8' }}
    >
      {/* Left accent line */}
      <div
        className="absolute inset-y-0 left-0 h-full w-px"
        style={{ background: 'rgba(196,151,90,0.18)' }}
      >
        <div
          className="absolute top-0 h-40 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)' }}
        />
      </div>

      {/* Right accent line */}
      <div
        className="absolute inset-y-0 right-0 h-full w-px"
        style={{ background: 'rgba(196,151,90,0.18)' }}
      >
        <div
          className="absolute top-0 h-40 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)' }}
        />
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px w-full"
        style={{ background: 'rgba(196,151,90,0.18)' }}
      >
        <div
          className="absolute inset-x-0 mx-auto h-px w-40"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-gold), transparent)' }}
        />
      </div>

      <div className="w-full px-8 py-10 md:py-16 lg:px-12">

        {/* Animated headline */}
        <h1
          className="font-heading relative z-10 mx-auto max-w-4xl text-center font-black leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)', color: 'var(--color-ink)' }}
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="relative z-10 mx-auto mt-6 max-w-xl text-center text-base font-normal leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          Royal Crest General Contractors delivers luxury residential and
          commercial construction across Dallas, Plano, Frisco, and Highland Park.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('portfolio')}
            className="w-52 transform px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'var(--color-ink)', color: '#fafaf8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-ink)'; }}
          >
            View Our Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-52 transform border px-6 py-3 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: 'rgba(26,23,20,0.22)', color: 'var(--color-ink)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,23,20,0.22)'; }}
          >
            Get a Quote
          </button>
        </motion.div>

        {/* Framed image preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="relative z-10 mt-16 border border-neutral-200 p-3"
          style={{ background: '#f0ede6' }}
        >
          <div className="w-full overflow-hidden border border-neutral-200">
            <img
              src={homeImg}
              alt="Royal Crest luxury home — Dallas, TX"
              width={1400}
              height={788}
              className="aspect-[16/9] h-auto w-full object-cover"
              style={{ filter: 'saturate(0.82) brightness(1.02)' }}
            />
          </div>
        </motion.div>

        {/* Metadata strip */}
        <div
          className="relative z-10 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t"
          style={{ borderColor: 'rgba(26,23,20,0.08)' }}
        >
          <p
            className="text-[0.68rem] font-medium tracking-[0.22em] uppercase"
            style={{ color: 'var(--color-faint)' }}
          >
            Dallas · Plano · Frisco · Highland Park
          </p>
          <p
            className="text-[0.68rem] font-medium tracking-[0.22em] uppercase"
            style={{ color: 'var(--color-faint)' }}
          >
            Licensed & Insured · Est. 2004
          </p>
        </div>

      </div>
    </section>
  );
}
