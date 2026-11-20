import { Atom } from "lucide-react";

interface MobileBrandHeaderProps {
  subtitle?: string;
}

export function MobileBrandHeader({ subtitle = "Cambodian STEM Platform" }: MobileBrandHeaderProps) {
  return (
    <div className="flex lg:hidden items-center justify-start gap-3 mb-6 select-none animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
        <Atom className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-extrabold text-xl tracking-tight text-[#111827] leading-tight">
          Science<span className="text-[#059669]">KH</span>
        </span>
        <span className="text-[11px] font-medium text-[#64748B] leading-none mt-0.5">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

