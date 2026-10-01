import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

const AFRICA_PATH =
  "M96.1 0.0 C92.1 0.0 87.2 -0.1 83.3 0.0 C77.8 1.5 72.6 6.0 66.2 3.9 C63.3 2.9 60.7 1.5 57.7 0.9 C55.2 3.5 52.7 6.0 50.0 8.3 C47.1 10.8 43.2 13.2 40.9 16.2 C38.2 19.8 38.6 25.0 35.4 28.4 C32.3 31.5 27.4 31.4 23.9 33.8 C20.9 36.0 19.4 39.9 17.1 42.7 C15.4 44.8 12.9 45.7 11.1 47.5 C9.3 49.2 5.3 57.6 4.7 60.0 C4.6 60.5 4.6 61.0 4.6 61.5 C4.7 65.2 6.3 68.1 6.0 72.3 C5.7 76.6 4.0 80.6 2.2 84.5 C1.4 86.1 0.2 88.0 0.0 89.8 C-0.2 91.5 0.7 93.8 1.3 95.4 C5.6 106.5 15.8 119.3 24.6 127.3 C27.8 130.2 34.0 135.3 38.6 135.1 C41.0 135.0 43.1 133.6 45.6 133.4 C49.6 133.1 53.8 133.3 57.9 133.4 C59.8 133.4 61.8 133.5 63.7 133.2 C65.0 133.0 68.3 130.6 69.9 129.8 C73.9 127.8 82.8 125.6 86.5 128.8 C88.5 130.6 89.6 133.7 92.1 134.7 C96.9 136.7 109.1 131.4 109.6 141.0 C109.8 146.7 106.0 152.1 106.7 157.5 C107.6 163.9 114.6 168.1 118.0 173.3 C121.8 179.1 125.7 188.7 127.1 195.4 C127.5 197.3 127.8 199.4 127.5 201.3 C127.1 203.3 126.0 205.2 125.0 206.9 C122.1 211.9 118.6 217.0 118.6 223.0 C118.7 230.8 125.8 236.8 128.4 243.9 C131.1 250.8 131.1 258.5 134.1 265.3 C136.1 269.8 139.2 273.1 141.6 277.1 C142.7 278.8 143.6 280.8 144.1 282.7 C144.6 284.7 144.1 289.3 145.5 290.6 C148.3 292.9 174.7 291.0 178.9 290.1 C183.9 289.0 189.1 283.5 192.1 279.6 C195.8 275.0 198.8 270.5 201.4 265.1 C202.7 262.5 203.7 259.4 205.7 257.2 C207.6 255.2 212.2 254.6 213.4 252.2 C214.7 249.6 214.4 244.6 214.2 241.8 C214.0 240.3 213.6 238.2 212.5 237.2 C211.5 236.4 211.1 237.2 210.7 236.5 C213.9 231.8 220.1 227.5 225.2 225.3 C233.5 221.7 235.4 217.6 235.7 208.6 C235.8 205.2 235.8 200.8 235.4 197.4 C235.1 195.7 233.8 194.1 233.4 192.4 C231.8 186.2 230.0 177.1 231.8 170.8 C235.8 156.5 251.6 148.7 261.2 138.5 C268.9 130.3 274.8 120.0 277.7 109.1 C278.6 105.7 278.7 103.3 279.2 100.0 C276.1 100.2 275.6 100.5 272.0 101.3 C265.9 102.8 254.8 108.4 248.8 105.7 C247.7 105.2 246.0 100.0 244.5 98.3 C240.3 93.5 235.5 91.7 231.2 86.9 C228.6 84.0 228.4 79.6 226.6 77.6 C224.3 75.1 222.1 75.1 219.8 71.2 C217.7 67.4 218.4 62.3 216.3 59.4 C211.8 53.0 203.5 46.4 202.3 38.1 C202.1 36.6 203.1 35.1 203.3 33.9 C203.8 31.5 203.4 25.0 202.3 23.0 C201.5 22.3 190.5 20.8 189.4 21.1 C181.0 23.6 172.5 23.1 164.3 20.2 C161.9 19.4 159.4 17.4 157.0 16.5 C150.5 17.3 150.1 21.2 150.2 26.9 C146.8 26.6 144.9 26.4 141.6 25.4 C136.3 23.7 131.9 19.9 126.6 18.1 C122.6 16.8 117.8 17.3 114.3 13.8 C114.0 13.5 113.7 13.0 113.5 12.5 C114.0 11.7 115.2 11.4 115.7 10.5 C117.6 7.5 118.3 3.4 118.9 0.0 L96.1 0.0 Z";

function AfricaMap() {
  return (
    <svg
      viewBox="-4 -4 288 299"
      className="h-auto w-[230px] sm:w-[286px]"
      role="img"
      aria-label="Map of Africa with Nigeria headquarters marked"
    >
      <path
        d={AFRICA_PATH}
        fill="none"
        stroke="#1a2c36"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="102.4" cy="117" r="12" fill="#efad59" fillOpacity="0.3" />
      <circle cx="102.4" cy="117" r="6" fill="#efad59" />
      <text
        x="122.4"
        y="121"
        fontSize="12"
        fill="#1a2c36"
        className="font-satoshi"
      >
        Nigeria · HQ
      </text>
    </svg>
  );
}

export default function ReachAndTeam() {
  return (
    <>
      <section className="py-16 lg:py-[183px]">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_772px] lg:gap-x-[30px]">
          <div>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
              Geographic focus
            </p>
            <h2 className="mt-[15px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
              Rooted in Nigeria. Reaching across Africa.
            </h2>
            <p className="mt-[21px] max-w-[490px] text-[18px] leading-[32px] tracking-[0.6px] text-black lg:text-[20px] lg:leading-[37px]">
              Our operational base is in Nigeria. Our research, publications,
              and programme partnerships extend to civic institutions and
              communities across the continent.
            </p>
          </div>

          <div className="grid min-h-[400px] w-full place-items-center rounded-[40px] bg-[#f4fbfb] lg:h-[652px] lg:rounded-[55px]">
            <AfricaMap />
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 lg:py-[146px]">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_650px]">
          <div>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-amber">
              Our team
            </p>
            <h2 className="mt-[13px] max-w-[620px] text-[32px] leading-[1.2] tracking-[-0.4px] text-white md:text-[40px] md:leading-[48px]">
              A team of researchers, educators, and civic organisers.
            </h2>
            <p className="mt-[18px] max-w-[545px] text-[18px] leading-[32px] text-white lg:text-[20px] lg:leading-[37px]">
              Meet the people guiding our research, programmes, and
              partnerships.
            </p>
            <Link
              href="#"
              className="mt-[34px] inline-flex h-[48px] items-center gap-2 rounded-full bg-white px-[51px] text-[15px] font-bold text-navy transition hover:brightness-95"
            >
              Meet our leadership
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </div>

          {/* Placeholder tiles — swap for team photos when available */}
          <div className="grid grid-cols-2 gap-[30px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[310/307] rounded-[56px] border border-white/15 bg-[#31414a]"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}