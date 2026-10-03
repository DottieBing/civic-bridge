import Link from "next/link";
import { LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logout } from "@/app/admin/login/actions";
import AdminNav from "@/components/admin/AdminNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email, role } = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[#f4f7f7]">
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col justify-between overflow-y-auto bg-navy p-5 text-white lg:flex">
        <div>
          <Link href="/admin" className="mb-8 block px-3 text-[18px] font-medium">
            Civic Bridge <span className="text-amber">Admin</span>
          </Link>
          <AdminNav />
        </div>

        <div className="border-t border-white/15 pt-4">
          <p className="truncate px-3 text-[13px] text-white/80">{email}</p>
          <p className="px-3 text-[11px] uppercase tracking-[1.5px] text-white/50">
            {role}
          </p>
          <form action={logout} className="mt-3">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-white/75 transition hover:bg-white/10 hover:text-white">
              <LogOut size={18} strokeWidth={1.6} />
              Sign out
            </button>
          </form>
          <Link
            href="/"
            target="_blank"
            className="mt-1 block px-3 py-2 text-[13px] text-white/60 hover:text-white"
          >
            View website ↗
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}