import { Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";
import { deleteSubscriber } from "./actions";

export default async function SubscribersPage() {
  const supabase = await createClient();
  const [{ count }, { data }] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase
      .from("subscribers")
      .select("id, email, source, created_at")
      .order("created_at", { ascending: false })
      .limit(500),
  ]);
  const rows = data ?? [];
  const total = count ?? 0;

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] leading-tight text-navy">Subscribers</h1>
          <p className="mt-1 text-[16px] text-black/60">
            {total} {total === 1 ? "person has" : "people have"} joined the newsletter.
          </p>
        </div>
        <a
          href="/admin/subscribers/export"
          className="inline-flex h-[46px] items-center gap-2 rounded-full bg-navy px-6 text-[15px] font-bold text-white transition hover:opacity-90"
        >
          <Download size={16} />
          Export CSV
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-black/20 bg-white p-12 text-center text-black/60">
          No subscribers yet.
        </div>
      ) : (
        <>
          <ul className="divide-y divide-black/10 overflow-hidden rounded-[20px] border border-black/10 bg-white">
            {rows.map((s) => (
              <li key={s.id} className="flex items-center gap-4 px-5 py-4">
                <p className="min-w-0 flex-1 truncate text-[15px] text-navy">{s.email}</p>
                <span className="text-[13px] text-black/50">{formatDate(s.created_at)}</span>
                <DeleteButton action={deleteSubscriber} id={s.id} label="Remove" />
              </li>
            ))}
          </ul>
          {total > rows.length && (
            <p className="mt-4 text-[13px] text-black/50">
              Showing the latest {rows.length}. The CSV export includes everyone.
            </p>
          )}
        </>
      )}
    </div>
  );
}