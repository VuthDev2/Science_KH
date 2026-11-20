import { useState, useEffect } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import type { LandingCopy } from "./types";

interface AnnouncementBarProps {
  copy: LandingCopy["announcement"];
}

const DISMISSED_STORAGE_KEY = "sciencekh_announcement_dismissed_v1";

export function AnnouncementBar({ copy }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(true); // default true to prevent SSR hydration flash

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem(DISMISSED_STORAGE_KEY);
      if (!isDismissed) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISSED_STORAGE_KEY, "true");
    } catch {
      // noop in private mode
    }
  };

  if (dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Announcement"
      className="relative z-30 bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-slate-800 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 flex-wrap text-center pr-6 sm:pr-0">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/30">
            <Sparkles className="w-3 h-3 text-emerald-400" aria-hidden="true" />
            {copy.badge}
          </span>
          <span className="text-slate-200 font-medium">{copy.text}</span>
          <a
            href="#exam-prep"
            className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
          >
            {copy.cta}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label={copy.dismissAria}
          className="absolute right-3 sm:static p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
