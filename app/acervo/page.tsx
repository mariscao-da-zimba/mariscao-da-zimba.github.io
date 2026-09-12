import Link from "../../components/document-link";
import { ArrowUpRight, FileBadge, Images, PlaySquare, ScrollText } from "lucide-react";
import { PageHero, Section, SectionTitle } from "../../components/ui";
import { site } from "../../content/site";
import { createPageMetadata } from "../../content/metadata";

export const metadata=createPageMetadata({title:"Acervo",description:"Fotos, documentos, vídeos e publicações verificadas do Mariscão da Zimba.",path:"/acervo"});

export default function Acervo(){return <main>
  <PageHero kicker="Patrimônio digital" title="Acervo verificado" intro="Publicações, vídeo, fotografias e documentos disponíveis com sua origem identificada." tone="sand"/>
  <Section>
    <SectionTitle kicker="Seleção disponível" title="Conheça os registros" intro="O acervo cresce à medida que novos materiais recebem identificação, crédito e autorização."/>
    <div className="archive-grid">
      <a className="archive-card" href="/documentos/guia-caminho-dos-butiazais.pdf" target="_blank" rel="noreferrer"><ScrollText aria-hidden="true"/><span>Publicação · 2025</span><h2>Guia Caminho dos Butiazais</h2><p>Publicação oficial com o roteiro dos 14 pontos, fotografias, referências e orientações de visitação.</p><b>Abrir PDF <ArrowUpRight aria-hidden="true"/></b></a>
      <a className="archive-card" href="https://www.youtube.com/watch?v=pAz-L5ygrUc" target="_blank" rel="noreferrer"><PlaySquare aria-hidden="true"/><span>Vídeo · 2025</span><h2>Conhecendo o Caminho dos Butiazais</h2><p>Documentário oficial publicado pelo canal do projeto e realizado com recursos da Lei Paulo Gustavo.</p><b>Assistir no YouTube <ArrowUpRight aria-hidden="true"/></b></a>
      <Link className="archive-card" href="/caminho-dos-butiazais"><Images aria-hidden="true"/><span>Fotografias do guia</span><h2>Galeria dos 14 pontos</h2><p>Imagens do guia organizadas por paisagem, comunidade, trilha e lugar de memória.</p><b>Explorar as imagens <ArrowUpRight aria-hidden="true"/></b></Link>
      <a className="archive-card" href="https://culturaviva.cultura.gov.br/agente/16009841/" target="_blank" rel="noreferrer"><FileBadge aria-hidden="true"/><span>Registro oficial</span><h2>Cadastro Cultura Viva</h2><p>Ficha pública do Centro no Cadastro Nacional de Pontos e Pontões de Cultura.</p><b>Abrir cadastro <ArrowUpRight aria-hidden="true"/></b></a>
      <a className="archive-card" href="https://www.radiolagoadoce.com.br/coluna/a-heranca-dos-butiazais-biologia-saberes-ancestrais-e-a-alma-de-imbituba" target="_blank" rel="noreferrer"><ScrollText aria-hidden="true"/><span>Registro público · 2026</span><h2>A Herança dos Butiazais</h2><p>Memória dos quintais, projetos do Centro, biojoias, ervas, gastronomia e saberes do butiá em uma programação de rádio.</p><b>Ler registro <ArrowUpRight aria-hidden="true"/></b></a>
      <a className="archive-card" href={site.social.linktree} target="_blank" rel="noreferrer"><FileBadge aria-hidden="true"/><span>Canais oficiais</span><h2>Central de links do Caminho</h2><p>Acesso validado ao Instagram, canal do YouTube, documentário e materiais públicos do projeto.</p><b>Abrir canais <ArrowUpRight aria-hidden="true"/></b></a>
    </div>
  </Section>
  <Section className="sand split"><SectionTitle kicker="Ficha técnica" title="Créditos do guia oficial" intro="Créditos transcritos da página 2 da publicação. ISBN 978-65-86387-86-5."/><div className="credit-list"><p><b>Idealização</b><span>Célio de Oliveira e Sandro de Souza, diretores do Centro Cultural e Turístico Mariscão da Zimba</span></p><p><b>Jornalista responsável</b><span>Emanuelle Querino Alves de Aviz</span></p><p><b>Fotografias</b><span>Cláudio Moreira Lima / Morlima Produções</span></p><p><b>Revisão</b><span>Lorraine Amorim Corrêa</span></p><p><b>Projeto gráfico, capa e diagramação</b><span>Rita Motta · Editora Tribo da Ilha</span></p><p><b>Impressão</b><span>Gráfica e Editora Copiart</span></p><p><b>Catalogação</b><span>Andreza dos Santos · CRB 14/866 · CDD 306</span></p><a className="button text" href="/documentos/guia-caminho-dos-butiazais.pdf#page=2" target="_blank" rel="noreferrer">Ver a ficha no PDF <ArrowUpRight aria-hidden="true"/></a></div></Section>
</main>}
