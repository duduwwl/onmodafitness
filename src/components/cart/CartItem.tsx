"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/types/product";
import { useCart } from "./CartProvider";

export function CartItem({ line }: { line: CartLine }) {
  const { setQuantity, remove, close } = useCart();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
      className="grid grid-cols-[5.5rem_1fr] gap-4 py-5"
    >
      <Link href={`/produtos/${line.slug}/`} onClick={close} className="block">
        <Photo src={line.image} alt={line.name} ratio={3 / 4} width={180} sizes="88px" />
      </Link>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/produtos/${line.slug}/`} onClick={close} className="font-medium leading-snug hover:underline">
            {line.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(line.key)}
            className="-mr-2 -mt-1 grid size-9 shrink-0 place-items-center rounded-full hover:bg-[var(--color-stone)]"
            aria-label={`Remover ${line.name} da sacola`}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <p className="mt-1 text-[0.9rem] text-[var(--color-ink-soft)]">
          Tamanho {line.size} · {line.color}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full bg-[var(--color-white)]" role="group" aria-label={`Quantidade de ${line.name}`}>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full hover:bg-[var(--color-stone)]"
              onClick={() => setQuantity(line.key, line.quantity - 1)}
              aria-label="Diminuir quantidade"
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <span className="w-7 text-center tabular-nums" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full hover:bg-[var(--color-stone)] disabled:opacity-40"
              onClick={() => setQuantity(line.key, line.quantity + 1)}
              disabled={line.quantity >= 9}
              aria-label="Aumentar quantidade"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
          <span className="tabular-nums font-medium">{formatPrice(line.price * line.quantity)}</span>
        </div>
      </div>
    </motion.li>
  );
}
