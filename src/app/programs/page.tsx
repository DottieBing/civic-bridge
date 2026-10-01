import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProgramsGrid from "@/components/programs/ProgramsGrid";

export const metadata: Metadata = {
  title: "Programs | Civic Bridge Africa",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        label="Programs"
        title="Programs that turn civic knowledge into public action."
        description="Our programs help citizens understand governance, participate effectively, influence policy, and build stronger democratic communities."
      />
      <ProgramsGrid />
    </>
  );
}