"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { cleanHtml } from "@/lib/sanitize";

export type FormState = { error?: string } | undefined;

const str = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v.trim() : "";

export async function saveProgram(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const title = str(formData.get("title"));
  if (!title) return { error: "Title is required." };

  const slug = slugify(str(formData.get("slug")) || title);
  if (!slug) return { error: "Web address (slug) is required." };

  const cover = str(formData.get("cover_image"));
  if (cover && !/^https:\/\//.test(cover)) {
    return { error: "The cover image address is not valid." };
  }

  const row = {
    title,
    slug,
    summary: str(formData.get("summary")) || null,
    body: cleanHtml(str(formData.get("body"))) || null,
    category: str(formData.get("category")) || "Youth",
    status: str(formData.get("status")) || "Active",
    location: str(formData.get("location")) || null,
    reach: str(formData.get("reach")) || null,
    cover_image: cover || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: Number.parseInt(str(formData.get("sort_order")) || "0", 10) || 0,
  };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("programs").update(row).eq("id", id)
    : await supabase.from("programs").insert(row);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Another program already uses this web address (slug). Change it and try again."
          : "Could not save. Please try again.",
    };
  }

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath(`/programs/${slug}`);
  redirect("/admin/programs");
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("programs").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/programs");
  redirect("/admin/programs");
}