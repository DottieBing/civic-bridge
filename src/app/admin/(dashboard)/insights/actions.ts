"use server";

import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { cleanHtml } from "@/lib/sanitize";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

export async function saveInsight(
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
    return { error: "The cover image address is not valid. Upload it again." };
  }

  const mins = Number.parseInt(str(formData.get("read_minutes")), 10);
  const row = {
    title,
    slug,
    category: str(formData.get("category")) || "Analysis",
    excerpt: str(formData.get("excerpt")) || null,
    body: cleanHtml(str(formData.get("body"))) || null,
    cover_image: cover || null,
    author: str(formData.get("author")) || null,
    source_label: str(formData.get("source_label")) || null,
    read_minutes: Number.isFinite(mins) && mins > 0 ? mins : null,
    published_on:
      str(formData.get("published_on")) || new Date().toISOString().slice(0, 10),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  return saveRow("insights", id, row, ["/", "/insights", `/insights/${slug}`], "/admin/insights");
}

export async function deleteInsight(formData: FormData) {
  await requireAdmin();
  await removeRow("insights", str(formData.get("id")), ["/", "/insights"], "/admin/insights");
}