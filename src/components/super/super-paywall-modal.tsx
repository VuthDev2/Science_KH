// ==============================================================================
// ScienceKH — Iconic Holographic "Super ScienceKH" Paywall Modal
// Inspired by Super Duolingo's iridescent neon aesthetics & high-converting layout
// Integrated with Cambodian Bakong KHQR and ABA Mobile payment flows.
// ==============================================================================

import { useState } from "react";
import {
  Sparkles,
  Heart,
  Target,
  Zap,
  Bot,
  Crown,
  Check,
  X,
  ShieldCheck,
  QrCode,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useSuper } from "@/lib/super-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";

export function SuperPaywallModal() {
  const { isPaywallOpen, closePaywall, activateSuper, isSuper } = useSuper();
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">("annual");
  const [showKhqrView, setShowKhqrView] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isPaywallOpen) return null;

  const handleStartUpgrade = () => {
    sounds.playPop();
    setShowKhqrView(true);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    sounds.playCorrect(3);
    setTimeout(() => {
      setIsProcessing(false);
      setShowKhqrView(false);
      activateSuper(selectedPlan);
    }, 1200);
  };

  const priceKhr = selectedPlan === "annual" ? "80,000" : "12,000";
  const priceUsd = selectedPlan === "annual" ? "$19.99" : "$2.99";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-950 border border-emerald-500/30 text-white shadow-2xl p-5 sm:p-7 animate-in zoom-in-95 duration-200">
        {/* Holographic Iridescent Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-gradient-to-br from-emerald-500/25 via-cyan-500/20 to-purple-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-gradient-to-tl from-emerald-400/25 via-teal-500/20 to-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closePaywall}
          className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {!showKhqrView ? (
          <div className="relative z-10 space-y-5">
            {/* Super Header Emblem */}
            <div className="text-center space-y-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-widest uppercase shadow-sm">
                <Sparkles className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>SUPER SCIENCEKH</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                រៀនវិទ្យាសាស្ត្រគ្មានដែនកំណត់
              </h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                ដោះសោសមត្ថភាពរៀនពេញលេញ ជាមួយជីវិតគ្មានដែនកំណត់ និងជំនួយការ AI សូក្រាតផ្ទាល់ខ្លួន
              </p>
            </div>

            {/* Feature Checklist (Super Duolingo Style) */}
            <div className="space-y-2.5 rounded-2xl bg-white/5 border border-white/10 p-3.5 sm:p-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
                  <Heart className="h-4 w-4 fill-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">ជីវិតគ្មានដែនកំណត់ (Unlimited Hearts)</h4>
                  <p className="text-slate-400 text-[11px]">
                    ធ្វើលំហាត់មិនរអាក់រអួល មិនដែលអស់ជីវិតទោះបីជាឆ្លើយខុសប៉ុន្មានដងក៏ដោយ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">ធនាគារកែកំហុសឆ្លាតវៃ (Mistake Vault)</h4>
                  <p className="text-slate-400 text-[11px]">
                    ប្រមូលរាល់សំណួរដែលអ្នកឆ្លើយខុសមកហ្វឹកហាត់ផ្ទាល់ខ្លួនរហូតដល់ចេះស្ទាត់ ១០០%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-400">
                  <Zap className="h-4 w-4 fill-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">ប្រឡងត្រាប់បាក់ឌុបគ្មានដែនកំណត់</h4>
                  <p className="text-slate-400 text-[11px]">
                    សាកល្បងសមត្ថភាពជាមួយវិញ្ញាសា ២០១២–២០២៤ តាមម៉ោងកំណត់ជាក់ស្តែង
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400">
                  <Crown className="h-4 w-4 fill-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">ផ្លាកសញ្ញា VIP លើតារាងចំណាត់ថ្នាក់</h4>
                  <p className="text-slate-400 text-[11px]">
                    រង្វង់ Holographic ពេជ្ររលើបរលោងលើកកិត្តិយសលើ Leaderboard ជាតិ
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Switcher Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Annual Plan (Recommended) */}
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setSelectedPlan("annual");
                }}
                className={cn(
                  "relative p-3.5 rounded-2xl border text-left transition active:scale-98 cursor-pointer flex flex-col justify-between",
                  selectedPlan === "annual"
                    ? "bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-400 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/30"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300",
                )}
              >
                <div className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-sm">
                  សន្សំ 45%
                </div>

                <div>
                  <span className="text-[11px] font-bold block text-slate-400">គម្រោងប្រចាំឆ្នាំ (Annual)</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-black text-white">80,000៛</span>
                    <span className="text-[10px] text-slate-400">/ ឆ្នាំ</span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-emerald-400 font-semibold">
                  ត្រឹមតែ ~6,600៛ ក្នុងមួយខែ
                </div>
              </button>

              {/* Monthly Plan */}
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setSelectedPlan("monthly");
                }}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition active:scale-98 cursor-pointer flex flex-col justify-between",
                  selectedPlan === "monthly"
                    ? "bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-400 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/30"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300",
                )}
              >
                <div>
                  <span className="text-[11px] font-bold block text-slate-400">គម្រោងប្រចាំខែ (Monthly)</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-black text-white">12,000៛</span>
                    <span className="text-[10px] text-slate-400">/ ខែ</span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-400 font-medium">
                  អាចបោះបង់ពេលណាក៏បាន
                </div>
              </button>
            </div>

            {/* CTA Button */}
            <Button
              type="button"
              onClick={handleStartUpgrade}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all active:scale-98 gap-2"
            >
              <Sparkles className="h-4 w-4 fill-slate-950" />
              <span>ដំឡើងទៅ SUPER ឥឡូវនេះ (Upgrade Now)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>ទូទាត់ប្រកបដោយសុវត្ថិភាពតាម Bakong KHQR / ABA Mobile</span>
            </div>
          </div>
        ) : (
          /* Bakong KHQR Checkout Screen */
          <div className="relative z-10 space-y-5 text-center py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>BAKONG KHQR</span>
              </div>
              <h3 className="text-xl font-black text-white">ស្កេនទូទាត់តាម KHQR</h3>
              <p className="text-xs text-slate-300 mt-1">
                ប្រើកម្មវិធី ABA Mobile, Bakong ឬកម្មវិធីធនាគារណាមួយនៅកម្ពុជា
              </p>
            </div>

            {/* KHQR Card */}
            <div className="mx-auto w-56 p-4 rounded-2xl bg-white text-slate-950 shadow-xl space-y-2 border-2 border-red-600">
              <div className="text-[10px] font-black uppercase text-red-600 tracking-wider">
                KHQR • NBC BAKONG
              </div>

              {/* Stylized QR Code Placeholder */}
              <div className="grid place-items-center h-44 w-44 mx-auto rounded-xl bg-slate-100 border border-slate-200 p-2">
                <QrCode className="h-36 w-36 text-slate-900" />
              </div>

              <div className="text-center pt-1">
                <div className="text-xs font-bold text-slate-800">ScienceKH Co., Ltd</div>
                <div className="text-sm font-black text-red-600">{priceKhr} KHR ({priceUsd})</div>
              </div>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              {/* Simulate Instant Payment Button */}
              <Button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulatePayment}
                className="w-full h-11 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-md transition active:scale-98"
              >
                {isProcessing ? "កំពុងផ្ទៀងផ្ទាត់..." : "✔ ផ្ទៀងផ្ទាត់ការទូទាត់ (Simulate Instant Activation)"}
              </Button>

              <button
                type="button"
                onClick={() => setShowKhqrView(false)}
                className="text-xs text-slate-400 hover:text-white transition font-medium block mx-auto pt-1"
              >
                ← ត្រឡប់ក្រោយ (Back to Plans)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
