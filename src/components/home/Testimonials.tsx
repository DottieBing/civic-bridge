import Image from "next/image";
import Container from "@/components/ui/Container";
import type { Testimonial } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

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
          {items.slice(0, 3).map((t) => (
            <figure
              key={t.id}
              className="flex min-h-[323px] w-full max-w-[376px] flex-col justify-between rounded-[36px] border border-black px-[39px] py-[50px]"
            >
              <blockquote className="text-[16px] leading-[30px] tracking-[0.54px] text-black md:text-[18px] md:leading-[37px]">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-[21px] flex items-center gap-5">
                <span className="relative grid size-[54px] shrink-0 place-items-center overflow-hidden rounded-full bg-navy text-[16px] text-white">
                  {t.photo_url ? (
                    <Image src={t.photo_url} alt={t.name} fill sizes="54px" className="object-cover" />
                  ) : (
                    initials(t.name)
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="text-[22px] leading-[30px] text-black md:text-[24px] md:leading-[37px]">
                    {t.name}
                  </span>
                  {t.role && (
                    <span className="text-[12px] leading-[14px] tracking-[0.36px] text-black">
                      {t.role}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}