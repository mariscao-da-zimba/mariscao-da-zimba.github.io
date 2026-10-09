"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".section-heading", ".route-card", ".project-strip > a", ".pillar-grid article",
  ".archive-card", ".memory-card", ".event-card", ".now-grid > a",
  ".route-gallery > a", ".landmark-facts article", ".resource-links > a",
  ".content-heading", ".music-heading", ".coastal-heading", ".tribute-copy",
  ".timeline article",
].join(",");
const surfaceSelector = [
  ".project-strip > a", ".project-card", ".route-card", ".archive-card",
  ".music-card:not(.is-playing)", ".coastal-card:not(.is-playing)", ".now-grid > a",
].join(",");
const decorSelector = ".intro-statement, .home-route, .home-visit, .page-hero, .culture-marquee";

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const controller = new AbortController();
    const { signal } = controller;
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const surfaces = new Set<HTMLElement>();
    const decorations = new Set<HTMLElement>();
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.home-quick-nav a[href^="#"]'));
    const navTargets = navLinks.map((link) => document.getElementById(link.hash.slice(1)));
    const visibleSections = new Set<Element>();
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let decorObserver: IntersectionObserver | undefined;
    let navObserver: IntersectionObserver | undefined;
    let pointerController: AbortController | undefined;
    let activeSurface: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const paintScroll = () => {
      frame = 0;
      const y = Math.max(window.scrollY, 0);
      const range = Math.max(root.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", String(Math.min(y / range, 1)));
      header?.classList.toggle("is-scrolled", y > 18);
      if (activeSurface && !reducedMotion.matches && finePointer.matches) {
        const rect = activeSurface.getBoundingClientRect();
        activeSurface.style.setProperty("--surface-x", `${Math.round(pointerX - rect.left)}px`);
        activeSurface.style.setProperty("--surface-y", `${Math.round(pointerY - rect.top)}px`);
      }
    };
    const queueScroll = () => {
      if (!document.hidden && !frame) frame = requestAnimationFrame(paintScroll);
    };
    const configureNavigation = () => {
      navObserver?.disconnect();
      visibleSections.clear();
      const marker = Math.round(window.innerHeight * .32);
      navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        });
        const current = navTargets.findIndex((target) => target && visibleSections.has(target));
        navLinks.forEach((link, index) => {
          link.classList.toggle("is-current", index === current);
          if (index === current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }, {
        // A one-pixel marker avoids choosing a sliver of the previous section.
        // IntersectionObserver percentages use viewport width, not height.
        rootMargin: `-${marker}px 0px -${Math.max(window.innerHeight - marker - 1, 0)}px 0px`,
        threshold: 0,
      });
      navTargets.forEach((target) => { if (target) navObserver?.observe(target); });
    };
    const queueResize = () => {
      if (!document.hidden && root.classList.contains("motion-ready")) configureNavigation();
      queueScroll();
    };
    const stopAnimations = () => {
      observer?.disconnect();
      decorObserver?.disconnect();
      navObserver?.disconnect();
      pointerController?.abort();
      animations.forEach((animation) => {
        animation.onfinish = animation.oncancel = null;
        animation.cancel();
      });
      animations.clear();
      surfaces.forEach((element) => {
        element.classList.remove("motion-surface");
        element.style.removeProperty("--surface-x");
        element.style.removeProperty("--surface-y");
      });
      surfaces.clear();
      activeSurface = null;
      decorations.forEach((element) => element.classList.remove("motion-decor", "motion-in-view"));
      decorations.clear();
      visibleSections.clear();
      navLinks.forEach((link) => {
        link.classList.remove("is-current");
        link.removeAttribute("aria-current");
      });
    };
    const enter = (element: HTMLElement, delay = 0, hero = false) => {
      seen.add(element);
      const animation = element.animate(
        [{ translate: hero ? "0 14px" : "0 12px", opacity: hero ? .9 : .4 }, { translate: "0 0", opacity: 1 }],
        { duration: hero ? 720 : 520, delay, easing: "cubic-bezier(.16,1,.3,1)" },
      );
      animations.add(animation);
      animation.onfinish = animation.oncancel = () => animations.delete(animation);
    };
    const clearPointer = () => {
      activeSurface?.style.removeProperty("--surface-x");
      activeSurface?.style.removeProperty("--surface-y");
      activeSurface = null;
    };
    const updatePointer = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || event.pointerType === "touch") return;
      const candidate = event.target.closest<HTMLElement>(surfaceSelector);
      if (candidate !== activeSurface) clearPointer();
      activeSurface = candidate;
      if (!activeSurface) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      queueScroll();
    };
    const leavePointer = (event: PointerEvent) => {
      if (!activeSurface || (event.relatedTarget instanceof Node && activeSurface.contains(event.relatedTarget))) return;
      clearPointer();
    };
    const configureMotion = () => {
      stopAnimations();
      const enhanced = !reducedMotion.matches && "IntersectionObserver" in window && "animate" in Element.prototype;
      root.classList.toggle("motion-ready", enhanced);
      root.classList.toggle("motion-paused", document.hidden);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (document.hidden) return;
      paintScroll();
      if (!enhanced) return;
      if (finePointer.matches) {
        document.querySelectorAll<HTMLElement>(surfaceSelector).forEach((element) => {
          element.classList.add("motion-surface");
          surfaces.add(element);
        });
        pointerController = new AbortController();
        document.addEventListener("pointermove", updatePointer, { passive: true, signal: pointerController.signal });
        document.addEventListener("pointerout", leavePointer, { passive: true, signal: pointerController.signal });
      }
      // Progressive enhancement: never hide content in markup or wait for JS to reveal it.
      decorObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("motion-in-view", entry.isIntersecting));
      }, { threshold: 0, rootMargin: "0px" });
      document.querySelectorAll<HTMLElement>(decorSelector).forEach((element) => {
        element.classList.add("motion-decor");
        decorations.add(element);
        decorObserver?.observe(element);
      });
      configureNavigation();
      document.querySelectorAll<HTMLElement>(".hero-copy>.eyebrow, .hero-copy h1>span, .hero-copy h1>em, .hero-copy>.lead, .hero-copy>.actions, .hero-copy>.hero-scroll, .page-hero h1, .page-hero>p").forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (!seen.has(element) && rect.top < window.innerHeight && rect.bottom > 0) enter(element, Math.min(index, 5) * 70, true);
      });

      observer = new IntersectionObserver((entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          if (seen.has(entry.target) || document.hidden || reducedMotion.matches) continue;
          enter(entry.target as HTMLElement, Math.min(order++, 3) * 45);
        }
      }, { rootMargin: "0px 0px -16px 0px", threshold: 0 });

      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight || rect.height > window.innerHeight * .9) seen.add(element);
        if (!seen.has(element)) observer?.observe(element);
      });
    };

    window.addEventListener("scroll", queueScroll, { passive: true, signal });
    window.addEventListener("resize", queueResize, { passive: true, signal });
    reducedMotion.addEventListener("change", configureMotion, { signal });
    finePointer.addEventListener("change", configureMotion, { signal });
    document.addEventListener("visibilitychange", configureMotion, { signal });
    configureMotion();
    return () => {
      controller.abort();
      stopAnimations();
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("motion-ready", "motion-paused");
      root.style.removeProperty("--scroll-progress");
      header?.classList.remove("is-scrolled");
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true"><span /></div>;
}
