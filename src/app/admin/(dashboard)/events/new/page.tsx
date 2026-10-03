import { PageHeader } from "@/components/admin/ui";
import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title="New event" />
      <EventForm />
    </div>
  );
}