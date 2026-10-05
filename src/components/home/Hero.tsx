import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroNetwork from "@/components/home/HeroNetwork";
import HeroMobile from "@/components/home/HeroMobile";

export default function Hero({ note = [] }: { note?: string[] }) {
  return (
    <section
      className="relative flex items-center py-12 lg:min-h-[846px] lg:py-16"
      style={{
        backgroundImage:
          "linear-gradient(-69.74deg, rgba(239,173,89,0.07) 7.08%, rgba(255,255,255,0.08) 47.71%, rgba(26,44,54,0.07) 100.49%)",
      }}
    >
      <Container className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[110px]">
        <div className="flex w-full max-w-[720px] flex-col gap-8 lg:gap-[54px]">
          <div className="flex flex-col gap-6 lg:gap-[51px]">
            <div className="flex max-w-[526px] flex-col gap-5 lg:gap-[35px]">
              <p className="font-satoshi text-[11px] font-black uppercase leading-[16px] tracking-[3px] text-navy sm:text-[13px] sm:tracking-[5px] lg:whitespace-nowrap lg:leading-[10px] lg:tracking-[7.15px]">
                AFRICA · CITIZENSHIP · PUBLIC VALUE
              </p>
              <h1 className="text-[40px] font-normal leading-none tracking-[-0.7224px] text-navy sm:text-[52px] md:text-[60px] lg:text-[72.24px]">
                Bridging citizens and governance{" "}
                <span className="italic text-teal">across Africa.</span>
              </h1>
            </div>
            <p className="text-[18px] leading-[30px] tracking-[0.6094px] text-black lg:text-[20.313px] lg:leading-[31px]">
              Civic Bridge Africa equip citizens with the knowledge, platforms,
              and opportunities to participate meaningfully in governance and
              hold institutions accountable.
            </p>
          </div>

          <div className="flex w-full max-w-[639px] flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
            <Button href="/programs" variant="primary" icon="right" className="w-full justify-center sm:w-auto">
              Explore our work
            </Button>
            <Button href="/get-involved" variant="outline" className="w-full justify-center sm:w-auto">
              Get involved
            </Button>
            <Button href="/research" variant="link" icon="up-right" className="w-full justify-center sm:w-auto">
              View our latest research
            </Button>
          </div>
        </div>

        <HeroNetwork />
        <HeroMobile />
      </Container>

      <p className="absolute bottom-[58px] right-6 hidden text-[8px] leading-[14px] tracking-[1.6px] text-black lg:block xl:right-[85px]">
        {note.filter(Boolean).map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </section>
  );
}