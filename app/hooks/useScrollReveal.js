"use client";
import { useEffect } from "react";

/**
 * GSAP ScrollTrigger reveal hook.
 * Animates opacity + transform only (no width/height/color — prevents reflow).
 *
 * @param {Array<{ref, from, duration, delay, ease}>} animations
 */
export function useScrollReveal(animations) {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let ctx;
    let ScrollTrigger;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger: ST } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ST);
      ScrollTrigger = ST;

      // Sync with Lenis if available
      if (window.__lenis) {
        window.__lenis.on("scroll", ST.update);
        ST.scrollerProxy(document.documentElement, {
          scrollTop: () => window.__lenis.scroll,
          getBoundingClientRect: () => ({
            top: 0, left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        });
      }

      ctx = gsap.context(() => {
        animations.forEach(({ ref, from, duration = 0.8, delay = 0, ease = "expo.out" }) => {
          const el = ref?.current;
          if (!el) return;

          // Only animate opacity + transform
          const safeFrom = {};
          if (from.opacity !== undefined) safeFrom.opacity = from.opacity;
          if (from.y !== undefined) safeFrom.y = from.y;
          if (from.x !== undefined) safeFrom.x = from.x;
          if (from.scale !== undefined) safeFrom.scale = from.scale;

          gsap.from(el, {
            ...safeFrom,
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    };

    init();

    return () => {
      ctx?.revert();
      ScrollTrigger?.getAll().forEach((t) => t.kill());
    };
  }, []);
}