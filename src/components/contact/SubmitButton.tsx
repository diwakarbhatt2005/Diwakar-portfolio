"use client";

/** White "Send Details →" button; shows "Sending…" with a sliding bar while busy. */
export function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden bg-white px-7 py-4 text-[17px] font-medium text-[#0a0a0a] transition-[background-color,scale] duration-200 outline-none hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper active:scale-[0.98] disabled:cursor-wait sm:w-auto lg:text-[18px]"
    >
      {loading ? "Sending…" : "Send Details"}
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M3 10h13M11 5l5 5-5 5" />
      </svg>
      {loading && (
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
          <span className="block h-full w-1/3 animate-progress bg-[#0a0a0a]" />
        </span>
      )}
    </button>
  );
}
