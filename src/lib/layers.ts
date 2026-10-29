// Tailwind only generates classes it sees written out, so each layer is a full class string.
type ZIndexClass = `z-${string}`;

export const LAYER = {
  header: "z-[70]",
  mobileMenu: "z-[60]",
  enlargedPhoto: "z-50",
  actionBar: "z-40",
  inSection: "z-10",
} as const satisfies Record<string, ZIndexClass>;
