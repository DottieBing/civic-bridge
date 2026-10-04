import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import AdminList from "@/components/admin/AdminList";
import { fileMeta } from "@/lib/utils";

export default async function DocumentsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("documents")
    .select("id, title, kind, file_url, file_name, file_size_bytes, published, year")
    .order("kind", { ascending: true })
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Documents"
        description="Public documents on the About page and annual reports on the Impact page."
        action={{ href: "/admin/documents/new", label: "New document" }}
      />
      <AdminList
        empty="No documents yet. Click New document to upload the first one."
        rows={(data ?? []).map((d) => ({
          id: d.id,
          title: d.title,
          meta: `${d.kind === "annual" ? "Impact: Annual reports" : "About: Public documents"} · ${fileMeta(d.file_name, d.file_size_bytes)}${d.year ? ` · ${d.year}` : ""}`,
          published: d.published,
          viewHref: d.file_url,
          editHref: `/admin/documents/${d.id}`,
        }))}
      />
    </div>
  );
}