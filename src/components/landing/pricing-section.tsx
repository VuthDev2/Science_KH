import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface PricingSectionProps {
  copy: LandingCopy["pricing"];
  isKhmer: boolean;
}

export function PricingSection({ copy, isKhmer }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
              {copy.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">{copy.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Free Plan Card + Value Comparison Table */}
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Free Plan Highlight Card */}
          <ScrollReveal
            animation="fade-up"
            delay={80}
            duration={650}
            className="rounded-2xl border-2 border-emerald-500/40 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 group"
          >
            <div className="space-y-2 text-left">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider group-hover:bg-emerald-200/80 transition-colors">
                {copy.freePlan.name}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900 group-hover:text-emerald-950 transition-colors">
                  {copy.freePlan.price}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  / {copy.freePlan.period}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">{copy.freePlan.desc}</p>
            </div>

            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 shrink-0 active:scale-98 cursor-pointer"
            >
              <span>{copy.freePlan.cta}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* Honest Comparison Table */}
          <ScrollReveal
            animation="fade-up"
            delay={180}
            duration={650}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="px-6 py-4 bg-slate-100/70 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">{copy.comparison.title}</h3>
            </div>

            <div className="overflow-x-auto scrollbar-none">
              <div className="min-w-[440px] divide-y divide-slate-100">
                <div className="grid grid-cols-3 p-3.5 sm:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                  <span>{isKhmer ? "លក្ខណៈពិសេស" : "Feature"}</span>
                  <span className="text-center text-emerald-700 font-extrabold">ScienceKH</span>
                  <span className="text-center text-slate-500">
                    {copy.comparison.extraClassName}
                  </span>
                </div>

                {copy.comparison.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 p-3.5 sm:p-4 text-xs sm:text-sm items-center hover:bg-emerald-50/30 transition-colors"
                  >
                    <span className="font-semibold text-slate-800">{row.feature}</span>
                    <span className="text-center font-bold text-emerald-700 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.scienceKh}</span>
                    </span>
                    <span className="text-center text-slate-500 flex items-center justify-center gap-1.5">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{row.extraClass}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
