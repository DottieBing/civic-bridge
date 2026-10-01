import Image from "next/image";
import Container from "@/components/ui/Container";

const testimonials = [
  {
    quote:
      "“The programme changed how I see my role in my community. I now understand how to engage local government constructively.”",
    name: "Adaeze O.",
    role: "Programme participant · Enugu",
    image: "/images/testimonial-1.png",
  },
  {
    quote:
      "“The research is grounded, and the recommendations are practical enough to move into policy conversations quickly.”",
    name: "Ibrahim S.",
    role: "Policy analyst · Abuja",
    image: "/images/testimonial-2.png",
  },
  {
    quote:
      "“Their civic education material meets people where they are. Accessible, respectful, and thoroughly African.”",
    name: "Fatima B.",
    role: "Educator · Kano",
    image: "/images/testimonial-3.png",
  },
];

export default function Testimonials() {
  return (
    <section className="pb-20 pt-[100px] xl:pb-[192px] xl:pt-[212px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Upcoming event
        </p>
        <h2 className="mt-[19px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          What participants say.
        </h2>

        <div className="mt-[65px] grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-[86px]">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex min-h-[323px] w-full max-w-[376px] flex-col justify-between rounded-[55px] border border-black px-[39px] py-[50px]"
            >
              <blockquote className="text-[16px] leading-[30px] tracking-[0.54px] text-black md:text-[18px] md:leading-[37px]">
                {t.quote}
              </blockquote>

              <figcaption className="mt-[21px] flex items-center gap-5">
                <span className="relative size-[54px] shrink-0 overflow-hidden rounded-full bg-navy/10">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="54px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[22px] leading-[30px] text-black md:text-[24px] md:leading-[37px]">
                    {t.name}
                  </span>
                  <span className="text-[12px] leading-[14px] tracking-[0.36px] text-black">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}