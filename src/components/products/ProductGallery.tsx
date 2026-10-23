"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/format";
import type { ProductImage } from "@/types/product";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = images[index];
  const go = (d: number) => setIndex((i) => (i + d + images.length) % images.length);

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
      <div className="grid gap-3 lg:grid-cols-[5rem_1fr]">
        {images.length > 1 && (
          <ul className="order-2 flex gap-2 lg:order-none lg:flex-col" aria-label="Miniaturas">
            {images.map((img, i) => (
              <li key={img.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver imagem ${i + 1} de ${images.length}`}
                  aria-current={i === index}
                  className={cn("block w-16 transition-opacity lg:w-20", i === index ? "opacity-100 shadow-[0_0_0_2px_var(--color-ink)]" : "opacity-60 hover:opacity-100")}
                >
                  <Photo src={img.src} alt="" ratio={3 / 4} width={160} sizes="80px" position={img.position} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={cn("relative overflow-hidden", images.length === 1 && "lg:col-span-2")}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={current.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <button type="button" onClick={() => setZoom(true)} className="group block w-full cursor-zoom-in" aria-label="Ampliar imagem">
                <Photo src={current.src} alt={current.alt} ratio={4 / 5} width={1100} sizes="(min-width:1024px) 50vw, 100vw" priority position={current.position} />
                <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-[var(--color-paper)] opacity-90 transition-opacity group-hover:opacity-100" aria-hidden>
                  <Maximize2 className="size-4" />
                </span>
              </button>
            </motion.div>
          </AnimatePresence>
          {images.length > 1 && (
            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-between">
              <button type="button" onClick={() => go(-1)} className="pointer-events-auto grid size-11 place-items-center rounded-full bg-[var(--color-paper)]" aria-label="Imagem anterior">
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button type="button" onClick={() => go(1)} className="pointer-events-auto grid size-11 place-items-center rounded-full bg-[var(--color-paper)]" aria-label="Próxima imagem">
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>
      {current.fromStore && <p className="mt-2 text-[0.875rem] text-[var(--color-ink-soft)]">Foto publicada no Instagram da ON.</p>}

      <Dialog.Root open={zoom} onOpenChange={setZoom}>
        <AnimatePresence>
          {zoom && (
            <Dialog.Portal forceMount>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-[var(--color-paper)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Dialog.Title className="sr-only">{name}: imagem ampliada</Dialog.Title>
                  <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} className="h-[100svh] w-full max-w-[min(100vw,82svh)] py-4">
                    <Photo src={current.src} alt={current.alt} ratio={4 / 5} width={1600} sizes="100vw" className="!aspect-auto h-full" imgClassName="!object-contain" position={current.position} />
                  </motion.div>
                  <Dialog.Close className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-[var(--color-white)]" aria-label="Fechar imagem ampliada">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                  {images.length > 1 && (
                    <>
                      <button type="button" onClick={() => go(-1)} className="absolute top-1/2 left-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-white)]" aria-label="Imagem anterior">
                        <ChevronLeft className="size-5" aria-hidden />
                      </button>
                      <button type="button" onClick={() => go(1)} className="absolute top-1/2 right-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-white)]" aria-label="Próxima imagem">
                        <ChevronRight className="size-5" aria-hidden />
                      </button>
                    </>
                  )}
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
}
