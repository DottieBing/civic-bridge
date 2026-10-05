"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminMobileNav({
  email,
  role,
  logoutAction,
}: {
  email: string;
  role: string;
  logoutAction: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-navy px-4 text-white lg:hidden">
        <Link href="/admin" className="text-[17px] font-medium">
          Civic Bridge <span className="text-amber">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-lg hover:bg-white/10"
        >
          <Menu size={24} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-[290px] max-w-[85vw] flex-col justify-between overflow-y-auto bg-navy p-5 text-white transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="mb-6 flex items-center justify-between px-3">
              <span className="text-[17px] font-medium">
                Civic Bridge <span className="text-amber">Admin</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-lg hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>
            {/* Tapping any link closes the menu */}
            <div
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setOpen(false);
              }}
            >
              <AdminNav />
            </div>
          </div>

          <div className="mt-8 border-t border-white/15 pt-4">
            <p className="truncate px-3 text-[13px] text-white/80">{email}</p>
            <p className="px-3 text-[11px] uppercase tracking-[1.5px] text-white/50">{role}</p>
            <form action={logoutAction} className="mt-3">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-white/75 transition hover:bg-white/10 hover:text-white">
                <LogOut size={18} strokeWidth={1.6} />
                Sign out
              </button>
            </form>
            <Link href="/" target="_blank" className="mt-1 block px-3 py-2 text-[13px] text-white/60 hover:text-white">
              View website ↗
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}