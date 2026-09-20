import Header from "@/components/Header";
import Footer from "@/components/Footer";

const whatsapp = "https://wa.me/5511999517092?text=Olá%20Nivaldo,%20vim%20pelo%20site%20da%20NT%20ALPHA%20e%20gostaria%20de%20mais%20informações.";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const BUCKET = "property-images";

type Imovel = { id:string; codigo:string|null; tipo:string; titulo:string; cidade:string|null; bairro:string|null; valor:number|null; dormitorios:number|null; suites:number|null; vagas:number|null; area_util:number|null; destaque:boolean; capa:string|null };

async function carregarImoveis(): Promise<Imovel[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
  const pr = await fetch(`${SUPABASE_URL}/rest/v1/properties?select=id,codigo,tipo,titulo,cidade,bairro,valor,dormitorios,suites,vagas,area_util,destaque&publicar_site=eq.true&status=eq.disponivel&order=created_at.desc`, {headers, cache:"no-store"});
  if (!pr.ok) { console.error("Erro ao carregar imóveis", await pr.text()); return []; }
  const props = await pr.json();
  if (!props.length) return [];
  const ids = props.map((p:any)=>p.id).join(",");
  const ir = await fetch(`${SUPABASE_URL}/rest/v1/property_images?select=property_id,path&tipo=eq.foto&principal=eq.true&property_id=in.(${ids})`, {headers, cache:"no-store"});
  const imgs = ir.ok ? await ir.json() : [];
  const capas = new Map(imgs.map((x:any)=>[x.property_id,x.path]));
  return props.map((p:any)=>({...p,capa:capas.get(p.id)??null}));
}
function foto(path:string){return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`;}
function moeda(v:number|null){return v==null?"Consulte":new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(v);}


export default async function Home(){
  const imoveis = await carregarImoveis();
  const destaques = imoveis.filter(i=>i.destaque);
  const disponiveis = imoveis.filter(i=>!i.destaque);

  const renderCard = (i:Imovel) => {
    const meta=[
      i.suites?`${i.suites} ${i.suites===1?"suíte":"suítes"}`:(i.dormitorios?`${i.dormitorios} dormitórios`:null),
      i.vagas?`${i.vagas} ${i.vagas===1?"vaga":"vagas"}`:null,
      i.area_util!=null?`${i.area_util} m²`:null
    ].filter(Boolean) as string[];

    return <article className="property-card" key={i.id}>
      <a className="property-card-link" href={`/imoveis/${encodeURIComponent(i.codigo ?? "")}`}>
        <div className="property-image" style={i.capa?{backgroundImage:`url("${foto(i.capa)}")`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>
          <span className="property-badge">{i.tipo}</span>
          {i.codigo&&<span className="property-badge">{i.codigo}</span>}
        </div>
        <div className="property-body">
          <h3 className="property-title">{i.titulo}</h3>
          <div className="property-location">{[i.bairro,i.cidade].filter(Boolean).join(" • ")}</div>
          <div className="property-meta">{meta.map(m=><span key={m}>{m}</span>)}</div>
          <div className="property-price">{moeda(i.valor)}</div>
        </div>
      </a>
    </article>;
  };
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

        <div id="imoveis">
          {destaques.length>0&&<section className="section section-light">
            <div className="container">
              <div className="section-heading">
                <div><div className="eyebrow">Seleção NT ALPHA</div><h2>Imóveis em destaque</h2></div>
                <p>Uma seleção especial de imóveis destacados pela NT ALPHA.</p>
              </div>
              <div className="property-grid">{destaques.slice(0,4).map(renderCard)}</div>
              <div className="property-showcase-action">
                <a className="btn btn-outline" href="/imoveis">Ver mais imóveis</a>
              </div>
            </div>
          </section>}

          {imoveis.length>0&&<section className={`section ${destaques.length>0?"section-muted":"section-light"}`}>
            <div className="container">
              <div className="section-heading">
                <div><div className="eyebrow">Oportunidades disponíveis</div><h2>Imóveis disponíveis</h2></div>
                <p>Conheça algumas das oportunidades disponíveis para venda pela NT ALPHA.</p>
              </div>
              <div className="property-grid">{imoveis.slice(0,4).map(renderCard)}</div>
              <div className="property-showcase-action">
                <a className="btn btn-primary" href="/imoveis">Ver mais imóveis</a>
              </div>
            </div>
          </section>}

          {imoveis.length===0&&<section className="section section-light">
            <div className="container">
              <div className="section-heading">
                <div><div className="eyebrow">NT ALPHA</div><h2>Imóveis disponíveis</h2></div>
                <p>No momento não há imóveis publicados. Novas oportunidades serão divulgadas aqui.</p>
              </div>
            </div>
          </section>}
        </div>

        <section className="section section-muted" id="sobre">
          <div className="container">
            <div className="about-copy about-copy-without-image">
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
