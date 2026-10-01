"use client";

import { useState } from "react";

type Props = { variant?: "light" | "dark"; className?: string };
type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm({
  variant = "light",
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const dark = variant === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      setMessage("Thanks, you're subscribed.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className={`${
          dark
            ? "flex h-[56px] w-full max-w-[439px] items-center rounded-full border border-white/30 bg-white/10 pl-[28px] pr-[7px]"
            : "flex h-[82px] w-full items-center rounded-full border border-[#c3c3c3] pl-6 pr-[10px] sm:pl-[50px]"
        } ${className}`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className={
            dark
              ? "min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/90"
              : "min-w-0 flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-black"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            dark
              ? "h-[41px] w-[137px] shrink-0 rounded-full bg-amber text-[14px] font-bold text-navy transition hover:brightness-95 disabled:opacity-60"
              : "h-[62px] w-[130px] shrink-0 rounded-full bg-amber text-[18px] font-bold text-navy transition hover:brightness-95 disabled:opacity-60 sm:w-[170px] sm:text-[20px]"
          }
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className={`mt-3 text-[13px] ${
            status === "error"
              ? dark ? "text-amber" : "text-red-700"
              : dark ? "text-teal-light" : "text-teal-label"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}