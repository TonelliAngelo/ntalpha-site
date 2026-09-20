"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const whatsapp = "https://wa.me/5511999517092?text=Olá%20Nivaldo,%20vim%20pelo%20site%20da%20NT%20ALPHA%20e%20gostaria%20de%20mais%20informações.";

type Secao = "inicio" | "sobre" | "regiao" | "contato";

export default function Header(){
  const pathname = usePathname();
  const emImoveis = pathname === "/imoveis" || pathname.startsWith("/imoveis/");
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>("inicio");

  useEffect(() => {
    if (pathname !== "/") return;
    const ids: Secao[] = ["inicio", "sobre", "regiao", "contato"];

    const atualizarSecao = () => {
      const ponto = window.scrollY + 180;
      let atual: Secao = "inicio";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= ponto) atual = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        atual = "contato";
      }
      setSecaoAtiva(atual);
    };

    atualizarSecao();
    window.addEventListener("scroll", atualizarSecao, { passive: true });
    window.addEventListener("resize", atualizarSecao);
    return () => {
      window.removeEventListener("scroll", atualizarSecao);
      window.removeEventListener("resize", atualizarSecao);
    };
  }, [pathname]);

  const ativa = (secao: Secao) =>
    !emImoveis && pathname === "/" && secaoAtiva === secao ? "nav-active" : undefined;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/#inicio" className="brand-logo" aria-label="NT ALPHA">
          <img src="/images/ntalpha-logo.png" alt="NT ALPHA - Consultor Imobiliário" />
        </a>
        <nav className="nav desktop-nav">
          <a className={ativa("inicio")} href="/#inicio">Início</a>
          <a className={emImoveis ? "nav-active" : undefined} href="/imoveis">Imóveis</a>
          <a className={ativa("sobre")} href="/#sobre">Sobre</a>
          <a className={ativa("regiao")} href="/#regiao">Região</a>
          <a className={ativa("contato")} href="/#contato">Contato</a>
        </nav>
        <div className="header-actions desktop-actions">
          <a className="header-contact header-email" href="mailto:nivaldo@ntalpha.com.br">E-mail</a>
          <a className="header-contact header-whatsapp" href={whatsapp} target="_blank">WhatsApp</a>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu">☰</summary>
          <div className="mobile-menu-panel">
            <a className={ativa("inicio")} href="/#inicio">Início</a>
            <a className={emImoveis ? "nav-active" : undefined} href="/imoveis">Imóveis</a>
            <a className={ativa("sobre")} href="/#sobre">Sobre</a>
            <a className={ativa("regiao")} href="/#regiao">Região</a>
            <a className={ativa("contato")} href="/#contato">Contato</a>
            <a href="mailto:nivaldo@ntalpha.com.br">E-mail</a>
            <a className="mobile-whatsapp" href={whatsapp} target="_blank">WhatsApp</a>
          </div>
        </details>
      </div>
    </header>
  )
}
