import { Atom } from "lucide-react";
import { AtomOrbitalGraphic } from "./atom-orbital-graphic";
import type { AuthCopy } from "./types";

interface HeroPanelProps {
  copy: AuthCopy["showcase"];
  isKhmer?: boolean;
  mode?: "signin" | "signup" | "forgot" | "reset";
}

export function HeroPanel({ copy, isKhmer = false, mode }: HeroPanelProps) {
  return (
    <div className="relative w-full h-full min-h-full flex flex-col justify-between items-center select-none overflow-hidden text-center">
      {/* 1. Extended Ambient Background Wave & Celestial Rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="280" stroke="#059669" strokeWidth="1" strokeDasharray="8 12" strokeOpacity="0.2" />
        <circle cx="400" cy="400" r="370" stroke="#334155" strokeWidth="1" strokeDasharray="4 14" strokeOpacity="0.15" />
        <circle cx="400" cy="400" r="460" stroke="#059669" strokeWidth="0.8" strokeDasharray="6 18" strokeOpacity="0.12" />
      </svg>

      {/* 2. Top: ScienceKH Logo (Pinned Top Left/Center) */}
      <div className="relative z-10 w-full flex items-center justify-start gap-3 pt-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-white shadow-sm shrink-0">
          <Atom className="w-5 h-5 text-[#059669]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xl font-bold tracking-tight text-white leading-tight">
            Science<span className="text-[#059669]">KH</span>
          </span>
          <span className="text-[11px] font-medium tracking-wide text-slate-400 leading-none mt-0.5">
            {isKhmer ? "វេទិកាអប់រំ STEM កម្ពុជា" : "Cambodian STEM Platform"}
          </span>
        </div>
      </div>

      {/* 3. Dead-Center Focal Unit: Massive Scientific Visual & Centered Typography */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full my-auto py-4">
        {/* Massive Scientific Visual Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] flex items-center justify-center mx-auto transition-all">
          {/* Luminous Ambient Core Glow */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#059669]/20 blur-3xl pointer-events-none" />
          <div className="absolute w-36 h-36 rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />

          {/* SVG Scientific Atom Precision Graphic */}
          <AtomOrbitalGraphic isDark={true} />
        </div>

        {/* Dynamic Headline & Subtitle */}
        {mode === "forgot" ? (
          <div className="space-y-3.5 max-w-md mx-auto pt-3 text-left select-none animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-[2px] bg-emerald-400 rounded-full" />
              <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                {isKhmer ? "ការផ្ទៀងផ្ទាត់" : "VERIFICATION"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-[42px] font-black tracking-tight text-white leading-[1.15]">
              {isKhmer ? (
                <>
                  ពិនិត្យមើល <span className="text-emerald-400">ប្រអប់សំបុត្រ។</span>
                </>
              ) : (
                <>
                  Check your <span className="text-emerald-400">inbox.</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm xl:text-base text-slate-300 leading-relaxed font-normal">
              {isKhmer
                ? "យើងបានផ្ញើលេខកូដសុវត្ថិភាព ៦ ខ្ទង់ទៅកាន់អ៊ីមែលរបស់អ្នក។ សូមបញ្ចូលលេខកូដនៅលើអេក្រង់ដើម្បីបន្ត។"
                : "We just sent a 6-digit security code to your email. Please enter it below to continue."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-w-md mx-auto pt-3 select-none">
            <h1 className="text-3xl sm:text-4xl xl:text-[40px] font-extrabold tracking-tight text-white leading-tight">
              {isKhmer ? (
                <span className="inline-flex flex-wrap items-center justify-center gap-x-2">
                  <span className="inline-block animate-text-reveal-1">រៀនសូត្រ។</span>
                  <span className="inline-block animate-text-reveal-2">ស្វែងយល់។</span>
                  <span className="inline-block animate-text-reveal-3 bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 bg-clip-text text-transparent animate-gradient-text animate-emerald-glow">
                    រីកចម្រើន។
                  </span>
                </span>
              ) : (
                <span className="inline-flex flex-wrap items-center justify-center gap-x-2.5">
                  <span className="inline-block animate-text-reveal-1">Learn.</span>
                  <span className="inline-block animate-text-reveal-2">Explore.</span>
                  <span className="inline-block animate-text-reveal-3 bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 bg-clip-text text-transparent animate-gradient-text animate-emerald-glow">
                    Grow.
                  </span>
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm xl:text-base text-[#94A3B8] leading-relaxed mx-auto animate-text-sub-reveal">
              {isKhmer
                ? "វេទិកាសិក្សា STEM ស្របតាមកម្មវិធីជាតិថ្នាក់ទី ៧–១២ សម្រាប់សិស្សានុសិស្សកម្ពុជា។"
                : "The modern STEM learning platform for Cambodian students Grades 7–12."}
            </p>
          </div>
        )}
      </div>

      {/* 4. Bottom: Clean Minimal Footer */}
      <div className="relative z-10 w-full pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <span>&copy; {new Date().getFullYear()} ScienceKH</span>
        <span>{isKhmer ? "កម្មវិធីសិក្សា MoEYS ថ្នាក់ទី ៧–១២" : "Aligned with MoEYS Grades 7–12"}</span>
      </div>
    </div>
  );
}
