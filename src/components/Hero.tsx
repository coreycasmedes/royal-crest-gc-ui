import homeImg from '../assets/home.jpg';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
  return (
    <section id="hero" style={{ paddingTop: '68px' }}>
      {/* Full-bleed image */}
      <div className="w-full overflow-hidden" style={{ height: 'calc(80vh - 68px)' }}>
        <img
          src={homeImg}
          alt="Royal Crest luxury home — Dallas, TX"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.8) brightness(1.02)' }}
        />
      </div>

      {/* Editorial headline block */}
      <div style={{ background: '#fafaf8' }}>
        <div className="max-w-[1260px] mx-auto px-8 lg:px-12 pt-10 pb-20">

          {/* Headline + right panel */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
            <h1
              className="font-heading font-black leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(4rem, 10.5vw, 9.5rem)', color: 'var(--color-ink)' }}
            >
              DALLAS<br />BUILT.
            </h1>

            <div className="flex flex-col items-start lg:items-end gap-6 lg:pt-5 flex-shrink-0">
              <p
                className="text-[0.78rem] font-medium tracking-[0.24em] uppercase leading-[2.2]"
                style={{ color: 'var(--color-muted)' }}
              >
                Your home.<br />Reimagined.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="px-7 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] uppercase transition-all duration-200"
                  style={{ background: 'var(--color-ink)', color: '#fafaf8' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-ink)'; }}
                >
                  View Our Work
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-7 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] uppercase border transition-all duration-200"
                  style={{ borderColor: 'rgba(26,23,20,0.2)', color: 'var(--color-ink)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,23,20,0.2)'; }}
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>

          {/* Metadata strip */}
          <div
            className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t"
            style={{ borderColor: 'rgba(26,23,20,0.08)' }}
          >
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--color-faint)' }}>
              Dallas · Plano · Frisco · Highland Park
            </p>
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--color-faint)' }}>
              Licensed & Insured · Est. 2004
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
