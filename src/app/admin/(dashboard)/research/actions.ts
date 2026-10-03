"use server";

import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { cleanHtml } from "@/lib/sanitize";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

export async function saveResearch(
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
  const file = str(formData.get("file_url"));
  if ((cover && !/^https:\/\//.test(cover)) || (file && !/^https:\/\//.test(file))) {
    return { error: "An uploaded file address is not valid. Upload it again." };
  }

  const pages = Number.parseInt(str(formData.get("pages")), 10);
  const row = {
    title,
    slug,
    type: str(formData.get("type")) || "Policy Brief",
    category: str(formData.get("category")) || null,
    summary: str(formData.get("summary")) || null,
    body: cleanHtml(str(formData.get("body"))) || null,
    cover_image: cover || null,
    file_url: file || null,
    file_name: str(formData.get("file_name")) || null,
    pages: Number.isFinite(pages) && pages > 0 ? pages : null,
    author: str(formData.get("author")) || null,
    published_on:
      str(formData.get("published_on")) || new Date().toISOString().slice(0, 10),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  return saveRow("research", id, row, ["/", "/research", `/research/${slug}`], "/admin/research");
}

export async function deleteResearch(formData: FormData) {
  await requireAdmin();
  await removeRow("research", str(formData.get("id")), ["/", "/research"], "/admin/research");
}