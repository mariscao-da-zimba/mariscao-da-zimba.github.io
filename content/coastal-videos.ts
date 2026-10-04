// Public channel, oEmbed, titles and original covers checked on 2026-10-04.
// Creator materials are not independent historical evidence.
export const coastalChannel = {name:"Mariscão da zimba",url:"https://www.youtube.com/@Marisc%C3%A3odazimba-g6m"};
export type CoastalVideo = {videoId:string;title:string;location:string;synopsis:string;porto:boolean;url:string;image:string};
const selection = [
  {videoId:"TBnZ45s-HkY",title:"Pescadores Artesanais da Praia do Porto.",location:"Praia do Porto",synopsis:"Um olhar para a pesca artesanal, os barcos e os saberes do mar na vida da comunidade.",porto:true},
  {videoId:"7OZfE3Vd0ug",title:"O Canto Norte da Praia do Porto.",location:"Praia do Porto",synopsis:"O encontro entre a paisagem costeira e as memórias de quem vive perto do oceano.",porto:true},
  {videoId:"AYEPmTczkL4",title:"Mirante da Praia do Porto.",location:"Praia do Porto",synopsis:"A paisagem da Praia do Porto vista por um olhar de contemplação e memória.",porto:true},
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
