import "./globals.css";

export const metadata = {
  title: "NT ALPHA | Consultor Imobiliário em Alphaville e Região",
  description: "Consultoria imobiliária para compra e venda de imóveis em Alphaville, Barueri, Tamboré e região. Nivaldo, CRECI 82752-F.",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="pt-BR"><body>{children}</body></html>;
}
