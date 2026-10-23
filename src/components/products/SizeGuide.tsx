"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Ruler, X } from "lucide-react";
import { useState } from "react";

const rows = [
  { size: "PP", bust: "76–80", waist: "58–62", hip: "84–88" },
  { size: "P", bust: "81–86", waist: "63–67", hip: "89–94" },
  { size: "M", bust: "87–92", waist: "68–73", hip: "95–100" },
  { size: "G", bust: "93–99", waist: "74–80", hip: "101–107" },
  { size: "GG", bust: "100–106", waist: "81–88", hip: "108–114" },
];

export function SizeGuide() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex items-center gap-1.5 text-[0.9rem] underline underline-offset-4 hover:no-underline">
        <Ruler className="size-4" aria-hidden /> Guia de medidas
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div className="fixed inset-0 z-[80] bg-[#111]/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed top-1/2 left-1/2 z-[90] w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 bg-[var(--color-paper)] p-6 shadow-2xl sm:p-8"
                initial={{ opacity: 0, y: "-46%" }}
                animate={{ opacity: 1, y: "-50%" }}
                exit={{ opacity: 0, y: "-46%" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <Dialog.Title className="font-display text-[1.75rem] leading-tight">Guia de medidas</Dialog.Title>
                  <Dialog.Close className="-mt-1 -mr-2 grid size-11 place-items-center rounded-full hover:bg-[var(--color-stone)]" aria-label="Fechar guia de medidas">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="mt-2 text-[0.95rem] text-[var(--color-ink-soft)]">
                  Tabela demonstrativa, em centímetros. Na dúvida entre dois tamanhos, a loja ajuda pelo WhatsApp ou no provador.
                </Dialog.Description>
                <table className="mt-6 w-full text-left tabular-nums">
                  <thead>
                    <tr className="text-[0.9rem] text-[var(--color-ink-soft)]">
                      <th scope="col" className="pb-2 font-normal">Tamanho</th>
                      <th scope="col" className="pb-2 font-normal">Busto</th>
                      <th scope="col" className="pb-2 font-normal">Cintura</th>
                      <th scope="col" className="pb-2 font-normal">Quadril</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.size} className="border-t border-[var(--color-stone)]">
                        <th scope="row" className="py-2.5 font-medium">{r.size}</th>
                        <td className="py-2.5">{r.bust}</td>
                        <td className="py-2.5">{r.waist}</td>
                        <td className="py-2.5">{r.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
