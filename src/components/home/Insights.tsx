import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { insightMeta } from "@/components/insights/InsightCard";
import type { Insight } from "@/lib/types";

const GRADIENT = "linear-gradient(135deg, #aee6e6 0%, #e2f3f2 100%)";

export default function Insights({ posts }: { posts: Insight[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="pb-20 pt-[100px] xl:pb-[192px] xl:pt-[149px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Insights
        </p>
        <h2 className="mt-[13px] max-w-[479px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Ideas, analysis, and civic perspectives.
        </h2>

        <div className="mt-[49px] grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[40px]">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/insights/${p.slug}`} className="group block">
              <div
                className="relative h-[323px] w-full max-w-[376px] overflow-hidden rounded-[44px]"
                style={{ backgroundImage: GRADIENT }}
              >
                {p.cover_image && (
                  <Image
                    src={p.cover_image}
                    alt=""
                    fill
                    sizes="376px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="mt-[61px] max-w-[407px]">
                <p className="text-[14px] uppercase leading-[37px] tracking-[5px] text-black sm:text-[18px] sm:tracking-[7.02px]">
                  {p.category}
                </p>
                <h3 className="mt-3 text-[24px] font-medium leading-[30px] tracking-[-0.2828px] text-black transition group-hover:text-teal md:text-[28.281px] md:leading-[33.937px]">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="mt-5 text-[16px] leading-[30px] tracking-[0.54px] text-black md:text-[18px] md:leading-[37px]">
                    {p.excerpt}
                  </p>
                )}
                <p className="mt-4 text-[11px] uppercase leading-[12px] tracking-[2.2px] text-[#4d4d4d] sm:text-[12px]">
                  {insightMeta(p)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}