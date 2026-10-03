import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteCaseStudy } from "../actions";
import type { CaseStudy } from "@/lib/types";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as CaseStudy;

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={`Edit: ${item.title}`} />
      <CaseStudyForm item={item} />
      <div className="mt-12 border-t border-black/10 pt-6">
        <DeleteButton action={deleteCaseStudy} id={item.id} label="Delete this story" />
      </div>
    </div>
  );
}