"use client";

import { FormEvent, useState } from "react";

type Props = {
  propertyId: string;
  codigo: string | null;
  titulo: string;
  whatsappUrl: string;
};

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default function InterestForm({
  propertyId,
  codigo,
  titulo,
  whatsappUrl,
}: Props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!URL || !KEY) {
      setErro(
        "Configuração do Supabase não encontrada. Verifique as variáveis de ambiente."
      );
      return;
    }

    if (nome.trim().length < 2 || telefone.trim().length < 8) {
      setErro("Informe seu nome e um telefone/WhatsApp válido.");
      return;
    }

    setEnviando(true);

    try {
      const r = await fetch(`${URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          property_id: propertyId,
          nome: nome.trim(),
          telefone: telefone.trim(),
          email: email.trim() || null,
          mensagem:
            mensagem.trim() ||
            `Interesse pelo site no imóvel ${
              codigo ? `${codigo} - ` : ""
            }${titulo}.`,
          origem: "Site",
          status: "novo",
          client_id: null,
          observacoes_internas: null,
        }),
      });

      /*
       * IMPORTANTE:
       * Em caso de erro, captura o retorno real do Supabase.
       * Isso nos permitirá identificar se o problema é:
       * - RLS / permissão
       * - coluna inexistente
       * - constraint
       * - campo obrigatório
       * - UUID inválido
       * - outro problema no banco
       */
      if (!r.ok) {
        const detalhe = await r.text();

        console.error("Erro ao registrar lead:", {
          status: r.status,
          statusText: r.statusText,
          detalhe,
        });

        throw new Error(
          detalhe || `Erro HTTP ${r.status} - ${r.statusText}`
        );
      }

      setSucesso(true);
    } catch (e) {
      console.error("Falha no envio do interesse:", e);

      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível registrar seu interesse."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (sucesso) {
    return (
      <div className="interest-success">
        <strong>Interesse registrado com sucesso.</strong>

        <p>
          Seu contato foi enviado para a NT ALPHA. Você também pode continuar
          o atendimento pelo WhatsApp.
        </p>

        <a
          className="btn btn-primary"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Continuar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="interest-form" onSubmit={enviar}>
      <div className="interest-field">
        <label htmlFor="lead-nome">Nome *</label>

        <input
          id="lead-nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="interest-field">
        <label htmlFor="lead-telefone">WhatsApp / Telefone *</label>

        <input
          id="lead-telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          autoComplete="tel"
          required
        />
      </div>

      <div className="interest-field">
        <label htmlFor="lead-email">E-mail</label>

        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="interest-field">
        <label htmlFor="lead-mensagem">Mensagem</label>

        <textarea
          id="lead-mensagem"
          rows={3}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder={`Tenho interesse no imóvel ${codigo ?? titulo}.`}
        />
      </div>

      {erro && (
        <p className="interest-error" role="alert">
          {erro}
        </p>
      )}

      <button
        className="btn btn-primary interest-submit"
        type="submit"
        disabled={enviando}
      >
        {enviando ? "Enviando..." : "Enviar interesse"}
      </button>

      <a
        className="interest-whatsapp-direct"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
      >
        Prefiro falar direto pelo WhatsApp
      </a>
    </form>
  );
}
