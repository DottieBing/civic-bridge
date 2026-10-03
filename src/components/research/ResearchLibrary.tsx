"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";
import ResearchCard from "@/components/research/ResearchCard";
import { PROGRAM_CATEGORIES } from "@/lib/constants";
import { formatMonthYear } from "@/lib/utils";
import type { Research } from "@/lib/types";

const FEATURED_GRADIENT =
  "linear-gradient(135deg, #1a2c36 8%, #5f8a90 55%, #bdf7f5 100%)";
const categories = ["All programs", ...PROGRAM_CATEGORIES];
const PAGE_SIZE = 6;

export default function ResearchLibrary({ reports }: { reports: Research[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All programs");
  const [page, setPage] = useState(1);

  const featured = reports.find((r) => r.featured) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (r) =>
        r.id !== featured?.id &&
        (active === "All programs" || r.category === active) &&
        (!q || `${r.title} ${r.summary ?? ""}`.toLowerCase().includes(q)),
    );
  }, [reports, featured, query, active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const filtering = Boolean(query.trim()) || active !== "All programs";

  const featuredMeta = [
    featured?.author,
    featured?.published_on ? formatMonthYear(featured.published_on) : null,
    featured?.pages ? `${featured.pages} pages` : null,
  ]
    .filter(Boolean)
    .join("·");

  return (
    <>
      <div className="px-6 pt-10 lg:px-8 lg:pt-[68px]">
        <div className="mx-auto w-full max-w-[1364px] px-0">
          <div className="pb-10 lg:pb-[68px]">
            <div className="flex h-[66px] items-center rounded-full border border-[#c3c3c3] bg-white pl-6 pr-[10px] lg:pl-[71px]">
              <Search size={24} strokeWidth={1.5} className="shrink-0 text-black" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search reports, topics, authors, or keywords"
                aria-label="Search research"
                className="ml-3 min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-black/40 lg:ml-[31px]"
              />
              <span className="grid h-[52px] w-[110px] shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold text-white lg:w-[137px]">
                Search
              </span>
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        options={categories}
        value={active}
        onChange={(v) => {
          setActive(v);
          setPage(1);
        }}
        className="pb-10 lg:pb-[68px]"
      />

      <section className="pb-16 pt-12 lg:pb-[188px] lg:pt-[93px]">
        <Container>
          {featured && (
            <Link
              href={`/research/${featured.slug}`}
              className="group grid overflow-hidden rounded-[40px] border border-black/20 lg:h-[344px] lg:grid-cols-[660px_1fr] lg:rounded-[48px]"
            >
              <div
                className="relative h-[240px] lg:h-full"
                style={{ backgroundImage: FEATURED_GRADIENT }}
              >
                {featured.cover_image && (
                  <Image
                    src={featured.cover_image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 660px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center px-8 py-10 lg:px-[59px] lg:py-0">
                <p className="text-[12px] font-medium uppercase leading-[14px] tracking-[1.68px] text-teal-light">
                  Featured · {featured.type}
                </p>
                <h2 className="mt-5 max-w-[540px] text-[30px] font-medium leading-[1.1] tracking-[-0.42px] text-black transition group-hover:text-teal lg:text-[42px] lg:leading-[47px]">
                  {featured.title}
                </h2>
                {featured.summary && (
                  <p className="mt-[22px] max-w-[420px] text-[16px] leading-[30px] tracking-[0.5px] text-black lg:text-[17px] lg:leading-[35px]">
                    {featured.summary}
                  </p>
                )}
                {featuredMeta && (
                  <p className="mt-[22px] text-[11px] font-medium uppercase leading-[14px] tracking-[1.2px] text-[#4d4d4d] lg:text-[12px]">
                    {featuredMeta}
                  </p>
                )}
              </div>
            </Link>
          )}

          <div
            className={`grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[39px] ${
              featured ? "mt-16 lg:mt-[128px]" : ""
            }`}
          >
            {visible.length === 0 && (filtering || reports.length === 0) && (
              <p className="text-[18px] text-black md:col-span-2 lg:col-span-3">
                {reports.length === 0
                  ? "Research will appear here soon."
                  : "No reports match your search yet."}
              </p>
            )}
            {visible.map((r) => (
              <ResearchCard key={r.id} r={r} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-16 flex flex-wrap justify-center gap-3 lg:mt-[118px]">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={current === n ? "page" : undefined}
                  className={`grid size-[54px] place-items-center rounded-full border text-[16px] transition ${
                    current === n
                      ? "border-navy bg-navy text-white"
                      : "border-[#c3c3c3] text-navy hover:border-navy"
                  }`}
                >
                  {String(n).padStart(2, "0")}
                </button>
              ))}
              {current < totalPages && (
                <button
                  type="button"
                  onClick={() => setPage(current + 1)}
                  className="inline-flex h-[54px] items-center gap-2 rounded-full border border-navy/60 px-[30px] text-[16px] text-navy transition hover:bg-navy hover:text-white"
                >
                  Next
                  <ArrowRight size={14} strokeWidth={1.75} />
                </button>
              )}
            </nav>
          )}
        </Container>
      </section>
    </>
  );
}