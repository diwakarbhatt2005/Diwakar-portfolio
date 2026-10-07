"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string };

/**
 * Full-bleed looping video behind the contact card.
 * - The poster fills the area from first paint (no layout shift).
 * - The video only loads once the section is within one viewport, plays
 *   while visible and pauses off-screen.
 * - Reduced motion or Data Saver: poster only.
 */
export function BackgroundVideo({ src, poster }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const [load, setLoad] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        if (!reduceMotion && !saveData) setLoad(true);
        near.disconnect();
      },
      { rootMargin: "100% 0px" },
    );

    const onScreen = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      const video = videoRef.current;
      if (!video) return;
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    });

    near.observe(wrap);
    onScreen.observe(wrap);
    return () => {
      near.disconnect();
      onScreen.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      {/* Slow zoom-out the first time the section comes near. */}
      <div
        className={`absolute inset-0 transition-[scale] duration-[2500ms] ease-out motion-reduce:transition-none ${
          entered ? "scale-100" : "scale-[1.06] motion-reduce:scale-100"
        }`}
      >
        <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
        {load && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            onCanPlay={(e) => {
              if (visible.current) void e.currentTarget.play().catch(() => undefined);
            }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
