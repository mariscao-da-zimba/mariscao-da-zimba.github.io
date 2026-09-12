import type { Landmark } from "./types";

export type GuideLandmark = Landmark & {
  image: string;
  imageWidth: number;
  imageHeight: number;
  facts: string[];
  visitNote: string;
  guidePages: number[];
  access?: string[];
  activities?: string[];
  gastronomy?: string[];
  bestTime?: string[];
  tipsAlerts?: string[];
  services?: string[];
  conservation?: string[];
  curiosities?: string[];
  aliases?: string[];
  operationalNotice?: string;
};

const rows: Array<[string,string,string,string,string,string[],string[],string[],string]> = [
  ["lagoa-de-ibiraquera","Lagoa de Ibiraquera","Lagoa costeira","Águas doces e salgadas se encontram entre dunas, restinga e Mata Atlântica.","A lagoa costeira é apresentada no guia como ambiente de águas tranquilas, cercado por dunas, restinga e morros de Mata Atlântica. A pesca artesanal, os esportes aquáticos e a gastronomia ligada aos frutos do mar fazem parte da experiência local.",["pesca artesanal","gastronomia","comunidade"],["lagoa costeira","restinga","Mata Atlântica"],["A cerca de 10 km do centro de Imbituba","Encontro de água doce e salgada","Pesca da tainha em maio e junho"],"Respeite as regras locais de preservação e não deixe resíduos."],
  ["dunas-da-ribanceira","Dunas da Ribanceira","Paisagem e arqueologia","Areias móveis, restinga e memória de resistência comunitária.","Formadas pela ação dos ventos e marés, as dunas integram praias, lagoas e butiazais. O guia registra vestígios arqueológicos pré-coloniais e a mobilização comunitária que enfrentou a extração de areia a partir dos anos 1990.",["memória comunitária","arqueologia","resistência"],["dunas","restinga","lagartixa-das-dunas"],["Conjunto paisagístico e arqueológico","Habitat de Liolaemus occipitalis","Próximas à Praia da Ribanceira"],"Evite pisar na vegetação e respeite áreas sinalizadas ou restritas."],
  ["praia-da-ribanceira","Praia da Ribanceira","Praia e comunidade","Mar, pesca artesanal, dunas e observação da vida costeira.","A praia tem faixa de areia ampla, paisagem de restinga e mar com trechos de diferentes condições. O guia destaca sua ligação com a pesca artesanal, o surfe e a observação de baleias-francas entre julho e novembro.",["pesca artesanal","modo de vida costeiro"],["restinga","dunas","baleia-franca"],["Ondas procuradas para surfe","Temporada de baleias de julho a novembro","Ponto de partida para trilhas"],"Não trafegue com veículos sobre dunas ou vegetação sensível."],
  ["praia-dos-amores","Praia dos Amores","Enseada preservada","Uma pequena enseada acessível por trilha a partir da Ribanceira.","Com cerca de 50 metros, a enseada é cercada por vegetação nativa e não possui infraestrutura turística. O acesso indicado no guia é por uma trilha de aproximadamente 300 metros no canto direito da Praia da Ribanceira.",["vivência costeira","turismo responsável"],["enseada","vegetação nativa","baleia-franca"],["Cerca de 50 m de extensão","Trilha de aproximadamente 300 m","Sem infraestrutura turística"],"Leve água e traga todo o seu lixo de volta."],
  ["costao-da-ribanceira","Costão da Ribanceira","Costão e trilha","Formações rochosas, biodiversidade e amplas vistas do litoral.","O costão se estende ao sul da Praia da Ribanceira. A caminhada descrita no guia passa por rochas e vegetação nativa, podendo conectar a Praia dos Amores, a Praia D’Água e a Praia do Porto em cerca de 4 km.",["vestígios históricos","caminhos costeiros"],["costão rochoso","aves marinhas","baleia-franca"],["Percurso ampliado de cerca de 4 km","Trechos escorregadios em dias úmidos","Sem infraestrutura ao longo do caminho"],"Use calçado adequado e mantenha distância das bordas."],
  ["praia-dagua","Praia D’Água","Praia de acesso por trilha","Uma praia preservada entre morros, costões, butiazais e imbés.","Acessível apenas por trilhas a partir da Praia do Porto ou da Ribanceira, a Praia D’Água tem mar agitado e faixa de areia que pode desaparecer na maré alta. O guia recomenda preparo para caminhada moderada e autonomia de água e alimento.",["caminhos locais","turismo de natureza"],["butiazais","imbé","maré"],["Acesso somente por trilha","Mar agitado","Faixa de areia limitada na maré alta"],"Consulte a maré, leve suprimentos e não faça o percurso despreparado."],
  ["trilha-ponta-do-catalao","Trilha Ponta do Catalão","Trilha costeira","Quatro quilômetros entre a Vila Alvorada e a Vila Esperança.","O guia descreve um percurso de dificuldade moderada, com declives e terreno irregular, passando pelo Farol do Catalão e pela Praia D’Água. O farol foi inaugurado em 1918, tem 7 metros e é pintado de branco.",["Farol do Catalão","história marítima"],["costão","vegetação costeira","biodiversidade"],["Aproximadamente 4 km","Dificuldade moderada","Farol inaugurado em 1918"],"Use calçado de trilha, leve água e evite as bordas do costão."],
  ["pico-da-diva","Pico da Diva","Formação rochosa","Um mirante natural no canto norte da Praia do Porto.","A formação rochosa oferece vista panorâmica da Praia do Porto. Durante a maré baixa, pequenas piscinas naturais podem surgir nas proximidades. O guia registra a atuação comunitária em ações de limpeza e preservação.",["memória comunitária","cuidado coletivo"],["formação rochosa","piscinas naturais","aves marinhas"],["Acesso pela praia ou por trilha","Melhor exploração na maré baixa","Vista para a Praia do Porto"],"As rochas podem ser escorregadias; verifique a maré e caminhe com cuidado."],
  ["mirante-da-praia-do-porto","Mirante da Praia do Porto","Paisagem e história","O oceano, o porto e camadas da história de Imbituba em um só horizonte.","Situado em uma elevação natural, o mirante oferece visão da Praia do Porto e da atividade portuária. O guia também relaciona o lugar ao batismo de fogo de Anita Garibaldi e à história marítima de Imbituba.",["Porto de Imbituba","Anita Garibaldi","história marítima"],["paisagem costeira","baleia-franca"],["Acesso por ruas pavimentadas","Vista para o porto","Busto em homenagem a Anita Garibaldi"],"O nascer do sol é indicado pelo guia; mantenha-se nas áreas seguras do mirante."],
  ["mariscao-da-zimba","Mariscão da Zimba","Centro cultural","Cultura, memória, natureza e comunidade reunidas desde 2008.","Fundado em 2008 por Célio de Oliveira, o Centro atua na preservação e promoção das tradições do litoral catarinense. O guia destaca a Rota Açoriana, o Caminho dos Butiazais e a Cachaça com Butiá Açoriana entre suas iniciativas.",["cultura açoriana","memória","artesanato"],["educação ambiental","butiazais"],["Fundado em 2008","Ponto de Cultura certificado","Sede em Vila Nova Alvorada"],"Confirme o atendimento pelo telefone público antes da visita."],
  ["museu-nacional-da-baleia-franca","Museu Nacional da Baleia Franca — Manoel Rosa","Museu e conservação","Memória da atividade baleeira e da proteção das baleias-francas.","O museu ocupa o antigo barracão de processamento de óleo da última estação baleeira do sul do Brasil, encerrada em 1973. Seu acervo conecta a história da caça aos esforços contemporâneos de conservação.",["memória baleeira","patrimônio industrial"],["baleia-franca","conservação marinha"],["Antiga estação baleeira","Esqueleto de baleia-franca de 14 m","Rua Itagiba, Vila Alvorada"],"Horários podem mudar; confirme diretamente com o equipamento antes da visita."],
  ["rancho-dos-pescadores-artesanais","Ranchos dos Pescadores Artesanais","Patrimônio vivo","Espaços de trabalho, encontro e transmissão dos saberes da pesca.","Os ranchos guardam redes, barcos e equipamentos e funcionam como lugares de convivência e manutenção. O guia os apresenta como marcos da paisagem e da cultura costeira, ligados à pesca da tainha e a saberes transmitidos entre gerações.",["pesca artesanal","tainha","saberes tradicionais"],["ciclos do mar","uso sustentável"],["Espaços de trabalho comunitário","Guarda de barcos e redes","Patrimônio cultural costeiro"],"Respeite o trabalho dos pescadores e não interfira nos equipamentos."],
  ["capelinha-de-sao-pedro","Capelinha de São Pedro","Fé e memória","A Capelinha da Praia acompanha a comunidade desde 1898.","Construída em 1898 e ligada ao desenvolvimento do Porto de Imbituba, a capela foi restaurada e, em 2018, transferida para facilitar o acesso da comunidade. É também conhecida como Igrejinha do Porto.",["religiosidade","memória portuária","comunidade"],["paisagem costeira"],["Construída em 1898","Transferida em 2018","Também chamada Igrejinha do Porto"],"Os horários do guia podem sofrer alteração; confirme antes de ir."],
  ["trilha-do-farol-da-praia-da-vila","Trilha do Farol da Praia da Vila","Trilha, história e natureza","Um percurso costeiro até o Farol de Imbituba entre rochas e Mata Atlântica.","A trilha começa no canto esquerdo da Praia da Vila e tem aproximadamente 2,5 km. Há um caminho pelo costão, mais exposto, e outro pelo interior do morro. O guia destaca vestígios de oficina lítica, o farol de 1919 e a biodiversidade local.",["oficina lítica","Farol de Imbituba","história marítima"],["Mata Atlântica","Tropidurus imbituba","costão"],["Aproximadamente 2,5 km","Dificuldade média","Farol construído em 1919"],"Evite dias chuvosos, vá acompanhado e considere contratar guia local."],
];

const guideDetails: Record<string, Partial<GuideLandmark>> = {
  "lagoa-de-ibiraquera": {
    guidePages: [11,12,13],
    location: "Cerca de 10 km do Centro de Imbituba, próxima à Praia do Rosa.",
    activities: ["Stand-up paddle", "Windsurf e kitesurf", "Caiaque e canoagem", "Pesca artesanal da tainha em maio e junho", "Caminhadas, trilhas e banho"],
    gastronomy: ["Camarão fresco e tainha", "Moquecas, risotos de frutos do mar e peixes grelhados"],
    bestTime: ["Verão: maior movimento, calor e festividades", "Outono e primavera: menos movimento e temperaturas agradáveis", "Inverno: ventos mais intensos para esportes aquáticos"],
    access: ["O guia sugere carro para explorar a lagoa e praias próximas"],
    services: ["Pousadas na área da lagoa e regiões próximas"],
    tipsAlerts: ["Não deixe resíduos e respeite as regras locais"],
  },
  "dunas-da-ribanceira": {
    guidePages: [14,15,16,17],
    location: "Próximas à Praia da Ribanceira, cerca de 8 km do Centro de Imbituba.",
    access: ["Acesso de carro", "Pontos para estacionamento", "Trilhas conectam dunas, butiazais e Lagoa de Ibiraquera"],
    activities: ["Sandboard", "Caminhadas e trilhas", "Fotografia no nascer e no pôr do sol", "Contemplação"],
    conservation: ["As dunas funcionam como barreira contra erosão", "A extração de areia iniciada nos anos 1990 foi interrompida após mobilização comunitária", "Receberam tombamento provisório como Conjunto Paisagístico e Arqueológico", "Urbanização, extração de areia e turismo desordenado são ameaças"],
    curiosities: ["Habitat de Liolaemus occipitalis, lagartixa endêmica das dunas costeiras do sul do Brasil", "O guia registra vestígios arqueológicos pré-coloniais, artefatos líticos e sambaquis"],
    tipsAlerts: ["Observe a sinalização e as restrições em áreas sensíveis", "Evite degradar a vegetação ou poluir o ambiente"],
  },
  "praia-da-ribanceira": {
    guidePages: [18,19,20],
    location: "Próxima ao Centro de Imbituba; o guia não fornece distância exata.",
    activities: ["Surfe e kitesurfe", "Caminhadas e trilhas", "Observação de baleias-francas", "Pesca artesanal e observação da vida marinha"],
    gastronomy: ["Restaurantes próximos; o guia não indica prato específico"],
    bestTime: ["Julho a novembro para observação de baleias-francas"],
    services: ["Infraestrutura limitada", "Pousadas e restaurantes próximos", "Planejar hospedagem com antecedência"],
    tipsAlerts: ["Leve protetor solar, chapéu e água", "Mantenha distância das baleias e de outros animais", "Use calçado adequado nas dunas", "Não trafegue com veículos sobre vegetação ou áreas sensíveis"],
  },
  "praia-dos-amores": {
    guidePages: [21,22,23],
    location: "Trilha leve de aproximadamente 300 metros desde o canto direito da Praia da Ribanceira.",
    access: ["Acesso por trilha a partir da Praia da Ribanceira", "O guia considera mais conveniente usar transporte próprio até a região"],
    activities: ["Relaxamento, leitura e contemplação", "Banho e natação quando o mar estiver tranquilo", "Observação de baleias-francas", "Trilhas para praias isoladas, incluindo a Praia D’Água"],
    bestTime: ["Primavera e verão para trilhas e águas calmas", "Julho a novembro para baleias"],
    services: ["Sem infraestrutura turística", "Pousadas na Ribanceira e arredores"],
    tipsAlerts: ["Leve água, lanches e itens de conforto", "Não deixe resíduos"],
  },
  "costao-da-ribanceira": {
    guidePages: [24,25,26],
    access: ["A trilha começa no canto sul da Praia da Ribanceira", "Passa por rochas, vegetação nativa e possíveis trechos de banhado", "O percurso ampliado até a Praia do Porto, via Praia dos Amores e Praia D’Água, tem cerca de 4 km"],
    activities: ["Caminhada e trilha", "Observação de aves marinhas", "Observação de baleias-francas", "Contemplação de paisagens e vestígios históricos"],
    bestTime: ["Julho a novembro para observação de baleias-francas"],
    services: ["Não há infraestrutura ao longo do percurso"],
    curiosities: ["O guia registra nascentes de água doce próximas à Praia D’Água"],
    tipsAlerts: ["Use calçado de trilha, protetor solar e chapéu", "Leve água e lanches", "Alguns trechos podem ficar escorregadios", "Evite as bordas do costão", "Leve seus resíduos de volta"],
  },
  "praia-dagua": {
    guidePages: [27,28,29],
    access: ["Acesso somente por trilha", "Uma rota parte da Praia do Porto", "Também é possível chegar desde a Ribanceira"],
    activities: ["Surfe, especialmente com ventos sul ou oeste", "Caminhadas e trilhas", "Observação de fauna e flora"],
    services: ["Sem infraestrutura turística"],
    tipsAlerts: ["Prepare-se para uma caminhada de intensidade moderada", "Leve água e alimentos", "Verifique a maré", "Não deixe resíduos"],
  },
  "trilha-ponta-do-catalao": {
    guidePages: [30,31,32],
    access: ["Começa no estacionamento à beira-mar da Vila Alvorada", "O primeiro mirante fica a cerca de 50 metros", "Passa pelo Farol do Catalão e pela Praia D’Água", "Termina na Vila Esperança, também chamada Praia da Ribanceira"],
    activities: ["Caminhada", "Contemplação em mirantes", "Visita ao farol", "Observação da biodiversidade"],
    services: ["Ruas pavimentadas e estacionamento no início"],
    tipsAlerts: ["Use calçado adequado", "Leve água, lanches e protetor solar", "Cuidado com trechos escorregadios e bordas dos costões", "Leve seus resíduos e respeite a fauna e a flora"],
  },
  "pico-da-diva": {
    guidePages: [33,34,35],
    location: "Canto norte da Praia do Porto.",
    access: ["Trilha íngreme desde o mirante até o costão", "Alternativa mais leve pela beira da praia"],
    activities: ["Fotografia no amanhecer e no fim da tarde", "Observação da biodiversidade e de aves marinhas", "Contemplação do nascer do sol", "Surfe quando o mar permite"],
    bestTime: ["Nascer do sol", "Fim da tarde para fotografia", "Maré baixa para piscinas naturais"],
    conservation: ["Ações comunitárias e voluntárias de limpeza"],
    tipsAlerts: ["Use calçado adequado", "Trechos podem estar escorregadios", "Planeje a visita conforme a maré", "Não modifique o ambiente nem deixe resíduos"],
  },
  "mirante-da-praia-do-porto": {
    guidePages: [36,37,38,39],
    location: "Entre Vila Nova Alvorada, Vila Alvorada e Ribanceira.",
    access: ["Acesso por ruas pavimentadas", "Há estacionamento"],
    activities: ["Observação do nascer do sol", "Fotografia", "Observação distante de baleias-francas e da atividade portuária"],
    bestTime: ["Nascer do sol"],
    curiosities: ["O guia relaciona o local ao primeiro combate naval de Anita Garibaldi durante a Revolução Farroupilha", "A região teve armações baleeiras no século XVIII"],
    tipsAlerts: ["Leve câmera ou smartphone", "Binóculos ajudam na observação à distância"],
  },
  "mariscao-da-zimba": {
    guidePages: [40,41,42],
    location: "Rua Hercílio Nunes, 264 · Vila Nova Alvorada (Divinéia) · Imbituba.",
    activities: ["Rota Açoriana", "Caminho dos Butiazais", "Cachaça com Butiá Açoriana", "Exposições, feiras e eventos", "Artesanato e publicações literárias", "Visitas guiadas mediante agendamento"],
    gastronomy: ["Gastronomia na Rota Açoriana", "Cachaça com Butiá Açoriana"],
    services: ["Horário publicado no guia: terça a sexta-feira, das 14h às 18h", "Visitas guiadas mediante agendamento pelo telefone (48) 99608-6600"],
    operationalNotice: "Horário publicado no guia de 2025; confirme antes da visita.",
    tipsAlerts: ["Agende previamente a visita guiada pelo telefone público"],
  },
  "museu-nacional-da-baleia-franca": {
    guidePages: [43,44,45],
    location: "Rua Itagiba, s/n · Vila Alvorada (Aguada) · Imbituba.",
    activities: ["Exposições históricas", "Educação e reflexão sobre conservação das baleias"],
    services: ["Horário publicado no guia: segunda a sexta-feira, das 9h às 17h", "Agendamentos e informações pela Secretaria de Cultura e Turismo"],
    conservation: ["O sítio do Barracão da Baleia foi tombado pela Prefeitura em setembro de 1998", "A comunidade e antigos caçadores participaram da reconstrução"],
    curiosities: ["Acervo com mapas, ilustrações, arpões, ferramentas, ossos e outros artefatos", "Esqueleto de baleia-franca com 14 metros, montado em novembro de 2013"],
    operationalNotice: "Horário publicado no guia de 2025; confirme diretamente com o museu.",
    tipsAlerts: ["Para agendamentos e informações atuais, contate a Secretaria de Cultura e Turismo"],
  },
  "rancho-dos-pescadores-artesanais": {
    guidePages: [46,47,48],
    activities: ["Pesca artesanal", "Manutenção de barcos, redes e equipamentos", "Convivência e transmissão comunitária de saberes"],
    conservation: ["Urbanização e ampliação portuária ameaçam sua permanência", "O guia relata ordens de demolição e conflitos de uso da faixa de areia", "Grupos locais e ambientalistas atuam em conscientização, registro histórico e busca de proteção"],
    curiosities: ["O guia descreve os ranchos como monumentos vivos da história costeira"],
    tipsAlerts: ["Respeite os locais de trabalho, os equipamentos e a rotina dos pescadores", "A urbanização e a ampliação portuária ameaçam a permanência dos ranchos"],
  },
  "capelinha-de-sao-pedro": {
    guidePages: [49,50,51],
    location: "Em frente à Rua Manoel Florentino Machado.",
    aliases: ["Capelinha da Praia", "Igrejinha do Porto"],
    access: ["Área de fácil acesso", "Há estacionamento", "Praça em homenagem a Luiz Fernandes dos Santos"],
    activities: ["Visitação histórica e arquitetônica", "Missas e eventos religiosos", "Eventos culturais e convivência comunitária"],
    services: ["Horário publicado no guia: aberta diariamente, das 8h30 às 17h30"],
    curiosities: ["Luiz Fernandes dos Santos manteve a capela em funcionamento por quase 40 anos", "Restaurada em 1991 e transferida em 2018, preservando características originais"],
    operationalNotice: "Horário publicado no guia de 2025; confirme antes da visita.",
    tipsAlerts: ["O guia não apresenta alertas de segurança específicos"],
  },
  "trilha-do-farol-da-praia-da-vila": {
    guidePages: [52,53,54],
    access: ["Começa no canto esquerdo da Praia da Vila, próximo ao costão", "Acesso sinalizado e percurso de aproximadamente 2,5 km", "Rota pelo costão: mais exposta e perigosa", "Rota pelo interior do morro: mais segura, sombreada e com vegetação densa", "As duas chegam ao Farol de Imbituba"],
    activities: ["Caminhada", "Observação arqueológica", "Fotografia", "Observação de flora e fauna"],
    bestTime: ["O guia não indica estação ou horário", "Evite dias chuvosos"],
    curiosities: ["Vestígios de oficina lítica de povos originários", "Farol construído em 1919, com 7 metros", "Presença de Tropidurus imbituba, descrito no guia como lagarto endêmico"],
    tipsAlerts: ["Use calçado de trilha, roupa confortável, protetor solar e chapéu", "Leve água e lanche", "Evite dias chuvosos", "Caminhe acompanhado e informe o itinerário", "Considere contratar guia local", "Não machuque a fauna"],
  },
};

const imageMeta: Record<string, [number,number,string]> = {
  "lagoa-de-ibiraquera": [1387,711,"lagoa-de-ibiraquera"],
  "dunas-da-ribanceira": [1389,1063,"dunas-da-ribanceira"],
  "praia-da-ribanceira": [1418,1063,"praia-da-ribanceira"],
  "praia-dos-amores": [1388,1063,"praia-dos-amores"],
  "costao-da-ribanceira": [1418,1064,"costao-da-ribanceira"],
  "praia-dagua": [1418,1064,"praia-dagua"],
  "trilha-ponta-do-catalao": [1388,1064,"trilha-ponta-do-catalao"],
  "pico-da-diva": [1388,683,"pico-da-diva"],
  "mirante-da-praia-do-porto": [1388,614,"mirante-da-praia-do-porto"],
  "mariscao-da-zimba": [1019,525,"mariscao-da-zimba"],
  "museu-nacional-da-baleia-franca": [1388,525,"museu-da-baleia-franca"],
  "rancho-dos-pescadores-artesanais": [969,524,"ranchos-dos-pescadores"],
  "capelinha-de-sao-pedro": [1388,525,"capelinha-de-sao-pedro"],
  "trilha-do-farol-da-praia-da-vila": [1388,524,"trilha-do-farol"],
};

export const landmarks: GuideLandmark[] = rows.map(([slug,name,category,description,longDescription,culturalThemes,environmentalThemes,facts,visitNote]) => {
  const [imageWidth,imageHeight,imageName] = imageMeta[slug];
  return {slug,name,category,description,longDescription,culturalThemes,environmentalThemes,facts,visitNote,image:`/images/guia/${imageName}.webp`,imageWidth,imageHeight,guidePages:guideDetails[slug].guidePages||[],sources:["guia-2025"],...guideDetails[slug]};
});

export const guideImageSrcSet = (image:string,imageWidth:number) => {
  const base=image.replace(/\.webp$/i,"");
  return `${base}-480.webp 480w, ${base}-960.webp 960w, ${image} ${imageWidth}w`;
};

export const legacyLandmarkRedirects: Record<string,string> = {"trilha-do-pontal-do-catalao":"trilha-ponta-do-catalao"};
export const getLandmark = (slug:string) => landmarks.find((item)=>item.slug===(legacyLandmarkRedirects[slug]||slug));
