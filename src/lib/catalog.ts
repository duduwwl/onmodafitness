import { priceBounds, products } from "@/data/products";
import type { CategorySlug, ColorName, Product, Size } from "@/types/product";
import { normalize } from "./search";

export type SortKey = "destaques" | "recentes" | "menor-preco" | "maior-preco" | "nome";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "destaques", label: "Destaques" },
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "nome", label: "Nome A–Z" },
];

export type Filters = {
  categories: CategorySlug[];
  sizes: Size[];
  colors: ColorName[];
  min: number;
  max: number;
  sort: SortKey;
  q: string;
};

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function parseFilters(params: URLSearchParams): Filters {
  const min = Number(params.get("min"));
  const max = Number(params.get("max"));
  const sort = params.get("ordem") as SortKey | null;
  return {
    categories: list(params.get("categoria")) as CategorySlug[],
    sizes: list(params.get("tamanho")) as Size[],
    colors: list(params.get("cor")).map((c) => (c.charAt(0).toUpperCase() + c.slice(1)) as ColorName),
    min: Number.isFinite(min) && min > 0 ? min : priceBounds.min,
    max: Number.isFinite(max) && max > 0 ? max : priceBounds.max,
    sort: sort && sortOptions.some((o) => o.value === sort) ? sort : "destaques",
    q: params.get("q") ?? "",
  };
}

export function filtersToQuery(f: Filters) {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.categories.length) p.set("categoria", f.categories.join(","));
  if (f.sizes.length) p.set("tamanho", f.sizes.join(","));
  if (f.colors.length) p.set("cor", f.colors.map((c) => c.toLowerCase()).join(","));
  if (f.min > priceBounds.min) p.set("min", String(f.min));
  if (f.max < priceBounds.max) p.set("max", String(f.max));
  if (f.sort !== "destaques") p.set("ordem", f.sort);
  return p.toString();
}

export function applyFilters(f: Filters, source: Product[] = products) {
  const q = normalize(f.q.trim());
  const out = source.filter((p) => {
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.sizes.length && !f.sizes.some((s) => (p.stock[s] ?? 0) > 0)) return false;
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c.name))) return false;
    if (p.price < f.min || p.price > f.max) return false;
    if (q && !normalize(`${p.name} ${p.category} ${p.colors.map((c) => c.label).join(" ")} ${p.shortDescription}`).includes(q)) return false;
    return true;
  });
  const sorted = [...out];
  switch (f.sort) {
    case "menor-preco":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "maior-preco":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "nome":
      sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
      break;
    case "recentes":
      sorted.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
      break;
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.isNew) - Number(a.isNew));
  }
  return sorted;
}

export function activeFilterCount(f: Filters) {
  return (
    f.categories.length +
    f.sizes.length +
    f.colors.length +
    (f.min > priceBounds.min || f.max < priceBounds.max ? 1 : 0)
  );
}
