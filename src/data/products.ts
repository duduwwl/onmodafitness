import type {
  CategorySlug,
  ColorName,
  Product,
  ProductColor,
  ProductImage,
  Size,
} from "@/types/product";

/* ------------------------------------------------------------------ */
/* Catálogo DEMONSTRATIVO. Nomes, preços, composições e estoques são   */
/* fictícios e servem apenas para o protótipo navegável.               */
/* ------------------------------------------------------------------ */

export const categories: { slug: CategorySlug; label: string; plural: string }[] = [
  { slug: "leggings", label: "Legging", plural: "Leggings" },
  { slug: "tops", label: "Top", plural: "Tops" },
  { slug: "shorts", label: "Short", plural: "Shorts" },
  { slug: "macacoes", label: "Macacão", plural: "Macacões" },
  { slug: "conjuntos", label: "Conjunto", plural: "Conjuntos" },
  { slug: "camisetas", label: "Camiseta", plural: "Camisetas" },
  { slug: "regatas", label: "Regata", plural: "Regatas" },
];

export const categoryLabel = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.plural ?? slug;

export const allSizes: Size[] = ["PP", "P", "M", "G", "GG"];

export const colorSwatches: Record<ColorName, string> = {
  Preto: "#151515",
  Branco: "#F3F1EC",
  Rosa: "#D69AA4",
  Marrom: "#6A4A3B",
  Azul: "#2F4F7C",
  Verde: "#5F8B78",
  Cinza: "#9B9A97",
};

const c = (name: ColorName, label?: string, hex?: string): ProductColor => ({
  name,
  label: label ?? name,
  hex: hex ?? colorSwatches[name],
});

const careDefault = [
  "Lavar à mão ou na máquina em ciclo delicado, com água fria.",
  "Lavar do avesso e separar por cores.",
  "Não usar alvejante nem amaciante.",
  "Secar à sombra; não usar secadora.",
  "Não passar a ferro sobre estampas ou silks.",
];

const fabricLycra =
  "Composição demonstrativa: 82% poliamida e 18% elastano, com toque gelado e alta compressão.";
const fabricSoft =
  "Composição demonstrativa: 88% poliamida e 12% elastano, toque macio e secagem rápida.";
const fabricDry =
  "Composição demonstrativa: 100% poliéster com tecnologia dry, leve e respirável.";
const fabricMesh =
  "Composição demonstrativa: tela 100% poliéster com microfuros, leve e com transparência suave.";

/** Galeria: imagem principal + recortes de detalhe da mesma foto */
const storePositions: Record<string, string> = { "ig:ig-03": "50% 85%" };

function gallery(src: string, alt: string): ProductImage[] {
  if (src.startsWith("ig:")) return [{ src, alt, fromStore: true, position: storePositions[src] ?? "50% 20%" }];
  return [
    { src, alt },
    { src: `${src}#detalhe-superior`, alt: `${alt} — detalhe da parte superior` },
    { src: `${src}#detalhe-inferior`, alt: `${alt} — detalhe da parte inferior` },
  ];
}

type Seed = {
  name: string;
  category: CategorySlug;
  price: number;
  img: string;
  alt: string;
  short: string;
  long: string;
  colors: ProductColor[];
  sizes?: Size[];
  fabric?: string;
  featured?: boolean;
  isNew?: boolean;
  date: string;
  out?: Size[];
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const seeds: Seed[] = [
  // Leggings
  {
    name: "Legging Sculpt Essential",
    category: "leggings",
    price: 149.9,
    img: "photo-1584863495140-a320b13a11a8",
    alt: "Mulher de top e legging pretos em postura de yoga",
    short: "Cós alto anatômico e compressão firme para o treino pesado.",
    long: "A legging que vai de agachamento a corrida sem ceder. Cós alto com reforço duplo que não enrola, costuras planas que não marcam e tecido opaco: pode agachar sem medo.",
    colors: [c("Preto")],
    featured: true,
    date: "2026-08-04",
  },
  {
    name: "Legging Motion Seamless",
    category: "leggings",
    price: 179.9,
    img: "photo-1606903037631-f09fd0bd74b4",
    alt: "Mulher de conjunto rosado em movimento de corrida estacionária",
    short: "Sem costuras laterais, com textura canelada que valoriza o shape.",
    long: "Malha sem costura com zonas de compressão diferentes: firme no abdômen, mais leve nas pernas. A textura canelada valoriza o desenho do corpo e ajuda a disfarçar marcas.",
    colors: [c("Rosa", "Rosa queimado", "#C68D96")],
    fabric: fabricSoft,
    featured: true,
    isNew: true,
    date: "2026-10-12",
  },
  {
    name: "Legging Urban Cós Alto",
    category: "leggings",
    price: 159.9,
    img: "photo-1599751449353-779b810ebb37",
    alt: "Mulher de blusa cinza de manga longa e legging preta na rua",
    short: "Do treino ao café: corte reto no tornozelo e bolso lateral.",
    long: "Pensada para quem sai da academia direto para a rua. Bolso lateral que segura o celular, corte reto no tornozelo e tecido com toque de algodão.",
    colors: [c("Preto"), c("Cinza", "Grafite", "#55555A")],
    date: "2026-07-18",
  },
  {
    name: "Legging Power Compress",
    category: "leggings",
    price: 169.9,
    img: "photo-1609899517237-77d357b047cf",
    alt: "Mulher de top e legging pretos fazendo exercício na academia",
    short: "Alta compressão para treinos de força e HIIT.",
    long: "Compressão alta em todo o comprimento, cós de 12 cm com elástico embutido e tecido que não fica transparente no agachamento profundo.",
    colors: [c("Preto")],
    fabric: fabricLycra,
    date: "2026-06-30",
  },
  {
    name: "Legging Track Verde",
    category: "leggings",
    price: 164.9,
    img: "photo-1706550632280-208bde7a1a6e",
    alt: "Mulher de top e legging verde-petróleo em pista de atletismo",
    short: "Verde-petróleo com brilho acetinado e cós transpassado.",
    long: "Cor intensa com acabamento acetinado discreto. O cós transpassado afina a cintura e o tecido de secagem rápida acompanha corridas longas.",
    colors: [c("Verde", "Verde-petróleo", "#2F6F6A")],
    isNew: true,
    date: "2026-10-02",
  },
  {
    name: "Legging Contrast Listrada",
    category: "leggings",
    price: 174.9,
    img: "photo-1645318800862-0d343ebd4e6a",
    alt: "Mulher de top preto e legging preta com faixas brancas em afundo",
    short: "Faixas laterais em contraste que alongam a silhueta.",
    long: "Faixas brancas aplicadas nas laterais criam linhas verticais que alongam as pernas. Cós médio, confortável para aulas funcionais.",
    colors: [c("Preto", "Preto com branco"), c("Branco", "Branco com preto")],
    date: "2026-09-08",
  },
  // Tops
  {
    name: "Top Active Support",
    category: "tops",
    price: 89.9,
    img: "photo-1759476530978-07f0eb6906fb",
    alt: "Mulher de top rosa e short marrom em varanda de madeira",
    short: "Sustentação média com bojo removível e alças finas.",
    long: "Top de sustentação média para musculação e pilates. Bojo removível, alças finas reguláveis e elástico largo sob o busto que não aperta.",
    colors: [c("Rosa", "Pink", "#D94F7A"), c("Preto")],
    featured: true,
    date: "2026-08-21",
  },
  {
    name: "Top Balance Fit",
    category: "tops",
    price: 99.9,
    img: "photo-1791212420653-233f6bf4f8bb",
    alt: "Mulher de top esportivo preto e legging sobre fundo bege",
    short: "Decote reto e costas nadador para treinos intensos.",
    long: "Alta sustentação com visual limpo. Decote reto, costas nadador e forro duplo para quem pula, corre e não quer ajustar o top a cada série.",
    colors: [c("Preto")],
    fabric: fabricLycra,
    isNew: true,
    date: "2026-10-15",
  },
  {
    name: "Top Contour Line",
    category: "tops",
    price: 94.9,
    img: "photo-1774414489671-9f33b8dff0a9",
    alt: "Detalhe de top preto com vivos brancos",
    short: "Vivos brancos contornando o decote e a barra.",
    long: "Os vivos em contraste desenham o decote e a barra. Sustentação média, modelagem cropped e alças largas que distribuem o peso.",
    colors: [c("Preto", "Preto com branco")],
    date: "2026-09-25",
  },
  {
    name: "Top Bloom",
    category: "tops",
    price: 84.9,
    img: "photo-1759476530591-e6d197cc70f7",
    alt: "Mulher de top esportivo rosa ao ar livre",
    short: "Rosa vibrante, alças finas e toque gelado.",
    long: "Leve e fresco, para yoga, pilates e dias quentes. Alças finas cruzadas nas costas e tecido de toque gelado.",
    colors: [c("Rosa", "Pink", "#D94F7A")],
    date: "2026-07-10",
  },
  {
    name: "Top Run Line",
    category: "tops",
    price: 92.9,
    img: "photo-1774414489812-f863c5bd32f4",
    alt: "Mulher de top preto com recortes brancos e legging ao ar livre",
    short: "Recortes em linha que acompanham o movimento da corrida.",
    long: "Recortes costurados que acompanham as costelas, decote canoa e elástico inferior largo. Combina com a legging de mesma linha.",
    colors: [c("Preto")],
    date: "2026-08-12",
  },
  // Shorts
  {
    name: "Short Flex Training",
    category: "shorts",
    price: 109.9,
    img: "photo-1634276702982-3ba828ac4b7a",
    alt: "Mulher de top e short azul-marinho em escadaria",
    short: "Cós alto, comprimento médio e tecido que não sobe.",
    long: "Comprimento médio com barra siliconada que não sobe na passada. Cós alto que segura sem apertar e tecido opaco.",
    colors: [c("Azul", "Azul-marinho", "#26324A")],
    featured: true,
    date: "2026-09-02",
  },
  {
    name: "Short Move Pro",
    category: "shorts",
    price: 119.9,
    img: "photo-1649345946706-afbf86eee046",
    alt: "Mulher de top e short pretos correndo ao ar livre",
    short: "Short de corrida com bolso traseiro com zíper.",
    long: "Leve e respirável, com bolso traseiro com zíper para chave e cartão. Forro interno e elástico com cordão.",
    colors: [c("Preto")],
    fabric: fabricDry,
    date: "2026-08-28",
  },
  {
    name: "Short Biker Cinza",
    category: "shorts",
    price: 99.9,
    img: "photo-1784819482955-c4f70b6da51b",
    alt: "Mulher sorridente de short claro segurando argolas de ginástica",
    short: "Biker na altura do meio da coxa, cós alto e toque macio.",
    long: "O biker clássico em cinza claro, fácil de combinar. Comprimento meio da coxa, cós alto e tecido macio que não marca.",
    colors: [c("Cinza", "Cinza mescla", "#B8B6B1")],
    isNew: true,
    date: "2026-10-08",
  },
  // Macacões
  {
    name: "Macacão Contour Fit",
    category: "macacoes",
    price: 229.9,
    img: "photo-1642549276336-c436bfa3fdff",
    alt: "Mulher de macacão azul royal na academia",
    short: "Peça única que modela do busto ao tornozelo.",
    long: "Uma peça só, sem preocupação com cós. Bojo embutido, alças finas e compressão moderada que contorna a silhueta.",
    colors: [c("Azul", "Azul royal", "#2449B8")],
    featured: true,
    date: "2026-09-12",
  },
  {
    name: "Macacão Power Motion",
    category: "macacoes",
    price: 259.9,
    img: "photo-1756699495489-7fce02c3bd71",
    alt: "Mulher de macacão verde-água subindo em um bloco",
    short: "Costas abertas e short integrado em verde-água.",
    long: "Macacão curto com costas abertas e short integrado. Ótimo para funcional e cross, com tecido de alta elasticidade.",
    colors: [c("Verde", "Verde-água", "#8FC3B4")],
    isNew: true,
    date: "2026-10-18",
  },
  {
    name: "Macacão Flow Azul",
    category: "macacoes",
    price: 239.9,
    img: "photo-1768854003610-acce87d98bf5",
    alt: "Mulher de macacão azul em postura de yoga",
    short: "Longo, leve e com decote nas costas para yoga e pilates.",
    long: "Macacão longo de toque macio, pensado para alongar sem nada apertar. Decote nas costas e bojo removível.",
    colors: [c("Azul", "Azul céu", "#5E8DC9")],
    fabric: fabricSoft,
    date: "2026-07-22",
  },
  {
    name: "Macaquinho Sculpt",
    category: "macacoes",
    price: 199.9,
    img: "photo-1756699495345-6877309eb20b",
    alt: "Mulher de macaquinho verde-água sobre fundo preto",
    short: "Macaquinho curto de alças finas e decote quadrado.",
    long: "Curto e prático, com decote quadrado e alças finas. Compressão moderada e tecido que não fica transparente.",
    colors: [c("Verde", "Verde-água", "#8FC3B4")],
    date: "2026-08-30",
  },
  // Conjuntos
  {
    name: "Conjunto Energy Duo",
    category: "conjuntos",
    price: 239.9,
    img: "photo-1517438984742-1262db08379e",
    alt: "Mulher de top e legging marrons saltando",
    short: "Top e legging em marrom cacau, para ir pronta ao treino.",
    long: "Top de sustentação média e legging de cós alto no mesmo tom cacau. Combinar o look fica resolvido antes do café.",
    colors: [c("Marrom", "Cacau", "#7A5444")],
    featured: true,
    date: "2026-09-18",
  },
  {
    name: "Conjunto Essential Move",
    category: "conjuntos",
    price: 269.9,
    img: "photo-1597299001669-6454fec8ac25",
    alt: "Mulher de top e legging em tom oliva caminhando",
    short: "Verde oliva canelado, top e legging de cós alto.",
    long: "Malha canelada em verde oliva, com top cropped e legging de cós alto. Um conjunto que funciona inteiro ou separado.",
    colors: [c("Verde", "Verde oliva", "#7C7A52")],
    fabric: fabricSoft,
    date: "2026-07-28",
  },
  {
    name: "Conjunto Studio Blue",
    category: "conjuntos",
    price: 249.9,
    img: "photo-1597460970375-1449df2fb73a",
    alt: "Mulher de conjunto azul sentada em mureta de concreto",
    short: "Azul intenso com recortes que modelam a cintura.",
    long: "Top com recortes e legging com cós transpassado em azul intenso. Para quem gosta de cor no treino.",
    colors: [c("Azul", "Azul cobalto", "#2B53A8")],
    date: "2026-08-08",
  },
  {
    name: "Conjunto Café Manga Longa",
    category: "conjuntos",
    price: 289.9,
    img: "photo-1641808895522-d36eff88fee8",
    alt: "Mulher de blusa cropped de manga longa e legging marrons",
    short: "Cropped de manga longa e legging para as manhãs frias.",
    long: "Cropped de manga longa com polegar e legging de cós alto, em marrom café. Para as manhãs frias de Lavras e treinos ao ar livre.",
    colors: [c("Marrom", "Café", "#5A3E33")],
    isNew: true,
    date: "2026-10-20",
  },
  {
    name: "Conjunto Cloud",
    category: "conjuntos",
    price: 219.9,
    img: "photo-1635929171657-ccb333d714f5",
    alt: "Mulher de top e short brancos",
    short: "Top e short brancos com forro duplo, nada transparece.",
    long: "Branco com forro duplo no top e no short, para não transparecer. Leve, fresco e fácil de combinar.",
    colors: [c("Branco", "Off-white")],
    date: "2026-07-04",
  },
  {
    name: "Conjunto Rosé Treino",
    category: "conjuntos",
    price: 229.9,
    img: "ig:ig-03",
    alt: "Cliente de top regata rosa e short rosa na academia, foto publicada pela ON",
    short: "Regata de alcinha e short no mesmo rosé.",
    long: "O rosé que apareceu no nosso Instagram: regata de alcinha com bojo e short de cós alto. Combina com meião e tênis claro.",
    colors: [c("Rosa", "Rosé", "#D58FA3")],
    featured: true,
    date: "2026-10-16",
  },
  {
    name: "Conjunto Neutro Cinza",
    category: "conjuntos",
    price: 249.9,
    img: "ig:ig-08",
    alt: "Modelo de regata e legging cinza em estúdio, foto publicada pela ON",
    short: "Regata soltinha e legging no mesmo cinza claro.",
    long: "Regata de caimento solto e legging de cós alto, ambas em cinza claro. Visual limpo que vai do treino à rua.",
    colors: [c("Cinza", "Cinza claro", "#B9B9B6")],
    date: "2026-08-26",
  },
  // Camisetas
  {
    name: "Camiseta Urban Active",
    category: "camisetas",
    price: 99.9,
    img: "photo-1668807555068-5176076ac275",
    alt: "Mulher de camiseta branca alongando-se em uma pista",
    short: "Camiseta dry de caimento reto e gola careca.",
    long: "Básica de verdade: caimento reto, gola careca e tecido dry que seca rápido. Funciona por cima de qualquer top.",
    colors: [c("Branco"), c("Preto")],
    fabric: fabricDry,
    date: "2026-07-14",
  },
  {
    name: "Blusa Tampa Tudo",
    category: "camisetas",
    price: 109.9,
    img: "ig:ig-11",
    alt: "Cliente de blusa caramelo soltinha e legging branca na academia, foto publicada pela ON",
    short: "Soltinha e mais comprida atrás. Na ON ela ganhou apelido.",
    long: "A blusa que cobre o bumbum e deixa você treinar sem ajustar a roupa a cada série. No nosso Instagram ela ficou famosa como “Piriquitossauro Rex”.",
    colors: [c("Marrom", "Caramelo", "#9C6B4E"), c("Preto")],
    fabric: fabricDry,
    featured: true,
    date: "2026-08-18",
  },
  {
    name: "Camiseta Tela Café",
    category: "camisetas",
    price: 119.9,
    img: "ig:ig-01",
    alt: "Cliente de camiseta de tela marrom e calça flare marrom diante do espelho, foto publicada pela ON",
    short: "Camiseta de tela para usar por cima do top.",
    long: "Tela com transparência suave para usar por cima do top ou do macacão. No look da foto, com a calça flare no mesmo tom café.",
    colors: [c("Marrom", "Café", "#4E3428")],
    fabric: fabricMesh,
    isNew: true,
    date: "2026-10-22",
  },
  // Regatas
  {
    name: "Regata Flow Training",
    category: "regatas",
    price: 79.9,
    img: "photo-1787089574329-3b6749ced7d6",
    alt: "Mulher de regata preta com cabelo preso em coque",
    short: "Regata nadador leve, com cava ampla.",
    long: "Regata leve com costas nadador e cava ampla para liberar os movimentos. Tecido respirável e barra arredondada.",
    colors: [c("Preto")],
    fabric: fabricDry,
    date: "2026-07-06",
  },
  {
    name: "Regata Soft Cinza",
    category: "regatas",
    price: 74.9,
    img: "photo-1593431763017-c689a61b729a",
    alt: "Mulher de regata cinza alongando a perna em um tapete",
    short: "Cinza mescla, macia e com caimento solto.",
    long: "Regata de caimento solto e toque de algodão, ótima para yoga, alongamento e dias de descanso ativo.",
    colors: [c("Cinza", "Cinza mescla", "#A9A7A3")],
    date: "2026-08-02",
  },
  {
    name: "Blusa Tela Amarradinho",
    category: "regatas",
    price: 99.9,
    img: "ig:ig-07",
    alt: "Cliente de regata de tela clara com amarração na cintura e legging preta, foto publicada pela ON",
    short: "A terceira peça que tira o look do básico.",
    long: "Tela leve com transparência na medida e amarração na cintura que marca o shape. Usada por cima do top, transforma o combo legging e top num look.",
    colors: [
      c("Branco", "Off-white"),
      c("Verde", "Verde menta", "#A9CDB8"),
      c("Rosa", "Rosa", "#D99AA0"),
      c("Azul", "Azul petróleo", "#2C6E7F"),
    ],
    fabric: fabricMesh,
    featured: true,
    isNew: true,
    date: "2026-09-24",
  },
  {
    name: "Regata Daily Off-white",
    category: "regatas",
    price: 84.9,
    img: "ig:ig-04",
    alt: "Cliente de regata off-white e legging marrom na academia, foto publicada pela ON",
    short: "Alcinha fina, decote V suave e comprimento no quadril.",
    long: "Regata de alcinha com decote V suave e comprimento no quadril. Combina com legging escura, como na foto.",
    colors: [c("Branco", "Off-white", "#EFE9D8")],
    date: "2026-10-01",
    out: ["PP"],
  },
];

function buildStock(seed: string, sizes: Size[], out: Size[] = []) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const stock: Partial<Record<Size, number>> = {};
  sizes.forEach((s, i) => {
    stock[s] = out.includes(s) ? 0 : ((h >>> (i * 3)) % 7) + 2;
  });
  return stock;
}

export const products: Product[] = seeds.map((s, i) => {
  const slug = slugify(s.name);
  const sizes = s.sizes ?? allSizes;
  return {
    id: `on-${String(i + 1).padStart(3, "0")}`,
    slug,
    name: s.name,
    category: s.category,
    price: s.price,
    shortDescription: s.short,
    description: s.long,
    sizes,
    colors: s.colors,
    images: gallery(s.img, s.alt),
    fabric: s.fabric ?? fabricLycra,
    care: careDefault,
    featured: Boolean(s.featured),
    isNew: Boolean(s.isNew),
    releaseDate: s.date,
    stock: buildStock(slug, sizes, s.out),
  };
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const priceBounds = {
  min: Math.floor(Math.min(...products.map((p) => p.price)) / 10) * 10,
  max: Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10,
};

export function relatedProducts(product: Product, limit = 4) {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.featured);
  return [...same, ...others].slice(0, limit);
}

/** Converte "src#detalhe" em recorte de foco */
export function imageCrop(src: string) {
  const [id, frag] = src.split("#");
  if (frag === "detalhe-superior") return { id, fpY: 0.32, zoom: 1.7 };
  if (frag === "detalhe-inferior") return { id, fpY: 0.72, zoom: 1.7 };
  return { id };
}
