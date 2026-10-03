import { supabasePublic } from "@/lib/supabase/public";
import type { CaseStudy, EventItem, Insight, Program, Research } from "@/lib/types";

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