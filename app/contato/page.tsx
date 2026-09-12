import { CalendarClock, Mail, Phone } from "lucide-react";
import { ContactForm } from "../../components/contact-form";
import { PageHero, Section } from "../../components/ui";
import { site } from "../../content/site";
import { createPageMetadata } from "../../content/metadata";
import { SocialIcon } from "../../components/social-icon";

export const metadata=createPageMetadata({title:"Contato",description:"Entre em contato com o Mariscão da Zimba.",path:"/contato"});

export default function Contato() {
  return <main>
    <PageHero kicker="Conversa e colaboração" title="Fale com o Mariscão" intro="Visitas, escolas, pesquisa, imprensa, parcerias culturais, eventos e turismo." />
    <Section className="contact-grid">
      <div>
        <p className="eyebrow">Contato direto</p>
        <h2>{site.phone}</h2>
        <p>Atendimento e visitas mediante agendamento. Fale diretamente pelo WhatsApp, telefone ou e-mail público do Centro.</p>
        <p className="appointment-line"><CalendarClock aria-hidden="true" /> {site.hours}</p>
        <div className="contact-actions">
          <a className="button primary" href={site.social.whatsapp} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp" /> Abrir WhatsApp</a>
          <a className="button ghost" href={site.phoneHref}><Phone aria-hidden="true" /> Ligar</a>
          <a className="button ghost" href={site.emailHref}><Mail aria-hidden="true" /> Enviar e-mail</a>
        </div>
        <div className="contact-socials" aria-label="Canais públicos verificados">
          <a href={site.social.instagram} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="instagram"/></span> Instagram do Caminho</a>
          <a href={site.social.instagramPessoal} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="instagram"/></span> Instagram do Célio Mariscão</a>
          <a href={site.social.facebook} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="facebook"/></span> Facebook do Mariscão</a>
          <a href={site.social.facebookCaminho} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="facebook"/></span> Facebook do Caminho</a>
          <a href={site.social.facebookRota} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="facebook"/></span> Facebook da Rota Açoriana</a>
          <a href={site.social.youtube} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="youtube"/></span> YouTube do Caminho</a>
          <a href={site.social.linktree} target="_blank" rel="noreferrer"><span aria-hidden="true"><SocialIcon name="linktree"/></span> Todos os links oficiais do Caminho</a>
        </div>
      </div>
      <ContactForm />
    </Section>
  </main>;
}
