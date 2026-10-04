"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const STATUSES = ["new", "read", "archived"];

export async function markMessageRead(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("messages").update({ status: "read" }).eq("id", id).eq("status", "new");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function setMessageStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status)) return;

  const supabase = await createClient();
  await supabase.from("messages").update({ status }).eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  redirect("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  redirect("/admin/messages");
}