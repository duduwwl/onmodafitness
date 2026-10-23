"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { SlidingPrice } from "@/components/ui/motion-primitives";
import { whatsappLink } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { CartItem } from "./CartItem";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { isOpen, setOpen, lines, count, subtotal, close, clear } = useCart();

  const message = [
    "Olá! Montei esta sacola no site da ON Moda Fitness e gostaria de confirmar disponibilidade:",
    "",
    ...lines.map((l) => `• ${l.quantity}x ${l.name} — tam. ${l.size}, ${l.color} (${formatPrice(l.price * l.quantity)})`),
    "",
    `Subtotal de referência: ${formatPrice(subtotal)}`,
  ].join("\n");

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-[#111]/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby="cart-desc">
              <motion.aside
                className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[28rem] flex-col bg-[var(--color-paper)] shadow-2xl outline-none"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 36 }}
              >
                <header className="flex items-center justify-between px-6 pt-5 pb-3">
                  <Dialog.Title className="font-display text-2xl tracking-tight">
                    Sacola <span className="text-[var(--color-ink-soft)]">({count})</span>
                  </Dialog.Title>
                  <Dialog.Close className="grid size-11 place-items-center rounded-full hover:bg-[var(--color-stone)]" aria-label="Fechar sacola">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </header>
                <Dialog.Description id="cart-desc" className="sr-only">
                  Itens adicionados à sacola de compras demonstrativa
                </Dialog.Description>

                {lines.length === 0 ? (
                  <div className="flex flex-1 flex-col items-start justify-center gap-5 px-6 pb-24">
                    <p className="font-display text-3xl leading-tight tracking-tight">Sua sacola está vazia.</p>
                    <p className="text-[var(--color-ink-soft)]">Escolha uma peça, o tamanho e a cor: ela aparece aqui.</p>
                    <Link href="/produtos/" onClick={close} className="btn btn-ink">
                      Ver produtos
                    </Link>
                  </div>
                ) : (
                  <>
                    <ul className="flex-1 overflow-y-auto overscroll-contain px-6">
                      <AnimatePresence initial={false}>
                        {lines.map((line) => (
                          <CartItem key={line.key} line={line} />
                        ))}
                      </AnimatePresence>
                    </ul>
                    <footer className="bg-[var(--color-white)] px-6 pt-5 pb-6">
                      <div className="flex items-baseline justify-between">
                        <span>Subtotal</span>
                        <span className="font-display text-2xl">
                          <SlidingPrice value={subtotal} />
                        </span>
                      </div>
                      <p className="mt-1 text-[0.875rem] text-[var(--color-ink-soft)]">
                        Preços ilustrativos. Frete, pagamento e disponibilidade são confirmados pela loja.
                      </p>
                      <a
                        href={whatsappLink(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ink mt-5 w-full"
                      >
                        Finalizar pelo WhatsApp
                      </a>
                      <div className="mt-3 flex items-center justify-between text-[0.9rem]">
                        <button type="button" onClick={close} className="link-underline">
                          Continuar comprando
                        </button>
                        <button type="button" onClick={clear} className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                          Esvaziar sacola
                        </button>
                      </div>
                    </footer>
                  </>
                )}
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
