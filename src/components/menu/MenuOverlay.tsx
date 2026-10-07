"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";

// ✏️ MENU CONTENT
const LINKS = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];
const EMAIL = "diwakarbhatt1983@gmail.com"; // ✏️ shown in capitals via CSS

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build the open animation once; opening plays it, closing reverses it.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const speed = reduceMotion ? 0.01 : 1;

      tlRef.current = gsap
        .timeline({ paused: true })
        .set(rootRef.current, { visibility: "visible" })
        .fromTo(
          rootRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 * speed, ease: "power4.inOut" },
        )
        .fromTo(
          "[data-menu-link]",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8 * speed, stagger: 0.07 * speed, ease: "power4.out" },
          0.35 * speed,
        )
        .fromTo(
          "[data-menu-fade]",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 * speed, ease: "power3.out" },
          0.55 * speed,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (open) {
      tl.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus();

      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }

    // Close a little faster than it opens.
    tl.timeScale(1.4).reverse();
    document.documentElement.style.overflow = "";
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      style={{ visibility: "hidden" }}
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink"
    >
      <div className="flex items-center justify-between px-5 pt-6 md:px-[5.3vw] md:pt-9">
        <Logo />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="group relative -top-1.5 flex h-10 w-10 items-center justify-center md:-top-3 md:w-14"
        >
          <span className="absolute h-[1.5px] w-9 rotate-45 bg-ink transition-transform duration-300 group-hover:rotate-[135deg] md:w-11" />
          <span className="absolute h-[1.5px] w-9 -rotate-45 bg-ink transition-transform duration-300 group-hover:rotate-45 md:w-11" />
        </button>
      </div>

      <nav className="px-5 pt-[clamp(64px,12vh,140px)] md:px-[5.3vw]">
        <ul className="flex flex-col gap-[clamp(6px,1.2vh,16px)]">
          {LINKS.map((link) => (
            <li key={link.label} className="overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <a
                href={link.href}
                onClick={onClose}
                data-menu-link
                className="inline-block text-[clamp(44px,4.4vw,96px)] leading-[1.15] font-medium tracking-[-0.03em] transition-colors duration-300 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${EMAIL.toLowerCase()}`}
          data-menu-fade
          className="mt-[clamp(40px,8vh,96px)] inline-block border-b border-ink/60 pb-0.5 text-[clamp(14px,1vw,19px)] tracking-[0.01em] text-ink/65 uppercase transition-colors hover:border-ink hover:text-ink"
        >
          {EMAIL}
        </a>
      </nav>
    </div>
  );
}
