"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";

type Status = "idle" | "loading" | "success" | "error";

const interests = [
  "Volunteering",
  "Partnering with you",
  "Supporting the work",
  "Something else",
];

const field =
  "w-full rounded-[20px] border border-[#c3c3c3] bg-white px-5 py-4 text-[16px] text-black outline-none transition placeholder:text-black/40 focus:border-navy";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      setMessage("Thank you. We'll be in touch soon.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="pb-20 pt-4 lg:pb-[160px] lg:pt-[40px]">
      <Container className="grid gap-12 lg:grid-cols-[1fr_620px] lg:gap-x-[60px]">
        <div>
          <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            Get in touch
          </p>
          <h2 className="mt-[13px] max-w-[480px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
            Tell us how you&apos;d like to help.
          </h2>
          <p className="mt-5 max-w-[460px] text-[18px] leading-[32px] tracking-[0.6px] text-black lg:text-[20px] lg:leading-[37px]">
            Whether you have an hour, a skill, or an institution behind you,
            there is a place for you in this work.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[40px] border border-black/20 bg-white p-6 sm:p-10"
        >
          {/* Honeypot: real visitors never see or fill this */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-[14px] text-navy">
              Name
              <input name="name" required className={`${field} mt-2`} placeholder="Your full name" />
            </label>
            <label className="block text-[14px] text-navy">
              Email
              <input name="email" type="email" required className={`${field} mt-2`} placeholder="you@example.com" />
            </label>
          </div>

          <label className="mt-5 block text-[14px] text-navy">
            I&apos;m interested in
            <select name="interest" className={`${field} mt-2`} defaultValue={interests[0]}>
              {interests.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>

          <label className="mt-5 block text-[14px] text-navy">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className={`${field} mt-2 resize-y`}
              placeholder="A few lines about you and how you'd like to be involved"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex h-[54px] items-center rounded-full bg-navy px-[36px] text-[16px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </button>

          {message && (
            <p
              role="status"
              className={`mt-4 text-[14px] ${
                status === "error" ? "text-red-700" : "text-teal-label"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </Container>
    </section>
  );
}