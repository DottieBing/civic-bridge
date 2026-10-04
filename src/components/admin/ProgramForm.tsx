"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveProgram } from "@/app/admin/(dashboard)/programs/actions";
import { Card, Field, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { PROGRAM_CATEGORIES, PROGRAM_STATUSES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import type { Program } from "@/lib/types";

export default function ProgramForm({ program }: { program?: Program }) {
  const [state, action, pending] = useActionState(saveProgram, undefined);
  const [title, setTitle] = useState(program?.title ?? "");
  const [slug, setSlug] = useState(program?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(program));

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {program && <input type="hidden" name="id" value={program.id} />}

      <div className="space-y-6">
        {state?.error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
            {state.error}
          </p>
        )}

        <Card>
          <Field label="Title">
            <input
              name="title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className={inputClass}
              placeholder="Young Citizens for Accountable Governance"
            />
          </Field>

          <Field label="Web address" hint="shown in the page link">
            <div className="flex items-center rounded-xl border border-[#c3c3c3] bg-white focus-within:border-navy">
              <span className="pl-4 text-[14px] text-black/40">/programs/</span>
              <input
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                className="w-full rounded-xl bg-transparent px-1 py-3 text-[15px] outline-none"
              />
            </div>
          </Field>

          <Field label="Short summary" hint="shown on the program card">
            <textarea
              name="summary"
              rows={3}
              maxLength={200}
              defaultValue={program?.summary ?? ""}
              className={inputClass}
              placeholder="Civic leadership and advocacy skills for young Africans aged 18–30."
            />
          </Field>
        </Card>

        <Card title="Full description">
          <RichTextEditor name="body" defaultValue={program?.body} />
        </Card>
      </div>

      <aside className="space-y-6">
        <Card title="Publish">
          <label className="flex items-start gap-3 text-[15px] text-navy">
            <input
              type="checkbox"
              name="published"
              defaultChecked={program?.published ?? false}
              className="mt-1 size-4 accent-[#1a2c36]"
            />
            <span>
              Published
              <span className="block text-[13px] text-black/50">
                Untick to keep it as a draft, hidden from the website.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-[15px] text-navy">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={program?.featured ?? false}
              className="mt-1 size-4 accent-[#1a2c36]"
            />
            <span>
              Featured
              <span className="block text-[13px] text-black/50">
                Shown first, and used for the Home page spotlight.
              </span>
            </span>
          </label>
          <Field label="Order" hint="lower numbers appear first">
            <input
              name="sort_order"
              type="number"
              defaultValue={program?.sort_order ?? 0}
              className={inputClass}
            />
          </Field>
          <div className="flex items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={pending}
              className="h-[46px] rounded-full bg-navy px-8 text-[15px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <Link href="/admin/programs" className="text-[14px] text-black/60 underline underline-offset-2">
              Cancel
            </Link>
          </div>
        </Card>

        <Card title="Cover image">
          <ImageUpload name="cover_image" folder="programs" defaultValue={program?.cover_image} />
        </Card>

        <Card title="Details">
          <Field label="Category">
            <select name="category" defaultValue={program?.category ?? "Youth"} className={inputClass}>
              {PROGRAM_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={program?.status ?? "Active"} className={inputClass}>
              {PROGRAM_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Location">
            <input name="location" defaultValue={program?.location ?? ""} className={inputClass} placeholder="Pan-African" />
          </Field>
          <Field label="Reach">
            <input name="reach" defaultValue={program?.reach ?? ""} className={inputClass} placeholder="500+ fellows engaged" />
          </Field>
                    <Field label="Duration">
            <input name="duration" defaultValue={program?.duration ?? ""} className={inputClass} placeholder="12 months" />
          </Field>
          <Field label="Audience">
            <input name="audience" defaultValue={program?.audience ?? ""} className={inputClass} placeholder="Ages 18–30" />
          </Field>
          <Field label="Home headline" hint="used if this is the featured program">
            <input
              name="spotlight_headline"
              defaultValue={program?.spotlight_headline ?? ""}
              className={inputClass}
              placeholder="Equipping young Africans with advocacy skills and civic platforms."
            />
          </Field>
        </Card>
      </aside>
    </form>
  );
}