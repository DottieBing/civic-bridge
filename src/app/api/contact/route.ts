import { NextResponse, after } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { notify } from "@/lib/notify";
import { newMessageEmail, sendEmail } from "@/lib/email";

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

  const db = createAdminClient();
  const { data: saved, error } = await db
    .from("messages")
    .insert({ name, email, interest: interest || null, message })
    .select("id")
    .single();

  if (error || !saved) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Runs after the visitor already got their answer
  after(async () => {
    await notify(process.env.CONTACT_WEBHOOK_URL, {
      name,
      email,
      interest,
      message,
      at: new Date().toISOString(),
    });

    const { data: setting } = await db
      .from("site_settings")
      .select("value")
      .eq("key", "contact_email")
      .maybeSingle();
    const to =
      (setting?.value as string | null)?.trim() ||
      process.env.CONTACT_NOTIFY_EMAIL?.trim();
    if (!to) return;

    await sendEmail({
      to,
      replyTo: email,
      ...newMessageEmail({ id: saved.id, name, email, interest, message }),
    });
  });

  return NextResponse.json({ ok: true });
}