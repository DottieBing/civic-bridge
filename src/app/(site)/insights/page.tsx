import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import InsightsLibrary from "@/components/insights/InsightsLibrary";

export const metadata: Metadata = {
  title: "Insights | Civic Bridge Africa",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Civic ideas, analysis, and public-interest perspectives."
        description="Our programs help citizens understand governance, participate effectively, influence policy, and build stronger democratic communities."
      />
      <InsightsLibrary />
    </>
  );
}