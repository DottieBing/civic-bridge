import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/ui";
import RowsEditor from "@/components/admin/RowsEditor";
import { saveAreas, saveStats } from "./actions";

export default async function StatsAdminPage() {
  const supabase = await createClient();
  const [{ data: stats }, { data: areas }] = await Promise.all([
    supabase.from("stats").select("id, label, value").order("sort_order", { ascending: true }),
    supabase.from("impact_areas").select("id, title, description").order("sort_order", { ascending: true }),
  ]);

  const statRows = (stats ?? []).map((s) => ({ id: s.id as string, label: s.label as string, value: s.value as string }));
  const areaRows = (areas ?? []).map((a) => ({
    id: a.id as string,
    title: a.title as string,
    description: (a.description ?? "") as string,
  }));

  return (
    <div className="mx-auto max-w-[1000px] space-y-10">
      <PageHeader
        title="Stats & impact areas"
        description="The numbers and the six lenses shown on the Impact page."
      />

      <RowsEditor
        key={JSON.stringify(statRows)}
        title="Impact stats"
        hint="Shown in the grid on the Impact page. Six fill the grid neatly; Home shows the first four."
        fields={[
          { key: "value", label: "Number", placeholder: "5,000+" },
          { key: "label", label: "Label", placeholder: "Citizens reached" },
        ]}
        initial={statRows}
        action={saveStats}
        max={9}
        addLabel="Add a stat"
      />

      <RowsEditor
        key={JSON.stringify(areaRows)}
        title="Impact areas"
        hint="The numbered cards in “Six lenses on our work”."
        fields={[
          { key: "title", label: "Title", placeholder: "Knowledge" },
          { key: "description", label: "Description", textarea: true, placeholder: "How this area is measured and reported" },
        ]}
        initial={areaRows}
        action={saveAreas}
        max={9}
        addLabel="Add an area"
      />
    </div>
  );
}