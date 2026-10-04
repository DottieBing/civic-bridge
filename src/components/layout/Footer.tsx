import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SubscribeForm from "@/components/ui/SubscribeForm";
import { getSettings } from "@/lib/content";

const columns = [
  {
    title: "About",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Mission and Vision", href: "/about" },
      { label: "Leadership", href: "/about" },
      { label: "Team", href: "/about" },
      { label: "Partners", href: "/about" },
      { label: "Governance", href: "/about" },
    ],
  },
  {
    title: "Our Work",
    links: [
      { label: "Elections Civic", href: "/programs" },
      { label: "Education", href: "/programs" },
      { label: "Legislative", href: "/programs" },
      { label: "Advocacy Digital", href: "/programs" },
      { label: "Democracy", href: "/programs" },
      { label: "Research", href: "/research" },
      { label: "Programs", href: "/programs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Publications", href: "/research" },
      { label: "Reports", href: "/research" },
      { label: "Policy Briefs", href: "/research" },
      { label: "Articles", href: "/insights" },
      { label: "News", href: "/insights" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/get-involved" },
      { label: "Partner", href: "/get-involved" },
      { label: "Donate", href: "/get-involved" },
      { label: "Careers", href: "/get-involved" },
      { label: "Contact", href: "/get-involved" },
    ],
  },
];

const legal = ["Privacy", "Term of use", "Accessibility", "Cookies"];

export default async function Footer() {
  const s = await getSettings();
  return (
    <footer className="bg-navy text-white">
      <Container className="pt-[80px] xl:pt-[150px]">
        <div className="grid gap-y-14 xl:min-h-[711px] xl:grid-cols-[440px_1fr] xl:gap-x-0 2xl:grid-cols-[531px_1fr]">
          {/* Left */}
          <div>
            <Image
              src="/images/logo-footer.svg"
              alt="Civic Bridge Africa"
              width={142}
              height={80}
              className="xl:mt-[5px]"
            />
            <p className="mt-[25px] max-w-[317px] text-[16.7px] leading-[31px]">
              {s.footer_about}
            </p>

            <div className="mt-[37px] max-w-[330px]">
              <p className="text-[14px] font-medium uppercase leading-[27px] tracking-[3px] text-teal-label">
                Newsletter
              </p>
              <p className="text-[18px] leading-[31.5px]">
                Research, civic explainers, and event announcements.
              </p>
            </div>

            <div className="mt-[55px]">
              <SubscribeForm variant="dark" />
            </div>
            <p className="mt-[37px] text-[16px] leading-[35px]">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_auto] xl:gap-x-0 2xl:grid-cols-[211px_211px_211px_136px]">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[15.1px] font-normal uppercase leading-[16px] tracking-[0.5px] text-teal-light">
                  {col.title}
                </h3>
                <ul className="mt-[21px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block text-[15.1px] leading-[58px] transition hover:text-teal-light"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/20 pb-16 pt-10 xl:flex-row xl:items-start xl:justify-between xl:pb-[121px] xl:pt-[53px]">
          <p className="max-w-[680px] text-[14px] leading-[35px]">
            {s.footer_copyright}
          </p>
          <ul className="flex flex-wrap gap-x-[52px] gap-y-2 text-[15.1px] leading-[35px] xl:pr-[14px]">
            {legal.map((l) => (
              <li key={l}>
                <Link href="#" className="transition hover:text-teal-light">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}