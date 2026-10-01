"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";

const CARD_GRADIENT = "linear-gradient(135deg, #6fcdcf 0%, #c4fbf9 100%)";
const FEATURED_GRADIENT =
  "linear-gradient(135deg, #1a2c36 8%, #5f8a90 55%, #bdf7f5 100%)";

const categories = [
  "All programs",
  "Elections",
  "Civic Education",
  "Advocacy",
  "Digital Democracy",
  "Youth",
  "Community",
];

const featured = {
  label: "Featured · Research Report",
  title: "Young Citizens for Accountable Governance",
  body: "A 12-community study on how transparency and responsiveness shape trust.",
  meta: "CBA Research Unit·Jun 2026·42 pages",
  href: "#",
};

// Placeholder content copied from the design — replace with real reports.
const reports = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  category: "Youth",
  type: "Policy Brief",
  title: "Youth participation in local governance",
  body: "Barriers, entry points, and design recommendations for youth-inclusive councils.",
  date: "May 2026",
  pages: "18p",
  href: "#",
}));

const pages = [1, 2, 3, 4];

export default function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All programs");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (r) =>
        (active === "All programs" || r.category === active) &&
        (!q || `${r.title} ${r.body}`.toLowerCase().includes(q)),
    );
  }, [query, active]);

  return (
    <>
      {/* Search + filters */}
      <div className="px-6 pt-10 lg:px-8 lg:pt-[68px]">
        <div className="mx-auto w-full max-w-[1300px]">
          <div className="pb-10 lg:pb-[68px]">
            <div className="flex h-[66px] items-center rounded-full border border-[#c3c3c3] bg-white pl-6 pr-[10px] lg:pl-[71px]">
              <Search size={24} strokeWidth={1.5} className="shrink-0 text-black" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports, topics, authors, or keywords"
                aria-label="Search research"
                className="ml-3 min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-black/40 lg:ml-[31px]"
              />
              <button
                type="button"
                className="h-[52px] w-[110px] shrink-0 rounded-full bg-navy text-[13px] font-bold text-white transition hover:opacity-90 lg:w-[137px]"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <FilterBar
        options={categories}
        value={active}
        onChange={setActive}
        className="pb-10 lg:pb-[68px]"
      />

      <section className="pb-16 pt-12 lg:pb-[188px] lg:pt-[93px]">
        <Container>
          {/* Featured report */}
          <article className="grid overflow-hidden rounded-[40px] border border-black/20 lg:h-[344px] lg:grid-cols-[660px_1fr] lg:rounded-[48px]">
            <div
              className="h-[240px] lg:h-full"
              style={{ backgroundImage: FEATURED_GRADIENT }}
            />
            <div className="flex flex-col justify-center px-8 py-10 lg:px-[59px] lg:py-0">
              <p className="text-[12px] font-medium uppercase leading-[14px] tracking-[1.68px] text-teal-light">
                {featured.label}
              </p>
              <h2 className="mt-5 max-w-[540px] text-[30px] font-medium leading-[1.1] tracking-[-0.42px] text-black lg:text-[42px] lg:leading-[47px]">
                {featured.title}
              </h2>
              <p className="mt-[22px] max-w-[420px] text-[16px] leading-[30px] tracking-[0.5px] text-black lg:text-[17px] lg:leading-[35px]">
                {featured.body}
              </p>
              <p className="mt-[22px] text-[11px] font-medium uppercase leading-[14px] tracking-[1.2px] text-[#4d4d4d] lg:text-[12px]">
                {featured.meta}
              </p>
            </div>
          </article>

          {/* Cards */}
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:mt-[128px] lg:grid-cols-3 lg:gap-x-[39px]">
            {visible.length === 0 && (
              <p className="text-[18px] text-black md:col-span-2 lg:col-span-3">
                No reports match your search yet.
              </p>
            )}
            {visible.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="group flex w-full max-w-[407px] flex-col overflow-hidden rounded-[55px] border border-black/20 bg-white"
              >
                <div
                  className="relative h-[290px] shrink-0"
                  style={{ backgroundImage: CARD_GRADIENT }}
                >
                  <span className="absolute left-[33px] top-[29px] grid h-[33px] w-[119px] place-items-center rounded-full bg-white text-[14px] leading-none text-black">
                    {r.type}
                  </span>
                </div>
                <div className="flex min-h-[276px] flex-1 flex-col px-[35px] pb-[48px] pt-[40px]">
                  <h3 className="text-[22px] font-medium leading-[28px] text-black transition group-hover:text-teal">
                    {r.title}
                  </h3>
                  <p className="mt-[6px] max-w-[330px] text-[14.5px] leading-[29px] tracking-[0.2px] text-black">
                    {r.body}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-[14px] text-[10px] font-normal uppercase leading-[14px] tracking-[1px]">
                    <span className="text-[#4d4d4d]">{r.date}</span>
                    <span className="inline-flex items-center gap-[5px] text-teal-label">
                      <Download size={12} strokeWidth={1.75} />
                      {r.pages}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination (visual only until there is real data) */}
          <nav
            aria-label="Pagination"
            className="mt-16 flex flex-wrap justify-center gap-3 lg:mt-[118px]"
          >
            {pages.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={page === n ? "page" : undefined}
                className={`grid size-[54px] place-items-center rounded-full border text-[16px] transition ${
                  page === n
                    ? "border-navy bg-navy text-white"
                    : "border-[#c3c3c3] text-navy hover:border-navy"
                }`}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, pages.length))}
              className="inline-flex h-[54px] items-center gap-2 rounded-full border border-navy/60 px-[30px] text-[16px] text-navy transition hover:bg-navy hover:text-white"
            >
              Next
              <ArrowRight size={14} strokeWidth={1.75} />
            </button>
          </nav>
        </Container>
      </section>
    </>
  );
}