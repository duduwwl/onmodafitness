"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { InView } from "@/components/ui/motion-primitives";
import { categories, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

const fmtDate = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });

export function NewArrivals() {
  const items = [...products].filter((p) => p.isNew).sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  const [active, setActive] = useState(items[0]);

  return (
    <section aria-labelledby="novidades-title" className="container-x pt-28 lg:pt-44">
      <InView>
        <h2 id="novidades-title" className="max-w-[14ch] text-[clamp(2.5rem,1.6rem+3.6vw,4.25rem)] leading-[0.98] lg:indent-[3vw]">
          Acabou de chegar na arara.
        </h2>
      </InView>

      <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-x-[clamp(0.75rem,1.6vw,1.75rem)]">
        <div className="order-2 lg:order-none lg:col-span-4 lg:self-end">
          <Link href={`/produtos/${active.slug}/`} className="ml-auto block w-[60%] lg:ml-0 lg:w-full" aria-label={`Ver ${active.name}`}>
            <div className="relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Photo src={active.images[0].src} alt={active.images[0].alt} ratio={4 / 5} width={760} sizes="(min-width:1024px) 30vw, 60vw" position={active.images[0].position} />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-2 text-[0.9rem] text-[var(--color-ink-soft)]">{active.shortDescription}</p>
          </Link>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="mb-3 text-[0.875rem] text-[var(--color-ink-soft)]">Lançamentos</p>
          <ul>
            {items.map((p, i) => (
              <li key={p.id} className={i > 0 && i % 4 === 0 ? "mt-7" : ""}>
                <Link
                  href={`/produtos/${p.slug}/`}
                  onMouseEnter={() => setActive(p)}
                  onFocus={() => setActive(p)}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 py-3 sm:grid-cols-[9.5rem_1fr_auto]"
                >
                  <span className="whitespace-nowrap text-[0.9rem] text-[var(--color-ink-soft)] sm:col-auto">
                    {categories.find((c) => c.slug === p.category)?.label} · {fmtDate.format(new Date(`${p.releaseDate}T12:00:00`)).replace(" de ", " ").replace(".", "")}
                  </span>
                  <span className="order-3 col-span-2 font-medium sm:order-none sm:col-span-1">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                      {p.name}
                    </span>
                  </span>
                  <span className="row-start-1 flex items-center gap-1 justify-self-end tabular-nums sm:row-auto">
                    {formatPrice(p.price)}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
