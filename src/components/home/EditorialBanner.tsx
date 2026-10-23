"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { imageSrcSet, imageUrl } from "@/lib/images";

export function EditorialBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const id = "photo-1699065186298-7f963b0d8c81";

  return (
    <section ref={ref} aria-labelledby="editorial-title" className="relative mt-28 h-[86svh] min-h-[32rem] overflow-hidden bg-[var(--color-ink)] lg:mt-44 lg:h-[92svh]">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale, y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl(id, { w: 1800, h: 1100 })}
          srcSet={imageSrcSet(id, 1800 / 1100, [800, 1200, 1800, 2400])}
          sizes="100vw"
          alt="Mulher de top e short pretos numa quadra à beira-mar ao entardecer"
          loading="lazy"
          className="h-full w-full object-cover object-[50%_40%]"
        />
      </motion.div>
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,17,0.72)_0%,rgba(17,17,17,0.15)_55%,transparent_80%)]" />
      <div className="on-dark container-x relative flex h-full flex-col justify-end pb-[clamp(2.5rem,7vh,5rem)] text-[var(--color-paper)]">
        <h2 id="editorial-title" className="max-w-[11ch] text-[var(--text-display)] leading-[0.9] font-light">
          Seu movimento. Seu estilo.
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p className="max-w-[40ch] text-white/85">Peças que aguentam o treino de verdade e ainda ficam bonitas no espelho.</p>
          <Link href="/produtos/" className="btn btn-light">
            Ver a coleção
          </Link>
        </div>
      </div>
    </section>
  );
}
