import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  // Honeypot: pretend success so bots learn nothing
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const interest = str(body.interest);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json(
      { error: "The contact form isn't connected yet." },
      { status: 503 },
    );
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      interest,
      message,
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