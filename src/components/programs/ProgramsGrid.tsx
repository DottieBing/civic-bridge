"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";

const GRADIENT = "linear-gradient(135deg, #6fcdcf 0%, #c4fbf9 100%)";

const categories = [
  "All programs",
  "Elections",
  "Civic Education",
  "Advocacy",
  "Digital Democracy",
  "Youth",
  "Community",
];

// Placeholder content copied from the design — replace with real programs.
const programs = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  category: "Youth",
  status: "Active",
  title: "Young Citizens for Accountable Governance",
  body: "Civic leadership and advocacy skills for young Africans aged 18–30.",
  location: "Pan-African",
  reach: "500+ fellows engaged",
  href: "#",
}));

export default function ProgramsGrid() {
  const [active, setActive] = useState("All programs");
  const visible =
    active === "All programs"
      ? programs
      : programs.filter((p) => p.category === active);

  return (
    <>
      <FilterBar options={categories} value={active} onChange={setActive} />

      <section className="pb-24 pt-16 lg:pb-[280px] lg:pt-[149px]">
        <Container>
          {visible.length === 0 ? (
            <p className="text-[18px] text-black">
              No programs in this category yet.
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[39px]">
              {visible.map((p) => (
                <article
                  key={p.id}
                  className="flex w-full max-w-[407px] flex-col overflow-hidden rounded-[55px] border border-black/60 bg-white"
                >
                  <div
                    className="relative h-[343px]"
                    style={{ backgroundImage: GRADIENT }}
                  >
                    <span className="absolute left-[36px] top-[46px] rounded-full bg-white px-[24px] py-[9px] text-[12px] font-medium uppercase leading-[20px] tracking-[0.6px] text-black">
                      {p.category}
                    </span>
                    <span className="absolute right-[33px] top-[46px] rounded-full bg-amber px-[22px] py-[9px] text-[12px] font-medium leading-[20px] text-navy">
                      {p.status}
                    </span>
                  </div>

                  <div className="flex min-h-[327px] flex-col px-[36px] pt-[40px]">
                    <h3 className="text-[20px] font-medium leading-[27px] text-black">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-[300px] text-[14px] leading-[28px] tracking-[0.3px] text-black">
                      {p.body}
                    </p>

                    <div className="mt-[34px] flex items-center justify-between border-t border-black/15 pt-[14px] text-[10px] font-medium uppercase leading-[24px] tracking-[1px]">
                      <span className="inline-flex items-center gap-[6px] text-black/70">
                        <MapPin size={14} strokeWidth={1.5} />
                        {p.location}
                      </span>
                      <span className="text-teal-label">{p.reach}</span>
                    </div>

                    <Link
                      href={p.href}
                      className="mb-[42px] mt-auto inline-flex w-fit items-center gap-[7px] pt-[18px] text-[14px] font-bold leading-[30px] text-navy transition hover:opacity-70"
                    >
                      View program
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}