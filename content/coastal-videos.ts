// Public channel, oEmbed, titles and original covers checked on 2026-10-06.
// Creator materials are not independent historical evidence.
export const coastalChannel = {name:"Mariscão da zimba",url:"https://www.youtube.com/@Marisc%C3%A3odazimba-g6m"};
export const coastalSelectionCheckedOn = "6 de outubro de 2026";
export type CoastalVideo = {videoId:string;title:string;location:string;synopsis:string;porto:boolean;url:string;image:string;artworkWidth?:number};
const selection = [
  {videoId:"TBnZ45s-HkY",title:"Pescadores Artesanais da Praia do Porto.",location:"Praia do Porto",synopsis:"Um olhar para a pesca artesanal, os barcos e os saberes do mar na vida da comunidade.",porto:true},
  {videoId:"7OZfE3Vd0ug",title:"O Canto Norte da Praia do Porto.",location:"Praia do Porto",synopsis:"O encontro entre a paisagem costeira e as memórias de quem vive perto do oceano.",porto:true},
  {videoId:"AYEPmTczkL4",title:"Mirante da Praia do Porto.",location:"Praia do Porto",synopsis:"A paisagem da Praia do Porto vista por um olhar de contemplação e memória.",porto:true},
  {videoId:"w2a_IRQ-jJQ",title:"Lagoa de Ibiraquera.",location:"Lagoa de Ibiraquera",synopsis:"Águas, dunas e vegetação em uma criação que aproxima paisagem, cultura e preservação.",porto:false},
  // This cover has a 570×720 central artwork, wider than the usual 405×720.
  {videoId:"zdlHF75THTs",title:"Lagoa do Mirim.",location:"Lagoa do Mirim",synopsis:"As águas e a vegetação da lagoa inspiram um olhar para a comunidade e a educação ambiental.",porto:false,artworkWidth:570},
  {videoId:"DRqBBZi7-do",title:"Praia Vermelha.",location:"Praia Vermelha",synopsis:"Mar, morros, costões e vegetação nativa compõem esta apresentação da paisagem costeira.",porto:false},
  {videoId:"UMDHWyRfRaE",title:"Praia do Rosa.",location:"Praia do Rosa",synopsis:"Mar, morros e lagoas em um olhar que reúne paisagem, cultura e comunidade.",porto:false},
  {videoId:"w0h_21dqASc",title:"Praia do Luz.",location:"Praia do Luz",synopsis:"O encontro do mar com dunas, costões e vegetação nativa inspira esta criação.",porto:false},
  {videoId:"-0SKfGn6Qro",title:"Ilha do Batuta e Praia da Barra de Ibiraquera.",location:"Batuta e Barra de Ibiraquera",synopsis:"Ilha, praia e o encontro da lagoa com o oceano, em uma apresentação ligada à pesca e à identidade local.",porto:false},
  {videoId:"tUHrzzzO6GA",title:"Barra de Ibiraquera.",location:"Barra de Ibiraquera",synopsis:"Praia, lagoa e vento em uma criação que valoriza a paisagem e a vida da comunidade.",porto:false},
  {videoId:"XOwJqbA0ne8",title:"Praia da Ribanceira.",location:"Praia da Ribanceira",synopsis:"Oceano, dunas, restinga e butiazais em um olhar para a paisagem e a memória do litoral.",porto:false},
  {videoId:"PrRtk5_qqCc",title:"Praia dos Amores.",location:"Praia dos Amores",synopsis:"Uma enseada entre morros e costões inspira esta apresentação voltada à contemplação da paisagem.",porto:false},
  {videoId:"Kd3Xj51kLxU",title:"Praia D’Água.",location:"Praia D’Água",synopsis:"Costões, vegetação e o encontro da mata com o mar inspiram esta apresentação.",porto:false},
  {videoId:"kPAsFT4n0mc",title:"Praia de Itapirubá.",location:"Itapirubá",synopsis:"Mar, morro, dunas e vegetação em um olhar para a paisagem de Itapirubá.",porto:false},
  {videoId:"u0b6fvlLgtM",title:"Ilhas Santana de Dentro e Santana de Fora.",location:"Ilhas Santana",synopsis:"As ilhas no horizonte da Praia da Vila, entre a paisagem e a memória do mar.",porto:false},
  {videoId:"jF7cdQ1up5o",title:"Magia das ondas da Praia da Vila.",location:"Praia da Vila",synopsis:"O movimento das ondas inspira um encontro entre oceano, paisagem e identidade.",porto:false},
  {videoId:"8FXeRXc2isc",title:"Praia da Vila",location:"Praia da Vila",synopsis:"Uma apresentação da praia como lugar de encontro, contemplação e relação com o mar.",porto:false},
  {videoId:"4k8RN1PzH_s",title:"Praias de Imbituba SC Brasil.",location:"Litoral de Imbituba",synopsis:"Um panorama das praias de Imbituba, do Rosa a Itapirubá.",porto:false},
  {videoId:"6OJEfC62yEk",title:"Centro Cultural e Turístico Mariscão da Zimba Ponto de Cultura Viva Imbituba e suas Belezas Naturais",location:"Natureza e cultura",synopsis:"Praias, lagoas, dunas, costões e butiazais em um olhar sobre Imbituba.",porto:false},
] as const;
export const coastalVideos:CoastalVideo[] = selection.map(video=>({...video,url:`https://www.youtube.com/shorts/${video.videoId}`,image:`/images/official/praias-${video.videoId}.jpg`}));
export const portoVideos = coastalVideos.filter(video=>video.porto);
export const otherCoastalVideos = coastalVideos.filter(video=>!video.porto);
