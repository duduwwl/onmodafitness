import Link from "next/link";
import { categories } from "@/data/products";
import { imageUrl } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";
import { OnMark } from "./Logo";
import { navLinks } from "./nav";

/**
 * Footer "sticky" (referência: Fancy Components — Sticky Footer): fica atrás do
 * conteúdo principal e é revelado quando o <main> termina de rolar.
 */
export function Footer() {
  const bg = imageUrl("photo-1434682881908-b43d0467b798", { w: 2000, h: 1300 });
  return (
    <footer id="contato" className="on-dark sticky bottom-0 z-0 min-h-[100svh] overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bg}
        alt=""
        aria-hidden
        width={2000}
        height={1300}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[60%_30%] brightness-[0.42]"
      />
      <div className="container-x relative flex min-h-[100svh] flex-col pt-[calc(var(--header-h)+1.5rem)] pb-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 className="font-display text-[1.6rem] leading-tight font-light tracking-tight">Venha provar na loja.</h2>
            <address className="mt-4 not-italic leading-relaxed text-white/85">
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city}
              <br />
              {site.address.reference}
            </address>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block">
              Abrir no mapa
            </a>
          </div>
          <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-6">
            <h2 className="text-[0.95rem] text-white/60">Navegação</h2>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <h2 className="text-[0.95rem] text-white/60">Categorias</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/produtos/?categoria=${c.slug}`} className="hover:underline">
                    {c.plural}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-[0.95rem] text-white/60">Atendimento</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={whatsappLink("Olá! Vim pelo site da ON Moda Fitness.")} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li>
                <Link href="/politicas/" className="hover:underline">
                  Trocas e privacidade (modelo)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto pt-16">
          <p aria-hidden className="flex items-end gap-[3vw] leading-none">
            <OnMark className="h-auto w-[44vw] max-w-[46rem]" strokeWidth={3.4} />
            <span className="mb-[1.2vw] font-display text-[clamp(1.1rem,4.4vw,5.5rem)] font-extralight tracking-[0.18em] uppercase">
              ModΛ Fitness
            </span>
          </p>
          <div className="mt-6 flex flex-col gap-2 text-[0.875rem] text-white/65 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} ON Moda Fitness · Lavras, MG. Site demonstrativo: preços e estoque são ilustrativos.</p>
            <p>
              Fotos de produto demonstrativas:{" "}
              <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline">
                Unsplash
              </a>
              . Fotos de clientes e looks: {site.instagramHandle}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
