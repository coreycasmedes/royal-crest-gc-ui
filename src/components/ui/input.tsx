import * as React from "react";
import { cn } from "@/lib/utils";

// 16px text: iOS Safari zooms the page into any field set smaller.
export const fieldClass = cn(
  "w-full rounded-md border border-text/15 bg-bg px-3 text-base text-text",
  "placeholder:text-text/65 hover:border-text/30 transition-colors duration-200",
  "focus-visible:border-accent-ink focus-visible:ring-2 focus-visible:ring-accent-ink/25 focus-visible:outline-none",
  "aria-[invalid=true]:border-red-600 disabled:cursor-not-allowed disabled:opacity-50",
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldClass, "h-11", className)} {...props} />
  ),
);
Input.displayName = "Input";

export { Input };
