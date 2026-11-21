// ==============================================================================
// ScienceKH — Desktop Application Top Header (របារក្បាលទំព័រកុំព្យូទ័រ)
// Minimalist, restrained SaaS header displaying breadcrumbs, grade switcher, language, and streak
// ==============================================================================

import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  GraduationCap,
  ChevronDown,
  Flame,
  Sparkles,
  Heart,
  Globe2,
  Bell,
  Check,
  UserRound,
  Layers,
  Sparkle,
} from "lucide-react";
import { useAuth, GUEST_USER_ID } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { useSuper } from "@/lib/super-context";
import { sounds } from "@/lib/sound-effects";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { toKhmerNumeral } from "@/lib/i18n";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DesktopHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  activeGrade?: number;
  onGradeChange?: (grade: number) => void;
  activeStream?: "science" | "social";
  onStreamChange?: (stream: "science" | "social") => void;
  showGradeSelector?: boolean;
}

const MOEYS_GRADES = [
  { grade: 7, labelKm: "ថ្នាក់ទី ៧", labelEn: "Grade 7", tierKm: "អនុវិទ្យាល័យ", tierEn: "Junior High" },
  { grade: 8, labelKm: "ថ្នាក់ទី ៨", labelEn: "Grade 8", tierKm: "អនុវិទ្យាល័យ", tierEn: "Junior High" },
  { grade: 9, labelKm: "ថ្នាក់ទី ៩", labelEn: "Grade 9", tierKm: "ត្រៀមឌីប្លូម", tierEn: "Brevet Prep", isExam: true },
  { grade: 10, labelKm: "ថ្នាក់ទី ១០", labelEn: "Grade 10", tierKm: "វិទ្យាល័យ", tierEn: "Senior High" },
  { grade: 11, labelKm: "ថ្នាក់ទី ១១", labelEn: "Grade 11", tierKm: "វិទ្យាល័យ", tierEn: "Senior High", hasStream: true },
  { grade: 12, labelKm: "ថ្នាក់ទី ១២", labelEn: "Grade 12", tierKm: "ត្រៀមបាក់ឌុប", tierEn: "Bac II Prep", isExam: true, hasStream: true },
];

export function DesktopHeader({
  breadcrumbs,
  title,
  activeGrade: controlledGrade,
  onGradeChange,
  activeStream: controlledStream,
  onStreamChange,
  showGradeSelector = true,
}: DesktopHeaderProps) {
  const { user } = useAuth();
  const { lang, data: profile, setLanguage } = useProfile();
  const { isSuper, hearts, maxHearts, openPaywall } = useSuper();
  const isKhmer = lang === "km";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Grade & stream state
  const currentGrade = controlledGrade ?? profile?.grade ?? 12;
  const [internalStream, setInternalStream] = useState<"science" | "social">("science");
  const currentStream = controlledStream ?? internalStream;

  // Grade Dropdown State
  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const gradeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (gradeMenuRef.current && !gradeMenuRef.current.contains(event.target as Node)) {
        setShowGradeMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle grade change
  const handleSelectGrade = async (grade: number) => {
    sounds.playPop();
    triggerHapticSelection();
    setShowGradeMenu(false);

    if (onGradeChange) {
      onGradeChange(grade);
    }

    const isGuest = user?.app_metadata?.provider === "guest" || user?.id === GUEST_USER_ID;
    if (user) {
      if (isGuest) {
        try {
          const saved = localStorage.getItem("sciencekh_guest_user");
          const current = saved ? JSON.parse(saved) : user;
          current.user_metadata = { ...(current.user_metadata || {}), grade };
          localStorage.setItem("sciencekh_guest_user", JSON.stringify(current));
        } catch {}
      } else {
        try {
          await supabase.from("profiles").update({ grade }).eq("id", user.id);
        } catch {
          // silent
        }
      }
      toast.success(isKhmer ? `បានផ្លាស់ប្តូរទៅថ្នាក់ទី ${toKhmerNumeral(grade)}` : `Switched to Grade ${grade}`);
    }
  };

  // Toggle Language
  const handleToggleLanguage = async () => {
    sounds.playPop();
    triggerHapticSelection();
    const nextLang = isKhmer ? "en" : "km";
    await setLanguage(nextLang);
  };

  // Current Grade Display Label
  const currentGradeObj = MOEYS_GRADES.find((g) => g.grade === currentGrade) || MOEYS_GRADES[5];
  const gradeDisplay = isKhmer
    ? `${currentGradeObj.labelKm} (${currentGradeObj.tierKm})`
    : `${currentGradeObj.labelEn} (${currentGradeObj.tierEn})`;

  return (
    <header className="hidden lg:block sticky top-0 z-30 h-16 border-b border-[#E5EAF0] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors px-6 lg:px-8 shrink-0">
      <div className="h-full w-full flex items-center justify-between gap-4">
        {/* 1. Left Section: Breadcrumb Trail or Page Title */}
        <div className="min-w-0 flex items-center gap-2">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              {breadcrumbs.map((bc, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <div key={idx} className="flex items-center gap-1.5">
                    {idx > 0 && <span className="text-slate-300 dark:text-slate-700">/</span>}
                    {bc.href && !isLast ? (
                      <Link
                        to={bc.href}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                      >
                        {bc.label}
                      </Link>
                    ) : (
                      <span className={cn("truncate max-w-[200px] sm:max-w-none", isLast && "text-slate-900 dark:text-white font-bold")}>
                        {bc.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          ) : (
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
              {title || (isKhmer ? "ScienceKH — កម្មវិធីសិក្សាជាតិ" : "ScienceKH Education")}
            </h1>
          )}
        </div>

        {/* 2. Right Section: Grade Selector, Language, Streak, XP, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Interactive MoEYS Grade Selector */}
          {showGradeSelector && (
            <div className="relative" ref={gradeMenuRef}>
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setShowGradeMenu((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition active:scale-95 cursor-pointer shadow-2xs"
                title={isKhmer ? "ជ្រើសរើសកម្រិតថ្នាក់សិក្សា" : "Select Grade Level"}
              >
                <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">{gradeDisplay}</span>
                <ChevronDown className={cn("h-3 w-3 text-slate-400 transition-transform", showGradeMenu && "rotate-180")} />
              </button>

              {/* Grade Dropdown Panel */}
              {showGradeMenu && (
                <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5EAF0] dark:border-slate-800 shadow-xl z-50 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {isKhmer ? "ជ្រើសរើសថ្នាក់សិក្សា" : "Select Grade"}
                    </span>
                  </div>

                  {/* Junior High */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      {isKhmer ? "អនុវិទ្យាល័យ (ថ្នាក់ ៧-៩)" : "Junior High (Grades 7–9)"}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {MOEYS_GRADES.slice(0, 3).map((g) => (
                        <button
                          key={g.grade}
                          type="button"
                          onClick={() => handleSelectGrade(g.grade)}
                          className={cn(
                            "py-1.5 px-2 rounded-xl text-xs font-bold transition text-center cursor-pointer flex flex-col items-center",
                            currentGrade === g.grade
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-emerald-500 border border-transparent"
                          )}
                        >
                          <span>{isKhmer ? g.labelKm : g.labelEn}</span>
                          <span className={cn("text-[9px] font-medium", currentGrade === g.grade ? "text-emerald-100" : "text-slate-400")}>
                            {isKhmer ? g.tierKm : g.tierEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Senior High */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      {isKhmer ? "វិទ្យាល័យ (ថ្នាក់ ១០-១២)" : "Senior High (Grades 10–12)"}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {MOEYS_GRADES.slice(3, 6).map((g) => (
                        <button
                          key={g.grade}
                          type="button"
                          onClick={() => handleSelectGrade(g.grade)}
                          className={cn(
                            "py-1.5 px-2 rounded-xl text-xs font-bold transition text-center cursor-pointer flex flex-col items-center",
                            currentGrade === g.grade
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-emerald-500 border border-transparent"
                          )}
                        >
                          <span>{isKhmer ? g.labelKm : g.labelEn}</span>
                          <span className={cn("text-[9px] font-medium", currentGrade === g.grade ? "text-emerald-100" : "text-slate-400")}>
                            {isKhmer ? g.tierKm : g.tierEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stream Selector for Grades 11 and 12 */}
                  {currentGrade >= 11 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-semibold">{isKhmer ? "ខ្សែវិជ្ជាជីវៈ៖" : "Stream:"}</span>
                      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playPop();
                            if (onStreamChange) onStreamChange("science");
                            else setInternalStream("science");
                          }}
                          className={cn(
                            "px-2 py-0.5 rounded-md font-bold text-[10.5px] transition cursor-pointer",
                            currentStream === "science"
                              ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                              : "text-slate-500 hover:text-slate-800"
                          )}
                        >
                          {isKhmer ? "វិទ្យាសាស្ត្រពិត" : "Science"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playPop();
                            if (onStreamChange) onStreamChange("social");
                            else setInternalStream("social");
                          }}
                          className={cn(
                            "px-2 py-0.5 rounded-md font-bold text-[10.5px] transition cursor-pointer",
                            currentStream === "social"
                              ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                              : "text-slate-500 hover:text-slate-800"
                          )}
                        >
                          {isKhmer ? "សង្គម" : "Social"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Language Toggle Pill */}
          <button
            type="button"
            onClick={handleToggleLanguage}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500 transition active:scale-95 cursor-pointer shadow-2xs"
            title={isKhmer ? "ប្តូរទៅភាសាអង់គ្លេស" : "Switch to Khmer"}
          >
            <Globe2 className="h-3.5 w-3.5 text-slate-400" />
            <span>{isKhmer ? "ខ្មែរ" : "English"}</span>
          </button>

          {/* Streak Flame Pill */}
          <div
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 shadow-2xs shrink-0 cursor-default"
            title={isKhmer ? "ចំនួនថ្ងៃរៀនជាប់គ្នា" : "Daily Streak"}
          >
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{profile?.streak_days || 1}d</span>
          </div>

          {/* XP Pill */}
          <div
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs shrink-0 cursor-default"
            title={isKhmer ? "ពិន្ទុបទពិសោធន៍ (XP)" : "Experience Points"}
          >
            <Sparkles className="h-3 w-3 fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400" />
            <span>{profile?.xp ?? 0}</span>
          </div>

          {/* Hearts Gamification Indicator */}
          <button
            type="button"
            onClick={() => openPaywall("hearts_pill")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:border-rose-400 transition active:scale-95 cursor-pointer shadow-2xs"
            title={isKhmer ? `នៅសល់ ${hearts}/${maxHearts} ជីវិត` : `${hearts}/${maxHearts} Hearts`}
          >
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span className="font-black text-xs text-rose-600 dark:text-rose-400">{hearts}</span>
          </button>

          {/* Profile Avatar Link */}
          <Link
            to="/profile"
            onClick={() => sounds.playPop()}
            className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:border-emerald-500 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition active:scale-95 cursor-pointer shadow-2xs overflow-hidden"
            title={isKhmer ? "គណនីសិស្ស" : "Profile"}
          >
            {profile?.avatar_url && (profile.avatar_url.startsWith("http") || profile.avatar_url.startsWith("data:") || profile.avatar_url.startsWith("/")) ? (
              <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : profile?.avatar_url && profile.avatar_url === "angkor" ? (
              <span className="text-sm">🇰🇭</span>
            ) : profile?.avatar_url && profile.avatar_url === "physics" ? (
              <span className="text-sm">👨‍🔬</span>
            ) : profile?.avatar_url && profile.avatar_url === "chemistry" ? (
              <span className="text-sm">👩‍🔬</span>
            ) : profile?.avatar_url && profile.avatar_url === "mechanics" ? (
              <span className="text-sm">⚡</span>
            ) : profile?.avatar_url && profile.avatar_url === "biology" ? (
              <span className="text-sm">🧬</span>
            ) : profile?.avatar_url && (profile.avatar_url === "kru_vuth" || profile.avatar_url === "ai_tutor") ? (
              <span className="text-sm">🎓</span>
            ) : (
              <UserRound className="h-4 w-4" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
