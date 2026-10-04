"use client";

import { useEffect } from "react";
import { markMessageRead } from "@/app/admin/(dashboard)/messages/actions";

export default function MarkRead({ id, status }: { id: string; status: string }) {
  useEffect(() => {
    if (status === "new") void markMessageRead(id);
  }, [id, status]);
  return null;
}