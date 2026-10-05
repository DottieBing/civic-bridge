import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "@/components/ui/Container";
import { formatMonthYear } from "@/lib/utils";
import type { Research as ResearchItem } from "@/lib/types";

const GRADIENT = "linear-gradient(133.32deg, #1a2c36 16.5%, #4b7f9c 99.1%)";

export default function Research({ reports }: { reports: ResearchItem[] }) {
  if (reports.length === 0) return null;

  const featured = reports.find((r) => r.featured) ?? reports[0];
  const side = reports.filter((r) => r.id !== featured.id).slice(0, 3);
  const meta = [
    featured.type,
    featured.published_on ? formatMonthYear(featured.published_on) : null,
    featured.pages ? `${featured.pages} pages` : null,
  ]
    .filter(Boolean)
    .join("·");

  return (
    <section className="bg-teal-light/[0.12] pb-16 pt-[100px] xl:pb-[100px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Research
        </p>
        <h2 className="mt-[29px] max-w-[479px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Research for more accountable governance.
        </h2>

        <div className="mt-[51px] grid gap-10 xl:grid-cols-[1.4fr_1fr] xl:gap-x-[46px] 2xl:grid-cols-[746px_1fr]">
          <div className="w-full max-w-[746px] overflow-hidden rounded-[40px] sm:rounded-[55px]">
            <div className="relative h-[300px] sm:h-[504px]" style={{ backgroundImage: GRADIENT }}>
              {featured.cover_image && (
                <Image
                  src={featured.cover_image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 746px, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="bg-white px-6 pb-12 pt-10 sm:px-[63px] sm:pb-[61px] sm:pt-[50px]">
              <p className="text-[13px] uppercase leading-[37px] tracking-[1.5px] text-black sm:text-[16px] sm:tracking-[5px]">
                {meta}
              </p>
              <h3 className="mt-6 max-w-[480px] text-[24px] font-medium leading-[30px] tracking-[-0.2828px] text-black sm:mt-[30px] sm:text-[28.281px] sm:leading-[33.937px]">
                {featured.title}
              </h3>
              {featured.summary && (
                <p className="mt-4 max-w-[612px] text-[16px] leading-[30px] tracking-[0.3px] text-black sm:text-[18px] sm:leading-[37px]">
                  {featured.summary}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-4 sm:mt-[40px]">
                <Link
                  href={`/research/${featured.slug}`}
                  className="w-full justify-center sm:w-auto inline-flex items-center gap-[7px] rounded-pill bg-navy px-[25px] py-[9px] text-[18px] font-bold leading-[30px] text-white transition hover:opacity-90 sm:text-[20px]"
                >
                  Read report
                  <ArrowRight size={19} strokeWidth={1.75} />
                </Link>
                {featured.file_url && (
                  <a
                    href={featured.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-center sm:w-auto inline-flex items-center gap-[7px] rounded-pill border border-navy px-[25px] py-[9px] text-[18px] font-bold leading-[30px] text-navy transition hover:bg-navy hover:text-white sm:text-[20px]"
                  >
                    <Download size={22} strokeWidth={1.5} />
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>

          {side.length > 0 && (
            <div className="flex w-full max-w-[506px] flex-col gap-[30px] self-start">
              {side.map((r) => (
                <Link
                  key={r.id}
                  href={`/research/${r.slug}`}
                  className="flex flex-col gap-[15px] rounded-[19px] border border-black/30 bg-white px-6 py-[23px] transition hover:shadow-md sm:px-[39px]"
                >
                  <div>
                    <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
                      {r.type}
                    </p>
                    <p className="text-[18px] leading-[30px] text-black sm:text-[20px]">
                      {r.title}
                    </p>
                  </div>
                  <div className="flex justify-between text-[12px] font-medium leading-[12px] tracking-[0.72px] text-[#4d4d4d]">
                    <span>{r.published_on ? formatMonthYear(r.published_on) : ""}</span>
                    <span>{r.pages ? `${r.pages} pages` : ""}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/research"
          className="mt-[61px] inline-flex items-center gap-[7px] py-[9px] text-[16px] font-bold leading-[30px] text-navy transition hover:opacity-70"
        >
          View all research
          <ArrowRight size={19} strokeWidth={1.75} />
        </Link>
      </Container>
    </section>
  );
}