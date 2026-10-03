import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import ProgramForm from "@/components/admin/ProgramForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProgram } from "../actions";
import type { Program } from "@/lib/types";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("programs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const program = data as Program;

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={`Edit: ${program.title}`} />
      <ProgramForm program={program} />
      <div className="mt-12 border-t border-black/10 pt-6">
        <DeleteButton action={deleteProgram} id={program.id} label="Delete this program" />
      </div>
    </div>
  );
}