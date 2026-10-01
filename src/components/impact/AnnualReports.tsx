import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "@/components/ui/Container";

const docs = [
  { title: "Annual report 2025", meta: "PDF · 12MB", href: "#" },
  { title: "Financial report 2025", meta: "PDF · 12MB", href: "#" },
  { title: "Safeguarding policy", meta: "PDF · 12MB", href: "#" },
];

export default function AnnualReports() {
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

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-x-[28px] lg:mt-[46px]">
          {docs.map((d) => (
            <Link
              key={d.title}
              href={d.href}
              className="group flex min-h-[124px] items-start justify-between rounded-[24px] border border-white/40 px-[38px] py-[28px] transition hover:border-white"
            >
              <div>
                <p className="text-[20px] leading-[30px] text-white">
                  {d.title}
                </p>
                <p className="mt-[7px] text-[12px] leading-[14px] text-white/70">
                  {d.meta}
                </p>
              </div>
              <Download
                size={20}
                strokeWidth={1.5}
                className="mt-[6px] text-white transition group-hover:translate-y-[2px]"
              />
            </Link>
          ))}
        </div>

        {showNote && (
          <p className="mt-6 max-w-[965px] text-[20px] leading-[37px] text-white">
            Impact figures shown throughout this site are placeholders and
            should be replaced with verified data prior to publication.
          </p>
        )}

        <div className={showNote ? "mt-4" : "mt-[52px]"}>
          <Link
            href="/about"
            className="inline-flex h-[66px] items-center gap-[8px] rounded-full bg-amber px-[50px] text-[15px] font-medium text-navy transition hover:brightness-95"
          >
            Meet our leadership
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </Container>
    </section>
  );
}