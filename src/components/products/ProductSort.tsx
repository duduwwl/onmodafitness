"use client";

import { ChevronDown } from "lucide-react";
import { sortOptions, type SortKey } from "@/lib/catalog";

export function ProductSort({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <div className="relative">
      <label htmlFor="catalog-sort" className="sr-only">
        Ordenar por
      </label>
      <select
        id="catalog-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-12 cursor-pointer appearance-none rounded-full bg-[var(--color-white)] text-[var(--color-ink)] pr-11 pl-5 outline-none focus-visible:shadow-[0_0_0_2px_var(--color-ink)]"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2" aria-hidden />
    </div>
  );
}
