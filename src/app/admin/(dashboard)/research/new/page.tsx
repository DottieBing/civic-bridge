import { PageHeader } from "@/components/admin/ui";
import ResearchForm from "@/components/admin/ResearchForm";

export default function NewResearchPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title="New report" />
      <ResearchForm />
    </div>
  );
}