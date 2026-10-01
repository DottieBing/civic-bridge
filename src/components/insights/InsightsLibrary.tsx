"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";

const CARD_GRADIENT = "linear-gradient(135deg, #aee6e6 0%, #e2f3f2 100%)";
const FEATURED_GRADIENT =
  "linear-gradient(135deg, #1a2c36 8%, #5f8a90 55%, #bdf7f5 100%)";

const categories = [
  "All",
  "Analysis",
  "Opinion",
  "Explainer",
  "News",
  "Interview",
  "Commentary",
  "Community",
];

const featured = {
  category: "Analysis",
  title: "Why local government matters more than we think",
  body: "Sub-national institutions shape day-to-day citizen experience more than most national reforms.",
  meta: "CBA Research · May 2026 · 8 min",
  href: "#",
};

// Placeholder content copied from the design — replace with real articles.
const posts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  category: "Analysis",
  title: "How a bill becomes law in Nigeria — visualised",
  body: "A visual explainer of the legislative process and where citizens can weigh in.",
  meta: "Editorial · Apr 2026 · 6 min",
  href: "#",
}));

const INITIAL = 5;
const STEP = 3;

export default function InsightsLibrary() {
  const [active, setActive] = useState("All");
  const [shown, setShown] = useState(INITIAL);

  const filtered = posts.filter(
    (p) => active === "All" || p.category === active,
  );
  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;
  const showFeatured = active === "All" || active === featured.category;

  return (
    <>
      <FilterBar
        options={categories}
        value={active}
        onChange={(v) => {
          setActive(v);
          setShown(INITIAL);
        }}
        align="center"
        compact
      />

      <section className="pb-16 pt-12 lg:pb-[87px] lg:pt-[102px]">
        <Container>
          {/* The design offsets this block 28px right of the header grid (only applied at design width) */}
          <div className="2xl:translate-x-[28px]">
            {showFeatured && (
              <Link
                href={featured.href}
                className="group grid items-center gap-8 lg:grid-cols-[660px_1fr] lg:gap-x-[59px]"
              >
                <div
                  className="h-[260px] w-full rounded-[44px] lg:h-[434px]"
                  style={{ backgroundImage: FEATURED_GRADIENT }}
                />
                <div>
                  <p className="text-[12px] font-medium uppercase leading-[14px] tracking-[1.5px] text-teal-light">
                    {featured.category}
                  </p>
                  <h2 className="mt-5 max-w-[440px] text-[30px] font-medium leading-[1.1] tracking-[-0.42px] text-black transition group-hover:text-teal lg:text-[42.4px] lg:leading-[47px]">
                    {featured.title}
                  </h2>
                  <p className="mt-[22px] max-w-[560px] text-[16px] leading-[30px] tracking-[0.5px] text-black lg:text-[17px] lg:leading-[35px]">
                    {featured.body}
                  </p>
                  <p className="mt-[22px] text-[11px] font-medium uppercase leading-[14px] tracking-[1.2px] text-[#4d4d4d] lg:text-[12px]">
                    {featured.meta}
                  </p>
                </div>
              </Link>
            )}

            {visible.length === 0 && !showFeatured && (
              <p className="text-[18px] text-black">
                No articles in this category yet.
              </p>
            )}

            <div
              className={`grid gap-x-[39px] gap-y-14 md:grid-cols-2 lg:grid-cols-3 ${
                showFeatured && visible.length > 0 ? "mt-16 lg:mt-[102px]" : ""
              }`}
            >
              {visible.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="group block w-full max-w-[407px]"
                >
                  <div
                    className="h-[290px] rounded-[44px] transition group-hover:brightness-[0.97]"
                    style={{ backgroundImage: CARD_GRADIENT }}
                  />
                  <div className="min-h-[243px] pb-[38px] pt-[21px]">
                    <p className="text-[12px] font-medium uppercase leading-[14px] tracking-[1.5px] text-teal-light">
                      {p.category}
                    </p>
                    <h3 className="mt-[15px] max-w-[407px] text-[22px] font-medium leading-[28px] text-black transition group-hover:text-teal">
                      {p.title}
                    </h3>
                    <p className="mt-[11px] max-w-[330px] text-[14.5px] leading-[29px] tracking-[0.2px] text-black">
                      {p.body}
                    </p>
                    <p className="mt-4 text-[10px] font-medium uppercase leading-[14px] tracking-[1px] text-[#4d4d4d]">
                      {p.meta}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center lg:mt-[86px]">
              <button
                type="button"
                onClick={() => setShown((n) => n + STEP)}
                className="inline-flex h-[54px] items-center gap-[7px] rounded-full border border-navy px-[32px] text-[16px] font-medium text-navy transition hover:bg-navy hover:text-white"
              >
                Load more
                <ArrowRight size={14} strokeWidth={1.75} />
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}