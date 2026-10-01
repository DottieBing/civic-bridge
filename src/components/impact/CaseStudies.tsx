import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

const GRADIENT = "linear-gradient(135deg, #6fcdcf 0%, #c4fbf9 100%)";

// Placeholder content copied from the design — replace with real case studies.
const studies = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  title: "Community civic learning changed how a council listens",
  body: "Over six months, structured dialogue reshaped participatory practice in one local council.",
  href: "#",
}));

export default function CaseStudies() {
  return (
    <section className="pb-16 pt-16 lg:pb-[159px] lg:pt-[137px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Impact stories
        </p>
        <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Case studies from the field.
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-[89px] lg:grid-cols-3 lg:gap-x-[39px]">
          {studies.map((s) => (
            <article
              key={s.id}
              className="flex w-full max-w-[407px] flex-col overflow-hidden rounded-[44px] border border-black/20 bg-white"
            >
              <div
                className="h-[290px] shrink-0"
                style={{ backgroundImage: GRADIENT }}
              />
              <div className="flex min-h-[276px] flex-col px-[34px] pb-[48px] pt-[34px]">
                <p className="text-[10.4px] font-medium uppercase leading-[14px] tracking-[1.2px] text-teal-label">
                  Case study
                </p>
                <h3 className="mt-[7px] text-[22px] font-medium leading-[28px] text-black">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[340px] text-[14.5px] leading-[29px] tracking-[0.2px] text-black">
                  {s.body}
                </p>
                <Link
                  href={s.href}
                  className="mt-auto inline-flex w-fit items-center gap-[7px] pt-3 text-[16px] font-bold leading-[24px] text-navy transition hover:opacity-70"
                >
                  Read case study
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}