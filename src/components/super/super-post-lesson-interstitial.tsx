// ==============================================================================
// ScienceKH — Authentic Duolingo Post-Lesson Super Interstitial Ad
// Displayed strictly after students complete a lesson (never clutters UI).
// Gives students the choice to "Try Super" or "No Thanks" before proceeding.
// Automatically skipped for Super subscribers (100% Ad-Free).
// ==============================================================================

import { useState } from "react";
import {
  Sparkles,
  Heart,
  Target,
  Crown,
  ArrowRight,
  X,
  Check,
  Zap,
} from "lucide-react";
import { useSuper } from "@/lib/super-context";
import { useProfile } from "@/lib/use-profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";

interface SuperPostLessonInterstitialProps {
  isOpen: boolean;
  onProceed: () => void;
}

export function SuperPostLessonInterstitial({
  isOpen,
  onProceed,
}: SuperPostLessonInterstitialProps) {
  const { isSuper, openPaywall } = useSuper();
  const { lang } = useProfile();
  const isKhmer = lang === "km";

  // If already Super subscriber, or modal is closed, don't show ad
  if (!isOpen || isSuper) return null;

  const handleNoThanks = () => {
    sounds.playPop();
    onProceed();
  };

  const handleTrySuper = () => {
    sounds.playPop();
    openPaywall("post_lesson_ad");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-950 border-2 border-cyan-400/50 text-white shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Holographic Iridescent Ambient Lighting */}
        <div className="absolute -top-20 -left-20 w-52 h-52 bg-gradient-to-br from-emerald-500/25 via-cyan-400/20 to-purple-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-gradient-to-tl from-teal-400/20 via-cyan-500/20 to-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Small "AD" / "SPONSORED" Badge + Close Button */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-wider text-cyan-300">
            <Sparkles className="h-3 w-3 fill-cyan-400 text-cyan-400" />
            <span>{isKhmer ? "ការណែនាំពិសេស" : "SUPER AD"}</span>
          </div>

          <button
            type="button"
            onClick={handleNoThanks}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
            aria-label="Skip ad"
            title={isKhmer ? "រំលង" : "Skip"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Center Mascot / Diamond Emblem */}
        <div className="text-center space-y-2 pt-1">
          <div className="relative mx-auto inline-block">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 ring-4 ring-cyan-400/30">
              <span className="text-4xl drop-shadow-md">💎</span>
            </div>
            <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
              <Zap className="h-3.5 w-3.5 fill-current" />
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-black text-white leading-tight">
            {isKhmer
              ? "រៀនកាន់តែលឿនជាមួយ Super ScienceKH!"
              : "Accelerate Your STEM Mastery with Super!"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal px-2">
            {isKhmer
              ? "សិស្សប្រើប្រាស់ Super រៀនបានលឿនជាងមុន ២ ដង ដោយសារតែមានជីវិតគ្មានដែនកំណត់ និងគ្មានការរំខាន។"
              : "Super learners achieve mastery 2x faster with Unlimited Hearts, personalized mistake drills, and zero ads."}
          </p>
        </div>

        {/* 3 Duolingo Value Comparison Bullets */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                <Heart className="h-4 w-4 fill-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {isKhmer ? "ជីវិតគ្មានដែនកំណត់" : "Unlimited Hearts"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isKhmer ? "មិនបារម្ភរឿងអស់ជីវិតពេលរៀន" : "Never run out of energy"}
                </p>
              </div>
            </div>
            <span className="text-sm font-black text-cyan-400 font-display">∞</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                <Target className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {isKhmer ? "ធនាគារកែកំហុស AI" : "AI Smart Mistake Vault"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isKhmer ? "ហាត់រៀនសំណួរដែលធ្លាប់ខុស" : "Drill weak questions"}
                </p>
              </div>
            </div>
            <Check className="h-4 w-4 text-emerald-400 stroke-[3]" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Crown className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {isKhmer ? "គ្មានពាណិជ្ជកម្ម & VIP Aura" : "100% Ad-Free & VIP Badge"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isKhmer ? "រៀនដោយផ្តោតអារម្មណ៍ ១០០%" : "Zero distractions"}
                </p>
              </div>
            </div>
            <Check className="h-4 w-4 text-emerald-400 stroke-[3]" />
          </div>
        </div>

        {/* Dual CTA: Big Button vs "No Thanks" */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleTrySuper}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 active:scale-[0.98] text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 fill-slate-950" />
            <span>
              {isKhmer
                ? "សាកល្បង Super (80,000 KHR/ឆ្នាំ)"
                : "Try Super (80,000 KHR / yr)"}
            </span>
            <ArrowRight className="h-4 w-4 stroke-[3]" />
          </button>

          <button
            type="button"
            onClick={handleNoThanks}
            className="w-full h-10 rounded-xl text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer hover:bg-white/5"
          >
            <span>{isKhmer ? "មិនទាន់ទេ (បន្តទៅមុខ)" : "No Thanks, Continue Free"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
