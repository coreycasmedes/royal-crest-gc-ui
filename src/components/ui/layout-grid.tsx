import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type Card = {
  id: number;
  alt: string;
  tag: string;
  title: string;
  meta: string;
  className: string;
  thumbnail: string;
  srcSet?: string;
  sizes?: string;
};

const FIXED_HEADER_CLEARANCE_PX = 104;
const VIEWPORT_BOTTOM_MARGIN_PX = 16;

function scrollFullyIntoView(stage: HTMLElement, expandedCard: HTMLElement) {
  // offsetTop / offsetHeight give the card's final place, not the transform it is animating through
  const top = stage.getBoundingClientRect().top + expandedCard.offsetTop;
  const bottom = top + expandedCard.offsetHeight;
  const overflowAbove = top - FIXED_HEADER_CLEARANCE_PX;
  const overflowBelow = bottom - (window.innerHeight - VIEWPORT_BOTTOM_MARGIN_PX);
  const delta =
    overflowAbove < 0
      ? overflowAbove
      : overflowBelow > 0
        ? Math.min(overflowBelow, overflowAbove)
        : 0;
  // No `behavior`: follows the page's scroll-behavior, which is instant under reduced motion
  if (delta !== 0) window.scrollBy({ top: delta });
}

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lastSelectedId, setLastSelectedId] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const select = (id: number | null) => {
    setLastSelectedId(selectedId);
    setSelectedId(id);
  };

  useEffect(() => {
    if (selectedId === null) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLastSelectedId(selectedId);
      setSelectedId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedId]);

  useEffect(() => {
    const stage = stageRef.current;
    const expandedCard = stage?.querySelector<HTMLElement>("[data-expanded]");
    if (selectedId === null || !stage || !expandedCard) return;
    scrollFullyIntoView(stage, expandedCard);
  }, [selectedId]);

  return (
    // An Astro island hydrates alone, so it sets its own reduced-motion policy.
    <MotionConfig reducedMotion="user">
      {/* Full width, so the backdrop dims the whole screen; expanded cards centre in it */}
      <div ref={stageRef} className="relative h-full w-full">
        <div className="h-full py-10 px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 auto-rows-fr max-w-[1260px] mx-auto gap-6">
          {cards.map((card) => {
            const isSelected = selectedId === card.id;
            const Icon = isSelected ? IconArrowsMinimize : IconArrowsMaximize;

            return (
              // Figure and frame stay unpositioned, so an expanded photo is placed against the stage.
              <figure key={card.id} className={cn(card.className, "flex min-h-0 flex-col")}>
                <div className="min-h-0 flex-1">
                  <motion.div
                    data-expanded={isSelected ? "" : undefined}
                    layoutId={`card-${card.id}`}
                    className={cn(
                      // z-50 / z-40 from src/lib/layers.ts: above the mobile action bar, under the header
                      "group isolate overflow-hidden rounded-xl bg-surface",
                      isSelected
                        ? "absolute inset-0 m-auto h-1/2 w-[calc(100%-2rem)] md:h-2/3 md:w-3/4 max-h-[calc(100svh-7.5rem)] md:max-w-[60rem] z-50 shadow-2xl shadow-deep/30"
                        : "relative h-full w-full",
                      !isSelected && lastSelectedId === card.id && "z-40"
                    )}
                  >
                    <motion.img
                      layoutId={`image-${card.id}-image`}
                      src={card.thumbnail}
                      srcSet={card.srcSet}
                      sizes={card.sizes}
                      height={500}
                      width={500}
                      loading="lazy"
                      decoding="async"
                      className="object-cover object-top absolute inset-0 h-full w-full"
                      alt={card.alt}
                    />

                    <motion.span
                      layout="position"
                      aria-hidden="true"
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-deep/70 text-bg transition-colors duration-200 group-hover:bg-deep group-focus-within:bg-deep"
                    >
                      <Icon size={18} />
                    </motion.span>

                    <button
                      type="button"
                      onClick={() => select(isSelected ? null : card.id)}
                      aria-expanded={isSelected}
                      aria-label={`${isSelected ? "Shrink" : "Enlarge"} photo: ${card.alt}`}
                      className="absolute inset-0 h-full w-full cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-bg focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-deep"
                    />
                  </motion.div>
                </div>

                {/* Design rule: captions go below photos, never on them */}
                <figcaption className="pt-4">
                  <h3 className="font-heading font-bold text-lg leading-snug text-text">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-text/70">
                    {card.tag} · {card.meta}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <motion.div
          onClick={() => select(null)}
          className={cn(
            "absolute h-full w-full left-0 top-0 bg-deep opacity-0 z-10",
            selectedId !== null ? "pointer-events-auto" : "pointer-events-none"
          )}
          animate={{ opacity: selectedId !== null ? 0.3 : 0 }}
        />
      </div>
    </MotionConfig>
  );
};
