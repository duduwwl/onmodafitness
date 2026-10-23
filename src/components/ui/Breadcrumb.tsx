import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-[0.9rem] text-[var(--color-ink-soft)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.label}-${i}`} className="flex items-center gap-1.5">
              {it.href && !last ? (
                <Link href={it.href} className="hover:text-[var(--color-ink)] hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-[var(--color-ink)]" : undefined}>
                  {it.label}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
