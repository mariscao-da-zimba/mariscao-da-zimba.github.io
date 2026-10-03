/* eslint-disable @next/next/no-img-element -- original YouTube covers hosted locally with reserved dimensions */
"use client";

import { ArrowUpRight, Play, X } from "lucide-react";
import { musicChannel, musicVideos } from "../content/music-videos";
import { useMediaPlayback } from "./use-media-playback";

export function MusicVideos({ id = "musicas-da-mare" }: { id?: string }) {
  const { active, player, open, close, buttonRef } = useMediaPlayback();

  return (
    <section className="music-feature" id={id} aria-labelledby={`${id}-title`}>
      <header className="music-heading">
        <p className="eyebrow">Música · Turma da Maré</p>
        <h2 id={`${id}-title`}>A Turma da Maré ganhou trilha sonora</h2>
        <p>Três vídeos musicais criados por Célio de Oliveira e compartilhados no canal Mariscao. Escolha uma canção e dê o play.</p>
        <a href={musicChannel.url} target="_blank" rel="noopener noreferrer">Conheça o canal <ArrowUpRight aria-hidden="true" /></a>
      </header>
      <div className="music-grid">
        {musicVideos.map((video) => {
          const playing = active === video.videoId;
          const playerId = `${id}-${video.videoId}`;
          return (
            <article className={`music-card${playing ? " is-playing" : ""}`} key={video.videoId} aria-labelledby={`${playerId}-title`}>
              <div className="music-card-visual" id={playerId}>
                {playing ? (
                  <iframe ref={player} title={video.title}
                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                    loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
                ) : (
                  <button type="button" className="music-play" ref={(element) => buttonRef(video.videoId, element)}
                    aria-label={`Assistir: ${video.title}`} aria-controls={playerId} onClick={() => open(video.videoId)}>
                    <img src={video.image} alt="" width="1280" height="720" loading="lazy" decoding="async" />
                    <span className="music-play-badge"><Play aria-hidden="true" />Ouvir e assistir</span>
                  </button>
                )}
              </div>
              <div className="music-card-body">
                <p className="music-card-label">Short musical · Mariscao</p>
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
