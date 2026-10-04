import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import DocumentForm from "@/components/admin/DocumentForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteDocument } from "../actions";
import type { DocumentItem } from "@/lib/types";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: DocumentItem | undefined;

  if (id !== "new") {
    const supabase = await createClient();
    const { data } = await supabase.from("documents").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    item = data as DocumentItem;
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={item ? `Edit: ${item.title}` : "New document"} />
      <DocumentForm item={item} />
      {item && (
        <div className="mt-12 border-t border-black/10 pt-6">
          <DeleteButton action={deleteDocument} id={item.id} label="Delete this document" />
        </div>
      )}
    </div>
  );
}