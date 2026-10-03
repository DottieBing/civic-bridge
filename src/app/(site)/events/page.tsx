import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import EventsList from "@/components/events/EventsList";
import { getEvents } from "@/lib/content";
import { isUpcoming } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events | Civic Bridge Africa",
};

export default async function EventsPage() {
  const rows = (await getEvents()).map((e) => ({ ...e, upcoming: isUpcoming(e) }));
  const upcoming = rows.filter((r) => r.upcoming); // soonest first
  const past = rows.filter((r) => !r.upcoming).reverse(); // most recent first

  return (
    <>
      <PageHero
        label="Events"
        title="Conversations, learning, and civic action."
      />
      <EventsList events={[...upcoming, ...past]} />
    </>
  );
}