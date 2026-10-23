"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/format";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchDialog } from "./SearchDialog";
import { navLinks } from "./nav";

export function Header() {
  const { count, open, hydrated } = useCart();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - last.current;
    last.current = y;
    setScrolled(y > 24);
    if (y < 120) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  useEffect(() => setHidden(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/produtos") && pathname.startsWith("/produtos");

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-[var(--color-paper)]/95" : "bg-[var(--color-paper)]",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="-ml-1 rounded-sm px-1 py-2" aria-label="ON Moda Fitness, página inicial">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.95rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "relative py-2 transition-colors hover:text-[var(--color-ink)]",
                      isActive(l.href) ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]",
                    )}
                  >
                    {l.label}
                    {isActive(l.href) && (
                      <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[var(--color-ink)]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-11 place-items-center rounded-full hover:bg-[var(--color-stone)]"
              aria-label="Buscar produtos"
            >
              <Search className="size-5" aria-hidden strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={open}
              className="relative grid size-11 place-items-center rounded-full hover:bg-[var(--color-stone)]"
              aria-label={`Abrir sacola, ${count} ${count === 1 ? "item" : "itens"}`}
            >
              <ShoppingBag className="size-5" aria-hidden strokeWidth={1.75} />
              {hydrated && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute top-1 right-0.5 grid min-w-[1.15rem] place-items-center rounded-full bg-[var(--color-rose)] px-1 text-[0.72rem] leading-[1.15rem] font-semibold text-[var(--color-ink)] tabular-nums"
                  aria-hidden
                >
                  {count}
                </motion.span>
              )}
            </button>
            <MobileMenu />
          </div>
        </div>
      </motion.header>
      <div aria-hidden className="h-[var(--header-h)]" />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
