export type Property = {
  id:string;
  codigo:string;
  titulo:string;
  tipo:string;
  cidade:string|null;
  bairro:string|null;
  valor:number|null;
  quartos:number;
  suites:number;
  vagas:number;
  area_util:number|null;
  destaque:boolean;
  publicar_site:boolean;
};
