import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminOrNull } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await getAdminOrNull())) {
    return new Response("Not authorised", { status: 401 });
  }

  const path = new URL(request.url).searchParams.get("path") ?? "";
  if (!/^\/(programs|research|insights|events|impact)\/[a-z0-9-]+$/.test(path)) {
    return new Response("Bad path", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(path);
}