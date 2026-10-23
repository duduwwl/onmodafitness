import { imageCrop } from "@/data/products";
import { imageSrcSet, imageUrl, isStoreImage } from "@/lib/images";
import { cn } from "@/lib/format";

type PhotoProps = {
  src: string;
  alt: string;
  /** largura / altura */
  ratio: number;
  /** largura base (px) usada como src padrão */
  width: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  position?: string;
  widths?: number[];
};

/**
 * Imagem com proporção fixa (sem layout shift), srcset responsivo para o CDN do
 * Unsplash e carregamento preguiçoso fora da primeira dobra.
 */
export function Photo({
  src,
  alt,
  ratio,
  width,
  sizes = "100vw",
  className,
  imgClassName,
  priority,
  position,
  widths,
}: PhotoProps) {
  const { id, fpY, zoom } = imageCrop(src);
  const height = Math.round(width / ratio);
  const extra = zoom ? { fpY, zoom } : undefined;
  const url = imageUrl(id, { w: width, h: height, ...extra });
  const ws = widths ?? [Math.round(width / 2), width, Math.round(width * 1.5), width * 2].filter((w) => w <= 2400);
  const srcSet = imageSrcSet(id, ratio, ws, extra);

  return (
    <div className={cn("relative overflow-hidden bg-[var(--color-stone)]", className)} style={{ aspectRatio: String(ratio) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        style={{ objectPosition: position ?? (isStoreImage(id) ? "50% 22%" : undefined) }}
      />
    </div>
  );
}
