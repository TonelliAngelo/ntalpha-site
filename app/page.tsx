import Header from "@/components/Header";
import Footer from "@/components/Footer";

const whatsapp = "https://wa.me/5511999517092?text=Olá%20Nivaldo,%20vim%20pelo%20site%20da%20NT%20ALPHA%20e%20gostaria%20de%20mais%20informações.";

const imoveis = [
  {codigo:"NT-0001",tipo:"Apartamento",titulo:"Apartamento sofisticado em Alphaville",local:"Alphaville • Barueri/SP",meta:["4 suítes","4 vagas","280 m²"],preco:"R$ 2.850.000"},
  {codigo:"NT-0002",tipo:"Casa",titulo:"Casa contemporânea em condomínio",local:"Alphaville • Santana de Parnaíba/SP",meta:["4 suítes","6 vagas","520 m²"],preco:"R$ 6.900.000"},
  {codigo:"NT-0003",tipo:"Apartamento",titulo:"Apartamento amplo com vista privilegiada",local:"Tamboré • Barueri/SP",meta:["3 suítes","3 vagas","230 m²"],preco:"R$ 2.350.000"}
];

export default function Home(){
  return (
    <>
      <Header/>
      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Imóveis selecionados • Alphaville e região</div>
              <h1>Imóveis escolhidos com critério, atendimento feito com proximidade.</h1>
              <p>Compra e venda de imóveis em Alphaville, Barueri, Tamboré e Santana de Parnaíba com atendimento direto, discreto e personalizado.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#imoveis">Ver imóveis</a>
                <a className="btn btn-outline" href={whatsapp} target="_blank">Falar com Nivaldo</a>
              </div>
            </div>

            <div className="search-panel">
              <h3>Encontre seu imóvel</h3>
              <div className="search-grid">
                <div className="field"><label>Tipo</label><select defaultValue=""><option value="">Todos</option><option>Apartamento</option><option>Casa</option><option>Terreno</option></select></div>
                <div className="field"><label>Região</label><select defaultValue=""><option value="">Todas</option><option>Alphaville</option><option>Tamboré</option><option>Barueri</option><option>Santana de Parnaíba</option></select></div>
                <div className="field"><label>Faixa de preço</label><select defaultValue=""><option value="">Qualquer valor</option><option>Até R$ 1,5 milhão</option><option>R$ 1,5 a 3 milhões</option><option>R$ 3 a 5 milhões</option><option>Acima de R$ 5 milhões</option></select></div>
                <a className="btn btn-primary" href="#imoveis">Buscar</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light" id="imoveis">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow">Seleção NT ALPHA</div><h2>Imóveis em destaque</h2></div>
              <p>Esta área será conectada ao Painel NT ALPHA. Imóveis cadastrados e marcados para publicação aparecerão automaticamente aqui.</p>
            </div>
            <div className="property-grid">
              {imoveis.map(i=>(
                <article className="property-card" key={i.codigo}>
                  <div className="property-image">
                    <span className="property-badge">{i.tipo}</span>
                    <span className="property-badge">{i.codigo}</span>
                  </div>
                  <div className="property-body">
                    <h3 className="property-title">{i.titulo}</h3>
                    <div className="property-location">{i.local}</div>
                    <div className="property-meta">{i.meta.map(m=><span key={m}>{m}</span>)}</div>
                    <div className="property-price">{i.preco}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="sobre">
          <div className="container about-grid">
            <div className="about-placeholder"/>
            <div className="about-copy">
              <div className="eyebrow">Atendimento próximo e especializado</div>
              <h2>NT ALPHA</h2>
              <p>A NT ALPHA atua na intermediação de venda de imóveis com foco em atendimento consultivo, discrição e relacionamento de confiança.</p>
              <p>O objetivo é conectar cada cliente ao imóvel adequado ao seu momento e manter uma operação organizada com tecnologia própria de apoio ao atendimento e à divulgação.</p>
              <div className="credential-row">
                <span className="credential">Nivaldo</span>
                <span className="credential">CRECI 82752-F</span>
                <span className="credential">Alphaville e região</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light" id="regiao">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow">Atuação regional</div><h2>Alphaville e entorno</h2></div>
              <p>Estrutura pronta para páginas regionais e otimização de busca no Google.</p>
            </div>
            <div className="region-list">
              <div className="region-card"><strong>Alphaville</strong><span>Barueri e Santana de Parnaíba</span></div>
              <div className="region-card"><strong>Tamboré</strong><span>Condomínios e apartamentos</span></div>
              <div className="region-card"><strong>Barueri</strong><span>Imóveis residenciais selecionados</span></div>
              <div className="region-card"><strong>Santana de Parnaíba</strong><span>Casas e condomínios</span></div>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="contato">
          <div className="container">
            <div className="contact-box">
              <div><h2>Vamos conversar sobre seu próximo imóvel?</h2><p>Atendimento direto com Nivaldo pelo WhatsApp ou e-mail.</p></div>
              <a className="btn btn-primary" href={whatsapp} target="_blank">Falar no WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
      <a className="whatsapp-float" href={whatsapp} target="_blank" aria-label="WhatsApp">WA</a>
    </>
  )
}
