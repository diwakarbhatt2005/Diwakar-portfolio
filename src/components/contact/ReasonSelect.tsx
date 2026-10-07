"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props<T extends string> = {
  id: string;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
};

/**
 * Custom dropdown styled like the underline inputs. Follows the WAI-ARIA
 * "select-only combobox" pattern: focus stays on the combobox, the highlighted
 * option is announced via aria-activedescendant.
 * Keys: ↑/↓ move, Enter/Space select, Esc closes, Home/End, type to jump.
 */
export function ReasonSelect<T extends string>({ id, label, options, value, onChange, onBlur }: Props<T>) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(() => Math.max(0, options.indexOf(value)));
  const typed = useRef({ text: "", timer: 0 });

  // Close when clicking anywhere else.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openList = () => {
    setHighlight(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (i: number) => {
    onChange(options[i]);
    setOpen(false);
  };

  const typeAhead = (key: string) => {
    window.clearTimeout(typed.current.timer);
    typed.current.text += key.toLowerCase();
    typed.current.timer = window.setTimeout(() => (typed.current.text = ""), 600);
    const i = options.findIndex((o) => o.toLowerCase().startsWith(typed.current.text));
    if (i >= 0) {
      if (open) setHighlight(i);
      else onChange(options[i]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setHighlight((h) => Math.min(last, h + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setHighlight((h) => Math.max(0, h - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setHighlight(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setHighlight(last);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(highlight);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        if (open) choose(highlight);
        break;
      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) typeAhead(e.key);
    }
  };

  const optionId = (i: number) => `${listboxId}-opt-${i}`;

  return (
    <div ref={rootRef} className="relative">
      <label
        id={`${id}-label`}
        className={`mb-3 block text-[12px] tracking-[0.08em] uppercase transition-colors duration-[250ms] ${
          open ? "text-paper" : "text-dim"
        }`}
      >
        {label}
      </label>

      <div
        id={id}
        role="combobox"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-activedescendant={open ? optionId(highlight) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={`flex w-full cursor-pointer items-center justify-between gap-4 border-b pb-3 text-[18px] leading-tight text-paper transition-colors duration-[250ms] outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper lg:text-[22px] ${
          open ? "border-paper" : "border-paper/35"
        }`}
      >
        <span>{value}</span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={`size-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 6l5 5 5-5" />
        </svg>
      </div>

      <ul
        id={listboxId}
        role="listbox"
        aria-labelledby={`${id}-label`}
        hidden={!open}
        className="absolute inset-x-0 top-full z-20 mt-2 border border-paper/35 bg-night py-2"
      >
        {options.map((option, i) => (
          <li
            key={option}
            id={optionId(i)}
            role="option"
            aria-selected={option === value}
            // Don't steal focus from the combobox.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => choose(i)}
            onMouseEnter={() => setHighlight(i)}
            className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-[16px] text-paper ${
              i === highlight ? "bg-white/[0.06]" : ""
            }`}
          >
            {option}
            {option === value && <span aria-hidden>✓</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
