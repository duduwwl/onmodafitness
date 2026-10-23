import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70svh] flex-col items-start justify-center gap-6 py-24">
      <h1 className="text-[clamp(2.75rem,1.6rem+4vw,5rem)] leading-[0.98] font-light">Esta página não existe.</h1>
      <p className="max-w-[44ch] text-[var(--color-ink-soft)]">O endereço pode ter mudado. As peças continuam no catálogo.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/produtos/" className="btn btn-ink">
          Ver produtos
        </Link>
        <Link href="/" className="btn btn-ghost">
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
