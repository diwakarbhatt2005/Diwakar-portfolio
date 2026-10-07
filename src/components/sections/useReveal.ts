"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Fades up every `[data-reveal]` inside `scope` as it enters the viewport. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scope.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [scope]);
}
