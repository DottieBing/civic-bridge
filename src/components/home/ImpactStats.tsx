import Container from "@/components/ui/Container";

const stats = [
  { value: "5,000+", label: "Citizens reached" },
  { value: "18", label: "Communities engaged" },
  { value: "40", label: "Civic learning sessions" },
  { value: "12", label: "Research and policy outputs" },
];

export default function ImpactStats() {
  return (
    <section className="bg-navy pb-20 pt-[100px] xl:pb-[179px]">
      <Container>
        <p className="text-[13px] font-medium uppercase leading-[21.075px] tracking-[1.82px] text-amber">
          Impact
        </p>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 text-white xl:mt-[183px] xl:grid-cols-4 xl:gap-x-[46px]">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 border-t border-white/15 pt-[38px]"
            >
              <p className="text-[44px] font-bold leading-[1] tracking-[-0.64px] md:text-[64px]">
                {s.value}
              </p>
              <p className="text-[16px] leading-[29px] tracking-[0.6px] md:text-[20px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}