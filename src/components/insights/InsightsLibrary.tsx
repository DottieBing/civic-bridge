"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";
import InsightCard, { insightMeta } from "@/components/insights/InsightCard";
import { INSIGHT_CATEGORIES } from "@/lib/constants";
import type { Insight } from "@/lib/types";

const FEATURED_GRADIENT =
  "linear-gradient(135deg, #1a2c36 8%, #5f8a90 55%, #bdf7f5 100%)";
const categories = ["All", ...INSIGHT_CATEGORIES];
const INITIAL = 6;
const STEP = 3;

export default function InsightsLibrary({ posts }: { posts: Insight[] }) {
  const [active, setActive] = useState("All");
  const [shown, setShown] = useState(INITIAL);

  const featured = posts.find((p) => p.featured) ?? null;
  const showFeatured =
    featured !== null && (active === "All" || active === featured.category);

  const rest = posts.filter(
    (p) =>
      !(showFeatured && p.id === featured?.id) &&
      (active === "All" || p.category === active),
  );
  const visible = rest.slice(0, shown);
  const hasMore = rest.length > shown;

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
          <div className="2xl:translate-x-[28px]">
            {showFeatured && featured && (
              <Link
                href={`/insights/${featured.slug}`}
                className="group grid items-center gap-8 lg:grid-cols-[660px_1fr] lg:gap-x-[59px]"
              >
                <div
                  className="relative h-[260px] w-full overflow-hidden rounded-[44px] lg:h-[434px]"
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
                <div>
                  <p className="text-[12px] font-medium uppercase leading-[14px] tracking-[1.5px] text-teal-light">
                    {featured.category}
                  </p>
                  <h2 className="mt-5 max-w-[470px] text-[30px] font-medium leading-[1.1] tracking-[-0.42px] text-black transition group-hover:text-teal lg:text-[42.4px] lg:leading-[47px]">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-[22px] max-w-[560px] text-[16px] leading-[30px] tracking-[0.5px] text-black lg:text-[17px] lg:leading-[35px]">
                      {featured.excerpt}
                    </p>
                  )}
                  <p className="mt-[22px] text-[11px] font-medium uppercase leading-[14px] tracking-[1.2px] text-[#4d4d4d] lg:text-[12px]">
                    {insightMeta(featured)}
                  </p>
                </div>
              </Link>
            )}

            {visible.length === 0 && !showFeatured && (
              <p className="text-[18px] text-black">
                {posts.length === 0
                  ? "Articles will appear here soon."
                  : "No articles in this category yet."}
              </p>
            )}

            <div
              className={`grid gap-x-[39px] gap-y-14 md:grid-cols-2 lg:grid-cols-3 ${
                showFeatured && visible.length > 0 ? "mt-16 lg:mt-[102px]" : ""
              }`}
            >
              {visible.map((p) => (
                <InsightCard key={p.id} p={p} />
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