"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";

const filters = ["Upcoming", "Past", "Online", "In person"] as const;
type Filter = (typeof filters)[number];

type EventItem = {
  id: number;
  status: "upcoming" | "past";
  formats: ("Online" | "In person")[];
  month: string;
  day: string;
  year: string;
  label: string;
  title: string;
  body: string;
  meta: string;
  href: string;
};

// Placeholder content copied from the design — replace with real events.
const events: EventItem[] = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  status: "upcoming",
  formats: ["In person", "Online"],
  month: "Sept",
  day: "24",
  year: "2026",
  label: "Public forum",
  title: "Building citizen trust in democratic institutions",
  body: "A public convening bringing citizens, researchers, and public officials into structured dialogue.",
  meta: "CBA Research · May 2026 · 8 min",
  href: "#",
}));

function matches(e: EventItem, f: Filter) {
  if (f === "Upcoming") return e.status === "upcoming";
  if (f === "Past") return e.status === "past";
  return e.formats.includes(f);
}

export default function EventsList() {
  const [active, setActive] = useState<Filter>("Upcoming");
  const visible = events.filter((e) => matches(e, active));

  return (
    <>
      <FilterBar
        options={[...filters]}
        value={active}
        onChange={(v) => setActive(v as Filter)}
        align="center"
        compact
      />

      <section className="pb-16 pt-12 lg:pb-[203px] lg:pt-[149px]">
        <Container>
          {visible.length === 0 ? (
            <p className="text-center text-[18px] text-black">
              No {active.toLowerCase()} events right now. Check back soon.
            </p>
          ) : (
            <ul className="flex flex-col gap-6 lg:gap-[37px]">
              {visible.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col items-start gap-6 rounded-[36px] border border-black bg-white px-6 py-8 lg:flex-row lg:items-center lg:gap-[42px] lg:rounded-[54px] lg:px-[55px] lg:py-[57px]"
                >
                  {/* Date badge */}
                  <div
                    className="flex h-[139px] w-[200px] shrink-0 flex-col items-center justify-center rounded-[27px] bg-navy text-center"
                    aria-label={`${e.day} ${e.month} ${e.year}`}
                  >
                    <span className="text-[19px] font-normal uppercase leading-[22px] tracking-[1.5px] text-amber">
                      {e.month}
                    </span>
                    <span className="text-[40.6px] font-medium leading-[48px] text-white">
                      {e.day}
                    </span>
                    <span className="text-[15px] leading-[20px] text-white">
                      {e.year}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-normal uppercase leading-[22px] tracking-[1.8px] text-teal-label lg:text-[15px]">
                      {e.label}
                    </p>
                    <h2 className="mt-[10px] text-[22px] font-medium leading-[1.25] text-black md:text-[26px] lg:text-[32px] lg:leading-[40px]">
                      {e.title}
                    </h2>
                    <p className="mt-[13px] text-[15px] leading-[28px] text-black lg:text-[16px] lg:leading-[35px]">
                      {e.body}
                    </p>
                    <p className="mt-[14px] text-[11px] font-normal uppercase leading-[14px] tracking-[1.8px] text-[#4d4d4d] lg:text-[12.3px]">
                      {e.meta}
                    </p>
                  </div>

                  <Link
                    href={e.href}
                    className="inline-flex h-[49px] shrink-0 items-center gap-[7px] rounded-full bg-navy px-[26px] text-[16px] font-medium text-white transition hover:opacity-90"
                  >
                    Register
                    <ArrowRight size={13} strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}