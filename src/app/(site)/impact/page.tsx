import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ImpactStatsGrid from "@/components/impact/ImpactStatsGrid";
import ImpactAreas from "@/components/impact/ImpactAreas";
import CaseStudies from "@/components/impact/CaseStudies";
import AnnualReports from "@/components/impact/AnnualReports";
import { getCaseStudies } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impact | Civic Bridge Africa",
};

export default async function ImpactPage() {
  const studies = await getCaseStudies();
  return (
    <>
      <PageHero
        wide
        label="Impact"
        title="Measuring participation, progress, and public value."
        description="We measure impact through inputs, activities, outputs, and outcomes — and we publish what we learn openly."
      />
      <ImpactStatsGrid />
      <ImpactAreas />
      <CaseStudies studies={studies} />
      <AnnualReports />
    </>
  );
}