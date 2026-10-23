import { asset } from "./site";

/**
 * Imagens demonstrativas do Unsplash (licença Unsplash) servidas pelo CDN deles,
 * ou imagens reais da loja (Instagram @onmodafitness_) servidas localmente.
 */
export type Crop = { w: number; h: number; fpY?: number; fpX?: number; zoom?: number };

export function isStoreImage(src: string) {
  return src.startsWith("ig:");
}

export function imageUrl(src: string, crop: Crop) {
  if (isStoreImage(src)) return asset(`/images/ig/${src.slice(3)}.webp`);
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(crop.w),
    h: String(crop.h),
    q: "72",
  });
  if (crop.zoom || crop.fpY !== undefined || crop.fpX !== undefined) {
    params.set("crop", "focalpoint");
    params.set("fp-x", String(crop.fpX ?? 0.5));
    params.set("fp-y", String(crop.fpY ?? 0.5));
    if (crop.zoom) params.set("fp-z", String(crop.zoom));
  } else {
    params.set("crop", "faces,entropy");
  }
  return `https://images.unsplash.com/${src}?${params.toString()}`;
}

/** srcset para larguras múltiplas mantendo a proporção */
export function imageSrcSet(src: string, ratio: number, widths: number[], extra?: Omit<Crop, "w" | "h">) {
  if (isStoreImage(src)) return undefined;
  return widths
    .map((w) => `${imageUrl(src, { ...extra, w, h: Math.round(w / ratio) })} ${w}w`)
    .join(", ");
}
