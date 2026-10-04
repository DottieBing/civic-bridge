import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";

export default async function TeamAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("id, name, role, photo_url, published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Team"
        description="People shown on the About page. The first four fill the photo tiles."
        action={{ href: "/admin/team/new", label: "Add person" }}
      />
      <AdminList
        empty="No team members yet. Click Add person to add the first one."
        rows={(data ?? []).map((m) => ({
          id: m.id,
          title: m.name,
          meta: m.role ?? "",
          image: m.photo_url,
          published: m.published,
          editHref: `/admin/team/${m.id}`,
        }))}
      />
    </div>
  );
}