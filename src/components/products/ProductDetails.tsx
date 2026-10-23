"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { categoryLabel } from "@/data/products";
import { cn, formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import type { Product, Size } from "@/types/product";
import { SizeGuide } from "./SizeGuide";

export function ProductDetails({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const stock = size ? product.stock[size] ?? 0 : 0;

  const onAdd = () => {
    if (!size) {
      setError(true);
      document.getElementById("size-group")?.focus();
      return;
    }
    add({ product, size, color: color.label, quantity: qty }, { openDrawer: true, silent: true });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <p className="text-[0.95rem] text-[var(--color-ink-soft)]">
        {categoryLabel(product.category)}
        {product.isNew && " · Novidade"}
      </p>
      <h1 className="mt-2 text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1] font-light">{product.name}</h1>
      <p className="mt-4 font-display text-[1.75rem] tabular-nums">{formatPrice(product.price)}</p>
      <p className="text-[0.9rem] text-[var(--color-ink-soft)]">Preço ilustrativo. Valor e condições reais são confirmados pela loja.</p>
      <p className="mt-6 max-w-[52ch]">{product.description}</p>

      {/* Cor */}
      <fieldset className="mt-8">
        <legend className="mb-3 text-[0.95rem]">
          Cor: <span className="font-medium">{color.label}</span>
        </legend>
        <div role="radiogroup" aria-label="Cor" className="flex flex-wrap gap-2">
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
                "grid size-11 place-items-center rounded-full transition-shadow",
                c.label === color.label ? "shadow-[0_0_0_2px_var(--color-ink)]" : "hover:shadow-[0_0_0_2px_#bdb9b4]",
              )}
            >
              <span className="size-8 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" style={{ background: c.hex }} />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Tamanho */}
      <fieldset className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          <legend className={cn("text-[0.95rem]", error && "font-medium text-[var(--color-rose-deep)]")}>
            {error ? "Escolha um tamanho para continuar" : size ? <>Tamanho: <span className="font-medium">{size}</span></> : "Tamanho"}
          </legend>
          <SizeGuide />
        </div>
        <div id="size-group" tabIndex={-1} role="radiogroup" aria-label="Tamanho" aria-invalid={error} className="flex flex-wrap gap-2 outline-none">
          {product.sizes.map((s) => {
            const n = product.stock[s] ?? 0;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                disabled={n === 0}
                onClick={() => {
                  setSize(s);
                  setError(false);
                  setQty((q) => Math.min(q, n));
                }}
                className="chip"
                aria-label={n === 0 ? `${s}, esgotado` : s}
              >
                {s}
              </button>
            );
          })}
        </div>
        <p className="mt-3 min-h-[1.5em] text-[0.9rem] text-[var(--color-ink-soft)]" aria-live="polite">
          {size && (stock <= 3 ? `Últimas ${stock} unidades no tamanho ${size} (estoque fictício).` : `Disponível no tamanho ${size}.`)}
        </p>
      </fieldset>

      {/* Quantidade + adicionar */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex h-12 items-center rounded-full bg-[var(--color-white)]" role="group" aria-label="Quantidade">
          <button type="button" className="grid size-12 place-items-center rounded-full hover:bg-[var(--color-stone)] disabled:opacity-40" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Diminuir quantidade">
            <Minus className="size-4" aria-hidden />
          </button>
          <span className="w-8 text-center tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full hover:bg-[var(--color-stone)] disabled:opacity-40"
            onClick={() => setQty((q) => Math.min(q + 1, size ? stock : 9))}
            disabled={size ? qty >= stock : qty >= 9}
            aria-label="Aumentar quantidade"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
        <button type="button" onClick={onAdd} className="btn btn-ink min-w-[14rem] flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="ok" className="inline-flex items-center gap-2" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}>
                <Check className="size-4" aria-hidden /> Adicionado
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}>
                Adicionar à sacola · {formatPrice(product.price * qty)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <a
        href={whatsappLink(`Olá! Tenho interesse na peça ${product.name}${size ? ` (tam. ${size})` : ""}, cor ${color.label}. Está disponível?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline mt-5 inline-block text-[0.95rem]"
      >
        Tirar dúvidas sobre esta peça no WhatsApp
      </a>

      <Accordion.Root type="multiple" defaultValue={["tecido"]} className="mt-10">
        {[
          { id: "tecido", title: "Tecido e composição", body: <p>{product.fabric}</p> },
          {
            id: "cuidados",
            title: "Cuidados",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            ),
          },
          {
            id: "entrega",
            title: "Entrega e trocas",
            body: (
              <p>
                Condições de exemplo: retirada na loja em Lavras ou envio combinado pelo WhatsApp. Política de trocas definida pela loja; consulte antes de comprar.
              </p>
            ),
          },
        ].map((item) => (
          <Accordion.Item key={item.id} value={item.id} className="mb-1.5 bg-[var(--color-white)] px-5">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left font-medium">
                {item.title}
                <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-[var(--color-ink-soft)] data-[state=closed]:animate-[acc-up_0.25s_ease] data-[state=open]:animate-[acc-down_0.3s_ease]">
              <div className="pb-5">{item.body}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
