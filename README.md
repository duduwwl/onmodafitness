# ON Moda Fitness — site

Site da **ON Moda Fitness** (moda fitness, Lavras – MG): landing page, catálogo com filtros, página de produto, provador de looks e sacola demonstrativa.

**Publicado em:** https://duduwwl.github.io/onmodafitness/

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing: hero, benefícios, categorias, coleção em destaque, mais desejados, banner editorial, novidades, provador (monte seu look), sobre, Instagram, newsletter demonstrativa |
| `/produtos/` | Catálogo: busca, filtros (categoria, tamanho, cor, preço), ordenação, filtros sincronizados com a URL, "Carregar mais" |
| `/produtos/[slug]/` | 32 páginas de produto: galeria com ampliação, cor, tamanho, guia de medidas, quantidade, tecido e cuidados, relacionados |
| `/politicas/` | Modelo de política de trocas e privacidade (texto a revisar pela loja) |

## Stack

Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind CSS 4, Motion, Radix (Dialog, Accordion), Sonner, Lucide. Componentes de animação adaptados de **Motion Primitives** (InView, AnimatedGroup, SlidingNumber); footer "sticky" segundo o padrão do **Fancy Components**; gaveta, toasts e acordeão no padrão shadcn usado pela **Watermelon UI**.

## O que é demonstrativo

- Produtos, preços, composições, estoque e datas de lançamento são **fictícios** (`src/data/products.ts`).
- Fotos de produto marcadas com Unsplash são demonstrativas (licença Unsplash, servidas pelo CDN do Unsplash).
- Fotos em `public/images/ig/` vêm de publicações públicas do Instagram @onmodafitness_ — confirmar autorização de uso das clientes antes de lançar.
- A sacola fica no `localStorage`; "Finalizar pelo WhatsApp" abre uma mensagem para o número publicado no Linktree da loja. Não há pagamento.
- A newsletter não envia nem armazena dados.

## Rodar localmente

```bash
npm ci
npm run dev          # http://localhost:3000
npm run build        # gera ./out (export estático)
```

Para testar o build com o mesmo caminho do GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/onmodafitness npm run build`.

## Deploy

Cada push na `main` roda `.github/workflows/deploy.yml`, que gera o export estático e publica no GitHub Pages.
