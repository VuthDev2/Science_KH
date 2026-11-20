// ==============================================================================
// ScienceKH — Desktop Left Navigation Sidebar (បារចំហៀងរុករកកុំព្យូទ័រ)
// Minimalist, premium academic SaaS navigation inspired by Duolingo desktop architecture
// Permanent full-width (248px) sidebar with brand, navigation links & profile card
// ==============================================================================

import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  BookOpen,
  Layers,
  FileText,
  Trophy,
  UserRound,
  GraduationCap,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { sounds } from "@/lib/sound-effects";
import { cn } from "@/lib/utils";

const AVATAR_EMOJI_MAP: Record<string, string> = {
  angkor: "🇰🇭",
  physics: "👨‍🔬",
  chemistry: "👩‍🔬",
  mechanics: "⚡",
  biology: "🧬",
  kru_vuth: "🎓",
  ai_tutor: "🎓",
};

const isImageAvatar = (url?: string | null) =>
  Boolean(
    url &&
      (url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("data:image/") ||
        url.startsWith("blob:") ||
        url.startsWith("/")),
  );

export function DesktopSidebar() {
  const { user, signOut } = useAuth();
  const { lang, data: profile } = useProfile();
  const isKhmer = lang === "km";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    {
      to: "/home",
      labelKm: "ទំព័រដើម",
      labelEn: "Home",
      icon: Home,
      exact: true,
      badge: null,
    },
    {
      to: "/lessons",
      labelKm: "កម្មវិធីសិក្សា",
      labelEn: "Curriculum",
      icon: BookOpen,
      exact: false,
      badge: null,
    },
    {
      to: "/reference",
      labelKm: "បណ្ណាល័យយោង",
      labelEn: "References",
      icon: Layers,
      exact: false,
      badge: "MoEYS",
    },
    {
      to: "/exams",
      labelKm: "វិញ្ញាសាជាតិ",
      labelEn: "Exam Archive",
      icon: FileText,
      exact: false,
      badge: "2011–24",
    },
    {
      to: "/tutor",
      labelKm: "លោកគ្រូ វុឌ្ឍ",
      labelEn: "STEM Mentor",
      icon: GraduationCap,
      exact: false,
      badge: null,
    },
    {
      to: "/leaderboard",
      labelKm: "វឌ្ឍនភាព",
      labelEn: "Progress",
      icon: Trophy,
      exact: false,
      badge: null,
    },
    {
      to: "/profile",
      labelKm: "គណនីសិស្ស",
      labelEn: "Profile",
      icon: UserRound,
      exact: true,
      badge: null,
    },
  ];

  const studentGrade = profile?.grade ?? 12;
  const gradeLabel = isKhmer ? `ថ្នាក់ទី ${studentGrade}` : `Grade ${studentGrade}`;

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col w-[248px] bg-white dark:bg-slate-900 border-r border-[#E5EAF0] dark:border-slate-800 select-none"
      aria-label="Desktop Navigation"
    >
      {/* 1. Header with ScienceKH Brand */}
      <div className="h-16 flex items-center px-4 border-b border-[#E5EAF0] dark:border-slate-800 shrink-0">
        <Link
          to="/home"
          onClick={() => sounds.playPop()}
          className="flex items-center gap-2.5 overflow-hidden transition-all duration-200 group cursor-pointer"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="font-display font-black text-base tracking-tight text-slate-900 dark:text-white leading-tight">
              Science<span className="text-emerald-600 dark:text-emerald-400">KH</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase leading-none">
              {isKhmer ? "អប់រំជាតិ MoEYS" : "Cambodia EdTech"}
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Main Navigation Items */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(item.to + "/");
          const IconComp = item.icon;
          const label = isKhmer ? item.labelKm : item.labelEn;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                sounds.playPop();
                triggerHapticSelection();
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs border border-emerald-200/60 dark:border-emerald-800/60"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
              )}
            >
              <div
                className={cn(
                  "grid place-items-center shrink-0 transition-colors",
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                )}
              >
                <IconComp className={cn("h-4.5 w-4.5", isActive ? "stroke-[2.2]" : "stroke-[1.8]")} />
              </div>

              <span className="truncate flex-1 text-[13px]">
                {label}
              </span>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 uppercase tracking-wider",
                    isActive
                      ? "bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. Bottom Footer: Student Profile Card */}
      <div className="p-3 border-t border-[#E5EAF0] dark:border-slate-800 shrink-0">
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <Link
            to="/profile"
            onClick={() => sounds.playPop()}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
          >
            <div className="h-8 w-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 grid place-items-center text-xs font-bold shrink-0 border border-emerald-200/60 dark:border-emerald-800/60 overflow-hidden">
              {isImageAvatar(profile?.avatar_url) ? (
                <img src={profile!.avatar_url!} alt="" className="h-full w-full object-cover" />
              ) : profile?.avatar_url && AVATAR_EMOJI_MAP[profile.avatar_url] ? (
                <span className="text-sm">{AVATAR_EMOJI_MAP[profile.avatar_url]}</span>
              ) : profile?.display_name ? (
                profile.display_name.charAt(0).toUpperCase()
              ) : (
                "S"
              )}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition truncate block leading-tight">
                {profile?.display_name || user?.email?.split("@")[0] || "សិស្ស"}
              </span>
              <span className="text-[10.5px] font-semibold text-slate-400 truncate block">
                {gradeLabel}
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => signOut()}
            className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer shrink-0"
            title={isKhmer ? "ចាកចេញពីគណនី" : "Log out"}
            aria-label="Log out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
