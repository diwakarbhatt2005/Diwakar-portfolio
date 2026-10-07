import type { Skill } from "@/data/skills";

/**
 * One Skillset row. Hovering it brightens its text while the rest of the list
 * dims (handled with `group/list` on the <ul>). The divider is its own element
 * so it can "draw" from left to right on reveal.
 */
export function SkillRow({ skill }: { skill: Skill }) {
  return (
    <li
      className="group/row relative transition-opacity duration-300 ease-out group-hover/list:opacity-45 hover:opacity-100!"
    >
      <div
        data-skill-row
        className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-7 lg:grid-cols-12 lg:gap-x-6 lg:py-12"
      >
        <span className="text-[15px] leading-[23px] tracking-[-0.01em] text-dim tabular-nums transition-colors duration-300 group-hover/row:text-paper lg:col-span-1">
          {skill.index}
        </span>
        <h3 className="font-display text-[clamp(24px,2.9vw,44px)] leading-[1.2] font-medium tracking-[-0.015em] text-balance text-paper lg:col-span-6">
          {skill.title}
        </h3>
        <p className="col-start-2 mt-3 max-w-[440px] text-[15px] leading-[23px] text-soft transition-colors duration-300 group-hover/row:text-paper lg:col-span-5 lg:col-start-8 lg:mt-0">
          {skill.description}
        </p>
      </div>
      <span data-skill-rule aria-hidden className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-rule" />
    </li>
  );
}
