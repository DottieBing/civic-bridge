export default function HeroMobile() {
  return (
    <div className="relative w-full lg:hidden">
      <svg
        aria-hidden="true"
        viewBox="0 0 360 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <g stroke="#1a2c36" strokeOpacity="0.3">
          <line x1="30" y1="50" x2="150" y2="25" />
          <line x1="150" y1="25" x2="320" y2="85" />
          <line x1="30" y1="50" x2="90" y2="170" />
          <line x1="90" y1="170" x2="205" y2="140" />
          <line x1="205" y1="140" x2="320" y2="85" />
          <line x1="205" y1="140" x2="335" y2="235" />
          <line x1="90" y1="170" x2="55" y2="265" />
          <line x1="55" y1="265" x2="205" y2="275" />
          <line x1="205" y1="275" x2="335" y2="235" />
          <line x1="150" y1="25" x2="205" y2="140" strokeDasharray="2 3" />
          <line x1="205" y1="140" x2="205" y2="275" strokeDasharray="2 3" />
        </g>
        <circle cx="30" cy="50" r="5" fill="#efad59" />
        <circle cx="150" cy="25" r="5" fill="#6fcdcf" />
        <circle cx="320" cy="85" r="5" fill="#000" />
        <circle cx="90" cy="170" r="5" fill="#6fcdcf" />
        <circle cx="205" cy="140" r="5" fill="#000" />
        <circle cx="335" cy="235" r="5" fill="#efad59" />
        <circle cx="55" cy="265" r="5" fill="#6fcdcf" />
        <circle cx="205" cy="275" r="5" fill="#000" />
      </svg>

      <div className="relative grid gap-4 py-10 sm:grid-cols-2">
        <div className="rounded-card border border-black/[0.08] bg-white px-5 py-[18px] font-satoshi shadow-sm">
          <p className="text-[12px] font-black tracking-[1.8px] text-teal-light">LIVE INDICATOR</p>
          <p className="mt-3 text-[30px] font-medium leading-none text-black">87%</p>
          <p className="mt-2 text-[13px] leading-[18px] text-black">
            Citizens who want more government transparency.
          </p>
        </div>
        <div className="rounded-card border border-black/[0.08] bg-white px-5 py-[18px] font-satoshi shadow-sm">
          <p className="text-[12px] font-black tracking-[1.8px] text-teal-light">POLICY BRIEF</p>
          <p className="mt-3 text-[15px] leading-[20px] text-black">
            Citizen trust and local governance in Nigeria.
          </p>
          <p className="mt-2 text-[12px] text-black/45">12 pages · PDF</p>
        </div>
      </div>
    </div>
  );
}