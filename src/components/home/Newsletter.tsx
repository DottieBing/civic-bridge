import Container from "@/components/ui/Container";
import SubscribeForm from "@/components/ui/SubscribeForm";

export default function Newsletter() {
  return (
    <section className="py-16 xl:pb-[241px] xl:pt-[178px]">
      <Container className="grid gap-12 xl:grid-cols-[1fr_1.6fr] xl:gap-[49px] 2xl:grid-cols-[480px_772px] 2xl:justify-between">
        <div className="xl:pt-[12px]">
          <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            Newsletter
          </p>
          <h2 className="mt-5 max-w-[480px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
            Stay informed. Stay engaged.
          </h2>
          <p className="mt-5 max-w-[480px] text-[16px] leading-[30px] tracking-[0.54px] text-black md:text-[18px] md:leading-[37px]">
            Receive new research, civic explainers, event announcements, and
            updates from Civic Bridge Africa.
          </p>
        </div>

        <div className="w-full max-w-[772px] rounded-[40px] border border-[#c3c3c3] bg-[#f9ffff] px-6 py-10 sm:rounded-[76px] sm:px-[57px] sm:py-[40px]">
          <p className="text-[12px] font-medium uppercase leading-[30px] tracking-[1.68px] text-teal-label">
            Newsletter
          </p>
          <p className="text-[16px] leading-[35px] text-black sm:text-[18px]">
            Research, civic explainers, and event announcements.
          </p>
          <div className="mt-[22px]">
            <SubscribeForm variant="light" />
          </div>
          <p className="mt-[22px] text-[12px] leading-[30px] text-black">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}