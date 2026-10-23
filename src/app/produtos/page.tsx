import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/products/Catalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos",
  description: `Leggings, tops, shorts, macacões, conjuntos, camisetas e regatas. ${products.length} peças com filtros por tamanho, cor e preço.`,
  alternates: { canonical: "produtos/" },
  openGraph: { title: "Produtos · ON Moda Fitness", url: "produtos/" },
};

export default function ProdutosPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <Catalog />
    </Suspense>
  );
}

function CatalogSkeleton() {
  return (
    <div className="container-x pb-32" aria-busy="true" aria-label="Carregando produtos">
      <div className="pt-12 pb-14">
        <div className="h-4 w-40 animate-pulse rounded-full bg-[var(--color-stone)]" />
        <div className="mt-6 h-16 w-2/3 max-w-xl animate-pulse rounded-full bg-[var(--color-stone)]" />
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:ml-[25%] lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] animate-pulse bg-[var(--color-stone)]" />
            <div className="mt-3 h-4 w-3/4 animate-pulse rounded-full bg-[var(--color-stone)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
