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

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-[81px] lg:grid-cols-[repeat(4,1fr)_206px] lg:gap-x-0">
          {steps.map((s, i) => (
            <div key={s.title}>
              <div className="flex items-center">
                <span className="grid size-[57px] shrink-0 place-items-center rounded-full border-[0.5px] border-[#c3c3c3] text-[24px] font-medium leading-[37px] text-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hidden h-px flex-1 bg-[#c3c3c3]/60 lg:block" />
              </div>

              <div className="mt-[41px] flex max-w-[206px] flex-col gap-[10px] text-black">
                <h3 className="text-[24px] font-medium leading-[37px]">
                  {s.title}
                </h3>
                <p className="text-[18px] leading-[37px] tracking-[0.54px]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}