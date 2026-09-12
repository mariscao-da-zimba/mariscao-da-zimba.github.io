import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionTitle } from "../../components/ui";
import { sources } from "../../content/sources";
import type { EvidenceLevel } from "../../content/types";
import { createPageMetadata } from "../../content/metadata";

const levelLabels: Record<EvidenceLevel, string> = {
  official: "Fonte oficial",
  institutional: "Fonte institucional",
  "project-material": "Material do projeto",
  press: "Imprensa",
  "oral-history": "Memória oral",
  "pending-validation": "Em validação",
};

export const metadata=createPageMetadata({title:"Fontes",description:"Referências e política editorial do site do Mariscão da Zimba.",path:"/fontes"});

export default function Fontes() {
  return <main>
    <PageHero kicker="Transparência editorial" title="Fontes e referências" intro="Este site distingue documentos oficiais, materiais do projeto, imprensa, memória oral e informações em validação." tone="sand" />
    <Section className="split"><SectionTitle kicker="Critério" title="Como cuidamos da informação"/><div className="prose"><p>Datas, cargos, coordenadas, estatísticas, depoimentos e biografias só entram quando existe uma referência identificável. Informações operacionais que podem mudar, como horários e condições de trilhas, pedem confirmação atual.</p><p>Temas indígenas, ambientais, afro-brasileiros, arqueológicos e históricos especializados devem incorporar múltiplas fontes e autoria responsável.</p></div></Section>
    <Section><SectionTitle kicker="Referências verificadas" title="Base documental" intro="Abra cada documento, cadastro, canal ou reportagem em sua origem."/><div className="source-list">{sources.map((source)=><article key={source.id}><span>{levelLabels[source.level]}</span><div><h2>{source.title}</h2><p>{source.institution}</p>{source.url&&<a href={source.url} target="_blank" rel="noreferrer">Abrir fonte <ArrowUpRight aria-hidden="true"/></a>}</div></article>)}</div><p className="note">Links externos abrem em nova guia para facilitar a comparação com o conteúdo do portal.</p></Section>
  </main>;
}
