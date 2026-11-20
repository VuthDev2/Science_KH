import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { SocialProofStrip } from "@/components/landing/social-proof-strip";
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section";
import { FeaturesBentoGrid } from "@/components/landing/features-bento-grid";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CurriculumSection } from "@/components/landing/curriculum-section";
import { ExamPrepSection } from "@/components/landing/exam-prep-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { MobileWelcomeScreen } from "@/components/landing/mobile-welcome-screen";
import { isNativeApp } from "@/lib/native-mobile";
import { landingI18n } from "@/components/landing/i18n";
import type { SupportedLanguage } from "@/components/landing/types";
import { JsonLd } from "@/components/seo/json-ld";
import { generateEducationalAppSchema } from "@/lib/seo/schema-generator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScienceKH — MoEYS Curriculum Learning Platform for Cambodian Grade 7–12" },
      {
        name: "description",
        content:
          "Master all 10 MoEYS curriculum subjects: Mathematics, Physics, Chemistry, Biology, Earth Science, Khmer Literature, English, ICT, History, and Geography for Cambodian Grades 7–12 with bite-sized lessons, Kru Vuth AI tutor, and Brevet/BacII past papers.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { user, loading } = useAuth();
  const [lang, setLang] = useState<SupportedLanguage>("km");
  const copy = landingI18n[lang];
  const isKhmer = lang === "km";

  if (!loading && user) {
    return <Navigate to="/home" />;
  }

  // Mobile App Experience (Duolingo Flow):
  // When running on iOS / Android app (Capacitor), show the clean Mobile Welcome & Onboarding screen
  // instead of the desktop marketing website.
  if (isNativeApp()) {
    return <MobileWelcomeScreen />;
  }

  return (
    <div
      lang={lang}
      className="min-h-screen bg-white text-slate-900 antialiased font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden"
    >
      {/* Schema.org Educational Application Structured Data for SEO */}
      <JsonLd data={generateEducationalAppSchema()} />

      {/* 1. Dismissible Announcement Bar */}
      <AnnouncementBar copy={copy.announcement} />

      {/* 2. Sticky Navbar with Mobile Drawer & Language Toggle */}
      <Navbar copy={copy.nav} currentLang={lang} onLanguageChange={setLang} />

      {/* 3. Hero Section with Live Interactive Console (Quiz, Path, AI Tutor, Leaderboard) */}
      <HeroSection copy={copy.hero} isKhmer={isKhmer} />

      {/* 4. Social Proof Strip */}
      <SocialProofStrip copy={copy.socialProof} />

      {/* 5. Problem → Solution 4-Card Comparison Grid */}
      <ProblemSolutionSection copy={copy.problemSolution} />

      {/* 6. Features Bento Grid (with Playable Bilingual Vocabulary Matcher) */}
      <FeaturesBentoGrid copy={copy.features} isKhmer={isKhmer} />

      {/* 7. How It Works 3-Step Flow */}
      <HowItWorksSection copy={copy.howItWorks} />

      {/* 8. Grade 7–12 Curriculum & 4 Disciplines Explorer */}
      <CurriculumSection copy={copy.curriculum} isKhmer={isKhmer} />

      {/* 9. National Exam Prep Hub (Brevet & BacII) */}
      <ExamPrepSection copy={copy.examPrep} isKhmer={isKhmer} />

      {/* 10. Honest Pricing & Private Tutoring Cost Comparison Table */}
      <PricingSection copy={copy.pricing} isKhmer={isKhmer} />

      {/* 11. Accessible FAQ Accordion */}
      <FaqSection copy={copy.faq} />

      {/* 12. Final CTA Band & Footer */}
      <Footer
        ctaCopy={copy.cta}
        footerCopy={copy.footer}
        currentLang={lang}
        onLanguageChange={setLang}
      />
    </div>
  );
}
