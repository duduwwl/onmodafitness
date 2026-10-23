"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Photo } from "@/components/ui/Photo";
import { InView } from "@/components/ui/motion-primitives";
import { useCart } from "@/components/cart/CartProvider";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import type { Product, Size } from "@/types/product";

const tops = products.filter((p) => ["tops", "regatas", "camisetas"].includes(p.category));
const bottoms = products.filter((p) => ["leggings", "shorts"].includes(p.category));

/**
 * Provador: a cliente combina uma peça de cima e uma de baixo dentro de molduras em arco —
 * o arco do "n" do logotipo vira o espelho do provador.
 */
export function LookBuilder() {
  const [ti, setTi] = useState(tops.findIndex((p) => p.slug === "blusa-tela-amarradinho"));
  const [bi, setBi] = useState(0);
  const [sizes, setSizes] = useState<{ top?: Size; bottom?: Size }>({});
  const [tried, setTried] = useState(false);
  const { add } = useCart();
  const top = tops[ti];
  const bottom = bottoms[bi];
  const total = top.price + bottom.price;

  const message = useMemo(
    () =>
      `Olá! Montei este look no provador do site e queria ajuda com tamanho e disponibilidade:\n• ${top.name}${sizes.top ? ` (tam. ${sizes.top})` : ""}\n• ${bottom.name}${sizes.bottom ? ` (tam. ${sizes.bottom})` : ""}`,
    [top, bottom, sizes],
  );

  const addLook = () => {
    setTried(true);
    if (!sizes.top || !sizes.bottom) {
      toast.error("Escolha o tamanho das duas peças para levar o look.");
      return;
    }
    add({ product: top, size: sizes.top, color: top.colors[0].label }, { silent: true });
    add({ product: bottom, size: sizes.bottom, color: bottom.colors[0].label }, { silent: true, openDrawer: true });
    toast.success("Look adicionado à sacola");
  };

  return (
    <section id="provador" aria-labelledby="provador-title" className="mt-28 bg-[var(--color-rose-wash)] py-24 lg:mt-44 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-x-[clamp(0.75rem,1.6vw,1.75rem)]">
        <InView className="lg:col-span-4">
          <h2 id="provador-title" className="max-w-[12ch] text-[var(--text-title)]">
            Monte seu look no provador.
          </h2>
          <p className="mt-5 max-w-[40ch]">
            Na loja, a gente te ajuda a combinar as peças. Aqui você testa antes: escolha a parte de cima e a de baixo e veja o look inteiro.
          </p>
          <div className="mt-8 flex items-baseline justify-between gap-4 lg:block">
            <p className="text-[0.95rem] text-[var(--color-ink-soft)]">Look completo</p>
            <p className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-none tabular-nums">{formatPrice(total)}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={addLook} className="btn btn-ink">
              Levar o look
            </button>
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Pedir ajuda no WhatsApp
            </a>
          </div>
        </InView>

        <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,2rem)] lg:col-span-7 lg:col-start-6">
          <Mirror
            label="Parte de cima"
            list={tops}
            index={ti}
            onIndex={(i) => {
              setTi(i);
              setSizes((s) => ({ ...s, top: undefined }));
            }}
            size={sizes.top}
            onSize={(s) => setSizes((v) => ({ ...v, top: s }))}
            invalid={tried && !sizes.top}
          />
          <Mirror
            label="Parte de baixo"
            list={bottoms}
            index={bi}
            onIndex={(i) => {
              setBi(i);
              setSizes((s) => ({ ...s, bottom: undefined }));
            }}
            size={sizes.bottom}
            onSize={(s) => setSizes((v) => ({ ...v, bottom: s }))}
            invalid={tried && !sizes.bottom}
            offset
          />
        </div>
      </div>
    </section>
  );
}

function Mirror({
  label,
  list,
  index,
  onIndex,
  size,
  onSize,
  invalid,
  offset,
}: {
  label: string;
  list: Product[];
  index: number;
  onIndex: (i: number) => void;
  size?: Size;
  onSize: (s: Size) => void;
  invalid?: boolean;
  offset?: boolean;
}) {
  const p = list[index];
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    onIndex((index + d + list.length) % list.length);
  };
  const groupId = `${label.replace(/\s/g, "-").toLowerCase()}-tamanhos`;

  return (
    <div className={offset ? "lg:mt-24" : ""}>
      <p className="mb-3 text-[0.95rem] text-[var(--color-ink-soft)]">{label}</p>
      <div className="relative overflow-hidden rounded-t-[999px] bg-[var(--color-white)] p-[clamp(0.4rem,0.8vw,0.75rem)]">
        <div className="relative overflow-hidden rounded-t-[999px]">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={p.id}
              custom={dir}
              initial={{ x: `${dir * 60}%`, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: `${dir * -60}%`, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Photo src={p.images[0].src} alt={p.images[0].alt} ratio={3 / 4.6} width={640} sizes="(min-width:1024px) 28vw, 46vw" position={p.images[0].position} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
          <button type="button" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full bg-[var(--color-paper)] hover:bg-[var(--color-white)]" aria-label={`${label}: peça anterior`}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full bg-[var(--color-paper)] hover:bg-[var(--color-white)]" aria-label={`${label}: próxima peça`}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3" aria-live="polite">
        <Link href={`/produtos/${p.slug}/`} className="font-medium hover:underline">
          {p.name}
        </Link>
        <span className="tabular-nums">{formatPrice(p.price)}</span>
      </div>
      <div className="mt-3">
        <p id={groupId} className={invalid ? "mb-2 text-[0.9rem] font-medium text-[var(--color-rose-deep)]" : "mb-2 text-[0.9rem] text-[var(--color-ink-soft)]"}>
          {invalid ? "Escolha um tamanho" : "Tamanho"}
        </p>
        <div role="radiogroup" aria-labelledby={groupId} className="flex flex-wrap gap-1.5">
          {p.sizes.map((s) => {
            const ok = (p.stock[s] ?? 0) > 0;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                disabled={!ok}
                onClick={() => onSize(s)}
                className="chip !min-h-10 !min-w-10 !px-2.5 !text-[0.875rem]"
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
