import { Download } from "lucide-react";
import Container from "@/components/ui/Container";
import { fileMeta } from "@/lib/utils";
import type { DocumentItem } from "@/lib/types";

export default function PublicDocuments({ docs }: { docs: DocumentItem[] }) {
  if (docs.length === 0) return null;

  return (
    <section className="py-16 lg:pb-[205px] lg:pt-[199px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Governance and transparency
        </p>
        <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          Public documents.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-[75px] lg:grid-cols-3 lg:gap-x-[28px]">
          {docs.map((d) => (
            <a
              key={d.id}
              href={d.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[124px] items-start justify-between gap-4 rounded-[20px] border border-black/15 bg-white px-[39px] py-[38px] transition hover:border-black/40"
            >
              <div className="min-w-0">
                <p className="text-[20px] leading-[30px] text-black">{d.title}</p>
                <p className="mt-[7px] text-[12px] leading-[14px] text-black/60">
                  {fileMeta(d.file_name, d.file_size_bytes)}
                </p>
              </div>
              <Download
                size={20}
                strokeWidth={1.5}
                className="mt-[6px] shrink-0 text-navy transition group-hover:translate-y-[2px]"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}