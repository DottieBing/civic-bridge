import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const posts = [
  {
    image: "/images/insight-1.jpg",
    tag: "Analysis",
    title: "Why local government matters more than we think",
    body: "Sub-national institutions shape day-to-day citizen experience more than most national reforms.",
    meta: "CBA Research·May 2026·8 min",
  },
  {
    image: "/images/insight-2.jpg",
    tag: "Explainer",
    title: "How a bill becomes law in Nigeria — visualised",
    body: "A step-by-step visual explainer of the legislative process and where citizens can weigh in.",
    meta: "Editorial·Apr 2026·6 min",
  },
  {
    image: "/images/insight-3.jpg",
    tag: "Commentary",
    title: "Digital tools that widen — not narrow — participation",
    body: "Notes from a fellowship on building civic technology that respects low-bandwidth realities.",
    meta: "Fellows Programme·Mar 2026·5 min",
  },
];

export default function Insights() {
  return (
    <section className="pb-20 pt-[100px] xl:pb-[192px] xl:pt-[149px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Insights
        </p>
        <h2 className="mt-[13px] max-w-[479px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Ideas, analysis, and civic perspectives.
        </h2>

        <div className="mt-[49px] grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[40px]">
          {posts.map((p) => (
            <Link key={p.title} href="/insights" className="group block">
              <div className="relative h-[323px] w-full max-w-[376px] overflow-hidden rounded-[44px] bg-navy">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="376px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-[61px] max-w-[407px]">
                <p className="text-[14px] uppercase leading-[37px] tracking-[5px] text-black sm:text-[18px] sm:tracking-[7.02px]">
                  {p.tag}
                </p>
                <h3 className="mt-3 text-[24px] font-medium leading-[30px] tracking-[-0.2828px] text-black md:text-[28.281px] md:leading-[33.937px]">
                  {p.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[30px] tracking-[0.54px] text-black md:text-[18px] md:leading-[37px]">
                  {p.body}
                </p>
                <p className="mt-4 text-[11px] uppercase leading-[12px] tracking-[2.2px] text-[#4d4d4d] sm:text-[12px] sm:tracking-[2.4px]">
                  {p.meta}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}