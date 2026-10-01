import Container from "@/components/ui/Container";

const stats = [
  { value: "5,000+", label: "Citizens reached" },
  { value: "18", label: "Communities engaged" },
  { value: "1,200", label: "Volunteers mobilised" },
  { value: "12", label: "Reports published" },
  { value: "45", label: "Policy engagements", tinted: true },
  { value: "24", label: "Programmes delivered" },
];

export default function ImpactStatsGrid() {
  return (
    <section className="pb-16 pt-12 lg:pb-[164px] lg:pt-[181px]">
      <Container>
        <div className="grid grid-cols-1 overflow-hidden rounded-[40px] border border-black md:grid-cols-3 lg:rounded-[55px]">
          {stats.map((s, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            return (
              <div
                key={s.label}
                className={`flex min-h-[200px] items-center justify-center border-black px-6 md:min-h-[314px] ${
                  i < stats.length - 1 ? "border-b" : ""
                } ${row === 1 ? "md:border-b-0" : ""} ${
                  col < 2 ? "md:border-r" : ""
                } ${col === 0 ? "xl:justify-start xl:pl-[106px]" : ""} ${
                  s.tinted ? "bg-[#eef9f9]" : ""
                }`}
              >
                <div>
                  <p className="text-[44px] font-medium leading-[64px] text-navy md:text-[64px]">
                    {s.value}
                  </p>
                  <p className="mt-[18px] text-[18px] leading-[26px] text-navy">
                    {s.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}