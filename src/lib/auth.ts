import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const { data: row } = await supabase
    .from("admin_users")
    .select("role, email")
    .eq("user_id", data.user.id)
    .maybeSingle();

  // Signed in, but not on the admin list
  if (!row) redirect("/admin/login?error=forbidden");

  return {
    user: data.user,
    email: row.email as string,
    role: row.role as "admin" | "editor",
  };
}

export async function getAdminOrNull() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: row } = await supabase
    .from("admin_users")
    .select("role, email")
    .eq("user_id", data.user.id)
    .maybeSingle();

  return row
    ? {
        user: data.user,
        email: row.email as string,
        role: row.role as "admin" | "editor",
      }
    : null;
}