"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import FilterBar from "@/components/ui/FilterBar";
import ProgramCard from "@/components/programs/ProgramCard";
import { PROGRAM_CATEGORIES } from "@/lib/constants";
import type { Program } from "@/lib/types";

const categories = ["All programs", ...PROGRAM_CATEGORIES];

export default function ProgramsGrid({ programs }: { programs: Program[] }) {
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
              {programs.length === 0
                ? "Programs will appear here soon."
                : "No programs in this category yet."}
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[39px]">
              {visible.map((p) => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}