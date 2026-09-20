"use client";

import { useEffect, useMemo, useState } from "react";
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
function normalizar(v:string|null|undefined){return (v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}

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

export default function ImoveisPage(){
  const [imoveis,setImoveis]=useState<Imovel[]>([]);
  const [carregando,setCarregando]=useState(true);
  const [busca,setBusca]=useState("");
  const [tipo,setTipo]=useState("");
  const [local,setLocal]=useState("");
  const [preco,setPreco]=useState("");

  useEffect(()=>{carregarImoveis().then(setImoveis).finally(()=>setCarregando(false))},[]);

  const tipos=useMemo(()=>Array.from(new Set(imoveis.map(i=>i.tipo).filter(Boolean))).sort(),[imoveis]);
  const locais=useMemo(()=>Array.from(new Set(imoveis.map(i=>[i.bairro,i.cidade].filter(Boolean).join(" • ")).filter(Boolean))).sort(),[imoveis]);

  const filtrados=useMemo(()=>imoveis.filter(i=>{
    const q=normalizar(busca.trim());
    const texto=normalizar([i.codigo,i.titulo,i.tipo,i.bairro,i.cidade].filter(Boolean).join(" "));
    if(q&&!texto.includes(q))return false;
    if(tipo&&i.tipo!==tipo)return false;
    if(local&&[i.bairro,i.cidade].filter(Boolean).join(" • ")!==local)return false;
    if(preco){
      const v=i.valor;
      if(v==null)return false;
      if(preco==="ate500"&&v>500000)return false;
      if(preco==="500a1000"&&(v<500000||v>1000000))return false;
      if(preco==="1000a2000"&&(v<1000000||v>2000000))return false;
      if(preco==="acima2000"&&v<2000000)return false;
    }
    return true;
  }),[imoveis,busca,tipo,local,preco]);

  const limpar=()=>{setBusca("");setTipo("");setLocal("");setPreco("")};

  return <>
    <Header/>
    <main>
      <section className="section section-light">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Catálogo NT ALPHA</div><h1>Imóveis disponíveis</h1></div>
            <p>Confira todos os imóveis disponíveis para venda publicados pela NT ALPHA.</p>
          </div>

          <div className="property-filters">
            <div className="property-filter-field property-filter-search">
              <label htmlFor="busca">Buscar imóvel</label>
              <input id="busca" value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Código, nome, bairro ou cidade" />
            </div>
            <div className="property-filter-field">
              <label htmlFor="tipo">Tipo</label>
              <select id="tipo" value={tipo} onChange={e=>setTipo(e.target.value)}>
                <option value="">Todos os tipos</option>
                {tipos.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="property-filter-field">
              <label htmlFor="local">Cidade / Região</label>
              <select id="local" value={local} onChange={e=>setLocal(e.target.value)}>
                <option value="">Todas as regiões</option>
                {locais.map(l=><option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="property-filter-field">
              <label htmlFor="preco">Faixa de preço</label>
              <select id="preco" value={preco} onChange={e=>setPreco(e.target.value)}>
                <option value="">Qualquer valor</option>
                <option value="ate500">Até R$ 500 mil</option>
                <option value="500a1000">R$ 500 mil a R$ 1 milhão</option>
                <option value="1000a2000">R$ 1 a R$ 2 milhões</option>
                <option value="acima2000">Acima de R$ 2 milhões</option>
              </select>
            </div>
            <button type="button" className="property-filter-clear" onClick={limpar}>Limpar filtros</button>
          </div>

          <div className="property-results-count">
            {!carregando&&<span>{filtrados.length} {filtrados.length===1?"imóvel encontrado":"imóveis encontrados"}</span>}
          </div>

          {carregando?<p>Carregando imóveis...</p>:filtrados.length>0?<div className="property-grid">
            {filtrados.map(i=>{
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
          </div>:<div className="property-empty"><strong>Nenhum imóvel encontrado.</strong><p>Altere ou limpe os filtros para visualizar outras oportunidades.</p><button type="button" className="btn btn-outline" onClick={limpar}>Limpar filtros</button></div>}
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
