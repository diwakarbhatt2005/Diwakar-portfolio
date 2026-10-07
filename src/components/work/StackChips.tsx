export function StackChips({ stack, size = "md" }: { stack: string[]; size?: "sm" | "md" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li
          key={item}
          className={`rounded-full border border-ink/25 text-ink ${
            size === "sm" ? "px-3 py-1 text-[12px]" : "px-[14px] py-[6px] text-[13px]"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
