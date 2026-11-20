import { useState } from "react";
import {
  Flame,
  Heart,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Bot,
  Compass,
  Trophy,
  ArrowRight,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { sounds } from "@/lib/sound-effects";
import { launchConfetti } from "@/lib/confetti";
import type { LandingCopy } from "./types";

interface HeroDemoConsoleProps {
  copy: LandingCopy["hero"];
  isKhmer: boolean;
}

type GradeLevel = 7 | 8 | 9 | 10 | 11 | 12;

interface QuizItem {
  grade: GradeLevel;
  subjectKm: string;
  subjectEn: string;
  topicKm: string;
  topicEn: string;
  badgeKm: string;
  badgeEn: string;
  questionKm: string;
  questionEn: string;
  optionsKm: Array<{ text: string; correct: boolean }>;
  optionsEn: Array<{ text: string; correct: boolean }>;
  feedbackKm: string;
  feedbackEn: string;
}

const DEMO_QUIZZES: Record<GradeLevel, QuizItem> = {
  7: {
    grade: 7,
    subjectKm: "ជីវវិទ្យា ថ្នាក់ទី ៧",
    subjectEn: "Grade 7 Biology",
    topicKm: "កោសិកាភាវៈរស់",
    topicEn: "Cell Structure",
    badgeKm: "អនុវិទ្យាល័យ",
    badgeEn: "Junior High",
    questionKm: "តើអង្គភាពរចនាសម្ព័ន្ធ និងមុខងារមូលដ្ឋានបំផុតនៃភាវៈរស់ទាំងអស់ជាអ្វី?",
    questionEn: "What is the fundamental structural and functional unit of all living organisms?",
    optionsKm: [
      { text: "ម៉ូលេគុល (Molecule)", correct: false },
      { text: "កោសិកា (Cell)", correct: true },
      { text: "ជាលិកា (Tissue)", correct: false },
      { text: "សរីរាង្គ (Organ)", correct: false },
    ],
    optionsEn: [
      { text: "Molecule", correct: false },
      { text: "Cell", correct: true },
      { text: "Tissue", correct: false },
      { text: "Organ", correct: false },
    ],
    feedbackKm: "ត្រឹមត្រូវណាស់! +15 XP ទទួលបាន។ កោសិកាគឺជាឯកតាមូលដ្ឋាននៃជីវិត (ទ្រឹស្តីកោសិកា)។",
    feedbackEn:
      "Brilliant! +15 XP earned. The cell is the fundamental unit of life according to Cell Theory.",
  },
  8: {
    grade: 8,
    subjectKm: "ផែនដីវិទ្យា ថ្នាក់ទី ៨",
    subjectEn: "Grade 8 Earth Science",
    topicKm: "ស្រទាប់បរិយាកាស",
    topicEn: "Atmospheric Layers",
    badgeKm: "អនុវិទ្យាល័យ",
    badgeEn: "Junior High",
    questionKm:
      "តើស្រទាប់បរិយាកាសណាដែលមានស្រទាប់អូហ្សូន (O₃) ជួយស្រូបកាំរស្មីស្វាយអ៊ុលត្រា (UV) ពីព្រះអាទិត្យ?",
    questionEn:
      "Which layer of the atmosphere contains the ozone layer that absorbs harmful UV rays from the sun?",
    optionsKm: [
      { text: "ត្រូប៉ូស្វ៊ែរ (Troposphere)", correct: false },
      { text: "ស្ត្រាតូស្វ៊ែរ (Stratosphere)", correct: true },
      { text: "មេសូស្វ៊ែរ (Mesosphere)", correct: false },
      { text: "ទែរម៉ូស្វ៊ែរ (Thermosphere)", correct: false },
    ],
    optionsEn: [
      { text: "Troposphere", correct: false },
      { text: "Stratosphere", correct: true },
      { text: "Mesosphere", correct: false },
      { text: "Thermosphere", correct: false },
    ],
    feedbackKm:
      "ត្រឹមត្រូវណាស់! +15 XP ទទួលបាន។ ស្រទាប់អូហ្សូនស្ថិតក្នុងស្រទាប់ស្ត្រាតូស្វ៊ែរ ចន្លោះពី ១៥ ទៅ ៥០ គីឡូម៉ែត្រ។",
    feedbackEn: "Correct! +15 XP earned. The ozone layer resides in the stratosphere (15–50 km).",
  },
  9: {
    grade: 9,
    subjectKm: "គីមីវិទ្យា ថ្នាក់ទី ៩",
    subjectEn: "Grade 9 Chemistry",
    topicKm: "ប្រតិកម្មបន្សាបអាស៊ីត-បាស",
    topicEn: "Acid-Base Neutralization",
    badgeKm: "ត្រៀមប្រឡងឌីប្លូម (Brevet)",
    badgeEn: "Brevet Exam Prep",
    questionKm:
      "នៅពេលលាយសូលុយស្យុងអាស៊ីតក្លរីឌ្រិច (HCl) ជាមួយបាសសូដ្យូមអ៊ីដ្រុកស៊ីត (NaOH) តើប្រតិកម្មបន្សាបបង្កើតបានផលអ្វី?",
    questionEn:
      "When hydrochloric acid (HCl) reacts with sodium hydroxide (NaOH) base, what are the neutralization products?",
    optionsKm: [
      { text: "ឧស្ម័នអ៊ីដ្រូសែន និងអុកស៊ីសែន (H₂ + O₂)", correct: false },
      { text: "អំបិលសូដ្យូមក្លរួ និងទឹក (NaCl + H₂O)", correct: true },
      { text: "ឧស្ម័នកាបូនិច និងទឹក (CO₂ + H₂O)", correct: false },
      { text: "គ្មានប្រតិកម្មកើតឡើងទេ", correct: false },
    ],
    optionsEn: [
      { text: "Hydrogen gas and oxygen (H₂ + O₂)", correct: false },
      { text: "Sodium chloride salt and water (NaCl + H₂O)", correct: true },
      { text: "Carbon dioxide and water (CO₂ + H₂O)", correct: false },
      { text: "No reaction occurs", correct: false },
    ],
    feedbackKm:
      "ត្រឹមត្រូវណាស់! +15 XP ទទួលបាន។ អាស៊ីត + បាស → អំបិល + ទឹក: HCl + NaOH → NaCl + H₂O។",
    feedbackEn: "Correct! +15 XP earned. Acid + Base → Salt + Water: HCl + NaOH → NaCl + H₂O.",
  },
  10: {
    grade: 10,
    subjectKm: "រូបវិទ្យា ថ្នាក់ទី ១០",
    subjectEn: "Grade 10 Physics",
    topicKm: "ចលនាត្រង់ស្មើ",
    topicEn: "Uniform Linear Motion",
    badgeKm: "វិទ្យាល័យ",
    badgeEn: "Senior High",
    questionKm:
      "ម៉ូតូមួយធ្វើចលនាត្រង់ស្មើដោយល្បឿនថេរ v = 15 m/s ក្នុងរយៈពេល t = 10 s។ តើចម្ងាយចរ d ស្មើនឹងប៉ុន្មាន?",
    questionEn:
      "A motorcycle travels with a constant velocity v = 15 m/s for a duration t = 10 s. What is the distance d traveled?",
    optionsKm: [
      { text: "15 m", correct: false },
      { text: "25 m", correct: false },
      { text: "150 m (d = v × t)", correct: true },
      { text: "1500 m", correct: false },
    ],
    optionsEn: [
      { text: "15 m", correct: false },
      { text: "25 m", correct: false },
      { text: "150 m (d = v · t)", correct: true },
      { text: "1500 m", correct: false },
    ],
    feedbackKm:
      "ត្រឹមត្រូវណាស់! +15 XP ទទួលបាន។ ក្នុងចលនាត្រង់ស្មើ d = v × t = 15 × 10 = 150 ម៉ែត្រ។",
    feedbackEn: "Correct! +15 XP earned. In uniform motion d = v · t = 15 · 10 = 150 meters.",
  },
  11: {
    grade: 11,
    subjectKm: "គីមីវិទ្យា ថ្នាក់ទី ១១",
    subjectEn: "Grade 11 Chemistry",
    topicKm: "គោលការណ៍ Le Chatelier",
    topicEn: "Le Chatelier's Principle",
    badgeKm: "វិទ្យាល័យ",
    badgeEn: "Senior High",
    questionKm:
      "សម្រាប់ប្រព័ន្ធឧស្ម័ន N₂ + 3H₂ ⇌ 2NH₃ (ប្រតិកម្មបញ្ចេញកម្ដៅ) ប្រសិនបើសម្ពាធកើនឡើង តើសមតុល្យរំកិលទៅទិសណា?",
    questionEn:
      "For the system N₂(g) + 3H₂(g) ⇌ 2NH₃(g), if pressure increases, which direction will equilibrium shift?",
    optionsKm: [
      { text: "ទៅឆ្វេង (ឆ្ពោះទៅបង្កើត N₂ និង H₂)", correct: false },
      { text: "ទៅស្តាំ (ឆ្ពោះទៅបង្កើត NH₃ ច្រើនជាងមុន)", correct: true },
      { text: "មិនប្រែប្រួលទាល់តែសោះ", correct: false },
      { text: "ប្រតិកម្មឈប់ដំណើរការភ្លាមៗ", correct: false },
    ],
    optionsEn: [
      { text: "To the left (favoring N₂ and H₂)", correct: false },
      { text: "To the right (favoring NH₃ production)", correct: true },
      { text: "No shift occurs", correct: false },
      { text: "The reaction stops immediately", correct: false },
    ],
    feedbackKm:
      "ត្រឹមត្រូវណាស់! +15 XP ទទួលបាន។ ការបង្កើនសម្ពាធរំកិលសមតុល្យទៅទិសដៅដែលមានម៉ូលឧស្ម័នតិច (៤ ម៉ូល ទៅ ២ ម៉ូល)។",
    feedbackEn:
      "Correct! +15 XP earned. Pressure increase shifts equilibrium toward fewer gas moles (4 → 2).",
  },
  12: {
    grade: 12,
    subjectKm: "រូបវិទ្យា ថ្នាក់ទី ១២",
    subjectEn: "Grade 12 Physics",
    topicKm: "ច្បាប់ទី២ ញូតុន",
    topicEn: "Newton's 2nd Law",
    badgeKm: "ត្រៀមប្រឡងបាក់ឌុប (BacII)",
    badgeEn: "BacII Exam Prep",
    questionKm:
      "យោងតាមច្បាប់ទី២ ញូតុន (F = m × a) ប្រសិនបើសំទុះ (a) កើនឡើងទ្វេដង ខណៈដែលម៉ាស (m) នៅថេរ តើកម្លាំង (F) នឹងមានការប្រែប្រួលដូចម្តេច?",
    questionEn:
      "According to Newton's second law (F = m · a), if acceleration (a) is doubled while mass (m) remains constant, how does force (F) change?",
    optionsKm: [
      { text: "កម្លាំងថយចុះពាក់កណ្តាល (F = F / 2)", correct: false },
      { text: "កម្លាំងកើនឡើងទ្វេដង (F = 2F)", correct: true },
      { text: "កម្លាំងនៅថេរមិនផ្លាស់ប្តូរ", correct: false },
      { text: "កម្លាំងធ្លាក់ចុះសូន្យ", correct: false },
    ],
    optionsEn: [
      { text: "The force is halved (F = F / 2)", correct: false },
      { text: "The force doubles (F = 2F)", correct: true },
      { text: "The force remains unchanged", correct: false },
      { text: "The force becomes zero", correct: false },
    ],
    feedbackKm:
      "ត្រឹមត្រូវណាស់! +15 XP ទទួលបាន។ ដោយសារ F សមាមាត្រត្រង់នឹង a នោះ F នឹងកើនឡើងទ្វេដងដែរ។",
    feedbackEn:
      "Brilliant! +15 XP earned. Since F is directly proportional to a, the force also doubles.",
  },
};

export function HeroDemoConsole({ copy, isKhmer }: HeroDemoConsoleProps) {
  const [activeTab, setActiveTab] = useState<"quiz" | "roadmap" | "tutor" | "leaderboard">("quiz");

  // Selected Grade for Interactive Quiz (Grades 7–12)
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(9);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [hearts, setHearts] = useState(5);
  const [xp, setXp] = useState(120);
  const [streak, setStreak] = useState(7);
  const [heartLostShake, setHeartLostShake] = useState(false);

  // Roadmap level track toggle
  const [roadmapTrack, setRoadmapTrack] = useState<"junior" | "senior">("senior");

  // AI Tutor simulated chat state
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "tutor"; text: string }>>(
    [
      {
        role: "tutor",
        text: isKhmer
          ? "សួស្តីប្អូន! ខ្ញុំគឺលោកគ្រូ វុឌ្ឍ គ្រូជំនួយ STEM សូក្រាត សម្រាប់សិស្សថ្នាក់ទី ៧ ដល់ ១២។ តើប្អូនមានចម្ងល់អ្វីទាក់ទងនឹងរូប, គីមី, ជីវៈ ឬផែនដីវិទ្យាថ្ងៃនេះ?"
          : "Hello! I am Kru Vuth, your Socratic STEM tutor for Grades 7 to 12. What science question would you like to explore today?",
      },
    ],
  );
  const [tutorReplying, setTutorReplying] = useState(false);

  const currentQuiz = DEMO_QUIZZES[selectedGrade];
  const quizOptions = isKhmer ? currentQuiz.optionsKm : currentQuiz.optionsEn;

  const handleGradeChange = (grade: GradeLevel) => {
    sounds.playPop();
    setSelectedGrade(grade);
    setSelectedOption(null);
    setQuizStatus("idle");
  };

  const handleSelectAnswer = (idx: number) => {
    if (quizStatus !== "idle") return;
    setSelectedOption(idx);
    const isCorrect = quizOptions[idx].correct;

    if (isCorrect) {
      setQuizStatus("correct");
      setXp((prev) => prev + 15);
      sounds.playCorrect();
      launchConfetti();
    } else {
      setQuizStatus("wrong");
      setHearts((prev) => Math.max(0, prev - 1));
      setHeartLostShake(true);
      setTimeout(() => setHeartLostShake(false), 500);
      sounds.playWrong();
      sounds.playHeartLost();
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizStatus("idle");
  };

  const handleTutorPrompt = (promptText: string) => {
    if (tutorReplying) return;
    sounds.playPop();
    setChatMessages((prev) => [...prev, { role: "user", text: promptText }]);
    setTutorReplying(true);

    setTimeout(() => {
      let reply = "";
      if (
        promptText.includes("ដេរីវេ") ||
        promptText.includes("derivative") ||
        promptText.includes("គណិត")
      ) {
        reply = isKhmer
          ? "រូបមន្តដេរីវេគ្រឹះ៖ (xⁿ)' = n · xⁿ⁻¹ និង (u/v)' = (u'v - uv') / v²។ ឧទាហរណ៍៖ f(x) = 3x² + 5x នាំឱ្យ f'(x) = 6x + 5។ ត្រៀមប្រឡងបាក់ឌុប ចូរចាំរូបមន្ត (ln x)' = 1/x និង (eˣ)' = eˣ!"
          : "Essential calculus formulas: (xⁿ)' = n · xⁿ⁻¹ and quotient rule (u/v)' = (u'v - uv') / v². For example, f(x) = 3x² + 5x gives f'(x) = 6x + 5. Key BacII tips include (ln x)' = 1/x and (eˣ)' = eˣ!";
      } else if (
        promptText.includes("កុលាប") ||
        promptText.includes("អក្សរសាស្ត្រ") ||
        promptText.includes("Khmer")
      ) {
        reply = isKhmer
          ? "រឿង 'កុលាបប៉ៃលិន' និពន្ធដោយលោក ញ៉ុក ថែម (១៩៣៦) បង្ហាញពីឧត្តមគតិយុវជនខ្មែរ ចៅចិត្រ ដែលមានភាពស្មោះត្រង់ ឧស្សាហ៍ព្យាយាម និងសេចក្តីថ្លៃថ្នូរ ឈ្នះអស់ឧបសគ្គ!"
          : "The classic novel 'Kulap Pailin' by Nhok Them (1936) highlights the Cambodian virtues of honesty, diligence, and integrity through the journey of Chao Chet.";
      } else if (promptText.includes("ញូតុន") || promptText.includes("Newton")) {
        reply = isKhmer
          ? "សំណួរល្អណាស់! ច្បាប់ទី២ ញូតុន ចែងថា៖ កម្លាំងសរុប (F) ស្មើនឹង ម៉ាស (m) គុណនឹង សំទុះ (a) ពោលគឺ F = m × a។ ប្រសិនបើម៉ាសរថយន្តកើនឡើងទ្វេដង ប៉ុន្តែអ្នកចង់ឱ្យវាបង្កើនល្បឿនដូចមុន តើអ្នកត្រូវបន្ថែមឬបន្ថយកម្លាំងម៉ាស៊ីន?"
          : "Great question! Newton's Second Law states that net force equals mass times acceleration: F = m × a. If the mass of an object doubles and you want the same acceleration, what must happen to the force?";
      } else if (
        promptText.includes("សមីការ") ||
        promptText.includes("equation") ||
        promptText.includes("ឌីប្លូម")
      ) {
        reply = isKhmer
          ? "ចូរពិនិត្យមើលច្បាប់រក្សាម៉ាសរបស់ Lavoisier! នៅក្នុងប្រតិកម្ម 2H₂ + O₂ → 2H₂O ចំនួនអាតូម H និង O នៅខាងឆ្វេងគឺ ៤ និង ២ ស្មើគ្នានឹងខាងស្តាំ។ សម្រាប់ថ្នាក់ទី ៩ ឌីប្លូម ចូរសាកល្បងតុល្យការ CH₄ + 2O₂ → CO₂ + 2H₂O!"
          : "Remember Lavoisier's conservation of mass! In 2H₂ + O₂ → 2H₂O, the count of hydrogen and oxygen atoms on the left equals the right. Would you like to try balancing CH₄ + 2O₂ → CO₂ + 2H₂O together?";
      } else if (promptText.includes("កោសិកា") || promptText.includes("Cell")) {
        reply = isKhmer
          ? "កោសិកាជាឯកតាមូលដ្ឋាននៃជីវិត! នៅក្នុងកោសិការុក្ខជាតិ មានភ្នាសកោសិកា ជញ្ជាំងកោសិកា និងក្លរ៉ូប្លាស (ដែលផ្ទុកក្លរ៉ូភីលសម្រាប់រស្មីសំយោគ)។ ចំណែកកោសិកាសត្វគ្មានជញ្ជាំងកោសិកាទេ។"
          : "Cells are the basic units of life! Plant cells have a cell wall, membrane, and chloroplasts for photosynthesis, whereas animal cells lack a rigid cell wall.";
      } else if (promptText.includes("pH") || promptText.includes("អាស៊ីត")) {
        reply = isKhmer
          ? "មាត្រដ្ឋាន pH វាស់កំហាប់អ៊ីយ៉ុង H₃O⁺ ក្នុងសូលុយស្យុង៖ pH < 7 ជាអាស៊ីត, pH = 7 ជាអព្យាក្រឹត (ទឹកបរិសុទ្ធ), pH > 7 ជាបាស។ ក្នុងរូបមន្ត pH = -log[H₃O⁺]។"
          : "The pH scale measures hydronium ion concentration: pH < 7 is acidic, pH = 7 is neutral (pure water), pH > 7 is basic, calculated as pH = -log[H₃O⁺].";
      } else {
        reply = isKhmer
          ? "រស្មីសំយោគកើតឡើងនៅក្នុងក្លរ៉ូប្លាសនៃកោសិកាដើមឈើ ដោយប្រើពន្លឺព្រះអាទិត្យ ទឹក (H₂O) និងឧស្ម័នកាបូនិច (CO₂) ដើម្បីផលិតគ្លុយកូស (C₆H₁₂O₆) និងបញ្ចេញឧស្ម័នអុកស៊ីសែន (O₂) សម្រាប់ភាវៈរស់ដកដង្ហើម។"
          : "Photosynthesis occurs inside chloroplasts using sunlight, water, and carbon dioxide to produce glucose and release oxygen into the atmosphere.";
      }

      setChatMessages((prev) => [...prev, { role: "tutor", text: reply }]);
      setTutorReplying(false);
    }, 700);
  };

  return (
    <div
      id="hero-demo-console"
      className="relative w-full rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden text-left transition-all duration-200 scroll-mt-24"
    >
      {/* Top Console Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800">
        {/* Mac Terminal Window Dots + Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
          {/* Traffic light dots */}
          <div className="hidden sm:flex items-center gap-1.5 pr-2.5 border-r border-slate-800 shrink-0 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>

          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab("quiz");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeTab === "quiz"
                ? "bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>{copy.demoTabs.quiz}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab("roadmap");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeTab === "roadmap"
                ? "bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{copy.demoTabs.roadmap}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab("tutor");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeTab === "tutor"
                ? "bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{copy.demoTabs.tutor}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setActiveTab("leaderboard");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              activeTab === "leaderboard"
                ? "bg-emerald-600 text-white shadow-xs font-black ring-1 ring-emerald-400/40"
                : "text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{copy.demoTabs.leaderboard}</span>
          </button>
        </div>

        {/* Live Gamification Metrics (Streak, XP, Hearts) */}
        {/* Desktop full display */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-bold pl-2 shrink-0">
          <div className="flex items-center gap-1 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{streak}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{xp} XP</span>
          </div>
          <div
            className={`flex items-center gap-1 text-rose-400 ${heartLostShake ? "animate-bounce" : ""}`}
          >
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>{hearts}</span>
          </div>
        </div>

        {/* Mobile compact gamification pill */}
        <div className="flex sm:hidden items-center gap-2 text-[10px] font-bold text-slate-200 bg-slate-800/90 px-2 py-1 rounded-md border border-slate-700/60 shrink-0">
          <span className="flex items-center gap-0.5 text-amber-400">
            <Flame className="w-3 h-3 fill-amber-400" />
            {streak}
          </span>
          <span className="text-emerald-400">{xp}XP</span>
          <span
            className={`flex items-center gap-0.5 text-rose-400 ${heartLostShake ? "animate-bounce" : ""}`}
          >
            <Heart className="w-3 h-3 fill-rose-400" />
            {hearts}
          </span>
        </div>
      </div>

      {/* Main Interactive View Body */}
      <div className="p-4 sm:p-6 bg-slate-50/50 min-h-[410px] flex flex-col justify-between">
        {/* TAB 1: INTERACTIVE STEM QUIZ (Grades 7–12) */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            {/* Grade Level Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  {isKhmer ? "កម្រិតថ្នាក់៖" : "Select Grade:"}
                </span>
                {([7, 8, 9, 10, 11, 12] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGradeChange(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                      selectedGrade === g
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span>{isKhmer ? `ថ្នាក់ទី ${g}` : `Grade ${g}`}</span>
                    {g === 9 && (
                      <span className="ml-1 text-[10px] text-emerald-400 font-semibold">
                        (ឌីប្លូម)
                      </span>
                    )}
                    {g === 12 && (
                      <span className="ml-1 text-[10px] text-emerald-400 font-semibold">
                        (បាក់ឌុប)
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 self-start sm:self-auto shrink-0">
                {isKhmer ? currentQuiz.badgeKm : currentQuiz.badgeEn}
              </span>
            </div>

            {/* Subject & Question Context */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isKhmer
                    ? `${currentQuiz.subjectKm} · ${currentQuiz.topicKm}`
                    : `${currentQuiz.subjectEn} · ${currentQuiz.topicEn}`}
                </span>
              </span>
              <span className="font-semibold text-slate-600">
                {isKhmer ? "លំហាត់គំរូ" : "Interactive Demo"}
              </span>
            </div>

            {/* Question Prompt */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {isKhmer ? currentQuiz.questionKm : currentQuiz.questionEn}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {quizOptions.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle =
                  "bg-white border-slate-200/90 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/30";

                if (isSelected) {
                  if (opt.correct) {
                    btnStyle =
                      "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/20";
                  } else {
                    btnStyle =
                      "bg-rose-50 border-rose-400 text-rose-950 font-bold shadow-xs ring-2 ring-rose-500/20";
                  }
                } else if (quizStatus !== "idle" && opt.correct) {
                  btnStyle = "bg-emerald-50/70 border-emerald-400 text-emerald-900";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-start gap-2.5 hover:shadow-xs hover:-translate-y-0.5 active:scale-98 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback Alert Banner */}
            {quizStatus === "correct" && (
              <div className="p-3.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    {isKhmer ? currentQuiz.feedbackKm : currentQuiz.feedbackEn}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shrink-0 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isKhmer ? "ធ្វើម្តងទៀត" : "Retry"}</span>
                </button>
              </div>
            )}

            {quizStatus === "wrong" && (
              <div className="p-3.5 rounded-xl bg-rose-100/80 border border-rose-300 text-rose-950 text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="font-medium">
                    {isKhmer
                      ? "មិនទាន់ត្រឹមត្រូវទេ! បាត់បង់បេះដូង ១។ ចុច 'សួរលោកគ្រូ វុឌ្ឍ' ដើម្បីមើលការបកស្រាយលម្អិត!"
                      : "Not quite! You lost 1 heart. Click 'Ask Kru Vuth' to see the explanation."}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab("tutor")}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-900 font-bold text-xs hover:bg-rose-50 transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                    <span>{isKhmer ? "សួរលោកគ្រូ វុឌ្ឍ" : "Ask Kru Vuth"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="p-1.5 rounded-lg text-rose-800 hover:bg-rose-200/60 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STEPPING-STONE ROADMAP PREVIEW (Junior High & Senior High) */}
        {activeTab === "roadmap" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setRoadmapTrack("junior")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all border text-center ${
                    roadmapTrack === "junior"
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="hidden sm:inline">
                    {isKhmer
                      ? "អនុវិទ្យាល័យ (ថ្នាក់ទី ៧-៩ · ឌីប្លូម)"
                      : "Junior High (Grades 7–9 · Brevet)"}
                  </span>
                  <span className="sm:hidden">
                    {isKhmer ? "អនុវិទ្យាល័យ (៧-៩)" : "Junior High (7–9)"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRoadmapTrack("senior")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all border text-center ${
                    roadmapTrack === "senior"
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="hidden sm:inline">
                    {isKhmer
                      ? "វិទ្យាល័យ (ថ្នាក់ទី ១០-១២ · បាក់ឌុប)"
                      : "Senior High (Grades 10–12 · BacII)"}
                  </span>
                  <span className="sm:hidden">
                    {isKhmer ? "វិទ្យាល័យ (១០-១២)" : "Senior High (10–12)"}
                  </span>
                </button>
              </div>

              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px] self-start sm:self-auto shrink-0">
                {roadmapTrack === "junior"
                  ? isKhmer
                    ? "ត្រៀមឌីប្លូម"
                    : "Brevet Track"
                  : isKhmer
                    ? "ត្រៀមបាក់ឌុប"
                    : "BacII Track"}
              </span>
            </div>

            {roadmapTrack === "junior" ? (
              /* Junior High Stepping Stones */
              <div className="flex items-center justify-around py-6 relative">
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0" />

                {/* Node 1: Grade 7 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-2 text-center">
                    {isKhmer ? "ថ្នាក់ទី ៧ (កោសិកា)" : "Grade 7 (Cells)"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100%</span>
                </div>

                {/* Node 2: Grade 8 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-2 text-center">
                    {isKhmer ? "ថ្នាក់ទី ៨ (បរិយាកាស)" : "Grade 8 (Earth)"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100%</span>
                </div>

                {/* Node 3: Grade 9 (Active) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg ring-4 ring-amber-200 animate-pulse">
                    <Flame className="w-7 h-7 fill-white" />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-900 mt-2 text-center">
                    {isKhmer ? "ថ្នាក់ទី ៩ (អាស៊ីត-បាស)" : "Grade 9 (Acid-Base)"}
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold">In Progress</span>
                </div>

                {/* Node 4: Brevet Exam Hub */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-xs">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-800 mt-2 text-center">
                    {isKhmer ? "វិញ្ញាសាឌីប្លូម" : "Brevet Hub"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">2011–2024</span>
                </div>
              </div>
            ) : (
              /* Senior High Stepping Stones */
              <div className="flex items-center justify-around py-6 relative">
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0" />

                {/* Node 1: Grade 10 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-2 text-center">
                    {isKhmer ? "ថ្នាក់ទី ១០ (ចលនាត្រង់)" : "Grade 10 (Motion)"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100%</span>
                </div>

                {/* Node 2: Grade 11 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-2 text-center">
                    {isKhmer ? "ថ្នាក់ទី ១១ (សមតុល្យ)" : "Grade 11 (Equilibrium)"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100%</span>
                </div>

                {/* Node 3: Grade 12 (Active) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg ring-4 ring-amber-200 animate-pulse">
                    <Flame className="w-7 h-7 fill-white" />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-900 mt-2 text-center">
                    {isKhmer ? "ថ្នាក់ទី ១២ (ច្បាប់ញូតុន)" : "Grade 12 (Newton's Laws)"}
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold">In Progress</span>
                </div>

                {/* Node 4: BacII Exam Hub */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-xs">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-800 mt-2 text-center">
                    {isKhmer ? "វិញ្ញាសាបាក់ឌុប" : "BacII Hub"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">2011–2024</span>
                </div>
              </div>
            )}

            <p className="text-center text-xs text-slate-500 pt-2">
              {isKhmer
                ? "ផ្លូវរៀនស្ទាត់ជំនាញបំបែកមេរៀនជាជំហានតូចៗ សម្រាប់សិស្សអនុវិទ្យាល័យ (៧-៩) និងវិទ្យាល័យ (១០-១២)"
                : "Mastery Roadmaps broken into bite-sized stepping stones for Junior High (7–9) & Senior High (10–12)."}
            </p>
          </div>
        )}

        {/* TAB 3: DR. SOKHA SOCRATIC AI TUTOR (Grades 7–12 Prompts) */}
        {activeTab === "tutor" && (
          <div className="space-y-3">
            {/* Chat Messages */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 text-xs sm:text-sm ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "tutor" && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-800 shadow-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {tutorReplying && (
                <div className="flex items-center gap-2 pl-9 py-1 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 bg-white border border-emerald-200/80 px-3 py-1.5 rounded-2xl shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-typing-1" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-typing-2" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-typing-3" />
                    <span className="text-[11px] font-semibold text-emerald-800 ml-1">
                      {isKhmer ? "លោកគ្រូ វុឌ្ឍ កំពុងឆ្លើយតប..." : "Kru Vuth is explaining..."}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Socratic Prompt Pills for Grades 7 to 12 */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] text-slate-400 font-medium shrink-0 pr-1">
                {isKhmer ? "សំណួរគំរូ ៧-១២៖" : "Prompts 7–12:"}
              </span>
              <button
                type="button"
                onClick={() =>
                  handleTutorPrompt(
                    isKhmer
                      ? "របៀបគណនាដេរីវេ ថ្នាក់ទី ១២"
                      : "How to calculate derivatives for Grade 12",
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs shrink-0"
              >
                {isKhmer ? "📐 គណិត (ដេរីវេ ទី ១២)" : "📐 Math (Derivatives G12)"}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleTutorPrompt(
                    isKhmer ? "តើកោសិកាមានសមាសធាតុអ្វីខ្លះ?" : "What are the components of a cell?",
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs shrink-0"
              >
                {isKhmer ? "🔬 កោសិកា (ថ្នាក់ទី ៧)" : "🔬 Cell Biology (G7)"}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleTutorPrompt(
                    isKhmer
                      ? "របៀបតុល្យការសមីការគីមី ឌីប្លូម"
                      : "How to balance equations for Brevet",
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs shrink-0"
              >
                {isKhmer ? "🧪 តុល្យការសមីការ (ឌីប្លូម ទី ៩)" : "🧪 Equations (Brevet G9)"}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleTutorPrompt(
                    isKhmer ? "ពន្យល់ច្បាប់ទី២ ញូតុន" : "Explain Newton's Second Law",
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs shrink-0"
              >
                {isKhmer ? "⚡ ច្បាប់ទី២ ញូតុន (ទី ១២)" : "⚡ Newton's Law (G12)"}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleTutorPrompt(
                    isKhmer ? "វិភាគរឿងកុលាបប៉ៃលិន" : "Analysis of Kulap Pailin novel",
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs shrink-0"
              >
                {isKhmer ? "📖 ភាសាខ្មែរ (កុលាបប៉ៃលិន)" : "📖 Khmer Lit (Kulap Pailin)"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: NATIONAL LEAGUE LEADERBOARD */}
        {activeTab === "leaderboard" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                {isKhmer
                  ? "តារាងពិន្ទុសិស្សឆ្នើមថ្នាក់ជាតិ (Diamond League)"
                  : "National Diamond League Leaderboard"}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Top 5
              </span>
            </div>

            <div className="space-y-2">
              {[
                {
                  rank: 1,
                  name: "សុខ ចាន់ដារ៉ា (Sok Chandara)",
                  school: "វិទ្យាល័យ ព្រះស៊ីសុវត្ថិ",
                  xp: "1,450 XP",
                  streak: "24 ថ្ងៃ",
                },
                {
                  rank: 2,
                  name: "ម៉េង ស្រីពៅ (Meng Sreypov)",
                  school: "វិទ្យាល័យ បាក់ទូក",
                  xp: "1,320 XP",
                  streak: "18 ថ្ងៃ",
                },
                {
                  rank: 3,
                  name: "អ្នក (You — ScienceKH Student)",
                  school: "វិទ្យាល័យ ហ៊ុនសែន",
                  xp: "1,180 XP",
                  streak: "7 ថ្ងៃ",
                  highlight: true,
                },
                {
                  rank: 4,
                  name: "កែវ វិបុល (Keo Vibol)",
                  school: "វិទ្យាល័យ នេតយ៉ង់ (បាត់ដំបង)",
                  xp: "1,040 XP",
                  streak: "12 ថ្ងៃ",
                },
              ].map((student) => (
                <div
                  key={student.rank}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    student.highlight
                      ? "bg-emerald-50 border-emerald-400 font-bold text-emerald-950 shadow-xs"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-extrabold text-sm text-slate-500">
                      #{student.rank}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{student.name}</p>
                      <p className="text-[10px] text-slate-500 font-normal">{student.school}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className="text-amber-600 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      {student.streak}
                    </span>
                    <span className="text-emerald-700">{student.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Console Bottom Action Bar */}
      <div className="bg-slate-100/90 px-4 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center sm:justify-between gap-2.5 text-center sm:text-left text-xs text-slate-600">
        <span className="font-medium text-[11px] sm:text-xs">
          {isKhmer
            ? "សាកល្បងដោយផ្ទាល់គ្រប់កម្រិតថ្នាក់ (៧-១២) ដោយមិនបាច់ចុះឈ្មោះ"
            : "Test any grade (7–12) interactively — no registration required"}
        </span>
        <a
          href="/auth?mode=signup"
          className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0 text-xs sm:text-xs"
        >
          <span>{isKhmer ? "ចូលរៀនផ្លូវការ" : "Start Full Course"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
