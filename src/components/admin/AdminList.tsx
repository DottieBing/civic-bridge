import Link from "next/link";
import { Badge } from "@/components/admin/ui";

export type AdminRow = {
  id: string;
  title: string;
  meta: string;
  image?: string | null;
  published: boolean;
  featured?: boolean;
  viewHref?: string;
  editHref: string;
};

export default function AdminList({
  rows,
  empty,
}: {
  rows: AdminRow[];
  empty: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[20px] border border-dashed border-black/20 bg-white p-12 text-center text-black/60">
        {empty}
      </div>
    );
  }
  return (
    <ul className="divide-y divide-black/10 overflow-hidden rounded-[20px] border border-black/10 bg-white">
      {rows.map((r) => (
        <li key={r.id} className="flex items-center gap-4 p-4">
          {r.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.image} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
          ) : (
            <div
              className="size-14 shrink-0 rounded-xl"
              style={{ backgroundImage: "linear-gradient(135deg,#6fcdcf,#c4fbf9)" }}
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] text-navy">{r.title}</p>
            <p className="truncate text-[13px] text-black/50">
              {r.meta}
              <span className="sm:hidden"> · {r.published ? "Published" : "Draft"}</span>
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {r.featured && <Badge tone="amber">Featured</Badge>}
            <Badge tone={r.published ? "green" : "grey"}>
              {r.published ? "Published" : "Draft"}
            </Badge>
          </div>
          {r.viewHref && (
            <Link href={r.viewHref} target="_blank" className="hidden text-[14px] text-black/50 hover:text-navy sm:block">
              {r.published ? "View ↗" : "Preview ↗"}
            </Link>
          )}
          <Link
            href={r.editHref}
            className="rounded-full border border-navy px-5 py-2 text-[14px] text-navy transition hover:bg-navy hover:text-white"
          >
            Edit
          </Link>
        </li>
      ))}
    </ul>
  );
}