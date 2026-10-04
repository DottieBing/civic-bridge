import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { notify } from "@/lib/notify";

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 4)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  // Honeypot: bots fill this hidden field, people never see it
  if (str(body.company, 100)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const interest = str(body.interest, 80);
  const message = str(body.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const { error } = await createAdminClient()
    .from("messages")
    .insert({ name, email, interest: interest || null, message });

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  await notify(process.env.CONTACT_WEBHOOK_URL, {
    name,
    email,
    interest,
    message,
    at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}