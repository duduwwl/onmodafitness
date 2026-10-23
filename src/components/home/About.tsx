import { Photo } from "@/components/ui/Photo";
import { InView } from "@/components/ui/motion-primitives";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="container-x pt-28 lg:pt-44">
      <InView className="max-w-[60rem]">
        <h2 id="sobre-title" className="text-[clamp(2.5rem,1.6rem+3.4vw,4rem)]">
          A dona veste primeiro.
        </h2>
        <p className="mt-6 max-w-[46ch] text-lead leading-snug">
          A ON é uma loja de moda fitness em Lavras. Cada peça é escolhida a dedo e testada no próprio treino antes de entrar na arara: se não aguenta um agachamento, não entra.
        </p>
      </InView>

      <div className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-12">
        <InView className="relative lg:col-span-8">
          <Photo
            src="photo-1597586785094-c9c247ec343f"
            alt="Mulher alongando-se no chão de um estúdio amplo"
            ratio={16 / 10}
            width={1400}
            sizes="(min-width:1024px) 64vw, 100vw"
          />
          <blockquote className="bg-[var(--color-paper)] pt-5 lg:absolute lg:top-0 lg:right-0 lg:w-[22rem] lg:p-6">
            <p className="font-display text-[1.45rem] leading-[1.2] font-light tracking-tight">
              “Eu não uso porque vendo; eu vendo porque eu uso!”
            </p>
            <footer className="mt-3 text-[0.9rem] text-[var(--color-ink-soft)]">
              Do Instagram da ON,{" "}
              <a href="https://www.instagram.com/onmodafitness_/reel/Dd4EnjqxjhW/" target="_blank" rel="noopener noreferrer" className="underline">
                setembro de 2026
              </a>
            </footer>
          </blockquote>
        </InView>

        <InView className="lg:col-span-4" delay={0.1}>
          <div className="relative grid aspect-[3/2] place-items-center overflow-hidden bg-[var(--color-rose)] lg:aspect-[5/4]">
            <StreetMap />
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-[0.95rem]">
            <div>
              <dt className="text-[var(--color-ink-soft)]">Endereço</dt>
              <dd className="mt-1">Rua Otacílio Negrão de Lima, 303, loja D</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-soft)]">Referência</dt>
              <dd className="mt-1">{site.address.reference}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-soft)]">Na loja</dt>
              <dd className="mt-1">Provador e ajuda para montar o look</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-soft)]">Pedidos</dt>
              <dd className="mt-1">Pelo direct ou WhatsApp</dd>
            </div>
          </dl>
        </InView>
      </div>
    </section>
  );
}

/** Ilustração (não é um mapa em escala): a rua da loja, com o ponto da ON. */
function StreetMap() {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Ilustração da localização da loja na Rua Otacílio Negrão de Lima, bairro Retiro, Lavras">
      <g fill="none" stroke="#111" strokeLinecap="round">
        <path d="M-10 170 C 90 150, 170 160, 240 120 S 360 60, 420 70" strokeWidth="16" strokeOpacity="0.9" />
        <path d="M120 -10 L 150 280" strokeWidth="6" strokeOpacity="0.35" />
        <path d="M300 -10 L 270 280" strokeWidth="6" strokeOpacity="0.35" />
        <path d="M-10 60 L 420 30" strokeWidth="5" strokeOpacity="0.25" />
        <path d="M-10 240 L 420 225" strokeWidth="5" strokeOpacity="0.25" />
      </g>
      <circle cx="232" cy="124" r="15" fill="#f7f5f2" />
      <circle cx="232" cy="124" r="7" fill="#111" />
      <text x="252" y="156" fontFamily="var(--font-inter)" fontSize="14" fill="#111">ON · nº 303</text>
      <text x="16" y="196" fontFamily="var(--font-inter)" fontSize="12" fill="#111" opacity="0.8">R. Otacílio Negrão de Lima</text>
    </svg>
  );
}
