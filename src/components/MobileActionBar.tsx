import { useEffect, useState } from 'react';
import { IconPhone } from '@tabler/icons-react';
import { LAYER } from '@/lib/layers';
import { callLabel, telHref } from '@/lib/business';
import { section } from '@/lib/links';

// The bar would only repeat the hero's buttons, and must never cover the contact form.
const HIDE_WHILE_VISIBLE = ['hero-actions', 'contact'];
const SCROLLED_HEADER_HEIGHT_PX = 88;

export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const landmarks = HIDE_WHILE_VISIBLE
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const allLandmarksFound = landmarks.length === HIDE_WHILE_VISIBLE.length;
    if (!allLandmarksFound) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setVisible(onScreen.size === 0);
      },
      { rootMargin: `-${SCROLLED_HEADER_HEIGHT_PX}px 0px 0px 0px` },
    );
    landmarks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Lets the footer scroll clear of the bar; keep its height in step with the bar's. */}
      <div
        aria-hidden="true"
        className="md:hidden print:hidden h-[calc(4rem+max(0.75rem,env(safe-area-inset-bottom)))]"
      />

      <nav
        aria-label="Quick contact"
        inert={!visible}
        className={`md:hidden print:hidden fixed inset-x-0 bottom-0 ${LAYER.actionBar} border-t border-surface bg-bg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-2 gap-3">
          <a
            href={telHref}
            aria-label={callLabel}
            className="rounded-2xl flex min-h-12 items-center justify-center gap-2 border border-text/20 px-4 text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-text hover:border-text transition-colors duration-200"
          >
            <IconPhone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-accent" />
            Call
          </a>
          <a
            href={section('contact')}
            className="rounded-2xl flex min-h-12 items-center justify-center px-4 text-[0.78rem] font-semibold tracking-[0.08em] uppercase bg-deep text-bg hover:bg-accent-ink transition-colors duration-200"
          >
            Get a Quote
          </a>
        </div>
      </nav>
    </>
  );
}
