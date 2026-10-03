"use client";

import { useEffect, useId, useRef, useState } from "react";

const playbackEvent = "mariscao:video-start";

// A new video stops the previous portal video. Explicit closing restores its
// trigger; switching tracks does not steal focus back to the old card.
export function useMediaPlayback() {
  const owner = useId();
  const [active, setActive] = useState<string | null>(null);
  const player = useRef<HTMLIFrameElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const restoreFocus = useRef<string | null>(null);

  useEffect(() => {
    function stopOther(event: Event) {
      if ((event as CustomEvent<string>).detail !== owner) {
        restoreFocus.current = null;
        setActive(null);
      }
    }
    window.addEventListener(playbackEvent, stopOther);
    return () => window.removeEventListener(playbackEvent, stopOther);
  }, [owner]);

  useEffect(() => {
    if (active) player.current?.focus();
    else if (restoreFocus.current) {
      buttons.current.get(restoreFocus.current)?.focus();
      restoreFocus.current = null;
    }
  }, [active]);

  function open(id: string) {
    restoreFocus.current = null;
    window.dispatchEvent(new CustomEvent(playbackEvent, { detail: owner }));
    setActive(id);
  }

  function close() {
    restoreFocus.current = active;
    setActive(null);
  }

  function buttonRef(id: string, element: HTMLButtonElement | null) {
    if (element) buttons.current.set(id, element);
    else buttons.current.delete(id);
  }

  return { active, player, open, close, buttonRef };
}
