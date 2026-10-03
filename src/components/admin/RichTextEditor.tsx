"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import { uploadImage } from "@/lib/storage";

function Btn({
  onClick,
  active,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid size-9 place-items-center rounded-lg transition disabled:opacity-40 ${
        active ? "bg-navy text-white" : "text-navy hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [html, setHtml] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false },
      }),
      ImageExt.configure({ inline: false, allowBase64: false }),
    ],
    content: defaultValue ?? "",
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address (https://…)", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!/^(https?:\/\/|mailto:)/i.test(url)) {
      setError("Links must start with https://, http:// or mailto:");
      return;
    }
    setError("");
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file, "content");
      editor.chain().focus().setImage({ src: url, alt: "" }).run();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#c3c3c3] bg-white focus-within:border-navy">
      <input type="hidden" name={name} value={html} />

      <div className="flex flex-wrap items-center gap-1 border-b border-black/10 p-2">
        <Btn label="Heading" active={editor?.isActive("heading", { level: 2 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={18} />
        </Btn>
        <Btn label="Subheading" active={editor?.isActive("heading", { level: 3 })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={18} />
        </Btn>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <Btn label="Bold" active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold size={17} />
        </Btn>
        <Btn label="Italic" active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic size={17} />
        </Btn>
        <Btn label="Link" active={editor?.isActive("link")} onClick={setLink}>
          <Link2 size={17} />
        </Btn>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <Btn label="Bullet list" active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List size={18} />
        </Btn>
        <Btn label="Numbered list" active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={18} />
        </Btn>
        <Btn label="Quote" active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <Quote size={17} />
        </Btn>
        <Btn label="Insert image" disabled={uploading}
          onClick={() => fileRef.current?.click()}>
          <ImagePlus size={18} />
        </Btn>
        <span className="mx-1 h-5 w-px bg-black/10" />
        <Btn label="Undo" disabled={!editor?.can().undo()}
          onClick={() => editor?.chain().focus().undo().run()}>
          <Undo2 size={17} />
        </Btn>
        <Btn label="Redo" disabled={!editor?.can().redo()}
          onClick={() => editor?.chain().focus().redo().run()}>
          <Redo2 size={17} />
        </Btn>
        {uploading && (
          <span className="ml-2 text-[13px] text-black/50">Uploading…</span>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={onImage}
      />

      <div className="rich-text px-5 py-4">
        <EditorContent editor={editor} />
      </div>
      {error && <p className="px-5 pb-3 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}