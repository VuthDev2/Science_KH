import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface HowItWorksSectionProps {
  copy: LandingCopy["howItWorks"];
}

export function HowItWorksSection({ copy }: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-20 md:py-24 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
              {copy.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{copy.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 relative">
          {copy.steps.map((item, idx) => (
            <ScrollReveal
              key={idx}
              animation="fade-up"
              delay={idx * 120}
              duration={650}
              className="relative rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 sm:p-8 space-y-3 sm:space-y-4 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-xs group-hover:bg-emerald-600 group-hover:scale-105 transition-all duration-200">
                {item.step}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
