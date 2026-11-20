// ==============================================================================
// ScienceKH — Explore: Educational Resource Discovery Center (មជ្ឈមណ្ឌលស្វែងយល់ធនធានសិក្សា)
// Unifies Study References, STEM Fundamentals, National Exam Archive, and Saved Resources
// Minimalist, premium academic design aligned with MoEYS Curriculum Standards
// ==============================================================================

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  BookOpen,
  FileText,
  Bookmark,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  GraduationCap,
  X,
  BookmarkCheck,
  Compass,
  Bot,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { AppShell } from "@/components/layout/app-shell";
import { cn, cleanLatexDisplayTitle } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { ReferenceRepository } from "@/services/supabase/reference.repository";
import type { ReferenceEntry } from "@/types/reference-library";
import { ALL_CURATED_LESSONS } from "@/lib/curriculum";
import { HISTORICAL_EXAM_ARCHIVE } from "@/lib/moeys-exam-bank";
import { getOfflineExamIds } from "@/lib/offline-exam";
import { getSavedLessonIds } from "@/lib/saved-resources";

type ExploreTab = "all" | "references" | "exams" | "saved";

export const Route = createFileRoute("/_authenticated/explore")({
  head: () => ({
    meta: [
      { title: "Explore Educational Resources — ScienceKH" },
      {
        name: "description",
        content:
          "Discover Cambodian MoEYS-aligned Study References, STEM Fundamentals, National Exam Archive, and saved learning materials.",
      },
    ],
  }),
  component: ExplorePage,
});

export function ExplorePage() {
  const { lang, data: profile } = useProfile();
  const isKhmer = lang === "km";
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<ExploreTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number>(profile?.grade ?? 12);

  // References Data
  const [allReferences, setAllReferences] = useState<ReferenceEntry[]>([]);
  const [isLoadingReferences, setIsLoadingReferences] = useState(true);

  // Saved resources ids
  const [bookmarkedRefIds, setBookmarkedRefIds] = useState<Set<string>>(new Set());
  const [savedExamIds, setSavedExamIds] = useState<Set<string>>(new Set());
  const [savedLessonIds, setSavedLessonIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;
    ReferenceRepository.getReferences({
      grade: selectedGrade,
      stream: "all",
      subjectSlug: "all",
      referenceType: "all",
      searchQuery: "",
    })
      .then((data: ReferenceEntry[]) => {
        if (mounted) {
          setAllReferences(data);
          setIsLoadingReferences(false);
        }
      })
      .catch(() => {
        if (mounted) setIsLoadingReferences(false);
      });

    // Load saved IDs
    if (typeof window !== "undefined") {
      setBookmarkedRefIds(ReferenceRepository.getBookmarkedIds());
      setSavedExamIds(new Set(getOfflineExamIds()));
      setSavedLessonIds(getSavedLessonIds());
    }

    return () => {
      mounted = false;
    };
  }, [selectedGrade]);

  // Unified Filtered Results
  const filteredReferences = useMemo(() => {
    if (!searchQuery.trim()) return allReferences.slice(0, 6);
    const q = searchQuery.toLowerCase();
    return allReferences.filter(
      (r) =>
        r.originalTitleKh.toLowerCase().includes(q) ||
        (r.titleEn && r.titleEn.toLowerCase().includes(q)) ||
        r.keyTerms.some((t) => t.toLowerCase().includes(q)) ||
        r.subjectSlug.toLowerCase().includes(q)
    );
  }, [allReferences, searchQuery]);

  const filteredExams = useMemo(() => {
    if (!searchQuery.trim()) return HISTORICAL_EXAM_ARCHIVE.slice(0, 6);
    const q = searchQuery.toLowerCase();
    return HISTORICAL_EXAM_ARCHIVE.filter(
      (e) =>
        e.originalTitleKh.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        (e.examinationYear && e.examinationYear.toString().includes(q))
    );
  }, [searchQuery]);

  // Saved Items collection
  const savedReferencesList = useMemo(() => {
    return allReferences.filter((r) => bookmarkedRefIds.has(r.id) || (r.slug && bookmarkedRefIds.has(r.slug)));
  }, [allReferences, bookmarkedRefIds]);

  const savedExamsList = useMemo(() => {
    return HISTORICAL_EXAM_ARCHIVE.filter((e) => savedExamIds.has(e.id));
  }, [savedExamIds]);

  const savedLessonsList = useMemo(() => {
    return ALL_CURATED_LESSONS.filter((l) => savedLessonIds.has(l.id));
  }, [savedLessonIds]);

  const totalSavedCount = savedReferencesList.length + savedExamsList.length + savedLessonsList.length;

  return (
    <AppShell
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "ស្វែងយល់" : "Explore" },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* Quick Resource Shortcuts Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="h-4 w-4 text-emerald-600" />
              <span>{isKhmer ? "ផ្លូវកាត់ធនធានសិក្សា" : "Resource Shortcuts"}</span>
            </h3>
            <div className="space-y-2">
              <Link
                to="/reference"
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-emerald-500 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      {isKhmer ? "បណ្ណាល័យឯកសារយោង" : "Reference Library"}
                    </span>
                    <span className="text-[10.5px] text-slate-400">
                      {isKhmer ? "រូបមន្ត និមិត្តសញ្ញា និងច្បាប់" : "Formulas, Symbols & Laws"}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/exams"
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-blue-500 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      {isKhmer ? "វិញ្ញាសាជាតិ MoEYS" : "National Exam Archive"}
                    </span>
                    <span className="text-[10.5px] text-slate-400">
                      {isKhmer ? "បាក់ឌុប & សិស្សពូកែ" : "Bac II & Outstanding Students"}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/tutor"
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-purple-500 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="h-4 w-4 text-purple-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      {isKhmer ? "លោកគ្រូ វុឌ្ឍ AI" : "Kru Vuth AI Tutor"}
                    </span>
                    <span className="text-[10.5px] text-slate-400">
                      {isKhmer ? "ជំនួយការសួរឆ្លើយ MoEYS" : "Curriculum-Aware Mentor"}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Saved Resources Count Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <BookmarkCheck className="h-4 w-4 text-amber-500" />
                <span>{isKhmer ? "ធនធានបានរក្សាទុក" : "Saved Resources"}</span>
              </span>
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/80">
                {totalSavedCount}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isKhmer
                ? "ឯកសារ និងរូបមន្តដែលអ្នកបាន Bookmark អាចបើកអានក្រៅបណ្តាញ (Offline) បានគ្រប់ពេល។"
                : "Bookmarked formulas and exam papers are indexed and available offline."}
            </p>
          </div>
        </div>
      }
    >
      {/* ================================================================== */}
      {/* 1. MOBILE-ONLY TOP HEADER: SAFE AREA INSET + BRAND + TABS          */}
      {/* ================================================================== */}
      <header
        className="lg:hidden sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors header-safe-top mb-3"
        style={{ paddingTop: "max(2.75rem, calc(env(safe-area-inset-top, 0px) + 0.35rem))" }}
      >
        <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl px-4 sm:px-6 pt-3 pb-2.5 space-y-2.5">
          {/* Top Bar: Brand, Title & Grade Capsule */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white font-black text-xs shadow-2xs">
                <Compass className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-sm font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? "ស្វែងយល់" : "Explore"}
                </h1>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 leading-none truncate">
                  {isKhmer ? "ធនធាន & វិញ្ញាសាជាតិ" : "Resources & Exams"}
                </p>
              </div>
            </div>

            {/* Academic Grade Capsule */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs shrink-0">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{isKhmer ? `ថ្នាក់ទី ${selectedGrade}` : `Grade ${selectedGrade}`}</span>
            </div>
          </div>

          {/* Compact Fast Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isKhmer ? "ស្វែងរករូបមន្ត វិញ្ញាសា (ឧ. ល្បឿន, បាក់ឌុប)..." : "Search formulas, exams (e.g. speed, Bac II)..."}
              className="w-full h-9 pl-9.5 pr-8 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none shadow-2xs transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Fast Category Filter Tabs (Duolingo / Apple HIG Pill Row) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "all", labelKm: "ទាំងអស់", labelEn: "All", icon: Sparkles },
              { id: "references", labelKm: "ឯកសារយោង", labelEn: "References", icon: BookOpen },
              { id: "exams", labelKm: "វិញ្ញាសាជាតិ", labelEn: "Exams", icon: FileText },
              { id: "saved", labelKm: `រក្សាទុក (${totalSavedCount})`, labelEn: `Saved (${totalSavedCount})`, icon: BookmarkCheck },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setActiveTab(tab.id as ExploreTab);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 shrink-0 cursor-pointer shadow-2xs border",
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-black"
                      : "bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                  )}
                >
                  <IconComp className={cn("h-3.5 w-3.5", isSelected ? "text-white" : "text-slate-400")} />
                  <span>{isKhmer ? tab.labelKm : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* 2. DESKTOP CONTROLS: HERO TITLE, SEARCH & FILTER TABS              */}
      {/* ================================================================== */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-0 space-y-6 pb-40 lg:pb-8">
        {/* Desktop Header Banner */}
        <header className="hidden lg:block space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isKhmer ? "មជ្ឈមណ្ឌលធនធានសិក្សា MoEYS" : "MoEYS Resource Discovery Center"}</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isKhmer ? "ស្វែងយល់ធនធានសិក្សា" : "Explore Educational Resources"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {isKhmer
              ? "បណ្ណាល័យឯកសារយោង មូលដ្ឋានគ្រឹះ STEM វិញ្ញាសាជាតិ និងធនធានបានរក្សាទុកសម្រាប់ថ្នាក់ទី ៧-១២"
              : "Study references, STEM fundamentals, national exams, and saved resources for Grades 7–12"}
          </p>
        </header>

        {/* Desktop Global Search Bar */}
        <div className="hidden lg:block relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isKhmer
                ? "ស្វែងរករូបមន្ត និមិត្តសញ្ញា វិញ្ញាសា (ឧ. ល្បឿន, បាក់ឌុប, សមីការ)..."
                : "Search formulas, symbols, exams (e.g. speed, Bac II, equation)..."
            }
            className="w-full h-11 pl-10 pr-9 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 shadow-2xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Desktop Category Filter Tabs */}
        <div className="hidden lg:flex items-center gap-2">
          {[
            { id: "all", labelKm: "គ្រប់ធនធានទាំងអស់", labelEn: "All Resources", icon: Sparkles },
            { id: "references", labelKm: "បណ្ណាល័យឯកសារយោង", labelEn: "Reference Library", icon: BookOpen },
            { id: "exams", labelKm: "បណ្ណសារវិញ្ញាសាជាតិ", labelEn: "National Exams", icon: FileText },
            { id: "saved", labelKm: `ធនធានបានរក្សាទុក (${totalSavedCount})`, labelEn: `Saved Resources (${totalSavedCount})`, icon: BookmarkCheck },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setActiveTab(tab.id as ExploreTab);
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer border",
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs font-black"
                    : "bg-white dark:bg-slate-900 border-[#E5EAF0] dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                )}
              >
                <IconComp className={cn("h-4 w-4", isSelected ? "text-white" : "text-slate-400")} />
                <span>{isKhmer ? tab.labelKm : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================== */}
        {/* 3. CONTENT: SEARCH RESULTS OR FILTERED DESTINATIONS                */}
        {/* ================================================================== */}
        {searchQuery.trim() ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold">
                {isKhmer ? `លទ្ធផលស្វែងរកសម្រាប់ "${searchQuery}"` : `Search results for "${searchQuery}"`}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                {isKhmer ? "សម្អាត" : "Clear"}
              </button>
            </div>

            {/* Matching References */}
            {filteredReferences.length > 0 && (
              <div className="p-4 sm:p-5 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isKhmer ? "ឯកសារយោង & រូបមន្ត" : "References & Formulas"}
                </span>
                <div className="space-y-2">
                  {filteredReferences.map((ref) => (
                    <Link
                      key={ref.id}
                      to="/reference/$referenceId"
                      params={{ referenceId: ref.slug || ref.id }}
                      onClick={() => sounds.playPop()}
                      className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 hover:border-emerald-500 transition flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition truncate">
                            {cleanLatexDisplayTitle(ref.originalTitleKh)}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            ថ្នាក់ទី {ref.grades.join(", ")}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {ref.shortDescriptionKh}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Exams */}
            {filteredExams.length > 0 && (
              <div className="p-4 sm:p-5 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isKhmer ? "វិញ្ញាសាជាតិ MoEYS" : "National Examination Papers"}
                </span>
                <div className="space-y-2">
                  {filteredExams.map((exam) => (
                    <Link
                      key={exam.id}
                      to="/exams"
                      onClick={() => sounds.playPop()}
                      className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 hover:border-blue-500 transition flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition truncate">
                          {exam.originalTitleKh} {exam.examinationYear ? `(${exam.examinationYear})` : ""}
                        </span>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {exam.subject} · {exam.examinationCategory === "bacii" ? "បាក់ឌុប (Bac II)" : "សិស្សពូកែ (Outstanding)"}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filteredReferences.length === 0 && filteredExams.length === 0 && (
              <div className="p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isKhmer ? "រកមិនឃើញធនធានដែលត្រូវនឹងពាក្យគន្លឹះនេះទេ" : "No resources found matching this query"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {isKhmer ? "សូមសាកល្បងស្វែងរកដោយពាក្យគន្លឹះទូទៅ (ឧ. ល្បឿន, អាំងតេក្រាល, បាក់ឌុប)" : "Try searching for terms like speed, integral, or Bac II"}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ================================================================ */
          /* THE 3 PRIMARY DISCOVERY DESTINATIONS WITH FILTER INTEGRATION      */
          /* ================================================================ */
          <div className="space-y-4">
            {/* -------------------------------------------------------------- */}
            {/* CARD A: STUDY REFERENCE LIBRARY                                */}
            {/* -------------------------------------------------------------- */}
            {(activeTab === "all" || activeTab === "references") && (
              <article className="p-5 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs transition space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] grid place-items-center shrink-0 border border-emerald-100 dark:border-emerald-900/40">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {isKhmer ? "បណ្ណាល័យឯកសារយោង & STEM" : "Study Reference Library"}
                        </h2>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-[#059669]">
                          MoEYS
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {isKhmer
                          ? "រូបមន្ត និមិត្តសញ្ញា និយមន័យ ទ្រឹស្តីបទ និងខ្នាត SI ស្តង់ដារថ្នាក់ទី ៧-១២"
                          : "Formulas, symbols, definitions, theorems, laws & SI units for Grades 7–12"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subject Quick Capsules */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { slug: "mathematics", nameKm: "គណិតវិទ្យា", icon: Calculator, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900/40" },
                    { slug: "physics", nameKm: "រូបវិទ្យា", icon: Atom, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-100 dark:border-purple-900/40" },
                    { slug: "chemistry", nameKm: "គីមីវិទ្យា", icon: FlaskConical, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/40" },
                    { slug: "biology", nameKm: "ជីវវិទ្យា", icon: Dna, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/60 border-teal-100 dark:border-teal-900/40" },
                  ].map((sub) => {
                    const IconComp = sub.icon;
                    return (
                      <Link
                        key={sub.slug}
                        to="/reference"
                        search={{ grade: selectedGrade, subject: sub.slug }}
                        onClick={() => sounds.playPop()}
                        className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 hover:border-slate-300 dark:hover:border-slate-700 transition flex items-center gap-2 group cursor-pointer"
                      >
                        <div className={cn("h-7 w-7 rounded-lg grid place-items-center shrink-0 border", sub.color)}>
                          <IconComp className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#059669] transition truncate">
                          {sub.nameKm}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Tactile 3D Action Button */}
                <Link
                  to="/reference"
                  search={{ grade: selectedGrade }}
                  onClick={() => sounds.playPop()}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-0.5 text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer select-none"
                >
                  <span>{isKhmer ? "ស្វែងរកឯកសារយោង (Browse References)" : "Browse References"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            )}

            {/* -------------------------------------------------------------- */}
            {/* CARD B: NATIONAL EXAMINATION ARCHIVE                           */}
            {/* -------------------------------------------------------------- */}
            {(activeTab === "all" || activeTab === "exams") && (
              <article className="p-5 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs transition space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 grid place-items-center shrink-0 border border-blue-100 dark:border-blue-900/40">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {isKhmer ? "បណ្ណសារវិញ្ញាសាជាតិ MoEYS" : "National Exam Archive"}
                        </h2>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                          2011–2024
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {isKhmer
                          ? "វិញ្ញាសាប្រឡងបាក់ឌុប និងសិស្សពូកែទូទាំងប្រទេស ស្របតាមអត្រាកំណែ MoEYS"
                          : "MoEYS historical Bac II and Outstanding Students examination papers"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Examination Categories Pill Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 flex items-center gap-2.5">
                    <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {isKhmer ? "វិញ្ញាសាប្រឡងបាក់ឌុប (Bac II)" : "Bac II National Exams"}
                      </span>
                      <span className="text-[10.5px] text-slate-400 block truncate">
                        {isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រពិត & សង្គម" : "Science & Social Science"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {isKhmer ? "សិស្សពូកែទូទាំងប្រទេស" : "Outstanding Students"}
                      </span>
                      <span className="text-[10.5px] text-slate-400 block truncate">
                        {isKhmer ? "ថ្នាក់ទី ៩ និង ១២ (គណិត, រូប, ខ្មែរ)" : "Grades 9 & 12 (Math, Physics, Khmer)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tactile 3D Action Button */}
                <Link
                  to="/exams"
                  onClick={() => sounds.playPop()}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 active:border-b-0 active:translate-y-0.5 text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer select-none"
                >
                  <span>{isKhmer ? "ពិនិត្យវិញ្ញាសាប្រឡង (Browse Examinations)" : "Browse Examinations"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            )}

            {/* -------------------------------------------------------------- */}
            {/* CARD C: SAVED RESOURCES                                        */}
            {/* -------------------------------------------------------------- */}
            {(activeTab === "all" || activeTab === "saved") && (
              <article className="p-5 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs transition space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 grid place-items-center shrink-0 border border-amber-100 dark:border-amber-900/40">
                      <Bookmark className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {isKhmer ? "ធនធានបានរក្សាទុក" : "Saved Resources"}
                        </h2>
                        <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60">
                          {totalSavedCount} {isKhmer ? "ធនធាន" : "Items"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {isKhmer
                          ? "មេរៀន ឯកសារយោង និងវិញ្ញាសាដែលអ្នកបានចំណាំទុកសម្រាប់សិក្សា"
                          : "Bookmarked lessons, study references, and offline examination papers"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Saved Items or Clean Empty State */}
                {totalSavedCount === 0 ? (
                  <div className="p-5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1.5 bg-slate-50/40 dark:bg-slate-850/20">
                    <Bookmark className="h-5 w-5 text-slate-300 dark:text-slate-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {isKhmer ? "មិនទាន់មានធនធានបានរក្សាទុកទេ" : "No saved items yet"}
                    </p>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                      {isKhmer
                        ? "ចុចលើរូបសញ្ញាចំណាំ (Bookmark) លើមេរៀន ឬរូបមន្ត ដើម្បីរក្សាទុកមើលពេលក្រោយ។"
                        : "Tap the bookmark icon on any lesson or reference to access it quickly here."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                    {/* Saved References */}
                    {savedReferencesList.map((ref) => (
                      <Link
                        key={ref.id}
                        to="/reference/$referenceId"
                        params={{ referenceId: ref.slug || ref.id }}
                        onClick={() => sounds.playPop()}
                        className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 hover:border-emerald-400 transition flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          <BookmarkCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {cleanLatexDisplayTitle(ref.originalTitleKh)}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                          {isKhmer ? "ឯកសារយោង" : "Reference"}
                        </span>
                      </Link>
                    ))}

                    {/* Saved Lessons */}
                    {savedLessonsList.map((lesson) => (
                      <Link
                        key={lesson.id}
                        to="/lessons/$lessonId"
                        params={{ lessonId: lesson.id }}
                        onClick={() => sounds.playPop()}
                        className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 hover:border-emerald-400 transition flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          <BookOpen className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {lesson.title_km}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                          {lesson.subject?.name_km || "STEM"}
                        </span>
                      </Link>
                    ))}

                    {/* Saved Exams */}
                    {savedExamsList.map((exam) => (
                      <Link
                        key={exam.id}
                        to="/exams"
                        onClick={() => sounds.playPop()}
                        className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 hover:border-blue-400 transition flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {exam.originalTitleKh} {exam.examinationYear ? `(${exam.examinationYear})` : ""}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-blue-500 shrink-0">
                          {isKhmer ? "វិញ្ញាសា" : "Exam"}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
