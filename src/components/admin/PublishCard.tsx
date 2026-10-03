import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/admin/ui";

export default function PublishCard({
  published,
  featured,
  showFeatured = true,
  featuredHint = "Shown first on its page.",
  pending,
  cancelHref,
  children,
}: {
  published?: boolean;
  featured?: boolean;
  showFeatured?: boolean;
  featuredHint?: string;
  pending: boolean;
  cancelHref: string;
  children?: ReactNode;
}) {
  return (
    <Card title="Publish">
      <label className="flex items-start gap-3 text-[15px] text-navy">
        <input type="checkbox" name="published" defaultChecked={published ?? false} className="mt-1 size-4 accent-[#1a2c36]" />
        <span>
          Published
          <span className="block text-[13px] text-black/50">
            Untick to keep it as a draft, hidden from the website.
          </span>
        </span>
      </label>
      {showFeatured && (
        <label className="flex items-start gap-3 text-[15px] text-navy">
          <input type="checkbox" name="featured" defaultChecked={featured ?? false} className="mt-1 size-4 accent-[#1a2c36]" />
          <span>
            Featured
            <span className="block text-[13px] text-black/50">{featuredHint}</span>
          </span>
        </label>
      )}
      {children}
      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="h-[46px] rounded-full bg-navy px-8 text-[15px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <Link href={cancelHref} className="text-[14px] text-black/60 underline underline-offset-2">
          Cancel
        </Link>
      </div>
    </Card>
  );
}