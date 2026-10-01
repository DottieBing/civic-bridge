import Container from "@/components/ui/Container";

type Props = {
  label: string;
  title: string;
  description?: string;
  wide?: boolean;
};

export default function PageHero({ label, title, description, wide }: Props) {
  return (
    <section
      className={`flex items-center border-b border-black/50 py-16 ${
        description ? "lg:min-h-[601px]" : "lg:min-h-[455px]"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(-69.74deg, rgba(239,173,89,0.07) 7.08%, rgba(255,255,255,0.08) 47.71%, rgba(26,44,54,0.07) 100.49%)",
      }}
    >
      <Container>
        <div
          className={`mx-auto w-full ${wide ? "max-w-[860px]" : "max-w-[812px]"}`}
        >
          <p className="text-[13px] font-medium uppercase leading-[21px] tracking-[1.82px] text-teal-label">
            {label}
          </p>
          <h1 className="mt-[32px] text-[44px] leading-none tracking-[-0.7224px] text-navy md:text-[60px] lg:text-[72.24px]">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-[18px] leading-[31px] tracking-[0.6094px] text-black lg:mt-[51px] lg:text-[20.313px]">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}