import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StoryAndPurpose from "@/components/about/StoryAndPurpose";
import ValuesAndPractice from "@/components/about/ValuesAndPractice";
import ReachAndTeam from "@/components/about/ReachAndTeam";
import PublicDocuments from "@/components/about/PublicDocuments";

export const metadata: Metadata = {
  title: "About | Civic Bridge Africa",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Building stronger connections between citizens and governance."
        description="Civic Bridge Africa is a nonprofit civic hub advancing informed participation, accountable leadership, and inclusive governance across Africa."
      />
      <StoryAndPurpose />
      <ValuesAndPractice />
      <ReachAndTeam />
      <PublicDocuments />
    </>
  );
}