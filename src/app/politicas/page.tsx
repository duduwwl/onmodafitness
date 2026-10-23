import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trocas e privacidade (modelo)",
  description: "Modelo demonstrativo de política de trocas e privacidade para o site da ON Moda Fitness.",
  robots: { index: false },
};

export default function PoliticasPage() {
  return (
    <div className="container-x pb-32">
      <div className="pt-6 lg:pt-10">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Trocas e privacidade" }]} />
      </div>
      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <h1 className="text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] leading-[0.98] font-light">Trocas e privacidade</h1>
          <p className="mt-6 max-w-[40ch] bg-[var(--color-rose-wash)] p-5">
            Texto-modelo para o protótipo. Ele não representa a política oficial da loja e deve ser revisado pela ON antes da publicação.
          </p>
        </header>
        <div className="max-w-[62ch] space-y-10 lg:col-span-6 lg:col-start-7">
          <section>
            <h2 className="text-[1.75rem]">Trocas</h2>
            <p className="mt-3">
              Sugestão de redação: peças sem uso, com etiqueta e na embalagem original podem ser trocadas em até 7 dias após a compra, mediante contato prévio. Peças em promoção e roupas íntimas podem ter regras próprias.
            </p>
            <p className="mt-3">
              Para combinar uma troca, fale com a loja pelo{" "}
              <a href={whatsappLink("Olá! Gostaria de saber sobre trocas.")} target="_blank" rel="noopener noreferrer" className="underline">
                WhatsApp {site.whatsappDisplay}
              </a>{" "}
              ou vá até a loja em {site.address.city}.
            </p>
          </section>
          <section>
            <h2 className="text-[1.75rem]">Privacidade</h2>
            <p className="mt-3">
              Este site demonstrativo não coleta dados pessoais. A sacola fica salva apenas no seu navegador (armazenamento local) e o formulário de novidades não envia nem guarda e-mails.
            </p>
            <p className="mt-3">
              Ao finalizar pelo WhatsApp, a mensagem é aberta no seu aplicativo e só é enviada se você confirmar.
            </p>
          </section>
          <Link href="/produtos/" className="btn btn-ink">
            Voltar aos produtos
          </Link>
        </div>
      </div>
    </div>
  );
}
