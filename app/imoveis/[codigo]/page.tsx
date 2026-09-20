import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import InterestForm from "@/components/InterestForm";
import {notFound} from "next/navigation";

const SUPABASE_URL=process.env.NEXT_PUBLIC_SUPABASE_URL??"";
const SUPABASE_KEY=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"";
const BUCKET="property-images";

type Imovel={
 id:string;codigo:string|null;titulo:string;tipo:string;cidade:string|null;bairro:string|null;
 endereco:string|null;valor:number|null;valor_condominio:number|null;valor_iptu:number|null;
 dormitorios:number|null;suites:number|null;banheiros:number|null;vagas:number|null;
 area_util:number|null;area_total:number|null;ano_construcao:number|null;mobiliado:string|null;
 andar:number|null;bloco_torre:string|null;unidade:string|null;complemento:string|null;
 caracteristicas:string[]|null;outras_caracteristicas:string|null;descricao:string|null
};
type Midia={path:string;ordem:number;tipo:"foto"|"video";principal:boolean;nome_arquivo:string|null};

const headers=()=>({apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`});
const mediaUrl=(path:string)=>`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`;
const dinheiro=(v:number|null)=>v==null?"Consulte":new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(v);
const numero=(v:number)=>new Intl.NumberFormat("pt-BR",{maximumFractionDigits:2}).format(v);

async function carregar(codigo:string){
 if(!SUPABASE_URL||!SUPABASE_KEY)return null;
 const r=await fetch(`${SUPABASE_URL}/rest/v1/properties?select=*&codigo=eq.${encodeURIComponent(codigo)}&publicar_site=eq.true&status=eq.disponivel&limit=1`,{headers:headers(),cache:"no-store"});
 if(!r.ok)return null;
 const data=await r.json();
 const imovel=(data?.[0]??null) as Imovel|null;
 if(!imovel)return null;
 const m=await fetch(`${SUPABASE_URL}/rest/v1/property_images?select=path,ordem,tipo,principal,nome_arquivo&property_id=eq.${imovel.id}&order=ordem.asc`,{headers:headers(),cache:"no-store"});
 const midias=m.ok?(await m.json()) as Midia[]:[];
 return {imovel,midias};
}

export default async function ImovelPage({params}:{params:Promise<{codigo:string}>}){
 const {codigo}=await params;
 const dados=await carregar(codigo);
 if(!dados)notFound();
 const {imovel,midias}=dados;
 const fotos=midias.filter(x=>x.tipo==="foto").sort((a,b)=>Number(b.principal)-Number(a.principal)||a.ordem-b.ordem);
 const video=midias.find(x=>x.tipo==="video");
 const whats=`https://wa.me/5511999517092?text=${encodeURIComponent(`Olá Nivaldo, vim pelo site da NT ALPHA e tenho interesse no imóvel ${imovel.codigo ? `${imovel.codigo} - ` : ""}${imovel.titulo}. Gostaria de receber mais informações e verificar a possibilidade de agendar uma visita.`)}`;
 const itens=[
  imovel.dormitorios!=null&&["Dormitórios",String(imovel.dormitorios)],
  imovel.suites!=null&&["Suítes",String(imovel.suites)],
  imovel.banheiros!=null&&["Banheiros",String(imovel.banheiros)],
  imovel.vagas!=null&&["Vagas",String(imovel.vagas)],
  imovel.area_util!=null&&["Área útil",`${numero(imovel.area_util)} m²`],
  imovel.area_total!=null&&["Área total",`${numero(imovel.area_total)} m²`],
  imovel.andar!=null&&["Andar",String(imovel.andar)],
  imovel.ano_construcao!=null&&["Ano",String(imovel.ano_construcao)]
 ].filter(Boolean) as string[][];
 const mobiliado=imovel.mobiliado==="sim"?"Sim":imovel.mobiliado==="parcial"?"Parcialmente":imovel.mobiliado==="nao"?"Não":null;

 return <><Header/><main className="property-detail-page">
  <section className="property-detail-hero"><div className="container">
   <a className="property-back property-back-button" href="/imoveis" aria-label="Voltar para a lista de imóveis">
     <span className="property-back-icon" aria-hidden="true">←</span>
     <span>Voltar aos imóveis</span>
   </a>
   <div className="property-detail-heading">
    <div><div className="eyebrow">{imovel.tipo} • {imovel.codigo}</div><h1>{imovel.titulo}</h1><p>{[imovel.bairro,imovel.cidade].filter(Boolean).join(" • ")}</p></div>
   </div>
  </div></section>

  <section className="section section-light"><div className="container">
   <PropertyGallery fotos={fotos.map((f,i)=>({src:mediaUrl(f.path),alt:`Foto ${i+1} de ${imovel.titulo}`}))}/>

   <div className="property-detail-layout">
    <div>
     <div className="property-facts">{itens.map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div>

     <div className="property-value-strip">
      {imovel.valor_condominio!=null&&<div className="property-value-item"><small>Condomínio</small><strong>{dinheiro(imovel.valor_condominio)}</strong></div>}
      {imovel.valor_iptu!=null&&<div className="property-value-item"><small>IPTU</small><strong>{dinheiro(imovel.valor_iptu)}</strong></div>}
      <div className="property-value-item property-value-main"><small>Valor do imóvel</small><strong>{dinheiro(imovel.valor)}</strong></div>
     </div>

     {(imovel.bloco_torre||imovel.unidade||imovel.complemento||mobiliado)&&<section className="property-detail-block"><h2>Detalhes</h2><div className="property-detail-list">
      {imovel.bloco_torre&&<span><b>Bloco / Torre:</b> {imovel.bloco_torre}</span>}
      {imovel.unidade&&<span><b>Unidade:</b> {imovel.unidade}</span>}
      {imovel.complemento&&<span><b>Complemento:</b> {imovel.complemento}</span>}
      {mobiliado&&<span><b>Mobiliado:</b> {mobiliado}</span>}
     </div></section>}
     {imovel.descricao&&<section className="property-detail-block"><h2>Sobre o imóvel</h2><p className="property-description">{imovel.descricao}</p></section>}
     {((imovel.caracteristicas?.length??0)>0||imovel.outras_caracteristicas)&&<section className="property-detail-block"><h2>Características</h2>
      <div className="property-features">{imovel.caracteristicas?.map(x=><span key={x}>✓ {x}</span>)}</div>
      {imovel.outras_caracteristicas&&<p className="property-description">{imovel.outras_caracteristicas}</p>}
     </section>}
     {video&&<section className="property-detail-block"><h2>Vídeo do imóvel</h2><video className="property-detail-video" controls preload="metadata" src={mediaUrl(video.path)}/></section>}
    </div>
    <aside className="property-interest-card">
     <span className="eyebrow">Tenho interesse</span><h2>{imovel.codigo}</h2>
     <p>Envie seus dados para a NT ALPHA ou continue o atendimento diretamente pelo WhatsApp.</p>
     <InterestForm
      propertyId={imovel.id}
      codigo={imovel.codigo}
      titulo={imovel.titulo}
      whatsappUrl={whats}
     />
    </aside>
   </div>
  </div></section>
 </main><Footer/></>;
}
