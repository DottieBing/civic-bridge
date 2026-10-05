"use client";

import { useActionState } from "react";
import { saveSettings } from "@/app/admin/(dashboard)/settings/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import type { Settings } from "@/lib/settings";

export default function SettingsForm({ values }: { values: Settings }) {
  const [state, action, pending] = useActionState(saveSettings, undefined);

  return (
    <form action={action} className="space-y-6">
      <FormError message={state?.error} />

      <Card title="Home page">
        <Field label="Note at the bottom of the hero, line 1">
          <input name="hero_note_1" defaultValue={values.hero_note_1} className={inputClass} />
        </Field>
        <Field label="Note at the bottom of the hero, line 2">
          <input name="hero_note_2" defaultValue={values.hero_note_2} className={inputClass} />
        </Field>
      </Card>

      <Card title="Footer">
        <Field label="About text" hint="shown under the logo">
          <textarea name="footer_about" rows={3} defaultValue={values.footer_about} className={inputClass} />
        </Field>
        <Field label="Copyright line">
          <input name="footer_copyright" defaultValue={values.footer_copyright} className={inputClass} />
        </Field>
      </Card>

      <Card title="Contact">
        <Field label="Contact email" hint="new website messages are emailed here">
          <input name="contact_email" type="email" defaultValue={values.contact_email} className={inputClass} placeholder="hello@example.org" />
        </Field>
      </Card>

      <div className="flex items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="h-[46px] rounded-full bg-navy px-8 text-[15px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save settings"}
        </button>
        {state?.saved && !state.error && (
          <span className="text-[14px] text-teal-label">Saved ✓</span>
        )}
      </div>
    </form>
  );
}