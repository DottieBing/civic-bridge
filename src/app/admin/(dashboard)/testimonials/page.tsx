import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, name, role, quote, photo_url, published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Testimonials"
        description="Quotes shown on the Home page. The first three are displayed."
        action={{ href: "/admin/testimonials/new", label: "New testimonial" }}
      />
      <AdminList
        empty="No testimonials yet. Click New testimonial to add the first one."
        rows={(data ?? []).map((t) => ({
          id: t.id,
          title: t.name,
          meta: t.quote.slice(0, 90),
          image: t.photo_url,
          published: t.published,
          editHref: `/admin/testimonials/${t.id}`,
        }))}
      />
    </div>
  );
}