import type { MetadataRoute } from "next";
import { projects } from "../content/projects";
import { landmarks } from "../content/landmarks";

const publicUrl=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:4173").replace(/\/$/,"");
const lastContentUpdate=new Date("2026-08-24T00:00:00-03:00");

export default function sitemap():MetadataRoute.Sitemap{const pages=["","/sobre","/caminho-dos-butiazais","/projetos","/cultura","/memoria","/educacao-ambiental","/agenda","/acervo","/visite","/contato","/fontes","/privacidade","/acessibilidade"];return[...pages.map((url)=>({url:publicUrl+url,lastModified:lastContentUpdate,changeFrequency:"monthly" as const,priority:url===""?1:.7})),...projects.map((project)=>({url:`${publicUrl}/projetos/${project.slug}`,lastModified:lastContentUpdate,changeFrequency:"monthly" as const,priority:.6})),...landmarks.map((landmark)=>({url:`${publicUrl}/caminho-dos-butiazais/${landmark.slug}`,lastModified:lastContentUpdate,changeFrequency:"monthly" as const,priority:.7}))]}
