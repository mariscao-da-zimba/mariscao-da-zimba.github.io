import type { Project } from "./types";

const chamberRecord = "https://www.imbituba.sc.leg.br/proposicoes/Mocoes/0/1/0/5064";
const institutionalProfile = "https://portalahora.com.br/noticias/mariscao-da-zimba-instituicao-cultural-e-turistica-busca-manter-a-historia-do-litoral-catarinense-viva/";
const acimRecord = "https://www.acimimbituba.org/single-post/nucleo-de-estudos-acorianos-visita-imbituba-1";
const bookFairRecord = "https://hnoticias.com.br/cultura/3-feira-do-livro-de-imbituba-acontece-nesta-sexta-e-sabado-16-e-17-de-dezembro-5489";
const jorgeProfile = "https://horahiper.com.br/geral/livro-jorge-coelho-coracao-acoriano-sera-lancado-nesta-semana-em-imbituba-10718";
const radioRecord = "https://www.radiolagoadoce.com.br/coluna/a-heranca-dos-butiazais-biologia-saberes-ancestrais-e-a-alma-de-imbituba";

export const projects: Project[] = [
  {
    slug: "caminho-dos-butiazais",
    title: "Caminho dos Butiazais",
    excerpt: "Paisagens, comunidades e saberes conectados por um roteiro de 14 pontos.",
    description: "Projeto de valorização cultural, ambiental e turística de Imbituba, estruturado em um guia oficial, um documentário e um percurso por 14 lugares.",
    details: [
      "O resultado do Edital Procult 01/2023 registra o Caminho dos Butiazais entre os projetos classificados em Imbituba.",
      "O guia e o documentário foram lançados publicamente em abril de 2025. Em junho do mesmo ano, o filme voltou à programação da Biblioteca Pública de Imbituba, acompanhado de roda de conversa e distribuição do guia.",
    ],
    status: "permanent",
    year: "2023—",
    categories: ["Turismo", "Memória", "Meio ambiente"],
    resources: [
      { label: "Explorar os 14 pontos", href: "/caminho-dos-butiazais" },
      { label: "Abrir o guia oficial", href: "/documentos/guia-caminho-dos-butiazais.pdf", external: true },
      { label: "Assistir ao documentário", href: "https://www.youtube.com/watch?v=pAz-L5ygrUc", external: true },
      { label: "Consultar o resultado do Procult", href: "https://s3cache.dom.sc.gov.br/atos/2024/01/1706218503_procult_2023_final_recursos_e_classificados_e_nao_classificados.pdf", external: true },
    ],
    sources: ["guia-2025", "documentario-2025", "procult-2023", "lancamento-2025", "biblioteca-2025"],
  },
  {
    slug: "rota-acoriana",
    title: "Rota Açoriana",
    excerpt: "Memória e tradições de base açoriana conectando o litoral catarinense.",
    description: "Roteiro cultural articulado pelo Mariscão da Zimba para valorizar referências açorianas, intercâmbios e ações comunitárias no litoral catarinense.",
    details: [
      "Um perfil institucional publicado em 2024 descreve a abrangência entre Laguna e Porto Belo. Registro da Associação Empresarial de Imbituba também relaciona a Rota a uma parceria entre 16 municípios para fortalecer o artesanato com identidade cultural.",
      "A participação do Mariscão no Conselho Deliberativo do Núcleo de Estudos Açorianos da UFSC documenta uma das conexões institucionais da iniciativa.",
    ],
    status: "permanent",
    year: "Registro público desde 2019",
    categories: ["Cultura", "Memória", "Turismo"],
    resources: [
      { label: "Conhecer o NEA/UFSC", href: "https://nea.ufsc.br/conselho-deliberativo/", external: true },
      { label: "Ler o registro da ACIM", href: acimRecord, external: true },
      { label: "Ler o perfil institucional", href: institutionalProfile, external: true },
    ],
    sources: ["nea-ufsc", "acim-2019", "perfil-institucional-2024"],
  },
  {
    slug: "lavadeiras-da-praia-do-porto",
    title: "Lavadeiras da Praia do Porto",
    excerpt: "Resgate da memória das trabalhadoras e da vida comunitária ligada à Praia do Porto.",
    description: "Frente de memória reconhecida em registros públicos da trajetória do Mariscão da Zimba, preservada aqui sem criar nomes, depoimentos ou biografias que ainda não tenham fonte identificada.",
    details: [
      "A homenagem realizada pela Câmara Municipal em 2024 cita o resgate das Lavadeiras da Praia do Porto entre os trabalhos marcantes da associação.",
      "Um registro de 2019 sobre a visita do NEA a Imbituba também inclui as Lavadeiras entre os focos apresentados pela Rota Açoriana.",
    ],
    status: "historical",
    categories: ["Memória", "Cultura"],
    resources: [
      { label: "Ler a homenagem da Câmara", href: chamberRecord, external: true },
      { label: "Consultar o registro da ACIM", href: acimRecord, external: true },
      { label: "Conhecer as memórias do território", href: "/memoria" },
    ],
    sources: ["camara-mocao-2023", "camara-2024", "acim-2019"],
  },
  {
    slug: "artesanato-com-identidade",
    title: "Artesanato com identidade cultural",
    excerpt: "Saberes manuais, materiais do território e criação com pertencimento.",
    description: "Conjunto de ações e articulações voltadas ao artesanato de referência cultural, ligado à memória, à geração de renda e às relações entre municípios do litoral.",
    details: [
      "O registro da visita do NEA a Imbituba, em 2019, menciona uma parceria entre 16 municípios para o fortalecimento do artesanato com identidade cultural.",
      "O perfil institucional de 2024 relaciona a produção a itens como colchas de fuxico e aos saberes de pescadores, trançadeiras e lavadeiras.",
    ],
    status: "permanent",
    categories: ["Cultura", "Educação"],
    resources: [
      { label: "Ler o registro da ACIM", href: acimRecord, external: true },
      { label: "Ler o perfil institucional", href: institutionalProfile, external: true },
      { label: "Conhecer cultura e saberes locais", href: "/cultura" },
    ],
    sources: ["acim-2019", "perfil-institucional-2024"],
  },
  {
    slug: "viva-o-boi",
    title: "Viva o Boi",
    excerpt: "Livro infantil e transmissão contemporânea da cultura do Boi de Mamão.",
    description: "Projeto associado ao livro infantil Viva o Boi, que apresenta a lenda do Boi de Mamão e aproxima a cultura popular de novas gerações.",
    details: [
      "O livro aparece entre as iniciativas vinculadas à atuação cultural do Centro em perfil público de 2024. O portal preserva esse vínculo sem atribuir autoria editorial que a fonte não esclareça.",
    ],
    status: "historical",
    categories: ["Cultura", "Educação", "Literatura"],
    resources: [
      { label: "Ler o perfil institucional", href: institutionalProfile, external: true },
      { label: "Conhecer a cultura popular", href: "/cultura" },
    ],
    sources: ["perfil-institucional-2024"],
  },
  {
    slug: "jorge-coelho-coracao-acoriano",
    title: "Jorge Coelho — Coração Açoriano",
    excerpt: "Livro-memória sobre a vida, a obra e os vínculos açorianos do músico.",
    description: "Publicação idealizada por Célio de Oliveira e escrita pela jornalista Emanuelle Querino Alves de Aviz, reunindo entrevistas, memórias e a obra musical de Jorge Coelho.",
    details: [
      "A obra conecta Imbituba, Florianópolis e os Açores e foi lançada em dezembro de 2022, durante a 3ª Feira do Livro de Imbituba.",
      "A programação pública identifica Célio de Oliveira como produtor cultural e coordenador dos projetos Rota Açoriana e Caminho dos Butiazais.",
    ],
    status: "archive",
    year: "2022",
    categories: ["Cultura", "Memória", "Literatura"],
    resources: [
      { label: "Ler a apresentação do livro", href: jorgeProfile, external: true },
      { label: "Ver o registro da Feira do Livro", href: bookFairRecord, external: true },
    ],
    sources: ["jorge-coelho-2022", "jorge-coelho-hora-2022"],
  },
  {
    slug: "chico-pomboca",
    title: "Chico Pomboca, o viajante do tempo",
    excerpt: "Conto de Célio de Oliveira levado à narração pública.",
    description: "Conto apresentado por Daniela Scartazzini na 3ª Feira do Livro de Imbituba, em dezembro de 2022.",
    details: [
      "A programação da feira confirma Célio de Oliveira como autor e registra a circulação pública da obra em uma atividade literária do município.",
    ],
    status: "archive",
    year: "2022",
    categories: ["Cultura", "Memória", "Literatura"],
    resources: [{ label: "Ver o registro da Feira do Livro", href: bookFairRecord, external: true }],
    sources: ["jorge-coelho-2022"],
  },
  {
    slug: "turma-da-mare",
    title: "Turma da Maré",
    excerpt: "Arte, memória, turismo e consciência ambiental para diferentes gerações.",
    description: "Coletivo ligado ao Centro que utiliza espetáculos e narrativas para aproximar cultura popular, pertencimento, turismo sensível e educação ambiental.",
    details: [
      "Reportagem publicada em julho de 2026 descreve o trabalho da Turma da Maré no Mariscão da Zimba e sua abordagem sobre costumes, histórias, oceanos e biodiversidade.",
    ],
    status: "current",
    year: "2026",
    categories: ["Educação", "Meio ambiente", "Cultura"],
    resources: [
      { label: "Ler o registro de 2026", href: "https://www.jornalpopularcatarinense.com.br/turma-da-mare-transforma-cultura-turismo-e-consciencia-ambiental-em-espetaculo-de-cidadania/", external: true },
      { label: "Conhecer a educação ambiental", href: "/educacao-ambiental" },
    ],
    sources: ["turma-da-mare-2026"],
  },
  {
    slug: "sonho-de-liberdade",
    title: "Sonho de Liberdade",
    excerpt: "Memória artística do batismo de fogo de Anita Garibaldi na Batalha Naval de Imbituba.",
    description: "Projeto cultural dedicado ao episódio de 4 de novembro de 1839, quando Anita Garibaldi participou de seu primeiro combate na baía de Imbituba, ao lado dos republicanos contra as forças navais imperiais.",
    details: [
      "A ação naval ocorreu na baía e na ponta de Imbituba. Registros históricos identificam, entre as embarcações imperiais, Bela Americana, Patagônia e Andorinha. O episódio ficou conhecido como o batismo de fogo de Anita, a Heroína dos Dois Mundos.",
      "A memória desse acontecimento permanece na paisagem de Imbituba. O Mirante da Praia do Porto reúne referências à Batalha Naval de Imbituba e a Anita Garibaldi; a localização do marco atual não deve ser confundida com uma delimitação exata do campo de batalha de 1839.",
      "Na inauguração do mosaico de Anita Garibaldi em Imbituba, em 2021, a atriz Fernanda Zague declamou o poema “Um Sonho de Liberdade”, de Célio de Oliveira — registro público que documenta a expressão artística ligada ao projeto.",
    ],
    status: "historical",
    year: "4 de novembro de 1839 · registro cultural em 2021",
    categories: ["Memória", "Cultura", "História"],
    resources: [
      { label: "Ler o registro oficial do batismo de fogo", href: "https://laguna.sc.gov.br/noticia-660080/", external: true },
      { label: "Conhecer o Mirante da Praia do Porto", href: "/caminho-dos-butiazais/mirante-da-praia-do-porto" },
      { label: "Ver o registro de Um Sonho de Liberdade", href: "https://horahiper.com.br/geral/mosaico-de-anita-garibaldi-e-inaugurado-em-imbituba-6152", external: true },
    ],
    sources: ["anita-imbituba-1839", "imbituba-proposta-curricular", "sonho-liberdade-2021"],
  },
  {
    slug: "butia-raizes",
    title: "Butiá Raízes",
    excerpt: "Memória, identidade e saberes relacionados ao butiá.",
    description: "Projeto citado em registro institucional da Rota Açoriana e da atuação do Mariscão, relacionado aos modos de fazer e às referências culturais do território.",
    details: [
      "A Associação Empresarial de Imbituba registrou o projeto entre os focos apresentados durante uma visita do Núcleo de Estudos Açorianos, em dezembro de 2019.",
      "Registros públicos de 2026 ampliam esse campo ao citar biojoias feitas com coquinho, ervas, geleias, cachaça curtida e sorvetes de butiá em atividades ligadas ao Centro.",
    ],
    status: "historical",
    year: "Registro público em 2019 e 2026",
    categories: ["Cultura", "Memória", "Meio ambiente"],
    resources: [
      { label: "Ler o registro da ACIM", href: acimRecord, external: true },
      { label: "Ler a matéria de 2026", href: radioRecord, external: true },
    ],
    sources: ["acim-2019", "butiazais-radio-2026"],
  },
  {
    slug: "cachaca-com-butia-acoriana",
    title: "Cachaça com Butiá — Mariscão da Zimba",
    excerpt: "Sabores e fazeres do litoral catarinense reconhecidos como patrimônio cultural.",
    description: "Produto apresentado pelo guia como Cachaça com Butiá Açoriana, realizado em parceria com a Cachaça do Conde e destacado entre as iniciativas do Centro Cultural e Turístico Mariscão da Zimba.",
    details: [
      "A Lei Estadual nº 19.013, de 24 de julho de 2024, declarou a Cachaça com Butiá integrante do Patrimônio Cultural Imaterial do Estado de Santa Catarina, por representar os sabores e fazeres do litoral catarinense.",
      "O texto final da lei reconhece a Cachaça com Butiá como bem cultural e não cita uma marca. A ligação com o Mariscão da Zimba está documentada na justificativa do Projeto de Lei nº 0169/2023 e no guia oficial do Caminho dos Butiazais.",
    ],
    status: "permanent",
    year: "Reconhecimento estadual em 2024",
    categories: ["Cultura", "Memória", "Gastronomia"],
    resources: [
      { label: "Abrir a Lei nº 19.013/2024", href: "https://leis.alesc.sc.gov.br/ato-normativo/22514", external: true },
      { label: "Ler a justificativa do projeto de lei", href: "https://portalelegis.alesc.sc.gov.br/documentos/zJyx0/download", external: true },
      { label: "Consultar o guia oficial", href: "/documentos/guia-caminho-dos-butiazais.pdf#page=41", external: true },
    ],
    sources: ["lei-19013", "pl-169-justificativa", "guia-2025"],
  },
  {
    slug: "batismo-de-fogo-de-anita",
    title: "Batismo de Fogo de Anita Garibaldi",
    excerpt: "História marítima de Imbituba articulada à memória de Anita Garibaldi.",
    description: "Frente histórica citada entre os trabalhos da Rota Açoriana e ligada às referências de Anita Garibaldi na paisagem portuária de Imbituba.",
    details: [
      "O projeto aparece em registro institucional de 2019. O Guia Caminho dos Butiazais também relaciona o Mirante da Praia do Porto ao batismo de fogo de Anita Garibaldi.",
    ],
    status: "historical",
    year: "2019",
    categories: ["Memória", "Cultura"],
    resources: [
      { label: "Ler o registro da ACIM", href: acimRecord, external: true },
      { label: "Conhecer o Mirante da Praia do Porto", href: "/caminho-dos-butiazais/mirante-da-praia-do-porto" },
    ],
    sources: ["acim-2019", "guia-2025"],
  },
  {
    slug: "celebracao-270-anos-acorianos",
    title: "270 anos da chegada dos açorianos",
    excerpt: "Celebração histórica da presença açoriana em Santa Catarina.",
    description: "Ação comemorativa citada pela Câmara Municipal entre os projetos e iniciativas relevantes realizados pelo Mariscão da Zimba.",
    details: [
      "A ata da homenagem de 2024 registra a celebração dos 270 anos da chegada dos açorianos em Santa Catarina como parte da trajetória pública da associação.",
    ],
    status: "historical",
    categories: ["Cultura", "Memória"],
    resources: [{ label: "Ler a homenagem da Câmara", href: chamberRecord, external: true }],
    sources: ["camara-mocao-2023", "camara-2024"],
  },
  {
    slug: "as-faces-de-anita",
    title: "As Faces de Anita",
    excerpt: "Projeto anunciado em 2024; execução e estágio atual ainda precisam de confirmação.",
    description: "Registro transparente de uma iniciativa citada por Célio de Oliveira durante a homenagem da Câmara Municipal de Imbituba em abril de 2024.",
    details: [
      "Na fala registrada em ata, o projeto aparece entre os investimentos então planejados pelo Centro, ao lado do documentário e do guia do Caminho dos Butiazais.",
      "Não foi localizada uma fonte pública posterior que confirme lançamento, cronograma ou conclusão. Por isso, o portal mantém somente o anúncio documentado.",
    ],
    status: "development",
    year: "Anunciado em 2024",
    categories: ["Memória", "Cultura"],
    resources: [{ label: "Ler o registro da Câmara", href: chamberRecord, external: true }],
    sources: ["camara-mocao-2023", "camara-2024"],
  },
];

export const legacyProjectRedirects: Record<string,string> = {
  "menina-do-vento-nordeste": "sonho-de-liberdade",
};

export const getProject = (slug: string) => projects.find((item) => item.slug === (legacyProjectRedirects[slug] || slug));
