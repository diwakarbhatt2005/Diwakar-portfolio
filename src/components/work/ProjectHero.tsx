import type { Project } from "@/data/projects";
import { StackChips } from "./StackChips";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header>
      <div className="pt-[clamp(64px,10vw,150px)]">
        <h1 className="font-display text-[clamp(56px,8.4vw,120px)] leading-[0.95] font-medium tracking-[-0.03em]">
          {project.title}
        </h1>
        <p className="mt-5 text-[clamp(17px,1.4vw,22px)] text-grey">{project.subtitle}</p>
      </div>

      <dl className="mt-[clamp(48px,6vw,88px)] grid grid-cols-2 gap-x-6 gap-y-8 border-t-[1.5px] border-line pt-6 lg:grid-cols-4">
        <Meta label="Role" value={project.role} />
        <Meta label="Type" value={project.meta} />
        <Meta label="Year" value={project.year} />
        <div className="col-span-2 lg:col-span-1">
          <dt className="mb-3 text-[11px] tracking-[0.14em] text-grey uppercase">Stack</dt>
          <dd>
            <StackChips stack={project.stack} size="sm" />
          </dd>
        </div>
      </dl>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-3 text-[11px] tracking-[0.14em] text-grey uppercase">{label}</dt>
      <dd className="text-[15px] leading-snug">{value}</dd>
    </div>
  );
}
