// ==============================================================================
// ScienceKH — Unified Master Application Shell (សំបកកម្មវិធីរួម Desktop & Mobile)
// Implements 3-column desktop layout (Left Nav, Flexible Main, Contextual Right Sidebar)
// Seamlessly preserves mobile bottom navigation & touch ergonomics on phones & tablets
// ==============================================================================

import type { ReactNode } from "react";
import { useEffect } from "react";
import { DesktopSidebar } from "./desktop-sidebar";
import { DesktopHeader } from "./desktop-header";
import { DesktopRightSidebar } from "./desktop-right-sidebar";
import { BottomNav } from "./bottom-nav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  title?: string;
  wide?: boolean; // When true, expands center area for reading or PDF viewing
  activeGrade?: number;
  onGradeChange?: (grade: number) => void;
  activeStream?: "science" | "social";
  onStreamChange?: (stream: "science" | "social") => void;
  showGradeSelector?: boolean;
}

export function AppShell({
  children,
  rightSidebar,
  breadcrumbs,
  title,
  wide = false,
  activeGrade,
  onGradeChange,
  activeStream,
  onStreamChange,
  showGradeSelector = true,
}: AppShellProps) {
  // Clear any stale collapsed state from local storage so sidebar remains fully expanded
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sciencekh_sidebar_collapsed");
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-[#111827] dark:text-slate-100 selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* 1. Desktop Left Navigation Sidebar (Permanent 248px full width) */}
      <DesktopSidebar />

      {/* 2. Main Desktop Layout Area (Offset by Sidebar on Desktop only) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[248px]">
        {/* Top Desktop-Only Header (Strictly hidden on mobile screens) */}
        <DesktopHeader
          breadcrumbs={breadcrumbs}
          title={title}
          activeGrade={activeGrade}
          onGradeChange={onGradeChange}
          activeStream={activeStream}
          onStreamChange={onStreamChange}
          showGradeSelector={showGradeSelector}
        />

        {/* Workspace Canvas: Plain full-width on mobile; 3-column bounded canvas on desktop */}
        <div className="w-full flex-1 p-0 lg:px-8 lg:py-6 lg:flex lg:items-start lg:gap-8 min-w-0">
          {/* Main Learning Canvas */}
          <main
            className={cn(
              "w-full min-w-0 flex-1",
              wide
                ? "max-w-none"
                : "max-w-5xl 2xl:max-w-6xl"
            )}
          >
            {children}
          </main>

          {/* Contextual Right Sidebar on Large Desktop Screens only */}
          {rightSidebar && (
            <DesktopRightSidebar>
              {rightSidebar}
            </DesktopRightSidebar>
          )}
        </div>
      </div>

      {/* 3. Mobile Persistent Bottom Navigation (Strictly hidden on desktop) */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
