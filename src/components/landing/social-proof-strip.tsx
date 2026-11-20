import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SocialProofStripProps {
  copy: LandingCopy["socialProof"];
}

export function SocialProofStrip({ copy }: SocialProofStripProps) {
  return (
    <section className="py-10 sm:py-14 border-y border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 relative overflow-hidden">
      {/* Background subtle sheen */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(16,185,129,0.06),transparent_80%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-down" duration={500}>
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500">
              {copy.label}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          {copy.stats.map((stat, i) => (
            <ScrollReveal
              key={i}
              animation="fade-up"
              delay={i * 90}
              duration={600}
              className="space-y-1 group transition-all duration-300 hover:-translate-y-1.5 cursor-default p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-slate-200/70 hover:border-emerald-300 hover:bg-white hover:shadow-lg"
            >
              <p className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors drop-shadow-2xs">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-700">{stat.label}</p>
              {stat.note && <p className="text-[11px] text-slate-500 font-medium">{stat.note}</p>}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
