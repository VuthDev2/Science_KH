import { X, Check, ArrowDown, Sparkles, Atom, ShieldCheck, Languages, Bot } from "lucide-react";
import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ProblemSolutionSectionProps {
  copy: LandingCopy["problemSolution"];
}

const ITEM_ICONS: Record<string, React.ElementType> = {
  rote: Atom,
  cost: ShieldCheck,
  language: Languages,
  feedback: Bot,
};

export function ProblemSolutionSection({ copy }: ProblemSolutionSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#FBFBFA] border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{copy.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.18]">
              {copy.title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              {copy.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Paired Problem-Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {copy.items.map((item, index) => {
            const Icon = ITEM_ICONS[item.id] || Atom;

            return (
              <ScrollReveal
                key={item.id}
                animation="fade-up"
                delay={index * 110}
                duration={650}
                className="group rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:shadow-2xl hover:border-emerald-300/80 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Subtle top hover glow */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/0 group-hover:via-emerald-500/60 to-transparent transition-all duration-500" />
                {/* 1. Card Top Bar with Category Icon & Index */}
                <div className="px-4 sm:px-7 pt-5 sm:pt-6 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-700 shadow-2xs group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 group-hover:scale-105 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    {item.category && (
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200/60 px-2.5 py-0.5 rounded-full font-mono group-hover:border-emerald-300 group-hover:text-emerald-700 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* 2. The Traditional Hurdle (Problem) */}
                <div className="px-4 sm:px-7 py-2.5 sm:py-3 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200/70 px-2 py-0.5 rounded-md">
                    <X className="w-3 h-3 text-rose-500 stroke-[2.5]" />
                    <span>{copy.problemLabel || "Traditional Barrier"}</span>
                  </div>

                  <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug">
                    {item.problemTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {item.problemDesc}
                  </p>
                </div>

                {/* 3. Transition Connector */}
                <div className="relative px-4 sm:px-7 my-1 select-none">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200/70 group-hover:bg-emerald-200/60 transition-colors" />
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-colors">
                      <span>{copy.solutionLabel || "The ScienceKH Breakthrough"}</span>
                      <ArrowDown className="w-2.5 h-2.5 text-emerald-600 animate-bounce" />
                    </div>
                    <div className="h-px flex-1 bg-slate-200/70 group-hover:bg-emerald-200/60 transition-colors" />
                  </div>
                </div>

                {/* 4. The ScienceKH Breakthrough (Solution) */}
                <div className="m-2.5 sm:m-4 p-3.5 sm:p-5 rounded-xl bg-[#F0FDF4]/70 border border-emerald-200/80 space-y-2.5 shadow-2xs group-hover:bg-[#F0FDF4] group-hover:border-emerald-300 transition-all">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-110 transition-transform">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-slate-900 font-bold text-sm sm:text-[15px] tracking-tight leading-snug">
                        {item.solutionTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.solutionDesc}
                      </p>
                    </div>
                  </div>

                  {/* Feature Tag Highlight */}
                  {item.solutionHighlight && (
                    <div className="pl-7.5 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-white border border-emerald-300/80 px-2.5 py-1 rounded-lg shadow-2xs group-hover:shadow-xs transition-shadow">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{item.solutionHighlight}</span>
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
