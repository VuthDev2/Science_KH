// ==============================================================================
// ScienceKH — Grade Picker Bottom Sheet (ផ្ទាំងជ្រើសរើសថ្នាក់រៀន)
// Clean, accessible, thumb-reachable bottom sheet for Grades 7–12 selection
// ==============================================================================

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const GRADE_TIERS = [
  {
    label_km: "អនុវិទ្យាល័យ",
    label_en: "Junior High",
    grades: [7, 8, 9],
    exam_km: "ត្រៀមឌីប្លូម (Grade 9)",
    exam_en: "Toward Brevet (G9)",
  },
  {
    label_km: "វិទ្យាល័យ",
    label_en: "Senior High",
    grades: [10, 11, 12],
    exam_km: "ត្រៀមបាក់ឌុប (Grade 12)",
    exam_en: "Toward BacII (G12)",
  },
];

export const GRADE_LABELS: Record<number, { km: string; en: string }> = {
  9: { km: "ឌីប្លូម", en: "Brevet" },
  12: { km: "បាក់ឌុប", en: "BacII" },
};

export interface GradePickerSheetProps {
  currentGrade: number;
  profileGrade: number;
  isKhmer: boolean;
  onSelect: (grade: number) => void;
  onClose: () => void;
}

export function GradePickerSheet({
  currentGrade,
  profileGrade,
  isKhmer,
  onSelect,
  onClose,
}: GradePickerSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md rounded-t-3xl bg-white dark:bg-slate-900 shadow-2xl animate-in slide-in-from-bottom duration-300 pb-safe">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Title */}
        <div className="flex items-center justify-between px-6 pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isKhmer ? "ជ្រើសរើសថ្នាក់រៀន" : "Select Grade Level"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isKhmer
                ? "ជ្រើសរើសកម្រិតថ្នាក់ដើម្បីមើលកម្មវិធីសិក្សា MoEYS"
                : "Choose your academic grade to view official curriculum"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Grade tiers */}
        <div className="p-5 space-y-5">
          {GRADE_TIERS.map((tier) => (
            <div key={tier.label_en}>
              <div className="flex items-center gap-2 mb-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {isKhmer ? tier.label_km : tier.label_en}
                </p>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                <p className="text-[10px] font-medium text-slate-500">
                  {isKhmer ? tier.exam_km : tier.exam_en}
                </p>
              </div>

              {/* Grade buttons row */}
              <div className="grid grid-cols-3 gap-2.5">
                {tier.grades.map((g) => {
                  const isSelected = g === currentGrade;
                  const isMyGrade = g === profileGrade;
                  const specialLabel = GRADE_LABELS[g];

                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onSelect(g)}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-0.5 rounded-xl border py-3 transition-all active:scale-[0.96] cursor-pointer shadow-2xs",
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white shadow-xs font-bold"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200 hover:border-emerald-500",
                      )}
                    >
                      {isMyGrade && (
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 ring-1 ring-white" />
                      )}

                      <span
                        className={cn(
                          "text-base font-bold",
                          isSelected ? "text-white" : "text-slate-900 dark:text-white",
                        )}
                      >
                        {g}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-medium uppercase tracking-wide",
                          isSelected ? "text-emerald-100" : "text-slate-500",
                        )}
                      >
                        {specialLabel
                          ? isKhmer
                            ? specialLabel.km
                            : specialLabel.en
                          : isKhmer
                            ? `ថ្នាក់ ${g}`
                            : `Grade ${g}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-[10px] text-slate-500">
              {isKhmer
                ? "ចំណុចបៃតង = ថ្នាក់ស្នូលរបស់គណនីអ្នក (Home Grade)"
                : "Green dot indicates your account's primary grade"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
