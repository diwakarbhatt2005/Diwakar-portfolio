"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useEffect, useRef } from "react";
import { useReveal } from "./useReveal";

gsap.registerPlugin(ScrollTrigger);

// ✏️ ABOUT TEXT
const LEAD =
  "Hi, I'm Diwakar — a Full-Stack AI Engineer building products that turn ideas into real, working experiences. I work across React, Next.js, FastAPI and LLMs — from AI-powered applications and intelligent automation to scalable web products and integrations. I care about clean interfaces, practical AI and software that actually solves problems.";

// ✏️ PHOTO — square-cropped, tilted card next to the text.
const PHOTO = "/images/hero-portrait.jpg";

// ✏️ Colour the letters fill with as you scroll (same red as the menu hover).
const FILL = "#d12424";

export function IntroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useReveal(rootRef);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = leadRef.current?.querySelectorAll<HTMLElement>("[data-char]");
    if (!chars?.length) return;

    if (reduceMotion) {
      gsap.set(chars, { color: FILL });
      return;
    }

    const ctx = gsap.context(() => {
      // Letters turn red one by one, first word to last, as the paragraph scrolls through.
      gsap.to(chars, {
        color: FILL,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: leadRef.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: true,
        },
      });

      // The photo drifts slightly slower than the page.
      gsap.fromTo(
        parallaxRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const words = LEAD.split(" ");

  return (
    <section ref={rootRef} id="about" className="bg-paper pt-[clamp(40px,5vw,80px)] text-ink">
      <div className="mx-auto max-w-[1600px] px-5 md:px-[5.3vw]">
        <div data-reveal className="border-t-[1.5px] border-line" />

        {/* On desktop the photo floats right and the text wraps around it. */}
        <div className="flex flex-col gap-10 pt-[clamp(64px,9vw,140px)] lg:block lg:w-[86%] lg:max-w-[1180px]">
          <figure
            className="order-last w-[clamp(140px,38vw,200px)] self-end lg:float-right lg:mt-[-0.4em] lg:ml-[clamp(28px,3vw,56px)] lg:w-[clamp(200px,15vw,330px)]"
          >
            <div ref={parallaxRef}>
              <div className="animate-float">
                <div
                  data-reveal
                  className="relative aspect-square -rotate-6 overflow-hidden rounded-[2px] bg-[#dededc] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.28)]"
                >
                  <Image
                    src={PHOTO}
                    alt="Portrait of Diwakar"
                    fill
                    sizes="(min-width: 1024px) 15vw, 38vw"
                    className="object-cover object-[55%_30%] grayscale"
                  />
                </div>
              </div>
            </div>
          </figure>

          <p
            ref={leadRef}
            className="font-display text-[clamp(22px,2.72vw,52px)] leading-[1.2] font-medium tracking-[-0.01em] text-mute"
          >
            <span className="sr-only">{LEAD}</span>
            {words.map((word, w) => (
              // Words never break mid-way; letters inside get coloured one by one.
              // The space sits outside the word so lines can wrap there.
              <Fragment key={w}>
                <span aria-hidden className="whitespace-nowrap">
                  {word.split("").map((char, c) => (
                    <span key={c} data-char>
                      {char}
                    </span>
                  ))}
                </span>
                {w < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
        </div>

        <div data-reveal className="mt-16 clear-both border-t-[1.5px] border-line" />
      </div>
    </section>
  );
}
