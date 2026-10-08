import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionTitle } from "../../components/ui";
import { sourceAvailabilityNote, sources } from "../../content/sources";
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
    <Section><SectionTitle kicker="Referências identificadas" title="Base documental" intro="Documentos, cadastros, canais e reportagens em sua origem. Referências com endereço indisponível permanecem identificadas, sem link externo ativo."/><div className="source-list">{sources.map((source)=><article id={`fonte-${source.id}`} key={source.id}><span>{levelLabels[source.level]}</span><div><h2>{source.title}</h2><p>{source.institution}{source.publishedAt && ` · publicado em ${new Intl.DateTimeFormat("pt-BR", {timeZone:"UTC"}).format(new Date(`${source.publishedAt}T00:00:00Z`))}`}</p>{sourceAvailabilityNote(source) ? <p>{sourceAvailabilityNote(source)}</p> : source.url && <a href={source.url} target="_blank" rel="noreferrer">Abrir fonte <ArrowUpRight aria-hidden="true"/></a>}</div></article>)}</div><p className="note">Links externos abrem em nova guia para facilitar a comparação com o conteúdo do portal. A disponibilidade é uma observação datada, não uma afirmação de que a publicação deixou de existir.</p></Section>
  </main>;
}
