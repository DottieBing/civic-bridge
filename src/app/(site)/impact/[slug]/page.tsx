import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import RichText from "@/components/RichText";
import CaseStudyCard from "@/components/impact/CaseStudyCard";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  if (!s) return { title: "Story not found | Civic Bridge Africa" };
  return {
    title: `${s.title} | Civic Bridge Africa`,
    description: s.excerpt ?? undefined,
    openGraph: {
      title: s.title,
      description: s.excerpt ?? undefined,
      images: s.cover_image ? [s.cover_image] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const story = await getCaseStudy(slug);
  if (!story) notFound();

  const more = (await getCaseStudies()).filter((s) => s.slug !== slug).slice(0, 3);
  const byline = [story.location, story.published_on ? formatDate(story.published_on) : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <article className="py-10 lg:py-[56px]">
        <Container>
          <div className="mx-auto max-w-[812px]">
            <Link href="/impact" className="inline-flex items-center gap-2 text-[14px] text-navy transition hover:opacity-70">
              <ArrowLeft size={16} />
              Back to impact
            </Link>
            <p className="mt-8 text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
              Case study
            </p>
            <h1 className="mt-4 text-[38px] leading-[1.08] tracking-[-0.6px] text-navy md:text-[52px] lg:text-[60px]">
              {story.title}
            </h1>
            {story.excerpt && (
              <p className="mt-6 text-[18px] leading-[31px] tracking-[0.6px] text-black lg:text-[20px]">
                {story.excerpt}
              </p>
            )}
            {byline && (
              <p className="mt-6 text-[13px] font-medium uppercase tracking-[1.2px] text-[#4d4d4d]">
                {byline}
              </p>
            )}
          </div>

          {story.cover_image && (
            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[1100px] overflow-hidden rounded-[40px] lg:mt-[56px] lg:rounded-[55px]">
              <Image src={story.cover_image} alt="" fill priority sizes="(min-width: 1100px) 1100px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="mx-auto mt-10 max-w-[812px] lg:mt-[56px]">
            {story.body ? (
              <RichText html={story.body} />
            ) : (
              <p className="text-[18px] text-black/60">This story is coming soon.</p>
            )}
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="bg-[#eef9f9] py-16 lg:py-[120px]">
          <Container>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">More stories</p>
            <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
              More from the field.
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3 lg:gap-x-[39px]">
              {more.map((s) => <CaseStudyCard key={s.id} s={s} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}