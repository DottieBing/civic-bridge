import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string } | undefined;

export const str = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v.trim() : "";

export async function saveRow(
  table: string,
  id: string,
  row: Record<string, unknown>,
  paths: string[],
  backTo: string,
): Promise<FormState> {
  const supabase = await createClient();
  const { error } = id
    ? await supabase.from(table).update(row).eq("id", id)
    : await supabase.from(table).insert(row);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Another item already uses this web address (slug). Change it and try again."
          : "Could not save. Please try again.",
    };
  }
  paths.forEach((p) => revalidatePath(p));
  redirect(backTo);
}

export async function removeRow(
  table: string,
  id: string,
  paths: string[],
  backTo: string,
) {
  if (!id) return;
  const supabase = await createClient();
  await supabase.from(table).delete().eq("id", id);
  paths.forEach((p) => revalidatePath(p));
  redirect(backTo);
}