import { z } from "zod";

/** Shared by the form (client) and /api/contact (server). */

export const REASONS = ["Freelance project", "Role / Opportunity", "Just saying hi"] as const;
export type Reason = (typeof REASONS)[number];

/** Minimum time between the form appearing and submitting — bots are faster. */
export const MIN_FILL_MS = 3000;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      if (!v) return true; // optional
      if (!/^\+?[\d\s()-]+$/.test(v)) return false;
      const digits = v.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    }, "Use 7–15 digits, optionally starting with +."),
  reason: z.enum(REASONS),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail, please (10+ characters).")
    .max(1500, "Please keep it under 1,500 characters."),
  /** Honeypot: hidden from people, bots fill it in. Must stay empty. */
  company: z.string().optional(), // checked (and silently dropped) in the API route
  /** When the form was first shown (ms since epoch). */
  startedAt: z.number(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
