import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "@/components/ui/Container";

const reports = [
  { type: "Policy Brief", title: "Youth participation in local governance", date: "Jun 2026", pages: "18 pages" },
  { type: "Research Report", title: "Legislative openness across West Africa", date: "May 2026", pages: "42 pages" },
  { type: "Civic Explainer", title: "Understanding electoral tribunals", date: "Apr 2026", pages: "12 pages" },
];

export default function Research() {
  return (
    <section className="bg-teal-light/[0.12] pb-16 pt-[100px] xl:pb-[100px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Research
        </p>
        <h2 className="mt-[29px] max-w-[479px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Research for more accountable governance.
        </h2>

        <div className="mt-[51px] grid gap-10 xl:grid-cols-[746px_1fr] xl:gap-x-[46px]">
          {/* Featured report */}
          <div className="w-full max-w-[746px] overflow-hidden rounded-[40px] sm:rounded-[55px]">
            <div
              className="relative h-[300px] sm:h-[504px]"
              style={{
                backgroundImage:
                  "linear-gradient(133.32deg, #1a2c36 16.5%, #4b7f9c 99.1%)",
              }}
            >
              <Image
                src="/images/research-featured.jpg"
                alt="Sunlit stone columns of a government building"
                fill
                sizes="(min-width: 1280px) 746px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="bg-white px-6 pb-12 pt-10 sm:px-[63px] sm:pb-[61px] sm:pt-[50px]">
              <p className="text-[13px] uppercase leading-[37px] tracking-[3px] text-black sm:text-[18px] sm:tracking-[7.02px]">
                Research report·Jun 2026·14 min read
              </p>

              <h3 className="mt-6 max-w-[407px] text-[24px] font-medium leading-[30px] tracking-[-0.2828px] text-black sm:mt-[38px] sm:text-[28.281px] sm:leading-[33.937px]">
                Citizen trust and local governance in Nigeria
              </h3>

              <p className="mt-3 max-w-[612px] text-[16px] leading-[30px] tracking-[0.54px] text-black sm:mt-[20px] sm:text-[18px] sm:leading-[37px]">
                A 12-community study exploring how transparency,
                responsiveness, and inclusive service delivery shape trust in
                local government councils.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 sm:mt-[45px]">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-[7px] rounded-pill bg-navy px-[25px] py-[9px] text-[18px] font-bold leading-[30px] text-white transition hover:opacity-90 sm:text-[20px]"
                >
                  View Initiative
                  <ArrowRight size={19} strokeWidth={1.75} />
                </Link>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-[7px] rounded-pill border border-navy px-[25px] py-[9px] text-[18px] font-bold leading-[30px] text-navy transition hover:bg-navy hover:text-white sm:text-[20px]"
                >
                  <Download size={24} strokeWidth={1.5} />
                  Download PDF
                </Link>
              </div>
            </div>
          </div>

          {/* Side list */}
          <div className="flex w-full max-w-[506px] flex-col gap-[42px] self-start">
            {reports.map((r) => (
              <Link
                key={r.title}
                href="/research"
                className="flex flex-col gap-[15px] rounded-[19px] border border-black/30 bg-white px-6 py-[23px] transition hover:shadow-md sm:px-[39px] xl:px-[28px] 2xl:px-[39px]"
                >
                <div>
                    <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
                    {r.type}
                    </p>
                    <p className="text-[18px] leading-[37px] tracking-[0.2px] text-black sm:whitespace-nowrap sm:text-[20px]">
                    {r.title}
                    </p>
                </div>
                <div className="flex justify-between text-[12px] font-medium leading-[12px] tracking-[0.72px] text-[#4d4d4d]">
                    <span>{r.date}</span>
                    <span>{r.pages}</span>
                </div>
              </Link>
            ))}
          </div>
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