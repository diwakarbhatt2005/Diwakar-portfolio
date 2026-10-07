import { Reveal } from "@/components/Reveal";

/** Numbered list with hairline dividers; items fade up one after another. */
export function ContributionList({ items }: { items: string[] }) {
  return (
    <ol className="border-b-[1.5px] border-line">
      {items.map((item, i) => (
        <li key={item} className="border-t-[1.5px] border-line">
          <Reveal delay={i * 0.06} className="flex items-baseline gap-6 py-5">
            <span className="w-6 shrink-0 text-[12px] text-grey tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[clamp(16px,1.25vw,18px)] leading-snug">{item}</span>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
