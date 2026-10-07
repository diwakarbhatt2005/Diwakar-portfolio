"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CONTACT, CONTACT_EMAIL } from "@/data/site";
import { REASONS, contactSchema, type ContactData, type ContactInput } from "@/lib/contactSchema";
import { BackgroundVideo } from "./BackgroundVideo";
import { ReasonSelect } from "./ReasonSelect";
import { SubmitButton } from "./SubmitButton";
import { UnderlineField } from "./UnderlineField";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "sending" | "success" | "error";

const DEFAULTS: ContactInput = {
  name: "",
  email: "",
  phone: "",
  reason: REASONS[0],
  message: "",
  company: "",
  startedAt: 0,
};

/** Full-screen sky video with the dark "OPEN THE DOOR" contact card on top. */
export function ContactSection() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: DEFAULTS,
    mode: "onTouched",
  });

  // Start the "time to fill" clock when the form first appears.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  // Card fades up once about a quarter of it is on screen; fields follow in a stagger.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: cardRef.current, start: "top 75%", once: true };
      gsap.from(cardRef.current, {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
      gsap.from("[data-contact-field]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.06,
        delay: 0.25,
        ease: "power2.out",
        scrollTrigger: trigger,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error("Request failed");
      setSentTo(data.email);
      setStatus("success");
      reset(DEFAULTS); // "Send another" restarts the fill clock
    } catch {
      setStatus("error");
    }
  };

  const sendAnother = () => {
    setValue("startedAt", Date.now());
    setStatus("idle");
  };

  return (
    <section
      ref={rootRef}
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-[#9fb6d0] py-12 lg:py-[clamp(64px,7vw,112px)]"
    >
      <BackgroundVideo src="/contact/sky.mp4" poster="/contact/sky-poster.webp" />

      <div
        ref={cardRef}
        className="relative z-10 mx-auto w-[calc(100%-16px)] bg-night p-7 text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:w-[calc(100%-32px)] lg:w-[calc(1120*var(--px))] lg:max-w-[calc(100%-32px)] lg:min-w-[860px] lg:p-[clamp(36px,calc(56*var(--px)),72px)]"
      >
        {status === "success" ? (
          <div className="animate-page-enter py-6" role="status">
            <h2
              id="contact-title"
              className="font-display text-[clamp(36px,calc(72*var(--px)),100px)] leading-[0.95] font-medium tracking-[-0.02em] uppercase"
            >
              {CONTACT.thanks}
            </h2>
            <p className="mt-6 text-[clamp(17px,1.5vw,22px)] text-dim">
              Got it — I&apos;ll reply to <span className="text-paper">{sentTo}</span> soon.
            </p>
            <button
              type="button"
              onClick={sendAnother}
              className="mt-10 border-b border-paper/30 pb-0.5 text-[15px] tracking-[0.02em] text-paper transition-colors outline-none hover:border-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              Send another
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-[12px] tracking-[0.08em] text-dim uppercase">{CONTACT.eyebrow}</p>
            <h2
              id="contact-title"
              className="font-display text-[clamp(36px,calc(76*var(--px)),110px)] leading-[0.95] font-medium tracking-[-0.02em] uppercase"
            >
              {CONTACT.headline}
            </h2>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-[14px] gap-y-1 text-[16px] lg:text-[19px]">
              <span className="text-dim">Or just write:</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="border-b border-white/30 pb-0.5 break-all text-paper transition-colors outline-none hover:border-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
              >
                {CONTACT_EMAIL}
              </a>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10">
              {/* Honeypot — invisible to people, tempting to bots. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" tabIndex={-1} autoComplete="off" {...register("company")} />
              </div>

              <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
                <div data-contact-field>
                  <UnderlineField
                    id="contact-name"
                    label="Name"
                    placeholder="Your full name"
                    autoComplete="name"
                    error={errors.name?.message}
                    registration={register("name")}
                  />
                </div>
                <div data-contact-field>
                  <UnderlineField
                    id="contact-email"
                    label="Email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    registration={register("email")}
                  />
                </div>
                <div data-contact-field>
                  <UnderlineField
                    id="contact-phone"
                    label="Phone"
                    type="tel"
                    placeholder="+91"
                    autoComplete="tel"
                    error={errors.phone?.message}
                    registration={register("phone")}
                  />
                </div>
                <div data-contact-field>
                  <Controller
                    control={control}
                    name="reason"
                    render={({ field }) => (
                      <ReasonSelect
                        id="contact-reason"
                        label="Reason"
                        options={REASONS}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                </div>
                <div data-contact-field className="md:col-span-2">
                  <UnderlineField
                    id="contact-message"
                    label="Message"
                    placeholder="A few words"
                    multiline
                    error={errors.message?.message}
                    registration={register("message")}
                  />
                </div>
              </div>

              {status === "error" && (
                <p role="alert" className="mt-8 text-[15px] text-[#e5484d]">
                  Something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}

              <div data-contact-field className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
                <SubmitButton loading={status === "sending"} />
                <p className="text-[14px] tracking-[0.02em] text-dim">{CONTACT.helper}</p>
              </div>

              <p className="mt-5 text-[13px] tracking-[0.02em] text-dim">
                {CONTACT.footnote}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 transition-colors outline-none hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                >
                  privacy policy
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
