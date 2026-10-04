"use server";

import { requireAdmin } from "@/lib/auth";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

export async function saveTestimonial(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const quote = str(formData.get("quote"));
  const name = str(formData.get("name"));
  if (!quote) return { error: "The quote is required." };
  if (!name) return { error: "Name is required." };

  const photo = str(formData.get("photo_url"));
  if (photo && !/^https:\/\//.test(photo)) {
    return { error: "The photo address is not valid. Upload it again." };
  }

  const row = {
    quote: quote.slice(0, 400),
    name,
    role: str(formData.get("role")) || null,
    photo_url: photo || null,
    sort_order: Number.parseInt(str(formData.get("sort_order")) || "0", 10) || 0,
    published: formData.get("published") === "on",
  };

  return saveRow("testimonials", id, row, ["/"], "/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await removeRow("testimonials", str(formData.get("id")), ["/"], "/admin/testimonials");
}