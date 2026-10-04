import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ImpactStatsGrid from "@/components/impact/ImpactStatsGrid";
import ImpactAreas from "@/components/impact/ImpactAreas";
import CaseStudies from "@/components/impact/CaseStudies";
import AnnualReports from "@/components/impact/AnnualReports";
import {
  getCaseStudies,
  getDocuments,
  getImpactAreas,
  getStats,
  getTeam,
} from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impact | Civic Bridge Africa",
};

export default async function ImpactPage() {
  const [studies, stats, areas, docs, team] = await Promise.all([
    getCaseStudies(),
    getStats(),
    getImpactAreas(),
    getDocuments("annual"),
    getTeam(),
  ]);

  return (
    <>
      <PageHero
        wide
        label="Impact"
        title="Measuring participation, progress, and public value."
        description="We measure impact through inputs, activities, outputs, and outcomes — and we publish what we learn openly."
      />
      <ImpactStatsGrid stats={stats} />
      <ImpactAreas areas={areas} />
      <CaseStudies studies={studies} />
      <AnnualReports docs={docs} hasTeam={team.length > 0} />
    </>
  );
}