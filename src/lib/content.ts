import { supabasePublic } from "@/lib/supabase/public";
import { SETTING_DEFAULTS, type Settings } from "@/lib/settings";
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

export async function getProgram(slug: string): Promise<Program | null> {
  const { data } = await supabasePublic
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Program | null) ?? null;
}

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

export async function getResearchItem(slug: string): Promise<Research | null> {
  const { data } = await supabasePublic
    .from("research")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Research | null) ?? null;
}

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

export async function getInsight(slug: string): Promise<Insight | null> {
  const { data } = await supabasePublic
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Insight | null) ?? null;
}

export async function getEvents(): Promise<EventItem[]> {
  const { data } = await supabasePublic
    .from("events")
    .select("*")
    .eq("published", true)
    .order("starts_at", { ascending: true });
  return (data ?? []) as EventItem[];
}

export async function getEvent(slug: string): Promise<EventItem | null> {
  const { data } = await supabasePublic
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as EventItem | null) ?? null;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { data } = await supabasePublic
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("published_on", { ascending: false })
    .order("created_at", { ascending: false });
  return (data ?? []) as CaseStudy[];
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const { data } = await supabasePublic
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as CaseStudy | null) ?? null;
}

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