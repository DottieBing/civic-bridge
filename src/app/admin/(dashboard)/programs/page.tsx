import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";

export default async function ProgramsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("programs")
    .select("id, slug, title, category, status, cover_image, published, featured")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Programs"
        description="Everything shown on the Programs page."
        action={{ href: "/admin/programs/new", label: "New program" }}
      />
      <AdminList
        empty="No programs yet. Click New program to add the first one."
        rows={(data ?? []).map((p) => ({
          id: p.id,
          title: p.title,
          meta: `${p.category} · ${p.status}`,
          image: p.cover_image,
          published: p.published,
          featured: p.featured,
          viewHref: p.published ? `/programs/${p.slug}` : `/api/preview?path=/programs/${p.slug}`,
          editHref: `/admin/programs/${p.id}`,
        }))}
      />
    </div>
  );
}