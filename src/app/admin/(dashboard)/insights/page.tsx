import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";
import { formatDate } from "@/lib/utils";

export default async function InsightsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("insights")
    .select("id, slug, title, category, cover_image, published, featured, published_on")
    .order("published_on", { ascending: false });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Insights & news"
        description="Articles, analysis and news shown on the Insights page."
        action={{ href: "/admin/insights/new", label: "New article" }}
      />
      <AdminList
        empty="No articles yet. Click New article to write the first one."
        rows={(data ?? []).map((r) => ({
          id: r.id,
          title: r.title,
          meta: `${r.category}${r.published_on ? ` · ${formatDate(r.published_on)}` : ""}`,
          image: r.cover_image,
          published: r.published,
          featured: r.featured,
          viewHref: r.published ? `/insights/${r.slug}` : `/api/preview?path=/insights/${r.slug}`,
          editHref: `/admin/insights/${r.id}`,
        }))}
      />
    </div>
  );
}