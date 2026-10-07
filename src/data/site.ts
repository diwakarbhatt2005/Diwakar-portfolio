/** ✏️ SITE-WIDE CONTACT DETAILS & COPY */

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "diwakarbhatt1983@gmail.com";

export const CONTACT = {
  eyebrow: "(Leave your details)",
  headline: "Open the door",
  helper: "No spam. A real reply, usually the same day.",
  footnote: "Sent details land in my inbox and nowhere else - ",
  thanks: "Thank you.",
};

/** ✏️ FOOTER — social URLs come from .env.local (see .env.example); unset ones are hidden. */
export const FOOTER = {
  wordmark: "DIWAKAR.BHATT",
  tagline: ["Turning complex ideas", "into intelligent products."],
  cta: "Let's build something",
  links: [
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
    { label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href)),
  copyright: "© 2026 Diwakar Bhatt. All rights reserved.",
};
