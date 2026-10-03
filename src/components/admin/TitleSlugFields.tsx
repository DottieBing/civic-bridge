"use client";

import { useState } from "react";
import { Field, inputClass } from "@/components/admin/ui";
import { slugify } from "@/lib/utils";

export default function TitleSlugFields({
  prefix,
  defaultTitle = "",
  defaultSlug = "",
  placeholder,
}: {
  prefix: string;
  defaultTitle?: string;
  defaultSlug?: string;
  placeholder?: string;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const [touched, setTouched] = useState(Boolean(defaultSlug));

  return (
    <>
      <Field label="Title">
        <input
          name="title"
          required
          value={title}
          placeholder={placeholder}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!touched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </Field>
      <Field label="Web address" hint="shown in the page link">
        <div className="flex items-center rounded-xl border border-[#c3c3c3] bg-white focus-within:border-navy">
          <span className="pl-4 text-[14px] text-black/40">{prefix}</span>
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className="w-full rounded-xl bg-transparent px-1 py-3 text-[15px] outline-none"
          />
        </div>
      </Field>
    </>
  );
}