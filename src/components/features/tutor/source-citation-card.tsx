// ==============================================================================
// ScienceKH — Verified Source Citation Component
// Transparently Displays Retrieved MoEYS Textbooks & Curriculum Citations
// ==============================================================================

import { useState } from "react";
import { BookOpen, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import type { SourceCitation } from "@/types/rag-tutor";
import { cn } from "@/lib/utils";

interface SourceCitationCardProps {
  sources: SourceCitation[];
  isKhmer: boolean;
  defaultOpen?: boolean;
}

export function SourceCitationCard({ sources, isKhmer, defaultOpen = false }: SourceCitationCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-1 px-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/70 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold transition"
      >
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            {isKhmer ? "ឯកសារយោងផ្លូវការ MoEYS ដែលបានប្រើប្រាស់" : "Verified MoEYS Curriculum Citations"}
          </span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
            {sources.length}
          </span>
        </div>

        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {sources.map((src, idx) => (
            <div
              key={src.id || idx}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs text-[11px]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    📖 {src.documentTitle}
                  </span>
                  {src.isOfficial && (
                    <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-sm bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[9px] border border-emerald-200/80 dark:border-emerald-800/80">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      <span>MoEYS</span>
                    </span>
                  )}
                </div>

                <span className="shrink-0 text-slate-400 font-mono">
                  {src.pageNumber ? `p.${src.pageNumber}` : ""}
                </span>
              </div>

              {src.chapterOrLesson && (
                <div className="text-slate-500 dark:text-slate-400">
                  {src.chapterOrLesson}
                </div>
              )}

              {src.relevanceSnippet && (
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850/80 text-slate-600 dark:text-slate-300 italic text-[10px] leading-relaxed border border-slate-100 dark:border-slate-800">
                  «{src.relevanceSnippet}»
                </div>
              )}

              {src.url && (
                <div className="pt-0.5 flex justify-end">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>{isKhmer ? "បើកឯកសារលើ MoEYS OER / SALA" : "Open in MoEYS Portal"}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
