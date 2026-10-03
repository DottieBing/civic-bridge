import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ResearchLibrary from "@/components/research/ResearchLibrary";
import NewsletterBand from "@/components/ui/NewsletterBand";
import { getResearch } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Research | Civic Bridge Africa",
};

export default async function ResearchPage() {
  const reports = await getResearch();
  return (
    <>
      <PageHero
        label="Research"
        title="Evidence for better governance."
        description="Explore research reports, policy briefs, civic explainers, toolkits, and data-driven insights on democracy, participation, accountability, and public institutions."
      />
      <ResearchLibrary reports={reports} />
      <NewsletterBand />
    </>
  );
}