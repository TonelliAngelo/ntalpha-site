const whatsapp = "https://wa.me/5511999517092?text=Olá%20Nivaldo,%20vim%20pelo%20site%20da%20NT%20ALPHA%20e%20gostaria%20de%20mais%20informações.";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-accent" aria-hidden="true" />

      <div className="container footer-main">
        <section className="footer-brand">
          <a href="#inicio" className="footer-logo-link" aria-label="NT ALPHA Consultor Imobiliário">
            <img
              src="/images/ntalpha-logo-footer.png"
              alt="NT ALPHA Consultor Imobiliário"
              className="footer-logo"
            />
          </a>

          <p className="footer-lead">Consultoria imobiliária em Alphaville e região.</p>
          <p className="footer-description">
            Compra e venda de imóveis com atendimento direto, discreto e personalizado.
          </p>

          <div className="footer-social">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">WA</a>
            <a href="mailto:nivaldo@ntalpha.com.br" aria-label="E-mail" title="E-mail">@</a>
          </div>
        </section>

        <section className="footer-column">
          <h4>Contato</h4>
          <span className="footer-title-line" />
          <a className="footer-info" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="footer-icon">☎</span>
            <span><strong>(11) 99951-7092</strong><small>Atendimento via WhatsApp e telefone</small></span>
          </a>
          <a className="footer-info" href="mailto:nivaldo@ntalpha.com.br">
            <span className="footer-icon">✉</span>
            <span><strong>nivaldo@ntalpha.com.br</strong><small>Envie sua mensagem</small></span>
          </a>
          <div className="footer-info">
            <span className="footer-icon">⌖</span>
            <span><strong>Alphaville e região</strong><small>Barueri • Tamboré • Santana de Parnaíba</small></span>
          </div>
        </section>

        <nav className="footer-column footer-links" aria-label="Links rápidos">
          <h4>Links rápidos</h4>
          <span className="footer-title-line" />
          <a href="#inicio">Início</a>
          <a href="#imoveis">Imóveis</a>
          <a href="#sobre">Sobre</a>
          <a href="#regiao">Região</a>
          <a href="#contato">Contato</a>
        </nav>

        <section className="footer-column footer-responsible">
          <h4>Responsável</h4>
          <span className="footer-title-line" />
          <p><strong>Nivaldo</strong></p>
          <p>CRECI 82752-F</p>
          <p className="footer-ethics">Atendimento ético<br/>e transparente</p>
        </section>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 NT ALPHA. Todos os direitos reservados.</span>
          <span>NT ALPHA • Consultor Imobiliário</span>
        </div>
      </div>
    </footer>
  )
}
