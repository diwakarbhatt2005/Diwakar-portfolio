import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/data/site";
import { MIN_FILL_MS, contactSchema, type ContactData } from "@/lib/contactSchema";

// ── Rate limit: 5 submissions per hour per IP ────────────────────────────────
// In-memory, so it resets on redeploy and is per-instance on serverless hosts.
// For a shared limit across instances, swap this for Upstash Redis.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json({ ok: false, error: "Too many messages — please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
  }
  const data = parsed.data;

  // Spam checks: honeypot filled, or submitted faster than a person could.
  // Pretend success so bots don't learn anything.
  if (data.company || Date.now() - data.startedAt < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without a key: log instead of sending.
      console.info("[contact] RESEND_API_KEY not set — submission (not emailed):", data);
      return Response.json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY is missing.");
    return Response.json({ ok: false, error: "Email is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: `New inquiry: ${data.reason} — ${data.name}`,
    text: formatEmail(data),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return Response.json({ ok: false, error: "Could not send right now." }, { status: 502 });
  }

  // TODO: optionally also store the submission (Google Sheet / Supabase) here.

  return Response.json({ ok: true });
}

function formatEmail(data: ContactData) {
  return [
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone || "—"}`,
    `Reason:  ${data.reason}`,
    "",
    data.message,
  ].join("\n");
}
