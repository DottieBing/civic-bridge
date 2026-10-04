"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";
import { uploadFile } from "@/lib/storage";

export default function FileUpload({
  urlName,
  nameName,
  sizeName,
  folder,
  defaultUrl = "",
  defaultFileName = "",
  defaultSize,
}: {
  urlName: string;
  nameName: string;
  sizeName?: string;
  folder: string;
  defaultUrl?: string | null;
  defaultFileName?: string | null;
  defaultSize?: number | null;
}) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [fileName, setFileName] = useState(defaultFileName ?? "");
  const [size, setSize] = useState<number | "">(defaultSize ?? "");
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
      const res = await uploadFile(file, folder);
      setUrl(res.url);
      setFileName(res.name);
      setSize(res.size);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={urlName} value={url} />
      <input type="hidden" name={nameName} value={fileName} />
      {sizeName && <input type="hidden" name={sizeName} value={size} />}

      {url ? (
        <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#f4fbfb] p-4">
          <FileText size={22} strokeWidth={1.5} className="shrink-0 text-teal-label" />
          <a href={url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-[15px] text-navy underline underline-offset-2">
            {fileName || "Uploaded file"}
          </a>
          <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="text-[13px] text-navy underline underline-offset-2">
            {busy ? "Uploading…" : "Replace"}
          </button>
          <button
            type="button"
            onClick={() => { setUrl(""); setFileName(""); setSize(""); }}
            className="text-[13px] text-red-700 underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#c3c3c3] py-8 text-[14px] text-black/50 transition hover:border-navy hover:text-navy"
        >
          {busy ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} strokeWidth={1.5} />}
          {busy ? "Uploading…" : "Upload a PDF (up to 25 MB)"}
        </button>
      )}

      <input
        ref={ref}
        type="file"
        accept="application/pdf,.doc,.docx,.xls,.xlsx"
        className="hidden"
        onChange={onPick}
      />
      {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}