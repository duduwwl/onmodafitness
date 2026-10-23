import { Photo } from "@/components/ui/Photo";
import { AnimatedGroup, InView } from "@/components/ui/motion-primitives";
import { site } from "@/lib/site";
import { cn } from "@/lib/format";

/** Fotos reais publicadas no perfil @onmodafitness_ (incluindo collabs), com link para cada post. */
const posts = [
  { img: "ig:ig-01", href: "https://www.instagram.com/onmodafitness_/reel/DezoL9VRduX/", alt: "Cliente de camiseta de tela e calça flare marrons diante de um espelho", caption: "“Vem pra ON”, out. 2026" },
  { img: "ig:ig-03", href: "https://www.instagram.com/p/Dekm9LbBGeK/", alt: "Cliente de conjunto rosa na academia com o texto 2027 é tudo nosso", caption: "Collab com @bariporcris", ratio: 585 / 640 },
  { img: "ig:ig-07", href: "https://www.instagram.com/onmodafitness_/reel/Dd4EnjqxjhW/", alt: "Cliente de regata de tela com amarração e legging preta", caption: "“Eu vendo porque eu uso”" },
  { img: "ig:ig-09", href: "https://www.instagram.com/onmodafitness_/reel/DdrHcl_uBq6/", alt: "Blusas de tela em várias cores dispostas sobre uma mesa", caption: "A cartela da blusa de tela" },
  { img: "ig:ig-08", href: "https://www.instagram.com/onmodafitness_/reel/Dd15K4RPjYe/", alt: "Modelo de regata e legging cinza em estúdio", caption: "Ajuda para montar o look" },
  { img: "ig:ig-11", href: "https://www.instagram.com/onmodafitness_/reel/DcMCMAcup6d/", alt: "Cliente de blusa caramelo comprida e legging branca no espelho da academia", caption: "A famosa blusa que tampa tudo" },
  { img: "ig:ig-04", href: "https://www.instagram.com/onmodafitness_/reel/Dehx35BBoRR/", alt: "Cliente de regata off-white e legging marrom na academia", caption: "Empreendedorismo feminino" },
  { img: "ig:ig-05", href: "https://www.instagram.com/bariporcris/reel/DefsDSYt94N/", alt: "Cliente de costas, de top e short rosa, treinando ombros", caption: "Treino de costas, em rosa" },
];

const offsets = ["lg:mt-0", "lg:mt-24", "lg:mt-10", "lg:mt-36", "lg:-mt-8", "lg:mt-16", "lg:mt-2", "lg:mt-24"];

export function InstagramGallery() {
  return (
    <section aria-labelledby="instagram-title" className="container-x pt-28 lg:pt-44">
      <InView className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="instagram-title" className="text-title">
            Quem usa ON
          </h2>
          <p className="mt-4 max-w-[44ch] text-[var(--color-ink-soft)]">
            Clientes, amigas e a própria dona, no espelho da academia. Tudo direto do nosso perfil.
          </p>
        </div>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
          Seguir {site.instagramHandle}
        </a>
      </InView>

      <AnimatedGroup className="mt-12 grid grid-cols-2 gap-x-[clamp(0.75rem,1.6vw,1.75rem)] gap-y-8 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4" stagger={0.07}>
        {posts.map((p, i) => (
          <a key={p.img} href={p.href} target="_blank" rel="noopener noreferrer" className={cn("group block", offsets[i], i % 2 === 1 && "mt-10 sm:mt-0")}>
            <div className="overflow-hidden">
              <Photo
                src={p.img}
                alt={p.alt}
                ratio={p.ratio ?? 9 / 14}
                width={360}
                sizes="(min-width:1024px) 22vw, 45vw"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-2 text-[0.875rem] text-[var(--color-ink-soft)] group-hover:text-[var(--color-ink)]">{p.caption}</p>
          </a>
        ))}
      </AnimatedGroup>
    </section>
  );
}
