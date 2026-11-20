import { Bot, Sparkles } from "lucide-react";
import type { AuthCopy } from "./types";

interface DrSokhaCardProps {
  copy: AuthCopy["showcase"]["tutorPreview"];
}

export function DrSokhaCard({ copy }: DrSokhaCardProps) {
  return (
    <div className="w-full rounded-2xl bg-[#0E1626] border border-slate-800 p-4 sm:p-5 space-y-3.5 shadow-lg shadow-black/30">
      {/* Product Window Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0E1626]"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight leading-snug">
              {copy.tutorName}
            </h3>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">
              {copy.tutorRole}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1 select-none">
          <Sparkles className="w-2.5 h-2.5" />
          Socratic AI
        </span>
      </div>

      {/* Realistic Conversation Thread */}
      <div className="space-y-2.5 text-xs">
        {/* Student Question */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-0.5">
            {copy.studentLabel || "Student"}
          </span>
          <div className="rounded-xl bg-[#152033] border border-slate-700/60 p-3 text-slate-200 leading-relaxed font-normal">
            {copy.studentQuery}
          </div>
        </div>

        {/* AI Tutor Response */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 pl-0.5">
            {copy.tutorLabel || "Kru Vuth"}
          </span>
          <div className="rounded-xl bg-[#0B251E] border border-emerald-800/60 p-3.5 text-emerald-100 leading-relaxed font-normal">
            {copy.tutorReply}
          </div>
        </div>
      </div>
    </div>
  );
}
