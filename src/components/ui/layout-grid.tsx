import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type Card = {
  id: number;
  /** Describes the photo; also names the photo's button for keyboard and screen-reader users */
  alt: string;
  tag: string;
  title: string;
  meta: string;
  /** Grid placement of the card, e.g. `md:col-span-2` */
  className: string;
  thumbnail: string;
};

/** Room left for the fixed site header above an expanded card, and a small margin below it (px) */
const VIEWPORT_TOP_CLEARANCE = 104;
const VIEWPORT_BOTTOM_CLEARANCE = 16;

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLastSelectedId(selectedId);
      setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  // An expanded card is centred in the stage, which is taller than most screens: bring it fully into view.
  useEffect(() => {
    const stage = stageRef.current;
    const el = stage?.querySelector<HTMLElement>("[data-expanded]");
    if (selectedId === null || !stage || !el) return;
    // offsetTop / offsetHeight describe where the card ends up in the stage, not the transform it is animating through
    const top = stage.getBoundingClientRect().top + el.offsetTop;
    const bottom = top + el.offsetHeight;
    const above = top - VIEWPORT_TOP_CLEARANCE;
    const below = bottom - (window.innerHeight - VIEWPORT_BOTTOM_CLEARANCE);
    const delta = above < 0 ? above : below > 0 ? Math.min(below, above) : 0;
    // No explicit behavior: follows the page's scroll-behavior, which is instant under reduced motion
    if (delta !== 0) window.scrollBy({ top: delta });
  }, [selectedId]);

  return (
    // Stage: full width, so the dimming backdrop reaches both edges of the screen; expanded cards are centred in it
    <div ref={stageRef} className="relative h-full w-full">
      <div className="h-full py-10 px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 auto-rows-fr max-w-[1260px] mx-auto gap-6">
        {cards.map((card) => {
          const isSelected = selectedId === card.id;
          const Icon = isSelected ? IconArrowsMinimize : IconArrowsMaximize;

          return (
            // The figure keeps the card's grid cell while the photo is lifted out to expand.
            // Neither it nor the photo frame is positioned, so an expanded photo is placed
            // against the stage and centred in it.
            <figure key={card.id} className={cn(card.className, "flex min-h-0 flex-col")}>
              <div className="min-h-0 flex-1">
                <motion.div
                  data-expanded={isSelected ? "" : undefined}
                  layoutId={`card-${card.id}`}
                  className={cn(
                    // z-50 / z-40 follow the layer scale in src/lib/layers.ts: an enlarged
                    // photo sits above the mobile action bar, under the header
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
                    height={500}
                    width={500}
                    loading="lazy"
                    decoding="async"
                    className="object-cover object-top absolute inset-0 h-full w-full"
                    alt={card.alt}
                  />

                  {/* Hint that the photo can be enlarged (or put back) */}
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

              {/* Caption below the photo, never on top of it */}
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
  );
};
