import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Program } from "@/lib/types";

const GRADIENT = "linear-gradient(135deg, #6fcdcf 0%, #c4fbf9 100%)";

export default function ProgramCard({ p }: { p: Program }) {
  const active = p.status === "Active";
  return (
    <Link
      href={`/programs/${p.slug}`}
      className="group flex w-full max-w-[407px] flex-col overflow-hidden rounded-[55px] border border-black/60 bg-white"
    >
      <div className="relative h-[343px]" style={{ backgroundImage: GRADIENT }}>
        {p.cover_image && (
          <Image
            src={p.cover_image}
            alt=""
            fill
            sizes="(min-width: 1024px) 407px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-[36px] top-[46px] rounded-full bg-white px-[24px] py-[9px] text-[12px] font-medium uppercase leading-[20px] tracking-[0.6px] text-black">
          {p.category}
        </span>
        <span
          className={`absolute right-[33px] top-[46px] rounded-full px-[22px] py-[9px] text-[12px] font-medium leading-[20px] ${
            active ? "bg-amber text-navy" : "bg-navy text-white"
          }`}
        >
          {p.status}
        </span>
      </div>

      <div className="flex min-h-[327px] flex-col px-[36px] pt-[40px]">
        <h3 className="text-[20px] font-medium leading-[27px] text-black transition group-hover:text-teal">
          {p.title}
        </h3>
        {p.summary && (
          <p className="mt-3 max-w-[300px] text-[14px] leading-[28px] tracking-[0.3px] text-black">
            {p.summary}
          </p>
        )}

        {(p.location || p.reach) && (
          <div className="mt-[34px] flex items-center justify-between gap-3 border-t border-black/15 pt-[14px] text-[10px] font-medium uppercase leading-[24px] tracking-[1px]">
            {p.location ? (
              <span className="inline-flex items-center gap-[6px] text-black/70">
                <MapPin size={14} strokeWidth={1.5} />
                {p.location}
              </span>
            ) : (
              <span />
            )}
            {p.reach && <span className="text-teal-label">{p.reach}</span>}
          </div>
        )}

        <span className="mb-[42px] mt-auto inline-flex w-fit items-center gap-[7px] pt-[18px] text-[14px] font-bold leading-[30px] text-navy">
          View program
          <ArrowRight size={14} strokeWidth={1.75} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}