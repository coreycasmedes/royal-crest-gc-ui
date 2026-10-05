import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type Card = {
  id: number;
  /** Describes the photo; also names the card's button for keyboard and screen-reader users */
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
            // The wrapper keeps the card's grid cell while the card itself is lifted out to expand
            <div key={card.id} className={card.className}>
              <motion.div
                data-expanded={isSelected ? "" : undefined}
                layoutId={`card-${card.id}`}
                className={cn(
                  "group isolate overflow-hidden bg-surface",
                  isSelected
                    ? "rounded-lg absolute inset-0 m-auto h-1/2 w-full md:h-2/3 md:w-3/4 max-h-[calc(100svh-7.5rem)] md:max-w-[60rem] z-50 shadow-2xl"
                    : "rounded-xl relative h-full w-full",
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

                {/* Caption: always in the page, on a scrim that is at least black/70 behind every line of text */}
                <motion.div
                  layout
                  className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/70 via-[calc(100%-6rem)] to-transparent pt-24"
                >
                  <motion.div layout="position" className="px-6 pb-5 md:px-8 md:pb-6">
                    <p className="flex items-center gap-2.5 text-[0.65rem] font-semibold tracking-[0.24em] uppercase mb-1.5 text-surface">
                      <span aria-hidden="true" className="h-px w-5 bg-accent" />
                      {card.tag}
                    </p>
                    <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/85">{card.meta}</p>
                  </motion.div>
                </motion.div>

                {/* Hint that the photo can be enlarged (or put back) */}
                <motion.span
                  layout="position"
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-md bg-black/60 text-white transition-colors duration-200 group-hover:bg-deep group-focus-within:bg-deep"
                >
                  <Icon size={18} stroke={1.75} />
                </motion.span>

                {/* The control sits over the whole card as a sibling of the caption, so the h3 stays a real heading */}
                <button
                  type="button"
                  onClick={() => select(isSelected ? null : card.id)}
                  aria-expanded={isSelected}
                  aria-label={`Enlarge photo: ${card.alt}`}
                  className={cn(
                    "absolute inset-0 h-full w-full cursor-pointer",
                    isSelected ? "rounded-lg" : "rounded-xl",
                    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-deep"
                  )}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div
        onClick={() => select(null)}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selectedId !== null ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selectedId !== null ? 0.3 : 0 }}
      />
    </div>
  );
};
