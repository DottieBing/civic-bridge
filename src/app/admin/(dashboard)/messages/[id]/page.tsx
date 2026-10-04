import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, PageHeader } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import MarkRead from "@/components/admin/MarkRead";
import { deleteMessage, setMessageStatus } from "../actions";
import { EVENT_TZ } from "@/lib/utils";

export default async function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: m } = await supabase.from("messages").select("*").eq("id", id).maybeSingle();
  if (!m) notFound();

  const received = new Date(m.created_at).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: EVENT_TZ,
  });
  const subject = encodeURIComponent("Re: your message to Civic Bridge Africa");

  return (
    <div className="mx-auto max-w-[800px]">
      <MarkRead id={m.id} status={m.status} />
      <Link href="/admin/messages" className="mb-6 inline-flex items-center gap-2 text-[14px] text-navy hover:opacity-70">
        <ArrowLeft size={16} />
        All messages
      </Link>
      <PageHeader title={m.name} description={`Received ${received} (WAT)`} />

      <Card>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">Email</dt>
            <dd className="mt-1 break-all text-[16px]">
              <a href={`mailto:${m.email}`} className="text-navy underline underline-offset-2">{m.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">Interested in</dt>
            <dd className="mt-1 text-[16px] text-black">{m.interest ?? "Not specified"}</dd>
          </div>
        </dl>
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">Message</p>
          <p className="mt-2 whitespace-pre-wrap text-[16px] leading-[28px] text-black">{m.message}</p>
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${m.email}?subject=${subject}`}
          className="inline-flex h-[46px] items-center gap-2 rounded-full bg-navy px-6 text-[15px] font-bold text-white transition hover:opacity-90"
        >
          <Mail size={16} />
          Reply by email
        </a>
        {m.status !== "archived" && (
          <form action={setMessageStatus}>
            <input type="hidden" name="id" value={m.id} />
            <input type="hidden" name="status" value="archived" />
            <button className="h-[46px] rounded-full border border-navy px-6 text-[15px] text-navy transition hover:bg-navy hover:text-white">Archive</button>
          </form>
        )}
        {m.status !== "new" && (
          <form action={setMessageStatus}>
            <input type="hidden" name="id" value={m.id} />
            <input type="hidden" name="status" value="new" />
            <button className="h-[46px] rounded-full border border-[#c3c3c3] px-6 text-[15px] text-navy transition hover:border-navy">Mark as unread</button>
          </form>
        )}
      </div>

      <div className="mt-12 border-t border-black/10 pt-6">
        <DeleteButton action={deleteMessage} id={m.id} label="Delete this message" />
      </div>
    </div>
  );
}