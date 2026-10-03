"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/storage";

export default function ImageUpload({
  name,
  folder,
  defaultValue = "",
  hint = "JPG, PNG or WebP, up to 5 MB",
}: {
  name: string;
  folder: string;
  defaultValue?: string | null;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      setUrl(await uploadImage(file, folder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl border border-black/10 object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="grid aspect-[16/9] w-full place-items-center rounded-2xl border border-dashed border-[#c3c3c3] text-[14px] text-black/50 transition hover:border-navy hover:text-navy"
        >
          <span className="flex flex-col items-center gap-2">
            {busy ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <ImagePlus size={24} strokeWidth={1.5} />
            )}
            {busy ? "Uploading…" : "Click to upload"}
          </span>
        </button>
      )}

      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={onPick}
      />

      <div className="mt-2 flex items-center gap-4 text-[13px]">
        {url && (
          <>
            <button
              type="button"
              onClick={() => ref.current?.click()}
              disabled={busy}
              className="text-navy underline underline-offset-2"
            >
              {busy ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={() => setUrl("")}
              className="text-red-700 underline underline-offset-2"
            >
              Remove
            </button>
          </>
        )}
        <span className="text-black/45">{hint}</span>
      </div>
      {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}