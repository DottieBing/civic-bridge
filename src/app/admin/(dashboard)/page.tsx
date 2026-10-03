import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const sections = [
  { table: "programs", label: "Programs", href: "/admin/programs" },
  { table: "research", label: "Research", href: "/admin/research" },
  { table: "insights", label: "Insights & news", href: "/admin/insights" },
  { table: "events", label: "Events", href: "/admin/events" },
  { table: "case_studies", label: "Impact stories", href: "/admin/case-studies" },
  { table: "documents", label: "Documents", href: "/admin/documents" },
  { table: "team_members", label: "Team", href: "/admin/team" },
  { table: "testimonials", label: "Testimonials", href: "/admin/testimonials" },
];

export default async function AdminHome() {
  const supabase = await createClient();

  const rows = await Promise.all(
    sections.map(async (s) => {
      const [all, live] = await Promise.all([
        supabase.from(s.table).select("id", { count: "exact", head: true }),
        supabase
          .from(s.table)
          .select("id", { count: "exact", head: true })
          .eq("published", true),
      ]);
      const total = all.count ?? 0;
      const published = live.count ?? 0;
      return { ...s, total, published, drafts: total - published };
    }),
  );

  const [{ count: unread }, { count: subs }] = await Promise.all([
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div className="mx-auto max-w-[1100px]">
      <h1 className="text-[32px] leading-tight text-navy">Dashboard</h1>
      <p className="mt-1 text-[16px] text-black/60">
        What&apos;s on the website, and what needs your attention.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/messages"
          className="rounded-[20px] border border-black/10 bg-white p-6 transition hover:border-navy"
        >
          <p className="text-[13px] uppercase tracking-[1.5px] text-teal-label">
            New messages
          </p>
          <p className="mt-2 text-[40px] font-medium leading-none text-navy">
            {unread ?? 0}
          </p>
        </Link>
        <Link
          href="/admin/subscribers"
          className="rounded-[20px] border border-black/10 bg-white p-6 transition hover:border-navy"
        >
          <p className="text-[13px] uppercase tracking-[1.5px] text-teal-label">
            Newsletter subscribers
          </p>
          <p className="mt-2 text-[40px] font-medium leading-none text-navy">
            {subs ?? 0}
          </p>
        </Link>
      </div>

      <h2 className="mt-10 text-[20px] text-navy">Content</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <Link
            key={r.table}
            href={r.href}
            className="rounded-[20px] border border-black/10 bg-white p-6 transition hover:border-navy"
          >
            <p className="text-[15px] text-navy">{r.label}</p>
            <p className="mt-2 text-[36px] font-medium leading-none text-navy">
              {r.total}
            </p>
            <p className="mt-2 text-[13px] text-black/60">
              {r.published} published · {r.drafts} draft
              {r.drafts === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}