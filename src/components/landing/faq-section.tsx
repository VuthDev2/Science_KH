import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FaqSectionProps {
  copy: LandingCopy["faq"];
}

export function FaqSection({ copy }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center space-y-3 mb-10 sm:mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
              {copy.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{copy.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Accordion Items */}
        <div className="space-y-2.5 sm:space-y-3">
          {copy.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 70}
                duration={550}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3.5 sm:gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer select-none"
                >
                  <span className="leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.answer}
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
