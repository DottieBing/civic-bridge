import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

const cards = [
  {
    title: "Volunteer",
    body: "Contribute your skills, time, and ideas to civic programs and community initiatives.",
    cta: "Become a volunteer",
    href: "/get-involved",
  },
  {
    title: "Partner",
    body: "Collaborate with us on research, advocacy, civic education, and democratic innovation.",
    cta: "Partner with us",
    href: "/get-involved",
  },
  {
    title: "Support",
    body: "Help expand access to civic education, public-interest research, and citizen participation.",
    cta: "Support our work",
    href: "/get-involved",
  },
];

export default function GetInvolved() {
  return (
    <section className="bg-teal-light/20 py-16 xl:py-[153px]">
      <Container className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[45px]">
        {cards.map((c) => (
          <div
            key={c.title}
            className="flex min-h-[302px] w-full flex-col rounded-[36px] border border-navy bg-white px-8 py-[44px] font-satoshi sm:px-[43px]"
          >
            <h3 className="text-[28px] font-medium leading-[35px] text-black">
              {c.title}
            </h3>
            <p className="mt-4 min-h-[104px] max-w-[317px] text-[17px] leading-[34.7px] tracking-[0.3px] text-black">
              {c.body}
            </p>
            <Link
              href={c.href}
              className="inline-flex w-fit items-center gap-[7px] py-[15px] text-[20px] font-bold leading-[29px] text-navy transition hover:opacity-70"
            >
              {c.cta}
              <ArrowRight size={18} strokeWidth={1.75} />
            </Link>
          </div>
        ))}
      </Container>
    </section>
  );
}