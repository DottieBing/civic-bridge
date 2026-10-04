import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { notify } from "@/lib/notify";

export async function POST(req: Request) {
  if (!rateLimit(`subscribe:${clientIp(req)}`, 5)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { error } = await createAdminClient()
    .from("subscribers")
    .upsert({ email, source: "website" }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  await notify(process.env.NEWSLETTER_WEBHOOK_URL, {
    email,
    source: "website",
    at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}