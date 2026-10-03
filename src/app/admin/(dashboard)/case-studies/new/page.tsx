import { PageHeader } from "@/components/admin/ui";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title="New story" />
      <CaseStudyForm />
    </div>
  );
}