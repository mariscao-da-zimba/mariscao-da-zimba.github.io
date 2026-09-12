/* eslint-disable @next/next/no-img-element -- verified official logo is a local, dimensioned asset */
import Link from "./document-link";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "../content/site";
import { SocialIcon } from "./social-icon";

const socialLinks = [
  ["Instagram do Caminho dos Butiazais", site.social.instagram, "instagram"],
  ["Instagram pessoal do Célio Mariscão", site.social.instagramPessoal, "instagram"],
  ["Facebook do Mariscão da Zimba", site.social.facebook, "facebook"],
  ["Facebook do Caminho dos Butiazais", site.social.facebookCaminho, "facebook"],
  ["Facebook da Rota Açoriana", site.social.facebookRota, "facebook"],
  ["YouTube do Caminho dos Butiazais", site.social.youtube, "youtube"],
  ["Linktree do Caminho dos Butiazais", site.social.linktree, "linktree"],
  ["WhatsApp do Mariscão da Zimba", site.social.whatsapp, "whatsapp"],
] as const;

export function Footer(){return <footer className="site-footer"><div className="footer-inner"><div className="footer-topline"><span>Imbituba · Santa Catarina</span><i>cultura viva à beira-mar</i></div><div className="footer-grid"><div className="footer-brand"><div className="footer-brand-lockup"><img src="/images/official/mariscao-logo-facebook.jpg" width="932" height="951" alt="" loading="lazy"/><h2>Mariscão<br/>da Zimba</h2></div><p>Cultura, memória, natureza e turismo construídos com a comunidade.</p><div className="social-row" aria-label="Redes sociais e canais oficiais">{socialLinks.map(([label,href,icon])=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><SocialIcon name={icon}/></a>)}</div></div><nav className="footer-nav" aria-label="Descubra"><h3>Descubra</h3><Link href="/sobre">O Centro</Link><Link href="/caminho-dos-butiazais">Caminho dos Butiazais</Link><Link href="/projetos">Projetos</Link><Link href="/cultura">Cultura</Link><Link href="/memoria">Memória</Link><Link href="/educacao-ambiental">Educação ambiental</Link></nav><div className="footer-visit"><h3>Visite</h3>{site.address.map((line)=><span key={line}>{line}</span>)}<p className="footer-hours"><CalendarClock aria-hidden="true"/>{site.hours}</p><a className="footer-map" href={site.mapsRoute} target="_blank" rel="noreferrer"><MapPin aria-hidden="true"/> Traçar rota</a></div><div className="footer-contact"><h3>Fale com o Centro</h3><a className="footer-contact-link" href={site.social.whatsapp} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp"/><span>WhatsApp<strong>{site.phone}</strong></span></a><a className="footer-contact-link" href={site.emailHref}><Mail aria-hidden="true"/><span>E-mail<strong>{site.email}</strong></span></a><a className="footer-contact-link" href={site.phoneHref}><Phone aria-hidden="true"/><span>Telefone<strong>{site.phone}</strong></span></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Centro Cultural e Turístico Mariscão da Zimba.</span><span><Link href="/fontes">Fontes</Link><Link href="/privacidade">Privacidade</Link><Link href="/acessibilidade">Acessibilidade</Link></span></div></div></footer>}
