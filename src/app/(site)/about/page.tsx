import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StoryAndPurpose from "@/components/about/StoryAndPurpose";
import ValuesAndPractice from "@/components/about/ValuesAndPractice";
import ReachAndTeam from "@/components/about/ReachAndTeam";
import Leadership from "@/components/about/Leadership";
import PublicDocuments from "@/components/about/PublicDocuments";
import { getDocuments, getTeam } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About | Civic Bridge Africa",
};

export default async function AboutPage() {
  const [team, docs] = await Promise.all([getTeam(), getDocuments("public")]);
  return (
    <>
      <PageHero
        label="About"
        title="Building stronger connections between citizens and governance."
        description="Civic Bridge Africa is a nonprofit civic hub advancing informed participation, accountable leadership, and inclusive governance across Africa."
      />
      <StoryAndPurpose />
      <ValuesAndPractice />
      <ReachAndTeam team={team} />
      <Leadership team={team} />
      <PublicDocuments docs={docs} />
    </>
  );
}