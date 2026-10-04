"use client";

import { useActionState } from "react";
import { saveTestimonial } from "@/app/admin/(dashboard)/testimonials/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import PublishCard from "@/components/admin/PublishCard";
import type { Testimonial } from "@/lib/types";

export default function TestimonialForm({ item }: { item?: Testimonial }) {
  const [state, action, pending] = useActionState(saveTestimonial, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />
        <Card>
          <Field label="Quote" hint="up to 400 characters, without quotation marks">
            <textarea
              name="quote"
              required
              rows={5}
              maxLength={400}
              defaultValue={item?.quote.replace(/^[“"]|[”"]$/g, "")}
              className={inputClass}
            />
          </Field>
          <Field label="Name">
            <input name="name" required defaultValue={item?.name} className={inputClass} placeholder="Adaeze O." />
          </Field>
          <Field label="Role and place">
            <input name="role" defaultValue={item?.role ?? ""} className={inputClass} placeholder="Programme participant · Enugu" />
          </Field>
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published ?? true}
          showFeatured={false}
          pending={pending}
          cancelHref="/admin/testimonials"
        >
          <Field label="Order" hint="lower numbers appear first. Home shows the first three">
            <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} className={inputClass} />
          </Field>
        </PublishCard>
        <Card title="Photo">
          <ImageUpload name="photo_url" folder="testimonials" square defaultValue={item?.photo_url} hint="Square photos work best" />
        </Card>
      </aside>
    </form>
  );
}