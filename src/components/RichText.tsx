import { cleanHtml } from "@/lib/sanitize";

export default function RichText({ html }: { html: string }) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: cleanHtml(html) }}
    />
  );
}