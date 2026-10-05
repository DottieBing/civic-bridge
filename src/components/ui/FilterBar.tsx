"use client";

type Props = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  align?: "between" | "center";
  compact?: boolean;
  className?: string;
};

export default function FilterBar({
  options,
  value,
  onChange,
  align = "between",
  compact = false,
  className = "py-6 lg:py-[38px]",
}: Props) {
  return (
    <div className={`border-b border-black/50 ${className}`}>
      <div className="mx-auto w-full max-w-[1364px] lg:px-8">
        <div
          className={`no-scrollbar flex gap-3 overflow-x-auto px-6 lg:flex-wrap lg:overflow-visible lg:px-0 ${
            compact ? "lg:gap-x-[17px] lg:gap-y-3" : ""
          } ${align === "center" ? "lg:justify-center" : "lg:justify-between"}`}
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`shrink-0 whitespace-nowrap rounded-full border border-navy py-[12px] text-[15px] font-medium leading-[24px] transition lg:py-[14px] lg:text-[16px] ${
                compact ? "px-[20px] lg:px-[23px]" : "px-[24px] lg:px-[36px]"
              } ${
                value === o
                  ? "bg-navy text-white"
                  : "bg-transparent text-navy hover:bg-navy/5"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}