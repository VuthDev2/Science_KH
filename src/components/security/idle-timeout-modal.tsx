// ==============================================================================
// ScienceKH — Shared Computer Lab Inactivity Warning Dialog
// Beautiful, accessible modal alerting students before automated session sign-out
// ==============================================================================

import { ShieldAlert, Clock, LogOut, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IdleTimeoutModalProps {
  isOpen: boolean;
  remainingSeconds: number;
  onStayLoggedIn: () => void;
  onSignOutNow: () => void;
}

export function IdleTimeoutModal({
  isOpen,
  remainingSeconds,
  onStayLoggedIn,
  onSignOutNow,
}: IdleTimeoutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card border border-border shadow-2xl p-6 sm:p-7 text-center animate-in zoom-in-95 duration-200">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Warning Icon Badge */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
          <ShieldAlert className="h-7 w-7 animate-pulse" />
        </div>

        {/* Localized Titles */}
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          ការដាស់តឿនអសកម្មភាពក្នុងបន្ទប់កុំព្យូទ័រ
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
          Shared Device Inactivity Warning
        </p>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          ដើម្បីការពារសុវត្ថិភាពទិន្នន័យ និងពិន្ទុរបស់អ្នកនៅលើកុំព្យូទ័ររួម
          ប្រព័ន្ធនឹងចាកចេញពីគណនីដោយស្វ័យប្រវត្តិក្នុងរយៈពេល៖
        </p>

        {/* Countdown Pill */}
        <div className="mt-4 mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-4 py-2 text-amber-700 dark:text-amber-300 font-bold text-lg font-mono">
          <Clock className="h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
          <span>{remainingSeconds} វិនាទី (seconds)</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <Button
            type="button"
            onClick={onStayLoggedIn}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>បន្តរៀន (Stay Signed In)</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onSignOutNow}
            className="w-full border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 font-medium gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>ចាកចេញ (Sign Out)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
