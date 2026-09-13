/* eslint-disable @next/next/no-img-element -- supplied poster is already compressed (188 KB) */
"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Gamepad2, Keyboard, Smartphone, X } from "lucide-react";
import { butiazinho } from "../content/butiazinho";

export function ButiazinhoFeature() {
  const [playing, setPlaying] = useState(false);
  const launchButton = useRef<HTMLButtonElement>(null);

  function closeGame() {
    setPlaying(false);
    launchButton.current?.focus();
  }

  return (
    <section className="butiazinho-feature" id="butiazinho" aria-labelledby="butiazinho-title">
      <div className="butiazinho-intro">
        <figure className="butiazinho-poster">
          <img src={butiazinho.image} width={butiazinho.imageWidth} height={butiazinho.imageHeight}
            alt="Cartaz do Butiázinho: personagem de butiá voando entre obstáculos, telas do jogo e QR Code de acesso."
            loading="lazy" decoding="async" />
          <figcaption>Material de divulgação fornecido pelo criador.</figcaption>
        </figure>
        <div className="butiazinho-copy">
          <p className="eyebrow"><Gamepad2 aria-hidden="true" /> Entre nessa brincadeira</p>
          <h2 id="butiazinho-title">Conheça o {butiazinho.title}</h2>
          <p>Um pequeno personagem, um grande desafio. Toque, clique ou use a barra de espaço para voar entre os obstáculos e tentar superar seu recorde.</p>
          <p className="butiazinho-credit">Jogo criado por {butiazinho.author}. Jogue no navegador, no celular ou no computador.</p>
          <ul className="butiazinho-controls" aria-label="Como jogar">
            <li><Keyboard aria-hidden="true" /><span><kbd>Espaço</kbd> para voar</span></li>
            <li><Smartphone aria-hidden="true" /><span>Toque na tela</span></li>
          </ul>
          <div className="actions">
            <button ref={launchButton} type="button" className="button primary" aria-expanded={playing}
              aria-controls="butiazinho-player" onClick={() => setPlaying(true)}>
              <Gamepad2 aria-hidden="true" /> {playing ? "Jogo aberto abaixo" : "Jogar aqui"}
            </button>
            <a className="button text" href={butiazinho.url} target="_blank" rel="noopener noreferrer">
              Abrir jogo em nova aba <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <p className="butiazinho-note">O jogo só é carregado ao tocar em “Jogar aqui”. Ele funciona em um site externo e pode reproduzir som. Use o botão de som dentro do jogo para silenciá-lo.</p>
          <a className="butiazinho-instagram" href={butiazinho.instagram} target="_blank" rel="noopener noreferrer">Ver publicação no Instagram <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div id="butiazinho-player" hidden={!playing} className="butiazinho-player">
        {playing && <>
          <div className="butiazinho-player-heading">
            <p>Clique ou toque dentro do jogo para começar. No computador, você também pode usar Espaço.</p>
            <button type="button" className="button ghost" onClick={closeGame}><X aria-hidden="true" /> Fechar jogo</button>
          </div>
          <iframe src={butiazinho.url} title="Jogo Butiázinho — criado por Célio de Oliveira"
            sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" />
          <p className="butiazinho-note">Se não carregar neste navegador, <a href={butiazinho.url} target="_blank" rel="noopener noreferrer">abra o jogo em uma nova aba</a>. Ao fechar esta área, a partida é encerrada.</p>
        </>}
      </div>
    </section>
  );
}
