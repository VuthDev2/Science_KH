import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { SupportedLanguage } from "@/components/landing/types";

interface AuthHeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  backHomeLabel: string;
  languageToggleAria: string;
}

export function AuthHeader({
  currentLang,
  onLanguageChange,
  backHomeLabel,
  languageToggleAria,
}: AuthHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-[480px] mx-auto mb-2 relative z-20">
      {/* Return to Home Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] rounded-md py-1 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{backHomeLabel}</span>
      </Link>

      {/* Language Selector (KM | EN) */}
      <div
        className="inline-flex items-center p-1 bg-slate-100 rounded-[10px] border border-[#E5EAF0] select-none text-xs"
        role="group"
        aria-label={languageToggleAria}
      >
        <button
          type="button"
          onClick={() => onLanguageChange("km")}
          aria-pressed={currentLang === "km"}
          className={`px-2.5 py-1 rounded-[7px] font-semibold transition-all cursor-pointer ${
            currentLang === "km"
              ? "bg-white text-[#111827] shadow-xs"
              : "text-[#64748B] hover:text-[#111827]"
          }`}
        >
          ខ្មែរ
        </button>
        <button
          type="button"
          onClick={() => onLanguageChange("en")}
          aria-pressed={currentLang === "en"}
          className={`px-2.5 py-1 rounded-[7px] font-semibold transition-all cursor-pointer ${
            currentLang === "en"
              ? "bg-white text-[#111827] shadow-xs"
              : "text-[#64748B] hover:text-[#111827]"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
