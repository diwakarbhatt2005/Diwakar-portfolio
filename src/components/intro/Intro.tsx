"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "./IntroProvider";
import {
  BRAND,
  INTRO_IMAGES,
  ONCE_PER_SESSION,
  SCATTER,
  SEEN_KEY,
  SPLIT_AT,
  TIMING,
} from "./intro-config";

// Image box, in ems of the wordmark so it scales with it (≈ the reference's
// tall portrait card). The gap that opens is the box plus breathing room.
const BOX_W = 1.15;
const BOX_H = 1.68;
const GAP = BOX_W + 0.5;

function hasSeenIntro() {
  if (!ONCE_PER_SESSION) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage blocked (private mode etc.) — the intro just plays again.
  }
}

function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  document.body.style.overflow = locked ? "hidden" : "";
}

/** Resolve once every image has decoded and fonts are ready (max 5s). */
function waitForAssets(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  const ready = Promise.all([
    ...images.map((img) => img.decode().catch(() => undefined)),
    document.fonts.ready,
  ]);
  const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
  return Promise.race([ready, timeout]);
}

export function Intro() {
  const { reveal } = useIntro();
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || hasSeenIntro()) {
      // Skip straight to the hero. The overlay is off-white with hidden
      // letters, so hiding it here is invisible to the visitor.
      root.style.display = "none";
      reveal();
      return;
    }

    let cancelled = false;
    let ctx: gsap.Context | undefined;
    lockScroll(true);

    waitForAssets(root).then(() => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const chars = gsap.utils.toArray<HTMLElement>("[data-intro-char]");
        const frames = gsap.utils.toArray<HTMLElement>("[data-intro-frame]");
        const fontSize = parseFloat(getComputedStyle(wordRef.current!).fontSize);
        const half = (fontSize * GAP) / 2;

        // Clear the inline CSS offset (parsed as px) and hand it to yPercent.
        gsap.set(chars, { y: 0, yPercent: 110 });
        gsap.set(frames, {
          autoAlpha: 0,
          rotation: () => gsap.utils.random(-SCATTER.rotate, SCATTER.rotate),
          x: () => gsap.utils.random(-SCATTER.offset, SCATTER.offset),
          y: () => gsap.utils.random(-SCATTER.offset, SCATTER.offset),
        });
        gsap.set(stageRef.current, { clipPath: "inset(50% 50% 50% 50%)" });

        const tl = gsap.timeline({
          onComplete: () => {
            markIntroSeen();
            lockScroll(false);
            setDone(true);
          },
        });

        // 1. Wordmark: letters rise out of their masks, left to right.
        tl.to(chars, {
          yPercent: 0,
          duration: TIMING.letterDuration,
          stagger: TIMING.letterStagger,
          ease: "power4.out",
        });

        // 2. Hold, then the two halves slide apart. Nothing shows in the gap yet.
        tl.addLabel("split", `+=${TIMING.hold}`);
        tl.to(leftRef.current, { x: -half, duration: TIMING.splitDuration, ease: "power4.inOut" }, "split");
        tl.to(rightRef.current, { x: half, duration: TIMING.splitDuration, ease: "power4.inOut" }, "split");

        // 3. Once the gap is open, the image window opens inside it…
        const imagesAt = tl.duration() - 0.05;
        tl.set(frames[0], { autoAlpha: 1 }, imagesAt);
        tl.to(
          stageRef.current,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.out" },
          imagesAt,
        );

        // …and the images loop, one at a time, until the intro leaves.
        const exitAt = Math.max(TIMING.total - TIMING.exitDuration, imagesAt + TIMING.imageDuration);
        let shown = 0;
        for (let t = imagesAt + TIMING.imageDuration; t < exitAt; t += TIMING.imageDuration) {
          const next = (shown + 1) % frames.length;
          tl.set(frames[shown], { autoAlpha: 0 }, t);
          tl.set(frames[next], { autoAlpha: 1 }, t);
          shown = next;
        }

        // 4. Exit: the whole layer slides up; the hero starts animating
        //    in underneath while it's still moving.
        tl.to(root, { yPercent: -100, duration: TIMING.exitDuration, ease: "power4.inOut" }, exitAt);
        tl.call(reveal, [], exitAt + TIMING.exitDuration * 0.35);
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      lockScroll(false);
    };
  }, [reveal]);

  if (done) return null;

  const left = BRAND.slice(0, SPLIT_AT).split("");
  const right = BRAND.slice(SPLIT_AT).split("");

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-paper text-ink"
    >
      <div
        ref={wordRef}
        className="flex items-center font-sans text-[max(48px,8vw)] leading-none font-semibold tracking-[-0.02em] uppercase"
      >
        <div ref={leftRef} className="flex">
          {left.map((char, i) => (
            <Char key={i} char={char} />
          ))}
        </div>

        {/* Zero-width anchor at the split point: the image window opens here. */}
        <div className="relative h-0 w-0">
          <div
            ref={stageRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${BOX_W}em`, height: `${BOX_H}em`, clipPath: "inset(50% 50% 50% 50%)" }}
          >
            {INTRO_IMAGES.map((src) => (
              <div key={src} data-intro-frame className="invisible absolute inset-0">
                <Image
                  src={src}
                  alt=""
                  fill
                  preload
                  sizes="(min-width: 1728px) 14vw, 240px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="flex">
          {right.map((char, i) => (
            <Char key={i} char={char} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Char({ char }: { char: string }) {
  // Line mask: the wrapper clips, the inner letter slides up into view.
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <span data-intro-char className="inline-block" style={{ transform: "translateY(110%)" }}>
        {char}
      </span>
    </span>
  );
}
