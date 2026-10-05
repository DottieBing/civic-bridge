import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import { fileMeta } from "@/lib/utils";
import type { DocumentItem } from "@/lib/types";

export default function AnnualReports({
  docs,
  hasTeam,
}: {
  docs: DocumentItem[];
  hasTeam: boolean;
}) {
  // The design includes a developer note here. Shown in development only.
  const showNote = process.env.NODE_ENV !== "production";

  return (
    <section className="bg-navy pb-16 pt-16 lg:pb-[76px] lg:pt-[186px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-amber">
          Annual reports
        </p>
        <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-white md:text-[40px] md:leading-[48px]">
          Read our full accountability reports.
        </h2>

        {docs.length === 0 ? (
          <p className="mt-10 text-[18px] text-white/70 lg:mt-[46px]">
            Reports will be published here soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-x-[28px] lg:mt-[46px]">
            {docs.map((d) => (
              <a
                key={d.id}
                href={d.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[124px] items-start justify-between gap-4 rounded-[24px] border border-white/40 px-[38px] py-[28px] transition hover:border-white"
              >
                <div className="min-w-0">
                  <p className="text-[20px] leading-[30px] text-white">{d.title}</p>
                  <p className="mt-[7px] text-[12px] leading-[14px] text-white/70">
                    {fileMeta(d.file_name, d.file_size_bytes)}
                  </p>
                </div>
                <Download
                  size={20}
                  strokeWidth={1.5}
                  className="mt-[6px] shrink-0 text-white transition group-hover:translate-y-[2px]"
                />
              </a>
            ))}
          </div>
        )}

        {showNote && (
          <p className="mt-6 max-w-[965px] text-[20px] leading-[37px] text-white">
            Impact figures shown throughout this site are placeholders and
            should be replaced with verified data prior to publication.
          </p>
        )}

        {hasTeam && (
          <div className={showNote ? "mt-4" : "mt-[52px]"}>
            <Link
              href="/about/team"
              className="inline-flex h-[66px] items-center gap-[8px] rounded-full bg-amber px-[50px] text-[15px] font-medium text-navy transition hover:brightness-95"
            >
              Meet our leadership
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}