"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { useCart } from "@/components/cart/CartProvider";
import { categoryLabel } from "@/data/products";
import { cn, formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

type Props = { product: Product; sizes?: string; priority?: boolean; className?: string };

export function ProductCard({ product, sizes = "(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw", priority, className }: Props) {
  const { add } = useCart();
  const [picking, setPicking] = useState(false);
  const [color, setColor] = useState(product.colors[0]);
  const hasAlt = product.images.length > 1;
  const href = `/produtos/${product.slug}/`;
  const available = product.sizes.filter((s) => (product.stock[s] ?? 0) > 0);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative">
        <Link href={href} className="block" aria-label={`${product.name}, ${formatPrice(product.price)}`}>
          <Photo
            src={product.images[0].src}
            alt={product.images[0].alt}
            ratio={3 / 4}
            width={600}
            sizes={sizes}
            priority={priority}
            position={product.images[0].position}
            imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.035]"
          />
          {hasAlt && (
            <Photo
              src={product.images[1].src}
              alt=""
              ratio={3 / 4}
              width={600}
              sizes={sizes}
              className="!absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:hidden"
            />
          )}
        </Link>

        {(product.isNew || product.featured) && (
          <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-[var(--color-paper)] px-2.5 py-1 text-[0.8rem] font-medium">
            {product.isNew ? "Novidade" : "Mais pedido"}
          </span>
        )}

        <div className="absolute inset-x-2 bottom-2">
          <AnimatePresence initial={false} mode="wait">
            {picking ? (
              <motion.div
                key="sizes"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.22 }}
                className="rounded-[1.4rem] bg-[var(--color-paper)] p-2"
              >
                <div className="flex items-center justify-between px-2 pt-0.5 pb-1.5">
                  <span className="text-[0.875rem] font-medium">Escolha o tamanho</span>
                  <button type="button" onClick={() => setPicking(false)} className="grid size-8 place-items-center rounded-full hover:bg-[var(--color-stone)]" aria-label="Cancelar">
                    <X className="size-4" aria-hidden />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => {
                    const ok = (product.stock[s] ?? 0) > 0;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!ok}
                        className="chip !min-h-10 !min-w-10 flex-1 !px-2 !text-[0.875rem]"
                        onClick={() => {
                          add({ product, size: s, color: color.label });
                          setPicking(false);
                        }}
                        aria-label={ok ? `Adicionar tamanho ${s}` : `Tamanho ${s} esgotado`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key="add" className="flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button
                  type="button"
                  onClick={() => setPicking(true)}
                  disabled={available.length === 0}
                  className="btn btn-light !min-h-11 !px-4 text-[0.9rem] transition-[opacity,transform] duration-300 lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 [@media(hover:none)]:!translate-y-0 [@media(hover:none)]:!opacity-100"
                  aria-label={`Adicionar ${product.name} à sacola`}
                >
                  <Plus className="size-4" aria-hidden /> Adicionar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-sans text-[1rem] leading-snug font-medium tracking-normal">
            <Link href={href} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[0.9rem] text-[var(--color-ink-soft)]">
            {categoryLabel(product.category)} · {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
          </p>
        </div>
        <p className="shrink-0 tabular-nums">{formatPrice(product.price)}</p>
      </div>
      {product.colors.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5" role="radiogroup" aria-label={`Cores de ${product.name}`}>
          {product.colors.map((c) => (
            <button
              key={c.label}
              type="button"
              role="radio"
              aria-checked={c.label === color.label}
              aria-label={c.label}
              title={c.label}
              onClick={() => setColor(c)}
              className={cn(
                "grid size-7 place-items-center rounded-full transition-shadow",
                c.label === color.label ? "shadow-[0_0_0_1.5px_var(--color-ink)]" : "hover:shadow-[0_0_0_1.5px_#b9b5b0]",
              )}
            >
              <span className="size-4.5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" style={{ background: c.hex }} />
            </button>
          ))}
          {product.colors.length > 1 && <span className="ml-1 text-[0.875rem] text-[var(--color-ink-soft)]">{color.label}</span>}
        </div>
      )}
    </article>
  );
}
