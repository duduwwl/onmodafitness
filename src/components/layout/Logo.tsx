import { cn } from "@/lib/format";

/** Monograma "on" redesenhado em SVG a partir da identidade da loja. */
export function OnMark({ className, strokeWidth = 4.2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 50" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
      <circle cx="23" cy="27" r="19.5" />
      <path d="M53 46.5V27a19.5 19.5 0 0 1 39 0v19.5" />
    </svg>
  );
}

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <OnMark className="h-7 w-auto" />
      {withText && (
        <span aria-hidden="true" className="font-display text-[0.84rem] leading-none font-light tracking-[0.22em] uppercase">
          ModΛ Fitness
        </span>
      )}
      <span className="sr-only">ON Moda Fitness</span>
    </span>
  );
}
