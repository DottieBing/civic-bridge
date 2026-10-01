type Node = {
  id: string;
  x: number;
  y: number;
  color: string;
  label: string;
  lx: number;
  ly: number;
};

const AMBER = "#efad59";
const TEAL = "#6fcdcf";
const BLACK = "#000";

const nodes: Node[] = [
  { id: "citizens", x: 40, y: 138, color: AMBER, label: "Citizens", lx: 51, ly: 138 },
  { id: "research", x: 203, y: 122, color: TEAL, label: "Research", lx: 214.9, ly: 116.6 },
  { id: "institutions", x: 349, y: 172, color: BLACK, label: "Institutions", lx: 361.7, ly: 167.4 },
  { id: "dialogue", x: 107, y: 264, color: TEAL, label: "Dialogue", lx: 119, ly: 258 },
  { id: "policy", x: 268, y: 300, color: BLACK, label: "Policy", lx: 279.9, ly: 294.6 },
  { id: "accountability", x: 393, y: 349, color: AMBER, label: "Accountability", lx: 404.6, ly: 343.3 },
  { id: "community", x: 57, y: 393, color: TEAL, label: "Community", lx: 69.2, ly: 387.8 },
  { id: "participation", x: 203, y: 413, color: BLACK, label: "Participation", lx: 214.9, ly: 409 },
];

const solid: [string, string][] = [
  ["research", "institutions"],
  ["research", "dialogue"],
  ["institutions", "policy"],
  ["dialogue", "policy"],
  ["dialogue", "community"],
  ["citizens", "community"],
  ["policy", "accountability"],
  ["participation", "accountability"],
  ["community", "participation"],
];

const dotted: [string, string][] = [
  ["citizens", "research"],
  ["research", "policy"],
  ["policy", "participation"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function HeroNetwork() {
  return (
    <div
      className="relative hidden h-[501px] w-[470px] shrink-0 lg:block"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0"
        width="470"
        height="501"
        viewBox="0 0 470 501"
        fill="none"
      >
        {solid.map(([a, b]) => (
          <line
            key={a + b}
            x1={byId[a].x}
            y1={byId[a].y}
            x2={byId[b].x}
            y2={byId[b].y}
            stroke="#1a2c36"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
        ))}
        {dotted.map(([a, b]) => (
          <line
            key={a + b}
            x1={byId[a].x}
            y1={byId[a].y}
            x2={byId[b].x}
            y2={byId[b].y}
            stroke="#1a2c36"
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        ))}
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r="4.5" fill={n.color} />
        ))}
      </svg>

      {nodes.map((n) => (
        <span
          key={n.id}
          className="absolute font-satoshi text-[9.8px] leading-[9.8px] tracking-[-0.098px] text-black"
          style={{ left: n.lx, top: n.ly }}
        >
          {n.label}
        </span>
      ))}

      {/* Live indicator card */}
      <div className="absolute left-[261px] top-0 flex h-[152.6px] items-center rounded-card border border-black/[0.08] bg-white px-[21px] py-[9.7px]">
        <div className="flex flex-col gap-[14.5px]">
          <p className="font-satoshi text-[12.58px] font-black leading-[9.7px] tracking-[1.887px] text-teal-light">
            LIVE INDICATOR
          </p>
          <div className="flex flex-col gap-[6.8px]">
            <p className="font-satoshi text-[23px] font-medium leading-[22.7px] tracking-[0.69px] text-black">
              87%
            </p>
            <p className="w-[113px] font-satoshi text-[12.58px] leading-[15.5px] tracking-[0.377px] text-black">
              Citizens who want more government transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Policy brief card */}
      <div className="absolute left-0 top-[409px] flex items-center rounded-card border border-black/[0.08] bg-white p-[15.5px]">
        <div className="flex flex-col gap-[14.5px]">
          <p className="text-[12.58px] font-bold leading-[9.7px] tracking-[1.887px] text-teal-light">
            POLICY BRIEF
          </p>
          <div className="flex flex-col gap-[6.8px]">
            <p className="w-[140px] text-[12.58px] leading-[15.5px] tracking-[0.377px] text-black">
              Citizen trust and local governance in Nigeria.
            </p>
            <p className="w-[113px] text-[11.6px] leading-[15.5px] tracking-[0.348px] text-black/45">
              12 pages · PDF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}