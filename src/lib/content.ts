import { draftMode } from "next/headers";
import { supabasePublic } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import { SETTING_DEFAULTS, type Settings } from "@/lib/settings";
import { isUpcoming } from "@/lib/utils";
import type {
  CaseStudy,
  DocumentItem,
  EventItem,
  ImpactArea,
  Insight,
  Program,
  Research,
  Stat,
  TeamMember,
  Testimonial,
} from "@/lib/types";

// In preview mode (admins only) drafts can be read through the signed-in session.
async function reader() {
  const { isEnabled } = await draftMode();
  return isEnabled
    ? { db: await createClient(), preview: true }
    : { db: supabasePublic, preview: false };
}

async function bySlug<T>(table: string, slug: string): Promise<T | null> {
  const { db, preview } = await reader();
  let q = db.from(table).select("*").eq("slug", slug);
  if (!preview) q = q.eq("published", true);
  const { data } = await q.maybeSingle();
  return (data as T | null) ?? null;
}

/* Programs */
export async function getPrograms(): Promise<Program[]> {
  const { data } = await supabasePublic
    .from("programs")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return (data ?? []) as Program[];
}
export const getProgram = (slug: string) => bySlug<Program>("programs", slug);

export async function getFeaturedProgram(): Promise<Program | null> {
  const { data } = await supabasePublic
    .from("programs")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(1);
  return ((data ?? [])[0] as Program | undefined) ?? null;
}

/* Research */
export async function getResearch(): Promise<Research[]> {
  const { data } = await supabasePublic
    .from("research")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("published_on", { ascending: false })
    .order("created_at", { ascending: false });
  return (data ?? []) as Research[];
}
export const getResearchItem = (slug: string) => bySlug<Research>("research", slug);

/* Insights */
export async function getInsights(): Promise<Insight[]> {
  const { data } = await supabasePublic
    .from("insights")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("published_on", { ascending: false })
    .order("created_at", { ascending: false });
  return (data ?? []) as Insight[];
}
export const getInsight = (slug: string) => bySlug<Insight>("insights", slug);

/* Events */
export async function getEvents(): Promise<EventItem[]> {
  const { data } = await supabasePublic
    .from("events")
    .select("*")
    .eq("published", true)
    .order("starts_at", { ascending: true });
  return (data ?? []) as EventItem[];
}
export const getEvent = (slug: string) => bySlug<EventItem>("events", slug);

// The event shown on Home: a featured upcoming one, otherwise the next one
export async function getHomeEvent(): Promise<EventItem | null> {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { data } = await supabasePublic
    .from("events")
    .select("*")
    .eq("published", true)
    .gte("starts_at", since)
    .order("starts_at", { ascending: true })
    .limit(30);
  const upcoming = ((data ?? []) as EventItem[]).filter(isUpcoming);
  return upcoming.find((e) => e.featured) ?? upcoming[0] ?? null;
}

/* Impact stories */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { data } = await supabasePublic
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("published_on", { ascending: false })
    .order("created_at", { ascending: false });
  return (data ?? []) as CaseStudy[];
}
export const getCaseStudy = (slug: string) => bySlug<CaseStudy>("case_studies", slug);

/* Documents, team, testimonials, stats, areas, settings */
export async function getDocuments(kind: "public" | "annual"): Promise<DocumentItem[]> {
  const { data } = await supabasePublic
    .from("documents")
    .select("*")
    .eq("published", true)
    .eq("kind", kind)
    .order("sort_order", { ascending: true })
    .order("year", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  return (data ?? []) as DocumentItem[];
}

export async function getTeam(): Promise<TeamMember[]> {
  const { data } = await supabasePublic
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data ?? []) as TeamMember[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabasePublic
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return (data ?? []) as Testimonial[];
}

export async function getStats(): Promise<Stat[]> {
  const { data } = await supabasePublic
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Stat[];
}

export async function getImpactAreas(): Promise<ImpactArea[]> {
  const { data } = await supabasePublic
    .from("impact_areas")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as ImpactArea[];
}

export async function getSettings(): Promise<Settings> {
  const { data } = await supabasePublic.from("site_settings").select("key, value");
  const out: Settings = { ...SETTING_DEFAULTS };
  for (const row of data ?? []) {
    if (row.key in out && row.value) out[row.key as keyof Settings] = row.value;
  }
  return out;
}