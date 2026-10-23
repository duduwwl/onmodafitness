"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartLine, Product, Size } from "@/types/product";

const STORAGE_KEY = "on-moda-fitness:cart:v1";

type AddInput = { product: Product; size: Size; color: string; quantity?: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  open: () => void;
  close: () => void;
  setOpen: (v: boolean) => void;
  add: (input: AddInput, opts?: { silent?: boolean; openDrawer?: boolean }) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Persistência local (somente neste navegador)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* armazenamento indisponível: carrinho só em memória */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignora */
    }
  }, [lines, hydrated]);

  const add = useCallback<CartContextValue["add"]>(({ product, size, color, quantity = 1 }, opts) => {
    const key = `${product.id}|${size}|${color}`;
    const max = product.stock[size] ?? 9;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(max, l.quantity + quantity) } : l));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          size,
          color,
          image: product.images[0].src,
          quantity: Math.min(max, quantity),
        },
      ];
    });
    if (!opts?.silent) {
      toast.success(`${product.name} adicionado à sacola`, {
        description: `Tamanho ${size} · ${color}`,
        action: { label: "Ver sacola", onClick: () => setOpen(true) },
      });
    }
    if (opts?.openDrawer) setOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 9) } : l)),
    );
  }, []);

  const linesRef = useRef(lines);
  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  const clear = useCallback(() => {
    const backup = linesRef.current;
    setLines([]);
    if (backup.length) {
      toast("Sacola esvaziada", { action: { label: "Desfazer", onClick: () => setLines(backup) } });
    }
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = Math.round(lines.reduce((n, l) => n + l.price * l.quantity, 0) * 100) / 100;
    return {
      lines,
      count,
      subtotal,
      isOpen,
      hydrated,
      open: () => setOpen(true),
      close: () => setOpen(false),
      setOpen,
      add,
      remove,
      setQuantity,
      clear,
    };
  }, [lines, isOpen, hydrated, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
