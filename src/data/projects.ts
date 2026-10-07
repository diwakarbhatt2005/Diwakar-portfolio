/**
 * ✏️ PROJECTS — single source of truth for the homepage "Selected Work" list
 * and the /work/[slug] detail pages. Images live in /public/projects/<slug>/
 * (cover.jpg + 1.jpg, 2.jpg … for the gallery). See public/projects/README.md.
 */

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** Eyebrow / subtitle, e.g. "Automotive Marketplace · Egypt". */
  subtitle: string;
  /** 2–3 line description for the homepage row. */
  short: string;
  role: string;
  /** Shown as TYPE on the detail page. */
  meta: string;
  year: string;
  stack: string[];
  intro: string[];
  contribution: string[];
  stats?: Stat[];
  /** Number of gallery screenshots (1.jpg … n.jpg). */
  gallery: number;
};

export const PROJECTS: Project[] = [
  {
    slug: "network-commerce-platform",
    index: "01",
    title: "Network Commerce Platform",
    subtitle: "Multi-Level Business · Digital Guides",
    short: "A platform for digital guide purchases, network building and online payments.",
    role: "Frontend · Product Development",
    meta: "Payments",
    year: "2025",
    stack: ["React", "Paymob", "REST APIs"],
    intro: [
      "A multi-level network business platform built around digital guide purchases and member-driven networks.",
      "I focused on the React frontend and product experience, creating interfaces that allow members to purchase guides and build their own network.",
      "Paymob was integrated to provide a smooth online payment experience for guide purchases.",
    ],
    contribution: [
      "Built the React frontend",
      "Designed member-facing workflows",
      "Implemented network-building functionality",
      "Integrated Paymob payments",
      "Worked on the overall product experience",
    ],
    gallery: 4,
  },
  {
    slug: "automotive-marketplace",
    index: "02",
    title: "Automotive Marketplace",
    subtitle: "E-Commerce · Egypt",
    short:
      "A full-stack automotive marketplace with 5,000+ product uploads, automated shipping, multi-payment support and live tracking.",
    role: "Full-Stack · Frontend Lead",
    meta: "International Client",
    year: "2026",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Bosta", "Paymob", "CoinPayments"],
    intro: [
      "An automotive marketplace built for the Egyptian market, connecting buyers and sellers through separate, purpose-built portals.",
      "I worked across the frontend and product implementation, building the marketplace experience in Next.js and helping lead a team of 3 frontend developers.",
      "The platform supports 5,000+ product bulk uploads, automated shipping and tracking through Bosta, and payments through Paymob and CoinPayments. It also includes live order tracking and a full Arabic RTL experience.",
    ],
    contribution: [
      "Built buyer and seller interfaces in Next.js",
      "Implemented bulk product catalog uploads",
      "Integrated Bosta shipping and tracking",
      "Integrated Paymob and CoinPayments",
      "Added live order tracking",
      "Implemented Arabic RTL layouts",
      "Guided a team of 3 frontend developers",
    ],
    gallery: 4,
  },
  {
    slug: "ai-medical-practice",
    index: "03",
    title: "AI Medical Practice",
    subtitle: "Healthcare · AI · Automation",
    short:
      "An AI-powered healthcare platform that automates clinical documentation and patient communication.",
    role: "Full-Stack · AI Integration",
    meta: "Healthcare",
    year: "2026",
    stack: ["React", "FastAPI", "PostgreSQL", "AI", "Voice-to-Text", "WhatsApp API"],
    intro: [
      "An AI-powered practice management system designed for clinics to reduce manual documentation and improve patient communication.",
      "I worked on the application using React, FastAPI and PostgreSQL, integrating AI capabilities directly into the clinical workflow.",
      "The system uses voice-to-text and AI to generate SOAP notes with 95% accuracy, reducing documentation time by approximately 70%. It also sends WhatsApp appointment reminders to help patients stay on schedule.",
    ],
    contribution: [
      "Built healthcare application interfaces",
      "Developed FastAPI backend functionality",
      "Integrated voice-to-text",
      "Integrated AI-generated SOAP notes",
      "Implemented WhatsApp appointment reminders",
      "Worked with PostgreSQL",
    ],
    stats: [
      { value: "95%", label: "SOAP note accuracy" },
      { value: "~70%", label: "Less documentation time" },
    ],
    gallery: 4,
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

/** The project after `slug`, wrapping back to the first. */
export function getNextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

export const coverOf = (slug: string) => `/projects/${slug}/cover.jpg`;
export const galleryOf = (slug: string, n: number) => `/projects/${slug}/${n}.jpg`;
