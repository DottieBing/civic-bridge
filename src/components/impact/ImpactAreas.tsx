import Container from "@/components/ui/Container";

const desc =
  "A short description of how this area is measured and reported across our programmes.";

const areas = [
  { n: "01", title: "Knowledge" },
  { n: "02", title: "Participation" },
  { n: "03", title: "Accountability" },
  { n: "04", title: "Policy influence" },
  { n: "05", title: "Youth leadership" },
  { n: "06", title: "Digital access" },
];

export default function ImpactAreas() {
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
          {areas.map((a) => (
            <div
              key={a.n}
              className="min-h-[201px] rounded-[24px] border border-black/30 bg-white px-[39px] py-[37px]"
            >
              <p className="text-[14px] leading-[14px] text-teal-label">{a.n}</p>
              <h3 className="mt-[13px] text-[20px] font-normal leading-[28px] text-black">
                {a.title}
              </h3>
              <p className="mt-[11px] max-w-[290px] text-[16px] leading-[19px] text-[#4d4d4d]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}