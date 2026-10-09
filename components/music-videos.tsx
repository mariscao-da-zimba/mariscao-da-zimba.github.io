/* eslint-disable @next/next/no-img-element -- original YouTube covers hosted locally with reserved dimensions */
"use client";

import { ArrowUpRight, Play, X } from "lucide-react";
import { featuredMusicVideos, musicChannel, musicVideos } from "../content/music-videos";
import { useMediaPlayback } from "./use-media-playback";
import Link from "./document-link";

export function MusicVideos({ id = "musicas-da-mare", selection = "all" }: { id?: string; selection?: "featured" | "all" }) {
  const { active, player, open, close, buttonRef } = useMediaPlayback();
  const videos = selection === "featured" ? featuredMusicVideos : musicVideos;

  return (
    <section className="music-feature" data-selection={selection} id={id} aria-labelledby={`${id}-title`}>
      <header className="music-heading">
        <p className="eyebrow">Música · Turma da Maré</p>
        <h2 id={`${id}-title`}>A Turma da Maré ganhou trilha sonora</h2>
        <p>Vídeos musicais criados por Célio de Oliveira e compartilhados no canal Mariscao. Escolha um vídeo e dê o play.</p>
        <div className="music-heading-links">
          {selection === "featured" && <Link href="/cultura#musicas-da-mare">Ver todos os {musicVideos.length} vídeos <ArrowUpRight aria-hidden="true" /></Link>}
          <a href={musicChannel.url} target="_blank" rel="noopener noreferrer">Conheça o canal <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </header>
      <div className="music-grid">
        {videos.map((video) => {
          const playing = active === video.videoId;
          const playerId = `${id}-${video.videoId}`;
          return (
            <article className={`music-card${video.format === "video" ? " is-horizontal" : ""}${playing ? " is-playing" : ""}`} key={video.videoId} aria-labelledby={`${playerId}-title`}>
              <div className="music-card-visual" id={playerId}>
                {playing ? (
                  <iframe ref={player} title={video.title}
                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                    loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
                ) : (
                  <button type="button" className="music-play" ref={(element) => buttonRef(video.videoId, element)}
                    aria-label={`Assistir: ${video.title}`} aria-controls={playerId} onClick={() => open(video.videoId)}>
                    <img src={video.image} alt="" width={video.imageWidth} height={video.imageHeight}
                      className={video.imageWidth < video.imageHeight ? "music-cover-contained" : undefined}
                      style={video.artworkWidth ? { height: `${(video.imageHeight * 9 / 16) / video.artworkWidth * 100}%`, top: "50%", transform: "translateY(-50%)" } : undefined}
                      loading="lazy" decoding="async" />
                    <span className="music-play-badge"><Play aria-hidden="true" />Ouvir e assistir</span>
                  </button>
                )}
              </div>
              <div className="music-card-body">
                <p className="music-card-label">{video.format === "video" ? "Vídeo musical" : "Short musical"} · Mariscao{video.durationLabel && ` · ${video.durationLabel}`}</p>
                <h3 id={`${playerId}-title`}>{video.title}</h3>
                <div className="music-card-actions">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir no YouTube: ${video.title}`}>No YouTube <ArrowUpRight aria-hidden="true" /></a>
                  {playing && <button type="button" className="music-close" onClick={close}><X aria-hidden="true" />Fechar vídeo</button>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
