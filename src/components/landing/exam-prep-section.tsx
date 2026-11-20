import { GraduationCap, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ExamPrepSectionProps {
  copy: LandingCopy["examPrep"];
  isKhmer: boolean;
}

export function ExamPrepSection({ copy, isKhmer }: ExamPrepSectionProps) {
  return (
    <section id="exam-prep" className="py-12 sm:py-20 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              {copy.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{copy.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* 2 Exam Cards: Brevet (Grade 9) & BacII (Grade 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto">
          {/* Brevet (Grade 9) Card */}
          <ScrollReveal
            animation="fade-up"
            delay={80}
            duration={650}
            className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-slate-800 group-hover:scale-105 transition-all">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-bold group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                  {copy.brevet.target}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                {copy.brevet.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {copy.brevet.desc}
              </p>

              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                {copy.brevet.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 group-hover:translate-x-0.5 transition-transform"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
              >
                <span>{copy.cta}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </div>
          </ScrollReveal>

          {/* BacII (Grade 12) Card */}
          <ScrollReveal
            animation="fade-up"
            delay={200}
            duration={650}
            className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/20 p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6 hover:bg-white hover:border-emerald-500/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold group-hover:bg-emerald-200/80 transition-colors">
                  {copy.bacii.target}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                {copy.bacii.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{copy.bacii.desc}</p>

              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                {copy.bacii.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 group-hover:translate-x-0.5 transition-transform"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-emerald-200/60">
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
              >
                <span>{copy.cta}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
