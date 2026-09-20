import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Imovel = {
  id:string; codigo:string|null; tipo:string; titulo:string; cidade:string|null; bairro:string|null;
  valor:number|null; dormitorios:number|null; suites:number|null; vagas:number|null; area_util:number|null;
  destaque:boolean; capa:string|null;
};
type Imagem = {property_id:string;path:string};

const URL=process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const headers={apikey:KEY??"",Authorization:`Bearer ${KEY??""}`};

function moeda(v:number|null){return v==null?"Valor sob consulta":new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(v)}
function foto(path:string){return `${URL}/storage/v1/object/public/property-images/${path}`}

async function carregarImoveis():Promise<Imovel[]>{
  if(!URL||!KEY)return [];
  const r=await fetch(`${URL}/rest/v1/properties?select=id,codigo,tipo,titulo,cidade,bairro,valor,dormitorios,suites,vagas,area_util,destaque&publicar_site=eq.true&status=eq.disponivel&order=created_at.desc`,{headers,cache:"no-store"});
  if(!r.ok)return [];
  const props=await r.json() as Omit<Imovel,"capa">[];
  if(!props.length)return [];
  const ids=props.map(p=>p.id).join(",");
  const ir=await fetch(`${URL}/rest/v1/property_images?select=property_id,path&tipo=eq.foto&principal=eq.true&property_id=in.(${ids})`,{headers,cache:"no-store"});
  const imgs=ir.ok?await ir.json() as Imagem[]:[];
  return props.map(p=>({...p,capa:imgs.find(i=>i.property_id===p.id)?.path??null}));
}

export const dynamic="force-dynamic";

export default async function ImoveisPage(){
  const imoveis=await carregarImoveis();
  return <>
    <Header/>
    <main>
      <section className="section section-light">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Catálogo NT ALPHA</div><h1>Imóveis disponíveis</h1></div>
            <p>Confira todos os imóveis disponíveis para venda publicados pela NT ALPHA.</p>
          </div>

          {imoveis.length>0?<div className="property-grid">
            {imoveis.map(i=>{
              const meta=[
                i.suites?`${i.suites} ${i.suites===1?"suíte":"suítes"}`:(i.dormitorios?`${i.dormitorios} dormitórios`:null),
                i.vagas?`${i.vagas} ${i.vagas===1?"vaga":"vagas"}`:null,
                i.area_util!=null?`${i.area_util} m²`:null
              ].filter(Boolean) as string[];
              return <article className="property-card" key={i.id}>
                <a className="property-card-link" href={`/imoveis/${encodeURIComponent(i.codigo??"")}`}>
                  <div className="property-image" style={i.capa?{backgroundImage:`url("${foto(i.capa)}")`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>
                    <span className="property-badge">{i.tipo}</span>
                    {i.codigo&&<span className="property-badge">{i.codigo}</span>}
                  </div>
                  <div className="property-body">
                    <h2 className="property-title">{i.titulo}</h2>
                    <div className="property-location">{[i.bairro,i.cidade].filter(Boolean).join(" • ")}</div>
                    <div className="property-meta">{meta.map(m=><span key={m}>{m}</span>)}</div>
                    <div className="property-price">{moeda(i.valor)}</div>
                  </div>
                </a>
              </article>
            })}
          </div>:<p>No momento não há imóveis publicados.</p>}
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
