"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductSort } from "./ProductSort";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { categories, priceBounds } from "@/data/products";
import { activeFilterCount, applyFilters, filtersToQuery, parseFilters, type Filters } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

const PAGE = 12;

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [filters, setFilters] = useState<Filters>(() => parseFilters(new URLSearchParams(params.toString())));
  const [visible, setVisible] = useState(PAGE);
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState(filters.q);

  // Mantém o estado sincronizado se a URL mudar por navegação (ex.: link de categoria)
  useEffect(() => {
    const next = parseFilters(new URLSearchParams(params.toString()));
    setFilters(next);
    setQuery((cur) => (cur.trim() === next.q ? cur : next.q));
  }, [params]);

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    setVisible(PAGE);
    const qs = filtersToQuery(next);
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };

  // Busca com pequeno atraso para não reescrever a URL a cada tecla
  useEffect(() => {
    if (query === filters.q) return;
    const t = window.setTimeout(() => update({ q: query }), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const clear = () => {
    setQuery("");
    update({ categories: [], sizes: [], colors: [], min: priceBounds.min, max: priceBounds.max, q: "" });
  };

  const results = useMemo(() => applyFilters(filters), [filters]);
  const shown = results.slice(0, visible);
  const nActive = activeFilterCount(filters);

  const title =
    filters.categories.length === 1
      ? categories.find((c) => c.slug === filters.categories[0])?.plural ?? "Todos os produtos"
      : "Todos os produtos";

  const chips: { key: string; label: string; remove: () => void }[] = [
    ...filters.categories.map((c) => ({
      key: `c-${c}`,
      label: categories.find((x) => x.slug === c)?.plural ?? c,
      remove: () => update({ categories: filters.categories.filter((x) => x !== c) }),
    })),
    ...filters.sizes.map((s) => ({ key: `s-${s}`, label: `Tam. ${s}`, remove: () => update({ sizes: filters.sizes.filter((x) => x !== s) }) })),
    ...filters.colors.map((c) => ({ key: `k-${c}`, label: c, remove: () => update({ colors: filters.colors.filter((x) => x !== c) }) })),
    ...(filters.min > priceBounds.min || filters.max < priceBounds.max
      ? [{ key: "p", label: `${formatPrice(filters.min)}–${formatPrice(filters.max)}`, remove: () => update({ min: priceBounds.min, max: priceBounds.max }) }]
      : []),
    ...(filters.q ? [{ key: "q", label: `“${filters.q}”`, remove: () => { setQuery(""); update({ q: "" }); } }] : []),
  ];

  return (
    <div className="container-x pb-32">
      <header className="pt-8 pb-10 lg:pt-12 lg:pb-14">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Produtos", href: filters.categories.length ? "/produtos/" : undefined }, ...(filters.categories.length === 1 ? [{ label: title }] : [])]} />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h1 className="text-[clamp(2.75rem,1.4rem+5.2vw,6rem)] leading-[0.95] font-light">{title}</h1>
          <p className="max-w-[40ch] text-[var(--color-ink-soft)]">
            Peças escolhidas a dedo para treinar e sair. Preços e estoque desta vitrine são ilustrativos.
          </p>
        </div>
      </header>

      {/* Barra de ferramentas */}
      <div className="sticky top-0 z-30 -mx-[var(--gutter)] bg-[var(--color-paper)]/95 px-[var(--gutter)] py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1 basis-full sm:basis-auto">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[var(--color-ink-soft)]" aria-hidden />
            <label htmlFor="catalog-search" className="sr-only">
              Buscar por nome
            </label>
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, cor ou peça…"
              className="h-12 w-full rounded-full bg-[var(--color-white)] pr-4 pl-11 outline-none placeholder:text-[#9c9893] focus-visible:shadow-[0_0_0_2px_var(--color-ink)] sm:max-w-[26rem]"
            />
          </div>
          <button type="button" onClick={() => setDrawer(true)} className="btn btn-light !min-h-12 lg:!hidden">
            <SlidersHorizontal className="size-4" aria-hidden /> Filtros
            {nActive > 0 && <span className="grid size-5 place-items-center rounded-full bg-[var(--color-ink)] text-[0.75rem] text-[var(--color-paper)]">{nActive}</span>}
          </button>
          <p className="ml-auto text-[0.95rem] text-[var(--color-ink-soft)] tabular-nums" aria-live="polite" role="status">
            {results.length} {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
          <ProductSort value={filters.sort} onChange={(sort) => update({ sort })} />
        </div>
        <AnimatePresence initial={false}>
          {chips.length > 0 && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap items-center gap-2 overflow-hidden pt-3"
              aria-label="Filtros ativos"
            >
              {chips.map((c) => (
                <li key={c.key}>
                  <button type="button" onClick={c.remove} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[var(--color-stone)] pr-2.5 pl-3.5 text-[0.9rem] hover:bg-[#dedbd7]" aria-label={`Remover filtro ${c.label}`}>
                    {c.label} <X className="size-3.5" aria-hidden />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={clear} className="link-underline ml-1 text-[0.9rem]">
                  Limpar filtros
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-x-[clamp(0.75rem,1.6vw,1.75rem)]">
        <aside className="hidden lg:col-span-3 lg:block" aria-label="Filtros">
          <div className="sticky top-[6.5rem] max-h-[calc(100svh-7.5rem)] overflow-y-auto pr-4 pb-6 no-scrollbar">
            <ProductFilters filters={filters} onChange={update} onClear={clear} idPrefix="desk" />
          </div>
        </aside>

        <section className="lg:col-span-9" aria-label="Resultados">
          {results.length === 0 ? (
            <div className="flex min-h-[40svh] flex-col items-start justify-center gap-4 bg-[var(--color-white)] p-8 lg:p-14">
              <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">Nenhuma peça com esses filtros.</p>
              <p className="max-w-[46ch] text-[var(--color-ink-soft)]">Tire um filtro ou amplie a faixa de preço. Se procura algo específico, a loja responde no WhatsApp.</p>
              <button type="button" onClick={clear} className="btn btn-ink mt-2">
                Limpar filtros
              </button>
            </div>
          ) : (
            <LayoutGroup>
              <motion.ul layout className="grid grid-cols-2 gap-x-[clamp(0.75rem,1.6vw,1.75rem)] gap-y-12 md:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {shown.map((p, i) => (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i % PAGE, 8) * 0.03 } }}
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                    >
                      <ProductCard product={p} priority={i < 3} sizes="(min-width:1024px) 24vw, (min-width:768px) 31vw, 47vw" />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </LayoutGroup>
          )}

          {results.length > visible && (
            <div className="mt-16 flex flex-col items-center gap-3">
              <p className="text-[0.95rem] text-[var(--color-ink-soft)]">
                Mostrando {shown.length} de {results.length}
              </p>
              <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-ink">
                Carregar mais
              </button>
            </div>
          )}
          {results.length > 0 && results.length <= visible && results.length > PAGE && (
            <p className="mt-16 text-center text-[0.95rem] text-[var(--color-ink-soft)]">Você viu todas as {results.length} peças.</p>
          )}
        </section>
      </div>

      {/* Gaveta de filtros no celular */}
      <Dialog.Root open={drawer} onOpenChange={setDrawer}>
        <AnimatePresence>
          {drawer && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div className="fixed inset-0 z-[60] bg-[#111]/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88svh] flex-col rounded-t-[1.75rem] bg-[var(--color-paper)]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 36 }}
                >
                  <div className="flex items-center justify-between px-5 pt-4 pb-2">
                    <Dialog.Title className="font-display text-2xl">Filtros</Dialog.Title>
                    <Dialog.Close className="grid size-11 place-items-center rounded-full hover:bg-[var(--color-stone)]" aria-label="Fechar filtros">
                      <X className="size-5" aria-hidden />
                    </Dialog.Close>
                  </div>
                  <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                    <ProductFilters filters={filters} onChange={update} onClear={clear} idPrefix="mob" />
                  </div>
                  <div className="bg-[var(--color-white)] px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <button type="button" onClick={() => setDrawer(false)} className="btn btn-ink w-full">
                      Ver {results.length} {results.length === 1 ? "produto" : "produtos"}
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
}
