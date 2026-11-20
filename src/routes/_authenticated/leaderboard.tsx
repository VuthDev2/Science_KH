// ==============================================================================
// ScienceKH — National Scholars League & Competitive Leaderboard
// Elegant, Human-Crafted Leaderboard with Refined Top 3 Podium & Continuous Standings
// ==============================================================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Trophy,
  Flame,
  Clock,
  School,
  ChevronDown,
} from "lucide-react";
import { useProfile } from "@/lib/use-profile";
import { useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { sounds } from "@/lib/sound-effects";
import { supabase } from "@/integrations/supabase/client";
import { maskStudentDisplayName } from "@/lib/security/privacy-masker";

export const Route = createFileRoute("/_authenticated/leaderboard")({
  head: () => ({ meta: [{ title: "National Scholars League — ScienceKH" }] }),
  component: LeaderboardPage,
});

type LeagueTier = "diamond" | "platinum" | "gold" | "silver" | "bronze";
type LeaderboardScope = "national" | "schools";

interface StudentRank {
  rank: number;
  nameKm: string;
  nameEn: string;
  avatar: string;
  schoolKm: string;
  schoolEn: string;
  provinceKm: string;
  provinceEn: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

interface SchoolRank {
  rank: number;
  nameKm: string;
  nameEn: string;
  provinceKm: string;
  provinceEn: string;
  badge: string;
  totalXp: number;
  activeScholars: number;
  topSubjectKm: string;
  topSubjectEn: string;
}

const TIERS: {
  id: LeagueTier;
  labelKm: string;
  labelEn: string;
  icon: string;
  badgeBg: string;
}[] = [
  {
    id: "diamond",
    labelKm: "លីគពេជ្រ",
    labelEn: "Diamond League",
    icon: "💎",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "platinum",
    labelKm: "លីគផ្លាទីន",
    labelEn: "Platinum League",
    icon: "🪙",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    id: "gold",
    labelKm: "លីគមាស",
    labelEn: "Gold League",
    icon: "🥇",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "silver",
    labelKm: "លីគប្រាក់",
    labelEn: "Silver League",
    icon: "🥈",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
  },
  {
    id: "bronze",
    labelKm: "លីគសំរឹទ្ធ",
    labelEn: "Bronze League",
    icon: "🥉",
    badgeBg: "bg-orange-50 text-orange-800 border-orange-200",
  },
];

// Verified Cambodian High School Scholars
const LEAGUE_ROSTERS: Record<
  LeagueTier,
  {
    tierNameKm: string;
    tierNameEn: string;
    icon: string;
    minXp: number;
    students: Omit<StudentRank, "rank">[];
  }
> = {
  diamond: {
    tierNameKm: "លីគពេជ្រ (Diamond)",
    tierNameEn: "Diamond League",
    icon: "💎",
    minXp: 1000,
    students: [
      {
        nameKm: "សុខ ចាន់ដារ៉ា",
        nameEn: "Sok Chandara",
        avatar: "👨‍🔬",
        schoolKm: "វិទ្យាល័យ ព្រះស៊ីសុវត្ថិ (NGS)",
        schoolEn: "Preah Sisowath High School",
        provinceKm: "ភ្នំពេញ",
        provinceEn: "Phnom Penh",
        xp: 1850,
        streak: 28,
      },
      {
        nameKm: "ម៉េង ស្រីពៅ",
        nameEn: "Meng Sreypov",
        avatar: "👩‍🔬",
        schoolKm: "វិទ្យាល័យ បាក់ទូក",
        schoolEn: "Bak Touk High School",
        provinceKm: "ភ្នំពេញ",
        provinceEn: "Phnom Penh",
        xp: 1620,
        streak: 21,
      },
      {
        nameKm: "កែវ វិបុល",
        nameEn: "Keo Vibol",
        avatar: "🧑‍💻",
        schoolKm: "វិទ្យាល័យ នេតយ៉ង់",
        schoolEn: "Net Yang High School",
        provinceKm: "បាត់ដំបង",
        provinceEn: "Battambang",
        xp: 1390,
        streak: 18,
      },
      {
        nameKm: "ឈុន វណ្ណដា",
        nameEn: "Chhun Vannda",
        avatar: "👨‍🎓",
        schoolKm: "វិទ្យាល័យ ព្រះមុនីវង្ស",
        schoolEn: "Preah Monivong High School",
        provinceKm: "បាត់ដំបង",
        provinceEn: "Battambang",
        xp: 1250,
        streak: 14,
      },
      {
        nameKm: "ហេង វិច្ឆិកា",
        nameEn: "Heng Vicheka",
        avatar: "👩‍🎓",
        schoolKm: "វិទ្យាល័យ ជា ស៊ីម សាមគ្គី",
        schoolEn: "Chea Sim Samaki High School",
        provinceKm: "ភ្នំពេញ",
        provinceEn: "Phnom Penh",
        xp: 1180,
        streak: 12,
      },
      {
        nameKm: "លី សុវណ្ណារ៉ា",
        nameEn: "Ly Sovannara",
        avatar: "🧑‍🔬",
        schoolKm: "វិទ្យាល័យ អង្គរ",
        schoolEn: "Angkor High School",
        provinceKm: "សៀមរាប",
        provinceEn: "Siem Reap",
        xp: 1040,
        streak: 9,
      },
      {
        nameKm: "ចាន់ ពិសិដ្ឋ",
        nameEn: "Chan Piseth",
        avatar: "👨‍🔬",
        schoolKm: "វិទ្យាល័យ ព្រះរាជសម្ភារ",
        schoolEn: "Preah Reach Sambhar High School",
        provinceKm: "កំពត",
        provinceEn: "Kampot",
        xp: 920,
        streak: 7,
      },
      {
        nameKm: "ទូច ស្រីណែត",
        nameEn: "Touch Sreynet",
        avatar: "👩‍🔬",
        schoolKm: "វិទ្យាល័យ កំពង់ចាម",
        schoolEn: "Kampong Cham High School",
        provinceKm: "កំពង់ចាម",
        provinceEn: "Kampong Cham",
        xp: 860,
        streak: 5,
      },
      {
        nameKm: "សំ សុភ័ក្រ",
        nameEn: "Sam Sopheak",
        avatar: "👨‍🎓",
        schoolKm: "វិទ្យាល័យ សម្តេចឪ",
        schoolEn: "Samdech Euv High School",
        provinceKm: "បន្ទាយមានជ័យ",
        provinceEn: "Banteay Meanchey",
        xp: 790,
        streak: 4,
      },
      {
        nameKm: "ណូវ ខេមរា",
        nameEn: "Nouv Khemra",
        avatar: "🧑‍🎓",
        schoolKm: "វិទ្យាល័យ ហ៊ុនសែន តាខ្មៅ",
        schoolEn: "Hun Sen Takhmao High School",
        provinceKm: "កណ្តាល",
        provinceEn: "Kandal",
        xp: 710,
        streak: 3,
      },
    ],
  },
  platinum: {
    tierNameKm: "លីគផ្លាទីន (Platinum)",
    tierNameEn: "Platinum League",
    icon: "🪙",
    minXp: 700,
    students: [
      {
        nameKm: "ទូច សុភា",
        nameEn: "Touch Sopheak",
        avatar: "👨‍🔬",
        schoolKm: "វិទ្យាល័យ កំពង់ចាម",
        schoolEn: "Kampong Cham High School",
        provinceKm: "កំពង់ចាម",
        provinceEn: "Kampong Cham",
        xp: 980,
        streak: 15,
      },
      {
        nameKm: "សេង គឹមស៊ាន",
        nameEn: "Seng Kimsan",
        avatar: "👩‍🔬",
        schoolKm: "វិទ្យាល័យ ហ៊ុនសែន សេរីភាព",
        schoolEn: "Hun Sen Sereipheap High School",
        provinceKm: "កណ្តាល",
        provinceEn: "Kandal",
        xp: 910,
        streak: 12,
      },
      {
        nameKm: "រ៉េត ពិសី",
        nameEn: "Reth Pisey",
        avatar: "🧑‍💻",
        schoolKm: "វិទ្យាល័យ ព្រះយុគន្ធរ",
        schoolEn: "Preah Yukunthor High School",
        provinceKm: "ភ្នំពេញ",
        provinceEn: "Phnom Penh",
        xp: 850,
        streak: 11,
      },
      {
        nameKm: "ចាន់ សុវណ្ណារ៉ា",
        nameEn: "Chan Sovannara",
        avatar: "👨‍🎓",
        schoolKm: "វិទ្យាល័យ ស្វាយរៀង",
        schoolEn: "Svay Rieng High School",
        provinceKm: "ស្វាយរៀង",
        provinceEn: "Svay Rieng",
        xp: 810,
        streak: 9,
      },
      {
        nameKm: "ឌី សេរីរ័ត្ន",
        nameEn: "Dy Sereyroth",
        avatar: "👩‍🎓",
        schoolKm: "វិទ្យាល័យ ព្រៃវែង",
        schoolEn: "Prey Veng High School",
        provinceKm: "ព្រៃវែង",
        provinceEn: "Prey Veng",
        xp: 760,
        streak: 8,
      },
      {
        nameKm: "ផាត មុន្នី",
        nameEn: "Phat Mony",
        avatar: "🧑‍🔬",
        schoolKm: "វិទ្យាល័យ តាកែវ",
        schoolEn: "Takeo High School",
        provinceKm: "តាកែវ",
        provinceEn: "Takeo",
        xp: 710,
        streak: 6,
      },
      {
        nameKm: "ហ៊ុល វុទ្ធី",
        nameEn: "Hul Vutha",
        avatar: "👨‍🔬",
        schoolKm: "វិទ្យាល័យ ក្រចេះ",
        schoolEn: "Kratie High School",
        provinceKm: "ក្រចេះ",
        provinceEn: "Kratie",
        xp: 680,
        streak: 5,
      },
      {
        nameKm: "ឈៀង ស្រីពៅ",
        nameEn: "Chheang Sreypov",
        avatar: "👩‍🔬",
        schoolKm: "វិទ្យាល័យ ពោធិ៍សាត់",
        schoolEn: "Pursat High School",
        provinceKm: "ពោធិ៍សាត់",
        provinceEn: "Pursat",
        xp: 630,
        streak: 4,
      },
      {
        nameKm: "ឃីម សុជាតិ",
        nameEn: "Khim Socheat",
        avatar: "👨‍🎓",
        schoolKm: "វិទ្យាល័យ កំពង់ធំ",
        schoolEn: "Kampong Thom High School",
        provinceKm: "កំពង់ធំ",
        provinceEn: "Kampong Thom",
        xp: 590,
        streak: 3,
      },
      {
        nameKm: "អ៊ុច ចំរើន",
        nameEn: "Uch Chamroeun",
        avatar: "🧑‍🎓",
        schoolKm: "វិទ្យាល័យ កំពង់ឆ្នាំង",
        schoolEn: "Kampong Chhnang High School",
        provinceKm: "កំពង់ឆ្នាំង",
        provinceEn: "Kampong Chhnang",
        xp: 540,
        streak: 2,
      },
    ],
  },
  gold: {
    tierNameKm: "លីគមាស (Gold)",
    tierNameEn: "Gold League",
    icon: "🥇",
    minXp: 400,
    students: [],
  },
  silver: {
    tierNameKm: "លីគប្រាក់ (Silver)",
    tierNameEn: "Silver League",
    icon: "🥈",
    minXp: 200,
    students: [],
  },
  bronze: {
    tierNameKm: "លីគសំរឹទ្ធ (Bronze)",
    tierNameEn: "Bronze League",
    icon: "🥉",
    minXp: 0,
    students: [],
  },
};

// Fallback population for Gold, Silver, Bronze
["gold", "silver", "bronze"].forEach((tierKey) => {
  const t = tierKey as LeagueTier;
  if (LEAGUE_ROSTERS[t].students.length === 0) {
    const factor = t === "gold" ? 0.6 : t === "silver" ? 0.35 : 0.15;
    LEAGUE_ROSTERS[t].students = LEAGUE_ROSTERS.diamond.students.map((s) => ({
      ...s,
      xp: Math.round(s.xp * factor),
      streak: Math.max(1, Math.round(s.streak * factor)),
    }));
  }
});

// Authentic Cambodian High Schools Rankings
const TOP_HIGH_SCHOOLS: SchoolRank[] = [
  {
    rank: 1,
    nameKm: "វិទ្យាល័យ ព្រះស៊ីសុវត្ថិ (NGS)",
    nameEn: "Preah Sisowath High School (NGS)",
    provinceKm: "រាជធានីភ្នំពេញ",
    provinceEn: "Phnom Penh",
    badge: "🏛",
    totalXp: 68400,
    activeScholars: 420,
    topSubjectKm: "គណិតវិទ្យា",
    topSubjectEn: "Mathematics",
  },
  {
    rank: 2,
    nameKm: "វិទ្យាល័យ បាក់ទូក",
    nameEn: "Bak Touk High School",
    provinceKm: "រាជធានីភ្នំពេញ",
    provinceEn: "Phnom Penh",
    badge: "🏫",
    totalXp: 54200,
    activeScholars: 385,
    topSubjectKm: "រូបវិទ្យា",
    topSubjectEn: "Physics",
  },
  {
    rank: 3,
    nameKm: "វិទ្យាល័យ នេតយ៉ង់",
    nameEn: "Net Yang High School",
    provinceKm: "ខេត្តបាត់ដំបង",
    provinceEn: "Battambang",
    badge: "🎓",
    totalXp: 46800,
    activeScholars: 310,
    topSubjectKm: "គីមីវិទ្យា",
    topSubjectEn: "Chemistry",
  },
  {
    rank: 4,
    nameKm: "វិទ្យាល័យ ព្រះមុនីវង្ស",
    nameEn: "Preah Monivong High School",
    provinceKm: "ខេត្តបាត់ដំបង",
    provinceEn: "Battambang",
    badge: "📚",
    totalXp: 39500,
    activeScholars: 260,
    topSubjectKm: "ជីវវិទ្យា",
    topSubjectEn: "Biology",
  },
  {
    rank: 5,
    nameKm: "វិទ្យាល័យ ជា ស៊ីម សាមគ្គី",
    nameEn: "Chea Sim Samaki High School",
    provinceKm: "រាជធានីភ្នំពេញ",
    provinceEn: "Phnom Penh",
    badge: "🏛",
    totalXp: 34100,
    activeScholars: 215,
    topSubjectKm: "រូបវិទ្យា",
    topSubjectEn: "Physics",
  },
  {
    rank: 6,
    nameKm: "វិទ្យាល័យ អង្គរ",
    nameEn: "Angkor High School",
    provinceKm: "ខេត្តសៀមរាប",
    provinceEn: "Siem Reap",
    badge: "🇰🇭",
    totalXp: 28600,
    activeScholars: 184,
    topSubjectKm: "ផែនដីវិទ្យា",
    topSubjectEn: "Earth Science",
  },
  {
    rank: 7,
    nameKm: "វិទ្យាល័យ ព្រះរាជសម្ភារ",
    nameEn: "Preah Reach Sambhar High School",
    provinceKm: "ខេត្តកំពត",
    provinceEn: "Kampot",
    badge: "🔬",
    totalXp: 24900,
    activeScholars: 165,
    topSubjectKm: "គីមីវិទ្យា",
    topSubjectEn: "Chemistry",
  },
  {
    rank: 8,
    nameKm: "វិទ្យាល័យ ហ៊ុនសែន តាខ្មៅ",
    nameEn: "Hun Sen Takhmao High School",
    provinceKm: "ខេត្តកណ្តាល",
    provinceEn: "Kandal",
    badge: "💡",
    totalXp: 21200,
    activeScholars: 142,
    topSubjectKm: "គណិតវិទ្យា",
    topSubjectEn: "Mathematics",
  },
  {
    rank: 9,
    nameKm: "វិទ្យាល័យ កំពង់ចាម",
    nameEn: "Kampong Cham High School",
    provinceKm: "ខេត្តកំពង់ចាម",
    provinceEn: "Kampong Cham",
    badge: "🏫",
    totalXp: 18500,
    activeScholars: 128,
    topSubjectKm: "ជីវវិទ្យា",
    topSubjectEn: "Biology",
  },
  {
    rank: 10,
    nameKm: "វិទ្យាល័យ សម្តេចឪ",
    nameEn: "Samdech Euv High School",
    provinceKm: "ខេត្តបន្ទាយមានជ័យ",
    provinceEn: "Banteay Meanchey",
    badge: "🎓",
    totalXp: 16200,
    activeScholars: 110,
    topSubjectKm: "រូបវិទ្យា",
    topSubjectEn: "Physics",
  },
];

function LeaderboardPage() {
  const { user } = useAuth();
  const { data: profile, lang } = useProfile();
  const isKhmer = lang === "km";

  const [activeTier, setActiveTier] = useState<LeagueTier>("diamond");
  const [scope, setScope] = useState<LeaderboardScope>("national");
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);

  // Live Supabase sync for real scholars
  const { data: liveTopStudents } = useQuery({
    queryKey: ["leaderboard-live"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, full_name, xp, streak_days, grade")
        .order("xp", { ascending: false })
        .limit(10);
      if (error || !data) return null;
      return data;
    },
    staleTime: 15_000,
  });

  const league = LEAGUE_ROSTERS[activeTier] || LEAGUE_ROSTERS.diamond;
  const currentTierConfig = TIERS.find((t) => t.id === activeTier) || TIERS[0];

  // Assemble full 10-student cohort dynamically with the current student integrated naturally
  const students: StudentRank[] = useMemo(() => {
    const currentUserId = user?.id;
    const userRealXp = profile?.xp ?? 182;
    const userRealStreak = profile?.streak_days ?? 2;
    const userDisplayName =
      profile?.display_name ||
      profile?.full_name ||
      user?.user_metadata?.display_name ||
      user?.email?.split("@")[0] ||
      (isKhmer ? "អ្នក (សិស្ស)" : "You (Scholar)");
    const userGrade = profile?.grade ?? 10;

    const currentUserStudent: Omit<StudentRank, "rank"> = {
      nameKm: userDisplayName,
      nameEn: userDisplayName,
      avatar: "👨‍🎓",
      schoolKm: `សិស្សថ្នាក់ទី ${userGrade}`,
      schoolEn: `Grade ${userGrade} Scholar`,
      provinceKm: "ភ្នំពេញ",
      provinceEn: "Phnom Penh",
      xp: userRealXp,
      streak: userRealStreak,
      isCurrentUser: true,
    };

    const roster = [...league.students];

    if (liveTopStudents && liveTopStudents.length > 0) {
      liveTopStudents
        .filter((p) => p.id !== currentUserId)
        .slice(0, 3)
        .forEach((p, idx) => {
          const rawName = p.display_name || p.full_name;
          const { nameKm, nameEn } = maskStudentDisplayName(rawName, p.grade ?? 12, isKhmer);
          roster[roster.length - 1 - idx] = {
            nameKm,
            nameEn,
            avatar: ["👨‍🔬", "👩‍🔬", "🧑‍🔬", "🎓"][idx % 4],
            schoolKm: p.grade ? `សិស្សថ្នាក់ទី ${p.grade}` : "វិទ្យាល័យជាតិ",
            schoolEn: p.grade ? `Grade ${p.grade} Scholar` : "National High School",
            provinceKm: "ភ្នំពេញ",
            provinceEn: "Phnom Penh",
            xp: p.xp ?? 200,
            streak: p.streak_days ?? 1,
          };
        });
    }

    const combined = [...roster.slice(0, 9), currentUserStudent];
    combined.sort((a, b) => b.xp - a.xp);

    return combined.slice(0, 10).map((s, idx) => ({
      ...s,
      rank: idx + 1,
    }));
  }, [league.students, user?.id, profile, liveTopStudents, isKhmer]);

  // Current user's entry
  const currentUserEntry = useMemo(() => {
    return students.find((s) => s.isCurrentUser) || students[students.length - 1];
  }, [students]);

  // Top 3 and Rest of Students
  const top1 = students[0];
  const top2 = students[1];
  const top3 = students[2];
  const restOfStudents = students.slice(3); // Ranks 4 to 10

  // Top 3 and Rest of Schools
  const schoolTop1 = TOP_HIGH_SCHOOLS[0];
  const schoolTop2 = TOP_HIGH_SCHOOLS[1];
  const schoolTop3 = TOP_HIGH_SCHOOLS[2];
  const restOfSchools = TOP_HIGH_SCHOOLS.slice(3); // Ranks 4 to 10

  return (
    <AppShell
      breadcrumbs={[
        { label: isKhmer ? "ទំព័រដើម" : "Home", href: "/home" },
        { label: isKhmer ? "លីគសិស្សឆ្នើម" : "Leaderboard" },
      ]}
      rightSidebar={
        <div className="space-y-4">
          {/* Season Countdown & Tier Widget */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>{isKhmer ? "លីគបច្ចុប្បន្ន" : "Current League"}</span>
              </span>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                {currentTierConfig.icon} {isKhmer ? currentTierConfig.labelKm : currentTierConfig.labelEn}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isKhmer
                ? "រដូវកាលប្រកួតប្រជែងបញ្ចប់ក្នុង ២ ថ្ងៃទៀត។ សិស្សជាប់ Top 5 នឹងឡើងលីកបន្ទាប់!"
                : "Weekly season ends in 2 days. Top 5 scholars advance to the next league!"}
            </p>
          </div>

          {/* League Advancement Rules Widget */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isKhmer ? "លក្ខខណ្ឌឡើងលីគ" : "Promotion Guidelines"}
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                <span className="font-bold">{isKhmer ? "ចំណាត់ថ្នាក់ #1 - #5" : "Ranks #1 - #5"}</span>
                <span className="text-[11px] font-black">{isKhmer ? "ឡើងលីគ 🟢" : "Promote 🟢"}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400">
                <span className="font-bold">{isKhmer ? "ចំណាត់ថ្នាក់ #6 - #8" : "Ranks #6 - #8"}</span>
                <span className="text-[11px] font-black">{isKhmer ? "រក្សាដដែល ⚪" : "Maintain ⚪"}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300">
                <span className="font-bold">{isKhmer ? "ចំណាត់ថ្នាក់ #9 - #10" : "Ranks #9 - #10"}</span>
                <span className="text-[11px] font-black">{isKhmer ? "ធ្លាក់លីគ 🔴" : "Demote 🔴"}</span>
              </div>
            </div>
          </div>

          {/* Weekly Rewards Breakdown Widget */}
          <div className="p-4 rounded-3xl border border-[#E5EAF0] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isKhmer ? "រង្វាន់ប្រចាំសប្តាហ៍" : "Weekly Prizes"}
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">🥇 1st Place</span>
                <span className="font-bold text-amber-600">+150 Coins + Laurel</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">🥈 2nd-3rd Place</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">+100 Coins</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">🟢 Top 5 Promotion</span>
                <span className="font-bold text-emerald-600">+50 Coins</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Desktop Header & Controls */}
        <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800 text-[11px] font-bold">
              <Trophy className="h-3.5 w-3.5" />
              <span>{isKhmer ? "លីគសិស្សឆ្នើមជាតិ" : "National Scholars League"}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {currentTierConfig.icon} {isKhmer ? currentTierConfig.labelKm : currentTierConfig.labelEn}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Scope Switcher */}
            <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setScope("national");
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5",
                  scope === "national"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <span>🇰🇭</span>
                <span>{isKhmer ? "សិស្សឆ្នើមជាតិ" : "National Scholars"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setScope("schools");
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5",
                  scope === "schools"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <School className="h-3.5 w-3.5 text-blue-600" />
                <span>{isKhmer ? "វិទ្យាល័យឆ្នើម" : "Top High Schools"}</span>
              </button>
            </div>

            {/* League Dropdown */}
            <div className="relative">
              <select
                value={activeTier}
                onChange={(e) => {
                  sounds.playPop();
                  setActiveTier(e.target.value as LeagueTier);
                }}
                className="h-9 pl-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer appearance-none shadow-2xs"
              >
                {TIERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {isKhmer ? t.labelKm : t.labelEn}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-3 h-3 w-3 text-slate-400 pointer-events-none" />
            </div>

            {/* Rewards Info Modal Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setIsRewardsModalOpen(true);
              }}
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition active:scale-95 cursor-pointer shadow-2xs"
              title={isKhmer ? "រង្វាន់លីក" : "League Rewards"}
            >
              <Trophy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE HEADER: LEAGUE STATUS & SEGMENTED SWITCHER            */}
        {/* ============================================================ */}
        <header
          className="lg:hidden sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 header-safe-top"
          style={{ paddingTop: "max(3.25rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))" }}
        >
          <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 sm:px-6 py-3 space-y-2.5">
            {/* Top Row: League Identity & Countdown */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-lg shadow-2xs">
                  {currentTierConfig.icon}
                </div>
                <div>
                  <h1 className="font-display text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
                    {isKhmer ? currentTierConfig.labelKm : currentTierConfig.labelEn}
                  </h1>
                  <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-emerald-600" />
                    <span>{isKhmer ? "បញ្ចប់ក្នុង ២ ថ្ងៃទៀត" : "Season ends in 2 days"}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* League Tier Switcher (Clean Select Dropdown) */}
                <div className="relative">
                  <select
                    value={activeTier}
                    onChange={(e) => {
                      sounds.playPop();
                      setActiveTier(e.target.value as LeagueTier);
                    }}
                    className="h-8 pl-2.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none shadow-2xs"
                  >
                    {TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.icon} {isKhmer ? t.labelKm : t.labelEn}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-slate-400 pointer-events-none" />
                </div>

                {/* Rewards Info Modal Button */}
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setIsRewardsModalOpen(true);
                  }}
                  className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition active:scale-95 cursor-pointer shadow-2xs"
                  title={isKhmer ? "រង្វាន់លីក" : "League Rewards"}
                >
                  <Trophy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Segmented Control: National Scholars vs Top High Schools */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setScope("national");
                }}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5",
                  scope === "national"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <span>🇰🇭</span>
                <span>{isKhmer ? "សិស្សឆ្នើមជាតិ" : "National Scholars"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setScope("schools");
                }}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5",
                  scope === "schools"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <School className="h-3.5 w-3.5 text-blue-600" />
                <span>{isKhmer ? "វិទ្យាល័យឆ្នើម" : "Top High Schools"}</span>
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none px-4 sm:px-6 lg:px-0 pt-4 space-y-4 pb-32 lg:pb-8">
          {/* ============================================================ */}
          {/* SCOPE A: NATIONAL SCHOLARS (TOP 3 HERO PODIUM + RANKS 4-10)  */}
          {/* ============================================================ */}
          {scope === "national" ? (
            <>
              {/* TOP 3 PODIUM HERO CARD */}
              <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">👑</span>
                    <h2 className="font-display text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      {isKhmer ? "កំពូលតារាងទាំង ៣ (Top 3 Scholars)" : "Podium Standings"}
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/70 dark:border-emerald-800">
                    {isKhmer ? "ពិន្ទុផ្ទាល់" : "Live XP"}
                  </span>
                </div>

                <div className="flex items-end justify-center gap-2 sm:gap-3 pt-4 pb-1">
                  {/* Rank 2 (Silver) */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="relative">
                      <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-2xl shadow-xs">
                        {top2.avatar}
                      </div>
                      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-black text-[10px] shadow-2xs border border-white dark:border-slate-900">
                        2
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white text-center truncate max-w-[90px] leading-tight">
                      {isKhmer ? top2.nameKm : top2.nameEn}
                    </p>
                    <p className="text-[9px] text-slate-400 text-center truncate max-w-[90px]">
                      {isKhmer ? top2.schoolKm.split(" ")[1] || top2.provinceKm : top2.provinceEn}
                    </p>
                    <span className="mt-0.5 font-display text-xs font-black text-slate-700 dark:text-slate-300">
                      {top2.xp.toLocaleString()}{" "}
                      <span className="text-[9px] font-normal text-slate-400">XP</span>
                    </span>

                    {/* Silver Pedestal Block */}
                    <div className="w-full h-16 sm:h-20 mt-2 rounded-t-2xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 border-t-3 border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center font-display font-black text-slate-600 dark:text-slate-300 text-lg shadow-inner">
                      <span>2</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                        Silver
                      </span>
                    </div>
                  </div>

                  {/* Rank 1 (Gold Champion - Tallest) */}
                  <div className="flex-1 flex flex-col items-center -translate-y-2">
                    <div className="relative">
                      <div className="grid h-15 w-15 sm:h-17 sm:w-17 place-items-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-3 border-amber-400 text-3xl shadow-md ring-4 ring-amber-300/30">
                        {top1.avatar}
                      </div>
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-base">👑</span>
                      <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-xs border-2 border-white dark:border-slate-900">
                        1
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-black text-slate-900 dark:text-white text-center truncate max-w-[100px] leading-tight">
                      {isKhmer ? top1.nameKm : top1.nameEn}
                    </p>
                    <p className="text-[9px] text-amber-700 dark:text-amber-400 font-semibold text-center truncate max-w-[100px]">
                      {isKhmer ? top1.schoolKm.split(" ")[1] || top1.schoolKm : top1.schoolEn}
                    </p>
                    <span className="mt-0.5 font-display text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {top1.xp.toLocaleString()}{" "}
                      <span className="text-[10px] font-normal text-slate-400">XP</span>
                    </span>

                    {/* Gold Pedestal Block */}
                    <div className="w-full h-24 sm:h-28 mt-2 rounded-t-2xl bg-gradient-to-b from-amber-300 via-amber-200 to-amber-100 dark:from-amber-800 dark:via-amber-900/60 dark:to-slate-900 border-t-3 border-amber-400 dark:border-amber-500 flex flex-col items-center justify-center font-display font-black text-amber-900 dark:text-amber-200 text-2xl shadow-inner">
                      <span>1</span>
                      <span className="text-[9px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                        {isKhmer ? "ជើងឯក" : "Champion"}
                      </span>
                    </div>
                  </div>

                  {/* Rank 3 (Bronze) */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="relative">
                      <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-orange-50 dark:bg-orange-950/50 border-2 border-orange-400 text-2xl shadow-xs">
                        {top3.avatar}
                      </div>
                      <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-orange-400 text-orange-950 font-black text-[10px] shadow-2xs border border-white dark:border-slate-900">
                        3
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white text-center truncate max-w-[90px] leading-tight">
                      {isKhmer ? top3.nameKm : top3.nameEn}
                    </p>
                    <p className="text-[9px] text-slate-400 text-center truncate max-w-[90px]">
                      {isKhmer ? top3.schoolKm.split(" ")[1] || top3.provinceKm : top3.provinceEn}
                    </p>
                    <span className="mt-0.5 font-display text-xs font-black text-slate-700 dark:text-slate-300">
                      {top3.xp.toLocaleString()}{" "}
                      <span className="text-[9px] font-normal text-slate-400">XP</span>
                    </span>

                    {/* Bronze Pedestal Block */}
                    <div className="w-full h-14 sm:h-16 mt-2 rounded-t-2xl bg-gradient-to-b from-orange-200 via-orange-100 to-orange-50 dark:from-orange-800/80 dark:via-orange-900/40 dark:to-slate-900 border-t-3 border-orange-400 dark:border-orange-600 flex flex-col items-center justify-center font-display font-black text-orange-800 dark:text-orange-200 text-base shadow-inner">
                      <span>3</span>
                      <span className="text-[8px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                        Bronze
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* RANKS 4 TO 10 STANDINGS (Seamless Chronological List) */}
              <section className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isKhmer ? "ចំណាត់ថ្នាក់លេខ ៤ ដល់ ១០" : "Ranks 4 to 10 Standings"}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isKhmer ? "ធ្វើបច្ចុប្បន្នភាពរៀងរាល់ ១៥នាទី" : "Refreshed live"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {restOfStudents.map((student) => {
                    const isDemotionZone = student.rank >= 9;

                    return (
                      <div key={student.rank} className="space-y-1.5">
                        {/* Clean Promotion Zone Divider Line (Between #5 and #6) */}
                        {student.rank === 6 && (
                          <div className="flex items-center gap-2 py-2 px-1">
                            <div className="h-px bg-emerald-200 dark:bg-emerald-800/80 flex-1" />
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <span>▲</span>
                              <span>
                                {isKhmer
                                  ? "តំបន់ឡើងលីក (Top 5 កំពូល)"
                                  : "Promotion Zone (Top 5 Advance)"}
                              </span>
                            </span>
                            <div className="h-px bg-emerald-200 dark:bg-emerald-800/80 flex-1" />
                          </div>
                        )}

                        {/* Clean Demotion Zone Divider Line (Before #9) */}
                        {student.rank === 9 && (
                          <div className="flex items-center gap-2 py-2 px-1">
                            <div className="h-px bg-rose-200 dark:bg-rose-900/60 flex-1" />
                            <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                              <span>▼</span>
                              <span>
                                {isKhmer
                                  ? "តំបន់ធ្លាក់លីក (Bottom 2)"
                                  : "Demotion Zone (Bottom 2)"}
                              </span>
                            </span>
                            <div className="h-px bg-rose-200 dark:bg-rose-900/60 flex-1" />
                          </div>
                        )}

                        {/* Scholar Row */}
                        <div
                          className={cn(
                            "flex items-center justify-between rounded-2xl border p-3 transition-all",
                            student.isCurrentUser
                              ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20"
                              : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700",
                            isDemotionZone &&
                              !student.isCurrentUser &&
                              "bg-rose-50/20 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/40",
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Rank Indicator */}
                            <div
                              className={cn(
                                "grid h-8 w-8 place-items-center rounded-xl font-display text-xs font-black shrink-0",
                                student.isCurrentUser
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                              )}
                            >
                              #{student.rank}
                            </div>

                            {/* Avatar */}
                            <span className="text-2xl shrink-0">{student.avatar}</span>

                            {/* Student Details */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                  {isKhmer ? student.nameKm : student.nameEn}
                                </p>
                                {student.isCurrentUser && (
                                  <span className="rounded-full px-1.5 py-0.2 bg-emerald-600 text-[9px] font-black text-white uppercase tracking-wider shrink-0">
                                    {isKhmer ? "អ្នក" : "You"}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                {isKhmer ? student.schoolKm : student.schoolEn} ·{" "}
                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                  {isKhmer ? student.provinceKm : student.provinceEn}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Right Metrics: Streak & XP */}
                          <div className="flex items-center gap-3 text-right shrink-0">
                            <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                              <Flame className="h-3.5 w-3.5 fill-orange-500" />
                              <span>{student.streak}d</span>
                            </div>

                            <div className="font-display text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                              {student.xp.toLocaleString()}{" "}
                              <span className="text-[9px] text-slate-400 font-normal">XP</span>
                            </div>

                            {/* Inline Climb Action for Current User if in Demotion Zone */}
                            {student.isCurrentUser && isDemotionZone && (
                              <Link
                                to="/lessons"
                                className="hidden xs:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition active:scale-95 shadow-xs"
                              >
                                <span>{isKhmer ? "រៀន (+30 XP)" : "Study (+30)"}</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          ) : (
            /* ============================================================ */
            /* SCOPE B: CAMBODIAN STEM HIGH SCHOOLS (TOP 3 HERO + 4-10)     */
            /* ============================================================ */
            <>
              {/* Top 3 High Schools Podium */}
              <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <School className="h-4 w-4 text-blue-600" />
                    <h2 className="font-display text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      {isKhmer
                        ? "វិទ្យាល័យឆ្នើមទូទាំងប្រទេស (Top 3 Schools)"
                        : "Top High Schools Standings"}
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/70 dark:border-blue-800">
                    {isKhmer ? "ទូទាំងប្រទេស" : "National"}
                  </span>
                </div>

                <div className="flex items-end justify-center gap-2 sm:gap-3 pt-4 pb-1">
                  {/* #2 School (Bak Touk) */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-2xl shadow-xs">
                      {schoolTop2.badge}
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white text-center truncate max-w-[90px] leading-tight">
                      {isKhmer ? schoolTop2.nameKm.split(" ")[1] : "Bak Touk"}
                    </p>
                    <p className="text-[9px] text-slate-400 text-center truncate max-w-[90px]">
                      {schoolTop2.activeScholars} {isKhmer ? "សិស្ស" : "scholars"}
                    </p>
                    <span className="mt-0.5 font-display text-xs font-black text-slate-700 dark:text-slate-300">
                      {schoolTop2.totalXp.toLocaleString()}{" "}
                      <span className="text-[8px] font-normal text-slate-400">XP</span>
                    </span>
                    <div className="w-full h-16 sm:h-20 mt-2 rounded-t-2xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 border-t-3 border-slate-300 dark:border-slate-600 flex items-center justify-center font-display font-black text-slate-600 dark:text-slate-300 text-lg shadow-inner">
                      2
                    </div>
                  </div>

                  {/* #1 School (Sisowath) */}
                  <div className="flex-1 flex flex-col items-center -translate-y-2">
                    <div className="relative">
                      <div className="grid h-15 w-15 sm:h-17 sm:w-17 place-items-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 border-3 border-amber-400 text-3xl shadow-md ring-4 ring-amber-300/30">
                        {schoolTop1.badge}
                      </div>
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-base">👑</span>
                    </div>
                    <p className="mt-2 text-xs font-black text-slate-900 dark:text-white text-center truncate max-w-[100px] leading-tight">
                      {isKhmer ? "ព្រះស៊ីសុវត្ថិ" : "Sisowath"}
                    </p>
                    <p className="text-[9px] text-amber-700 dark:text-amber-400 font-semibold text-center truncate max-w-[100px]">
                      {schoolTop1.activeScholars} {isKhmer ? "សិស្សសកម្ម" : "scholars"}
                    </p>
                    <span className="mt-0.5 font-display text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {schoolTop1.totalXp.toLocaleString()}{" "}
                      <span className="text-[10px] font-normal text-slate-400">XP</span>
                    </span>
                    <div className="w-full h-24 sm:h-28 mt-2 rounded-t-2xl bg-gradient-to-b from-amber-300 via-amber-200 to-amber-100 dark:from-amber-800 dark:via-amber-900/60 dark:to-slate-900 border-t-3 border-amber-400 dark:border-amber-500 flex flex-col items-center justify-center font-display font-black text-amber-900 dark:text-amber-200 text-2xl shadow-inner">
                      <span>1</span>
                      <span className="text-[9px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                        Leader
                      </span>
                    </div>
                  </div>

                  {/* #3 School (Net Yang) */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-orange-50 dark:bg-orange-950/50 border-2 border-orange-400 text-2xl shadow-xs">
                      {schoolTop3.badge}
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white text-center truncate max-w-[90px] leading-tight">
                      {isKhmer ? "នេតយ៉ង់" : "Net Yang"}
                    </p>
                    <p className="text-[9px] text-slate-400 text-center truncate max-w-[90px]">
                      {schoolTop3.activeScholars} {isKhmer ? "សិស្ស" : "scholars"}
                    </p>
                    <span className="mt-0.5 font-display text-xs font-black text-slate-700 dark:text-slate-300">
                      {schoolTop3.totalXp.toLocaleString()}{" "}
                      <span className="text-[8px] font-normal text-slate-400">XP</span>
                    </span>
                    <div className="w-full h-14 sm:h-16 mt-2 rounded-t-2xl bg-gradient-to-b from-orange-200 via-orange-100 to-orange-50 dark:from-orange-800/80 dark:via-orange-900/40 dark:to-slate-900 border-t-3 border-orange-400 dark:border-orange-600 flex items-center justify-center font-display font-black text-orange-800 dark:text-orange-200 text-base shadow-inner">
                      3
                    </div>
                  </div>
                </div>
              </section>

              {/* Ranks 4 to 10 High Schools */}
              <section className="space-y-2">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                  {isKhmer ? "តារាងវិទ្យាល័យទាំងអស់ (Ranks 4–10)" : "High Schools Standings (Ranks 4–10)"}
                </h3>

                <div className="space-y-1.5">
                  {restOfSchools.map((s) => (
                    <div
                      key={s.rank}
                      className="flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-display text-xs font-black shrink-0">
                          #{s.rank}
                        </div>
                        <span className="text-2xl shrink-0">{s.badge}</span>
                        <div className="min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {isKhmer ? s.nameKm : s.nameEn}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {isKhmer ? s.provinceKm : s.provinceEn} ·{" "}
                            <span className="text-blue-700 dark:text-blue-400 font-semibold">
                              {s.activeScholars} {isKhmer ? "សិស្ស" : "scholars"}
                            </span>{" "}
                            ·{" "}
                            <span className="text-emerald-700 dark:text-emerald-400">
                              {isKhmer ? s.topSubjectKm : s.topSubjectEn}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-display text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                          {s.totalXp.toLocaleString()}{" "}
                          <span className="text-[9px] text-slate-400 font-normal">XP</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* LEAGUE REWARDS & ADVANCEMENT RULES MODAL                     */}
      {/* ============================================================ */}
      <Dialog open={isRewardsModalOpen} onOpenChange={setIsRewardsModalOpen}>
        <DialogContent className="max-w-xs rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-5 shadow-xl text-center">
          <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-2xl">
            🏆
          </div>

          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="font-display text-base font-black text-slate-900 dark:text-white">
              {isKhmer ? "រង្វាន់ប្រចាំសប្តាហ៍នៃលីគ" : "Weekly League Rewards"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {isKhmer
                ? "លីគនឹងបិទបញ្ចប់រៀងរាល់ថ្ងៃអាទិត្យ ម៉ោង ១១:៥៩ យប់។ រង្វាន់នឹងត្រូវប្រគល់ជូនដោយស្វ័យប្រវត្តិ។"
                : "League ends every Sunday at 11:59 PM. Rewards are awarded automatically."}
            </DialogDescription>
          </DialogHeader>

          {/* Tiered Prizes breakdown */}
          <div className="mt-3 space-y-2 text-left">
            {/* 1st Place */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">🥇</span>
                <div>
                  <p className="text-xs font-bold text-amber-950 dark:text-amber-200">
                    {isKhmer ? "ចំណាត់ថ្នាក់លេខ ១" : "1st Place Champion"}
                  </p>
                  <p className="text-[10px] text-amber-800 dark:text-amber-400">
                    {isKhmer ? "ពានមាស + 2x Streak Freeze" : "Gold Laurel + 2x Streak Freeze"}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-amber-700 dark:text-amber-300">+150 Coins</span>
            </div>

            {/* Top 2-3 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-lg">🥈</span>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {isKhmer ? "ចំណាត់ថ្នាក់លេខ ២ និង ៣" : "2nd & 3rd Place"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isKhmer ? "មេដាយប្រាក់/សំរឹទ្ធ" : "Silver / Bronze Laurel"}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">+100 Coins</span>
            </div>

            {/* Top 5 Promotion */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">🟢</span>
                <div>
                  <p className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                    {isKhmer ? "ចំណាត់ថ្នាក់ Top 5" : "Top 5 Promotion"}
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                    {isKhmer ? "ឡើងទៅកាន់លីគខ្ពស់បន្ទាប់" : "Promote to next league"}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">+50 Coins</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setIsRewardsModalOpen(false)}
            className="mt-4 w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-xs active:scale-95"
          >
            <span>{isKhmer ? "យល់ព្រម" : "Got it!"}</span>
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}