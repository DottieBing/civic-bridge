"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { SETTING_DEFAULTS, type SettingKey } from "@/lib/settings";
import { str, type FormState } from "@/lib/admin-actions";

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