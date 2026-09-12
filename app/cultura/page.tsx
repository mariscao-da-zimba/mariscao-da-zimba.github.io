import Link from "../../components/document-link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionTitle } from "../../components/ui";
import { createPageMetadata } from "../../content/metadata";

export const metadata=createPageMetadata({title:"Cultura",description:"A formação cultural plural de Imbituba em memória, práticas e saberes.",path:"/cultura"});
const themes=[
  ["Cultura de base açoriana","Referências presentes em modos de fazer, festas, narrativas, literatura e relações comunitárias. A Rota Açoriana conecta essa memória a intercâmbios no litoral catarinense."],
  ["Presença afro-brasileira","Uma dimensão essencial da formação cultural local, que pede pesquisa, memória oral e protagonismo das próprias comunidades."],
  ["Povos e memórias indígenas","Vestígios arqueológicos e histórias do território que exigem escuta, autoria responsável e validação especializada."],
  ["Pesca artesanal","Saberes do mar, trabalho coletivo, ranchos, tainha e transmissão entre gerações."],
  ["Boi de Mamão","Cultura popular feita de música, personagens, encontro e literatura infantil, presente no projeto Viva o Boi."],
  ["Artesanato","Criação com identidade cultural, participação em feiras e relação responsável com materiais do território."],
  ["Gastronomia e butiá","Sabores locais e produtos ligados ao butiá. A Lei Estadual nº 19.013/2024 declara a Cachaça com Butiá integrante do Patrimônio Cultural Imaterial do Estado de Santa Catarina."],
  ["Música, literatura e oralidade","Canções, livros, contos e relatos que registram a memória de Imbituba e suas conexões açorianas."],
  ["Lavadeiras da Praia do Porto","Memória do trabalho e da vida comunitária reconhecida entre os projetos históricos do Centro."],
  ["Comunidades tradicionais","Sujeitos vivos do território, apresentados com respeito à pluralidade e às próprias vozes."],
];

export default function Cultura(){return <main>
  <PageHero kicker="Muitas raízes · Um território" title="A cultura de Imbituba é plural" intro="Presenças açorianas, afro-brasileiras, indígenas, pesqueiras e populares — sem reduzir a história a uma única origem." tone="blue"/>
  <Section><SectionTitle kicker="Temas documentados" title="Saberes que atravessam o tempo"/><div className="theme-list">{themes.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{text}</p>{title==="Gastronomia e butiá"&&<a href="https://leis.alesc.sc.gov.br/ato-normativo/22514" target="_blank" rel="noreferrer">Abrir Lei nº 19.013/2024 <ArrowUpRight aria-hidden="true"/></a>}</div></article>)}</div></Section>
  <Section className="sand split"><SectionTitle kicker="Continue explorando" title="A cultura também está no percurso"/><div className="resource-links"><Link href="/projetos">Conhecer os projetos <ArrowUpRight aria-hidden="true"/></Link><Link href="/memoria">Ler histórias do território <ArrowUpRight aria-hidden="true"/></Link><Link href="/caminho-dos-butiazais">Explorar os 14 pontos <ArrowUpRight aria-hidden="true"/></Link></div></Section>
</main>}
