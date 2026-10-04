import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import TeamForm from "@/components/admin/TeamForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTeamMember } from "../actions";
import type { TeamMember } from "@/lib/types";

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: TeamMember | undefined;

  if (id !== "new") {
    const supabase = await createClient();
    const { data } = await supabase.from("team_members").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    item = data as TeamMember;
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={item ? `Edit: ${item.name}` : "Add person"} />
      <TeamForm item={item} />
      {item && (
        <div className="mt-12 border-t border-black/10 pt-6">
          <DeleteButton action={deleteTeamMember} id={item.id} label="Remove this person" />
        </div>
      )}
    </div>
  );
}