import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy — Diwakar Bhatt",
  description: "How the contact form on this site handles your details.",
};

// ✏️ Plain-language privacy note for the contact form. Adjust if you start
// storing submissions anywhere else (e.g. a Google Sheet or database).
export default function PrivacyPage() {
  return (
    <main className="min-h-svh bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 md:px-[5.3vw]">
        <div className="pt-6 text-[14px] md:pt-9">
          <Link href="/#contact" className="group inline-flex items-center gap-2">
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back
          </Link>
        </div>

        <div className="max-w-[760px] pt-[clamp(64px,10vw,140px)] pb-[clamp(96px,10vw,160px)]">
          <h1 className="font-display text-[clamp(44px,5.4vw,78px)] leading-none font-medium tracking-[-0.02em]">
            Privacy
          </h1>

          <div className="mt-12 space-y-6 text-[18px] leading-[1.6] text-ink/85">
            <p>
              When you send the contact form, I receive your name, email, phone number (if you add one), the
              reason you picked and your message.
            </p>
            <p>
              They are sent straight to my inbox by email (delivered through Resend) so I can reply to you.
              They aren&apos;t sold, shared, added to a mailing list or used for anything else.
            </p>
            <p>
              Want something you sent deleted? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>{" "}
              and I&apos;ll remove it.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
