"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryLabel, products } from "@/data/products";
import { Photo } from "@/components/ui/Photo";
import { formatPrice } from "@/lib/format";
import { normalize } from "@/lib/search";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => {
    const n = normalize(q.trim());
    if (!n) return [];
    return products
      .filter((p) => normalize(`${p.name} ${categoryLabel(p.category)} ${p.colors.map((c) => c.label).join(" ")}`).includes(n))
      .slice(0, 6);
  }, [q]);

  const close = () => {
    onOpenChange(false);
    setQ("");
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div className="fixed inset-0 z-[60] bg-[#111]/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-x-0 top-0 z-[70] max-h-[90svh] overflow-y-auto bg-[var(--color-paper)] shadow-xl"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
              >
                <Dialog.Title className="sr-only">Buscar produtos</Dialog.Title>
                <form
                  className="container-x flex items-center gap-3 py-5"
                  role="search"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const term = q.trim();
                    close();
                    router.push(term ? `/produtos/?q=${encodeURIComponent(term)}` : "/produtos/");
                  }}
                >
                  <Search className="size-6 shrink-0" aria-hidden strokeWidth={1.5} />
                  <label htmlFor="site-search" className="sr-only">
                    Buscar por nome, categoria ou cor
                  </label>
                  <input
                    id="site-search"
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Legging, top, macacão…"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent py-2 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-light tracking-tight outline-none placeholder:text-[#a5a19c]"
                  />
                  <Dialog.Close className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-[var(--color-stone)]" aria-label="Fechar busca">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </form>
                <div className="container-x pb-8" aria-live="polite">
                  {q.trim() && results.length === 0 && (
                    <p className="text-[var(--color-ink-soft)]">Nenhuma peça encontrada para “{q}”. Tente “legging” ou “conjunto”.</p>
                  )}
                  {results.length > 0 && (
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                      {results.map((p) => (
                        <li key={p.id}>
                          <Link href={`/produtos/${p.slug}/`} onClick={close} className="group block">
                            <Photo src={p.images[0].src} alt={p.images[0].alt} ratio={3 / 4} width={320} sizes="(min-width:1024px) 16vw, 45vw" position={p.images[0].position} />
                            <span className="mt-2 block text-[0.95rem] leading-snug group-hover:underline">{p.name}</span>
                            <span className="text-[0.9rem] text-[var(--color-ink-soft)]">{formatPrice(p.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.trim() && (
                    <button type="button" onClick={() => { const t = q.trim(); close(); router.push(`/produtos/?q=${encodeURIComponent(t)}`); }} className="link-underline mt-6 inline-block">
                      Ver todos os resultados no catálogo
                    </button>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
