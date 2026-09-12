"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".content-section",
  ".route-card",
  ".project-strip > a",
  ".pillar-grid article",
  ".timeline article",
  ".intro > div",
  ".section-heading",
  ".visit-note > div",
  ".archive-card",
  ".memory-card",
  ".event-card",
  ".now-grid > a",
  ".map-panel",
  ".route-gallery > a",
  ".film-section > *",
  ".landmark-facts article",
  ".resource-links > a",
].join(",");

const depthCardSelector = [
  ".route-gallery > a",
  ".project-strip > a",
  ".archive-card",
  ".memory-card",
].join(",");

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopPointer = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");
    const controller = new AbortController();
    const { signal } = controller;
    const page = document.querySelector<HTMLElement>("#conteudo");
    const header = document.querySelector<HTMLElement>(".site-header");
    const seen = new WeakSet<HTMLElement>();
    let scrollFrame = 0;
    let disposeMotion = () => {};

    const paintScroll = () => {
      scrollFrame = 0;
      const scrollTop = Math.max(window.scrollY, 0);
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", `${Math.min(scrollTop / scrollRange, 1)}`);
      header?.classList.toggle("is-scrolled", scrollTop > 18);
    };
    const queueScroll = () => {
      if (!document.hidden && !scrollFrame) scrollFrame = requestAnimationFrame(paintScroll);
    };
    window.addEventListener("scroll", queueScroll, { passive: true, signal });
    window.addEventListener("resize", queueScroll, { passive: true, signal });

    const configureMotion = () => {
      disposeMotion();
      disposeMotion = () => {};
      root.classList.toggle("motion-ready", !reducedMotion.matches);
      root.classList.toggle("motion-reduced", reducedMotion.matches);
      root.classList.toggle("motion-paused", document.hidden);
      page?.classList.add("page-arrived");
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      if (!document.hidden) paintScroll();
      if (reducedMotion.matches || document.hidden) return;

      const motionController = new AbortController();
      const motionSignal = motionController.signal;
      const animations = new Set<Animation>();
      let observer: IntersectionObserver | undefined;
      let pointerFrame = 0;
      const cards = [...document.querySelectorAll<HTMLElement>(depthCardSelector)];
      const magnets = [...document.querySelectorAll<HTMLElement>(".button,.nav-cta,.social-row a")];
      const aura = document.querySelector<HTMLElement>(".cursor-aura");
      let activeHero: HTMLElement | null = null;
      let activeCard: HTMLElement | null = null;
      let activeMagnet: HTMLElement | null = null;
      let pointer: { x: number; y: number; target: Element } | null = null;

      const clearProperties = (element: HTMLElement | null, names: string[]) => {
        names.forEach((name) => element?.style.removeProperty(name));
      };
      const resetPointer = () => {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        pointer = null;
        clearProperties(activeHero, ["--pointer-x", "--pointer-y"]);
        clearProperties(activeCard, ["--card-rx", "--card-ry", "--card-light-x", "--card-light-y"]);
        clearProperties(activeMagnet, ["--magnetic-x", "--magnetic-y"]);
        clearProperties(aura, ["--aura-x", "--aura-y"]);
        activeHero = activeCard = activeMagnet = null;
      };

      disposeMotion = () => {
        motionController.abort();
        observer?.disconnect();
        animations.forEach((animation) => {
          animation.onfinish = animation.oncancel = null;
          animation.cancel();
        });
        animations.clear();
        resetPointer();
        cards.forEach((card) => card.classList.remove("motion-card"));
        magnets.forEach((item) => item.classList.remove("magnetic"));
      };

      // Content is visible before JavaScript and between animations. Never add
      // a reveal class that can hide an entire section if observation fails.
      if ("IntersectionObserver" in window && "animate" in Element.prototype) {
        const candidates = [...document.querySelectorAll<HTMLElement>(revealSelector)]
          .filter((element) => element.getBoundingClientRect().height < window.innerHeight * 0.85);
        const blocks = candidates.filter((element) => !candidates.some((other) => other !== element && element.contains(other)));
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            if (seen.has(element) || reducedMotion.matches || document.hidden) return;
            seen.add(element);
            const animation = element.animate(
              [{ translate: "0 18px" }, { translate: "0 0" }],
              { duration: 620, easing: "cubic-bezier(.2,.8,.2,1)" },
            );
            animations.add(animation);
            animation.onfinish = animation.oncancel = () => animations.delete(animation);
          });
        }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });
        blocks.forEach((element) => {
          // Do not shift content the visitor is already reading on load or
          // after switching the motion preference, tab, or pointer device.
          if (element.getBoundingClientRect().top < window.innerHeight) seen.add(element);
          if (!seen.has(element)) observer?.observe(element);
        });
      }

      if (!desktopPointer.matches) return;
      cards.forEach((card) => card.classList.add("motion-card"));
      magnets.forEach((item) => item.classList.add("magnetic"));

      const paintPointer = () => {
        pointerFrame = 0;
        if (!pointer || document.hidden) return;
        const { x, y, target } = pointer;
        aura?.style.setProperty("--aura-x", `${x}px`);
        aura?.style.setProperty("--aura-y", `${y}px`);

        const hero = target.closest<HTMLElement>(".hero-photo,.route-hero");
        const card = target.closest<HTMLElement>(".motion-card");
        const magnet = target.closest<HTMLElement>(".magnetic");
        if (hero !== activeHero) clearProperties(activeHero, ["--pointer-x", "--pointer-y"]);
        if (card !== activeCard) clearProperties(activeCard, ["--card-rx", "--card-ry", "--card-light-x", "--card-light-y"]);
        if (magnet !== activeMagnet) clearProperties(activeMagnet, ["--magnetic-x", "--magnetic-y"]);
        activeHero = hero;
        activeCard = card;
        activeMagnet = magnet;

        if (hero) {
          const rect = hero.getBoundingClientRect();
          if (rect.width && rect.height) {
            hero.style.setProperty("--pointer-x", `${((x - rect.left) / rect.width) * 100}%`);
            hero.style.setProperty("--pointer-y", `${((y - rect.top) / rect.height) * 100}%`);
          }
        }
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.width && rect.height) {
            const ratioX = (x - rect.left) / rect.width - 0.5;
            const ratioY = (y - rect.top) / rect.height - 0.5;
            card.style.setProperty("--card-rx", `${ratioY * -3}deg`);
            card.style.setProperty("--card-ry", `${ratioX * 3.5}deg`);
            card.style.setProperty("--card-light-x", `${(ratioX + 0.5) * 100}%`);
            card.style.setProperty("--card-light-y", `${(ratioY + 0.5) * 100}%`);
          }
        }
        if (magnet) {
          const rect = magnet.getBoundingClientRect();
          magnet.style.setProperty("--magnetic-x", `${(x - rect.left - rect.width / 2) * 0.065}px`);
          magnet.style.setProperty("--magnetic-y", `${(y - rect.top - rect.height / 2) * 0.09}px`);
        }
      };
      const queuePointer = (event: PointerEvent) => {
        if (event.pointerType === "touch" || !(event.target instanceof Element) || document.hidden) return;
        pointer = { x: event.clientX, y: event.clientY, target: event.target };
        if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
      };
      // One animation-frame callback for all pointer effects, independent of
      // the number of cards on a page. No work runs between pointer events.
      window.addEventListener("pointermove", queuePointer, { passive: true, signal: motionSignal });
      window.addEventListener("blur", resetPointer, { signal: motionSignal });
      window.addEventListener("pointerout", (event) => {
        if (event.relatedTarget === null) resetPointer();
      }, { passive: true, signal: motionSignal });
      window.addEventListener("scroll", resetPointer, { passive: true, signal: motionSignal });
    };

    reducedMotion.addEventListener("change", configureMotion, { signal });
    desktopPointer.addEventListener("change", configureMotion, { signal });
    document.addEventListener("visibilitychange", configureMotion, { signal });
    configureMotion();

    return () => {
      controller.abort();
      disposeMotion();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      root.classList.remove("motion-ready", "motion-reduced", "motion-paused");
      root.style.removeProperty("--scroll-progress");
      page?.classList.remove("page-arrived");
      header?.classList.remove("is-scrolled");
    };
  }, [pathname]);

  return <><div className="scroll-progress" aria-hidden="true"><span /></div><div className="cursor-aura" aria-hidden="true" /></>;
}
