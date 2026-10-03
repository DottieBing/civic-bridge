import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";

const GRADIENT = "linear-gradient(135deg, #6fcdcf 0%, #c4fbf9 100%)";

export default function CaseStudyCard({ s }: { s: CaseStudy }) {
  return (
    <Link
      href={`/impact/${s.slug}`}
      className="group flex w-full max-w-[407px] flex-col overflow-hidden rounded-[44px] border border-black/20 bg-white"
    >
      <div className="relative h-[290px] shrink-0" style={{ backgroundImage: GRADIENT }}>
        {s.cover_image && (
          <Image
            src={s.cover_image}
            alt=""
            fill
            sizes="(min-width: 1024px) 407px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-h-[276px] flex-col px-[34px] pb-[48px] pt-[34px]">
        <p className="text-[10.4px] font-medium uppercase leading-[14px] tracking-[1.2px] text-teal-label">
          Case study
        </p>
        <h3 className="mt-[7px] text-[22px] font-medium leading-[28px] text-black transition group-hover:text-teal">
          {s.title}
        </h3>
        {s.excerpt && (
          <p className="mt-3 max-w-[340px] text-[14.5px] leading-[29px] tracking-[0.2px] text-black">
            {s.excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex w-fit items-center gap-[7px] pt-3 text-[16px] font-bold leading-[24px] text-navy">
          Read case study
          <ArrowRight size={14} strokeWidth={1.75} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}