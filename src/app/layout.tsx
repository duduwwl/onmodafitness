import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, site } from "@/lib/site";

const outfit = Outfit({ subsets: ["latin"], weight: ["200", "300", "400", "500"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: "ON Moda Fitness · Moda fitness em Lavras, MG", template: "%s · ON Moda Fitness" },
  description:
    "Leggings, tops, shorts, macacões e conjuntos escolhidos a dedo para treinar com conforto e estilo. Loja em Lavras, MG — atendimento pelo WhatsApp.",
  keywords: ["moda fitness", "Lavras", "legging", "top fitness", "conjunto fitness", "roupa de academia", "ON Moda Fitness"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: "ON Moda Fitness · Moda fitness em Lavras, MG",
    description: "Peças fitness escolhidas a dedo: conforto para treinar e estilo para ir além da academia.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1645810798586-08e892108d67?auto=format&fit=crop&w=1200&h=630&q=75",
        width: 1200,
        height: 630,
        alt: "Mulher de top e legging na academia",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f2",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  description: site.tagline,
  url: SITE_URL,
  sameAs: [site.instagram],
  telephone: "+55 35 99813-9983",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Otacílio Negrão de Lima, 303, loja D",
    addressLocality: "Lavras",
    addressRegion: "MG",
    postalCode: site.address.zip,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-5 focus:py-3 focus:text-[var(--color-paper)]">
          Pular para o conteúdo
        </a>
        <Providers>
          <div className="relative z-10 bg-[var(--color-paper)]">
            <Header />
            <main id="conteudo">{children}</main>
          </div>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
