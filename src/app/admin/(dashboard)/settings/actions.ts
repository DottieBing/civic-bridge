"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SETTING_DEFAULTS, type SettingKey } from "@/lib/settings";
import { str, type FormState } from "@/lib/admin-actions";
import { sendEmail } from "@/lib/email";

export async function saveSettings(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const keys = Object.keys(SETTING_DEFAULTS) as SettingKey[];
  const email = str(formData.get("contact_email"));
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid contact email address." };
  }

  const entries = keys.map((key) => ({
    key,
    value: str(formData.get(key)).slice(0, 500),
    updated_at: new Date().toISOString(),
  }));

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").upsert(entries);
  if (error) return { error: "Could not save. Please try again." };

  revalidatePath("/", "layout");
  return { saved: true };
}

export async function sendTestEmail(): Promise<FormState> {
  await requireAdmin();

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact_email")
    .maybeSingle();
  const to =
    (data?.value as string | null)?.trim() ||
    process.env.CONTACT_NOTIFY_EMAIL?.trim();
  if (!to) return { error: "Save a contact email address first." };

  const res = await sendEmail({
    to,
    subject: "Test email from Civic Bridge Africa",
    text: "If you can read this, new website messages will reach this inbox.",
    html: `<p style="font-family:Arial,sans-serif;font-size:15px;color:#1a2c36">If you can read this, new website messages will reach this inbox.</p>`,
  });
  return res.ok ? { saved: true } : { error: res.error };
}