import "./globals.css";
import type { Metadata } from "next";

const SITE_URL = "https://www.ntalpha.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "NT ALPHA | Consultoria Imobiliária em Alphaville e Região",
    template: "%s | NT ALPHA",
  },

  description:
    "Consultoria imobiliária para compra e venda de imóveis em Alphaville, Barueri, Tamboré e Santana de Parnaíba. Atendimento direto com Nivaldo Tonelli, CRECI 82752-F.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "NT ALPHA",
    title: "NT ALPHA | Consultoria Imobiliária em Alphaville e Região",
    description:
      "Compra e venda de imóveis em Alphaville, Barueri, Tamboré e Santana de Parnaíba com atendimento direto e personalizado.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
