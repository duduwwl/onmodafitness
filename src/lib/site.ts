export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://duduwwl.github.io/onmodafitness";

export const site = {
  name: "ON Moda Fitness",
  tagline: "Moda fitness que transforma sua experiência nos treinos.",
  instagram: "https://www.instagram.com/onmodafitness_/",
  instagramHandle: "@onmodafitness_",
  /** Número publicado pela própria loja no Linktree vinculado ao Instagram (linktr.ee/onsports_lavras) */
  whatsappNumber: "5535998139983",
  whatsappDisplay: "(35) 99813-9983",
  address: {
    street: "Rua Otacílio Negrão de Lima, 303 — loja D",
    district: "Retiro",
    city: "Lavras — MG",
    zip: "37200-000",
    reference: "Em frente ao Posto Vitória",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=ON+Moda+Fitness+Rua+Otac%C3%ADlio+Negr%C3%A3o+de+Lima+303+Lavras+MG",
  geo: { lat: -21.2529, lng: -45.0015 },
} as const;

export function asset(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
