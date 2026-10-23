import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedGroup, InView } from "@/components/ui/motion-primitives";
import { products } from "@/data/products";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  return (
    <section aria-labelledby="desejados-title" className="container-x pt-28 lg:pt-40">
      <InView className="mb-10 flex flex-wrap items-end justify-between gap-4 lg:mb-14">
        <h2 id="desejados-title" className="text-title">
          Mais desejados
        </h2>
        <Link href="/produtos/?ordem=destaques" className="link-underline pb-1">
          Ver todos os produtos
        </Link>
      </InView>
      <AnimatedGroup className="grid grid-cols-2 gap-x-[clamp(0.75rem,1.6vw,1.75rem)] gap-y-12 lg:grid-cols-4" stagger={0.06}>
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </AnimatedGroup>
    </section>
  );
}
