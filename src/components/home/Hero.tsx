import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroNetwork from "@/components/home/HeroNetwork";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[560px] items-center py-16 lg:min-h-[846px]"
      style={{
        backgroundImage:
          "linear-gradient(-69.74deg, rgba(239,173,89,0.07) 7.08%, rgba(255,255,255,0.08) 47.71%, rgba(26,44,54,0.07) 100.49%)",
      }}
    >
      <Container className="flex flex-col items-start gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-[110px]">
        <div className="flex w-full max-w-[720px] flex-col gap-[54px]">
          <div className="flex flex-col gap-[51px]">
            <div className="flex max-w-[526px] flex-col gap-[35px]">
              <p className="font-satoshi text-[13px] font-black uppercase leading-[10px] tracking-[7.15px] text-navy lg:whitespace-nowrap">
                AFRICA · CITIZENSHIP · PUBLIC VALUE
              </p>
              <h1 className="text-[44px] font-normal leading-[1] tracking-[-0.7224px] text-navy md:text-[60px] lg:text-[72.24px]">
                Bridging citizens and governance{" "}
                <span className="italic text-teal">across Africa.</span>
              </h1>
            </div>
            <p className="text-[18px] leading-[31px] tracking-[0.6094px] text-black lg:text-[20.313px]">
              Civic Bridge Africa equip citizens with the knowledge, platforms,
              and opportunities to participate meaningfully in governance and
              hold institutions accountable.
            </p>
          </div>

          <div className="flex w-full max-w-[639px] flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <Button href="/programs" variant="primary" icon="right">
              Explore our work
            </Button>
            <Button href="/get-involved" variant="outline">
              Get involved
            </Button>
            <Button href="/research" variant="link" icon="up-right">
              View our latest research
            </Button>
          </div>
        </div>

        <HeroNetwork />
      </Container>

      <p className="absolute bottom-[58px] right-6 hidden text-[8px] leading-[14px] tracking-[1.6px] text-black lg:block xl:right-[85px]">
        Operational base: Nigeria
        <br />
        Working across Africa
      </p>
    </section>
  );
}