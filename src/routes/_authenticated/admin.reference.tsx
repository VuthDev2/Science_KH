// ==============================================================================
// ScienceKH — Administrative Reference Library Verification & Management
// Human-in-the-Loop MoEYS Academic Editorial Board Portal
// ==============================================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  Archive,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Filter,
  RefreshCw,
  Search,
  Check,
  X,
  Plus,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { cn, cleanLatexDisplayTitle } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { toast } from "sonner";
import { ReferenceRepository } from "@/services/supabase/reference.repository";
import type {
  ReferenceEntry,
  VerificationStatus,
  ReferenceType,
} from "@/types/reference-library";
import { REFERENCE_TYPE_LABELS } from "@/types/reference-library";

export const Route = createFileRoute("/_authenticated/admin/reference")({
  head: () => ({
    meta: [{ title: "Reference Library Review Queue — ScienceKH Admin" }],
  }),
  component: AdminReferenceReviewPage,
});

const STATUS_TABS: Array<{ status: VerificationStatus; labelKm: string; labelEn: string }> = [
  { status: "verified", labelKm: "បានផ្ទៀងផ្ទាត់ (Verified)", labelEn: "Verified" },
  { status: "pending_review", labelKm: "រង់ចាំពិនិត្យ (Pending)", labelEn: "Pending Review" },
  { status: "draft", labelKm: "សេចក្តីព្រាង (Drafts)", labelEn: "Drafts" },
  { status: "needs_correction", labelKm: "ត្រូវកែប្រែ (Needs Correction)", labelEn: "Needs Correction" },
  { status: "archived", labelKm: "ប័ណ្ណសារ (Archived)", labelEn: "Archived" },
];

function AdminReferenceReviewPage() {
  const { lang } = useProfile();
  const isKhmer = lang === "km";

  const [activeStatus, setActiveStatus] = useState<VerificationStatus>("verified");
  const [entries, setEntries] = useState<ReferenceEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadQueue = (status: VerificationStatus) => {
    setIsLoading(true);
    ReferenceRepository.getAdminReviewQueue(status)
      .then((data) => {
        setEntries(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadQueue(activeStatus);
  }, [activeStatus]);

  const handleUpdateStatus = async (
    entryId: string,
    newStatus: VerificationStatus,
    entryTitle: string
  ) => {
    sounds.playPop();
    triggerHapticSelection();

    const success = await ReferenceRepository.updateVerificationStatus(entryId, newStatus);
    if (success) {
      toast.success(
        isKhmer
          ? `បានប្តូរស្ថានភាព «${entryTitle}» ទៅជា ${newStatus}`
          : `Updated status of ${entryTitle} to ${newStatus}`
      );
      loadQueue(activeStatus);
    } else {
      toast.error(isKhmer ? "បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាព" : "Failed to update status");
    }
  };

  const filtered = entries.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.originalTitleKh.toLowerCase().includes(q) ||
      e.titleEn.toLowerCase().includes(q) ||
      e.subjectSlug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-28">
      {/* Top Header */}
      <header
        className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 header-safe-top"
        style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[4rem] py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2 -ml-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {isKhmer ? "ការគ្រប់គ្រង & ផ្ទៀងផ្ទាត់ឯកសារយោង MoEYS" : "MoEYS Reference Library Moderation"}
                </h1>
              </div>
              <p className="text-[11px] text-slate-400">
                {isKhmer ? "ត្រួតពិនិត្យភាពត្រឹមត្រូវតាមសៀវភៅពុម្ពផ្លូវការក្រសួង" : "Verify official curriculum citations & accuracy"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/reference"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition"
            >
              <span>{isKhmer ? "មើលទំព័រសិស្ស" : "Student View"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {STATUS_TABS.map((tab) => {
            const isSelected = activeStatus === tab.status;
            return (
              <button
                key={tab.status}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setActiveStatus(tab.status);
                }}
                className={cn(
                  "px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 active:scale-95 border",
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                )}
              >
                {isKhmer ? tab.labelKm : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isKhmer ? "ស្វែងរកក្នុងបញ្ជីផ្ទៀងផ្ទាត់..." : "Search review queue..."}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{isKhmer ? "ចំនួនធាតុ៖" : "Entries:"} <strong>{filtered.length}</strong></span>
            <button
              type="button"
              onClick={() => loadQueue(activeStatus)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="ផ្ទុកឡើងវិញ"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Queue Items Table / Cards */}
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400 space-y-2">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-emerald-500" />
            <p>{isKhmer ? "កំពុងទាញយកបញ្ជី..." : "Loading review queue..."}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              {isKhmer ? "គ្មានធាតុក្នុងជួរនេះឡើយ" : "No items in this queue"}
            </h3>
            <p className="text-xs text-slate-400">
              {isKhmer ? "គ្រប់ឯកសារទាំងអស់ត្រូវបានផ្ទៀងផ្ទាត់រួចរាល់" : "All items in this status have been handled."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const typeMeta = REFERENCE_TYPE_LABELS[item.referenceType] || REFERENCE_TYPE_LABELS.other;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", typeMeta.badgeColor)}>
                        {typeMeta.emoji} {isKhmer ? typeMeta.labelKm : typeMeta.labelEn}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.subjectSlug}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {isKhmer ? `ថ្នាក់ទី ${item.grades.join(", ")}` : `G${item.grades.join(",")}`}
                      </span>
                      {item.verificationStatus === "verified" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{isKhmer ? "ផ្ទៀងផ្ទាត់ដោយ MoEYS" : "Verified by MoEYS"}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-500">
                          ● {item.verificationStatus}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <Link
                        to="/reference/$referenceId"
                        params={{ referenceId: item.slug || item.id }}
                        target="_blank"
                        className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition"
                      >
                        {isKhmer ? "មើលផ្ទាល់" : "Preview"}
                      </Link>

                      {item.verificationStatus !== "verified" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item.id, "verified", item.originalTitleKh)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{isKhmer ? "អនុម័ត MoEYS" : "Verify"}</span>
                        </button>
                      )}

                      {item.verificationStatus !== "needs_correction" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(item.id, "needs_correction", item.originalTitleKh)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 transition"
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>{isKhmer ? "ត្រូវកែ" : "Flag"}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cleanLatexDisplayTitle(item.originalTitleKh)}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.titleEn}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {item.shortDescriptionKh}
                  </p>

                  {/* Primary Source Citation */}
                  {item.sources && item.sources[0]?.sourceDocument && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>📖 {item.sources[0].sourceDocument.titleKm} ({item.sources[0].chapterKm || "ជំពូកគ្រឹះ"})</span>
                      {item.verifiedBy && (
                        <span className="text-slate-400">ត្រួតពិនិត្យដោយ៖ {item.verifiedBy}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
