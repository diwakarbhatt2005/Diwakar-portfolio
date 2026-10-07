import Link from "next/link";
import type { Project } from "@/data/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <nav aria-label="Next project" className="mt-[clamp(96px,11vw,170px)] border-t-[1.5px] border-line">
      <Link
        href={`/work/${project.slug}`}
        className="group block py-[clamp(40px,6vw,96px)] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <span className="text-[12px] tracking-[0.14em] text-grey uppercase">Next project →</span>
        <span className="mt-4 flex items-baseline gap-4 font-display text-[clamp(44px,5.4vw,78px)] leading-none font-medium tracking-[-0.02em] text-grey transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
          {project.title}
          <span
            aria-hidden
            className="text-[0.6em] transition-transform duration-300 group-hover:translate-x-2"
          >
            →
          </span>
        </span>
      </Link>
    </nav>
  );
}
