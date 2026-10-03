"use client";

import { useActionState } from "react";
import { saveResearch } from "@/app/admin/(dashboard)/research/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import FileUpload from "@/components/admin/FileUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import TitleSlugFields from "@/components/admin/TitleSlugFields";
import PublishCard from "@/components/admin/PublishCard";
import { PROGRAM_CATEGORIES, RESEARCH_TYPES } from "@/lib/constants";
import type { Research } from "@/lib/types";

export default function ResearchForm({ item }: { item?: Research }) {
  const [state, action, pending] = useActionState(saveResearch, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />
        <Card>
          <TitleSlugFields
            prefix="/research/"
            defaultTitle={item?.title}
            defaultSlug={item?.slug}
            placeholder="Citizen trust and local governance in Nigeria"
          />
          <Field label="Short summary" hint="shown on the card and the top of the page">
            <textarea
              name="summary"
              rows={3}
              maxLength={240}
              defaultValue={item?.summary ?? ""}
              className={inputClass}
            />
          </Field>
        </Card>

        <Card title="Report file">
          <FileUpload
            urlName="file_url"
            nameName="file_name"
            folder="research"
            defaultUrl={item?.file_url}
            defaultFileName={item?.file_name}
          />
        </Card>

        <Card title="Full text (optional)">
          <RichTextEditor name="body" defaultValue={item?.body} />
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published}
          featured={item?.featured}
          featuredHint="Shown in the large card at the top of the Research page."
          pending={pending}
          cancelHref="/admin/research"
        />
        <Card title="Cover image">
          <ImageUpload name="cover_image" folder="research" defaultValue={item?.cover_image} />
        </Card>
        <Card title="Details">
          <Field label="Type">
            <select name="type" defaultValue={item?.type ?? "Policy Brief"} className={inputClass}>
              {RESEARCH_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Topic">
            <select name="category" defaultValue={item?.category ?? ""} className={inputClass}>
              <option value="">None</option>
              {PROGRAM_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author or team">
            <input name="author" defaultValue={item?.author ?? ""} className={inputClass} placeholder="CBA Research Unit" />
          </Field>
          <Field label="Pages">
            <input name="pages" type="number" min={1} defaultValue={item?.pages ?? ""} className={inputClass} />
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