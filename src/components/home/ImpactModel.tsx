import Container from "@/components/ui/Container";

const steps = [
  {
    title: "Research",
    body: "Ground every intervention in rigorous, community-informed evidence.",
  },
  {
    title: "Educate",
    body: "Translate civic knowledge into accessible learning for every citizen.",
  },
  {
    title: "Mobilize",
    body: "Convene people, institutions, and partners around shared priorities.",
  },
  {
    title: "Advocate",
    body: "Advance policy change through structured, evidence-led engagement.",
  },
  {
    title: "Measure",
    body: "Track outcomes transparently and publish what we learn.",
  },
];

export default function ImpactModel() {
  return (
    <section className="pb-20 pt-[100px] xl:pb-[220px] xl:pt-[130px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          How we create impact
        </p>

        <h2 className="mt-[25px] max-w-[478px] text-[32px] font-medium leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          A five-step model for civic change.
        </h2>

        <ol className="mt-10 lg:mt-[81px] lg:grid lg:grid-cols-[repeat(4,1fr)_206px]">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0">
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[28px] top-[57px] h-[calc(100%-57px)] w-px bg-[#c3c3c3] lg:hidden"
                />
              )}

              <div className="flex shrink-0 items-center self-start lg:self-auto">
                <span className="relative grid size-[57px] shrink-0 place-items-center rounded-full border-[0.5px] border-[#c3c3c3] bg-white text-[24px] font-medium leading-[37px] text-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hidden h-px flex-1 bg-[#c3c3c3]/60 lg:block" />
              </div>

              <div className="flex flex-col gap-[6px] pt-1 text-black lg:mt-[41px] lg:max-w-[206px] lg:gap-[10px] lg:pt-0">
                <h3 className="text-[22px] font-medium leading-[30px] lg:text-[24px] lg:leading-[37px]">
                  {s.title}
                </h3>
                <p className="text-[16px] leading-[26px] tracking-[0.3px] lg:text-[18px] lg:leading-[37px] lg:tracking-[0.54px]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}