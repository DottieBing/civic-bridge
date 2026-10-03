import Image from "next/image";
import Link from "next/link";
import { formatMonthYear } from "@/lib/utils";
import type { Insight } from "@/lib/types";

const GRADIENT = "linear-gradient(135deg, #aee6e6 0%, #e2f3f2 100%)";

export function insightMeta(p: Insight) {
  return [
    p.source_label,
    p.published_on ? formatMonthYear(p.published_on) : null,
    p.read_minutes ? `${p.read_minutes} min` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function InsightCard({ p }: { p: Insight }) {
  return (
    <Link href={`/insights/${p.slug}`} className="group block w-full max-w-[407px]">
      <div className="relative h-[290px] overflow-hidden rounded-[44px]" style={{ backgroundImage: GRADIENT }}>
        {p.cover_image && (
          <Image
            src={p.cover_image}
            alt=""
            fill
            sizes="(min-width: 1024px) 407px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="min-h-[243px] pb-[38px] pt-[21px]">
        <p className="text-[12px] font-medium uppercase leading-[14px] tracking-[1.5px] text-teal-light">
          {p.category}
        </p>
        <h3 className="mt-[15px] max-w-[407px] text-[22px] font-medium leading-[28px] text-black transition group-hover:text-teal">
          {p.title}
        </h3>
        {p.excerpt && (
          <p className="mt-[11px] max-w-[330px] text-[14.5px] leading-[29px] tracking-[0.2px] text-black">
            {p.excerpt}
          </p>
        )}
        <p className="mt-4 text-[10px] font-medium uppercase leading-[14px] tracking-[1px] text-[#4d4d4d]">
          {insightMeta(p)}
        </p>
      </div>
    </Link>
  );
}