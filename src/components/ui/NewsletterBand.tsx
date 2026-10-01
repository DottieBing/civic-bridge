import SubscribeForm from "@/components/ui/SubscribeForm";

export default function NewsletterBand() {
  return (
    <section className="bg-[#eef9f9] px-6 py-20 lg:py-[175px]">
      <div className="mx-auto w-full max-w-[665px]">
        <p className="text-[12px] font-medium uppercase leading-[30px] tracking-[1.68px] text-teal-label">
          Stay informed
        </p>
        <p className="text-[16px] leading-[35px] text-black lg:text-[17px]">
          Research, civic explainers, and event announcements.
        </p>
        <div className="mt-[22px]">
          <SubscribeForm variant="light" className="bg-white" />
        </div>
        <p className="mt-[22px] text-[12px] leading-[30px] text-black">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}