"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Full-width 16:9 cover whose image settles from 1.08 to 1 as it scrolls into place. */
export function ProjectCover({ src, alt }: { src: string; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: frameRef.current, start: "top bottom", end: "center center", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={frameRef} className="relative aspect-[16/9] overflow-hidden rounded-[2px] bg-line">
      <div ref={imageRef} className="absolute inset-0">
        <Image src={src} alt={alt} fill preload sizes="(min-width: 1600px) 1440px, 92vw" className="object-cover" />
      </div>
    </div>
  );
}
