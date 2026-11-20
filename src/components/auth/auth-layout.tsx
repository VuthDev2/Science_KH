import type { ReactNode } from "react";
import type { SupportedLanguage } from "@/components/landing/types";
import { AtomOrbitalGraphic } from "./atom-orbital-graphic";

interface AuthLayoutProps {
  currentLang: SupportedLanguage;
  brandingContent: ReactNode;
  formContent: ReactNode;
}

export function AuthLayout({ currentLang, brandingContent, formContent }: AuthLayoutProps) {
  return (
    <div
      lang={currentLang}
      className="w-full min-h-dvh flex flex-col lg:flex-row bg-[#F8FAFC] text-[#111827] antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden"
    >
      {/* 1. LEFT SIDE (50% on Desktop): Minimal · Modern · Professional Branding */}
      <aside
        aria-label="ScienceKH Branding"
        className="hidden lg:flex lg:w-1/2 min-h-dvh sticky top-0 h-dvh bg-[#080F1D] text-white flex-col justify-between p-10 xl:p-14 border-r border-slate-800/80 overflow-hidden"
      >
        {brandingContent}
      </aside>

      {/* 2. RIGHT SIDE (50% on Desktop, 100% on Mobile): Clean Centered Authentication Card with Subtle Texture */}
      <main
        aria-label="Authentication Form"
        className="w-full lg:w-1/2 min-h-dvh flex flex-col justify-start px-4 sm:py-7 sm:px-8 lg:px-10 xl:px-12 bg-[#F8FAFC] [background-image:radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] relative z-10 overflow-y-auto"
        style={{
          paddingTop: "max(1.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))",
          paddingBottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.5rem))",
        }}
      >
        {/* Mobile Background: Scientific Atom Precision Graphic Behind the Form */}
        <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <div className="relative w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] opacity-35 select-none">
            {/* Luminous Ambient Core Glow */}
            <div className="absolute inset-0 rounded-full bg-[#059669]/15 blur-3xl pointer-events-none" />
            <div className="absolute inset-16 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
            <AtomOrbitalGraphic isDark={false} />
          </div>
        </div>

        <div className="relative z-10 w-full flex flex-col justify-between flex-1">
          {formContent}
        </div>
      </main>
    </div>
  );
}
