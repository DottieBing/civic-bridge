import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json(
      { error: "Subscriptions aren't connected yet." },
      { status: 503 },
    );
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      source: "website",
      at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}