import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string; saved?: boolean } | undefined;

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

// Replaces a whole editable list: deletes removed rows, updates existing, inserts new
export async function syncRows(
  table: string,
  rows: Record<string, unknown>[],
  paths: string[],
): Promise<FormState> {
  const fail = { error: "Could not save. Please try again." };
  const supabase = await createClient();

  const { data: existing, error: e1 } = await supabase.from(table).select("id");
  if (e1) return fail;

  const keep = new Set(rows.map((r) => r.id).filter(Boolean) as string[]);
  const toDelete = (existing ?? [])
    .map((r) => r.id as string)
    .filter((id) => !keep.has(id));
  if (toDelete.length) {
    const { error } = await supabase.from(table).delete().in("id", toDelete);
    if (error) return fail;
  }

  const updates = rows.filter((r) => r.id);
  const inserts = rows.filter((r) => !r.id).map((r) => {
    const copy = { ...r };
    delete copy.id;
    return copy;
  });

  if (updates.length) {
    const { error } = await supabase.from(table).upsert(updates);
    if (error) return fail;
  }
  if (inserts.length) {
    const { error } = await supabase.from(table).insert(inserts);
    if (error) return fail;
  }

  paths.forEach((p) => revalidatePath(p));
  return { saved: true };
}