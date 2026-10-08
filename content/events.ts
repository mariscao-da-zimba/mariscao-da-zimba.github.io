import type { EventItem } from "./types";
import { sourceHref } from "./sources";

export const events: EventItem[] = [
  {
    title: "Encontro cultural entre Imbituba e Porto Belo",
    date: "2026-05-08",
    address: "Fundação de Cultura de Porto Belo · Porto Belo — SC",
    description: "Diretores do Mariscão participaram de uma agenda sobre cultura popular, saberes tradicionais, Pontos de Cultura e possibilidades de articulação regional.",
    category: "Articulação cultural",
    status: "past",
    evidence: "record",
    link: sourceHref("porto-belo-2026"),
  },
  {
    title: "A Herança dos Butiazais na Rádio Lagoa Doce",
    date: "2026-02-06",
    address: "Conteúdo publicado pela Rádio Lagoa Doce",
    description: "Registro de uma semana de conversas sobre biologia, memória dos quintais, projetos do Centro, biojoias, gastronomia e cultura do butiá.",
    category: "Memória e educação",
    status: "past",
    evidence: "record",
    link: sourceHref("butiazais-radio-2026"),
  },
  {
    title: "Lançamento do documentário e do Guia Caminho dos Butiazais",
    date: "2025-04-05",
    time: "16h",
    address: "Museu Nacional da Baleia Franca · Vila Nova Alvorada, Imbituba",
    description: "Anúncio publicado em 31 de março de 2025 previa a exibição pública do documentário e a apresentação do guia turístico nesta data. A fonte registra a programação prevista, não a realização do encontro.",
    category: "Cultura e turismo",
    status: "past",
    evidence: "announcement",
    link: sourceHref("lancamento-2025"),
  },
  {
    title: "Exibição do documentário e roda de conversa",
    date: "2025-06-03",
    time: "19h",
    address: "Biblioteca Pública Municipal Cônego Itamar Luiz da Costa · Imbituba",
    description: "Anúncio publicado em 30 de maio de 2025 previa a exibição de Conhecendo o Caminho dos Butiazais seguida de conversa sobre patrimônio ambiental e cultural nesta data. A fonte registra a programação prevista, não a realização do encontro.",
    category: "Cinema e patrimônio",
    status: "past",
    evidence: "announcement",
    link: sourceHref("biblioteca-2025"),
  },
];
