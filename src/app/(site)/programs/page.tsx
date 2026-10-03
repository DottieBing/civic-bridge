import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProgramsGrid from "@/components/programs/ProgramsGrid";
import { getPrograms } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programs | Civic Bridge Africa",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <>
      <PageHero
        label="Programs"
        title="Programs that turn civic knowledge into public action."
        description="Our programs help citizens understand governance, participate effectively, influence policy, and build stronger democratic communities."
      />
      <ProgramsGrid programs={programs} />
    </>
  );
}