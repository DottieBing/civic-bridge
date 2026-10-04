import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import RichText from "@/components/RichText";
import ProgramCard from "@/components/programs/ProgramCard";
import { getProgram, getPrograms } from "@/lib/content";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProgram(slug);
  if (!p) return { title: "Program not found | Civic Bridge Africa" };
  return {
    title: `${p.title} | Civic Bridge Africa`,
    description: p.summary ?? undefined,
    openGraph: {
      title: p.title,
      description: p.summary ?? undefined,
      images: p.cover_image ? [p.cover_image] : undefined,
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  const related = (await getPrograms())
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const facts = [
    { label: "Status", value: program.status },
    { label: "Location", value: program.location },
    { label: "Reach", value: program.reach },
    { label: "Duration", value: program.duration },
    { label: "Audience", value: program.audience },
    { label: "Category", value: program.category },
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
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-[14px] text-navy transition hover:opacity-70"
          >
            <ArrowLeft size={16} />
            All programs
          </Link>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-[22px] py-[8px] text-[12px] font-medium uppercase tracking-[0.6px] text-black ring-1 ring-black/10">
              {program.category}
            </span>
            <span
              className={`rounded-full px-[22px] py-[8px] text-[12px] font-medium ${
                program.status === "Active" ? "bg-amber text-navy" : "bg-navy text-white"
              }`}
            >
              {program.status}
            </span>
          </div>
          <h1 className="mt-6 max-w-[900px] text-[40px] leading-[1.05] tracking-[-0.6px] text-navy md:text-[56px] lg:text-[64px]">
            {program.title}
          </h1>
          {program.summary && (
            <p className="mt-6 max-w-[760px] text-[18px] leading-[31px] tracking-[0.6px] text-black lg:text-[20px]">
              {program.summary}
            </p>
          )}
        </Container>
      </section>

      <section className="py-12 lg:py-[100px]">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-x-[70px]">
          <div className="min-w-0">
            {program.cover_image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[40px] lg:rounded-[55px]">
                <Image
                  src={program.cover_image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {program.body ? (
              <RichText html={program.body} />
            ) : (
              <p className="text-[18px] text-black/60">
                More details about this program are coming soon.
              </p>
            )}
          </div>

          <aside className="h-fit rounded-[36px] border border-black/20 bg-white p-8 lg:sticky lg:top-8">
            <dl className="space-y-5">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[18px] leading-[28px] text-black">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 border-t border-black/10 pt-8">
              <Button href="/get-involved" variant="primary" icon="right">
                Get involved
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-[#eef9f9] py-16 lg:py-[120px]">
          <Container>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
              More programs
            </p>
            <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
              Keep exploring our work.
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3 lg:gap-x-[39px]">
              {related.map((p) => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}