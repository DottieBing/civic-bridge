import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import RichText from "@/components/RichText";
import InsightCard from "@/components/insights/InsightCard";
import { getInsight, getInsights } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getInsight(slug);
  if (!p) return { title: "Article not found | Civic Bridge Africa" };
  return {
    title: `${p.title} | Civic Bridge Africa`,
    description: p.excerpt ?? undefined,
    openGraph: {
      title: p.title,
      description: p.excerpt ?? undefined,
      images: p.cover_image ? [p.cover_image] : undefined,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  const related = (await getInsights()).filter((p) => p.slug !== slug).slice(0, 3);
  const byline = [
    post.author,
    post.published_on ? formatDate(post.published_on) : null,
    post.read_minutes ? `${post.read_minutes} min read` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <article className="py-10 lg:py-[56px]">
        <Container>
          <div className="mx-auto max-w-[812px]">
            <Link href="/insights" className="inline-flex items-center gap-2 text-[14px] text-navy transition hover:opacity-70">
              <ArrowLeft size={16} />
              All insights
            </Link>
            <p className="mt-8 text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
              {post.category}
            </p>
            <h1 className="mt-4 text-[38px] leading-[1.08] tracking-[-0.6px] text-navy md:text-[52px] lg:text-[60px]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 text-[18px] leading-[31px] tracking-[0.6px] text-black lg:text-[20px]">
                {post.excerpt}
              </p>
            )}
            {byline && (
              <p className="mt-6 text-[13px] font-medium uppercase tracking-[1.2px] text-[#4d4d4d]">
                {byline}
              </p>
            )}
          </div>

          {post.cover_image && (
            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[1100px] overflow-hidden rounded-[40px] lg:mt-[56px] lg:rounded-[55px]">
              <Image src={post.cover_image} alt="" fill priority sizes="(min-width: 1100px) 1100px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="mx-auto mt-10 max-w-[812px] lg:mt-[56px]">
            {post.body ? (
              <RichText html={post.body} />
            ) : (
              <p className="text-[18px] text-black/60">This article is coming soon.</p>
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-[#eef9f9] py-16 lg:py-[120px]">
          <Container>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">More to read</p>
            <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
              Keep exploring.
            </h2>
            <div className="mt-10 grid gap-x-[39px] gap-y-14 md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3">
              {related.map((p) => <InsightCard key={p.id} p={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}