export type SupportedLanguage = "km" | "en";

export interface LandingCopy {
  meta: {
    title: string;
    description: string;
  };
  announcement: {
    badge: string;
    text: string;
    cta: string;
    dismissAria: string;
  };
  nav: {
    features: string;
    howItWorks: string;
    curriculum: string;
    examPrep: string;
    pricing: string;
    faq: string;
    signIn: string;
    getStarted: string;
    languageToggleAria: string;
    menuToggleAria: string;
    closeMenuAria: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustMoEYS: string;
    trustLevels: string;
    trustBilingual: string;
    demoTabs: {
      quiz: string;
      roadmap: string;
      tutor: string;
      leaderboard: string;
    };
  };
  socialProof: {
    label: string;
    stats: Array<{
      value: string;
      label: string;
      note?: string;
    }>;
  };
  problemSolution: {
    badge: string;
    title: string;
    subtitle: string;
    problemLabel?: string;
    solutionLabel?: string;
    items: Array<{
      id: string;
      category?: string;
      problemTitle: string;
      problemDesc: string;
      solutionTitle: string;
      solutionDesc: string;
      solutionHighlight?: string;
    }>;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    roadmap: {
      title: string;
      desc: string;
      tag: string;
    };
    streaks: {
      title: string;
      desc: string;
      tag: string;
    };
    hearts: {
      title: string;
      desc: string;
      tag: string;
    };
    tutor: {
      title: string;
      desc: string;
      tag: string;
    };
    vocab: {
      title: string;
      desc: string;
      tag: string;
    };
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
  };
  curriculum: {
    badge: string;
    title: string;
    subtitle: string;
    gradeLabel: string;
    grades: number[];
    disciplines: Array<{
      id: string;
      name: string;
      nameAlt: string;
      desc: string;
      topics: string[];
    }>;
  };
  examPrep: {
    badge: string;
    title: string;
    subtitle: string;
    brevet: {
      title: string;
      target: string;
      desc: string;
      features: string[];
    };
    bacii: {
      title: string;
      target: string;
      desc: string;
      features: string[];
    };
    cta: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    freePlan: {
      name: string;
      price: string;
      period: string;
      desc: string;
      features: string[];
      cta: string;
    };
    comparison: {
      title: string;
      scienceKhName: string;
      extraClassName: string;
      rows: Array<{
        feature: string;
        scienceKh: string;
        extraClass: string;
      }>;
    };
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    badge?: string;
    title: string;
    subtitle: string;
    button: string;
    secondaryButton?: string;
    trustCheck1?: string;
    trustCheck2?: string;
    trustCheck3?: string;
  };
  footer: {
    brandTagline: string;
    coverageTag?: string;
    sections: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
    builtWith?: string;
    rights: string;
  };
}
