/* eslint-disable @next/next/no-img-element -- official YouTube thumbnail hosted locally (109 KB) */
"use client";

import { ArrowUpRight, Play, X } from "lucide-react";
import { tribute } from "../content/tribute";
import { useMediaPlayback } from "./use-media-playback";

export function TributeVideo() {
  const { active, player, open, close, buttonRef } = useMediaPlayback();
  const playing = active === tribute.videoId;

  return (
    <section className="tribute-feature" id="homenagem" aria-labelledby="homenagem-title">
      <div className="tribute-copy">
        <p className="eyebrow">Cultura viva · Vídeo de homenagem</p>
        <h2 id="homenagem-title">{tribute.heading}</h2>
        <p>{tribute.description}</p>
        <p className="tribute-video-title">{tribute.title}</p>
        <a className="button text" href={tribute.url} target="_blank" rel="noopener noreferrer">
          Assistir no YouTube <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="tribute-media">
        <div className="tribute-screen" id="homenagem-player">
          {playing ? (
            <iframe ref={player} src={tribute.embedUrl} title={tribute.title} loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          ) : (
            <button ref={(element) => buttonRef(tribute.videoId, element)} type="button" className="tribute-play"
              aria-label={`Assistir à homenagem: ${tribute.title}`} aria-controls="homenagem-player"
              onClick={() => open(tribute.videoId)}>
              <img src={tribute.image} alt="" width={tribute.imageWidth} height={tribute.imageHeight}
                loading="lazy" decoding="async" />
              <span className="tribute-play-label"><span className="tribute-play-icon"><Play aria-hidden="true" /></span>Assistir à homenagem</span>
            </button>
          )}
        </div>
        <div className="tribute-caption">
          <span>3min59 · Canal {tribute.channel} · Produção com apoio de IA</span>
          {playing && <button type="button" className="tribute-close" onClick={close}><X aria-hidden="true" /> Fechar vídeo</button>}
        </div>
      </div>
    </section>
  );
}
