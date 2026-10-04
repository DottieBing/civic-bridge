import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge, PageHeader } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

const TABS = [
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "archived", label: "Archived" },
  { key: "all", label: "All" },
];

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: raw } = await searchParams;
  const status = TABS.some((t) => t.key === raw) ? (raw as string) : "new";

  const supabase = await createClient();
  let query = supabase
    .from("messages")
    .select("id, name, email, interest, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status !== "all") query = query.eq("status", status);
  const { data } = await query;
  const messages = data ?? [];

  return (
    <div className="mx-auto max-w-[1000px]">
      <PageHeader
        title="Messages"
        description="Messages sent through the Get involved form."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/messages?status=${t.key}`}
            className={`rounded-full border px-5 py-2 text-[14px] transition ${
              status === t.key
                ? "border-navy bg-navy text-white"
                : "border-[#c3c3c3] text-navy hover:border-navy"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {messages.length === 0 ? (
        <div className="rounded-[20px] border border-dashed border-black/20 bg-white p-12 text-center text-black/60">
          Nothing here.
        </div>
      ) : (
        <ul className="divide-y divide-black/10 overflow-hidden rounded-[20px] border border-black/10 bg-white">
          {messages.map((m) => (
            <li key={m.id}>
              <Link
                href={`/admin/messages/${m.id}`}
                className="flex items-center gap-4 p-5 transition hover:bg-[#f4fbfb]"
              >
                <span
                  className={`size-2.5 shrink-0 rounded-full ${
                    m.status === "new" ? "bg-amber" : "bg-transparent"
                  }`}
                  aria-label={m.status === "new" ? "Unread" : undefined}
                />
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-[16px] text-navy ${m.status === "new" ? "font-medium" : ""}`}>
                    {m.name}
                    <span className="ml-2 text-[13px] font-normal text-black/50">{m.email}</span>
                  </p>
                  <p className="truncate text-[14px] text-black/60">{m.message}</p>
                </div>
                {m.interest && (
                  <span className="hidden sm:block">
                    <Badge tone="grey">{m.interest}</Badge>
                  </span>
                )}
                <span className="shrink-0 text-[13px] text-black/50">{formatDate(m.created_at)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}