"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

const links = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "Events", href: "/events" },
  { label: "Impact", href: "/impact" },
  { label: "Get involved", href: "/get-involved" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full pt-3">
      <div className="mx-auto flex w-full max-w-[1364px] items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="Civic Bridge Africa home">
          <Image
            src="/images/logo.svg"
            alt="Civic Bridge Africa"
            width={89}
            height={89}
            priority
          />
        </Link>

        <div className="hidden items-center lg:flex lg:gap-12 xl:gap-[172px]">
            <nav className="flex items-center gap-9">
                {links.map((l, i) => (
                <Link
                    key={l.href}
                    href={l.href}
                    className={`text-[14px] font-medium leading-[22.9px] tracking-[-0.42px] text-[#474747] transition hover:text-navy ${
                    i === 0 ? "xl:w-[77px] xl:text-center" : ""
                    }`}
                >
                    {l.label}
                </Link>
                ))}
            </nav>

            <div className="flex items-center gap-[26px]">
                <button aria-label="Search" className="text-navy">
                <Search size={24} strokeWidth={1.75} />
                </button>
                <Link
                href="/get-involved"
                className="flex w-[194px] items-center justify-center rounded-[38.65px] bg-amber pb-[22px] pt-[24px] text-[14px] font-bold leading-[12px] tracking-[-0.14px] text-[#1c1c1c] transition hover:brightness-95"
                >
                Donate
                </Link>
            </div>
        </div>

        <button
          className="text-navy lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <nav className={`text-[14px] font-medium leading-[22.9px] tracking-[-0.42px] transition ${
            pathname === l.href ? "text-teal" : "text-[#474747] hover:text-navy"
          } ${i === 0 ? "xl:w-[77px] xl:text-center" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[16px] font-medium text-[#474747]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved"
            onClick={() => setOpen(false)}
            className="w-fit rounded-pill bg-amber px-8 py-3 text-[14px] font-bold text-[#1c1c1c]"
          >
            Donate
          </Link>
        </nav>
      )}
    </header>
  );
}