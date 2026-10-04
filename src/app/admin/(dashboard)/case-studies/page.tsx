import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";
import { formatDate } from "@/lib/utils";

export default async function CaseStudiesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("case_studies")
    .select("id, slug, title, cover_image, published, published_on, location")
    .order("published_on", { ascending: false });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Impact stories"
        description="Case studies shown on the Impact page."
        action={{ href: "/admin/case-studies/new", label: "New story" }}
      />
      <AdminList
        empty="No stories yet. Click New story to add the first one."
        rows={(data ?? []).map((r) => ({
          id: r.id,
          title: r.title,
          meta: [r.location, r.published_on ? formatDate(r.published_on) : null]
            .filter(Boolean)
            .join(" · "),
          image: r.cover_image,
          published: r.published,
          viewHref: r.published ? `/impact/${r.slug}` : `/api/preview?path=/impact/${r.slug}`,
          editHref: `/admin/case-studies/${r.id}`,
        }))}
      />
    </div>
  );
}