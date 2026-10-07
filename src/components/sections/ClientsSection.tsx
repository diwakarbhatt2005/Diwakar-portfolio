"use client";

import { useEffect, useRef } from "react";
import { Marquee, type Logo } from "@/components/Marquee";
import { useReveal } from "./useReveal";

// ✏️ CLIENT LOGOS — files in /public/logos (dark, transparent background).
// ratio = width / height of the file.
const ROW_1: Logo[] = [
  { src: "/logos/c1-02.svg", alt: "Rise", ratio: 67.71 / 24 },
  { src: "/logos/c1-03.png", alt: "Gloog", ratio: 318 / 60 },
  { src: "/logos/c1-04.png", alt: "Pretty Damn Quick", ratio: 250 / 116 },
  { src: "/logos/c1-05.png", alt: "Kornit Digital", ratio: 384 / 92 },
  { src: "/logos/c1-12.svg", alt: "Shenkar", ratio: 153.12 / 49.09 },
];

const ROW_2: Logo[] = [
  { src: "/logos/c2-01.svg", alt: "Twintera", ratio: 108 / 24 },
  { src: "/logos/c2-02.svg", alt: "Client logo", ratio: 92.03 / 24 },
  { src: "/logos/c2-03.svg", alt: "Client logo", ratio: 56 / 24 },
  { src: "/logos/c2-04.svg", alt: "iMotion", ratio: 103.14 / 24 },
  { src: "/logos/c2-07.svg", alt: "Beerbazaar", ratio: 152 / 16 },
  { src: "/logos/c2-11.svg", alt: "Malka", ratio: 93.51 / 64.87 },
];

// ✏️ SHOWREEL
const VIDEO = "/videos/showreel.mp4";
const POSTER = "/images/showreel-poster.webp";

export function ClientsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useReveal(rootRef);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Clients and collaborations"
      className="bg-paper pb-[clamp(72px,9vw,140px)] text-ink [--logo-gap:40px] [--logo-h:26px] [--logo-w:84px] md:[--logo-gap:56px] md:[--logo-h:28px] md:[--logo-w:96px]"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-[45px] px-5 pt-[15px] md:px-[5.3vw] lg:flex-row">
        <div data-reveal className="hidden shrink-0 lg:block">
          <video
            ref={videoRef}
            src={VIDEO}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Showreel"
            className="aspect-[640/372] w-[clamp(240px,21vw,340px)] rounded-[2px] bg-line object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 pt-8 lg:pt-10">
          <p data-reveal className="mb-7 font-display text-[12px] tracking-[0.06em] text-ink/80 uppercase md:text-[13px]">
            (Clients &amp; Collaborations)
          </p>

          <div className="flex flex-col gap-6 md:gap-5">
            <div data-reveal>
              <Marquee logos={ROW_1} duration={38} repeat={3} />
            </div>
            <div data-reveal>
              <Marquee logos={ROW_2} duration={44} reverse repeat={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
