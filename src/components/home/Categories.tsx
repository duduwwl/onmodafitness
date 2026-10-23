"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { InView } from "@/components/ui/motion-primitives";
import { products } from "@/data/products";
import type { CategorySlug } from "@/types/product";

const panels: { label: string; slugs: CategorySlug[]; href: string; img: string; alt: string; grow: number }[] = [
  { label: "Leggings", slugs: ["leggings"], href: "/produtos/?categoria=leggings", img: "photo-1599751449353-779b810ebb37", alt: "Mulher de legging preta na rua", grow: 5 },
  { label: "Tops", slugs: ["tops"], href: "/produtos/?categoria=tops", img: "photo-1759476530727-8468861ca3b1", alt: "Mulher de top rosa ao ar livre", grow: 2 },
  { label: "Shorts", slugs: ["shorts"], href: "/produtos/?categoria=shorts", img: "photo-1628970990401-6bff2927482a", alt: "Mulher de top laranja e short preto", grow: 3 },
  { label: "Macacões", slugs: ["macacoes"], href: "/produtos/?categoria=macacoes", img: "photo-1790725568042-5bf3ba6e7898", alt: "Duas mulheres de macacões azul-claro e roxo", grow: 2 },
  { label: "Conjuntos", slugs: ["conjuntos"], href: "/produtos/?categoria=conjuntos", img: "photo-1650791305357-83cb50bc5c0b", alt: "Mulher de conjunto mostarda num tapete de yoga", grow: 3 },
  { label: "Camisetas e regatas", slugs: ["camisetas", "regatas"], href: "/produtos/?categoria=camisetas,regatas", img: "photo-1720247207417-efc4365d5169", alt: "Mulher de top e short em casa, junto à janela", grow: 2 },
];

export function Categories() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="colecoes" aria-labelledby="categorias-title" className="pt-28 lg:pt-44">
      <InView className="container-x mb-10 grid grid-cols-12 lg:mb-16">
        <h2 id="categorias-title" className="col-span-12 text-[var(--text-title)] lg:col-span-6 lg:col-start-3">
          Escolha por peça
        </h2>
        <p className="col-span-12 mt-4 max-w-[44ch] text-[var(--color-ink-soft)] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          Da legging de compressão à blusa que cobre tudo. Toque numa categoria para ver as peças.
        </p>
      </InView>

      {/* Desktop: faixa de painéis desiguais que se abrem ao passar o mouse */}
      <div className="hidden h-[68svh] min-h-[30rem] md:flex" onMouseLeave={() => setHover(null)}>
        {panels.map((p, i) => {
          const count = products.filter((pr) => p.slugs.includes(pr.category)).length;
          return (
            <motion.div
              key={p.label}
              className="relative min-w-0 overflow-hidden"
              animate={{ flexGrow: hover === i ? 6 : p.grow }}
              initial={false}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ flexBasis: 0 }}
              onMouseEnter={() => setHover(i)}
            >
              <Link href={p.href} className="group absolute inset-0 block" onFocus={() => setHover(i)} onBlur={() => setHover(null)}>
                <Photo src={p.img} alt={p.alt} ratio={0.5} width={900} sizes="40vw" className="!absolute inset-0 !aspect-auto h-full" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(17,17,17,0.6),transparent)]" />
                <span className="absolute bottom-5 left-5 right-5 text-[var(--color-paper)]">
                  <span className="block font-display text-[clamp(1.25rem,1.6vw,1.9rem)] leading-tight whitespace-nowrap">{p.label}</span>
                  <span className="text-[0.9rem] text-white/80">{count} peças</span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Celular: blocos desiguais, dois por linha */}
      <div className="flex flex-wrap md:hidden">
        {panels.map((p, i) => {
          const row = Math.floor(i / 2);
          const wide = (i % 2 === 0) !== (row % 2 === 1);
          const count = products.filter((pr) => p.slugs.includes(pr.category)).length;
          return (
            <Link
              key={p.label}
              href={p.href}
              className="relative block h-[30svh] min-h-[13rem] overflow-hidden"
              style={{ width: wide ? "64%" : "36%" }}
            >
              <Photo src={p.img} alt={p.alt} ratio={0.6} width={600} sizes="64vw" className="!absolute inset-0 !aspect-auto h-full" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(17,17,17,0.6),transparent)]" />
              <span className="absolute bottom-3 left-3 right-3 text-[var(--color-paper)]">
                <span className="block font-display text-[1.15rem] leading-tight">{p.label}</span>
                <span className="text-[0.875rem] text-white/80">{count} peças</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
