export type CategorySlug =
  | "leggings"
  | "tops"
  | "shorts"
  | "macacoes"
  | "conjuntos"
  | "camisetas"
  | "regatas";

export type Size = "PP" | "P" | "M" | "G" | "GG";

export type ColorName =
  | "Preto"
  | "Branco"
  | "Rosa"
  | "Marrom"
  | "Azul"
  | "Verde"
  | "Cinza";

export interface ProductColor {
  name: ColorName;
  /** Nome comercial exibido (ex.: "Verde oliva") */
  label: string;
  hex: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  /** Imagem real publicada no Instagram da loja */
  fromStore?: boolean;
  /** object-position para enquadramento no card */
  position?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  shortDescription: string;
  description: string;
  sizes: Size[];
  colors: ProductColor[];
  images: ProductImage[];
  fabric: string;
  care: string[];
  featured: boolean;
  isNew: boolean;
  releaseDate: string;
  /** Estoque fictício por tamanho */
  stock: Partial<Record<Size, number>>;
}

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: Size;
  color: string;
  image: string;
  quantity: number;
}
