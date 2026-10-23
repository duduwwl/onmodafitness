"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRe.test(email.trim())) {
      setState("error");
      return;
    }
    setState("sending");
    // Demonstração: nada é enviado nem armazenado.
    window.setTimeout(() => setState("done"), 700);
  };

  return (
    <section aria-labelledby="newsletter-title" className="container-x pt-40 pb-32 lg:pt-52 lg:pb-44">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-[clamp(0.75rem,1.6vw,1.75rem)]">
        <h2 id="newsletter-title" className="max-w-[18ch] text-[clamp(1.6rem,1.1rem+2vw,2.25rem)] leading-[1.12] font-light lg:col-span-5">
          Novidades da arara, antes de todo mundo.
        </h2>
        <div className="hidden lg:col-span-2 lg:col-start-7 lg:block">
          <Photo src="ig:ig-09" alt="Blusas de tela coloridas da ON" ratio={1} width={360} sizes="12vw" position="50% 35%" />
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <AnimatePresence mode="wait" initial={false}>
            {state === "done" ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="status">
                <p className="flex items-center gap-2 text-[1.125rem] font-medium">
                  <Check className="size-5" aria-hidden /> Inscrição simulada com sucesso.
                </p>
                <p className="mt-2 text-[var(--color-ink-soft)]">
                  Esta é uma demonstração: o e-mail {email} não foi enviado nem armazenado. Para novidades reais, siga{" "}
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline">
                    {site.instagramHandle}
                  </a>
                  .
                </p>
                <button type="button" className="link-underline mt-4" onClick={() => { setEmail(""); setState("idle"); }}>
                  Usar outro e-mail
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <label htmlFor="newsletter-email" className="text-[1.125rem] font-medium">
                  Seu melhor e-mail
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    name="email"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    aria-invalid={state === "error"}
                    aria-describedby="newsletter-hint"
                    placeholder="nome@email.com"
                    className="min-h-12 min-w-0 flex-1 rounded-full bg-[var(--color-white)] px-5 outline-none placeholder:text-[#9c9893] focus-visible:shadow-[0_0_0_2px_var(--color-ink)] aria-[invalid=true]:shadow-[0_0_0_2px_var(--color-rose-deep)]"
                  />
                  <button type="submit" className="btn btn-ink" disabled={state === "sending"}>
                    {state === "sending" ? "Enviando…" : "Quero receber"}
                  </button>
                </div>
                <p id="newsletter-hint" className={state === "error" ? "mt-3 text-[0.9rem] font-medium text-[var(--color-rose-deep)]" : "mt-3 text-[0.9rem] text-[var(--color-ink-soft)]"} aria-live="polite">
                  {state === "error" ? "Digite um e-mail válido, como nome@email.com." : "Formulário demonstrativo: nenhum dado é enviado."}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
