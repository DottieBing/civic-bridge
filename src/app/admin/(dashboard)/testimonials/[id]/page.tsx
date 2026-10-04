import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import TestimonialForm from "@/components/admin/TestimonialForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "../actions";
import type { Testimonial } from "@/lib/types";

export default async function TestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: Testimonial | undefined;

  if (id !== "new") {
    const supabase = await createClient();
    const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    item = data as Testimonial;
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title={item ? `Edit: ${item.name}` : "New testimonial"} />
      <TestimonialForm item={item} />
      {item && (
        <div className="mt-12 border-t border-black/10 pt-6">
          <DeleteButton action={deleteTestimonial} id={item.id} label="Delete this testimonial" />
        </div>
      )}
    </div>
  );
}