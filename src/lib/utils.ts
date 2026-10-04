export const EVENT_TZ = "Africa/Lagos";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: EVENT_TZ,
  });
}

export function formatMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: EVENT_TZ,
  });
}

export function eventParts(iso: string) {
  const d = new Date(iso);
  const opt = (o: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-GB", { ...o, timeZone: EVENT_TZ });
  return {
    month: opt({ month: "short" }).toUpperCase(),
    day: opt({ day: "numeric" }),
    year: opt({ year: "numeric" }),
  };
}

function time(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: EVENT_TZ,
  });
}

function longDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: EVENT_TZ,
  });
}

export function eventWhen(startIso: string, endIso?: string | null) {
  if (!endIso) return { date: longDate(startIso), time: `${time(startIso)} WAT` };
  const sameDay = formatDate(startIso) === formatDate(endIso);
  return sameDay
    ? { date: longDate(startIso), time: `${time(startIso)} – ${time(endIso)} WAT` }
    : {
        date: `${longDate(startIso)} – ${longDate(endIso)}`,
        time: `${time(startIso)} WAT`,
      };
}

// An event without an end time counts as upcoming for 4 hours after it starts
export function isUpcoming(e: { starts_at: string; ends_at: string | null }) {
  const end = e.ends_at
    ? new Date(e.ends_at).getTime()
    : new Date(e.starts_at).getTime() + 4 * 3600 * 1000;
  return end >= Date.now();
}

export function fileMeta(name?: string | null, size?: number | null) {
  const ext = name?.split(".").pop()?.toUpperCase();
  const type = ext && ext.length <= 4 ? ext : "FILE";
  if (!size) return type;
  const mb = size / (1024 * 1024);
  const label =
    mb >= 1
      ? `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`
      : `${Math.max(1, Math.round(size / 1024))}KB`;
  return `${type} · ${label}`;
}