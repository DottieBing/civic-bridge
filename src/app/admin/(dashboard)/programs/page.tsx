import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge, PageHeader } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

export default async function ProgramsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("programs")
    .select("id, slug, title, category, status, cover_image, published, featured, updated_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  const programs = data ?? [];

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Programs"
        description="Everything shown on the Programs page."
        action={{ href: "/admin/programs/new", label: "New program" }}
      />

      {programs.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-black/20 bg-white p-12 text-center text-black/60">
          No programs yet. Click <strong>New program</strong> to add the first one.
        </div>
      ) : (
        <ul className="divide-y divide-black/10 overflow-hidden rounded-[20px] border border-black/10 bg-white">
          {programs.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              {p.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_image} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <div
                  className="size-14 shrink-0 rounded-xl"
                  style={{ backgroundImage: "linear-gradient(135deg,#6fcdcf,#c4fbf9)" }}
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] text-navy">{p.title}</p>
                <p className="text-[13px] text-black/50">
                  {p.category} · {p.status} · updated {formatDate(p.updated_at)}
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {p.featured && <Badge tone="amber">Featured</Badge>}
                <Badge tone={p.published ? "green" : "grey"}>
                  {p.published ? "Published" : "Draft"}
                </Badge>
              </div>
              {p.published && (
                <Link href={`/programs/${p.slug}`} target="_blank" className="text-[14px] text-black/50 hover:text-navy">
                  View ↗
                </Link>
              )}
              <Link href={`/admin/programs/${p.id}`} className="rounded-full border border-navy px-5 py-2 text-[14px] text-navy transition hover:bg-navy hover:text-white">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}