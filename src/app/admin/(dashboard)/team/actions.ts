"use server";

import { requireAdmin } from "@/lib/auth";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

export async function saveTeamMember(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const name = str(formData.get("name"));
  if (!name) return { error: "Name is required." };

  const photo = str(formData.get("photo_url"));
  if (photo && !/^https:\/\//.test(photo)) {
    return { error: "The photo address is not valid. Upload it again." };
  }

  const row = {
    name,
    role: str(formData.get("role")) || null,
    bio: str(formData.get("bio")) || null,
    photo_url: photo || null,
    sort_order: Number.parseInt(str(formData.get("sort_order")) || "0", 10) || 0,
    published: formData.get("published") === "on",
  };

  return saveRow("team_members", id, row, ["/about"], "/admin/team");
}

export async function deleteTeamMember(formData: FormData) {
  await requireAdmin();
  await removeRow("team_members", str(formData.get("id")), ["/about"], "/admin/team");
}