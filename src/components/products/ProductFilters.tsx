"use client";

import { allSizes, categories, colorSwatches, priceBounds, products } from "@/data/products";
import type { Filters } from "@/lib/catalog";
import { cn, formatPrice } from "@/lib/format";
import type { CategorySlug, ColorName, Size } from "@/types/product";

type Props = {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onClear: () => void;
  idPrefix?: string;
};

const colorNames = Object.keys(colorSwatches) as ColorName[];

function toggle<T>(arr: T[], v: T) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function ProductFilters({ filters, onChange, onClear, idPrefix = "f" }: Props) {
  const countFor = (slug: CategorySlug) => products.filter((p) => p.category === slug).length;

  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="mb-3 font-medium">Categorias</legend>
        <ul className="space-y-0.5">
          <li>
            <button
              type="button"
              aria-pressed={filters.categories.length === 0}
              onClick={() => onChange({ categories: [] })}
              className={cn(
                "flex w-full items-center justify-between rounded-full px-3 py-2 text-left transition-colors",
                filters.categories.length === 0 ? "bg-[var(--color-ink)] text-[var(--color-paper)]" : "hover:bg-[var(--color-stone)]",
              )}
            >
              Todos <span className="text-[0.875rem] opacity-70">{products.length}</span>
            </button>
          </li>
          {categories.map((c) => {
            const on = filters.categories.includes(c.slug);
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange({ categories: toggle(filters.categories, c.slug) })}
                  className={cn(
                    "flex w-full items-center justify-between rounded-full px-3 py-2 text-left transition-colors",
                    on ? "bg-[var(--color-ink)] text-[var(--color-paper)]" : "hover:bg-[var(--color-stone)]",
                  )}
                >
                  {c.plural} <span className="text-[0.875rem] opacity-70">{countFor(c.slug)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-medium">Tamanhos disponíveis</legend>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s: Size) => (
            <button
              key={s}
              type="button"
              aria-pressed={filters.sizes.includes(s)}
              onClick={() => onChange({ sizes: toggle(filters.sizes, s) })}
              className="chip"
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-medium">Cores</legend>
        <div className="grid grid-cols-2 gap-1">
          {colorNames.map((c) => {
            const on = filters.colors.includes(c);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => onChange({ colors: toggle(filters.colors, c) })}
                className={cn(
                  "flex items-center gap-2.5 rounded-full px-2.5 py-2 text-left transition-colors",
                  on ? "bg-[var(--color-ink)] text-[var(--color-paper)]" : "hover:bg-[var(--color-stone)]",
                )}
              >
                <span
                  className="size-5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
                  style={{ background: colorSwatches[c], boxShadow: on ? "0 0 0 2px var(--color-paper)" : undefined }}
                  aria-hidden
                />
                {c}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 font-medium">Preço</legend>
        <p className="mb-4 text-[0.95rem] text-[var(--color-ink-soft)] tabular-nums" aria-live="polite">
          {formatPrice(filters.min)} até {formatPrice(filters.max)}
        </p>
        <PriceRange idPrefix={idPrefix} min={filters.min} max={filters.max} onChange={(min, max) => onChange({ min, max })} />
      </fieldset>

      <button type="button" onClick={onClear} className="btn btn-ghost w-full">
        Limpar filtros
      </button>
    </div>
  );
}

function PriceRange({ min, max, onChange, idPrefix }: { min: number; max: number; onChange: (min: number, max: number) => void; idPrefix: string }) {
  const { min: lo, max: hi } = priceBounds;
  const step = 10;
  const pct = (v: number) => ((v - lo) / (hi - lo)) * 100;
  return (
    <div>
      <div className="relative h-8">
        <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-[var(--color-stone)]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--color-ink)]"
          style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }}
        />
        <label htmlFor={`${idPrefix}-min`} className="sr-only">
          Preço mínimo
        </label>
        <input
          id={`${idPrefix}-min`}
          type="range"
          min={lo}
          max={hi}
          step={step}
          value={min}
          onChange={(e) => onChange(Math.min(Number(e.target.value), max - step), max)}
          className="range-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
        />
        <label htmlFor={`${idPrefix}-max`} className="sr-only">
          Preço máximo
        </label>
        <input
          id={`${idPrefix}-max`}
          type="range"
          min={lo}
          max={hi}
          step={step}
          value={max}
          onChange={(e) => onChange(min, Math.max(Number(e.target.value), min + step))}
          className="range-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="text-[0.875rem] text-[var(--color-ink-soft)]">
          Mínimo (R$)
          <input
            type="number"
            inputMode="numeric"
            min={lo}
            max={max}
            step={step}
            value={min}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v)) onChange(Math.max(lo, Math.min(v, max - step)), max);
            }}
            className="mt-1 h-11 w-full rounded-full bg-[var(--color-white)] px-4 text-[var(--color-ink)] tabular-nums outline-none focus-visible:shadow-[0_0_0_2px_var(--color-ink)]"
          />
        </label>
        <label className="text-[0.875rem] text-[var(--color-ink-soft)]">
          Máximo (R$)
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={hi}
            step={step}
            value={max}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v)) onChange(min, Math.min(hi, Math.max(v, min + step)));
            }}
            className="mt-1 h-11 w-full rounded-full bg-[var(--color-white)] px-4 text-[var(--color-ink)] tabular-nums outline-none focus-visible:shadow-[0_0_0_2px_var(--color-ink)]"
          />
        </label>
      </div>
    </div>
  );
}
