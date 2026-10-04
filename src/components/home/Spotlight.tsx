import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { Program } from "@/lib/types";

export default function Spotlight({ program }: { program: Program | null }) {
  if (!program) return null;

  const meta = [
    { label: "Location", value: program.location },
    { label: "Duration", value: program.duration },
    { label: "Audience", value: program.audience },
    { label: "Status", value: program.status },
  ].filter((m) => m.value);

  return (
    <section className="bg-teal-light/[0.12] pb-16 pt-16 xl:pb-[141px] xl:pt-[88px]">
      <Container className="grid gap-12 xl:grid-cols-[1.12fr_1fr] xl:gap-x-[56px] xl:gap-y-0 2xl:grid-cols-[645px_577px] 2xl:gap-x-[79px]">
        <div className="relative h-[420px] w-full max-w-[645px] overflow-hidden rounded-[40px] bg-navy sm:h-[504px] sm:rounded-[55px] xl:mt-[56px]">
          {program.cover_image && (
            <Image
              src={program.cover_image}
              alt=""
              fill
              sizes="(min-width: 1280px) 645px, 100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[199px] bg-gradient-to-b from-transparent to-black" />
          <div className="absolute bottom-[40px] left-6 right-6 sm:bottom-[74px] sm:left-[72px]">
            <p className="text-[12px] font-medium uppercase leading-[21.075px] tracking-[1.68px] text-amber">
              Featured initiative
            </p>
            <h3 className="mt-[12px] max-w-[407px] text-[28.281px] leading-[33.937px] tracking-[-0.2828px] text-white">
              {program.title}
            </h3>
          </div>
        </div>

        <div className="w-full max-w-[577px]">
          <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            Initiative spotlight
          </p>
          <h2 className="mt-[17px] max-w-[570px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
            {program.spotlight_headline || program.title}
          </h2>
          {program.summary && (
            <p className="mt-[27px] max-w-[550px] text-[18px] leading-[37px] tracking-[0.54px] text-black">
              {program.summary}
            </p>
          )}

          {meta.length > 0 && (
            <>
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
            </>
          )}

          <div className="mt-[29px]">
            <Button href={`/programs/${program.slug}`} variant="primary" icon="right">
              View Initiative
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}