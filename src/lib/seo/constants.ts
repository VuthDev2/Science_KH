// ==============================================================================
// ScienceKH — Search Engine Optimization (SEO) Metadata & Constants
// Optimized for Google Search, Facebook OpenGraph, X (Twitter) Cards, and MoEYS indexing.
// ==============================================================================

export const SITE_CONFIG = {
  name: "ScienceKH",
  legalName: "ScienceKH STEM Platform Cambodia",
  taglineKm: "វេទិកាសិក្សា STEM & បណ្ណសារវិញ្ញាសាជាតិ MoEYS ថ្នាក់ទី ៧–១២",
  taglineEn: "MoEYS National STEM Curriculum & Exam Archive Grades 7–12",
  descriptionKm:
    "ស្វែងយល់ និងរៀនសូត្រមុខវិជ្ជាវិទ្យាសាស្ត្រ (គណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា) ថ្នាក់ទី ៧ ដល់ ១២ ជាមួយមេរៀនសង្ខេប វិញ្ញាសាបាក់ឌុបផ្លូវការ MoEYS និងគ្រូជំនួយ AI វុឌ្ឍ។",
  descriptionEn:
    "Master Cambodian MoEYS Grade 7–12 STEM curriculum: Mathematics, Physics, Chemistry, and Biology with interactive bite-sized lessons, official Bac II past exam papers, and Kru Vuth AI tutor.",
  siteUrl:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.VITE_APP_URL || "https://sciencekh.com",
  defaultOgImage: "https://sciencekh.com/assets/og-preview.png",
  twitterHandle: "@sciencekh",
  localeKm: "km_KH",
  localeEn: "en_US",
  themeColor: "#059669",
  author: "ScienceKH Team & MoEYS Educators",
  contactEmail: "support@sciencekh.com",
} as const;
