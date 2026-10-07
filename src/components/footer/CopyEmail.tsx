"use client";

import { useEffect, useState } from "react";

/** Tiny "COPY" button that puts the email on the clipboard and confirms for 1.5s. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked (e.g. insecure context) — the mailto link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy ${email}`}
      className="pb-[6px] text-[11px] tracking-[0.12em] text-white/60 uppercase transition-colors outline-none hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
