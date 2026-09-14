import "./globals.css";

export const metadata = {
  title: "NT ALPHA | Imóveis em Alphaville e Região",
  description: "Imóveis para venda em Alphaville, Barueri, Tamboré e região. Atendimento personalizado com Nivaldo, CRECI 82752-F.",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="pt-BR"><body>{children}</body></html>;
}
