import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import ResearchForm from "@/components/admin/ResearchForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteResearch } from "../actions";
import type { Research } from "@/lib/types";

export default async function EditResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("research").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as Research;

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={`Edit: ${item.title}`} />
      <ResearchForm item={item} />
      <div className="mt-12 border-t border-black/10 pt-6">
        <DeleteButton action={deleteResearch} id={item.id} label="Delete this report" />
      </div>
    </div>
  );
}