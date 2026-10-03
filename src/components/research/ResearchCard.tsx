import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { formatMonthYear } from "@/lib/utils";
import type { Research } from "@/lib/types";

const GRADIENT = "linear-gradient(135deg, #6fcdcf 0%, #c4fbf9 100%)";

export default function ResearchCard({ r }: { r: Research }) {
  return (
    <Link
      href={`/research/${r.slug}`}
      className="group flex w-full max-w-[407px] flex-col overflow-hidden rounded-[55px] border border-black/20 bg-white"
    >
      <div className="relative h-[290px] shrink-0" style={{ backgroundImage: GRADIENT }}>
        {r.cover_image && (
          <Image
            src={r.cover_image}
            alt=""
            fill
            sizes="(min-width: 1024px) 407px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-[33px] top-[29px] grid h-[33px] place-items-center rounded-full bg-white px-[16px] text-[14px] leading-none text-black">
          {r.type}
        </span>
      </div>
      <div className="flex min-h-[276px] flex-1 flex-col px-[35px] pb-[48px] pt-[40px]">
        <h3 className="text-[22px] font-medium leading-[28px] text-black transition group-hover:text-teal">
          {r.title}
        </h3>
        {r.summary && (
          <p className="mt-[6px] max-w-[330px] text-[14.5px] leading-[29px] tracking-[0.2px] text-black">
            {r.summary}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-[14px] text-[10px] uppercase leading-[14px] tracking-[1px]">
          <span className="text-[#4d4d4d]">
            {r.published_on ? formatMonthYear(r.published_on) : ""}
          </span>
          {r.pages ? (
            <span className="inline-flex items-center gap-[5px] text-teal-label">
              <Download size={12} strokeWidth={1.75} />
              {r.pages}p
            </span>
          ) : (
            <span />
          )}
        </div>
      </div>
    </Link>
  );
}