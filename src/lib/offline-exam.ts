// ==============================================================================
// ScienceKH — Offline Exam Archive & Storage Reliability Engine
// Enables Cambodian high school students in rural/provincial areas to save
// authentic past exam papers and solutions to their local device with 1-tap.
// ==============================================================================

import type { HistoricalExamPaper } from "@/lib/moeys-exam-bank";

const OFFLINE_EXAM_IDS_KEY = "sciencekh_offline_exam_ids";
const CACHE_NAME = "sciencekh-exam-cache-v1";

/**
 * Get list of exam IDs currently stored for offline study
 */
export const getOfflineExamIds = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(OFFLINE_EXAM_IDS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

/**
 * Check if a specific exam paper is saved locally for offline study
 */
export const isExamSavedOffline = (examId: string): boolean => {
  const ids = getOfflineExamIds();
  return ids.includes(examId);
};

/**
 * Retrieve cached exam metadata from local storage
 */
export const getOfflineExam = (examId: string): HistoricalExamPaper | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`sciencekh_offline_exam_${examId}`);
    return raw ? (JSON.parse(raw) as HistoricalExamPaper) : null;
  } catch {
    return null;
  }
};

/**
 * Save an entire exam paper and its PDF (if supported) for offline study
 */
export const saveExamOffline = async (paper: HistoricalExamPaper): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  try {
    // 1. Save full JSON structure (questions, rubrics, points, solutions)
    localStorage.setItem(`sciencekh_offline_exam_${paper.id}`, JSON.stringify(paper));

    // 2. Update list of offline IDs
    const ids = getOfflineExamIds();
    if (!ids.includes(paper.id)) {
      ids.push(paper.id);
      localStorage.setItem(OFFLINE_EXAM_IDS_KEY, JSON.stringify(ids));
    }

    // 3. Cache PDF blob via Cache API if reachable
    if (paper.pdfUrl && "caches" in window) {
      try {
        const cache = await window.caches.open(CACHE_NAME);
        // Best effort background caching
        fetch(paper.pdfUrl, { mode: "no-cors" })
          .then((res) => cache.put(paper.pdfUrl!, res))
          .catch(() => {});
      } catch {}
    }

    return true;
  } catch (e) {
    console.warn("[ScienceKH Offline] Failed to save exam:", e);
    return false;
  }
};

/**
 * Remove an exam paper from offline storage
 */
export const removeOfflineExam = async (examId: string): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(`sciencekh_offline_exam_${examId}`);
    const ids = getOfflineExamIds().filter((id) => id !== examId);
    localStorage.setItem(OFFLINE_EXAM_IDS_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
};

/**
 * Permanent Cloud Storage CDN URL resolver for all 328 historical exam papers.
 * Points to ScienceKH Supabase / Cloudflare R2 bucket with unbreaking, fast delivery.
 */
export const resolveExamPermanentUrl = (paper: HistoricalExamPaper): string => {
  if (paper.pdfUrl && paper.pdfUrl.startsWith("http")) {
    return paper.pdfUrl;
  }
  // Standardized permanent ScienceKH cloud storage path
  const filename = `${paper.examinationCategory}-${paper.subject}-${paper.examinationYear || 2026}.pdf`;
  return `https://vdfxixbvhikckkdrpmom.supabase.co/storage/v1/object/public/exam-archive/${filename}`;
};
