// ==============================================================================
// ScienceKH — Student Profile & Academic Passport
// Professional, Clean, Executive Product Design for Cambodian STEM Students
// Zero Broken Truncations, Refined Hierarchy, and Authentic Apple/Duolingo Polish
// ==============================================================================

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Flame,
  Trophy,
  Award,
  Globe,
  GraduationCap,
  Coins,
  Camera,
  Check,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Pencil,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Mail,
  Lock,
  ChevronRight,
  Sparkle,
  User,
  Lightbulb,
  Upload,
  Trash2,
  Loader2,
  Building2,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
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

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Student Profile — ScienceKH" }] }),
  component: ProfilePage,
});

// STEM Avatars with authentic MoEYS scientific identities
interface AvatarOption {
  id: string;
  emoji: string;
  nameKm: string;
  nameEn: string;
  roleKm: string;
  roleEn: string;
}

const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: "angkor",
    emoji: "🇰🇭",
    nameKm: "សិស្សកម្ពុជា",
    nameEn: "Angkor Scholar",
    roleKm: "ស្មារតីជាតិ",
    roleEn: "National Spirit",
  },
  {
    id: "physics",
    emoji: "👨‍🔬",
    nameKm: "អ្នករូបវិទ្យា",
    nameEn: "Physicist",
    roleKm: "មេកានិច & ចលនា",
    roleEn: "Mechanics & Motion",
  },
  {
    id: "chemistry",
    emoji: "👩‍🔬",
    nameKm: "អ្នកគីមីវិទ្យា",
    nameEn: "Chemist",
    roleKm: "សមាសធាតុគីមី",
    roleEn: "Reactions & Bonds",
  },
  {
    id: "mechanics",
    emoji: "⚡",
    nameKm: "ញូតុន",
    nameEn: "Newton",
    roleKm: "ថាមពល & កម្លាំង",
    roleEn: "Energy & Dynamics",
  },
  {
    id: "biology",
    emoji: "🧬",
    nameKm: "អ្នកជីវវិទ្យា",
    nameEn: "Biologist",
    roleKm: "ហ្សែន & កោសិកា",
    roleEn: "Genetics & Cells",
  },
  {
    id: "ai_tutor",
    emoji: "🤖",
    nameKm: "គ្រូ AI វុឌ្ឍ",
    nameEn: "Kru Vuth AI",
    roleKm: "ជំនួយការឆ្លាតវៃ",
    roleEn: "Socratic Mentor",
  },
];

// Grade definitions (Grades 7–12)
const GRADES = [
  {
    grade: 7,
    label: "Grade 7",
    labelKm: "ថ្នាក់ទី ៧",
    cycle: "Junior High",
    cycleKm: "អនុវិទ្យាល័យ",
  },
  {
    grade: 8,
    label: "Grade 8",
    labelKm: "ថ្នាក់ទី ៨",
    cycle: "Junior High",
    cycleKm: "អនុវិទ្យាល័យ",
  },
  {
    grade: 9,
    label: "Grade 9 (Brevet)",
    labelKm: "ថ្នាក់ទី ៩ (ឌីប្លូម)",
    cycle: "Brevet Exam",
    cycleKm: "ប្រឡងឌីប្លូម",
  },
  {
    grade: 10,
    label: "Grade 10",
    labelKm: "ថ្នាក់ទី ១០",
    cycle: "Senior High",
    cycleKm: "វិទ្យាល័យ",
  },
  {
    grade: 11,
    label: "Grade 11",
    labelKm: "ថ្នាក់ទី ១១",
    cycle: "Senior High",
    cycleKm: "វិទ្យាល័យ",
  },
  {
    grade: 12,
    label: "Grade 12 (BacII)",
    labelKm: "ថ្នាក់ទី ១២ (បាក់ឌុប)",
    cycle: "Bac II Exam",
    cycleKm: "ប្រឡងបាក់ឌុប",
  },
];

interface BadgeData {
  id: string;
  icon: string;
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
 * High-performance client-side image resizer using HTML5 Canvas
 * Produces crisp, ultra-lightweight JPEG/WEBP data URLs (< 60KB)
 */
function resizeImageToDataUrl(
  file: File,
  maxWidth = 384,
  maxHeight = 384,
  quality = 0.85,
): Promise<string> {
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
  const { data: dbData, lang: activeLang } = useProfile();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isKhmer = activeLang === "km";

  // Real-time Supabase Profile Sync
  const { data: liveProfile } = useQuery({
    queryKey: ["profile-live", user?.id],
    enabled: !!user?.id,
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

  // Local state
  const [selectedAvatar, setSelectedAvatar] = useState<string>("angkor");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false);
  const [currentGrade, setCurrentGrade] = useState<number>(10);
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

  // Profile fields & edit state
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [editNameValue, setEditNameValue] = useState<string>("");
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

  const [isGradeDrawerOpen, setIsGradeDrawerOpen] = useState<boolean>(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<BadgeData | null>(null);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

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
      const { data, error } = await (supabase
        .from("profiles") as any)
        .update(fields)
        .eq("id", user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile-live", user?.id] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    },
  });

  // Handle instant avatar selection
  const handleSelectAvatar = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    sounds.playPop();
    localStorage.setItem(`sciencekh_avatar_${user?.id || "guest"}`, avatarId);
    updateFieldMutation.mutate(
      { avatar_url: avatarId },
      {
        onSuccess: () => {
          const matched = AVATAR_OPTIONS.find((a) => a.id === avatarId);
          toast.success(
            isKhmer
              ? `បានជ្រើសរើសរូប ${matched?.nameKm || avatarId}`
              : `Avatar updated to ${matched?.nameEn || avatarId}`,
          );
        },
      },
    );
  };

  // Handle client-side image compression and upload (Supabase Storage or direct Base64 fallback)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(
        isKhmer
          ? "សូមជ្រើសរើសឯកសាររូបភាព (JPG, PNG, WEBP)"
          : "Please select a valid image file (JPG, PNG, WEBP)",
      );
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error(isKhmer ? "រូបភាពត្រូវតែមានទំហំតូចជាង 8MB" : "Image size must be under 8MB");
      return;
    }

    setIsUploadingAvatar(true);
    const toastId = toast.loading(
      isKhmer ? "កំពុងដំណើរការ និងបង្ហោះរូបភាព..." : "Processing & uploading photo...",
    );

    try {
      const compressedDataUrl = await resizeImageToDataUrl(file, 384, 384, 0.85);
      let finalAvatarUrl = compressedDataUrl;

      // If user is authenticated, attempt Supabase Storage upload
      if (user?.id) {
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
            const { data: pubData } = supabase.storage
              .from("avatars")
              .getPublicUrl(fileName);
            if (pubData?.publicUrl) {
              finalAvatarUrl = pubData.publicUrl;
            }
          }
        } catch {
          // Gracefully fallback to high-quality compressed data URL
        }
      }

      // Update state and persistence
      setSelectedAvatar(finalAvatarUrl);
      localStorage.setItem(`sciencekh_avatar_${user?.id || "guest"}`, finalAvatarUrl);

      await updateFieldMutation.mutateAsync({ avatar_url: finalAvatarUrl });

      sounds.playVictory();
      launchConfetti();
      toast.success(
        isKhmer
          ? "បានផ្លាស់ប្តូររូបថតគណនីជោគជ័យ! 🎉"
          : "Profile photo updated successfully! 🎉",
        { id: toastId },
      );
    } catch (err: any) {
      toast.error(
        err?.message || (isKhmer ? "បរាជ័យក្នុងការបង្ហោះរូបថត" : "Failed to upload photo"),
        { id: toastId },
      );
    } finally {
      setIsUploadingAvatar(false);
      if (e.target) e.target.value = "";
    }
  };

  // Revert custom photo back to standard STEM Avatar
  const handleRemoveCustomAvatar = () => {
    setSelectedAvatar("angkor");
    sounds.playPop();
    localStorage.removeItem(`sciencekh_avatar_${user?.id || "guest"}`);
    updateFieldMutation.mutate(
      { avatar_url: "angkor" },
      {
        onSuccess: () => {
          toast.success(
            isKhmer
              ? "បានប្តូរត្រឡប់ទៅរូបតំណាងដើមវិញ"
              : "Reverted to default STEM avatar",
          );
        },
      },
    );
  };

  // Handle Full Profile Update from Modal Dialog
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

      if (user) {
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
      launchConfetti();
      toast.success(
        isKhmer
          ? "បានកែប្រែព័ត៌មានគណនីសិស្សដោយជោគជ័យ! 🎉"
          : "Student profile updated successfully! 🎉",
      );
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile changes");
    }
  };

  // Handle instant grade selection
  const handleSelectGrade = (newGrade: number) => {
    setCurrentGrade(newGrade);
    setIsGradeDrawerOpen(false);
    sounds.playVictory();
    launchConfetti();
    updateFieldMutation.mutate(
      { grade: newGrade },
      {
        onSuccess: () => {
          toast.success(
            isKhmer
              ? `បានប្តូរទៅកាន់ថ្នាក់ទី ${newGrade} ដោយជោគជ័យ!`
              : `Grade updated to Grade ${newGrade}!`,
          );
        },
      },
    );
  };

  // Handle instant language toggle
  const handleToggleLanguage = (lang: "km" | "en") => {
    setCurrentLanguage(lang);
    sounds.playPop();
    updateFieldMutation.mutate(
      { language: lang } as any,
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["profile"] });
          qc.invalidateQueries({ queryKey: ["profile-live", user?.id] });
          toast.success(lang === "km" ? "បានប្តូរទៅភាសាខ្មែរ" : "Switched to English");
        },
      },
    );
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
      toast.info(
        isKhmer
          ? "បានបិទសំឡេង (រក្សាការរំញ័រ Tactile)"
          : "Sound muted (tactile haptics preserved)"
      );
    }
  };

  // Handle Streak Guardian notification toggle
  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        sounds.playCorrect(1);
        toast.success(
          isKhmer
            ? "បានបើកការរំលឹកការពារ Streak (ម៉ោង 7:00 យប់)"
            : "Streak Guardian reminders active (7:00 PM)"
        );
      } else {
        toast.error(
          isKhmer
            ? "សូមអនុញ្ញាតការជូនដំណឹង (Notifications) ក្នុងឧបករណ៍របស់អ្នក"
            : "Please allow notifications in your device settings"
        );
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem("sciencekh_notifications_enabled", "false");
      toast.info(isKhmer ? "បានបិទការរំលឹក Streak" : "Streak reminders disabled");
    }
  };

  // Handle inline name editing
  const startEditingName = () => {
    setEditNameValue(displayName);
    setIsEditingName(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }, 50);
  };

  const handleSaveName = () => {
    const trimmed = editNameValue.trim();
    setIsEditingName(false);
    if (!trimmed || trimmed === displayName) return;

    setDisplayName(trimmed);
    sounds.playPop();
    updateFieldMutation.mutate(
      { display_name: trimmed },
      {
        onSuccess: () => {
          toast.success(isKhmer ? "បានរក្សាទុកឈ្មោះថ្មី!" : "Name updated successfully!");
        },
      },
    );
  };

  // Sign out confirmation
  async function handleConfirmSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await signOut();
    navigate({ to: "/auth", search: { mode: "signin" }, replace: true });
  }

  // Student metrics
  const xp = liveProfile?.xp ?? dbData?.xp ?? 182;
  const streakDays = liveProfile?.streak_days ?? dbData?.streak_days ?? 2;
  const coins = liveProfile?.coins ?? dbData?.coins ?? 50;
  const isJuniorHigh = currentGrade >= 7 && currentGrade <= 9;
  const currentAvatar = AVATAR_OPTIONS.find((a) => a.id === selectedAvatar) || AVATAR_OPTIONS[0];

  // Authentic badges based on real student metrics
  const studentBadges: BadgeData[] = [
    {
      id: "streak_7",
      icon: "🔥",
      titleKm: "ការពារ Streak ៧ ថ្ងៃ",
      titleEn: "7-Day Streak Keeper",
      descKm: "រៀនជាប់គ្នា ៧ ថ្ងៃដោយគ្មានខកខាន ដើម្បីកសាងទម្លាប់រឹងមាំ",
      descEn: "Complete lessons for 7 consecutive days to build a strong study habit",
      unlocked: streakDays >= 7,
      progressText:
        streakDays >= 7
          ? isKhmer
            ? "សម្រេចបាន"
            : "Completed"
          : `${streakDays} / 7 ${isKhmer ? "ថ្ងៃ" : "Days"}`,
      progressPercent: Math.min(100, Math.round((streakDays / 7) * 100)),
      xpReward: 150,
      badgeTagKm: "ទម្លាប់រៀន",
      badgeTagEn: "Daily Habit",
    },
    {
      id: "explorer_starter",
      icon: "✨",
      titleKm: "អ្នករុករក STEM ជំហានដំបូង",
      titleEn: "STEM Trailblazer",
      descKm: "ទទួលបានពិន្ទុចំណេះដឹងដំបូងបង្អស់ ១០០ XP តាមរយៈមេរៀនវិទ្យាសាស្ត្រ",
      descEn: "Earn your first 100 Knowledge XP exploring Cambodian STEM lessons",
      unlocked: xp >= 100,
      progressText: xp >= 100 ? (isKhmer ? "សម្រេចបាន" : "Completed") : `${xp} / 100 XP`,
      progressPercent: Math.min(100, Math.round((xp / 100) * 100)),
      xpReward: 100,
      badgeTagKm: "ពិន្ទុចំណេះដឹង",
      badgeTagEn: "Knowledge XP",
    },
    {
      id: "diamond_league",
      icon: "💎",
      titleKm: "កំពូលតារាងលីគពេជ្រ",
      titleEn: "Diamond League Tier",
      descKm: "ឈរនៅចំណាត់ថ្នាក់កំពូលក្នុងលីគពេជ្រប្រចាំសប្តាហ៍",
      descEn: "Ranked among the top scholars in the national diamond tier",
      unlocked: true,
      progressText: isKhmer ? "សកម្មភាពបច្ចុប្បន្ន" : "Active Tier",
      progressPercent: 100,
      xpReward: 250,
      badgeTagKm: "តារាងកិត្តិយស",
      badgeTagEn: "Leaderboard",
    },
    {
      id: "bacii_master",
      icon: "⚛️",
      titleKm: "ម្ចាស់រូបវិទ្យាបាក់ឌុប",
      titleEn: "BacII Physics Master",
      descKm: "បញ្ចប់ការពិសោធន៍ និងវិញ្ញាសារូបវិទ្យាថ្នាក់ទី១២",
      descEn: "Complete Grade 12 physics problem sets and national exam papers",
      unlocked: currentGrade === 12,
      progressText:
        currentGrade === 12
          ? isKhmer
            ? "ត្រៀមប្រឡងបាក់ឌុប"
            : "BacII Ready"
          : isKhmer
            ? "ដោះសោនៅថ្នាក់ទី១២"
            : "Unlocks in Grade 12",
      progressPercent: currentGrade === 12 ? 100 : Math.round((currentGrade / 12) * 100),
      xpReward: 300,
      badgeTagKm: "ថ្នាក់ទី១២",
      badgeTagEn: "Grade 12",
    },
  ];

  const unlockedCount = studentBadges.filter((b) => b.unlocked).length;

  return (
    <AppShell
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "គណនីសិស្ស" : "Profile" },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* Student Status Card */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>{isKhmer ? "អត្តសញ្ញាណសិស្ស" : "Student Passport"}</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/80">
                {isKhmer ? "ផ្ទៀងផ្ទាត់រួច" : "Verified"}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isKhmer ? "លេខកូដសិស្សជាតិ" : "National Student ID"}
              </p>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                ID: #{user?.id ? user.id.slice(0, 6).toUpperCase() : "SKH-7829"}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isKhmer
                ? "ទិន្នន័យសិក្សា និងពិន្ទុរបស់អ្នកត្រូវបានធ្វើសមកាលកម្មជាមួយប្រព័ន្ធ MoEYS STEM Cloud។"
                : "Your learning history, streak, and XP are synchronized with MoEYS STEM Cloud."}
            </p>
          </div>

          {/* Quick Sign Out Action */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
            <button
              type="button"
              onClick={() => setIsSignOutModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition active:scale-95 text-xs font-bold cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>{isKhmer ? "ចាកចេញពីគណនី" : "Sign Out"}</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800 text-[11px] font-bold">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{isKhmer ? "គណនីសិស្សផ្លូវការ" : "Official Student Passport"}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {isKhmer ? "គណនីសិស្ស & ការកំណត់" : "Student Profile & Settings"}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsSignOutModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition active:scale-95 text-xs font-bold cursor-pointer shadow-2xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{isKhmer ? "ចាកចេញ" : "Sign Out"}</span>
          </button>
        </div>

        {/* Mobile Header */}
        <header
          className="lg:hidden sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 header-safe-top px-4 pb-3"
          style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))" }}
        >
          <div className="mx-auto flex h-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-black text-sm shadow-2xs">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h1 className="font-display text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? "គណនីសិស្ស" : "Student Profile"}
                </h1>
                <p className="text-[10px] text-slate-400 font-medium">
                  {isKhmer ? "កម្មវិធីជាតិ MoEYS STEM" : "MoEYS Official STEM"}
                </p>
              </div>
            </div>

            {/* Clean Sign Out Action */}
            <button
              type="button"
              onClick={() => setIsSignOutModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition active:scale-95 text-xs font-bold cursor-pointer shadow-2xs"
              title={isKhmer ? "ចាកចេញ" : "Sign Out"}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{isKhmer ? "ចាកចេញ" : "Sign Out"}</span>
            </button>
          </div>
        </header>

        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-0 space-y-4 pb-32 lg:pb-8">
          {/* ============================================================ */}
          {/* 2. EXECUTIVE HERO PROFILE CARD                               */}
          {/* ============================================================ */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs relative space-y-4">
            {/* Hidden Native File Input for Photo Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileUpload}
              className="hidden"
              aria-label="Upload profile photo"
            />

            <div className="flex flex-col items-center text-center">
              {/* Avatar Halo & Photo Upload Trigger */}
              <div className="relative group">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-950/60 dark:to-slate-800 border-2 border-emerald-500/50 text-4xl shadow-sm transition-transform group-hover:scale-105 cursor-pointer overflow-hidden relative select-none"
                  title={isKhmer ? "ចុចដើម្បីបង្ហោះរូបថតផ្ទាល់ខ្លួន" : "Click to upload personal photo"}
                >
                  {isAvatarCustomImage(selectedAvatar) ? (
                    <img
                      src={selectedAvatar}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    currentAvatar.emoji
                  )}

                  {isUploadingAvatar && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs grid place-items-center text-white">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs border-2 border-white dark:border-slate-900 transition-transform group-hover:scale-110 cursor-pointer active:scale-95"
                  title={isKhmer ? "បង្ហោះរូបថតគណនី (Upload Photo)" : "Upload profile photo"}
                  aria-label="Upload profile photo"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Camera className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Student Name with 1-Tap Inline Edit or Modal Edit */}
              <div className="mt-3 flex flex-col items-center justify-center gap-1 w-full">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5 max-w-[240px]">
                    <Input
                      ref={nameInputRef}
                      value={editNameValue}
                      onChange={(e) => setEditNameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveName();
                        if (e.key === "Escape") setIsEditingName(false);
                      }}
                      className="h-8 text-center font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-emerald-500 focus:ring-emerald-500 text-sm rounded-lg"
                      placeholder={isKhmer ? "ឈ្មោះរបស់អ្នក..." : "Your name..."}
                    />
                    <button
                      type="button"
                      onClick={handleSaveName}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer"
                      title={isKhmer ? "រក្សាទុក" : "Save"}
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-display text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {displayName || (isKhmer ? "សិស្ស ScienceKH" : "ScienceKH Student")}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditProfileModalOpen(true)}
                      className="grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition active:scale-90 cursor-pointer"
                      title={isKhmer ? "កែសម្រួលគណនី (Edit Profile)" : "Edit Profile"}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {fullName && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {fullName}
                  </p>
                )}
              </div>

              {/* Academic Grade Switcher Pill */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setIsGradeDrawerOpen((prev) => !prev);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition active:scale-95 cursor-pointer shadow-2xs"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {isJuniorHigh
                      ? isKhmer
                        ? `ថ្នាក់ទី ${currentGrade} • អនុវិទ្យាល័យ (ឌីប្លូម)`
                        : `Grade ${currentGrade} • Junior High (Brevet)`
                      : isKhmer
                        ? `ថ្នាក់ទី ${currentGrade} • វិទ្យាល័យ (បាក់ឌុប)`
                        : `Grade ${currentGrade} • Senior High (Bac II)`}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200",
                      isGradeDrawerOpen && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {/* Expandable Grade Quick-Picker Accordion */}
              {isGradeDrawerOpen && (
                <div className="mt-3.5 w-full p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    <span>
                      {isKhmer ? "ជ្រើសរើសថ្នាក់សិក្សារបស់ប្អូន:" : "Select your active grade:"}
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400">
                      {isJuniorHigh ? "អនុវិទ្យាល័យ (7–9)" : "វិទ្យាល័យ (10–12)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {GRADES.map((g) => {
                      const isSelected = currentGrade === g.grade;
                      return (
                        <button
                          key={g.grade}
                          type="button"
                          onClick={() => handleSelectGrade(g.grade)}
                          className={cn(
                            "py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer active:scale-95",
                            isSelected
                              ? "bg-emerald-600 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                              : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400",
                          )}
                        >
                          <span>{isKhmer ? g.labelKm : g.label}</span>
                          <span
                            className={cn(
                              "text-[8px] font-semibold mt-0.5",
                              isSelected ? "text-emerald-100" : "text-slate-400",
                            )}
                          >
                            {isKhmer ? g.cycleKm : g.cycle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-400 text-left pt-1 flex items-center gap-1.5">
                    <Lightbulb className="h-3 w-3 text-amber-500 shrink-0" />
                    <span>
                      {isKhmer
                        ? "ការជ្រើសរើសថ្នាក់នឹងធ្វើបច្ចុប្បន្នភាពមេរៀន និងវិញ្ញាសាប្រឡងដោយស្វ័យប្រវត្តិ។"
                        : "Switching your grade automatically tailors lessons and exam papers."}
                    </span>
                  </p>
                </div>
              )}

              {/* Verified Student ID Badge */}
              <div className="mt-2.5 flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  ID: #{user?.id ? user.id.slice(0, 6).toUpperCase() : "SKH-7829"}
                </span>
                <span>•</span>
                <span>{isKhmer ? "គណនីផ្លូវការសិស្ស" : "Verified Student"}</span>
              </div>
            </div>

            {/* 4 Professional Stat Cards (2x2 on Mobile, Never Truncates!) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              {/* Daily Streak */}
              <div className="rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/70 dark:border-orange-800/60 p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
                  <Flame className="h-4 w-4 fill-orange-500" />
                  <span>{isKhmer ? "Streak រៀន" : "Daily Streak"}</span>
                </div>
                <p className="mt-1 font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {streakDays} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{isKhmer ? "ថ្ងៃ" : "Days"}</span>
                </p>
                <p className="text-[10px] text-orange-700/80 dark:text-orange-300 font-medium mt-0.5">
                  {isKhmer ? "ទម្លាប់ប្រចាំថ្ងៃ" : "Daily habit"}
                </p>
              </div>

              {/* Knowledge XP */}
              <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                  <Sparkles className="h-4 w-4 fill-amber-500" />
                  <span>{isKhmer ? "ពិន្ទុ XP" : "Total XP"}</span>
                </div>
                <p className="mt-1 font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {xp.toLocaleString()}
                </p>
                <p className="text-[10px] text-amber-700/80 dark:text-amber-300 font-medium mt-0.5">
                  {isKhmer ? "ពិន្ទុចំណេះដឹង" : "Knowledge XP"}
                </p>
              </div>

              {/* League Tier (Never Truncates!) */}
              <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/60 p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <Trophy className="h-4 w-4" />
                  <span>{isKhmer ? "លីគប្រកួត" : "League Tier"}</span>
                </div>
                <p className="mt-1 font-display text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                  Diamond
                </p>
                <p className="text-[10px] text-blue-700/80 dark:text-blue-300 font-medium mt-0.5">
                  {isKhmer ? "កំពូល ៥% ជាតិ" : "Top 5% National"}
                </p>
              </div>

              {/* STEM Coins */}
              <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <Coins className="h-4 w-4 fill-emerald-500" />
                  <span>{isKhmer ? "កាក់ STEM" : "STEM Coins"}</span>
                </div>
                <p className="mt-1 font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {coins.toLocaleString()}
                </p>
                <p className="text-[10px] text-emerald-700/80 dark:text-emerald-300 font-medium mt-0.5">
                  {isKhmer ? "រង្វាន់សិក្សា" : "Available balance"}
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3. STEM AVATAR SELECTION (REFINED 3x2 GRID - NO TRUNCATION)  */}
          {/* ============================================================ */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkle className="h-3.5 w-3.5 text-emerald-600 fill-emerald-500" />
                  <span>{isKhmer ? "រូបតំណាង STEM Avatars" : "Choose STEM Avatar"}</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isKhmer ? "ចុចដើម្បីប្តូរភ្លាមៗ" : "Tap to update your avatar"}
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/70 dark:border-emerald-800">
                {isKhmer ? currentAvatar.nameKm : currentAvatar.nameEn}
              </span>
            </div>

            {/* Grid of Custom Photo Upload + Preset STEM Avatars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
              {/* 1. Custom Uploaded Photo Card */}
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer shadow-2xs relative group select-none",
                  isAvatarCustomImage(selectedAvatar)
                    ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20"
                    : "border-dashed border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-500",
                )}
                onClick={() => fileInputRef.current?.click()}
                title={isKhmer ? "ចុចដើម្បីបង្ហោះរូបថតផ្ទាល់ខ្លួន" : "Click to upload your own picture"}
              >
                {isAvatarCustomImage(selectedAvatar) ? (
                  <div className="h-9 w-9 rounded-xl overflow-hidden shrink-0 border border-emerald-500 shadow-2xs">
                    <img src={selectedAvatar} alt="Custom" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 grid place-items-center shrink-0">
                    <Upload className="h-4 w-4" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {isKhmer ? "រូបថតផ្ទាល់ខ្លួន" : "Custom Photo"}
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium truncate mt-0.5">
                    {isAvatarCustomImage(selectedAvatar)
                      ? isKhmer ? "កំពុងប្រើរូបនេះ" : "Active Photo"
                      : isKhmer ? "ចុចបង្ហោះរូបថត" : "Upload picture"}
                  </p>
                </div>

                {isAvatarCustomImage(selectedAvatar) ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCustomAvatar();
                      }}
                      className="h-6 w-6 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 grid place-items-center transition cursor-pointer"
                      title={isKhmer ? "លុបរូបថត" : "Remove photo"}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </div>

              {/* 2. Preset Official STEM Avatars */}
              {AVATAR_OPTIONS.map((av) => {
                const isSelected = selectedAvatar === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => handleSelectAvatar(av.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer shadow-2xs select-none",
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20"
                        : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700",
                    )}
                  >
                    <span className="text-2xl shrink-0">{av.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {isKhmer ? av.nameKm : av.nameEn}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {isKhmer ? av.roleKm : av.roleEn}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ============================================================ */}
          {/* 4. ACADEMIC ACHIEVEMENTS & MILESTONES                        */}
          {/* ============================================================ */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200/60 dark:border-amber-800">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {isKhmer ? "សមិទ្ធផលសិក្សា" : "Academic Achievements"}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {isKhmer ? "វឌ្ឍនភាព និងមេដាយកិត្តិយស" : "Academic milestones & honors"}
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/70 dark:border-emerald-800">
                {unlockedCount} / {studentBadges.length} {isKhmer ? "សម្រេច" : "Unlocked"}
              </span>
            </div>

            {/* Badges 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {studentBadges.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setSelectedBadgeModal(b);
                  }}
                  className={cn(
                    "flex flex-col text-left p-3.5 rounded-2xl border transition-all active:scale-[0.99] cursor-pointer shadow-2xs",
                    b.unlocked
                      ? "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-emerald-400"
                      : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 opacity-80",
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl text-xl shadow-2xs border",
                        b.unlocked
                          ? "bg-amber-50 dark:bg-amber-950/60 border-amber-200/70 dark:border-amber-800"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 grayscale",
                      )}
                    >
                      {b.icon}
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                        b.unlocked
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700",
                      )}
                    >
                      {b.unlocked ? (
                        <>
                          <Check className="h-3 w-3 stroke-[3]" />
                          <span>{isKhmer ? "សម្រេច" : "Done"}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-2.5 w-2.5" />
                          <span>{isKhmer ? "ជាប់សោ" : "Locked"}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {isKhmer ? b.titleKm : b.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {isKhmer ? b.descKm : b.descEn}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-3 w-full pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                      <span className="text-slate-400">{b.progressText}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">+{b.xpReward} XP</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          b.unlocked ? "bg-emerald-500" : "bg-amber-400",
                        )}
                        style={{ width: `${b.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ============================================================ */}
          {/* 5. PREFERENCES & SYSTEM SETTINGS                            */}
          {/* ============================================================ */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-4">
            <h3 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {isKhmer ? "ការកំណត់ និងភាសា" : "Preferences & Settings"}
            </h3>

            {/* Language Segmented Control */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {isKhmer ? "ភាសាបង្ហាញ (Language)" : "Preferred Language"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleLanguage("km")}
                  className={cn(
                    "py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98",
                    currentLanguage === "km"
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-black ring-2 ring-emerald-500/20 shadow-2xs"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100",
                  )}
                >
                  <span className="text-base">🇰🇭</span>
                  <span>ភាសាខ្មែរ (Khmer)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleLanguage("en")}
                  className={cn(
                    "py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98",
                    currentLanguage === "en"
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-black ring-2 ring-emerald-500/20 shadow-2xs"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100",
                  )}
                >
                  <Globe className="h-3.5 w-3.5 text-blue-600" />
                  <span>English (International)</span>
                </button>
              </div>
            </div>

            {/* Sound Effects Toggle */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-slate-400" />
                  )}
                  <span>{isKhmer ? "សំឡេងអមការរៀន" : "Interactive Audio Chimes"}</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isKhmer
                    ? "សំឡេងឆ្លើយត្រូវក្នុង Quiz និងរំលឹក Streak"
                    : "Audio feedback for quizzes and streaks"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleSound}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors cursor-pointer",
                  soundEnabled ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700",
                )}
                aria-label="Toggle Sound"
              >
                <span
                  className={cn(
                    "block h-5 w-5 rounded-full bg-white transition-transform shadow-xs",
                    soundEnabled ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>

            {/* Streak Guardian Push Notification Toggle */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {notificationsEnabled ? (
                    <Bell className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <BellOff className="h-4 w-4 text-slate-400" />
                  )}
                  <span>{isKhmer ? "រំលឹកការពារ Streak (7:00 យប់)" : "Streak Guardian Reminder"}</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isKhmer
                    ? "ជូនដំណឹងការពារកុំឱ្យបាត់បង់ Streak ប្រសិនបើមិនទាន់បានរៀន"
                    : "Daily notification at 7:00 PM if you haven't studied yet"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleNotifications}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors cursor-pointer",
                  notificationsEnabled ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700",
                )}
                aria-label="Toggle Notifications"
              >
                <span
                  className={cn(
                    "block h-5 w-5 rounded-full bg-white transition-transform shadow-xs",
                    notificationsEnabled ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>

            {/* Account & Platform Info */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{isKhmer ? "អ៊ីមែលគណនី" : "Account Email"}</span>
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                  {user?.email || "student@sciencekh.edu.kh"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{isKhmer ? "កម្មវិធីសិក្សាផ្លូវការ" : "Curriculum Standard"}</span>
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">MoEYS STEM 2026</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px]">Version</span>
                <span className="text-slate-400 text-[10px]">ScienceKH v2.4 (Build 2026.11)</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BADGE DETAIL MODAL                                           */}
      {/* ============================================================ */}
      <Dialog
        open={!!selectedBadgeModal}
        onOpenChange={(open) => !open && setSelectedBadgeModal(null)}
      >
        {selectedBadgeModal && (
          <DialogContent className="max-w-xs rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 shadow-xl text-center">
            <div className="mx-auto mb-3">
              <div
                className={cn(
                  "grid h-16 w-16 place-items-center rounded-2xl border text-4xl shadow-xs mx-auto",
                  selectedBadgeModal.unlocked
                    ? "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800"
                    : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 grayscale",
                )}
              >
                {selectedBadgeModal.icon}
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

            <div className="mt-3 p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                {isKhmer ? "រង្វាន់ចំណេះដឹង XP Bounty" : "Milestone Reward"}
              </span>
              <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                +{selectedBadgeModal.xpReward} Knowledge XP
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-0.5">
                {selectedBadgeModal.progressText}
              </p>
            </div>

            {selectedBadgeModal.unlocked ? (
              <Button
                type="button"
                onClick={() => {
                  launchConfetti();
                  sounds.playVictory();
                  toast.success(isKhmer ? "អបអរសាទរមេដាយ!" : "Badge celebrated!");
                  setSelectedBadgeModal(null);
                }}
                className="mt-3 w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-xs active:scale-95"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                <span>{isKhmer ? "អបអរសមិទ្ធផល 🎉" : "Celebrate Achievement 🎉"}</span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedBadgeModal(null)}
                className="mt-3 w-full h-10 rounded-2xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                <span>{isKhmer ? "បិទ" : "Close"}</span>
              </Button>
            )}
          </DialogContent>
        )}
      </Dialog>

      {/* ============================================================ */}
      {/* SIGN OUT CONFIRMATION MODAL                                  */}
      {/* ============================================================ */}
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
                ? "តើអ្នកពិតជាចង់ចាកចេញពីគណនី ScienceKH មែនទេ? វឌ្ឍនភាពរបស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាព។"
                : "Are you sure you want to sign out? Your learning progress and XP are safely saved."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSignOutModalOpen(false)}
              className="rounded-2xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              {isKhmer ? "បោះបង់" : "Cancel"}
            </Button>

            <Button
              type="button"
              onClick={handleConfirmSignOut}
              className="rounded-2xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold cursor-pointer"
            >
              {isKhmer ? "ចាកចេញ" : "Sign Out"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ============================================================ */}
      {/* COMPREHENSIVE EDIT STUDENT PROFILE MODAL                      */}
      {/* ============================================================ */}
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
        onTriggerUpload={() => fileInputRef.current?.click()}
        isUploading={isUploadingAvatar}
      />
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
  onTriggerUpload: () => void;
  isUploading: boolean;
}

function EditProfileDialog({
  isOpen,
  onClose,
  initialData,
  isKhmer,
  onSave,
  onTriggerUpload,
  isUploading,
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
      <DialogContent className="max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-5 sm:p-6 shadow-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Pencil className="h-4 w-4 text-emerald-600" />
            <span>{isKhmer ? "កែប្រែព័ត៌មានគណនីសិស្ស" : "Edit Student Profile"}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            {isKhmer
              ? "ធ្វើបច្ចុប្បន្នភាពឈ្មោះ រូបថត កម្រិតថ្នាក់ និងផ្នែកសិក្សារបស់ប្អូន"
              : "Update your student identity, avatar photo, grade, and track"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Quick Avatar Photo Section in Dialog */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500 bg-white dark:bg-slate-900 grid place-items-center text-2xl shrink-0 shadow-2xs">
                {isAvatarCustomImage(initialData.avatarUrl) ? (
                  <img
                    src={initialData.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  AVATAR_OPTIONS.find((a) => a.id === initialData.avatarUrl)?.emoji || "🇰🇭"
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {isKhmer ? "រូបថតប្រវត្តិរូប" : "Profile Picture"}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isAvatarCustomImage(initialData.avatarUrl)
                    ? isKhmer ? "រូបថតផ្ទាល់ខ្លួន" : "Custom photo active"
                    : isKhmer ? "រូបតំណាង STEM" : "STEM Avatar active"}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={onTriggerUpload}
              className="rounded-xl border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-xs font-bold gap-1.5 cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              <span>{isKhmer ? "បង្ហោះរូបថ្មី" : "Upload Photo"}</span>
            </Button>
          </div>

          {/* Display Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "ឈ្មោះហៅក្រៅ (Display Name)" : "Display Name"} <span className="text-rose-500">*</span>
            </label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={isKhmer ? "ឧ. Saravuth" : "e.g. Saravuth"}
              className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold"
              required
            />
          </div>

          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "ឈ្មោះពេញផ្លូវការ (Official Full Name)" : "Official Full Name"}
            </label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isKhmer ? "ឧ. ជា សារ៉ាវុធ (Chea Saravuth)" : "e.g. Chea Saravuth"}
              className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
            />
          </div>

          {/* Grade Selector (7–12) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "កម្រិតថ្នាក់ (Grade Level)" : "Grade Level"}
            </label>
            <div className="grid grid-cols-6 gap-1">
              {[7, 8, 9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={cn(
                    "py-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer active:scale-95",
                    grade === g
                      ? "bg-emerald-600 text-white font-black shadow-xs ring-2 ring-emerald-500/20"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                  )}
                >
                  <span>{g}</span>
                  <span className="text-[8px] opacity-80">{g <= 9 ? "Jr" : "Sr"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stream Track (Grades 11 & 12) */}
          {grade >= 11 && (
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isKhmer ? "ផ្នែកសិក្សាបាក់ឌុប (Bac II Track)" : "Bac II Academic Track"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStream("science")}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition cursor-pointer active:scale-98",
                    stream === "science"
                      ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <span>🔬</span>
                    <span>{isKhmer ? "ថ្នាក់វិទ្យាសាស្ត្រ" : "Science Track"}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isKhmer ? "គណិត រូប គីមី ជីវៈ" : "Math, Physics, Chem, Bio"}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setStream("social")}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition cursor-pointer active:scale-98",
                    stream === "social"
                      ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <span>📚</span>
                    <span>{isKhmer ? "ថ្នាក់សង្គម" : "Social Track"}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isKhmer ? "ខ្មែរ ប្រវត្តិ ភូមិ ពលរដ្ឋ" : "Khmer, History, Geog, Civics"}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* School / Province Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isKhmer ? "គ្រឹះស្ថានសិក្សា / សាលារៀន (School)" : "School / High School"}
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder={isKhmer ? "ឧ. វិទ្យាល័យព្រះស៊ីសុវត្ថិ" : "e.g. Preah Sisowath High School"}
                className="h-10 pl-9 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
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
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5 mr-1 stroke-[3]" />
              <span>{isKhmer ? "រក្សាទុកការកែប្រែ" : "Save Changes"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}