"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".section-heading", ".route-card", ".project-strip > a", ".pillar-grid article",
  ".archive-card", ".memory-card", ".event-card", ".now-grid > a",
  ".route-gallery > a", ".landmark-facts article", ".resource-links > a",
].join(",");

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const { signal } = controller;
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    const paintScroll = () => {
      frame = 0;
      const y = Math.max(window.scrollY, 0);
      const range = Math.max(root.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", String(Math.min(y / range, 1)));
      header?.classList.toggle("is-scrolled", y > 18);
    };
    const queueScroll = () => {
      if (!document.hidden && !frame) frame = requestAnimationFrame(paintScroll);
    };
    const stopAnimations = () => {
      observer?.disconnect();
      animations.forEach((animation) => {
        animation.onfinish = animation.oncancel = null;
        animation.cancel();
      });
      animations.clear();
    };
    const configureMotion = () => {
      stopAnimations();
      root.classList.toggle("motion-ready", !reducedMotion.matches);
      root.classList.toggle("motion-paused", document.hidden);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (document.hidden) return;
      paintScroll();
      if (reducedMotion.matches || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

      // Content remains visible before and without JS. No pointer tracking or 3D text.
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          if (seen.has(entry.target) || document.hidden || reducedMotion.matches) continue;
          seen.add(entry.target);
          const animation = entry.target.animate(
            [{ translate: "0 12px" }, { translate: "0 0" }],
            { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" },
          );
          animations.add(animation);
          animation.onfinish = animation.oncancel = () => animations.delete(animation);
        }
      }, { rootMargin: "0px 0px -16px 0px", threshold: 0 });

      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight || rect.height > window.innerHeight * .9) seen.add(element);
        if (!seen.has(element)) observer?.observe(element);
      });
    };

    window.addEventListener("scroll", queueScroll, { passive: true, signal });
    window.addEventListener("resize", queueScroll, { passive: true, signal });
    reducedMotion.addEventListener("change", configureMotion, { signal });
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
