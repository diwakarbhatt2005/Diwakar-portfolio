type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  /** Show a → that nudges right on hover. */
  arrow?: boolean;
};

/** Uppercase footer link whose 1px underline draws in from the left on hover. */
export function FooterLink({ href, children, external, arrow }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-2 text-[16px] tracking-[0.01em] text-white uppercase outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:text-[18px]"
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-[6px] transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
        {children}
      </span>
      {arrow && (
        <span aria-hidden className="pb-[6px] transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      )}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}
