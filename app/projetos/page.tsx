import { ProjectCatalog } from "../../components/project-catalog";
import { PageHero, Section } from "../../components/ui";
import { createPageMetadata } from "../../content/metadata";

export const metadata=createPageMetadata({title:"Projetos",description:"Projetos culturais, ambientais, turísticos e educativos do Mariscão da Zimba.",path:"/projetos"});
export default function Projetos(){return <main><PageHero kicker="Projetos e trajetórias" title="Ideias que mantêm a cultura viva" intro="Iniciativas atuais, permanentes e históricas são apresentadas com seu contexto — sem sugerir que todas estejam ativas hoje."/><Section><ProjectCatalog/></Section></main>}
