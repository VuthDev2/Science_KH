// ==============================================================================
// ScienceKH — Schema.org JSON-LD Structured Data Generators
// Powers Google Rich Snippets (Courses, Educational Apps, Breadcrumbs, Exam Archives)
// ==============================================================================

import { SITE_CONFIG } from "./constants";

/**
 * 1. Global Educational Organization & Brand Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/favicon.svg`,
    image: SITE_CONFIG.defaultOgImage,
    description: SITE_CONFIG.descriptionKm,
    email: SITE_CONFIG.contactEmail,
    sameAs: [
      "https://facebook.com/sciencekh",
      "https://t.me/sciencekh",
      "https://twitter.com/sciencekh",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "KH",
      addressLocality: "Phnom Penh",
    },
    educationalCredentialAwarded: "Cambodian MoEYS High School Diploma Preparation",
  };
}

/**
 * 2. Educational Application Schema (Mobile PWA & Web Platform)
 */
export function generateEducationalAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    name: SITE_CONFIG.name,
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS, Android, Web",
    url: SITE_CONFIG.siteUrl,
    inLanguage: ["km", "en"],
    description: SITE_CONFIG.descriptionKm,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    educationalUse: "Interactive STEM Learning, Bac II Exam Preparation, Homework Tutoring",
    typicalAgeRange: "12-18",
    educationalLevel: [
      "Secondary Education (Grades 7–9 / Brevet)",
      "Upper Secondary Education (Grades 10–12 / Bac II)",
    ],
    publisher: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
  };
}

/**
 * 3. MoEYS Subject Course Schema
 */
export interface CourseSchemaParams {
  title: string;
  description: string;
  subject: string;
  grade: number;
  url: string;
}

export function generateCourseSchema({
  title,
  description,
  subject,
  grade,
  url,
}: CourseSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    url,
    inLanguage: "km",
    provider: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    educationalLevel: `Grade ${grade} (ថ្នាក់ទី ${grade})`,
    about: {
      "@type": "Thing",
      name: subject,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT15M", // 15-minute bite-sized lessons
    },
  };
}

/**
 * 4. Official MoEYS Exam Archive Schema (Past Papers Bank)
 */
export function generateExamArchiveSchema(totalPapers = 114, yearRange = "2018–2026") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "បណ្ណសារវិញ្ញាសាប្រឡងបាក់ឌុប & ឌីប្លូម MoEYS",
    description: `កម្រងវិញ្ញាសាប្រឡងផ្លូវការក្រសួងអប់រំ យុវជន និងកីឡា ចំនួន ${totalPapers} វិញ្ញាសា (${yearRange}) ជាមួយអត្រាកំណែផ្លូវការ។`,
    url: `${SITE_CONFIG.siteUrl}/exams`,
    numberOfItems: totalPapers,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
  };
}

/**
 * 5. STEM Fundamentals Warehouse Schema (Pinyin/Hanzi style Codex)
 */
export function generateStemVocabularySchema(itemCount = 60) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "ឃ្លាំងមូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រ STEM (ScienceKH Codex)",
    description:
      "បណ្ណាល័យនិមិត្តសញ្ញា ខ្នាត SI ធាតុគីមី អ៊ីយ៉ុង និងរូបមន្តគន្លឹះគណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា និងជីវវិទ្យា",
    url: `${SITE_CONFIG.siteUrl}/reference`,
    inLanguage: ["km", "en"],
    hasDefinedTerm: [
      {
        "@type": "DefinedTerm",
        termCode: "lambda",
        name: "ឡាំដា (Lambda - λ)",
        description: "ប្រវែងរលកក្នុងរូបវិទ្យា (Wavelength, λ = v/f)",
        inDefinedTermSet: `${SITE_CONFIG.siteUrl}/reference`,
      },
      {
        "@type": "DefinedTerm",
        termCode: "so4",
        name: "ស៊ុលផាត (Sulfate - SO4²⁻)",
        description: "រ៉ាឌីកាល់ស៊ុលផាត អ៊ីយ៉ុងបន្ទុកអវិជ្ជមាន ២-",
        inDefinedTermSet: `${SITE_CONFIG.siteUrl}/reference`,
      },
    ],
  };
}

/**
 * 6. Breadcrumb Trail Schema for Google Search Hierarchy
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : `${SITE_CONFIG.siteUrl}${crumb.item}`,
    })),
  };
}
