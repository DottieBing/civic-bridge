import { PageHeader } from "@/components/admin/ui";
import InsightForm from "@/components/admin/InsightForm";

export default function NewInsightPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title="New article" />
      <InsightForm />
    </div>
  );
}