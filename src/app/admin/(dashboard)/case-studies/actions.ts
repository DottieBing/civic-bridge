"use server";

import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { cleanHtml } from "@/lib/sanitize";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

export async function saveCaseStudy(
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

  const row = {
    title,
    slug,
    excerpt: str(formData.get("excerpt")) || null,
    body: cleanHtml(str(formData.get("body"))) || null,
    cover_image: cover || null,
    location: str(formData.get("location")) || null,
    published_on:
      str(formData.get("published_on")) || new Date().toISOString().slice(0, 10),
    published: formData.get("published") === "on",
  };

  return saveRow("case_studies", id, row, ["/", "/impact", `/impact/${slug}`], "/admin/case-studies");
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdmin();
  await removeRow("case_studies", str(formData.get("id")), ["/", "/impact"], "/admin/case-studies");
}