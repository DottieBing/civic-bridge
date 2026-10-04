"use server";

import { requireAdmin } from "@/lib/auth";
import { str, syncRows, type FormState } from "@/lib/admin-actions";

const UUID = /^[0-9a-f-]{36}$/i;

function parseRows(raw: string, keys: string[], max: number) {
  let arr: unknown;
  try {
    arr = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(arr) || arr.length > max) return null;

  return arr.map((r, i) => {
    const row: Record<string, unknown> = { sort_order: i };
    if (typeof r?.id === "string" && UUID.test(r.id)) row.id = r.id;
    for (const k of keys) row[k] = String(r?.[k] ?? "").trim().slice(0, 300);
    return row;
  });
}

export async function saveStats(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const rows = parseRows(str(formData.get("rows")), ["label", "value"], 12);
  if (!rows) return { error: "Something went wrong. Reload the page and try again." };
  if (rows.some((r) => !r.label || !r.value)) {
    return { error: "Every stat needs both a label and a number." };
  }
  return syncRows("stats", rows, ["/", "/impact"]);
}

export async function saveAreas(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const rows = parseRows(str(formData.get("rows")), ["title", "description"], 12);
  if (!rows) return { error: "Something went wrong. Reload the page and try again." };
  if (rows.some((r) => !r.title)) {
    return { error: "Every impact area needs a title." };
  }
  return syncRows("impact_areas", rows, ["/impact"]);
}