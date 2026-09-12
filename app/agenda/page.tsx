import { ArrowUpRight, CalendarDays, MessageCircle, MapPin } from "lucide-react";
import { PageHero, Section, SectionTitle } from "../../components/ui";
import { events } from "../../content/events";
import { site } from "../../content/site";
import { createPageMetadata } from "../../content/metadata";

export const metadata=createPageMetadata({title:"Agenda",description:"Atividades culturais e educativas do Mariscão da Zimba.",path:"/agenda"});

function EventList({ items }: { items: typeof events }) {
  return <div className="event-list">{items.map((event) => {
    const date = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T00:00:00Z`));
    return <article key={`${event.date}-${event.title}`} className="event-card">
      <div><CalendarDays aria-hidden="true"/><time dateTime={event.date}>{date}{event.time ? ` · ${event.time}` : ""}</time><span>{event.category}</span></div>
      <div><h3>{event.title}</h3><p>{event.description}</p>{event.address&&<p className="event-address"><MapPin aria-hidden="true"/>{event.address}</p>}</div>
      {event.link&&<a href={event.link} target="_blank" rel="noreferrer" aria-label={`Abrir registro público: ${event.title}`}>Ver registro <ArrowUpRight aria-hidden="true"/></a>}
    </article>;
  })}</div>;
}

export default function Agenda(){const upcoming=events.filter((event)=>event.status==="upcoming").sort((a,b)=>a.date.localeCompare(b.date)),past=events.filter((event)=>event.status==="past").sort((a,b)=>b.date.localeCompare(a.date));return <main>
  <PageHero kicker="Encontros" title="Agenda cultural" intro="Atividades, oficinas, visitas e ações comunitárias do Mariscão da Zimba."/>
  <Section><SectionTitle kicker="Em breve" title="Próximas atividades"/>{upcoming.length?<EventList items={upcoming}/>:<div className="agenda-empty"><p>Nenhuma nova data foi confirmada. Consulte o Centro ou acompanhe o canal oficial do Caminho para receber as próximas atualizações.</p><div className="actions"><a className="button primary" href={site.social.whatsapp} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true"/> Consultar pelo WhatsApp</a><a className="button text" href={site.social.instagram} target="_blank" rel="noreferrer">Acompanhar no Instagram <ArrowUpRight aria-hidden="true"/></a></div></div>}</Section>
  <Section className="sand"><SectionTitle kicker="Memória da agenda" title="Atividades realizadas" intro="Registros públicos com data, local e referência externa."/><EventList items={past}/></Section>
</main>}
