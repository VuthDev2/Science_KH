// ==============================================================================
// ScienceKH — Student Profile & Account Experience
// Minimal, Sophisticated, Executive Academic Profile & Settings Architecture
// Strict Separation of Concerns: Profile (Identity & Progress) vs Settings (Preferences)
// ==============================================================================

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Sparkles,
  Flame,
  Award,
  Globe,
  GraduationCap,
  Camera,
  Check,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Pencil,
  ChevronDown,
  LogOut,
  Mail,
  Lock,
  ChevronRight,
  User,
  Upload,
  Trash2,
  Loader2,
  Building2,
  BookOpen,
  Settings,
  Bookmark,
  ShieldCheck,
  Layers,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Landmark,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth, GUEST_USER_ID } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { toKhmerNumeral } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/layout/app-shell";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import {
  requestNotificationPermission,
  getNotificationPermission,
} from "@/lib/streak-guardian";
import { getStudentProgress } from "@/lib/gamification.functions";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Student Profile — ScienceKH" }] }),
  component: ProfilePage,
});

// Official MoEYS Grades (Grades 7–12)
const GRADES = [
  { grade: 7, label: "Grade 7", labelKm: "ថ្នាក់ទី ៧", cycle: "Junior High", cycleKm: "អនុវិទ្យាល័យ" },
  { grade: 8, label: "Grade 8", labelKm: "ថ្នាក់ទី ៨", cycle: "Junior High", cycleKm: "អនុវិទ្យាល័យ" },
  { grade: 9, label: "Grade 9", labelKm: "ថ្នាក់ទី ៩", cycle: "Brevet Exam", cycleKm: "ប្រឡងឌីប្លូម", isExam: true },
  { grade: 10, label: "Grade 10", labelKm: "ថ្នាក់ទី ១០", cycle: "Senior High", cycleKm: "វិទ្យាល័យ" },
  { grade: 11, label: "Grade 11", labelKm: "ថ្នាក់ទី ១១", cycle: "Senior High", cycleKm: "វិទ្យាល័យ", hasStream: true },
  { grade: 12, label: "Grade 12", labelKm: "ថ្នាក់ទី ១២", cycle: "Bac II Exam", cycleKm: "ប្រឡងបាក់ឌុប", isExam: true, hasStream: true },
];

// Consistent Academic Scholar Avatars (Vector illustrations, NOT random emojis)
interface ScholarAvatarOption {
  id: string;
  nameKm: string;
  nameEn: string;
  roleKm: string;
  roleEn: string;
  icon: typeof Landmark;
  gradient: string;
}

const SCHOLAR_AVATARS: ScholarAvatarOption[] = [
  {
    id: "angkor",
    nameKm: "សិស្សកម្ពុជា",
    nameEn: "Angkor Scholar",
    roleKm: "ស្មារតីជាតិ MoEYS",
    roleEn: "National Spirit",
    icon: Landmark,
    gradient: "from-emerald-600 to-teal-800",
  },
  {
    id: "physics",
    nameKm: "អ្នករូបវិទ្យា",
    nameEn: "Physicist",
    roleKm: "មេកានិច & ថាមពល",
    roleEn: "Quantum & Motion",
    icon: Atom,
    gradient: "from-blue-600 to-indigo-800",
  },
  {
    id: "chemistry",
    nameKm: "អ្នកគីមីវិទ្យា",
    nameEn: "Chemist",
    roleKm: "ម៉ូលេគុល & ប្រតិកម្ម",
    roleEn: "Reactions & Matter",
    icon: FlaskConical,
    gradient: "from-emerald-500 to-teal-700",
  },
  {
    id: "math",
    nameKm: "អ្នកគណិតវិទ្យា",
    nameEn: "Mathematician",
    roleKm: "ពីជគណិត & ធរណីមាត្រ",
    roleEn: "Calculus & Geometry",
    icon: Calculator,
    gradient: "from-purple-600 to-violet-800",
  },
  {
    id: "biology",
    nameKm: "អ្នកជីវវិទ្យា",
    nameEn: "Biologist",
    roleKm: "ហ្សែន & កោសិកា",
    roleEn: "Genetics & Life",
    icon: Dna,
    gradient: "from-teal-600 to-cyan-800",
  },
  {
    id: "kru_vuth",
    nameKm: "លោកគ្រូ វុឌ្ឍ",
    nameEn: "Kru Vuth Mentor",
    roleKm: "គ្រូជំនួយ STEM",
    roleEn: "STEM Socratic Guide",
    icon: GraduationCap,
    gradient: "from-amber-600 to-orange-800",
  },
];

// Academic Monogram Palette Options
const MONOGRAM_OPTIONS = [
  { id: "mono_emerald", labelKm: "ត្បូងមរកត", labelEn: "Emerald", gradient: "from-emerald-600 to-teal-800" },
  { id: "mono_indigo", labelKm: "ទឹកប៊ិចចាស់", labelEn: "Indigo", gradient: "from-indigo-600 to-blue-800" },
  { id: "mono_amber", labelKm: "ទឹកក្រូច", labelEn: "Amber", gradient: "from-amber-600 to-orange-800" },
  { id: "mono_rose", labelKm: "ផ្កាឈូក", labelEn: "Rose", gradient: "from-rose-600 to-pink-800" },
];

interface BadgeData {
  id: string;
  icon: typeof Award | typeof Flame | typeof Sparkles | typeof BookOpen;
  iconBg: string;
  iconColor: string;
  titleKm: string;
  titleEn: string;
  descKm: string;
  descEn: string;
  unlocked: boolean;
  progressText: string;
  progressPercent: number;
  xpReward: number;
  badgeTagKm: string;
  badgeTagEn: string;
}

/**
 * Checks whether avatar string is a custom uploaded image URL or data URL
 */
function isAvatarCustomImage(url: string | null | undefined): boolean {
  if (!url) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:image/") ||
    url.startsWith("blob:") ||
    url.startsWith("/")
  );
}

/**
 * Renders consistent avatar graphics across the profile
 */
function renderAvatarContent(
  avatarUrl: string | null | undefined,
  name: string,
  imgClass = "h-full w-full object-cover"
) {
  if (isAvatarCustomImage(avatarUrl)) {
    return <img src={avatarUrl!} alt={name} className={imgClass} />;
  }

  // Monogram initials
  if (avatarUrl?.startsWith("mono_")) {
    const initials = (name || "SK")
      .trim()
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const matchedMono = MONOGRAM_OPTIONS.find((m) => m.id === avatarUrl) || MONOGRAM_OPTIONS[0];
    return (
      <div className={cn("h-full w-full grid place-items-center font-black text-sm sm:text-base text-white bg-gradient-to-br", matchedMono.gradient)}>
        {initials}
      </div>
    );
  }

  // Academic scholar vector icons
  const matchedScholar = SCHOLAR_AVATARS.find((a) => a.id === avatarUrl) || SCHOLAR_AVATARS[0];
  const IconComponent = matchedScholar.icon;
  return (
    <div className={cn("h-full w-full grid place-items-center text-white bg-gradient-to-br", matchedScholar.gradient)}>
      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2]" />
    </div>
  );
}

/**
 * High-performance client-side image resizer using HTML5 Canvas
 */
function resizeImageToDataUrl(file: File, maxWidth = 384, maxHeight = 384, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to parse image data"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(";base64,");
  const contentType = parts[0].split(":")[1] || "image/jpeg";
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

function ProfilePage() {
  const { user, signOut } = useAuth();
  const { data: dbData, lang: activeLang, setLanguage } = useProfile();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isKhmer = activeLang === "km";
  const isGuest = user?.app_metadata?.provider === "guest" || user?.id === GUEST_USER_ID;

  // Active Navigation Tab: "profile" vs "settings"
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");

  // Real-time Supabase Profile Sync
  const { data: liveProfile } = useQuery({
    queryKey: ["profile-live", user?.id],
    enabled: !!user?.id && !isGuest,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 5000,
  });

  // Authentic Lesson Progress from Supabase
  const { data: studentProgress } = useQuery({
    queryKey: ["student-progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      try {
        return await getStudentProgress({ data: undefined });
      } catch {
        return { completedIds: [] as string[], inProgressIds: [] as string[] };
      }
    },
    staleTime: 30_000,
  });

  const completedLessonsCount = studentProgress?.completedIds?.length ?? 0;

  // Bookmarked items from localStorage
  const [bookmarkedRefsCount, setBookmarkedRefsCount] = useState<number>(0);
  const [savedOfflineExamsCount, setSavedOfflineExamsCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const refs = localStorage.getItem("sciencekh_bookmarked_references");
        if (refs) setBookmarkedRefsCount(JSON.parse(refs).length || 0);
        const exams = localStorage.getItem("sciencekh_offline_exams");
        if (exams) setSavedOfflineExamsCount(JSON.parse(exams).length || 0);
      } catch {}
    }
  }, []);

  // Local state for profile and preferences
  const [selectedAvatar, setSelectedAvatar] = useState<string>("angkor");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false);
  const [currentGrade, setCurrentGrade] = useState<number>(12);
  const [currentLanguage, setCurrentLanguage] = useState<"km" | "en">("km");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sounds.isEnabled());
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return (
        localStorage.getItem("sciencekh_notifications_enabled") === "true" &&
        getNotificationPermission() === "granted"
      );
    } catch {
      return false;
    }
  });

  const [displayName, setDisplayName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("sciencekh_school_name") || "";
  });
  const [studyStream, setStudyStream] = useState<"science" | "social">(() => {
    if (typeof window === "undefined") return "science";
    return (localStorage.getItem("sciencekh_study_stream") as "science" | "social") || "science";
  });

  // Modal dialog states
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<BadgeData | null>(null);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial state from profile
  useEffect(() => {
    const profileObj = liveProfile || dbData;
    if (profileObj) {
      if (profileObj.avatar_url) {
        setSelectedAvatar(profileObj.avatar_url);
      } else {
        const storedAvatar = localStorage.getItem(`sciencekh_avatar_${user?.id || "guest"}`);
        if (storedAvatar) setSelectedAvatar(storedAvatar);
      }
      if (profileObj.grade) {
        setCurrentGrade(profileObj.grade);
      }
      if (profileObj.full_name) {
        setFullName(profileObj.full_name);
      }
      const resolvedName =
        profileObj.display_name ||
        user?.user_metadata?.display_name ||
        profileObj.full_name ||
        user?.email?.split("@")[0] ||
        (isKhmer ? "សិស្ស ScienceKH" : "ScienceKH Student");
      setDisplayName(resolvedName);
    }
  }, [liveProfile, dbData, user, isKhmer]);

  useEffect(() => {
    if (activeLang) setCurrentLanguage(activeLang);
  }, [activeLang]);

  useEffect(() => {
    const stored = localStorage.getItem("sciencekh_sound");
    if (stored !== null) {
      setSoundEnabled(stored === "1");
    }
  }, []);

  // Mutation to update profile fields
  const updateFieldMutation = useMutation({
    mutationFn: async (fields: Record<string, unknown>) => {
      if (!user?.id) throw new Error("Not authenticated");
      if (isGuest) {
        try {
          const saved = localStorage.getItem("sciencekh_guest_user");
          const current = saved ? JSON.parse(saved) : (user || {});
          const updated = {
            ...current,
            user_metadata: {
              ...(current.user_metadata || {}),
              ...fields,
            },
          };
          localStorage.setItem("sciencekh_guest_user", JSON.stringify(updated));
          if (fields.avatar_url) {
            localStorage.setItem(`sciencekh_avatar_${user.id}`, String(fields.avatar_url));
            localStorage.setItem("sciencekh_avatar_guest", String(fields.avatar_url));
          }
          return { id: user.id, ...fields };
        } catch {
          return { id: user.id, ...fields };
        }
      }

      try {
        const { data, error } = await (supabase
          .from("profiles") as any)
          .update(fields)
          .eq("id", user.id)
          .select()
          .maybeSingle();

        if (error || !data) {
          const { data: upsertData } = await (supabase
            .from("profiles") as any)
            .upsert({ id: user.id, ...fields })
            .select()
            .maybeSingle();
          return upsertData || { id: user.id, ...fields };
        }
        return data;
      } catch {
        if (typeof window !== "undefined") {
          const key = `sciencekh_profile_cache_${user.id}`;
          try {
            const existing = JSON.parse(localStorage.getItem(key) || "{}");
            localStorage.setItem(key, JSON.stringify({ ...existing, ...fields }));
          } catch {}
        }
        return { id: user.id, ...fields };
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile-live", user?.id] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (isKhmer ? "បរាជ័យក្នុងការកែប្រែព័ត៌មាន" : "Failed to update profile"));
    },
  });

  // Handle avatar selection and saving
  const handleSaveAvatar = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    sounds.playPop();
    localStorage.setItem(`sciencekh_avatar_${user?.id || "guest"}`, avatarId);
    updateFieldMutation.mutate(
      { avatar_url: avatarId },
      {
        onSuccess: () => {
          setIsAvatarModalOpen(false);
          sounds.playVictory();
          toast.success(isKhmer ? "បានផ្លាស់ប្តូររូបតំណាងជោគជ័យ!" : "Avatar updated successfully!");
        },
      }
    );
  };

  // Handle client-side image compression and upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(isKhmer ? "សូមជ្រើសរើសឯកសាររូបភាព (JPG, PNG, WEBP)" : "Please select an image file (JPG, PNG, WEBP)");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error(isKhmer ? "រូបភាពត្រូវតែមានទំហំតូចជាង 8MB" : "Image size must be under 8MB");
      return;
    }

    setIsUploadingAvatar(true);
    const toastId = toast.loading(isKhmer ? "កំពុងដំណើរការ និងបង្ហោះរូបភាព..." : "Processing & uploading photo...");

    try {
      const compressedDataUrl = await resizeImageToDataUrl(file, 384, 384, 0.85);
      let finalAvatarUrl = compressedDataUrl;

      if (user?.id && !isGuest) {
        try {
          const blob = dataUrlToBlob(compressedDataUrl);
          const fileName = `${user.id}-${Date.now()}.jpg`;
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from("avatars")
            .upload(fileName, blob, {
              contentType: "image/jpeg",
              upsert: true,
            });

          if (!uploadErr && uploadData) {
            const { data: pubData } = supabase.storage.from("avatars").getPublicUrl(fileName);
            if (pubData?.publicUrl) finalAvatarUrl = pubData.publicUrl;
          }
        } catch {
          // Fallback to data URL
        }
      }

      setSelectedAvatar(finalAvatarUrl);
      localStorage.setItem(`sciencekh_avatar_${user?.id || "guest"}`, finalAvatarUrl);

      try {
        await updateFieldMutation.mutateAsync({ avatar_url: finalAvatarUrl });
      } catch (remoteErr) {
        console.warn("Avatar synced locally:", remoteErr);
      }

      sounds.playVictory();
      launchConfetti();
      setIsAvatarModalOpen(false);
      toast.success(isKhmer ? "បានបង្ហោះរូបថតគណនីជោគជ័យ! 🎉" : "Profile photo uploaded successfully! 🎉", { id: toastId });
    } catch (err: any) {
      toast.error(err?.message || (isKhmer ? "បរាជ័យក្នុងការបង្ហោះរូបថត" : "Failed to upload photo"), { id: toastId });
    } finally {
      setIsUploadingAvatar(false);
      if (e.target) e.target.value = "";
    }
  };

  // Revert custom photo back to standard Angkor Avatar
  const handleRemoveCustomAvatar = () => {
    setSelectedAvatar("angkor");
    sounds.playPop();
    localStorage.removeItem(`sciencekh_avatar_${user?.id || "guest"}`);
    updateFieldMutation.mutate(
      { avatar_url: "angkor" },
      {
        onSuccess: () => {
          toast.success(isKhmer ? "បានប្តូរត្រឡប់ទៅរូបតំណាងដើមវិញ" : "Reverted to default avatar");
        },
      }
    );
  };

  // Handle Full Profile Update from Modal or Settings Tab
  const handleSaveFullProfile = async (data: {
    displayName: string;
    fullName: string;
    grade: number;
    stream: "science" | "social";
    school: string;
  }) => {
    sounds.playPop();
    setDisplayName(data.displayName);
    setFullName(data.fullName);
    setCurrentGrade(data.grade);
    setStudyStream(data.stream);
    setSchoolName(data.school);
    localStorage.setItem("sciencekh_study_stream", data.stream);
    localStorage.setItem("sciencekh_school_name", data.school);

    try {
      await updateFieldMutation.mutateAsync({
        display_name: data.displayName,
        full_name: data.fullName,
        grade: data.grade,
      });

      if (user && !isGuest) {
        await supabase.auth.updateUser({
          data: {
            display_name: data.displayName,
            full_name: data.fullName,
            grade: data.grade,
            stream: data.stream,
            school: data.school,
          },
        });
      }

      setIsEditProfileModalOpen(false);
      sounds.playVictory();
      toast.success(isKhmer ? "បានកែប្រែព័ត៌មានគណនីសិស្សជោគជ័យ!" : "Student profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile changes");
    }
  };

  // Handle instant language toggle
  const handleToggleLanguage = async (newLang: "km" | "en") => {
    setCurrentLanguage(newLang);
    sounds.playPop();
    try {
      await setLanguage(newLang);
    } catch {
      // safe fallback already handled in setLanguage
    }
    toast.success(newLang === "km" ? "បានប្តូរទៅភាសាខ្មែរ" : "Switched to English");
  };

  // Handle instant sound toggle
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sounds.setEnabled(nextVal);
    if (nextVal) {
      sounds.playCorrect(1);
      toast.success(isKhmer ? "បានបើកសំឡេងអមការរៀន" : "Sound effects enabled");
    } else {
      toast.info(isKhmer ? "បានបិទសំឡេង (រក្សាការរំញ័រ Tactile)" : "Sound muted (tactile haptics preserved)");
    }
  };

  // Handle Streak Guardian notification toggle
  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        sounds.playCorrect(1);
        toast.success(isKhmer ? "បានបើកការរំលឹកការពារ Streak (ម៉ោង 7:00 យប់)" : "Streak Guardian reminders active (7:00 PM)");
      } else {
        toast.error(isKhmer ? "សូមអនុញ្ញាតការជូនដំណឹងក្នុងឧបករណ៍របស់អ្នក" : "Please allow notifications in your device settings");
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem("sciencekh_notifications_enabled", "false");
      toast.info(isKhmer ? "បានបិទការរំលឹក Streak" : "Streak reminders disabled");
    }
  };

  // Sign out confirmation
  async function handleConfirmSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await signOut();
    navigate({ to: "/auth", search: { mode: "signin" }, replace: true });
  }

  // Authentic student metrics
  const xp = liveProfile?.xp ?? dbData?.xp ?? 0;
  const streakDays = liveProfile?.streak_days ?? dbData?.streak_days ?? 1;

  // Genuine achievements based on real student records
  const studentBadges: BadgeData[] = useMemo(() => {
    return [
      {
        id: "streak_7",
        icon: Flame,
        iconBg: "bg-orange-50 dark:bg-orange-950/60 border-orange-200/80 dark:border-orange-800",
        iconColor: "text-orange-600 dark:text-orange-400",
        titleKm: "ការពារ Streak ៧ ថ្ងៃ",
        titleEn: "7-Day Study Habit",
        descKm: "ចូលរៀនជាប់គ្នា ៧ ថ្ងៃដោយគ្មានខកខានដើម្បីកសាងទម្លាប់រឹងមាំ",
        descEn: "Study for 7 consecutive days to build a resilient daily rhythm",
        unlocked: streakDays >= 7,
        progressText: streakDays >= 7 ? (isKhmer ? "សម្រេចបាន ✓" : "Completed ✓") : `${streakDays} / 7 ${isKhmer ? "ថ្ងៃ" : "Days"}`,
        progressPercent: Math.min(100, Math.round((streakDays / 7) * 100)),
        xpReward: 150,
        badgeTagKm: "ទម្លាប់សិក្សា",
        badgeTagEn: "Daily Habit",
      },
      {
        id: "first_100_xp",
        icon: Sparkles,
        iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200/80 dark:border-amber-800",
        iconColor: "text-amber-600 dark:text-amber-400",
        titleKm: "ចំណេះដឹង ១០០ XP ដំបូង",
        titleEn: "Century of Knowledge",
        descKm: "ទទួលបានពិន្ទុចំណេះដឹងដំបូងបង្អស់ ១០០ XP ពីការសិក្សាមេរៀន",
        descEn: "Earn your first 100 Knowledge XP from curriculum lessons",
        unlocked: xp >= 100,
        progressText: xp >= 100 ? (isKhmer ? "សម្រេចបាន ✓" : "Completed ✓") : `${xp} / 100 XP`,
        progressPercent: Math.min(100, Math.round((xp / 100) * 100)),
        xpReward: 100,
        badgeTagKm: "ពិន្ទុចំណេះដឹង",
        badgeTagEn: "Knowledge XP",
      },
      {
        id: "lessons_completed_5",
        icon: BookOpen,
        iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800",
        iconColor: "text-blue-600 dark:text-blue-400",
        titleKm: "បញ្ចប់ ៥ មេរៀន",
        titleEn: "5 Lessons Completed",
        descKm: "រៀន និងឆ្លើយសំណួរស្ទង់សមត្ថភាពចប់សព្វគ្រប់ ៥ មេរៀន",
        descEn: "Complete full content and practice quizzes for 5 lessons",
        unlocked: completedLessonsCount >= 5,
        progressText: completedLessonsCount >= 5 ? (isKhmer ? "សម្រេចបាន ✓" : "Completed ✓") : `${completedLessonsCount} / 5 ${isKhmer ? "មេរៀន" : "Lessons"}`,
        progressPercent: Math.min(100, Math.round((completedLessonsCount / 5) * 100)),
        xpReward: 200,
        badgeTagKm: "កម្មវិធីសិក្សា",
        badgeTagEn: "Curriculum",
      },
      {
        id: "exam_preparation",
        icon: Award,
        iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        titleKm: currentGrade === 12 ? "ត្រៀមប្រឡងបាក់ឌុប" : currentGrade === 9 ? "ត្រៀមប្រឡងឌីប្លូម" : "ការត្រៀមប្រឡងជាតិ",
        titleEn: currentGrade === 12 ? "Bac II Candidate" : currentGrade === 9 ? "Brevet Candidate" : "National Assessment",
        descKm: `ត្រៀមលក្ខណៈ និងអនុវត្តវិញ្ញាសាប្រឡងជាតិ MoEYS ថ្នាក់ទី ${toKhmerNumeral(currentGrade)}`,
        descEn: `Prepare and solve verified MoEYS past papers for Grade ${currentGrade}`,
        unlocked: currentGrade === 12 || currentGrade === 9,
        progressText: currentGrade === 12 || currentGrade === 9 ? (isKhmer ? "សកម្ម ✓" : "Active ✓") : (isKhmer ? "ដោះសោនៅថ្នាក់ទី ៩ & ១២" : "Grade 9 & 12 only"),
        progressPercent: currentGrade === 12 || currentGrade === 9 ? 100 : 50,
        xpReward: 250,
        badgeTagKm: "ការប្រឡងជាតិ",
        badgeTagEn: "National Exam",
      },
    ];
  }, [streakDays, xp, completedLessonsCount, currentGrade, isKhmer]);

  const unlockedCount = studentBadges.filter((b) => b.unlocked).length;

  // Profile completeness calculation
  const completenessScore = useMemo(() => {
    let score = 20; // base registered
    if (displayName) score += 20;
    if (fullName) score += 20;
    if (schoolName) score += 20;
    if (isAvatarCustomImage(selectedAvatar) || selectedAvatar !== "angkor") score += 20;
    return score;
  }, [displayName, fullName, schoolName, selectedAvatar]);

  return (
    <AppShell
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "គណនីសិស្ស" : "Profile & Account" },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* 1. Academic Status Card */}
          <section className="p-4 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#059669]" />
                <span>{isKhmer ? "ស្ថានភាពគណនី" : "Account Status"}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isKhmer ? "បានភ្ជាប់" : "Active"}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">{isKhmer ? "ប្រភេទ" : "Type"}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {isGuest ? (isKhmer ? "សិស្សភ្ញៀវ" : "Guest") : (isKhmer ? "សិស្សផ្លូវការ" : "Standard")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">{isKhmer ? "កម្រិតថ្នាក់" : "Grade"}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(currentGrade)}` : `Grade ${currentGrade}`}
                </span>
              </div>
              {currentGrade >= 11 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">{isKhmer ? "ផ្នែកសិក្សា" : "Track"}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {studyStream === "science"
                      ? isKhmer ? "វិទ្យាសាស្ត្រពិត" : "Science"
                      : isKhmer ? "វិទ្យាសាស្ត្រសង្គម" : "Social"}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">{isKhmer ? "កម្មវិធីសិក្សា" : "Curriculum"}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">MoEYS 2026</span>
              </div>
            </div>
          </section>

          {/* 2. Profile Completeness */}
          <section className="p-4 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {isKhmer ? "កម្រិតបំពេញព័ត៌មាន" : "Profile Completeness"}
              </span>
              <span className="font-bold text-[#059669]">{completenessScore}%</span>
            </div>

            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#059669] transition-all duration-500"
                style={{ width: `${completenessScore}%` }}
              />
            </div>

            <div className="space-y-1 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className={cn("h-3 w-3", displayName ? "text-[#059669]" : "text-slate-300")} />
                <span>{isKhmer ? "ឈ្មោះបង្ហាញគណនី" : "Display name"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className={cn("h-3 w-3", fullName ? "text-[#059669]" : "text-slate-300")} />
                <span>{isKhmer ? "ឈ្មោះពេញសិស្ស" : "Full legal name"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className={cn("h-3 w-3", schoolName ? "text-[#059669]" : "text-slate-300")} />
                <span>{isKhmer ? "គ្រឹះស្ថានសិក្សា / សាលារៀន" : "School institution"}</span>
              </div>
            </div>
          </section>

          {/* 3. Concise Account Shortcuts */}
          <section className="p-3.5 rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "profile" ? "settings" : "profile")}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-slate-400" />
                <span>{activeTab === "profile" ? (isKhmer ? "បើកការកំណត់គណនី" : "Account Settings") : (isKhmer ? "ត្រឡប់ទៅរូបសង្ខេប" : "View Profile")}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </button>

            <Link
              to="/reference"
              search={{ grade: currentGrade }}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#059669]" />
                <span>{isKhmer ? "បណ្ណាល័យរូបមន្ត & យោង" : "Formula Warehouse"}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              to="/exams"
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>{isKhmer ? "បណ្ណសារវិញ្ញាសាជាតិ" : "Exam Archive"}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </section>
        </div>
      }
    >
      <div className="space-y-5 pb-8">
        {/* Top Header: Title & Clean Segmented Destination Tabs (Profile vs Settings) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EAF0] dark:border-slate-800">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeTab === "profile"
                ? isKhmer ? "គណនីសិស្ស & សមិទ្ធផល" : "Student Profile & Identity"
                : isKhmer ? "ការកំណត់គណនី & ប្រព័ន្ធ" : "Account Settings & Preferences"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeTab === "profile"
                ? isKhmer ? "ព័ត៌មានអត្តសញ្ញាណសិស្ស កម្រិតថ្នាក់ និងសមិទ្ធផលសិក្សា" : "Manage your student academic identity and milestone progress"
                : isKhmer ? "កំណត់ភាសា សំឡេង ការជូនដំណឹង និងសុវត្ថិភាពគណនី" : "Configure language, audio, daily reminders, and security"}
            </p>
          </div>

          {/* P0: Segmented Destination Control (Profile vs Settings) */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setActiveTab("profile");
              }}
              className={cn(
                "py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer",
                activeTab === "profile"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <User className="h-3.5 w-3.5 text-[#059669]" />
              <span>{isKhmer ? "រូបសង្ខេប" : "Profile"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setActiveTab("settings");
              }}
              className={cn(
                "py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer",
                activeTab === "settings"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Settings className="h-3.5 w-3.5 text-slate-500" />
              <span>{isKhmer ? "ការកំណត់" : "Settings"}</span>
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* TAB CONTENT A: STUDENT PROFILE (IDENTITY & PROGRESS)            */}
        {/* ================================================================ */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* 1. Compact Horizontal Student Identity Section */}
            <section className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Prominent but compact avatar with quick customize trigger */}
                  <div className="relative group shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setIsAvatarModalOpen(true);
                      }}
                      className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl overflow-hidden border-2 border-emerald-500/70 bg-slate-100 dark:bg-slate-800 grid place-items-center shadow-xs transition group-hover:scale-105 cursor-pointer relative"
                      title={isKhmer ? "ចុចដើម្បីប្តូររូបតំណាង" : "Click to customize avatar"}
                    >
                      {renderAvatarContent(selectedAvatar, displayName)}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center text-white">
                        <Camera className="h-4 w-4" />
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setIsAvatarModalOpen(true);
                      }}
                      className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#059669] hover:bg-[#047857] text-white border-2 border-white dark:border-slate-900 grid place-items-center shadow-xs cursor-pointer active:scale-95"
                      title={isKhmer ? "ប្តូររូបតំណាង" : "Change avatar"}
                    >
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Student Details */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                        {displayName || (isKhmer ? "សិស្ស ScienceKH" : "ScienceKH Student")}
                      </h2>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                        {isGuest ? (isKhmer ? "ភ្ញៀវ" : "Guest") : (isKhmer ? "សិស្ស MoEYS" : "Verified")}
                      </span>
                    </div>

                    {fullName && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                        {fullName}
                      </p>
                    )}

                    {/* Academic Badges Row */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs pt-0.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                        <GraduationCap className="h-3 w-3 text-[#059669]" />
                        <span>{isKhmer ? `ថ្នាក់ទី ${toKhmerNumeral(currentGrade)}` : `Grade ${currentGrade}`}</span>
                      </span>

                      {currentGrade >= 11 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                          <span>{studyStream === "science" ? "🔬" : "📚"}</span>
                          <span>
                            {studyStream === "science"
                              ? isKhmer ? "វិទ្យាសាស្ត្រពិត" : "Science"
                              : isKhmer ? "សង្គម" : "Social"}
                          </span>
                        </span>
                      )}

                      {schoolName && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium text-[11px] truncate max-w-[200px]">
                          <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="truncate">{schoolName}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      sounds.playPop();
                      setIsEditProfileModalOpen(true);
                    }}
                    className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 text-xs font-bold gap-1.5 h-9 cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span>{isKhmer ? "កែប្រែព័ត៌មាន" : "Edit Profile"}</span>
                  </Button>
                </div>
              </div>
            </section>

            {/* 2. Four Authentic Learning Statistics Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Metric 1: Learning Streak */}
              <div className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-left shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
                  <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <span>{isKhmer ? "ថ្ងៃជាប់គ្នា" : "Daily Streak"}</span>
                </div>
                <p className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? toKhmerNumeral(streakDays) : streakDays} <span className="text-xs font-normal text-slate-400">{isKhmer ? "ថ្ងៃ" : "Days"}</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {isKhmer ? "ទម្លាប់សិក្សាជាប់លាប់" : "Consecutive study rhythm"}
                </p>
              </div>

              {/* Metric 2: Total Knowledge XP */}
              <div className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-left shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{isKhmer ? "ពិន្ទុចំណេះដឹង" : "Total XP"}</span>
                </div>
                <p className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? toKhmerNumeral(xp.toLocaleString()) : xp.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {isKhmer ? "ពិន្ទុសរុបទទួលបាន" : "Earned knowledge XP"}
                </p>
              </div>

              {/* Metric 3: Real Lessons Completed */}
              <div className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-left shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <BookOpen className="h-4 w-4" />
                  <span>{isKhmer ? "មេរៀនចប់" : "Lessons"}</span>
                </div>
                <p className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? toKhmerNumeral(completedLessonsCount) : completedLessonsCount} <span className="text-xs font-normal text-slate-400">{isKhmer ? "មេរៀន" : "Lessons"}</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {isKhmer ? "មេរៀនកម្មវិធីជាតិ" : "Completed curriculum units"}
                </p>
              </div>

              {/* Metric 4: Achievements Unlocked */}
              <div className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-left shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <Award className="h-4 w-4" />
                  <span>{isKhmer ? "មេដាយ" : "Achievements"}</span>
                </div>
                <p className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? `${toKhmerNumeral(unlockedCount)} / ${toKhmerNumeral(studentBadges.length)}` : `${unlockedCount} / ${studentBadges.length}`}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {isKhmer ? "សមិទ្ធផលកិត្តិយស" : "Unlocked milestones"}
                </p>
              </div>
            </section>

            {/* 3. Academic Achievements & Milestones */}
            <section className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#059669]" />
                    <span>{isKhmer ? "សមិទ្ធផលសិក្សា & មេដាយកិត្តិយស" : "Academic Achievements & Honors"}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isKhmer ? "ផ្អែកលើវឌ្ឍនភាពសិក្សា និងការអនុវត្តជាក់ស្តែងក្នុងប្រព័ន្ធ" : "Earned through authentic curriculum study and daily rhythm"}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {isKhmer
                    ? `${toKhmerNumeral(unlockedCount)} នៃ ${toKhmerNumeral(studentBadges.length)} សម្រេច`
                    : `${unlockedCount} of ${studentBadges.length} Unlocked`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {studentBadges.map((b) => {
                  const IconComp = b.icon;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setSelectedBadgeModal(b);
                      }}
                      className={cn(
                        "flex flex-col text-left p-3.5 rounded-xl border transition active:scale-[0.99] cursor-pointer shadow-2xs",
                        b.unlocked
                          ? "bg-white dark:bg-slate-900 border-[#E5EAF0] dark:border-slate-800 hover:border-emerald-400"
                          : "bg-slate-50/60 dark:bg-slate-850/40 border-slate-200/60 dark:border-slate-800/80 opacity-75"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={cn(
                            "h-8 w-8 rounded-lg grid place-items-center border",
                            b.unlocked ? b.iconBg : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                          )}
                        >
                          <IconComp className={cn("h-4 w-4", b.unlocked ? b.iconColor : "text-slate-400")} />
                        </div>

                        <span
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                            b.unlocked
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                          )}
                        >
                          {b.unlocked ? (isKhmer ? "សម្រេច ✓" : "Done ✓") : (isKhmer ? "ជាប់សោ" : "Locked")}
                        </span>
                      </div>

                      <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {isKhmer ? b.titleKm : b.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {isKhmer ? b.descKm : b.descEn}
                      </p>

                      <div className="mt-2 w-full pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-semibold">
                        <span className="text-slate-400">{b.progressText}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">+{b.xpReward} XP</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 4. Bookmarks and Saved Academic Resources */}
            <section className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-[#059669]" />
                    <span>{isKhmer ? "ធនធានសិក្សាបានកត់ត្រាទុក" : "Saved Academic Resources"}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isKhmer ? "រូបមន្ត និយមន័យ និងវិញ្ញាសាដែលអ្នកបានរក្សាទុក" : "Quick access to bookmarked formulas and offline past papers"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Link
                  to="/reference"
                  search={{ grade: currentGrade }}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 hover:border-emerald-400 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] grid place-items-center">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {isKhmer ? "រូបមន្តបានកត់ត្រា" : "Bookmarked Formulas"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {bookmarkedRefsCount} {isKhmer ? "ឯកសារយោង" : "saved references"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/exams"
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 hover:border-emerald-400 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 grid place-items-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {isKhmer ? "វិញ្ញាសាសម្រាប់ក្រៅបណ្តាញ" : "Offline Exam Papers"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {savedOfflineExamsCount} {isKhmer ? "វិញ្ញាសាបានទាញយក" : "papers downloaded"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB CONTENT B: ACCOUNT SETTINGS & PREFERENCES                   */}
        {/* ================================================================ */}
        {activeTab === "settings" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* 1. Account Identity & School Details */}
            <section className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs space-y-4">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-[#059669]" />
                  <span>{isKhmer ? "ព័ត៌មានអត្តសញ្ញាណសិស្ស" : "Student Identity & Institution"}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isKhmer ? "គ្រប់គ្រងឈ្មោះផ្លូវការ កម្រិតថ្នាក់ និងផ្នែកសិក្សា" : "Manage your legal name, grade level, and academic track"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isKhmer ? "ឈ្មោះបង្ហាញ (Display Name)" : "Display Name"}
                  </label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Saravuth"
                    className="h-9.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isKhmer ? "ឈ្មោះពេញ (Full Name)" : "Full Name"}
                  </label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chea Saravuth"
                    className="h-9.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isKhmer ? "គ្រឹះស្ថានសិក្សា / សាលារៀន" : "School / Institution"}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. Preah Sisowath High School"
                      className="h-9.5 pl-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Grade Selector */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isKhmer ? "កម្រិតថ្នាក់សិក្សា" : "Grade Level"}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[7, 8, 9, 10, 11, 12].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setCurrentGrade(g)}
                      className={cn(
                        "py-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer active:scale-95",
                        currentGrade === g
                          ? "bg-[#059669] text-white font-black shadow-xs ring-2 ring-emerald-500/20"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                      )}
                    >
                      <span>{isKhmer ? `ថ្នាក់ ${toKhmerNumeral(g)}` : `Gr ${g}`}</span>
                      <span className="text-[9px] opacity-80">{g <= 9 ? (isKhmer ? "អនុ" : "Jr") : (isKhmer ? "វិទ្យា" : "Sr")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Track Selector for Grade 11 & 12 */}
              {currentGrade >= 11 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isKhmer ? "ផ្នែកសិក្សាបាក់ឌុប (Stream)" : "Bac II Academic Stream"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStudyStream("science")}
                      className={cn(
                        "p-2.5 rounded-xl border text-left transition cursor-pointer active:scale-98",
                        studyStream === "science"
                          ? "border-[#059669] bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <p className="text-xs font-bold">🔬 {isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រពិត" : "Science Stream"}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{isKhmer ? "គណិត រូប គីមី ជីវៈ" : "Math, Physics, Chem, Bio"}</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudyStream("social")}
                      className={cn(
                        "p-2.5 rounded-xl border text-left transition cursor-pointer active:scale-98",
                        studyStream === "social"
                          ? "border-[#059669] bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <p className="text-xs font-bold">📚 {isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រសង្គម" : "Social Stream"}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{isKhmer ? "ខ្មែរ ប្រវត្តិ ភូមិ ពលរដ្ឋ" : "Khmer, History, Geog, Civics"}</p>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <Button
                  type="button"
                  onClick={() =>
                    handleSaveFullProfile({
                      displayName,
                      fullName,
                      grade: currentGrade,
                      stream: studyStream,
                      school: schoolName,
                    })
                  }
                  className="rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold h-9 px-4 cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5 mr-1 stroke-[3]" />
                  <span>{isKhmer ? "រក្សាទុកព័ត៌មាន" : "Save Changes"}</span>
                </Button>
              </div>
            </section>

            {/* 2. Language & Audio Preferences */}
            <section className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs space-y-4">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#059669]" />
                  <span>{isKhmer ? "ចំណូលចិត្តភាសា & សំឡេង" : "Language & Audio Preferences"}</span>
                </h3>
              </div>

              {/* Language Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isKhmer ? "ភាសាបង្ហាញកម្មវិធី" : "Interface Language"}
                </label>
                <div className="grid grid-cols-2 gap-2 max-w-sm">
                  <button
                    type="button"
                    onClick={() => handleToggleLanguage("km")}
                    className={cn(
                      "py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer",
                      currentLanguage === "km"
                        ? "border-[#059669] bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] font-black ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <span>🇰🇭</span>
                    <span>ភាសាខ្មែរ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleLanguage("en")}
                    className={cn(
                      "py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer",
                      currentLanguage === "en"
                        ? "border-[#059669] bg-emerald-50 dark:bg-emerald-950/60 text-[#059669] font-black ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <span>🌐</span>
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* Sound Toggle */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {soundEnabled ? <Volume2 className="h-4 w-4 text-[#059669]" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                    <span>{isKhmer ? "សំឡេងអមការរៀន" : "Learning Sound Effects"}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isKhmer ? "សំឡេងឆ្លើយត្រូវក្នុង Quiz និងរំលឹកមេរៀន" : "Audio chimes for quizzes and achievements"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleSound}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors cursor-pointer",
                    soundEnabled ? "bg-[#059669]" : "bg-slate-300 dark:bg-slate-700"
                  )}
                  aria-label="Toggle Sound"
                >
                  <span
                    className={cn(
                      "block h-5 w-5 rounded-full bg-white transition-transform shadow-xs",
                      soundEnabled ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Streak Guardian Reminder Toggle */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {notificationsEnabled ? <Bell className="h-4 w-4 text-[#059669]" /> : <BellOff className="h-4 w-4 text-slate-400" />}
                    <span>{isKhmer ? "ការរំលឹកការពារ Streak (ម៉ោង 7:00 យប់)" : "Streak Guardian Notification"}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isKhmer ? "ផ្ញើសាររំលឹកប្រសិនបើអ្នកមិនទាន់បានចូលរៀនប្រចាំថ្ងៃ" : "Daily reminder before streak expiration"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors cursor-pointer",
                    notificationsEnabled ? "bg-[#059669]" : "bg-slate-300 dark:bg-slate-700"
                  )}
                  aria-label="Toggle Notifications"
                >
                  <span
                    className={cn(
                      "block h-5 w-5 rounded-full bg-white transition-transform shadow-xs",
                      notificationsEnabled ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
            </section>

            {/* 3. Account Details & Security */}
            <section className="rounded-2xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs space-y-3">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-500" />
                  <span>{isKhmer ? "សុវត្ថិភាព & គណនី" : "Account Security & Details"}</span>
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{isKhmer ? "អ៊ីមែលគណនី" : "Email"}</span>
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {user?.email || "student@sciencekh.edu.kh"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{isKhmer ? "លេខសម្គាល់គណនី" : "Account ID"}</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    #{user?.id?.slice(0, 8) || "000000"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#059669]" />
                    <span>{isKhmer ? "កម្រិតសុវត្ថិភាព" : "Security Level"}</span>
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {isGuest ? (isKhmer ? "ភ្ញៀវសាកល្បង" : "Guest Sandbox") : (isKhmer ? "បានផ្ទៀងផ្ទាត់ (Secured)" : "Secured")}
                  </span>
                </div>
              </div>
            </section>

            {/* 4. Danger Zone: Sign Out Action (Restrained, Non-Promotional) */}
            <section className="rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <LogOut className="h-4 w-4" />
                  <span>{isKhmer ? "ចាកចេញពីគណនី" : "Sign Out of ScienceKH"}</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isKhmer
                    ? "វឌ្ឍនភាព ពិន្ទុ XP និងការកត់ត្រារបស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាពក្នុងពពក។"
                    : "Your learning progress, quiz scores, and bookmarks remain safely stored."}
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSignOutModalOpen(true)}
                className="rounded-xl border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold h-9 px-4 shrink-0 cursor-pointer"
              >
                <span>{isKhmer ? "ចាកចេញ" : "Sign Out"}</span>
              </Button>
            </section>
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/* MODAL 1: DEDICATED AVATAR SELECTION MODAL                        */}
      {/* Consistent vector illustrations + monograms + custom upload     */}
      {/* ================================================================ */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-[#E5EAF0] dark:border-slate-800 text-slate-900 dark:text-white p-5 sm:p-6 shadow-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="h-4 w-4 text-[#059669]" />
              <span>{isKhmer ? "ជ្រើសរើសរូបតំណាងគណនី" : "Customize Profile Avatar"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              {isKhmer
                ? "ជ្រើសរើសរូបតំណាងវិទ្យាសាស្ត្រ អក្សរកាត់ ឬបង្ហោះរូបថតផ្ទាល់ខ្លួន"
                : "Choose an academic scholar avatar, monogram, or upload a photo"}
            </DialogDescription>
          </DialogHeader>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileUpload}
            className="hidden"
            aria-label="Upload profile image"
          />

          <div className="space-y-4 mt-2">
            {/* Section A: Upload Photo Option */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl overflow-hidden border-2 border-emerald-500 bg-white dark:bg-slate-900 grid place-items-center text-xl shrink-0 shadow-2xs">
                  {isAvatarCustomImage(selectedAvatar) ? (
                    <img src={selectedAvatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Upload className="h-5 w-5 text-[#059669]" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {isKhmer ? "រូបថតផ្ទាល់ខ្លួន" : "Personal Photo"}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isAvatarCustomImage(selectedAvatar)
                      ? isKhmer ? "រូបថតកំពុងប្រើប្រាស់" : "Custom picture active"
                      : isKhmer ? "JPG, PNG ឬ WEBP (< 8MB)" : "JPG, PNG or WEBP (< 8MB)"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {isAvatarCustomImage(selectedAvatar) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveCustomAvatar}
                    className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 text-xs h-8 px-2.5 cursor-pointer"
                    title={isKhmer ? "លុបរូបថត" : "Remove photo"}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  disabled={isUploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold gap-1.5 h-8 px-3 cursor-pointer"
                >
                  {isUploadingAvatar ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                  <span>{isKhmer ? "បង្ហោះរូប" : "Upload"}</span>
                </Button>
              </div>
            </div>

            {/* Section B: Consistent Academic Scholar Avatars */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {isKhmer ? "រូបតំណាងវិទ្យាសាស្ត្រ MoEYS" : "Academic Scholar Avatars"}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SCHOLAR_AVATARS.map((av) => {
                  const isSelected = selectedAvatar === av.id;
                  const IconComp = av.icon;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => handleSaveAvatar(av.id)}
                      className={cn(
                        "p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95",
                        isSelected
                          ? "border-[#059669] bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 shadow-2xs"
                          : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                      )}
                    >
                      <div className={cn("h-10 w-10 rounded-xl grid place-items-center text-white bg-gradient-to-br shadow-2xs", av.gradient)}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate w-full">
                        {isKhmer ? av.nameKm : av.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section C: Monogram Initials */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {isKhmer ? "អក្សរកាត់ឈ្មោះសិស្ស (Monogram)" : "Student Monograms"}
              </span>
              <div className="grid grid-cols-4 gap-2">
                {MONOGRAM_OPTIONS.map((mono) => {
                  const isSelected = selectedAvatar === mono.id;
                  const initials = (displayName || "SK")
                    .trim()
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <button
                      key={mono.id}
                      type="button"
                      onClick={() => handleSaveAvatar(mono.id)}
                      className={cn(
                        "p-2 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95",
                        isSelected
                          ? "border-[#059669] bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 shadow-2xs"
                          : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                      )}
                    >
                      <div className={cn("h-8 w-8 rounded-lg grid place-items-center text-white font-black text-xs bg-gradient-to-br shadow-2xs", mono.gradient)}>
                        {initials}
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold truncate">
                        {isKhmer ? mono.labelKm : mono.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAvatarModalOpen(false)}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              {isKhmer ? "បិទ" : "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================================================================ */}
      {/* MODAL 2: EDIT STUDENT PROFILE MODAL                              */}
      {/* ================================================================ */}
      <EditProfileDialog
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        initialData={{
          displayName,
          fullName,
          grade: currentGrade,
          stream: studyStream,
          school: schoolName,
          avatarUrl: selectedAvatar,
        }}
        isKhmer={isKhmer}
        onSave={handleSaveFullProfile}
      />

      {/* ================================================================ */}
      {/* MODAL 3: ACHIEVEMENT CELEBRATION MODAL                           */}
      {/* ================================================================ */}
      <Dialog
        open={!!selectedBadgeModal}
        onOpenChange={(open) => !open && setSelectedBadgeModal(null)}
      >
        {selectedBadgeModal && (
          <DialogContent className="max-w-xs rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 shadow-xl text-center">
            <div className="mx-auto mb-3">
              <div
                className={cn(
                  "h-14 w-14 rounded-2xl border grid place-items-center mx-auto shadow-2xs",
                  selectedBadgeModal.unlocked ? selectedBadgeModal.iconBg : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                )}
              >
                {(() => {
                  const IconC = selectedBadgeModal.icon;
                  return <IconC className={cn("h-7 w-7", selectedBadgeModal.unlocked ? selectedBadgeModal.iconColor : "text-slate-400")} />;
                })()}
              </div>
            </div>

            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="font-display text-base font-black text-slate-900 dark:text-white">
                {isKhmer ? selectedBadgeModal.titleKm : selectedBadgeModal.titleEn}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isKhmer ? selectedBadgeModal.descKm : selectedBadgeModal.descEn}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                {isKhmer ? "រង្វាន់ចំណេះដឹង" : "Milestone Bounty"}
              </span>
              <p className="text-base font-black text-[#059669]">
                +{selectedBadgeModal.xpReward} Knowledge XP
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5 font-medium">
                {selectedBadgeModal.progressText}
              </p>
            </div>

            {selectedBadgeModal.unlocked ? (
              <Button
                type="button"
                onClick={() => {
                  launchConfetti();
                  sounds.playVictory();
                  setSelectedBadgeModal(null);
                }}
                className="mt-3 w-full h-10 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs cursor-pointer active:scale-95"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                <span>{isKhmer ? "អបអរសមិទ្ធផល 🎉" : "Celebrate Achievement 🎉"}</span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedBadgeModal(null)}
                className="mt-3 w-full h-10 rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                <span>{isKhmer ? "បិទ" : "Close"}</span>
              </Button>
            )}
          </DialogContent>
        )}
      </Dialog>

      {/* ================================================================ */}
      {/* MODAL 4: SIGN OUT CONFIRMATION MODAL                             */}
      {/* ================================================================ */}
      <Dialog open={isSignOutModalOpen} onOpenChange={setIsSignOutModalOpen}>
        <DialogContent className="max-w-xs rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 shadow-xl text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 mb-2 border border-rose-200/60 dark:border-rose-900">
            <LogOut className="h-5 w-5" />
          </div>

          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="font-display text-base font-bold text-slate-900 dark:text-white">
              {isKhmer ? "ចាកចេញពីគណនី?" : "Sign Out of ScienceKH?"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {isKhmer
                ? "តើអ្នកពិតជាចង់ចាកចេញពីគណនីមែនទេ? វឌ្ឍនភាពសិក្សា និងពិន្ទុរបស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាព។"
                : "Are you sure you want to sign out? Your learning progress and XP are safely saved."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSignOutModalOpen(false)}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
            >
              {isKhmer ? "បោះបង់" : "Cancel"}
            </Button>

            <Button
              type="button"
              onClick={handleConfirmSignOut}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
            >
              {isKhmer ? "ចាកចេញ" : "Sign Out"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    displayName: string;
    fullName: string;
    grade: number;
    stream: "science" | "social";
    school: string;
    avatarUrl: string;
  };
  isKhmer: boolean;
  onSave: (data: {
    displayName: string;
    fullName: string;
    grade: number;
    stream: "science" | "social";
    school: string;
  }) => void;
}

function EditProfileDialog({
  isOpen,
  onClose,
  initialData,
  isKhmer,
  onSave,
}: EditProfileDialogProps) {
  const [displayName, setDisplayName] = useState(initialData.displayName);
  const [fullName, setFullName] = useState(initialData.fullName);
  const [grade, setGrade] = useState(initialData.grade);
  const [stream, setStream] = useState(initialData.stream);
  const [school, setSchool] = useState(initialData.school);

  useEffect(() => {
    if (isOpen) {
      setDisplayName(initialData.displayName);
      setFullName(initialData.fullName);
      setGrade(initialData.grade);
      setStream(initialData.stream);
      setSchool(initialData.school);
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      displayName: displayName.trim() || initialData.displayName,
      fullName: fullName.trim(),
      grade,
      stream,
      school: school.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-[#E5EAF0] dark:border-slate-800 text-slate-900 dark:text-white p-5 sm:p-6 shadow-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Pencil className="h-4 w-4 text-[#059669]" />
            <span>{isKhmer ? "កែប្រែព័ត៌មានគណនីសិស្ស" : "Edit Student Profile"}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            {isKhmer
              ? "ធ្វើបច្ចុប្បន្នភាពឈ្មោះ កម្រិតថ្នាក់ ផ្នែកសិក្សា និងគ្រឹះស្ថានសិក្សា"
              : "Update your student identity, grade level, track, and school"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
          {/* Display Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "ឈ្មោះបង្ហាញ" : "Display Name"} <span className="text-rose-500">*</span>
            </label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Saravuth"
              className="h-9.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-semibold"
              required
            />
          </div>

          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "ឈ្មោះពេញ" : "Full Name"}
            </label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Chea Saravuth"
              className="h-9.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs"
            />
          </div>

          {/* Grade Selector (7–12) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "កម្រិតថ្នាក់" : "Grade Level"}
            </label>
            <div className="grid grid-cols-6 gap-1">
              {[7, 8, 9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={cn(
                    "py-1.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer active:scale-95",
                    grade === g
                      ? "bg-[#059669] text-white font-black shadow-xs ring-2 ring-emerald-500/20"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                  )}
                >
                  <span>{isKhmer ? toKhmerNumeral(g) : g}</span>
                  <span className="text-[8px] opacity-80">{g <= 9 ? (isKhmer ? "អនុ" : "Jr") : (isKhmer ? "វិទ្យា" : "Sr")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stream Track (Grades 11 & 12) */}
          {grade >= 11 && (
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isKhmer ? "ផ្នែកសិក្សាបាក់ឌុប" : "Bac II Academic Stream"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStream("science")}
                  className={cn(
                    "p-2 rounded-xl border text-left transition cursor-pointer active:scale-98",
                    stream === "science"
                      ? "border-[#059669] bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <p className="text-xs font-bold">🔬 {isKhmer ? "វិទ្យាសាស្ត្រពិត" : "Science"}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setStream("social")}
                  className={cn(
                    "p-2 rounded-xl border text-left transition cursor-pointer active:scale-98",
                    stream === "social"
                      ? "border-[#059669] bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <p className="text-xs font-bold">📚 {isKhmer ? "វិទ្យាសាស្ត្រសង្គម" : "Social"}</p>
                </button>
              </div>
            </div>
          )}

          {/* School Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "គ្រឹះស្ថានសិក្សា / សាលារៀន" : "School / Institution"}
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Preah Sisowath High School"
                className="h-9.5 pl-9 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer"
            >
              {isKhmer ? "បោះបង់" : "Cancel"}
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5 mr-1 stroke-[3]" />
              <span>{isKhmer ? "រក្សាទុក" : "Save Changes"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
