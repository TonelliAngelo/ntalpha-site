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
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp" className="footer-social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4Zm-8.3 18.2h-.1c-1.7 0-3.4-.5-4.9-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 1 1 8.5 4.8Zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 .9 4.1.8.7-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.4-.3-.7-.4Z"/></svg>
            </a>
            <a href="mailto:nivaldo@ntalpha.com.br" aria-label="E-mail" title="E-mail" className="footer-social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 7.2L20.4 7H3.6l8.4 5.2Zm0 2.3L3 8.9V17h18V8.9l-9 5.6Z"/></svg>
            </a>
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
          <p><strong>Nivaldo Tonelli</strong></p>
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
