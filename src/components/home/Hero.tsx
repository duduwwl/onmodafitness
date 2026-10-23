"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";

const words = ["Vista", "sua", "melhor", "versão."];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const driftSlow = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden pb-24 lg:pb-36">
      <div className="container-x pt-6 lg:pt-10">
        <h1 id="hero-title" className="font-display text-[clamp(3.2rem,13.5vw,6rem)] leading-[0.92] font-light tracking-[-0.045em] lg:text-[clamp(4rem,6.9vw,9rem)] lg:whitespace-nowrap">
          {words.map((w, i) => (
            <motion.span
              key={w}
              className="inline-block pr-[0.22em]"
              initial={reduce ? false : { opacity: 0, y: "0.35em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.08 }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {/* Texto e ações no celular vêm antes das fotos para ficarem na primeira tela */}
        <div className="mt-6 max-w-[34ch] lg:hidden">
          <HeroCopy />
        </div>
      </div>

      {/* Trilho de fotos: três tamanhos pendurados na mesma linha */}
      <div className="container-x mt-10 lg:mt-12">
        <div className="relative grid grid-cols-12 items-start gap-x-[clamp(0.75rem,1.6vw,1.75rem)]">
          {/* Pequena, 1:1 — foto real da loja */}
          <motion.figure
            className="order-2 col-span-5 col-start-8 -mt-20 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mt-0"
            style={reduce ? undefined : { y: driftSlow }}
          >
            <Photo
              src="ig:ig-04"
              alt="Cliente da ON de regata off-white e legging marrom na academia"
              ratio={1}
              width={360}
              sizes="(min-width:1024px) 15vw, 38vw"
              position="50% 30%"
              priority
            />
            <figcaption className="mt-2 text-[0.875rem] text-[var(--color-ink-soft)]">Regata Daily, no Instagram da ON</figcaption>
          </motion.figure>

          {/* Grande, 3:4 — abre como um obturador */}
          <figure className="order-1 col-span-9 lg:order-none lg:col-span-4 lg:col-start-4 lg:row-start-1">
            <div className={reduce ? "" : "shutter"}>
              <Photo
                src="photo-1645810798586-08e892108d67"
                alt="Mulher de top e legging na academia, sob luz quente"
                ratio={3 / 4}
                width={880}
                sizes="(min-width:1024px) 34vw, 72vw"
                priority
              />
            </div>
            <figcaption className="mt-2 max-w-[70%] text-[0.875rem] text-[var(--color-ink-soft)] lg:max-w-none">Top e legging para treino de força</figcaption>
          </figure>

          {/* Paisagem 16:10 — corre para fora da margem direita */}
          <motion.figure
            className="order-3 col-span-12 mt-6 -mr-[var(--gutter)] -ml-[var(--gutter)] lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:ml-0"
            style={reduce ? undefined : { y: drift }}
          >
            <Photo
              src="photo-1618259181324-86a49fe68099"
              alt="Mulher em postura de equilíbrio num estúdio de paredes de tijolo"
              ratio={16 / 10}
              width={1100}
              sizes="(min-width:1024px) 36vw, 100vw"
              priority
            />
            <figcaption className="mt-2 px-[var(--gutter)] text-[0.875rem] text-[var(--color-ink-soft)] lg:px-0">
              Peças que acompanham do alongamento ao agachamento
            </figcaption>
          </motion.figure>

          {/* Texto no desktop: sob a foto pequena */}
          <div className="hidden lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:mt-[calc(15.5vw+4.5rem)] lg:block">
            <HeroCopy />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-lead leading-snug">Performance, conforto e estilo para acompanhar cada movimento.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/produtos/" className="btn btn-ink">
          Explorar coleção
        </Link>
        <Link href="/#sobre" className="btn btn-ghost">
          Conhecer a ON
        </Link>
      </div>
    </motion.div>
  );
}
