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
  className = "py-[38px]",
}: Props) {
  return (
    <div className={`border-b border-black/50 ${className}`}>
      <div className="mx-auto w-full max-w-[1364px] px-6 lg:px-8">
        <div
          className={`flex flex-wrap ${
            compact ? "gap-x-[17px] gap-y-3" : "gap-3"
          } ${align === "center" ? "justify-center" : "justify-between"}`}
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`rounded-full border border-navy py-[14px] text-[16px] font-medium leading-[24px] transition ${
                compact ? "px-[23px]" : "px-[30px] lg:px-[36px]"
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