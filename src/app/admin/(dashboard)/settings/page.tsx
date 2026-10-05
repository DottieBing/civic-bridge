import { PageHeader } from "@/components/admin/ui";
import SettingsForm from "@/components/admin/SettingsForm";
import { createClient } from "@/lib/supabase/server";
import { SETTING_DEFAULTS, type Settings } from "@/lib/settings";
import TestEmailButton from "@/components/admin/TestEmailButton";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const values: Settings = { ...SETTING_DEFAULTS };
  for (const row of data ?? []) {
    if (row.key in values && row.value !== null) {
      values[row.key as keyof Settings] = row.value;
    }
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <PageHeader
        title="Settings"
        description="Small pieces of text used around the site."
      />
      <SettingsForm values={values} />
      <TestEmailButton />
    </div>
  );
}