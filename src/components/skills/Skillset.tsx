"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SKILLS } from "@/data/skills";
import { SkillRow } from "./SkillRow";

gsap.registerPlugin(ScrollTrigger);

/** Dark "Skillset" section: hovering a row brightens it and dims the others. */
export function Skillset() {
  const rootRef = useRef<HTMLElement>(null);

  // Reveal: heading and rows fade up (staggered); divider lines draw left → right.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-skill-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-skill-heading]", start: "top 85%", once: true },
      });

      const list = { trigger: "[data-skill-list]", start: "top 80%", once: true };
      gsap.from("[data-skill-row]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: list,
      });
      gsap.from("[data-skill-rule]", {
        scaleX: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.inOut",
        scrollTrigger: list,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      aria-labelledby="skillset-title"
      className="relative flex min-h-svh flex-col justify-center bg-night py-16 text-paper lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[5.3vw]">
        <h2
          id="skillset-title"
          data-skill-heading
          className="mb-16 font-display text-[clamp(44px,5.4vw,78px)] leading-none font-medium tracking-[-0.02em]"
        >
          Skillset
        </h2>

        <div data-skill-list className="relative">
          <span data-skill-rule aria-hidden className="absolute inset-x-0 top-0 h-[1.5px] origin-left bg-rule" />
          <ul className="group/list">
            {SKILLS.map((skill) => (
              <SkillRow key={skill.index} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
