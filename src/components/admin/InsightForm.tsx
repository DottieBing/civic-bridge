"use client";

import { useActionState } from "react";
import { saveInsight } from "@/app/admin/(dashboard)/insights/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import TitleSlugFields from "@/components/admin/TitleSlugFields";
import PublishCard from "@/components/admin/PublishCard";
import { INSIGHT_CATEGORIES } from "@/lib/constants";
import type { Insight } from "@/lib/types";

export default function InsightForm({ item }: { item?: Insight }) {
  const [state, action, pending] = useActionState(saveInsight, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />
        <Card>
          <TitleSlugFields
            prefix="/insights/"
            defaultTitle={item?.title}
            defaultSlug={item?.slug}
            placeholder="Why local government matters more than we think"
          />
          <Field label="Short excerpt" hint="shown on the card and the top of the article">
            <textarea
              name="excerpt"
              rows={3}
              maxLength={240}
              defaultValue={item?.excerpt ?? ""}
              className={inputClass}
            />
          </Field>
        </Card>

        <Card title="Article">
          <RichTextEditor name="body" defaultValue={item?.body} />
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published}
          featured={item?.featured}
          featuredHint="Shown in the large spot at the top of the Insights page."
          pending={pending}
          cancelHref="/admin/insights"
        />
        <Card title="Cover image">
          <ImageUpload name="cover_image" folder="insights" defaultValue={item?.cover_image} />
        </Card>
        <Card title="Details">
          <Field label="Category" hint="use News for news items">
            <select name="category" defaultValue={item?.category ?? "Analysis"} className={inputClass}>
              {INSIGHT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author">
            <input name="author" defaultValue={item?.author ?? ""} className={inputClass} />
          </Field>
          <Field label="Source label" hint="shown on the card">
            <input name="source_label" defaultValue={item?.source_label ?? "Editorial"} className={inputClass} />
          </Field>
          <Field label="Reading time (minutes)">
            <input name="read_minutes" type="number" min={1} defaultValue={item?.read_minutes ?? ""} className={inputClass} />
          </Field>
          <Field label="Publication date">
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