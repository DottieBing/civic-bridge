import Link from "next/link";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-[#c3c3c3] bg-white px-4 py-3 text-[15px] text-black outline-none transition placeholder:text-black/40 focus:border-navy";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[32px] leading-tight text-navy">{title}</h1>
        {description && (
          <p className="mt-1 text-[16px] text-black/60">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex h-[46px] items-center gap-2 rounded-full bg-navy px-6 text-[15px] font-bold text-white transition hover:opacity-90"
        >
          <Plus size={16} />
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Card({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[20px] border border-black/10 bg-white p-6">
      {title && (
        <h2 className="mb-4 text-[13px] font-medium uppercase tracking-[1.5px] text-teal-label">
          {title}
        </h2>
      )}
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  as = "label",
  children,
}: {
  label: string;
  hint?: string;
  as?: "label" | "div";
  children: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag className="block">
      <span className="text-[14px] font-medium text-navy">{label}</span>
      {hint && (
        <span className="ml-2 text-[12px] font-normal text-black/50">
          {hint}
        </span>
      )}
      <span className="mt-2 block">{children}</span>
    </Tag>
  );
}

export function Badge({
  tone,
  children,
}: {
  tone: "green" | "grey" | "amber";
  children: ReactNode;
}) {
  const tones = {
    green: "bg-teal-light/30 text-teal-label",
    grey: "bg-black/5 text-black/60",
    amber: "bg-amber/25 text-[#8a5a12]",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[12px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
      {message}
    </p>
  );
}