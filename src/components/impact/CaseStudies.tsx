import Container from "@/components/ui/Container";
import CaseStudyCard from "@/components/impact/CaseStudyCard";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="pb-16 pt-16 lg:pb-[159px] lg:pt-[137px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Impact stories
        </p>
        <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Case studies from the field.
        </h2>

        {studies.length === 0 ? (
          <p className="mt-10 text-[18px] text-black">Stories will appear here soon.</p>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-[89px] lg:grid-cols-3 lg:gap-x-[39px]">
            {studies.slice(0, 6).map((s) => (
              <CaseStudyCard key={s.id} s={s} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}