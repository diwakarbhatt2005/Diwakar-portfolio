"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { coverOf, type Project } from "@/data/projects";

type Props = {
  project: Project;
  active: boolean;
  onActivate: () => void;
  rowRef: (el: HTMLLIElement | null) => void;
  index: number;
};

/**
 * One project in the Selected Work list.
 * - Desktop (lg+): accordion row. Collapsed 112px; active 270px with meta,
 *   description and preview image fading in.
 * - Mobile: a plain stacked card with everything visible.
 * DOM order follows the mobile card; desktop places pieces on a 12-col grid.
 */
export function ProjectRow({ project, active, onActivate, rowRef, index }: Props) {
  const imageRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: the preview drifts up to ±8px with the mouse.
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!imageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    imageRef.current.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  };
  const onMouseLeave = () => {
    if (imageRef.current) imageRef.current.style.transform = "";
  };

  return (
    <li ref={rowRef} data-index={index} className="border-t-[1.5px] border-line last:border-b-[1.5px]">
      <Reveal>
        <Link
          href={`/work/${project.slug}`}
          aria-expanded={active}
          data-active={active}
          onMouseEnter={onActivate}
          onFocus={onActivate}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group block py-10 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:grid lg:h-[112px] lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-7 lg:overflow-hidden lg:py-6 lg:transition-[height] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:data-[active=true]:h-[270px] motion-reduce:transition-none"
        >
          {/* Preview — first on mobile, right column on desktop */}
          <div className="relative mb-7 aspect-[16/10] w-full overflow-hidden rounded-[2px] lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:w-full lg:max-w-[355px] lg:self-start lg:justify-self-end lg:scale-[1.04] lg:opacity-0 lg:transition-[opacity,scale] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-data-[active=true]:scale-100 lg:group-data-[active=true]:opacity-100 motion-reduce:transition-none">
            <div ref={imageRef} className="absolute -inset-3 transition-transform duration-300 ease-out">
              <Image
                src={coverOf(project.slug)}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1024px) 355px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Index + title */}
          <div className="flex items-start gap-3 lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <span className="pt-1.5 text-[12px] text-grey tabular-nums">{project.index}</span>
            <h3 className="font-display text-[clamp(34px,9vw,45px)] leading-none font-medium tracking-[-0.02em] whitespace-nowrap text-ink transition-colors duration-500 lg:text-[clamp(30px,3.1vw,45px)] lg:text-grey lg:group-data-[active=true]:text-accent">
              {project.title}
            </h3>
          </div>

          {/* Subtitle + description — under the button on desktop */}
          <div className="mt-4 lg:col-span-3 lg:col-start-6 lg:row-start-2 lg:mt-0 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-data-[active=true]:opacity-100 lg:group-data-[active=true]:delay-100">
            <p className="text-[13px] tracking-[0.02em] text-grey">{project.subtitle}</p>
            <p className="mt-2 max-w-[360px] text-[15px] leading-[1.45] text-ink/80 lg:text-[14px]">{project.short}</p>
          </div>

          {/* Meta — under the title on desktop */}
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:pl-[27px] lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-data-[active=true]:opacity-100 lg:group-data-[active=true]:delay-100">
            <MetaItem label="Role" value={project.role} />
            <MetaItem label="Year" value={project.year} />
            <MetaItem label="Stack" value={project.stack.join(", ")} wide />
          </dl>

          {/* Button — top of the middle column on desktop, last on mobile */}
          <div className="mt-7 lg:col-span-3 lg:col-start-6 lg:row-start-1 lg:mt-0">
            <span className="inline-flex items-center gap-2 rounded-[2px] border border-ink px-4 py-2 text-[16px] text-ink transition-colors duration-300 lg:border-grey lg:text-grey lg:group-hover:border-ink lg:group-hover:text-ink lg:group-data-[active=true]:border-ink lg:group-data-[active=true]:text-ink">
              View Project
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 lg:group-data-[active=true]:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </Reveal>
    </li>
  );
}

function MetaItem({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="text-[10px] tracking-[0.14em] text-grey uppercase">{label}</dt>
      <dd className="mt-1 text-[13px] leading-snug text-ink">{value}</dd>
    </div>
  );
}
