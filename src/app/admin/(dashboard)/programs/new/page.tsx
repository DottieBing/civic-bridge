import { PageHeader } from "@/components/admin/ui";
import ProgramForm from "@/components/admin/ProgramForm";

export default function NewProgramPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader title="New program" />
      <ProgramForm />
    </div>
  );
}