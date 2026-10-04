import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";
import { formatDate } from "@/lib/utils";

export default async function ResearchAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("research")
    .select("id, slug, title, type, cover_image, published, featured, published_on")
    .order("published_on", { ascending: false });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Research"
        description="Reports, policy briefs and explainers shown on the Research page."
        action={{ href: "/admin/research/new", label: "New report" }}
      />
      <AdminList
        empty="No research yet. Click New report to add the first one."
        rows={(data ?? []).map((r) => ({
          id: r.id,
          title: r.title,
          meta: `${r.type}${r.published_on ? ` · ${formatDate(r.published_on)}` : ""}`,
          image: r.cover_image,
          published: r.published,
          featured: r.featured,
          viewHref: r.published ? `/research/${r.slug}` : `/api/preview?path=/research/${r.slug}`,
          editHref: `/admin/research/${r.id}`,
        }))}
      />
    </div>
  );
}