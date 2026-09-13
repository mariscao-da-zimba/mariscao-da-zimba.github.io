/* eslint-disable @next/next/no-img-element -- static guide assets are pre-compressed WebP */
import Link from "../components/document-link";
import { ButiazinhoFeature } from "../components/butiazinho-feature";
import { guideImageSrcSet, landmarks } from "../content/landmarks";
import { projects } from "../content/projects";
import { timeline } from "../content/site";
import { highlights } from "../content/highlights";
import { StatusBadge } from "../components/ui";
import { ArrowDownRight, ArrowUpRight, Compass, Leaf, Waves, BookOpen, Users } from "lucide-react";

const pillarIcons = [Waves, BookOpen, Leaf, Compass, Users];

const pillars = [
  ["Cultura", "Tradições, artesanato, música e manifestações populares."],
  ["Memória", "Histórias das comunidades, famílias, trabalhadores e lugares."],
  ["Natureza", "Butiazais, lagoas, praias, dunas e biodiversidade costeira."],
  ["Turismo", "Experiências culturais cuidadosas e de base comunitária."],
  ["Educação", "Patrimônio, cultura e ambiente para novas gerações."],
];

const featuredProjectSlugs = ["caminho-dos-butiazais", "rota-acoriana", "turma-da-mare", "sonho-de-liberdade"];
const featuredProjects = featuredProjectSlugs.map((slug)=>projects.find((project)=>project.slug===slug)).filter((project)=>project!==undefined);

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero hero-editorial">
        <div className="hero-copy">
          <p className="eyebrow">Ponto de Cultura · Imbituba · Santa Catarina</p>
          <h1 aria-label="Onde a cultura encontra o mar."><span>Onde a cultura</span>{" "}<em>encontra o mar.</em></h1>
          <p className="lead">Memória, natureza e saberes vivos do litoral catarinense — compartilhados por quem faz parte deste território.</p>
          <div className="actions"><Link className="button primary" href="/sobre">Conheça o Centro</Link><Link className="button text" href="/caminho-dos-butiazais">Explore o Caminho <span aria-hidden="true">↗</span></Link></div>
          <a className="hero-scroll" href="#territorio"><span>Uma história para conhecer</span><ArrowDownRight aria-hidden="true"/></a>
        </div>
        <figure className="hero-photo"><img src="/images/official/butiazais-hero-restored.webp" alt="Vista aérea dos butiazais e do litoral de Imbituba" width="1672" height="941" fetchPriority="high" decoding="async"/><figcaption><span>01</span> Butiazais de Imbituba <small>Frame restaurado do documentário oficial</small></figcaption></figure>
      </section>
      <div className="culture-marquee" aria-hidden="true"><div><span>Cultura viva</span><i>•</i><span>Memória</span><i>•</i><span>Natureza</span><i>•</i><span>Território</span><i>•</i><span>Imbituba</span><i>•</i><span>Cultura viva</span><i>•</i><span>Memória</span><i>•</i><span>Natureza</span><i>•</i><span>Território</span><i>•</i><span>Imbituba</span></div></div>
      <section className="intro intro-statement" id="territorio">
        <p className="section-number">01 — O Centro</p>
        <div><h2>Uma história construída com a comunidade</h2><p>Fundado em 2008 em Imbituba, o Mariscão da Zimba atua na valorização da cultura, da memória, da natureza e dos saberes das comunidades do litoral catarinense.</p><Link href="/sobre">Conheça nossa trajetória →</Link></div>
      </section>
      <ButiazinhoFeature />
      <section className="pillars" aria-labelledby="pilares"><div className="section-heading"><p className="eyebrow">O que nos move</p><h2 id="pilares">Um centro, muitos encontros</h2></div><div className="pillar-grid">{pillars.map(([title, text], i) => {const Icon = pillarIcons[i]; return <article key={title}><div className="pillar-top"><span>0{i + 1}</span><Icon aria-hidden="true"/></div><h3>{title}</h3><p>{text}</p></article>;})}</div></section>
      <section className="home-route"><div className="home-route-copy"><p className="eyebrow">Projeto em destaque · 14 pontos</p><h2>Caminho dos Butiazais</h2><p>Um roteiro cultural, turístico e ambiental atravessando lagoa, dunas, praias, costões, trilhas e lugares de memória.</p><div className="actions"><Link className="button primary" href="/caminho-dos-butiazais">Explorar o percurso</Link><a className="button ghost" href="/documentos/guia-caminho-dos-butiazais.pdf" target="_blank" rel="noreferrer">Abrir guia oficial</a></div></div><div className="route-gallery">{landmarks.slice(0,6).map((l,i)=><Link key={l.slug} href={`/caminho-dos-butiazais/${l.slug}`}><img src={l.image} srcSet={guideImageSrcSet(l.image,l.imageWidth)} sizes="(max-width: 560px) calc(100vw - 44px), (max-width: 900px) calc(50vw - 30px), 30vw" alt="" width={l.imageWidth} height={l.imageHeight} loading="lazy" decoding="async"/><span>{String(i+1).padStart(2,"0")} · {l.name}</span></Link>)}</div></section>
      <section className="home-projects"><div className="section-heading"><div><p className="eyebrow">Iniciativas</p><h2>Projetos que mantêm a cultura viva</h2></div><Link href="/projetos">Ver todos →</Link></div><div className="project-strip">{featuredProjects.map((p,i)=><Link href={`/projetos/${p.slug}`} key={p.slug}><span className="project-index">0{i+1}</span><StatusBadge status={p.status}/><h3>{p.title}</h3><p>{p.excerpt}</p><span className="project-open">Conhecer projeto <ArrowUpRight aria-hidden="true"/></span></Link>)}</div></section>
      <section className="home-now"><div className="section-heading"><div><p className="eyebrow">Registros recentes</p><h2>O Mariscão em movimento</h2></div><Link href="/agenda">Ver agenda →</Link></div><div className="now-grid">{highlights.map((item,index)=><a href={item.href} target="_blank" rel="noreferrer" key={item.href}><span>0{index+1} · {item.date}</span><h3>{item.title}</h3><p>{item.text}</p><b>Abrir registro público ↗</b></a>)}</div></section>
      <section className="home-timeline"><div><p className="eyebrow">Desde 2008</p><h2>Uma história em movimento</h2><Link className="button text" href="/sobre">Conheça nossa história →</Link></div><div className="timeline">{timeline.map(([year,text])=><article key={year}><time>{year}</time><p>{text}</p></article>)}</div></section>
      <section className="home-visit"><p className="eyebrow">Visite</p><h2>Um lugar de memória,<br/>um espaço de encontro.</h2><p>Rua Hercílio Nunes, 264 · Vila Nova Alvorada / Divinéia · Imbituba — Santa Catarina</p><Link className="button primary" href="/visite">Planeje sua visita</Link></section>
    </main>
  );
}
