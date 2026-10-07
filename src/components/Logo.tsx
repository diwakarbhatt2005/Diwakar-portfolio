// ✏️ LOGO — "DIWAKAR.BHATT" followed by a circled D, set like the ® in the
// reference: same line, same height as the capitals.
export function Logo() {
  return (
    <span className="relative -top-1.5 inline-flex items-center gap-[0.1em] text-[16px] font-semibold tracking-[-0.01em] md:-top-3 md:text-[clamp(16px,1.1vw,21px)]">
      DIWAKAR.BHATT
      {/* Sized in the logo's own ems so it scales with the text. */}
      <span
        aria-hidden
        className="relative -top-[0.02em] inline-flex size-[0.8em] items-center justify-center rounded-full border-[0.09em] border-current"
      >
        <span className="text-[0.52em] leading-none font-bold">D</span>
      </span>
    </span>
  );
}
