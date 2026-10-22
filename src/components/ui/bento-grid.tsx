import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  linkLabel,
  cta,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  /** When set, the whole card renders as a link to this target. */
  href?: string;
  /** Accessible name for the card link, e.g. "Roofing: get a quote". */
  linkLabel?: string;
  /** Visible call to action shown at the foot of a linked card. */
  cta?: string;
}) => {
  const descriptionId = useId();

  const cardClass = cn(
    "group/bento shadow-input flex flex-col gap-4 rounded-xl border border-surface bg-bg p-4",
    href &&
      "transition-colors duration-200 hover:border-accent-ink focus-visible:border-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink",
    className,
  );

  const body = (
    <>
      {header}
      <div className="flex flex-1 flex-col px-1 pb-1">
        <div className="flex items-center gap-2.5">
          {icon}
          <h3 className="font-sans text-lg font-bold leading-snug text-text">
            {title}
          </h3>
        </div>
        <p
          id={descriptionId}
          className="mt-2 font-sans text-sm leading-relaxed font-normal text-text/70"
        >
          {description}
        </p>
        {href && cta && (
          <span className="mt-auto flex items-center gap-2 pt-5 text-[0.76rem] font-semibold tracking-[0.1em] uppercase text-text transition-colors duration-200 group-hover/bento:text-accent-ink group-focus-visible/bento:text-accent-ink">
            <span className="border-b border-text pb-0.5 transition-colors duration-200 group-hover/bento:border-accent-ink group-focus-visible/bento:border-accent-ink">
              {cta}
            </span>
            <span
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/bento:translate-x-1 motion-safe:group-focus-visible/bento:translate-x-1"
            >
              →
            </span>
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={linkLabel}
        aria-describedby={description ? descriptionId : undefined}
        className={cardClass}
      >
        {body}
      </a>
    );
  }

  return <div className={cardClass}>{body}</div>;
};
