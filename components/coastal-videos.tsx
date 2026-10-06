/* eslint-disable @next/next/no-img-element -- local original YouTube covers with reserved dimensions */
"use client";
import { ArrowUpRight, Play, Waves, X } from "lucide-react";
import { coastalChannel, portoVideos, type CoastalVideo } from "../content/coastal-videos";
import { useMediaPlayback } from "./use-media-playback";
import Link from "./document-link";

export function CoastalVideoGallery({videos,id}:{videos:CoastalVideo[];id:string}) {
  const {active,player,open,close,buttonRef}=useMediaPlayback();
  return <div className="coastal-grid">{videos.map(video=>{
    const playing=active===video.videoId;
    const playerId=`${id}-${video.videoId}`;
    return <article className={`coastal-card${playing?" is-playing":""}`} key={video.videoId} aria-labelledby={`${playerId}-title`}>
      <div className="coastal-visual" id={playerId}>{playing?
        <iframe ref={player} title={video.title} src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen/>:
        <button type="button" className="coastal-play" ref={element=>buttonRef(video.videoId,element)} aria-label={`Assistir: ${video.title}`} aria-controls={playerId} onClick={()=>open(video.videoId)}>
          <img src={video.image} alt="" width="1280" height="720" loading="lazy" decoding="async" style={video.artworkWidth?{height:`${Math.min(100,405/video.artworkWidth*100)}%`}:undefined}/><span className="coastal-play-label"><Play aria-hidden="true"/>Assistir ao vídeo</span>
        </button>}</div>
      <div className="coastal-card-body"><p className="coastal-location">{video.location} · Short</p><h3 id={`${playerId}-title`}>{video.title}</h3><p className="coastal-synopsis">{video.synopsis}</p>
        <div className="coastal-actions"><a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir no YouTube: ${video.title}`}>No YouTube <ArrowUpRight aria-hidden="true"/></a>{playing&&<button type="button" onClick={close}><X aria-hidden="true"/>Fechar vídeo</button>}</div>
      </div>
    </article>;
  })}</div>;
}
export function CoastalVideos(){return <section className="coastal-feature" id="praia-do-porto" aria-labelledby="praia-do-porto-title">
  <header className="coastal-heading"><div><p className="eyebrow"><Waves aria-hidden="true"/>Paisagens · Praia do Porto</p><h2 id="praia-do-porto-title">O Porto, por diferentes olhares.</h2></div>
    <div><p>Os pescadores, o canto norte e o mirante: três criações audiovisuais de Célio de Oliveira que aproximam o mar da memória de Imbituba.</p><Link href="/praias-em-video">Todas as praias em vídeo <ArrowUpRight aria-hidden="true"/></Link></div>
  </header><CoastalVideoGallery videos={portoVideos} id="porto-home"/>
  <p className="coastal-caption">Seleção do canal <a href={coastalChannel.url} target="_blank" rel="noopener noreferrer">{coastalChannel.name}</a>. Conheça também <Link href="/caminho-dos-butiazais/mirante-da-praia-do-porto">o mirante no guia oficial</Link>.</p>
</section>}
