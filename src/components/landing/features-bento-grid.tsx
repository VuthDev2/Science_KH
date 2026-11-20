import { useState } from "react";
import { Compass, Flame, Heart, Bot, Languages, Sparkles, Check, CheckCircle2 } from "lucide-react";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";
import type { LandingCopy } from "./types";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FeaturesBentoGridProps {
  copy: LandingCopy["features"];
  isKhmer: boolean;
}

interface VocabCard {
  id: string;
  pairId: string;
  type: "km" | "en";
  text: string;
}

export function FeaturesBentoGrid({ copy, isKhmer }: FeaturesBentoGridProps) {
  // Vocabulary Matcher Mini-Game State
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<VocabCard | null>(null);

  const vocabCards: VocabCard[] = [
    { id: "k1", pairId: "atom", type: "km", text: "អាតូម" },
    { id: "e1", pairId: "atom", type: "en", text: "Atom" },
    { id: "k2", pairId: "force", type: "km", text: "កម្លាំង" },
    { id: "e2", pairId: "force", type: "en", text: "Force" },
    { id: "k3", pairId: "accel", type: "km", text: "សំទុះ" },
    { id: "e3", pairId: "accel", type: "en", text: "Acceleration" },
    { id: "k4", pairId: "photo", type: "km", text: "រស្មីសំយោគ" },
    { id: "e4", pairId: "photo", type: "en", text: "Photosynthesis" },
  ];

  const handleCardClick = (card: VocabCard) => {
    if (matchedPairs.includes(card.pairId)) return;

    if (!selectedWord) {
      sounds.playPop();
      setSelectedWord(card);
      return;
    }

    if (selectedWord.id === card.id) {
      setSelectedWord(null);
      return;
    }

    // Check if match
    if (selectedWord.pairId === card.pairId && selectedWord.type !== card.type) {
      sounds.playCorrect();
      const updated = [...matchedPairs, card.pairId];
      setMatchedPairs(updated);
      setSelectedWord(null);
      if (updated.length === 4) {
        launchConfetti();
      }
    } else {
      sounds.playWrong();
      setSelectedWord(null);
    }
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              {copy.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">{copy.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mastery Roadmap (Span 2 cols on md+) */}
          <ScrollReveal
            animation="fade-up"
            delay={80}
            duration={650}
            className="md:col-span-2 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 group-hover:bg-emerald-100/70 transition-colors">
                <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                <span>{copy.roadmap.tag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                {copy.roadmap.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">{copy.roadmap.desc}</p>
            </div>

            {/* Visual Stepping Stone Preview */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between sm:justify-around gap-1 sm:gap-2 group-hover:bg-slate-50 transition-colors overflow-x-auto">
              <div className="flex flex-col items-center gap-1 sm:gap-1.5 transition-transform hover:scale-105 shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                  ថ្នាក់ទី ៧
                </span>
              </div>
              <div className="h-0.5 w-4 sm:w-8 bg-emerald-500 shrink-0" />
              <div className="flex flex-col items-center gap-1 sm:gap-1.5 transition-transform hover:scale-105 shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                  ថ្នាក់ទី ៩
                </span>
              </div>
              <div className="h-0.5 w-4 sm:w-8 bg-slate-300 shrink-0" />
              <div className="flex flex-col items-center gap-1 sm:gap-1.5 transition-transform hover:scale-105 shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-amber-300">
                  ★
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-700">
                  ថ្នាក់ទី ១១
                </span>
              </div>
              <div className="h-0.5 w-4 sm:w-8 bg-slate-200 shrink-0" />
              <div className="flex flex-col items-center gap-1 sm:gap-1.5 opacity-60 transition-transform hover:scale-105 shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-800 text-emerald-300 flex items-center justify-center font-bold text-xs shadow-xs">
                  BacII
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                  ថ្នាក់ទី ១២
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: 5-Heart & Daily Streak Engine */}
          <ScrollReveal
            animation="fade-up"
            delay={180}
            duration={650}
            className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60 group-hover:bg-amber-100/70 transition-colors">
                <Flame className="w-3.5 h-3.5 fill-amber-500 group-hover:scale-110 transition-transform" />
                <span>{copy.streaks.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-950 transition-colors">
                {copy.streaks.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{copy.streaks.desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50 flex items-center justify-between group-hover:bg-amber-50 transition-colors">
              <div className="flex items-center gap-2">
                <Flame className="w-7 h-7 fill-amber-500 text-amber-500 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-amber-950">៧ ថ្ងៃជាប់គ្នា (Streak)</p>
                  <p className="text-[11px] text-amber-800">ការពារការភ្លេចរូបមន្ត</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-rose-500 font-bold text-xs">
                <Heart className="w-4 h-4 fill-rose-500 animate-bounce" />
                <span>5/5</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Socratic STEM Mentor Kru Vuth */}
          <ScrollReveal
            animation="fade-up"
            delay={280}
            duration={650}
            className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 group-hover:bg-emerald-100/70 transition-colors">
                <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>{copy.tutor.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                {copy.tutor.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{copy.tutor.desc}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs space-y-2 group-hover:shadow-md transition-shadow">
              <p className="text-slate-400 font-medium">សិស្ស៖ "ហេតុអ្វីបានជាអាតូមអព្យាក្រឹត?"</p>
              <p className="text-emerald-300 font-normal leading-relaxed">
                លោកគ្រូ វុឌ្ឍ៖ "ព្រោះចំនួនប្រូតុង (+) ស្មើនឹងអេឡិចត្រុង (-)..."
              </p>
            </div>
          </ScrollReveal>

          {/* Card 4: Playable Bilingual Vocabulary Matcher (Span 2 cols on md+) */}
          <ScrollReveal
            animation="fade-up"
            delay={380}
            duration={650}
            className="md:col-span-2 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200/60 group-hover:bg-teal-100/70 transition-colors">
                <Languages className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>{copy.vocab.tag}</span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-teal-950 transition-colors">
                  {copy.vocab.title}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {matchedPairs.length}/4 Pairs Matched
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{copy.vocab.desc}</p>
            </div>

            {/* Playable Vocabulary Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {vocabCards.map((card) => {
                const isMatched = matchedPairs.includes(card.pairId);
                const isSelected = selectedWord?.id === card.id;

                let style =
                  "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100 active:scale-95";
                if (isMatched) {
                  style =
                    "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold opacity-80 cursor-default";
                } else if (isSelected) {
                  style =
                    "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs scale-102";
                }

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched}
                    className={`p-3 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${style}`}
                  >
                    <span>{card.text}</span>
                    {isMatched && (
                      <CheckCircle2 className="w-3.5 h-3.5 inline-block ml-1 text-emerald-700" />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
