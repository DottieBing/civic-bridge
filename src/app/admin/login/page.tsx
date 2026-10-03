"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { login } from "./actions";

function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const forbidden = useSearchParams().get("error") === "forbidden";

  return (
    <form
      action={action}
      className="w-full max-w-[420px] rounded-[28px] border border-black/10 bg-white p-8 shadow-sm"
    >
      <p className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
        Civic Bridge Africa
      </p>
      <h1 className="mt-2 text-[28px] leading-tight text-navy">Admin sign in</h1>

      {forbidden && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
          This account doesn&apos;t have admin access.
        </p>
      )}

      <label className="mt-6 block text-[14px] text-navy">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-[#c3c3c3] px-4 py-3 outline-none focus:border-navy"
        />
      </label>
      <label className="mt-4 block text-[14px] text-navy">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-[#c3c3c3] px-4 py-3 outline-none focus:border-navy"
        />
      </label>

      {state?.error && (
        <p role="alert" className="mt-4 text-[14px] text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 h-[50px] w-full rounded-full bg-navy text-[16px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4fbfb] px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}