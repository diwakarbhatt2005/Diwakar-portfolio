"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
  className?: string;
};

/** Label + borderless input with an underline that brightens on focus. */
export function UnderlineField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  multiline,
  error,
  registration,
  className,
}: Props) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `peer block w-full resize-none border-0 border-b bg-transparent pb-3 text-[18px] leading-tight text-paper outline-none transition-colors duration-[250ms] placeholder:text-paper/40 lg:text-[22px] ${
      error ? "border-[#e5484d] focus:border-[#e5484d]" : "border-paper/35 focus:border-paper"
    }`,
    ...registration,
  };

  return (
    <div className={`group flex flex-col-reverse ${className ?? ""}`}>
      {error && (
        <p id={errorId} className="order-first mt-2 text-[13px] text-[#e5484d]">
          {error}
        </p>
      )}
      {multiline ? (
        <textarea
          {...shared}
          rows={1}
          // Grow with the text instead of scrolling.
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
          }}
        />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {/* flex-col-reverse keeps the label visually on top while letting it react to the input's focus via peer. */}
      <label
        htmlFor={id}
        className="mb-3 text-[12px] tracking-[0.08em] text-dim uppercase transition-colors duration-[250ms] peer-focus:text-paper"
      >
        {label}
      </label>
    </div>
  );
}
