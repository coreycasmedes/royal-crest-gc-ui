import { useEffect, useState } from 'react';
import { IconPhone } from '@tabler/icons-react';

// The bar stays out of the way while either of these is on screen:
// the hero's own buttons (it would only repeat them) and the contact section
// (it must never sit on top of the form or its submit button).
const HIDE_WHILE_VISIBLE = ['hero-actions', 'contact'];
// Height of the fixed header once scrolled. Anything tucked under it counts
// as off screen.
const HEADER_HEIGHT_PX = 88;

export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = HIDE_WHILE_VISIBLE
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    // Without both landmarks we can't tell when the bar is safe to show.
    if (targets.length !== HIDE_WHILE_VISIBLE.length) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setVisible(onScreen.size === 0);
      },
      { rootMargin: `-${HEADER_HEIGHT_PX}px 0px 0px 0px` },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Reserves the bar's height at the end of the page so the footer's
          last line can scroll clear of it. Keep in step with the bar below. */}
      <div
        aria-hidden="true"
        className="md:hidden print:hidden h-[calc(4rem+max(0.75rem,env(safe-area-inset-bottom)))]"
      />

      {/* inert while hidden so its links can't take focus or be read out */}
      <nav
        aria-label="Quick contact"
        inert={!visible}
        className={`md:hidden print:hidden fixed inset-x-0 bottom-0 z-50 border-t border-surface bg-bg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+14694320341"
            aria-label="Call (469) 432 0341"
            className="rounded-2xl flex min-h-12 items-center justify-center gap-2 border border-text/20 px-4 text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-text hover:border-text transition-colors duration-200"
          >
            <IconPhone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-accent" />
            Call
          </a>
          <a
            href="#contact"
            className="rounded-2xl flex min-h-12 items-center justify-center px-4 text-[0.78rem] font-semibold tracking-[0.08em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
          >
            Get a Quote
          </a>
        </div>
      </nav>
    </>
  );
}
