import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "Events", href: "/events" },
  { label: "Impact", href: "/impact" },
];

const AMBER = "#efad59";
const TEAL = "#6fcdcf";
const BLACK = "#000";

const nodes = [
  { id: "home", x: 40, y: 310, color: AMBER, label: "Home" },
  { id: "about", x: 150, y: 200, color: TEAL, label: "About" },
  { id: "programs", x: 280, y: 255, color: BLACK, label: "Programs" },
  { id: "research", x: 392, y: 150, color: TEAL, label: "Research" },
];
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const solid: [string, string][] = [
  ["home", "about"],
  ["about", "programs"],
  ["programs", "research"],
];
const dotted: [string, string][] = [
  ["home", "programs"],
  ["about", "research"],
];
const LOST = { x: 425, y: 350 };

function LostNetwork() {
  return (
    <div className="relative hidden h-[420px] w-[470px] shrink-0 lg:block" aria-hidden="true">
      <svg className="absolute inset-0" width="470" height="420" viewBox="0 0 470 420" fill="none">
        {solid.map(([a, b]) => (
          <line key={a + b} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
            stroke="#1a2c36" strokeOpacity="0.6" />
        ))}
        {dotted.map(([a, b]) => (
          <line key={a + b} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
            stroke="#1a2c36" strokeOpacity="0.6" strokeDasharray="2 3" />
        ))}

        {/* The broken link */}
        <line x1={byId.programs.x} y1={byId.programs.y} x2={LOST.x} y2={LOST.y}
          stroke={AMBER} strokeWidth="1.5" strokeDasharray="6 6" className="anim-march" />

        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r="5" fill={n.color} />
        ))}

        {/* The missing page */}
        <circle cx={LOST.x} cy={LOST.y} r="11" stroke={AMBER} strokeWidth="1.5" className="anim-pulse" />
        <circle cx={LOST.x} cy={LOST.y} r="11" fill="#fff" stroke={AMBER} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={LOST.x} y={LOST.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a2c36">
          ?
        </text>
      </svg>

      {nodes.map((n) => (
        <span key={n.id}
          className="absolute font-satoshi text-[10px] leading-[10px] tracking-[-0.1px] text-black"
          style={{ left: n.x + 11, top: n.y - 4 }}>
          {n.label}
        </span>
      ))}
      <span className="absolute font-satoshi text-[10px] font-bold leading-[10px] text-navy"
        style={{ left: LOST.x - 40, top: LOST.y + 20 }}>
        This page
      </span>

      <div className="anim-drift absolute left-0 top-0 rounded-card border border-black/[0.08] bg-white px-[21px] py-[18px]">
        <p className="font-satoshi text-[12.58px] font-black leading-[10px] tracking-[1.887px] text-teal-light">
          STATUS
        </p>
        <p className="mt-[14px] font-satoshi text-[30px] font-medium leading-[30px] tracking-[0.69px] text-black">
          404
        </p>
        <p className="mt-[8px] w-[120px] font-satoshi text-[12.58px] leading-[15.5px] tracking-[0.377px] text-black">
          We couldn&apos;t find that page.
        </p>
      </div>
    </div>
  );
}

function NotFoundContent() {
  return (
    <section
      className="relative flex min-h-[640px] items-center overflow-hidden py-20 lg:min-h-[780px]"
      style={{
        backgroundImage:
          "linear-gradient(-69.74deg, rgba(239,173,89,0.07) 7.08%, rgba(255,255,255,0.08) 47.71%, rgba(26,44,54,0.07) 100.49%)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none text-[200px] font-bold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(26,44,54,0.09)] md:text-[340px] lg:text-[460px]"
      >
        404
      </span>

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1fr_470px] lg:gap-[90px]">
        <div className="max-w-[640px]">
          <p className="font-satoshi text-[13px] font-black uppercase leading-[10px] tracking-[7.15px] text-navy">
            Error · 404
          </p>
          <h1 className="mt-[35px] text-[44px] leading-none tracking-[-0.7224px] text-navy md:text-[60px] lg:text-[72.24px]">
            This page has gone{" "}
            <span className="italic text-teal">off the map.</span>
          </h1>
          <p className="mt-8 max-w-[520px] text-[18px] leading-[31px] tracking-[0.6094px] text-black lg:mt-[44px] lg:text-[20px]">
            The link may be broken, or the page may have moved. Let&apos;s get
            you back to something useful.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-[48px]">
            <Button href="/" variant="primary" icon="right">
              Back to home
            </Button>
            <Button href="/research" variant="outline">
              Browse our research
            </Button>
          </div>

          <div className="mt-12 lg:mt-[56px]">
            <p className="text-[12px] font-medium uppercase leading-[20px] tracking-[1.68px] text-teal-label">
              Or try one of these
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block rounded-full border border-navy/30 bg-white/60 px-[18px] py-[8px] text-[14px] text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <LostNetwork />
      </Container>
    </section>
  );
}