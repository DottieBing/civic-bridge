import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import EventForm from "@/components/admin/EventForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteEvent } from "../actions";
import type { EventItem } from "@/lib/types";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as EventItem;

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={`Edit: ${item.title}`} />
      <EventForm item={item} />
      <div className="mt-12 border-t border-black/10 pt-6">
        <DeleteButton action={deleteEvent} id={item.id} label="Delete this event" />
      </div>
    </div>
  );
}