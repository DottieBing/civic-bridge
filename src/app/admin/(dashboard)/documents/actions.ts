"use server";

import { requireAdmin } from "@/lib/auth";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

export async function saveDocument(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const title = str(formData.get("title"));
  if (!title) return { error: "Title is required." };

  const kind = str(formData.get("kind"));
  if (kind !== "public" && kind !== "annual") {
    return { error: "Choose where this document belongs." };
  }

  const fileUrl = str(formData.get("file_url"));
  if (!fileUrl || !/^https:\/\//.test(fileUrl)) {
    return { error: "Upload the document file first." };
  }

  const size = Number.parseInt(str(formData.get("file_size_bytes")), 10);
  const year = Number.parseInt(str(formData.get("year")), 10);
  const row = {
    title,
    kind,
    file_url: fileUrl,
    file_name: str(formData.get("file_name")) || null,
    file_size_bytes: Number.isFinite(size) && size > 0 ? size : null,
    year: Number.isFinite(year) ? year : null,
    sort_order: Number.parseInt(str(formData.get("sort_order")) || "0", 10) || 0,
    published: formData.get("published") === "on",
  };

  return saveRow("documents", id, row, ["/about", "/impact"], "/admin/documents");
}

export async function deleteDocument(formData: FormData) {
  await requireAdmin();
  await removeRow("documents", str(formData.get("id")), ["/about", "/impact"], "/admin/documents");
}