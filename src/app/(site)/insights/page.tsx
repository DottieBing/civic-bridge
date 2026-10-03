import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import InsightsLibrary from "@/components/insights/InsightsLibrary";
import { getInsights } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights | Civic Bridge Africa",
};

export default async function InsightsPage() {
  const posts = await getInsights();
  return (
    <>
      <PageHero
        label="Insights"
        title="Civic ideas, analysis, and public-interest perspectives."
        description="Our programs help citizens understand governance, participate effectively, influence policy, and build stronger democratic communities."
      />
      <InsightsLibrary posts={posts} />
    </>
  );
}