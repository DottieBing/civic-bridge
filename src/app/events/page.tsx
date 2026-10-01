import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import EventsList from "@/components/events/EventsList";

export const metadata: Metadata = {
  title: "Events | Civic Bridge Africa",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        label="Events"
        title="Conversations, learning, and civic action."
      />
      <EventsList />
    </>
  );
}