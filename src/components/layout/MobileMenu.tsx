"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import { navLinks } from "./nav";
import { Logo } from "./Logo";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="grid size-11 place-items-center rounded-full hover:bg-[var(--color-stone)] lg:hidden" aria-label="Abrir menu">
        <Menu className="size-5" aria-hidden strokeWidth={1.75} />
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="on-dark fixed inset-0 z-[80] flex flex-col bg-[var(--color-ink)] text-[var(--color-paper)]"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="container-x flex h-[var(--header-h)] items-center justify-between">
                  <Logo />
                  <Dialog.Close className="grid size-11 place-items-center rounded-full hover:bg-white/10" aria-label="Fechar menu">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <nav aria-label="Menu móvel" className="container-x flex flex-1 flex-col justify-center">
                  <ul className="space-y-1">
                    {navLinks.map((l, i) => (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 font-display text-[clamp(2.6rem,11vw,4.5rem)] leading-[1.05] font-light tracking-tight"
                        >
                          {l.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <motion.div
                  className="container-x pb-8 text-[0.95rem] text-white/75"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p>{site.address.street}, {site.address.city}</p>
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-underline mt-1 inline-block text-white">
                    {site.instagramHandle}
                  </a>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
