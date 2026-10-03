"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";
import { eventParts, eventWhen } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

const filters = ["Upcoming", "Past", "Online", "In person"] as const;
type Filter = (typeof filters)[number];
type Row = EventItem & { upcoming: boolean };

function matches(e: Row, f: Filter) {
  if (f === "Upcoming") return e.upcoming;
  if (f === "Past") return !e.upcoming;
  return e.formats.includes(f);
}

export default function EventsList({ events }: { events: Row[] }) {
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
              {visible.map((e) => {
                const p = eventParts(e.starts_at);
                const when = eventWhen(e.starts_at, e.ends_at);
                const meta = [e.location, when.time].filter(Boolean).join(" · ");
                const canRegister = e.upcoming && e.registration_url;
                return (
                  <li
                    key={e.id}
                    className="relative flex flex-col items-start gap-6 rounded-[36px] border border-black bg-white px-6 py-8 transition hover:shadow-md lg:flex-row lg:items-center lg:gap-[42px] lg:rounded-[54px] lg:px-[55px] lg:py-[57px]"
                  >
                    <div
                      className="flex h-[139px] w-[200px] shrink-0 flex-col items-center justify-center rounded-[27px] bg-navy text-center"
                      aria-label={`${p.day} ${p.month} ${p.year}`}
                    >
                      <span className="text-[19px] font-normal uppercase leading-[22px] tracking-[1.5px] text-amber">
                        {p.month}
                      </span>
                      <span className="text-[40.6px] font-medium leading-[48px] text-white">
                        {p.day}
                      </span>
                      <span className="text-[15px] leading-[20px] text-white">
                        {p.year}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      {e.label && (
                        <p className="text-[14px] font-normal uppercase leading-[22px] tracking-[1.8px] text-teal-label lg:text-[15px]">
                          {e.label}
                        </p>
                      )}
                      <h2 className="mt-[10px] text-[22px] font-medium leading-[1.25] text-black md:text-[26px] lg:text-[32px] lg:leading-[40px]">
                        <Link
                          href={`/events/${e.slug}`}
                          className="after:absolute after:inset-0 after:rounded-[inherit]"
                        >
                          {e.title}
                        </Link>
                      </h2>
                      {e.summary && (
                        <p className="mt-[13px] text-[15px] leading-[28px] text-black lg:text-[16px] lg:leading-[35px]">
                          {e.summary}
                        </p>
                      )}
                      {meta && (
                        <p className="mt-[14px] text-[11px] font-normal uppercase leading-[14px] tracking-[1.8px] text-[#4d4d4d] lg:text-[12.3px]">
                          {meta}
                        </p>
                      )}
                    </div>

                    {canRegister ? (
                      <a
                        href={e.registration_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-flex h-[49px] shrink-0 items-center gap-[7px] rounded-full bg-navy px-[26px] text-[16px] font-medium text-white transition hover:opacity-90"
                      >
                        Register
                        <ArrowRight size={13} strokeWidth={1.75} />
                      </a>
                    ) : (
                      <span className="inline-flex h-[49px] shrink-0 items-center gap-[7px] rounded-full border border-navy px-[26px] text-[16px] font-medium text-navy">
                        Details
                        <ArrowRight size={13} strokeWidth={1.75} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}