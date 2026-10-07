"use client";

import { createContext, useCallback, useContext, useState } from "react";

type IntroState = {
  /** True once the intro has started leaving (or was skipped). */
  revealed: boolean;
  reveal: () => void;
};

const IntroContext = createContext<IntroState | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);

  return (
    <IntroContext.Provider value={{ revealed, reveal }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used inside <IntroProvider>");
  return ctx;
}
