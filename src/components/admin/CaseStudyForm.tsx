"use client";

import { useActionState } from "react";
import { saveCaseStudy } from "@/app/admin/(dashboard)/case-studies/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import TitleSlugFields from "@/components/admin/TitleSlugFields";
import PublishCard from "@/components/admin/PublishCard";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudyForm({ item }: { item?: CaseStudy }) {
  const [state, action, pending] = useActionState(saveCaseStudy, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />
        <Card>
          <TitleSlugFields
            prefix="/impact/"
            defaultTitle={item?.title}
            defaultSlug={item?.slug}
            placeholder="Community civic learning changed how a council listens"
          />
          <Field label="Short excerpt" hint="shown on the story card">
            <textarea
              name="excerpt"
              rows={3}
              maxLength={240}
              defaultValue={item?.excerpt ?? ""}
              className={inputClass}
            />
          </Field>
        </Card>
        <Card title="The story">
          <RichTextEditor name="body" defaultValue={item?.body} />
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published}
          showFeatured={false}
          pending={pending}
          cancelHref="/admin/case-studies"
        />
        <Card title="Cover image">
          <ImageUpload name="cover_image" folder="stories" defaultValue={item?.cover_image} />
        </Card>
        <Card title="Details">
          <Field label="Location">
            <input name="location" defaultValue={item?.location ?? ""} className={inputClass} placeholder="Enugu State" />
          </Field>
          <Field label="Date">
            <input
              name="published_on"
              type="date"
              defaultValue={item?.published_on ?? new Date().toISOString().slice(0, 10)}
              className={inputClass}
            />
          </Field>
        </Card>
      </aside>
    </form>
  );
}