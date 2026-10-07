"use client";

import Image from "next/image";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/intro/IntroProvider";
import { MenuOverlay } from "@/components/menu/MenuOverlay";
import { Logo } from "@/components/Logo";

// ✏️ HERO CONTENT
const NAME_LINES = ["Diwakar", "Bhatt"];
const TAGLINE = ["Websites, products & the craft in between.", "I take the details seriously."];
const SKILLS = ["Frontend Development", "UI Design", "UX | Product", "Motion", "Next.js"];
const PHOTO = "/images/hero-portrait.jpg";

// Pieces start hidden inline (no flash before JS) and GSAP takes over.
const HIDDEN_LINE = { transform: "translateY(110%)" };
const HIDDEN = { opacity: 0, visibility: "hidden" as const };

export function Hero() {
  const { revealed } = useIntro();
  const rootRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!revealed || !rootRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-hero-char]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");

      if (reduceMotion) {
        gsap.set([...chars, ...lines], { y: 0, yPercent: 0 });
        gsap.set(fades, { autoAlpha: 1 });
        gsap.set("[data-hero-photo]", { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.set([...chars, ...lines], { y: 0, yPercent: 110 });
      const tl = gsap.timeline();

      // Name: same line-mask slide-up as the intro wordmark.
      tl.to(chars, { yPercent: 0, duration: 1, stagger: 0.04, ease: "power4.out" }, 0);
      tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" }, 0.35);
      tl.fromTo(
        fades,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" },
        0.5,
      );
      // Photo wipes up from the bottom while the image settles from a zoom.
      tl.fromTo(
        "[data-hero-photo]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" },
        0,
      );
      tl.fromTo("[data-hero-photo] img", { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, [revealed]);

  return (
    <section ref={rootRef} className="relative min-h-svh overflow-hidden bg-paper text-ink">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-6 md:px-[5.3vw] md:pt-9">
        <a href="#" data-hero-fade style={HIDDEN} aria-label="Diwakar Bhatt — home">
          <Logo />
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          data-hero-fade
          style={HIDDEN}
          className="group relative -top-1.5 flex h-10 w-10 flex-col items-end justify-center gap-[7px] md:-top-3 md:w-14"
        >
          <span className="h-[2px] w-8 origin-right bg-ink transition-transform duration-300 group-hover:scale-x-75 md:w-11" />
          <span className="h-[2px] w-8 bg-ink md:w-11" />
        </button>
      </header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} />

      <div className="flex min-h-svh flex-col md:block">
        {/* Copy */}
        <div className="px-5 pt-28 md:absolute md:inset-y-0 md:left-0 md:flex md:w-[41%] md:items-center md:px-[5.3vw] md:pt-0">
          <div>
            <h1 className="text-[clamp(56px,7vw,160px)] leading-[0.9] font-medium tracking-[-0.045em]">
              {NAME_LINES.map((line) => (
                <span key={line} className="block">
                  {line.split("").map((char, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                      <span data-hero-char className="inline-block" style={HIDDEN_LINE}>
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="mt-4 text-[clamp(17px,1.2vw,24px)] leading-[1.55] tracking-[-0.01em]">
              {TAGLINE.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-hero-line className="block" style={HIDDEN_LINE}>
                    {line}
                  </span>
                </span>
              ))}
            </p>

            <ul className="mt-10 flex max-w-[30rem] flex-wrap gap-3 md:mt-12 md:gap-[14px]">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  data-hero-fade
                  style={HIDDEN}
                  className="border border-ink/30 px-[18px] py-[10px] text-[14px] tracking-[0.03em] md:px-[22px] md:py-3 md:text-[clamp(14px,0.8vw,16px)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photo */}
        <div
          data-hero-photo
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          className="relative mx-5 mt-12 aspect-[4/5] overflow-hidden bg-[#dededc] md:absolute md:top-[clamp(72px,9vh,110px)] md:right-[5%] md:bottom-[clamp(12px,2vh,24px)] md:left-[41.25%] md:m-0 md:aspect-auto"
        >
          <Image
            src={PHOTO}
            alt="Portrait of Diwakar"
            fill
            preload
            sizes="(min-width: 768px) 54vw, 100vw"
            className="object-cover object-[55%_25%]"
          />
        </div>
      </div>
    </section>
  );
}
