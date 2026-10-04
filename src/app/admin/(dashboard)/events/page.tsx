import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";
import { eventWhen, isUpcoming } from "@/lib/utils";

export default async function EventsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("id, slug, title, cover_image, published, featured, starts_at, ends_at, location")
    .order("starts_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Events"
        description="Everything shown on the Events page. Upcoming and past are worked out from the date."
        action={{ href: "/admin/events/new", label: "New event" }}
      />
      <AdminList
        empty="No events yet. Click New event to add the first one."
        rows={(data ?? []).map((e) => ({
          id: e.id,
          title: e.title,
          meta: `${isUpcoming(e) ? "Upcoming" : "Past"} · ${eventWhen(e.starts_at).date}${e.location ? ` · ${e.location}` : ""}`,
          image: e.cover_image,
          published: e.published,
          featured: e.featured,
          viewHref: e.published ? `/events/${e.slug}` : `/api/preview?path=/events/${e.slug}`,
          editHref: `/admin/events/${e.id}`,
        }))}
      />
    </div>
  );
}