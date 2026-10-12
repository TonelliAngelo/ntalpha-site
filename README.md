# NT ALPHA — Ajustes do site público

Arquivos preparados para substituição manual no repositório do site público.

## Arquivos e caminhos

- `app/imoveis/[codigo]/page.tsx` — página pública individual do imóvel.
- `app/imoveis/page.tsx` — catálogo público.
- `app/page.tsx` — página inicial.
- `app/layout.tsx` — descrição/SEO institucional.
- `components/Footer.tsx` — texto institucional do rodapé.

## Regras aplicadas

1. Unidade não é renderizada no site público.
2. Complemento não é renderizado no site público.
3. Dormitórios, suítes, banheiros, vagas, áreas e ano só aparecem quando possuem valor positivo/preenchido.
4. Se nenhum indicador estiver preenchido, o bloco de características não é renderizado.
5. Condomínio e IPTU só aparecem quando maiores que zero.
6. O valor do imóvel só aparece quando existe valor cadastrado.
7. Quando houver no retorno do banco um campo de finalidade/modalidade/negócio/tipo_negocio/operacao, o rótulo público passa a ser `Valor do imóvel Venda` ou `Valor do imóvel Locação`.
8. O texto institucional passa a mencionar compra, venda e locação.

## Observação importante

Não foi feita alteração de banco de dados. A modalidade Venda/Locação é reconhecida de forma compatível caso um dos campos acima já exista no retorno de `properties`. Se a base ainda não possuir um campo de finalidade/modalidade, o site continuará mostrando `Valor do imóvel` até essa informação ser cadastrada no banco/painel.

Não substitua arquivos do painel NT ALPHA com este pacote. Estes arquivos são exclusivamente do site público `ntalpha.com.br`.
