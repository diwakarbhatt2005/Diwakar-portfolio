"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/**
 * Re-mounts on every navigation into /work/*, so each project page fades
 * and slides up (400ms). Scroll animations are re-measured once it settles.
 */
export default function WorkTemplate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(t);
  }, []);

  return <div className="animate-page-enter">{children}</div>;
}
