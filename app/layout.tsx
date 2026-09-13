import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import "./minimal.css";
import "./refinement.css";
import "./butiazinho.css";
import { SiteHeader } from "../components/site-header";
import { Footer } from "../components/footer";
import { MotionEffects } from "../components/motion-effects";

const display = Source_Serif_4({ variable: "--font-display", subsets: ["latin"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4173";

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: { default: "Centro Cultural e Turístico Mariscão da Zimba | Imbituba SC", template: "%s | Mariscão da Zimba" },
  description: "Cultura, memória, natureza e turismo em Imbituba. Conheça o Mariscão da Zimba e o Caminho dos Butiazais.",
  alternates: { canonical: "/" },
  openGraph: { title:"Mariscão da Zimba", description:"Cultura, memória, natureza e turismo em Imbituba.", type:"website", locale:"pt_BR", url:"/", siteName:"Mariscão da Zimba", images:[{url:"/og.jpg",width:1200,height:630,alt:"Mariscão da Zimba — cultura, memória, natureza e turismo em Imbituba"}] },
  twitter: { card:"summary_large_image", title:"Mariscão da Zimba", description:"Cultura, memória, natureza e turismo em Imbituba.", images:["/og.jpg"] },
  icons: { icon:"/images/official/mariscao-logo-icon.jpg", apple:"/images/official/mariscao-logo-icon.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization={"@context":"https://schema.org","@type":"Organization",name:"Centro Cultural e Turístico Mariscão da Zimba",foundingDate:"2008-05-27",url:publicUrl,logo:`${publicUrl}/images/official/mariscao-logo-facebook.jpg`,address:{"@type":"PostalAddress",streetAddress:"Rua Hercílio Nunes, 264",postalCode:"88780-000",addressLocality:"Imbituba",addressRegion:"SC",addressCountry:"BR"},telephone:"+55 48 99608-6600",email:"celiomariscao@gmail.com",contactPoint:{"@type":"ContactPoint",contactType:"agendamento e informações",telephone:"+55 48 99608-6600",email:"celiomariscao@gmail.com",availableLanguage:"pt-BR"},sameAs:["https://www.instagram.com/caminhodosbutiazais/","https://www.instagram.com/celiomariscao/","https://www.facebook.com/100064672632800/","https://www.facebook.com/100066703401695/","https://www.facebook.com/rotaacoriana","https://www.youtube.com/@CaminhodosButiazais","https://linktr.ee/butiazais"]};
  return <html lang="pt-BR"><body className={`${display.variable} ${sans.variable}`}><MotionEffects/><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><SiteHeader/><div id="conteudo" tabIndex={-1}>{children}</div><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/></body></html>;
}
