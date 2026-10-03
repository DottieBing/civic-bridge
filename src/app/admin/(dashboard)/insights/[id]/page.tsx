import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import InsightForm from "@/components/admin/InsightForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteInsight } from "../actions";
import type { Insight } from "@/lib/types";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("insights").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as Insight;

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={`Edit: ${item.title}`} />
      <InsightForm item={item} />
      <div className="mt-12 border-t border-black/10 pt-6">
        <DeleteButton action={deleteInsight} id={item.id} label="Delete this article" />
      </div>
    </div>
  );
}