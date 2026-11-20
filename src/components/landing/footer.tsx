import { Atom, ArrowRight, CheckCircle2, Sparkles, GraduationCap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LandingCopy, SupportedLanguage } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FooterProps {
  ctaCopy: LandingCopy["cta"];
  footerCopy: LandingCopy["footer"];
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function Footer({ ctaCopy, footerCopy, currentLang, onLanguageChange }: FooterProps) {
  const isKhmer = currentLang === "km";

  return (
    <>
      {/* 1. Final Conversion CTA Section (Contained, Minimalist Focus Card) */}
      <section className="py-14 sm:py-20 md:py-24 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-14 overflow-hidden border border-slate-800 shadow-xl">
              {/* Subtle architectural ambient glow (zero tacky radar lines) */}
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 text-center max-w-2xl mx-auto space-y-5">
                {/* Clean Top Value Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {ctaCopy.badge ||
                      (isKhmer
                        ? "កម្មវិធីសិក្សាជាតិ MoEYS · ថ្នាក់ទី ៧ ដល់ ទី ១២"
                        : "MoEYS STEM Curriculum · Grades 7–12")}
                  </span>
                </div>

                {/* Direct High-Impact Headline */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white max-w-2xl mx-auto">
                  {ctaCopy.title}
                </h2>

                {/* Subtitle */}
                <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
                  {ctaCopy.subtitle}
                </p>

                {/* Primary & Secondary Dual CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/auth"
                    search={{ mode: "signup", lang: currentLang }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer group"
                  >
                    <span>{ctaCopy.button}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <a
                    href="#curriculum"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-slate-300" />
                    <span>
                      {ctaCopy.secondaryButton ||
                        (isKhmer ? "ស្វែងយល់ពីកម្មវិធីសិក្សា" : "Explore Curriculum")}
                    </span>
                  </a>
                </div>

                {/* Quiet Trust Signals */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ctaCopy.trustCheck1 || "100% Free · Zero Paywalls"}</span>
                  </div>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ctaCopy.trustCheck2 || "MoEYS Curriculum Aligned"}</span>
                  </div>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ctaCopy.trustCheck3 || "Grades 7–12 Brevet & BacII Prep"}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Main Clean Institutional Footer */}
      <footer className="bg-white text-slate-600 text-xs py-14 sm:py-18 border-t border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-3.5 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
                  <Atom className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-slate-900 tracking-tight leading-none">
                    Science<span className="text-emerald-600">KH</span>
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 tracking-wide mt-1">
                    {isKhmer ? "កម្មវិធីសិក្សា MoEYS · ថ្នាក់ទី ៧-១២" : "MoEYS STEM · Grades 7–12"}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed text-xs">{footerCopy.brandTagline}</p>

              {footerCopy.coverageTag && (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{footerCopy.coverageTag}</span>
                </div>
              )}
            </div>

            {/* Link Sections */}
            {footerCopy.sections.map((sec, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">
                  {sec.title}
                </h4>
                <ul className="space-y-2.5">
                  {sec.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-slate-500 hover:text-emerald-700 transition-colors inline-block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sub-footer Bottom Bar */}
          <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} ScienceKH. {footerCopy.rights}
            </p>

            {/* Clean Segmented Language Switcher */}
            <div
              className="inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => onLanguageChange("km")}
                aria-pressed={currentLang === "km"}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  currentLang === "km"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                ភាសាខ្មែរ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("en")}
                aria-pressed={currentLang === "en"}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  currentLang === "en"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
