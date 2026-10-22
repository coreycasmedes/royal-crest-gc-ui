// Stacking scale for the whole site. Tailwind only generates classes it can
// see written out in full, so each layer is a complete class string.
//
//   70  header: fixed, above everything
//   60  mobile menu overlay: opens under the header
//   50  enlarged portfolio photo (ui/layout-grid.tsx)
//   40  mobile quick-contact bar; a portfolio photo while it shrinks back
//   10  layering inside one section (hero text over its background,
//       the portfolio's dimming backdrop)
export const LAYER = {
  header: "z-[70]",
  mobileMenu: "z-[60]",
  enlargedPhoto: "z-50",
  actionBar: "z-40",
  inSection: "z-10",
} as const;
