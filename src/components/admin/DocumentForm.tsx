"use client";

import { useActionState } from "react";
import { saveDocument } from "@/app/admin/(dashboard)/documents/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import FileUpload from "@/components/admin/FileUpload";
import PublishCard from "@/components/admin/PublishCard";
import type { DocumentItem } from "@/lib/types";

export default function DocumentForm({ item }: { item?: DocumentItem }) {
  const [state, action, pending] = useActionState(saveDocument, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />
        <Card>
          <Field label="Title">
            <input
              name="title"
              required
              defaultValue={item?.title}
              className={inputClass}
              placeholder="Annual report 2025"
            />
          </Field>
          <Field label="Where it appears">
            <select name="kind" defaultValue={item?.kind ?? "public"} className={inputClass}>
              <option value="public">About page: Public documents</option>
              <option value="annual">Impact page: Annual reports</option>
            </select>
          </Field>
        </Card>
        <Card title="File">
          <FileUpload
            urlName="file_url"
            nameName="file_name"
            sizeName="file_size_bytes"
            folder="documents"
            defaultUrl={item?.file_url}
            defaultFileName={item?.file_name}
            defaultSize={item?.file_size_bytes}
          />
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published ?? true}
          showFeatured={false}
          pending={pending}
          cancelHref="/admin/documents"
        >
          <Field label="Year" hint="optional">
            <input name="year" type="number" defaultValue={item?.year ?? ""} className={inputClass} />
          </Field>
          <Field label="Order" hint="lower numbers appear first">
            <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} className={inputClass} />
          </Field>
        </PublishCard>
      </aside>
    </form>
  );
}