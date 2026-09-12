import type { Metadata } from "next";
import Link from "../../../components/document-link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getProject, legacyProjectRedirects, projects } from "../../../content/projects";
import { createPageMetadata } from "../../../content/metadata";
import { site } from "../../../content/site";
import { Breadcrumb, PageHero, Section, StatusBadge } from "../../../components/ui";

export async function generateStaticParams(){return projects.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const project=getProject((await params).slug);if(!project)return{};return createPageMetadata({title:project.title,description:project.excerpt,path:`/projetos/${project.slug}`})}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const requestedSlug=(await params).slug;if(legacyProjectRedirects[requestedSlug])permanentRedirect(`/projetos/${legacyProjectRedirects[requestedSlug]}`);const project=getProject(requestedSlug);if(!project)notFound();const links=project.resources||[];const whatsapp=`${site.social.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o projeto ${project.title}.`)}`;return <main>
  <Breadcrumb items={[["Início","/"],["Projetos","/projetos"],[project.title]]}/><PageHero kicker={project.categories.join(" · ")} title={project.title} intro={project.excerpt}/>
  <Section className="split project-detail"><div><StatusBadge status={project.status}/>{project.year&&<p className="project-year">Período documentado: {project.year}</p>}<div className="tag-row">{project.categories.map((category)=><span key={category}>{category}</span>)}</div></div><div className="prose"><p className="project-summary">{project.description}</p>{project.details?.map((detail)=><p key={detail}>{detail}</p>)}<h2>Conteúdo relacionado</h2><div className="resource-links">{links.map((link)=>link.external?<a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight aria-hidden="true"/></a>:<Link key={link.href} href={link.href}>{link.label}<ArrowUpRight aria-hidden="true"/></Link>)}</div><p className="project-transparency">Cada afirmação desta página está ligada aos materiais listados. Quando faltam documentos, a lacuna permanece identificada.</p><a className="button primary" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true"/> Falar sobre este projeto</a></div></Section>
</main>}
