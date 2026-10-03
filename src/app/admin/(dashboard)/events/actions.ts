"use server";

import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { cleanHtml } from "@/lib/sanitize";
import { EVENT_FORMATS } from "@/lib/constants";
import { removeRow, saveRow, str, type FormState } from "@/lib/admin-actions";

function parseSpeakers(raw: string) {
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .slice(0, 12)
      .map((s) => ({
        name: String(s?.name ?? "").trim().slice(0, 100),
        role: String(s?.role ?? "").trim().slice(0, 120),
        photo:
          typeof s?.photo === "string" && /^https:\/\//.test(s.photo)
            ? s.photo
            : "",
      }))
      .filter((s) => s.name);
  } catch {
    return [];
  }
}

export async function saveEvent(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const title = str(formData.get("title"));
  if (!title) return { error: "Title is required." };
  const slug = slugify(str(formData.get("slug")) || title);
  if (!slug) return { error: "Web address (slug) is required." };

  const startsAt = str(formData.get("starts_at"));
  if (!startsAt || Number.isNaN(Date.parse(startsAt))) {
    return { error: "Start date and time are required." };
  }
  const endsAt = str(formData.get("ends_at"));
  if (endsAt && Date.parse(endsAt) < Date.parse(startsAt)) {
    return { error: "The end time must be after the start time." };
  }

  const cover = str(formData.get("cover_image"));
  if (cover && !/^https:\/\//.test(cover)) {
    return { error: "The cover image address is not valid. Upload it again." };
  }
  const reg = str(formData.get("registration_url"));
  if (reg && !/^https?:\/\//i.test(reg)) {
    return { error: "The registration link must start with https://" };
  }

  const formats = formData
    .getAll("formats")
    .map(String)
    .filter((f) => EVENT_FORMATS.includes(f));

  const row = {
    title,
    slug,
    label: str(formData.get("label")) || "Public forum",
    summary: str(formData.get("summary")) || null,
    body: cleanHtml(str(formData.get("body"))) || null,
    cover_image: cover || null,
    starts_at: new Date(startsAt).toISOString(),
    ends_at: endsAt ? new Date(endsAt).toISOString() : null,
    location: str(formData.get("location")) || null,
    formats: formats.length ? formats : ["In person"],
    registration_url: reg || null,
    speakers: parseSpeakers(str(formData.get("speakers"))),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  return saveRow("events", id, row, ["/", "/events", `/events/${slug}`], "/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  await removeRow("events", str(formData.get("id")), ["/", "/events"], "/admin/events");
}