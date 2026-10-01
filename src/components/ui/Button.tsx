import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "link";
  icon?: "right" | "up-right";
  className?: string;
};

const base =
  "inline-flex items-center gap-[7px] text-[16px] font-bold leading-[30px] whitespace-nowrap transition";

const variants = {
  primary:
    "rounded-pill bg-navy px-[25px] py-[9px] text-white hover:opacity-90",
  outline:
    "rounded-pill border border-navy px-[25px] py-[9px] text-navy hover:bg-navy hover:text-white",
  link: "py-[9px] text-navy hover:opacity-70",
};

export default function Button({
  href,
  children,
  variant = "primary",
  icon,
  className = "",
}: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon === "right" && <ArrowRight size={14} />}
      {icon === "up-right" && <ArrowUpRight size={16} />}
    </Link>
  );
}