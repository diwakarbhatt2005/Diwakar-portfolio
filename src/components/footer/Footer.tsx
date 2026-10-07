"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useFitText } from "@/components/FitText";
import { CONTACT_EMAIL, FOOTER } from "@/data/site";
import { CopyEmail } from "./CopyEmail";
import { FooterLink } from "./FooterLink";

gsap.registerPlugin(ScrollTrigger);

// Fine film grain, drawn once as an SVG.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Dark site footer: giant edge-to-edge wordmark, tagline, links, copyright. */
export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const wordmarkRef = useFitText<HTMLParagraphElement>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-footer-char]", {
        yPercent: 100,
        duration: 0.9,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: { trigger: wordmarkRef.current, start: "top 90%", once: true },
      });
      gsap.from("[data-footer-line]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-footer-tagline]", start: "top 92%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [wordmarkRef]);

  return (
    <footer ref={rootRef} className="relative w-full overflow-hidden bg-night pt-[clamp(72px,12vh,140px)] pb-[clamp(32px,6vh,64px)] font-display text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: GRAIN }} />

      <div className="relative px-5 md:px-[5.3vw]">
        {/* Wordmark — fitted to the full width; letters rise from a mask. */}
        <div className="w-full">
          <p
            ref={wordmarkRef}
            className="inline-block text-[10vw] leading-[0.85] font-semibold tracking-[-0.02em] whitespace-nowrap uppercase"
          >
            <span className="sr-only">Diwakar Bhatt</span>
            {FOOTER.wordmark.split("").map((char, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.02em] align-bottom">
                <span data-footer-char className="inline-block">
                  {char}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Tagline + links */}
        <div className="mt-[clamp(56px,14vh,160px)] grid items-end gap-12 lg:grid-cols-12 lg:gap-x-6">
          <p
            data-footer-tagline
            className="text-[clamp(26px,3.05vw,48px)] leading-[1.15] font-medium tracking-[-0.01em] uppercase lg:col-span-6"
          >
            {FOOTER.tagline.map((line) => (
              <span key={line} data-footer-line className="block">
                {line}
              </span>
            ))}
          </p>

          <div className="flex flex-col gap-y-5 lg:col-span-6 lg:items-end lg:gap-y-9">
            <div className="flex flex-wrap items-end gap-x-7 gap-y-5 lg:justify-end lg:gap-x-12">
              <FooterLink href={`mailto:${CONTACT_EMAIL}`} arrow>
                {FOOTER.cta}
              </FooterLink>
              <span className="inline-flex items-end gap-3">
                <FooterLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FooterLink>
                <CopyEmail email={CONTACT_EMAIL} />
              </span>
            </div>
            {FOOTER.links.length > 0 && (
              <div className="flex flex-wrap gap-x-7 gap-y-5 lg:justify-end lg:gap-x-12">
                {FOOTER.links.map((link) => (
                  <FooterLink key={link.label} href={link.href} external>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[clamp(56px,12vh,140px)] flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-white/90 lg:text-[16px]">{FOOTER.copyright}</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[13px] tracking-[0.08em] text-white/60 uppercase transition-colors outline-none hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:text-[14px]"
          >
            Back to top
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
