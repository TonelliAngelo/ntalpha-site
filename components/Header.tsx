const whatsapp = "https://wa.me/5511999517092?text=Olá%20Nivaldo,%20vim%20pelo%20site%20da%20NT%20ALPHA%20e%20gostaria%20de%20mais%20informações.";

export default function Header(){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand-logo" aria-label="NT ALPHA">
          <img src="/images/ntalpha-logo.png" alt="NT ALPHA - Consultor Imobiliário" />
        </a>

        <nav className="nav desktop-nav">
          <a href="#imoveis">Imóveis</a>
          <a href="#sobre">Sobre</a>
          <a href="#regiao">Região</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="header-actions desktop-actions">
          <a className="btn btn-outline" href="mailto:nivaldo@ntalpha.com.br">E-mail</a>
          <a className="btn btn-primary" href={whatsapp} target="_blank">WhatsApp</a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu">☰</summary>
          <div className="mobile-menu-panel">
            <a href="#imoveis">Imóveis</a>
            <a href="#sobre">Sobre</a>
            <a href="#regiao">Região</a>
            <a href="#contato">Contato</a>
            <a href="mailto:nivaldo@ntalpha.com.br">E-mail</a>
            <a className="mobile-whatsapp" href={whatsapp} target="_blank">WhatsApp</a>
          </div>
        </details>
      </div>
    </header>
  )
}
