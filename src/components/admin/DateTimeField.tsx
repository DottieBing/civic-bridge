"use client";

import { useEffect, useState } from "react";
import { inputClass } from "@/components/admin/ui";

function toLocalInput(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

export default function DateTimeField({
  name,
  defaultIso,
  required,
}: {
  name: string;
  defaultIso?: string | null;
  required?: boolean;
}) {
  const [value, setValue] = useState("");

  // Set after mount so the browser's timezone is used (avoids a server mismatch)
  useEffect(() => {
    setValue(toLocalInput(defaultIso));
  }, [defaultIso]);

  const iso = value ? new Date(value).toISOString() : "";

  return (
    <>
      <input type="hidden" name={name} value={iso} />
      <input
        type="datetime-local"
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={inputClass}
      />
    </>
  );
}