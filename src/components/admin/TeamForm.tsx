"use client";

import { useActionState } from "react";
import { saveTeamMember } from "@/app/admin/(dashboard)/team/actions";
import { Card, Field, FormError, inputClass } from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import PublishCard from "@/components/admin/PublishCard";
import type { TeamMember } from "@/lib/types";

export default function TeamForm({ item }: { item?: TeamMember }) {
  const [state, action, pending] = useActionState(saveTeamMember, undefined);

  return (
    <form action={action} className="grid items-start gap-8 xl:grid-cols-[1fr_340px]">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="space-y-6">
        <FormError message={state?.error} />
        <Card>
          <Field label="Name">
            <input name="name" required defaultValue={item?.name} className={inputClass} />
          </Field>
          <Field label="Role">
            <input name="role" defaultValue={item?.role ?? ""} className={inputClass} placeholder="Executive Director" />
          </Field>
          <Field label="Short bio" hint="shown in the Leadership section">
            <textarea name="bio" rows={6} maxLength={800} defaultValue={item?.bio ?? ""} className={inputClass} />
          </Field>
        </Card>
      </div>

      <aside className="space-y-6">
        <PublishCard
          published={item?.published ?? true}
          showFeatured={false}
          pending={pending}
          cancelHref="/admin/team"
        >
          <Field label="Order" hint="lower numbers appear first; the first four fill the About photo tiles">
            <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} className={inputClass} />
          </Field>
        </PublishCard>
        <Card title="Photo">
          <ImageUpload name="photo_url" folder="team" square defaultValue={item?.photo_url} hint="Square photos work best" />
        </Card>
      </aside>
    </form>
  );
}