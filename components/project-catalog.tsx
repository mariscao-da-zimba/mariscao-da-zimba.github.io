"use client";

import Link from "./document-link";
import { useMemo, useState } from "react";
import { projects } from "../content/projects";
import { StatusBadge } from "./ui";

const categories = ["Todos", "Cultura", "Memória", "Turismo", "Educação", "Meio ambiente", "Literatura", "Gastronomia"];

export function ProjectCatalog() {
  const [active, setActive] = useState("Todos");
  const visible = useMemo(() => active === "Todos" ? projects : projects.filter((project) => project.categories.includes(active)), [active]);

  return <><div className="filter-row" role="group" aria-label="Filtrar projetos por categoria">{categories.map((category)=><button type="button" key={category} aria-pressed={active===category} onClick={()=>setActive(category)}>{category}</button>)}</div><p className="filter-result" aria-live="polite">{visible.length} {visible.length===1?"projeto encontrado":"projetos encontrados"}</p><div className="project-grid">{visible.map((project)=>{const index=projects.indexOf(project);return <Link href={`/projetos/${project.slug}`} className={`project-card project-${index%4}`} key={project.slug}><div className="card-art" aria-hidden="true"><span>{String(index+1).padStart(2,"0")}</span></div><div><StatusBadge status={project.status}/><h2>{project.title}</h2><p>{project.excerpt}</p><span className="card-link">Conhecer o projeto →</span></div></Link>})}</div></>;
}
