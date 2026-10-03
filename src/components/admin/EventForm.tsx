"use client";

import { useActionState } from "react";
import { saveEvent } from "@/app/admin/(dashboard)/events/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import TitleSlugFields from "@/components/admin/TitleSlugFields";
import PublishCard from "@/components/admin/PublishCard";
import DateTimeField from "@/components/admin/DateTimeField";
import SpeakersField from "@/components/admin/SpeakersField";
import { EVENT_FORMATS, EVENT_LABELS } from "@/lib/constants";
import type { EventItem } from "@/lib/types";

export default function EventForm({ item }: { item?: EventItem }) {
  const [state, action, pending] = useActionState(saveEvent, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />

        <Card>
          <TitleSlugFields
            prefix="/events/"
            defaultTitle={item?.title}
            defaultSlug={item?.slug}
            placeholder="Building citizen trust in democratic institutions"
          />
          <Field label="Event type" hint="small label above the title">
            <input
              name="label"
              list="event-labels"
              defaultValue={item?.label ?? "Public forum"}
              className={inputClass}
            />
            <datalist id="event-labels">
              {EVENT_LABELS.map((l) => <option key={l} value={l} />)}
            </datalist>
          </Field>
          <Field label="Short summary" hint="shown on the events list">
            <textarea
              name="summary"
              rows={3}
              maxLength={240}
              defaultValue={item?.summary ?? ""}
              className={inputClass}
            />
          </Field>
        </Card>

        <Card title="When and where">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Starts" as="div">
              <DateTimeField name="starts_at" defaultIso={item?.starts_at} required />
            </Field>
            <Field label="Ends" hint="optional" as="div">
              <DateTimeField name="ends_at" defaultIso={item?.ends_at} />
            </Field>
          </div>
          <p className="-mt-2 text-[13px] text-black/50">
            Times are in your computer&apos;s timezone and shown to visitors in
            Nigerian time (WAT).
          </p>
          <Field label="Location">
            <input name="location" defaultValue={item?.location ?? ""} className={inputClass} placeholder="Abuja + Online" />
          </Field>
          <Field label="Format" as="div">
            <div className="flex gap-6">
              {EVENT_FORMATS.map((f) => (
                <label key={f} className="flex items-center gap-2 text-[15px] text-navy">
                  <input
                    type="checkbox"
                    name="formats"
                    value={f}
                    defaultChecked={item ? item.formats.includes(f) : f === "In person"}
                    className="size-4 accent-[#1a2c36]"
                  />
                  {f}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Registration link" hint="leave empty if registration isn't open">
            <input name="registration_url" type="url" defaultValue={item?.registration_url ?? ""} className={inputClass} placeholder="https://" />
          </Field>
        </Card>

        <Card title="Speakers">
          <SpeakersField name="speakers" defaultValue={item?.speakers ?? []} />
        </Card>

        <Card title="Full details (optional)">
          <RichTextEditor name="body" defaultValue={item?.body} />
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published}
          featured={item?.featured}
          featuredHint="Used for the Upcoming event spot on the Home page."
          pending={pending}
          cancelHref="/admin/events"
        />
        <Card title="Cover image">
          <ImageUpload name="cover_image" folder="events" defaultValue={item?.cover_image} />
        </Card>
      </aside>
    </form>
  );
}