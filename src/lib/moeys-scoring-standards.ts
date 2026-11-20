// ==============================================================================
// ScienceKH — Official MoEYS Cambodia Examination Scoring Standards
// Rigorous, Verified Historical & Recent Examination Metadata Reference
// Rules Stored By Examination Year and Category
// ==============================================================================

import type { ExamCategory, ExamStream, ExamSubject } from "@/types/exam";

export interface SubjectScoringSpec {
  subject: ExamSubject;
  nameKm: string;
  nameEn: string;
  durationMinutes: number;
  maximumMarks: number;
  isCompulsory: boolean;
  notesKm?: string;
}

export interface ExamScoringStandard {
  id: string;
  category: ExamCategory;
  yearRange: { start: number; end: number };
  frameworkNameKm: string;
  frameworkNameEn: string;
  officialSource: string;
  compulsoryMaxMarks: number;
  foreignLanguageMaxMarks: number;
  foreignLanguageBonusThreshold: number;
  foreignLanguageMaxBonus: number;
  totalAdjustedMaxMarks: number;
  passingScoreThreshold: number;
  streams: {
    science?: {
      subjects: SubjectScoringSpec[];
    };
    social?: {
      subjects: SubjectScoringSpec[];
    };
  };
  gradeThresholds: {
    grade: "A" | "B" | "C" | "D" | "E" | "F";
    labelKm: string;
    labelEn: string;
    minScore: number;
    maxScore: number;
    percentage: string;
    color: string;
  }[];
  explanationKm: string[];
}

// ==============================================================================
// 1. RECENT GRADE 12 BAC II EXAMINATION STANDARD (POST-2014 REFORM: 2014–2024)
// Verified MoEYS National Examination Framework
// ==============================================================================
export const BACII_POST2014_STANDARD: ExamScoringStandard = {
  id: "bacii_post2014_standard",
  category: "bacii",
  yearRange: { start: 2014, end: 2024 },
  frameworkNameKm: "ស្តង់ដារប្រឡងបាក់ឌុបថ្នាក់ជាតិ (កំណែទម្រង់ ២០១៤–២០២៤)",
  frameworkNameEn: "MoEYS National Bac II Post-2014 Reform Standard",
  officialSource: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS Cambodia)",
  compulsoryMaxMarks: 475,
  foreignLanguageMaxMarks: 50,
  foreignLanguageBonusThreshold: 25,
  foreignLanguageMaxBonus: 25,
  totalAdjustedMaxMarks: 500,
  passingScoreThreshold: 237, // Grade E minimum
  streams: {
    science: {
      subjects: [
        {
          subject: "mathematics",
          nameKm: "គណិតវិទ្យា",
          nameEn: "Mathematics",
          durationMinutes: 150,
          maximumMarks: 125,
          isCompulsory: true,
          notesKm: "វិញ្ញាសាស្នូលកម្រិតខ្ពស់ ៥ លំហាត់ធំ",
        },
        {
          subject: "physics",
          nameKm: "រូបវិទ្យា",
          nameEn: "Physics",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "ទ្រឹស្តី និងលំហាត់អនុវត្ត",
        },
        {
          subject: "chemistry",
          nameKm: "គីមីវិទ្យា",
          nameEn: "Chemistry",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "គីមីអសរីរាង្គ និងសរីរាង្គ",
        },
        {
          subject: "biology",
          nameKm: "ជីវវិទ្យា",
          nameEn: "Biology",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "ពន្ធុវិទ្យា កោសិកា និងប្រព័ន្ធជីវសាស្ត្រ",
        },
        {
          subject: "khmer",
          nameKm: "អក្សរសាស្ត្រខ្មែរ",
          nameEn: "Khmer Literature",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "តែងសេចក្តី និងវិចារណកថា",
        },
        {
          subject: "history",
          nameKm: "ប្រវត្តិវិទ្យា",
          nameEn: "History",
          durationMinutes: 60,
          maximumMarks: 50,
          isCompulsory: true,
          notesKm: "ប្រវត្តិសាស្ត្រកម្ពុជា និងសកលលោក",
        },
        {
          subject: "english",
          nameKm: "ភាសាបរទេស (អង់គ្លេស/បារាំង)",
          nameEn: "Foreign Language (English/French)",
          durationMinutes: 60,
          maximumMarks: 50,
          isCompulsory: false,
          notesKm:
            "មុខវិជ្ជាស្ម័គ្រចិត្ត • គិតតែពិន្ទុដែលលើសពី ២៥ ប៉ុណ្ណោះ (អតិបរមា ២៥ ពិន្ទុបន្ថែម)",
        },
      ],
    },
    social: {
      subjects: [
        {
          subject: "khmer",
          nameKm: "អក្សរសាស្ត្រខ្មែរ",
          nameEn: "Khmer Literature",
          durationMinutes: 150,
          maximumMarks: 125,
          isCompulsory: true,
          notesKm: "វិញ្ញាសាស្នូលកម្រិតខ្ពស់ តែងសេចក្តីពិស្ដារ",
        },
        {
          subject: "history",
          nameKm: "ប្រវត្តិវិទ្យា",
          nameEn: "History",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "ប្រវត្តិវិទ្យាសង្គម និងនយោបាយ",
        },
        {
          subject: "geography",
          nameKm: "ភូមិវិទ្យា",
          nameEn: "Geography",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "ភូមិសាស្ត្រសេដ្ឋកិច្ច និងប្រជាសាស្ត្រ",
        },
        {
          subject: "moral_civics",
          nameKm: "សីលធម៌-ពលរដ្ឋវិជ្ជា",
          nameEn: "Moral-Civics",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "សីលធម៌ និងច្បាប់សង្គម",
        },
        {
          subject: "mathematics",
          nameKm: "គណិតវិទ្យា (ថ្នាក់សង្គម)",
          nameEn: "Mathematics (Social Stream)",
          durationMinutes: 90,
          maximumMarks: 75,
          isCompulsory: true,
          notesKm: "គណិតវិទ្យាមូលដ្ឋាន ស្ថិតិ និងប្រូបាប",
        },
        {
          subject: "earth",
          nameKm: "ផែនដី និងបរិស្ថានវិទ្យា",
          nameEn: "Earth Science",
          durationMinutes: 60,
          maximumMarks: 50,
          isCompulsory: true,
          notesKm: "ភូគព្ភវិទ្យា និងបរិស្ថាន",
        },
        {
          subject: "english",
          nameKm: "ភាសាបរទេស (អង់គ្លេស/បារាំង)",
          nameEn: "Foreign Language (English/French)",
          durationMinutes: 60,
          maximumMarks: 50,
          isCompulsory: false,
          notesKm:
            "មុខវិជ្ជាស្ម័គ្រចិត្ត • គិតតែពិន្ទុដែលលើសពី ២៥ ប៉ុណ្ណោះ (អតិបរមា ២៥ ពិន្ទុបន្ថែម)",
        },
      ],
    },
  },
  gradeThresholds: [
    {
      grade: "A",
      labelKm: "ល្អប្រសើរ",
      labelEn: "Excellent",
      minScore: 427,
      maxScore: 500,
      percentage: "≥ ៨៥%",
      color: "emerald",
    },
    {
      grade: "B",
      labelKm: "ល្អណាស់",
      labelEn: "Very Good",
      minScore: 380,
      maxScore: 426,
      percentage: "៧៦% – ៨៥%",
      color: "blue",
    },
    {
      grade: "C",
      labelKm: "ល្អ",
      labelEn: "Good",
      minScore: 332,
      maxScore: 379,
      percentage: "៦៦% – ៧៥%",
      color: "teal",
    },
    {
      grade: "D",
      labelKm: "ល្អបង្គួរ",
      labelEn: "Fairly Good",
      minScore: 285,
      maxScore: 331,
      percentage: "៥៧% – ៦៦%",
      color: "amber",
    },
    {
      grade: "E",
      labelKm: "មធ្យម (ជាប់)",
      labelEn: "Passing",
      minScore: 237,
      maxScore: 284,
      percentage: "៤៧% – ៥៧%",
      color: "slate",
    },
    {
      grade: "F",
      labelKm: "ធ្លាក់",
      labelEn: "Fail",
      minScore: 0,
      maxScore: 236,
      percentage: "< ៤៧%",
      color: "red",
    },
  ],
  explanationKm: [
    "មុខវិជ្ជាកាតព្វកិច្ចទាំង ៦ មានពិន្ទុអតិបរមាសរុប ៤៧៥ ពិន្ទុ (១២៥ + ៧៥ + ៧៥ + ៧៥ + ៧៥ + ៥០)។",
    "វិញ្ញាសាភាសាបរទេស (អង់គ្លេស ឬបារាំង) ជាវិញ្ញាសាស្ម័គ្រចិត្ត មាត្រដ្ឋាន ៥០ ពិន្ទុ។ ការគណនាពិន្ទុបន្ថែមគិតតាមរូបមន្ត៖ ពិន្ទុបន្ថែម = max(0, ពិន្ទុភាសា - ២៥) ពោលគឺពិន្ទុ ២៥ ឬទាបជាងនេះមិនបូកបន្ថែមទេ, ពិន្ទុ ២៦ បូកបន្ថែម ១ ពិន្ទុ, រហូតដល់ ៥០ បូកបន្ថែម ២៥ ពិន្ទុ។",
    "ពិន្ទុសរុបអតិបរមាកែសម្រួលគឺ ៥០០ ពិន្ទុ (៤៧៥ + ២៥)។",
    "និទ្ទេសប្រឡងជាប់អប្បបរមាគឺនិទ្ទេស E ចាប់ពី ២៣៧ ពិន្ទុឡើងទៅ។",
  ],
};

// ==============================================================================
// 2. GRADE 9 BREVET (ឌីប្លូម) EXAMINATION STANDARD (2014–2024)
// ==============================================================================
export const BREVET_STANDARD = {
  id: "brevet_standard",
  category: "brevet",
  yearRange: { start: 2014, end: 2024 },
  frameworkNameKm: "ស្តង់ដារប្រឡងឌីប្លូមមធ្យមសិក្សាបឋមភូមិ (ថ្នាក់ទី ៩)",
  frameworkNameEn: "Lower Secondary Diploma (Brevet G9) Standard",
  officialSource: "ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS Cambodia)",
  passingScoreThreshold: 260,
  subjects: [
    { subject: "mathematics", durationMinutes: 120, maximumMarks: 100 },
    { subject: "khmer_writing", durationMinutes: 90, maximumMarks: 60 },
    { subject: "khmer_dictation", durationMinutes: 60, maximumMarks: 40 },
    { subject: "physics", durationMinutes: 45, maximumMarks: 35 },
    { subject: "chemistry", durationMinutes: 30, maximumMarks: 25 },
    { subject: "biology", durationMinutes: 45, maximumMarks: 35 },
    { subject: "earth", durationMinutes: 30, maximumMarks: 25 },
    { subject: "history", durationMinutes: 45, maximumMarks: 35 },
    { subject: "geography", durationMinutes: 45, maximumMarks: 35 },
    { subject: "moral_civics", durationMinutes: 45, maximumMarks: 35 },
    { subject: "english", durationMinutes: 45, maximumMarks: 50 },
  ],
  explanationKm: [
    "ការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ (ឌីប្លូម) គ្របដណ្តប់លើ ១១ មុខវិជ្ជាស្នូល។",
    "ពិន្ទុជាប់អប្បបរមាសរុបគឺ ២៦០ ពិន្ទុ។",
    "ពិន្ទុភាសាបរទេស (អង់គ្លេស/បារាំង) គិតតែចំណុចដែលលើសពី ២៥ ពិន្ទុប៉ុណ្ណោះ។",
  ],
};

// ==============================================================================
// 3. NATIONAL OUTSTANDING STUDENTS COMPETITIONS (សិស្សពូកែទូទាំងប្រទេស)
// Standard Competition Ranking Model (Distinct from Bac II)
// ==============================================================================
export const OLYMPIAD_STANDARD = {
  id: "olympiad_standard",
  category: "outstanding_student",
  frameworkNameKm: "ស្តង់ដារប្រឡងជ្រើសរើសសិស្សពូកែទូទាំងប្រទេស",
  frameworkNameEn: "National Outstanding Students Competition Standard",
  officialSource: "នាយកដ្ឋានអភិវឌ្ឍកម្មវិធីសិក្សា និងគណៈកម្មការជំនាញ MoEYS",
  paperMaximumMarks: 100,
  durationMinutes: 180, // 3 hours
  rankingModelKm:
    "ចំណាត់ថ្នាក់តាមពិន្ទុប្រឡងខ្ពស់បំផុតទូទាំងប្រទេស៖ មេដាយមាស, មេដាយប្រាក់, មេដាយសំរឹទ្ធ និងប័ណ្ណសរសើរ",
  rankingModelEn:
    "National merit ranking: Gold, Silver, Bronze medals, and Honorable Mentions based on descending total marks.",
  notesKm:
    "ការប្រឡងសិស្សពូកែមិនអនុវត្តប្រព័ន្ធ ៥០០ ពិន្ទុ ឬនិទ្ទេស A–F នៃបាក់ឌុបឡើយ។ វិញ្ញាសានីមួយៗមានពិន្ទុពេញ ១០០ ពិន្ទុ និងរយៈពេល ៣ ម៉ោង (១៨០ នាទី)។",
};

// ==============================================================================
// 4. SCORING RESOLVER FUNCTIONS
// ==============================================================================

/**
 * Resolves the verified subject metadata (duration and maximum marks)
 * according to category, stream, and examination year.
 */
export function getVerifiedSubjectSpecs(
  category: ExamCategory,
  stream: ExamStream | null,
  subject: ExamSubject,
  year: number | null,
): {
  durationMinutes: number | null;
  maximumMarks: number | null;
  isCompulsory: boolean | null;
  verified: boolean;
  notesKm?: string;
} {
  // Bac II Post-2014 reform check
  if (category === "bacii") {
    if (year !== null && year < 2014) {
      // Historical pre-reform: do not retroactively assign without verified circular
      return {
        durationMinutes: null,
        maximumMarks: null,
        isCompulsory: null,
        verified: false,
        notesKm: "រចនាសម្ព័ន្ធមុនកំណែទម្រង់ ២០១៤ មិនទាន់ផ្ទៀងផ្ទាត់ផ្លូវការ",
      };
    }

    const streamKey = stream === "social" ? "social" : "science";
    const subjectsList = BACII_POST2014_STANDARD.streams[streamKey]?.subjects || [];
    const found = subjectsList.find((s) => s.subject === subject);

    if (found) {
      return {
        durationMinutes: found.durationMinutes,
        maximumMarks: found.maximumMarks,
        isCompulsory: found.isCompulsory,
        verified: true,
        notesKm: found.notesKm,
      };
    }
  }

  // Brevet check
  if (category === "brevet") {
    const found = BREVET_STANDARD.subjects.find((s) => s.subject === subject);
    if (found) {
      return {
        durationMinutes: found.durationMinutes,
        maximumMarks: found.maximumMarks,
        isCompulsory: true,
        verified: true,
        notesKm: "ស្តង់ដារប្រឡងឌីប្លូម MoEYS",
      };
    }
  }

  // Outstanding Students check
  if (category === "outstanding_student") {
    return {
      durationMinutes: OLYMPIAD_STANDARD.durationMinutes,
      maximumMarks: OLYMPIAD_STANDARD.paperMaximumMarks,
      isCompulsory: true,
      verified: true,
      notesKm: OLYMPIAD_STANDARD.notesKm,
    };
  }

  return {
    durationMinutes: null,
    maximumMarks: null,
    isCompulsory: null,
    verified: false,
  };
}

/**
 * Calculates foreign language bonus marks for Bac II / Brevet.
 * Final bonus = max(0, score - 25)
 */
export function calculateForeignLanguageBonus(rawScore: number): number {
  if (rawScore <= 25) return 0;
  return Math.min(25, rawScore - 25);
}

/**
 * Resolves Bac II Grade (A–F) for an overall 500-point score.
 */
export function resolveBacIIGrade(totalScore500: number): {
  grade: "A" | "B" | "C" | "D" | "E" | "F";
  labelKm: string;
  isPassing: boolean;
} {
  const rounded = Math.round(totalScore500);
  if (rounded >= 427) return { grade: "A", labelKm: "ល្អប្រសើរ", isPassing: true };
  if (rounded >= 380) return { grade: "B", labelKm: "ល្អណាស់", isPassing: true };
  if (rounded >= 332) return { grade: "C", labelKm: "ល្អ", isPassing: true };
  if (rounded >= 285) return { grade: "D", labelKm: "ល្អបង្គួរ", isPassing: true };
  if (rounded >= 237) return { grade: "E", labelKm: "មធ្យម (ជាប់)", isPassing: true };
  return { grade: "F", labelKm: "ធ្លាក់", isPassing: false };
}

/**
 * Resolves an individual subject's letter grade (A–F) on MoEYS transcript
 * based on percentage of its maximum marks.
 */
export function resolveSubjectGrade(
  earnedScore: number,
  maxMarks: number,
): {
  grade: "A" | "B" | "C" | "D" | "E" | "F";
  percentage: number;
  labelKm: string;
  color: string;
} {
  if (maxMarks <= 0) {
    return { grade: "F", percentage: 0, labelKm: "ធ្លាក់", color: "red" };
  }
  const percentage = Math.round((earnedScore / maxMarks) * 100);

  if (percentage >= 90) {
    return { grade: "A", percentage, labelKm: "ល្អប្រសើរ", color: "emerald" };
  }
  if (percentage >= 80) {
    return { grade: "B", percentage, labelKm: "ល្អណាស់", color: "blue" };
  }
  if (percentage >= 70) {
    return { grade: "C", percentage, labelKm: "ល្អ", color: "teal" };
  }
  if (percentage >= 60) {
    return { grade: "D", percentage, labelKm: "ល្អបង្គួរ", color: "amber" };
  }
  if (percentage >= 50) {
    return { grade: "E", percentage, labelKm: "មធ្យម (ជាប់)", color: "slate" };
  }
  return { grade: "F", percentage, labelKm: "ធ្លាក់", color: "red" };
}

// ==============================================================================
// 5. OFFICIAL 2-DAY BAC II EXAMINATION TIMETABLE (កាលវិភាគប្រឡងផ្លូវការ)
// Standard Morning & Afternoon Session Structure for Science & Social Streams
// ==============================================================================
export interface ExamTimetableSession {
  id: string;
  day: 1 | 2;
  dayLabelKm: string;
  sessionTime: string;
  durationMinutes: number;
  period: "morning" | "afternoon";
  periodLabelKm: string;
  scienceSubject: {
    subject: ExamSubject;
    nameKm: string;
    durationMinutes: number;
    maximumMarks: number;
    isFlagship?: boolean;
    isBonus?: boolean;
    isElective?: boolean;
    roleKm: string;
  };
  socialSubject: {
    subject: ExamSubject;
    nameKm: string;
    durationMinutes: number;
    maximumMarks: number;
    isFlagship?: boolean;
    isBonus?: boolean;
    isElective?: boolean;
    roleKm: string;
  };
}

export const BACII_2DAY_TIMETABLE: ExamTimetableSession[] = [
  // --- DAY 1 MORNING ---
  {
    id: "d1-s1",
    day: 1,
    dayLabelKm: "ថ្ងៃទី១ (Day 1)",
    sessionTime: "០៧:៣០ – ០៨:៣០",
    durationMinutes: 60,
    period: "morning",
    periodLabelKm: "ពេលព្រឹក — វិញ្ញាសាទី ១",
    scienceSubject: {
      subject: "history",
      nameKm: "ប្រវត្តិវិទ្យា",
      durationMinutes: 60,
      maximumMarks: 50,
      isElective: true,
      roleKm: "វិញ្ញាសាជម្រើស (៥០ ពិន្ទុ)",
    },
    socialSubject: {
      subject: "earth",
      nameKm: "ផែនដី និងបរិស្ថានវិទ្យា",
      durationMinutes: 60,
      maximumMarks: 50,
      isElective: true,
      roleKm: "វិញ្ញាសាជម្រើស (៥០ ពិន្ទុ)",
    },
  },
  {
    id: "d1-s2",
    day: 1,
    dayLabelKm: "ថ្ងៃទី១ (Day 1)",
    sessionTime: "០៩:០០ – ១០:៣០",
    durationMinutes: 90,
    period: "morning",
    periodLabelKm: "ពេលព្រឹក — វិញ្ញាសាទី ២",
    scienceSubject: {
      subject: "biology",
      nameKm: "ជីវវិទ្យា",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "វិទ្យាសាស្ត្រស្នូល (៧៥ ពិន្ទុ)",
    },
    socialSubject: {
      subject: "history",
      nameKm: "ប្រវត្តិវិទ្យា",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "វិទ្យាសាស្ត្រសង្គមស្នូល (៧៥ ពិន្ទុ)",
    },
  },

  // --- DAY 1 AFTERNOON ---
  {
    id: "d1-s3",
    day: 1,
    dayLabelKm: "ថ្ងៃទី១ (Day 1)",
    sessionTime: "១៤:០០ – ១៥:៣០",
    durationMinutes: 90,
    period: "afternoon",
    periodLabelKm: "ពេលរសៀល — វិញ្ញាសាទី ៣",
    scienceSubject: {
      subject: "chemistry",
      nameKm: "គីមីវិទ្យា",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "វិទ្យាសាស្ត្រស្នូល (៧៥ ពិន្ទុ)",
    },
    socialSubject: {
      subject: "geography",
      nameKm: "ភូមិវិទ្យា",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "វិទ្យាសាស្ត្រសង្គមស្នូល (៧៥ ពិន្ទុ)",
    },
  },
  {
    id: "d1-s4",
    day: 1,
    dayLabelKm: "ថ្ងៃទី១ (Day 1)",
    sessionTime: "១៦:០០ – ១៧:០០",
    durationMinutes: 60,
    period: "afternoon",
    periodLabelKm: "ពេលរសៀល — វិញ្ញាសាទី ៤",
    scienceSubject: {
      subject: "english",
      nameKm: "ភាសាបរទេស (អង់គ្លេស/បារាំង)",
      durationMinutes: 60,
      maximumMarks: 50,
      isBonus: true,
      roleKm: "វិញ្ញាសាស្ម័គ្រចិត្ត (ពិន្ទុលើស ២៥ ជាពិន្ទុបន្ថែម)",
    },
    socialSubject: {
      subject: "english",
      nameKm: "ភាសាបរទេស (អង់គ្លេស/បារាំង)",
      durationMinutes: 60,
      maximumMarks: 50,
      isBonus: true,
      roleKm: "វិញ្ញាសាស្ម័គ្រចិត្ត (ពិន្ទុលើស ២៥ ជាពិន្ទុបន្ថែម)",
    },
  },

  // --- DAY 2 MORNING ---
  {
    id: "d2-s5",
    day: 2,
    dayLabelKm: "ថ្ងៃទី២ (Day 2)",
    sessionTime: "០៧:៣០ – ០៩:០០",
    durationMinutes: 90,
    period: "morning",
    periodLabelKm: "ពេលព្រឹក — វិញ្ញាសាទី ៥",
    scienceSubject: {
      subject: "khmer",
      nameKm: "អក្សរសាស្ត្រខ្មែរ",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "តែងសេចក្តី & អក្សរសិល្ប៍ (៧៥ ពិន្ទុ)",
    },
    socialSubject: {
      subject: "mathematics",
      nameKm: "គណិតវិទ្យា (ថ្នាក់សង្គម)",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "ស្ថិតិ & ប្រូបាបសង្គម (៧៥ ពិន្ទុ)",
    },
  },
  {
    id: "d2-s6",
    day: 2,
    dayLabelKm: "ថ្ងៃទី២ (Day 2)",
    sessionTime: "០៩:៣០ – ១១:០០",
    durationMinutes: 90,
    period: "morning",
    periodLabelKm: "ពេលព្រឹក — វិញ្ញាសាទី ៦",
    scienceSubject: {
      subject: "physics",
      nameKm: "រូបវិទ្យា",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "រូបវិទ្យាអនុវត្ត (៧៥ ពិន្ទុ)",
    },
    socialSubject: {
      subject: "moral_civics",
      nameKm: "សីលធម៌-ពលរដ្ឋវិជ្ជា",
      durationMinutes: 90,
      maximumMarks: 75,
      roleKm: "ច្បាប់ & សីលធម៌ពលរដ្ឋ (៧៥ ពិន្ទុ)",
    },
  },

  // --- DAY 2 AFTERNOON (GRAND FINALE) ---
  {
    id: "d2-s7",
    day: 2,
    dayLabelKm: "ថ្ងៃទី២ (Day 2)",
    sessionTime: "១៤:០០ – ១៦:៣០",
    durationMinutes: 150,
    period: "afternoon",
    periodLabelKm: "ពេលរសៀល — វិញ្ញាសាផ្ដាច់ព្រ័ត្រ (Grand Finale)",
    scienceSubject: {
      subject: "mathematics",
      nameKm: "គណិតវិទ្យា (វិញ្ញាសាស្នូល)",
      durationMinutes: 150,
      maximumMarks: 125,
      isFlagship: true,
      roleKm: "វិញ្ញាសាស្នូលកម្រិតខ្ពស់ (១២៥ ពិន្ទុ)",
    },
    socialSubject: {
      subject: "khmer",
      nameKm: "អក្សរសាស្ត្រខ្មែរ (តែងសេចក្តីពិស្ដារ)",
      durationMinutes: 150,
      maximumMarks: 125,
      isFlagship: true,
      roleKm: "វិញ្ញាសាស្នូលតែងសេចក្តី (១២៥ ពិន្ទុ)",
    },
  },
];
