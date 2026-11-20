import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, BookOpen, Trophy, UserRound } from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { triggerHapticSelection } from "@/lib/native-mobile";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const { lang } = useProfile();
  const isKhmer = lang === "km";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    {
      to: "/home",
      label: isKhmer ? "ទំព័រដើម" : "Home",
      icon: Home,
    },
    {
      to: "/lessons",
      label: isKhmer ? "រៀន" : "Learn",
      icon: BookOpen,
    },
    {
      to: "/explore",
      label: isKhmer ? "ស្វែងយល់" : "Explore",
      icon: Compass,
    },
    {
      to: "/leaderboard",
      label: isKhmer ? "វឌ្ឍនភាព" : "Progress",
      icon: Trophy,
    },
    {
      to: "/profile",
      label: isKhmer ? "គណនី" : "Profile",
      icon: UserRound,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-850 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pt-1 pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.25rem))]"
      style={{
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
    >
      {/* Specular Edge Highlight Gradient (Glass Top Bevel) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-white/25 to-transparent opacity-90"
      />

      <ul className="mx-auto flex h-14 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl items-center justify-around px-2">
        {items.map((item) => {
          const active =
            item.to === "/home"
              ? pathname === "/home"
              : item.to === "/explore"
                ? pathname === "/explore" || pathname.startsWith("/exams") || pathname.startsWith("/reference")
                : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;

          return (
            <li key={item.to} className="flex-1 flex justify-center">
              <Link
                to={item.to}
                onClick={() => {
                  triggerHapticSelection();
                }}
                className={cn(
                  "relative flex min-h-[46px] w-full max-w-[66px] flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-200 group active:scale-92",
                  active
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                )}
              >
                {/* Clean Frosted Glass Lens behind Active Tab */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-emerald-500/[0.08] dark:bg-emerald-400/[0.12] border border-emerald-500/15 dark:border-emerald-400/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(16,185,129,0.12)] transition-all duration-200"
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 transition-transform duration-200">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-200",
                      active
                        ? "scale-105 stroke-[2.2] text-emerald-600 dark:text-emerald-400"
                        : "stroke-[1.8] group-hover:scale-105"
                    )}
                  />
                </div>

                {/* Micro Label */}
                <span
                  className={cn(
                    "relative z-10 text-[10px] sm:text-[10.5px] mt-0.5 tracking-tight transition-all duration-200 line-clamp-1 select-none",
                    active
                      ? "font-bold text-emerald-600 dark:text-emerald-400"
                      : "font-medium opacity-80 group-hover:opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
