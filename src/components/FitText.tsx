"use client";

import { useEffect, useRef } from "react";

/**
 * Scales an element's font-size so its text exactly fills its parent's width
 * (one line). Re-fits on resize and once web fonts have loaded.
 * The element should be `inline-block whitespace-nowrap`; give it a CSS
 * font-size fallback (e.g. 11vw) so the first paint is already close.
 */
export function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = "100px";
      const textWidth = el.scrollWidth;
      const target = parent.clientWidth;
      if (textWidth > 0) {
        // A hair under 100% so rounding never causes a horizontal scrollbar.
        el.style.fontSize = `${(100 * target * 0.998) / textWidth}px`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    void document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, []);

  return ref;
}

type Props = {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** A one-line paragraph that always spans its container edge to edge. */
export function FitText({ children, className, ...rest }: Props) {
  const ref = useFitText<HTMLParagraphElement>();
  return (
    <p ref={ref} className={`inline-block whitespace-nowrap ${className ?? ""}`} {...rest}>
      {children}
    </p>
  );
}
