const whatsapp = "https://wa.me/5511999517092?text=Olá%20Nivaldo,%20vim%20pelo%20site%20da%20NT%20ALPHA%20e%20gostaria%20de%20mais%20informações.";

export default function Header(){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand">NT <span>ALPHA</span></a>
        <nav className="nav">
          <a href="#imoveis">Imóveis</a>
          <a href="#sobre">Sobre</a>
          <a href="#regiao">Região</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="header-actions">
          <a className="btn btn-outline" href="mailto:nivaldo@ntalpha.com.br">E-mail</a>
          <a className="btn btn-primary" href={whatsapp} target="_blank">WhatsApp</a>
        </div>
      </div>
    </header>
  )
}
