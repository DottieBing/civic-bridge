import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  LaptopMinimalCheck,
  Scale,
  Wifi,
} from "lucide-react";
import Container from "@/components/ui/Container";

const iconProps = { size: 26, strokeWidth: 1.5, className: "text-navy" };

const cards = [
  {
    title: "Elections and Electoral Integrity",
    body: "We support credible elections through citizen observation, public education, electoral reform advocacy, and evidence-based engagement.",
    cta: "Explore election work",
    href: "/programs",
    icon: <LaptopMinimalCheck {...iconProps} />,
    cell: "border-b md:border-r pl-6 md:pl-16 bg-[#eef9f9]/[0.66]",
  },
  {
    title: "Civic Education and Engagement",
    body: "We equip citizens with the knowledge, tools, and platforms needed to participate meaningfully in governance and community development.",
    cta: "Explore civic education",
    href: "/programs",
    icon: <GraduationCap {...iconProps} size={28} />,
    cell: "border-b pl-6 md:pl-[46px]",
  },
  {
    title: "Legislative Advocacy",
    body: "We use research and stakeholder engagement to advance inclusive laws, human rights, social justice, and democratic accountability.",
    cta: "Explore election work",
    href: "/programs",
    icon: <Scale {...iconProps} />,
    cell: "border-b md:border-b-0 md:border-r pl-6 md:pl-16",
  },
  {
    title: "Digital Democracy",
    body: "We use technology to improve public participation, strengthen transparency, and connect citizens with leaders and institutions.",
    cta: "Explore digital democracy",
    href: "/programs",
    icon: (
      <span className="grid size-[30px] place-items-center rounded-[9px] border-[1.5px] border-navy">
        <Wifi size={16} strokeWidth={1.75} className="text-navy" />
      </span>
    ),
    cell: "pl-6 md:pl-[46px] bg-[#eef9f9]/[0.66]",
  },
];

export default function WhatWeDo() {
  return (
    <section className="pb-20 pt-[67px] lg:pb-[166px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          What we do
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:mt-[65px] lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[559px] text-[40px] leading-none tracking-[-0.6639px] text-navy md:text-[54px] xl:text-[66.393px]">
            We strengthen the systems that connect people to power.
          </h2>
          <p className="max-w-[508px] text-[18px] leading-[34px] tracking-[0.6px] text-black lg:translate-y-5 xl:text-[20px]">
            Our work combines civic education, research, advocacy, technology,
            and community participation to make governance more transparent,
            inclusive, and responsive.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-[38px] border border-black md:grid-cols-2 lg:mt-[131px]">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`flex flex-col border-black py-10 pr-6 md:min-h-[448px] md:py-[62px] md:pr-8 ${c.cell}`}
            >
              <div className="grid size-[71px] place-items-center rounded-[16px] bg-[rgba(155,198,199,0.66)]">
                {c.icon}
              </div>

              <h3 className="mt-[27px] text-[24px] font-medium leading-[32px] tracking-[-0.28px] text-navy md:text-[28px]">
                {c.title}
              </h3>

              <div className="mt-[22px] flex max-w-[550px] md:h-[111px] md:items-center">
                <p className="text-[16px] leading-[37px] tracking-[0.54px] text-black md:text-[18px]">
                  {c.body}
                </p>
              </div>

              <Link
                href={c.href}
                className="mt-[13px] inline-flex w-fit items-center gap-[7px] py-[9px] text-[18px] font-bold leading-[30px] text-navy transition hover:opacity-70"
              >
                {c.cta}
                <ArrowRight size={21} strokeWidth={1.75} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}