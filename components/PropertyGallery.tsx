"use client";

import {useEffect, useState} from "react";

type Foto={src:string;alt:string};

export default function PropertyGallery({fotos}:{fotos:Foto[]}){
 const [aberta,setAberta]=useState<number|null>(null);
 const atual=aberta===null?null:fotos[aberta];

 function mover(delta:number){
  setAberta(v=>v===null?v:(v+delta+fotos.length)%fotos.length);
 }

 useEffect(()=>{
  if(aberta===null)return;
  const key=(e:KeyboardEvent)=>{
   if(e.key==="Escape")setAberta(null);
   if(e.key==="ArrowLeft")mover(-1);
   if(e.key==="ArrowRight")mover(1);
  };
  document.body.style.overflow="hidden";
  window.addEventListener("keydown",key);
  return()=>{document.body.style.overflow="";window.removeEventListener("keydown",key)};
 },[aberta,fotos.length]);

 if(!fotos.length)return <div className="property-gallery-empty">Imóvel sem fotos publicadas.</div>;

 return <>
  <div className="property-gallery">
   <button className="property-gallery-main gallery-button" onClick={()=>setAberta(0)} aria-label="Abrir foto principal">
    <img src={fotos[0].src} alt={fotos[0].alt}/>
    <span className="gallery-open-label">Ver fotos</span>
   </button>
   {fotos.length>1&&<div className="property-gallery-thumbs">
    {fotos.slice(1,5).map((f,i)=><button className="gallery-button" key={f.src} onClick={()=>setAberta(i+1)} aria-label={`Abrir foto ${i+2}`}>
      <img src={f.src} alt={f.alt}/>
      {i===3&&fotos.length>5?<span className="gallery-more">+{fotos.length-5}</span>:null}
    </button>)}
   </div>}
  </div>

  {atual&&<div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Galeria de fotos" onClick={()=>setAberta(null)}>
   <button className="gallery-close" onClick={()=>setAberta(null)} aria-label="Fechar galeria">×</button>
   {fotos.length>1&&<button className="gallery-nav gallery-prev" onClick={e=>{e.stopPropagation();mover(-1)}} aria-label="Foto anterior">‹</button>}
   <div className="gallery-lightbox-content" onClick={e=>e.stopPropagation()}>
    <img src={atual.src} alt={atual.alt}/>
    <div className="gallery-counter">{(aberta??0)+1} de {fotos.length}</div>
   </div>
   {fotos.length>1&&<button className="gallery-nav gallery-next" onClick={e=>{e.stopPropagation();mover(1)}} aria-label="Próxima foto">›</button>}
  </div>}
 </>;
}
