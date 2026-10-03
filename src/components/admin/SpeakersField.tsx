"use client";

import { useRef, useState } from "react";
import { Loader2, Plus, Trash2, UserRound } from "lucide-react";
import { uploadImage } from "@/lib/storage";
import { inputClass } from "@/components/admin/ui";
import type { Speaker } from "@/lib/types";

export default function SpeakersField({
  name,
  defaultValue = [],
}: {
  name: string;
  defaultValue?: Speaker[];
}) {
  const [items, setItems] = useState<Speaker[]>(defaultValue);
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [pickFor, setPickFor] = useState(0);

  const update = (i: number, patch: Partial<Speaker>) =>
    setItems((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(pickFor);
    setError("");
    try {
      update(pickFor, { photo: await uploadImage(file, "speakers") });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={onPick}
      />

      {items.length === 0 && (
        <p className="mb-4 text-[14px] text-black/50">No speakers added yet.</p>
      )}

      <ul className="space-y-4">
        {items.map((s, i) => (
          <li key={i} className="flex items-start gap-4 rounded-2xl border border-black/10 p-4">
            <button
              type="button"
              onClick={() => {
                setPickFor(i);
                fileRef.current?.click();
              }}
              className="grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-full border border-dashed border-[#c3c3c3] bg-[#f4fbfb] text-black/40 transition hover:border-navy"
              aria-label="Upload speaker photo"
            >
              {busy === i ? (
                <Loader2 size={20} className="animate-spin" />
              ) : s.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.photo} alt="" className="size-full object-cover" />
              ) : (
                <UserRound size={26} strokeWidth={1.4} />
              )}
            </button>
            <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
              <input
                value={s.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Name"
                className={inputClass}
              />
              <input
                value={s.role}
                onChange={(e) => update(i, { role: e.target.value })}
                placeholder="Role or organisation"
                className={inputClass}
              />
            </div>
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              aria-label="Remove speaker"
              className="mt-2 text-red-700 hover:opacity-70"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { name: "", role: "", photo: "" }])}
        disabled={items.length >= 12}
        className="mt-4 inline-flex items-center gap-2 text-[14px] text-navy underline underline-offset-2 disabled:opacity-40"
      >
        <Plus size={16} />
        Add a speaker
      </button>
      {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}