"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {children}
        <CartDrawer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#f7f5f2",
              border: "none",
              borderRadius: "999px",
              fontFamily: "var(--font-inter)",
            },
            actionButtonStyle: { background: "#c68d96", color: "#111111", borderRadius: "999px" },
          }}
        />
      </CartProvider>
    </MotionConfig>
  );
}
