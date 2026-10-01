import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ImpactStatsGrid from "@/components/impact/ImpactStatsGrid";
import ImpactAreas from "@/components/impact/ImpactAreas";
import CaseStudies from "@/components/impact/CaseStudies";
import AnnualReports from "@/components/impact/AnnualReports";

export const metadata: Metadata = {
  title: "Impact | Civic Bridge Africa",
};

export default function ImpactPage() {
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
      <CaseStudies />
      <AnnualReports />
    </>
  );
}