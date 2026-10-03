import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import RichText from "@/components/RichText";
import ResearchCard from "@/components/research/ResearchCard";
import { getResearch, getResearchItem } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResearchItem(slug);
  if (!r) return { title: "Report not found | Civic Bridge Africa" };
  return {
    title: `${r.title} | Civic Bridge Africa`,
    description: r.summary ?? undefined,
    openGraph: {
      title: r.title,
      description: r.summary ?? undefined,
      images: r.cover_image ? [r.cover_image] : undefined,
    },
  };
}

export default async function ResearchItemPage({ params }: Props) {
  const { slug } = await params;
  const report = await getResearchItem(slug);
  if (!report) notFound();

  const related = (await getResearch()).filter((r) => r.slug !== slug).slice(0, 3);

  const facts = [
    { label: "Type", value: report.type },
    { label: "Author", value: report.author },
    { label: "Published", value: report.published_on ? formatDate(report.published_on) : null },
    { label: "Length", value: report.pages ? `${report.pages} pages` : null },
  ].filter((f) => f.value);

  return (
    <>
      <section
        className="border-b border-black/50 pb-14 pt-10 lg:pb-[80px] lg:pt-[56px]"
        style={{
          backgroundImage:
            "linear-gradient(-69.74deg, rgba(239,173,89,0.07) 7.08%, rgba(255,255,255,0.08) 47.71%, rgba(26,44,54,0.07) 100.49%)",
        }}
      >
        <Container>
          <Link href="/research" className="inline-flex items-center gap-2 text-[14px] text-navy transition hover:opacity-70">
            <ArrowLeft size={16} />
            All research
          </Link>
          <p className="mt-8 text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
            {report.type}
          </p>
          <h1 className="mt-4 max-w-[900px] text-[40px] leading-[1.05] tracking-[-0.6px] text-navy md:text-[56px] lg:text-[64px]">
            {report.title}
          </h1>
          {report.summary && (
            <p className="mt-6 max-w-[760px] text-[18px] leading-[31px] tracking-[0.6px] text-black lg:text-[20px]">
              {report.summary}
            </p>
          )}
        </Container>
      </section>

      <section className="py-12 lg:py-[100px]">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-x-[70px]">
          <div className="min-w-0">
            {report.cover_image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[40px] lg:rounded-[55px]">
                <Image src={report.cover_image} alt="" fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
              </div>
            )}
            {report.body ? (
              <RichText html={report.body} />
            ) : (
              <p className="text-[18px] text-black/60">
                {report.file_url
                  ? "Download the full report using the button on this page."
                  : "The full report is coming soon."}
              </p>
            )}
          </div>

          <aside className="h-fit rounded-[36px] border border-black/20 bg-white p-8 lg:sticky lg:top-8">
            <dl className="space-y-5">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">{f.label}</dt>
                  <dd className="mt-1 text-[18px] leading-[28px] text-black">{f.value}</dd>
                </div>
              ))}
            </dl>
            {report.file_url && (
              <div className="mt-8 border-t border-black/10 pt-8">
                <a
                  href={report.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[54px] items-center gap-2 rounded-full bg-navy px-[28px] text-[16px] font-bold text-white transition hover:opacity-90"
                >
                  <Download size={18} strokeWidth={1.75} />
                  Download PDF
                </a>
                {report.file_name && (
                  <p className="mt-3 break-all text-[12px] text-black/50">{report.file_name}</p>
                )}
              </div>
            )}
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-[#eef9f9] py-16 lg:py-[120px]">
          <Container>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">More research</p>
            <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
              Keep reading.
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3 lg:gap-x-[39px]">
              {related.map((r) => <ResearchCard key={r.id} r={r} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}