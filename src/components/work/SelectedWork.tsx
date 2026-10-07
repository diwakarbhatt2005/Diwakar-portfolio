"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import { ProjectRow } from "./ProjectRow";

/**
 * Homepage "Selected Work" accordion. Exactly one row is open; it follows
 * the mouse, keyboard focus, and — while scrolling — whichever row crosses
 * the middle of the viewport. The last opened row stays open.
 */
export function SelectedWork() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the screen.
      { rootMargin: "-48% 0px -48% 0px" },
    );
    rows.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  const rowRef = useCallback(
    (i: number) => (el: HTMLLIElement | null) => {
      rows.current[i] = el;
    },
    [],
  );

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-paper pt-[clamp(72px,8vw,128px)] pb-[clamp(96px,10vw,160px)] text-ink">
      <div className="mx-auto max-w-[1600px] px-5 md:px-[5.3vw]">
        <Reveal>
          <h2
            id="work-heading"
            className="mb-10 font-display text-[clamp(44px,5.4vw,78px)] leading-none font-medium tracking-[-0.02em]"
          >
            Projects
          </h2>
        </Reveal>

        <ul>
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              active={active === i}
              onActivate={() => setActive(i)}
              rowRef={rowRef(i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
