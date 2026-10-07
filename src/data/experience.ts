/**
 * ✏️ EXPERIENCE — one entry per role, newest first. Add another object to
 * the array and it appears as "02", "03"… automatically.
 */

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  contributions: string[];
  impact: { value: string; label: string }[];
  stack: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer · AI Solutions",
    company: "Kuberya AI Tech Private Limited",
    location: "Jabalpur, India",
    period: "Sep 2025 — Sep 2026",
    summary:
      "Built and shipped AI-powered and full-stack web products across healthcare, e-commerce, EdTech and hospitality, working with clients across India, Germany, Egypt and the UAE.",
    contributions: [
      "Built and contributed to 10+ AI-powered products across multiple industries.",
      "Led frontend development for a multi-level commerce platform and an automotive marketplace, while coordinating a team of 3 frontend developers.",
      "Developed modern, responsive interfaces using React.js, Next.js and Tailwind CSS.",
      "Built backend services and APIs using Python, FastAPI, PostgreSQL and REST APIs.",
      "Integrated Paymob, Bosta, CoinPayments and WhatsApp Business API into production platforms.",
      "Implemented real-time data updates using WebSocket.",
      "Automated shipping workflows with Bosta, reducing manual dispatch work by 60%.",
      "Deployed and managed applications using Docker and AWS.",
      "Collaborated directly with international clients and translated business requirements into production-ready features.",
    ],
    impact: [
      { value: "10+", label: "Products Built" },
      { value: "3", label: "Frontend Developers Led" },
      { value: "60%", label: "Less Manual Dispatch Work" },
      { value: "4", label: "International Markets Served" },
    ],
    stack: [
      "React.js",
      "Next.js",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "LLMs",
      "REST APIs",
      "WebSocket",
    ],
  },
];
