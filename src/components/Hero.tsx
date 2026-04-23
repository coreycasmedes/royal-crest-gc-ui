const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const badges = [
  'Licensed & Insured',
  '20+ Years Experience',
  'A+ BBB Rating',
  'On-Time Guarantee',
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'var(--color-dark)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 70% at 75% 35%, rgba(201,168,76,0.07) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 15% 75%, rgba(30,60,180,0.05) 0%, transparent 55%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-hero-grid" />

      {/* Content */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-6 py-24">
        {/* Eyebrow */}
        <p className="flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.28em] uppercase text-gold mb-7">
          <span className="inline-block w-8 h-px bg-gold opacity-55" />
          Royal Crest General Contractors
          <span className="inline-block w-8 h-px bg-gold opacity-55" />
        </p>

        {/* Headline */}
        <h1 className="font-heading font-black leading-[0.97] tracking-tight text-ink mb-8" style={{ fontSize: 'clamp(3.2rem, 8vw, 6.5rem)' }}>
          Building<br />
          <em className="not-italic text-gold">Excellence.</em>
          <br />
          Crafted With<br />
          Precision.
        </h1>

        {/* Subtext */}
        <p className="text-muted leading-[1.78] max-w-[480px] mb-12" style={{ fontSize: '1.1rem' }}>
          Dallas's premier general contractor delivering luxury residential
          and commercial construction since 2004. Every project, a masterpiece.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <button
            onClick={() => scrollTo('portfolio')}
            className="inline-flex items-center gap-2 px-8 py-4 text-[0.8rem] font-bold tracking-[0.08em] uppercase rounded-sm bg-gold text-dark border border-gold hover:bg-gold-light hover:border-gold-light transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]"
          >
            View Our Work →
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 text-[0.8rem] font-bold tracking-[0.08em] uppercase rounded-sm bg-transparent text-ink border border-gold-border hover:border-gold hover:text-gold transition-all hover:-translate-y-0.5"
          >
            Get a Free Quote
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-8" style={{ background: 'var(--color-gold-border)' }} />

        {/* Trust badges */}
        <div className="flex flex-wrap gap-6">
          {badges.map((b) => (
            <span key={b} className="flex items-center gap-2 text-[0.77rem] font-medium text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 animate-scroll-bob flex flex-col items-center gap-2">
        <span className="text-[0.65rem] tracking-[0.22em] uppercase text-faint">Scroll</span>
        <div className="w-px h-11" style={{ background: 'linear-gradient(to bottom, var(--color-gold), transparent)' }} />
      </div>
    </section>
  );
}
