import "server-only";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export type SendResult = { ok: true } | { ok: false; error: string };

type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail(m: Mail): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.warn("Email is not configured (RESEND_API_KEY / EMAIL_FROM).");
    return { ok: false, error: "Email isn't set up on the server yet." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [m.to],
        subject: oneLine(m.subject),
        html: m.html,
        text: m.text,
        reply_to: m.replyTo,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = typeof body?.message === "string" ? body.message : `Error ${res.status}`;
      console.error("Email failed:", res.status, message);
      return { ok: false, error: message };
    }
    return { ok: true };
  } catch (e) {
    console.error("Email failed:", e);
    return { ok: false, error: "Could not reach the email service." };
  }
}

export function newMessageEmail(m: {
  id: string;
  name: string;
  email: string;
  interest?: string;
  message: string;
}) {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const link = site ? `${site}/admin/messages/${m.id}` : null;

  const text = [
    `${m.name} <${m.email}>`,
    m.interest ? `Interested in: ${m.interest}` : null,
    "",
    m.message,
    link ? `\nOpen in the admin: ${link}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a2c36">
  <p style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#007e78;margin:0 0 8px">New website message</p>
  <h1 style="font-size:22px;margin:0 0 16px">${esc(m.name)}</h1>
  <p style="margin:0 0 4px;font-size:14px"><strong>Email:</strong> <a href="mailto:${esc(m.email)}" style="color:#1a2c36">${esc(m.email)}</a></p>
  ${m.interest ? `<p style="margin:0 0 4px;font-size:14px"><strong>Interested in:</strong> ${esc(m.interest)}</p>` : ""}
  <div style="margin:20px 0;padding:16px;border:1px solid #e3e3e3;border-radius:12px;font-size:15px;line-height:24px">${esc(m.message).replace(/\n/g, "<br>")}</div>
  ${link ? `<p style="margin:24px 0"><a href="${esc(link)}" style="background:#1a2c36;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:bold">Open in the admin</a></p>` : ""}
  <p style="font-size:12px;color:#777">Reply to this email to answer ${esc(m.name)} directly.</p>
</div>`;

  return { subject: `New message from ${oneLine(m.name)}`, text, html };
}