"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  CalendarDays,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Mail,
  Newspaper,
  Quote,
  Settings,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

const groups = [
  {
    title: "",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    items: [
      { label: "Programs", href: "/admin/programs", icon: Briefcase },
      { label: "Research", href: "/admin/research", icon: FileText },
      { label: "Insights & news", href: "/admin/insights", icon: Newspaper },
      { label: "Events", href: "/admin/events", icon: CalendarDays },
      { label: "Impact stories", href: "/admin/case-studies", icon: Sparkles },
      { label: "Documents", href: "/admin/documents", icon: FolderOpen },
    ],
  },
  {
    title: "Site",
    items: [
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
      { label: "Stats & impact areas", href: "/admin/stats", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    title: "Inbox",
    items: [
      { label: "Messages", href: "/admin/messages", icon: Mail },
      { label: "Subscribers", href: "/admin/subscribers", icon: UserPlus },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-6">
      {groups.map((g) => (
        <div key={g.title || "root"}>
          {g.title && (
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[1.5px] text-white/50">
              {g.title}
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {g.items.map(({ label, href, icon: Icon }) => {
              const active =
                href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] transition ${
                      active
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}