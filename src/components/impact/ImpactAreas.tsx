import Container from "@/components/ui/Container";
import type { ImpactArea } from "@/lib/types";

export default function ImpactAreas({ areas }: { areas: ImpactArea[] }) {
  if (areas.length === 0) return null;

  return (
    <section className="bg-[#eef9f9] pb-16 pt-16 lg:pb-[135px] lg:pt-[131px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Impact areas
        </p>
        <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Six lenses on our work.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-[75px] lg:grid-cols-3 lg:gap-x-[28px]">
          {areas.map((a, i) => (
            <div
              key={a.id}
              className="min-h-[201px] rounded-[24px] border border-black/30 bg-white px-[39px] py-[37px]"
            >
              <p className="text-[14px] leading-[14px] text-teal-label">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-[13px] text-[20px] font-normal leading-[28px] text-black">
                {a.title}
              </h3>
              {a.description && (
                <p className="mt-[11px] max-w-[290px] text-[16px] leading-[19px] text-[#4d4d4d]">
                  {a.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}