const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "(48) 99608-6600";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/5548996086600";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || "celiomariscao@gmail.com";
const phoneDigits = phone.replace(/\D/g, "");

export const site = {
  name: "Centro Cultural e Turístico Mariscão da Zimba",
  shortName: "Mariscão da Zimba",
  founded: 2008,
  address: ["Rua Hercílio Nunes, 264", "Vila Nova Alvorada / Divinéia", "Imbituba — Santa Catarina — Brasil"],
  phone,
  phoneHref: `tel:+${phoneDigits.startsWith("55") ? phoneDigits : `55${phoneDigits}`}`,
  email,
  emailHref: `mailto:${email}`,
  hours: "Atendimento e visitas mediante agendamento",
  social: {
    whatsapp,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/caminhodosbutiazais/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "https://www.facebook.com/100064672632800/",
    facebookCaminho: process.env.NEXT_PUBLIC_FACEBOOK_CAMINHO || "https://www.facebook.com/100066703401695/",
    facebookRota: process.env.NEXT_PUBLIC_FACEBOOK_ROTA || "https://www.facebook.com/rotaacoriana",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@CaminhodosButiazais",
    linktree: process.env.NEXT_PUBLIC_LINKTREE || "https://linktr.ee/butiazais",
    instagramPessoal: process.env.NEXT_PUBLIC_INSTAGRAM_PESSOAL || "https://www.instagram.com/celiomariscao/",
  },
  documentary: "https://www.youtube.com/watch?v=pAz-L5ygrUc",
  mapsRoute: "https://www.google.com/maps/dir/?api=1&destination=Rua+Hercilio+Nunes+264+Vila+Nova+Alvorada+Imbituba+SC",
  nav: [
    ["Início", "/"], ["O Centro", "/sobre"], ["Caminho dos Butiazais", "/caminho-dos-butiazais"], ["Cultura", "/cultura"], ["Projetos", "/projetos"], ["Agenda", "/agenda"], ["Acervo", "/acervo"], ["Visite", "/visite"],
  ] as const,
};

export const timeline = [
  ["2008", "Fundação da organização cultural em Imbituba."],
  ["2008—2022", "Desenvolvimento de projetos culturais, literários, artesanais e comunitários ligados à memória do litoral catarinense."],
  ["2023", "Projeto Caminho dos Butiazais classificado em programa municipal de incentivo à cultura."],
  ["1º abr. 2024", "A Câmara Municipal de Imbituba entrega Moção de Congratulação ao Mariscão da Zimba pela atuação em favor da memória cultural do município."],
  ["24 jul. 2024", "A Lei Estadual nº 19.013 declara a Cachaça com Butiá integrante do Patrimônio Cultural Imaterial de Santa Catarina. A lei reconhece o bem cultural de forma geral; a justificativa do projeto legislativo registra a contribuição do Mariscão da Zimba."],
  ["2025", "Lançamento do Guia e do documentário Caminho dos Butiazais. Certificação como Ponto de Cultura."],
  ["2026", "Novos registros públicos apresentam a Turma da Maré e articulações do Centro em cultura, turismo e educação ambiental."],
];
