import Container from "@/components/ui/Container";

export default function Purpose() {
  return (
    <section className="border-y border-black pb-16 pt-[74px] lg:pb-[157px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          01 / Our purpose
        </p>

        <div className="mt-10 grid gap-8 lg:mt-[65px] lg:grid-cols-[1fr_320px] lg:gap-12 2xl:grid-cols-[863px_396px] 2xl:gap-[59px]">
          <h2 className="text-[40px] leading-none tracking-[-0.6639px] text-navy md:text-[54px] xl:text-[66.393px]">
            Democracy works better when people can{" "}
            <span className="italic text-teal">understand it, enter it,</span>{" "}
            and shape it.
          </h2>

          <p className="text-[18px] leading-[29.8px] tracking-[0.6px] text-black xl:-mt-3 xl:text-[20px]">
            Civic Bridge Africa creates the connective infrastructure between
            public knowledge and public action—so institutions listen better
            and citizens participate with confidence.
          </p>
        </div>
      </Container>
    </section>
  );
}