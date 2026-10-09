"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const themes = ["Cultura viva", "Memória", "Natureza", "Território", "Imbituba"];

export function CultureRibbon() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`culture-marquee${paused ? " is-paused" : ""}`}>
      <div className="culture-ribbon-track" id="culture-ribbon-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="culture-ribbon-group" key={copy}>
            {themes.map((theme) => <span className="culture-ribbon-item" key={theme}><span>{theme}</span><i>•</i></span>)}
          </div>
        ))}
      </div>
      <button className="ribbon-control" type="button" aria-controls="culture-ribbon-track"
        aria-pressed={paused} aria-label={paused ? "Retomar movimento da faixa cultural" : "Pausar movimento da faixa cultural"}
        onClick={() => setPaused((value) => !value)}>
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}<span>{paused ? "Retomar" : "Pausar"}</span>
      </button>
    </div>
  );
}
