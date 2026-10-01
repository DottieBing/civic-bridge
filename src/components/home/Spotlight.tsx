import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const meta = [
  { label: "Location", value: "Nigeria · Pan-African" },
  { label: "Duration", value: "12 months" },
  { label: "Audience", value: "Ages 18–30" },
  { label: "Status", value: "Active cohort" },
];

export default function Spotlight() {
  return (
    <section className="bg-teal-light/[0.12] pb-16 pt-16 xl:pb-[141px] xl:pt-[88px]">
      <Container className="grid gap-12 xl:grid-cols-[1.12fr_1fr] xl:gap-x-[56px] xl:gap-y-0 2xl:grid-cols-[645px_577px] 2xl:gap-x-[79px]">
        {/* Photo card */}
        <div className="relative h-[420px] w-full max-w-[645px] overflow-hidden rounded-[40px] bg-navy sm:h-[504px] sm:rounded-[55px] xl:mt-[56px]">
          <Image
            src="/images/spotlight.jpg"
            alt="Young professionals reviewing charts on a tablet"
            fill
            sizes="(min-width: 1280px) 645px, 100vw"
            className="object-cover object-[67%_50%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-[199px] bg-gradient-to-b from-transparent to-black" />
          <div className="absolute bottom-[40px] left-6 right-6 sm:bottom-[74px] sm:left-[72px]">
            <p className="text-[12px] font-medium uppercase leading-[21.075px] tracking-[1.68px] text-amber">
              Featured initiative
            </p>
            <h3 className="mt-[12px] max-w-[407px] text-[28.281px] leading-[33.937px] tracking-[-0.2828px] text-white">
              Young Citizens for Accountable Governance
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="w-full max-w-[577px]">
          <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            Initiative spotlight
          </p>

          <h2 className="mt-[17px] max-w-[570px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
            Equipping young Africans with advocacy skills and civic platforms.
          </h2>

          <p className="mt-[27px] max-w-[550px] text-[18px] leading-[37px] tracking-[0.54px] text-black">
            A civic leadership and education initiative equipping young
            Africans with practical knowledge, advocacy skills, and platforms
            for constructive public participation.
          </p>

          <div className="mt-[39px] h-px w-full bg-navy/50" />

          <dl className="mt-[45px] grid grid-cols-2 gap-x-6 gap-y-[15px] sm:grid-cols-[335px_1fr]">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
                  {m.label}
                </dt>
                <dd className="text-[18px] leading-[37px] tracking-[0.54px] text-black">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-[29px]">
            <Button href="/programs" variant="primary" icon="right">
              View Initiative
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}