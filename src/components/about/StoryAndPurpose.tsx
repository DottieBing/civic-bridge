import Container from "@/components/ui/Container";

const story = [
  "Across Africa, the distance between citizens and the institutions that govern them has grown — often quietly, sometimes sharply. Civic Bridge Africa was formed to close that distance with evidence, education, and structured participation.",
  "We work with communities, researchers, policymakers, and civil society to strengthen the everyday practice of democracy. Our programs meet people where they are: in classrooms, in council halls, in polling units, and online.",
  "Operationally based in Nigeria, our research and programme work reach across the continent. Historical dates, founding details, and legal registration information are being finalised and will be published here.",
];

export default function StoryAndPurpose() {
  return (
    <>
      <section className="pb-16 pt-16 lg:pb-[156px] lg:pt-[115px]">
        <Container className="grid gap-10 lg:grid-cols-[1fr_640px] lg:gap-x-[20px]">
          <div>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
              Our story
            </p>
            <h2 className="mt-[38px] max-w-[640px] text-[40px] leading-[1.08] tracking-[-0.66px] text-navy md:text-[56px] lg:text-[66.4px] lg:leading-[72px]">
              A civic institution for the questions the moment demands.
            </h2>
          </div>

          <div className="flex flex-col gap-[30px] text-[18px] leading-[29.7px] tracking-[0.6px] text-black lg:text-[20px]">
            {story.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#eef9f9] py-16 lg:pb-[244px] lg:pt-[210px]">
        <Container className="grid gap-6 md:grid-cols-2 lg:gap-x-[28px]">
          <article className="flex min-h-[300px] items-center rounded-[28px] border border-teal-light/50 bg-white px-8 py-10 lg:min-h-[414px] lg:rounded-[34px] lg:pl-[90px] lg:pr-[75px]">
            <div>
              <p className="text-[14px] font-medium uppercase leading-[22px] tracking-[2.2px] text-teal-label lg:text-[15px]">
                Vision
              </p>
              <p className="mt-[20px] text-[24px] leading-[34px] text-navy lg:text-[32px] lg:leading-[43px]">
                An Africa where every citizen is informed, empowered, and
                actively engaged in shaping inclusive, accountable, and
                people-driven governance.
              </p>
            </div>
          </article>

          <article className="flex min-h-[300px] items-center rounded-[28px] bg-navy px-8 py-10 lg:min-h-[414px] lg:rounded-[34px] lg:pl-[90px] lg:pr-[75px]">
            <div>
              <p className="text-[14px] font-medium uppercase leading-[22px] tracking-[2.2px] text-amber lg:text-[15px]">
                Mission
              </p>
              <p className="mt-[20px] text-[24px] leading-[34px] text-white lg:text-[32px] lg:leading-[43px]">
                To foster citizen participation, strengthen civic education,
                and champion inclusive governance through research, advocacy,
                and community-driven initiatives.
              </p>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}