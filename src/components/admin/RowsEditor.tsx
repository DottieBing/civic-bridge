"use client";

import { useActionState, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Card, FormError, inputClass } from "@/components/admin/ui";
import type { FormState } from "@/lib/admin-actions";

type FieldDef = {
  key: string;
  label: string;
  textarea?: boolean;
  placeholder?: string;
};
type Row = { id?: string } & Record<string, string>;

export default function RowsEditor({
  title,
  hint,
  fields,
  initial,
  action,
  max = 12,
  addLabel = "Add a row",
}: {
  title: string;
  hint?: string;
  fields: FieldDef[];
  initial: Row[];
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  max?: number;
  addLabel?: string;
}) {
  const [rows, setRows] = useState<Row[]>(initial);
  const [state, formAction, pending] = useActionState(action, undefined);

  const update = (i: number, key: string, value: string) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));

  const move = (i: number, dir: -1 | 1) =>
    setRows((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const blank = (): Row =>
    Object.fromEntries(fields.map((f) => [f.key, ""])) as Row;

  return (
    <form action={formAction}>
      <input type="hidden" name="rows" value={JSON.stringify(rows)} />
      <Card title={title}>
        {hint && <p className="-mt-2 text-[14px] text-black/60">{hint}</p>}
        <FormError message={state?.error} />

        <ul className="space-y-3">
          {rows.map((r, i) => (
            <li key={r.id ?? `new-${i}`} className="flex items-start gap-3 rounded-2xl border border-black/10 p-4">
              <span className="mt-3 w-6 shrink-0 text-center text-[13px] text-black/40">
                {i + 1}
              </span>
              <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                {fields.map((f) =>
                  f.textarea ? (
                    <textarea
                      key={f.key}
                      value={r[f.key] ?? ""}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      placeholder={f.placeholder ?? f.label}
                      aria-label={f.label}
                      rows={3}
                      className={`${inputClass} sm:col-span-2`}
                    />
                  ) : (
                    <input
                      key={f.key}
                      value={r[f.key] ?? ""}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      placeholder={f.placeholder ?? f.label}
                      aria-label={f.label}
                      className={inputClass}
                    />
                  ),
                )}
              </div>
              <div className="flex shrink-0 flex-col items-center gap-1 pt-1 text-navy">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="disabled:opacity-30">
                  <ArrowUp size={16} />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Move down" className="disabled:opacity-30">
                  <ArrowDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label="Remove"
                  className="mt-1 text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => setRows((prev) => [...prev, blank()])}
            disabled={rows.length >= max}
            className="inline-flex items-center gap-2 text-[14px] text-navy underline underline-offset-2 disabled:opacity-40"
          >
            <Plus size={16} />
            {addLabel}
          </button>
          <button
            type="submit"
            disabled={pending}
            className="h-[46px] rounded-full bg-navy px-8 text-[15px] font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
          {state?.saved && !state.error && (
            <span className="text-[14px] text-teal-label">Saved ✓</span>
          )}
        </div>
      </Card>
    </form>
  );
}