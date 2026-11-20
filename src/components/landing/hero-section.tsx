import { Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import type { LandingCopy } from "./types";
import { HeroDemoConsole } from "./hero-demo-console";
import { sounds } from "@/lib/sound-effects";

interface HeroSectionProps {
  copy: LandingCopy["hero"];
  isKhmer: boolean;
}

export function HeroSection({ copy, isKhmer }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-24 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-7">
        {/* Academic Trust Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{copy.badge}</span>
          </div>
        </div>

        {/* Clean, High-Contrast Headline */}
        <h1 className="max-w-3xl mx-auto text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
          <span>{copy.titleStart} </span>
          <span className="text-emerald-600 font-black">{copy.titleHighlight}</span>{" "}
          <span>{copy.titleEnd}</span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal px-1">
          {copy.subtitle}
        </p>

        {/* Two Solid, Production-Grade Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 w-full max-w-md sm:max-w-none mx-auto">
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            onClick={() => sounds.playPop()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all duration-150 active:scale-98 cursor-pointer"
          >
            <span>{copy.primaryCta}</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#curriculum"
            onClick={() => sounds.playPop()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-150 active:scale-98 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>{copy.secondaryCta}</span>
          </a>
        </div>

        {/* Clean Trust Ticks in a Single Row */}
        <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-3 sm:gap-x-7 text-xs sm:text-sm text-slate-600 font-medium pt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{copy.trustMoEYS}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{copy.trustLevels}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{copy.trustBilingual}</span>
          </div>
        </div>

        {/* Grounded Interactive Product Console */}
        <div className="pt-4 max-w-4xl mx-auto">
          <HeroDemoConsole copy={copy} isKhmer={isKhmer} />
        </div>
      </div>
    </section>
  );
}
