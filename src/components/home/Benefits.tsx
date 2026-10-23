import { AnimatedGroup } from "@/components/ui/motion-primitives";

const items = [
  {
    title: "Conforto para sua rotina.",
    text: "Tecidos com elasticidade e cós que não enrola, do treino das seis ao fim do dia.",
  },
  {
    title: "Peças que valorizam seus movimentos.",
    text: "Modelagens que acompanham o agachamento, a corrida e o alongamento sem ficar transparentes.",
  },
  {
    title: "Estilo dentro e fora da academia.",
    text: "Combinações pensadas para sair do treino direto para a rua, sem trocar de roupa.",
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="container-x py-14 lg:py-20">
        <h2 id="beneficios-title" className="sr-only">
          Por que vestir ON
        </h2>
        <AnimatedGroup as="ul" itemAs="li" className="grid gap-10 md:grid-cols-3 md:gap-[clamp(1.5rem,4vw,5rem)]">
          {items.map((it) => (
            <div key={it.title}>
              <p className="font-display text-[clamp(1.45rem,1.1rem+1vw,2rem)] leading-[1.1] font-light tracking-tight">{it.title}</p>
              <p className="mt-3 max-w-[38ch] text-white/75">{it.text}</p>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
