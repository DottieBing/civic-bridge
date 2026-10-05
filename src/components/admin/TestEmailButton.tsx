"use client";

import { useActionState } from "react";
import { sendTestEmail } from "@/app/admin/(dashboard)/settings/actions";
import type { FormState } from "@/lib/admin-actions";

export default function TestEmailButton() {
  const [state, action, pending] = useActionState(
    async (_prev: FormState) => sendTestEmail(),
    undefined,
  );

  return (
    <form action={action} className="mt-8 border-t border-black/10 pt-6">
      <p className="text-[14px] text-black/60">
        Save your contact email above, then send yourself a test to check that
        messages will arrive.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="h-[46px] rounded-full border border-navy px-6 text-[15px] text-navy transition hover:bg-navy hover:text-white disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send a test email"}
        </button>
        {state?.saved && !state.error && (
          <span className="text-[14px] text-teal-label">Sent ✓ Check your inbox (and spam).</span>
        )}
        {state?.error && <span className="text-[14px] text-red-700">{state.error}</span>}
      </div>
    </form>
  );
}