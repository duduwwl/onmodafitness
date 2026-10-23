"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Photo } from "@/components/ui/Photo";

/** Tríptico que sobe com a rolagem (palco fixo dentro de um invólucro de 200svh). */
export function FeaturedCollection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const centerY = useTransform(scrollYProgress, [0, 0.85], ["58%", "0%"]);
  const centerScale = useTransform(scrollYProgress, [0, 0.85], [0.82, 1]);
  const sideY = useTransform(scrollYProgress, [0, 0.85], ["78%", "6%"]);
  const leftX = useTransform(scrollYProgress, [0, 0.85], ["0%", "-18%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.85], ["0%", "18%"]);

  return (
    <section ref={ref} aria-labelledby="colecao-title" className={reduce ? "relative py-28" : "relative h-[200svh] mt-28 lg:mt-44"}>
      <div className={reduce ? "" : "sticky top-0 flex h-[100svh] flex-col overflow-hidden"}>
        <div className="container-x pt-[calc(var(--header-h)+1.5rem)] text-center">
          <h2 id="colecao-title" className="mx-auto max-w-[16ch] text-title">
            Feita para acompanhar seu ritmo.
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[var(--color-ink-soft)]">
            Conjuntos em tons de verde, cacau e azul que funcionam juntos ou separados, para quem treina cedo e segue o dia sem trocar de roupa.
          </p>
          <Link href="/produtos/?categoria=conjuntos" className="btn btn-ink mt-6">
            Ver conjuntos
          </Link>
        </div>

        <div className="relative mt-8 flex flex-1 items-start justify-center gap-[10px]">
          <motion.div className="hidden w-[min(24vw,360px)] shrink-0 sm:block" style={reduce ? undefined : { y: sideY, x: leftX }}>
            <Photo src="photo-1649888317149-05d953c9fef8" alt="Mulher de conjunto verde agachada com as mãos unidas" ratio={360 / 530} width={720} sizes="24vw" />
          </motion.div>
          <motion.div
            className="w-[min(72vw,760px)] shrink-0 sm:w-[min(46vw,760px)]"
            style={reduce ? undefined : { y: centerY, scale: centerScale, transformOrigin: "50% 0%" }}
          >
            <Photo src="photo-1649887974297-4be052375a67" alt="Mulher de conjunto verde em agachamento num estúdio claro" ratio={4 / 5} width={1200} sizes="(min-width:640px) 46vw, 72vw" />
          </motion.div>
          <motion.div className="hidden w-[min(24vw,360px)] shrink-0 sm:block" style={reduce ? undefined : { y: sideY, x: rightX }}>
            <Photo src="photo-1649888216899-047093431441" alt="Estúdio de treino claro com janelas amplas" ratio={360 / 530} width={720} sizes="24vw" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
