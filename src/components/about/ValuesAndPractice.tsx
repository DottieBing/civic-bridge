import Container from "@/components/ui/Container";

const values = [
  { n: "01", title: "Accountability", body: "We hold ourselves to the same transparency we advocate for." },
  { n: "02", title: "Inclusion", body: "Every civic space we build makes room for underrepresented voices." },
  { n: "03", title: "Integrity", body: "Evidence over advocacy convenience — always." },
  { n: "04", title: "Participation", body: "Change is legitimate when citizens shape it." },
  { n: "05", title: "Evidence", body: "Our recommendations begin and end with rigorous research.", tinted: true },
  { n: "06", title: "Collaboration", body: "We work with communities, institutions, and partners as equals." },
];

const stages = [
  { n: "01", title: "Participation" },
  { n: "02", title: "Education" },
  { n: "03", title: "Engagement" },
  { n: "04", title: "Advocacy" },
  { n: "05", title: "Impact" },
];

export default function ValuesAndPractice() {
  return (
    <>
      <section className="pb-16 pt-16 lg:pb-[184px] lg:pt-[153px]">
        <Container>
          <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            Our values
          </p>
          <h2 className="mt-[29px] max-w-[660px] text-[40px] leading-none tracking-[-0.66px] text-navy md:text-[56px] lg:text-[66.4px]">
            Six commitments that shape our work.
          </h2>

          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-[40px] border border-black md:grid-cols-3 lg:mt-[119px] lg:rounded-[55px]">
            {values.map((v, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              return (
                <div
                  key={v.n}
                  className={`min-h-[200px] border-black px-8 py-10 lg:min-h-[313px] lg:pb-[60px] lg:pl-[62px] lg:pr-[40px] lg:pt-[86px] ${
                    i < values.length - 1 ? "border-b" : ""
                  } ${row === 1 ? "md:border-b-0" : ""} ${
                    col < 2 ? "md:border-r" : ""
                  } ${v.tinted ? "bg-[#f3fbfb]" : ""}`}
                >
                  <p className="text-[12px] leading-[14px] text-teal-label">
                    {v.n}
                  </p>
                  <h3 className="mt-[15px] text-[24px] leading-[36px] text-black lg:text-[28px]">
                    {v.title}
                  </h3>
                  <p className="mt-[16px] max-w-[300px] text-[16px] leading-[30px] text-black lg:text-[18px] lg:leading-[37px]">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#eef9f9] pb-16 pt-16 lg:pb-[149px] lg:pt-[145px]">
        <Container>
          <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            How we work
          </p>
          <h2 className="mt-[29px] max-w-[600px] text-[40px] leading-none tracking-[-0.66px] text-navy md:text-[56px] lg:text-[66.4px]">
            Five stages, one connected practice.
          </h2>

          <div className="-mx-6 mt-10 flex gap-[29px] overflow-x-auto px-6 pb-2 lg:mx-0 lg:mt-[100px] lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {stages.map((s) => (
              <div
                key={s.n}
                className="h-[138px] w-[236px] shrink-0 rounded-[26px] border border-black/30 bg-white pl-[37px] pt-[35px] lg:w-auto"
              >
                <p className="text-[16px] leading-[18px] text-teal-label">
                  {s.n}
                </p>
                <p className="mt-[4px] text-[28px] leading-[34px] text-black">
                  {s.title}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}