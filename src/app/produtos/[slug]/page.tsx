import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductGallery } from "@/components/products/ProductGallery";
import { AnimatedGroup } from "@/components/ui/motion-primitives";
import { categoryLabel, getProduct, imageCrop, products, relatedProducts } from "@/data/products";
import { imageUrl } from "@/lib/images";
import { BASE_PATH, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function ogImage(src: string) {
  const { id } = imageCrop(src);
  const url = imageUrl(id, { w: 1200, h: 1500 });
  return url.startsWith("http") ? url : `${SITE_URL}${url.slice(BASE_PATH.length)}`;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.shortDescription} ${categoryLabel(p.category)} da ON Moda Fitness, Lavras (MG).`,
    alternates: { canonical: `produtos/${p.slug}/` },
    openGraph: {
      title: `${p.name} · ON Moda Fitness`,
      description: p.shortDescription,
      url: `produtos/${p.slug}/`,
      images: [{ url: ogImage(p.images[0].src), alt: p.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categoryLabel(product.category),
    sku: product.id,
    image: [ogImage(product.images[0].src)],
    brand: { "@type": "Brand", name: "ON Moda Fitness" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/produtos/${product.slug}/`,
    },
  };

  return (
    <div className="container-x pb-32">
      <div className="pt-6 pb-8 lg:pt-10">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Produtos", href: "/produtos/" },
            { label: categoryLabel(product.category), href: `/produtos/?categoria=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[clamp(1rem,3vw,4rem)]">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        <div className="lg:col-span-5 lg:pt-2">
          <ProductDetails product={product} />
        </div>
      </div>

      <section aria-labelledby="relacionados-title" className="pt-28 lg:pt-40">
        <h2 id="relacionados-title" className="text-[var(--text-title)]">
          Combina com
        </h2>
        <AnimatedGroup className="mt-10 grid grid-cols-2 gap-x-[clamp(0.75rem,1.6vw,1.75rem)] gap-y-12 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </AnimatedGroup>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
