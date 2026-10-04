import { getAdminOrNull } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// Stops spreadsheet programs running a cell as a formula
const cell = (v: string) => {
  const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await getAdminOrNull())) {
    return new Response("Not authorised", { status: 401 });
  }

  const supabase = await createClient();
  const rows: { email: string; source: string | null; created_at: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from("subscribers")
      .select("email, source, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + 999);
    if (error || !data?.length) break;
    rows.push(...data);
    if (data.length < 1000) break;
  }

  const csv = [
    "email,source,subscribed_at",
    ...rows.map((r) => [cell(r.email), cell(r.source ?? ""), cell(r.created_at)].join(",")),
  ].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}