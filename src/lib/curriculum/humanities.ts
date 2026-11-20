// ==============================================================================
// ScienceKH — Official Cambodian MoEYS Languages, Social Sciences & Tech Bank
// Complete curriculum coverage across Khmer Literature, English, History,
// Geography, ICT & Computing, and Moral & Civics (Grades 7–12)
// Aligned with the National Ministry of Education, Youth and Sport Standards
// ==============================================================================

import { CuratedLesson, SUBJECT_METADATA } from "./types";

export const HUMANITIES_LESSONS: CuratedLesson[] = [
  // ============================================================================
  // GRADE 7 — HUMANITIES, LANGUAGES & TECH
  // ============================================================================
  {
    id: "les-g7-khmer-01",
    grade: 7,
    sort_order: 101,
    title_km: "កាព្យឃ្លោងខ្មែរ (បទកាកគតិ និងបទពាក្យ ៧)",
    title_en: "Khmer Poetic Meters (Kak-Kati & 7-Syllable Meter)",
    summary_km: "សិក្សាចង្វាក់ ចំនួនព្យាង្គ និងចំណាប់ចុងចួននៃបទកាកគតិ និងបទពាក្យប្រាំពីរ",
    summary_en: "Rhythm, syllable counts, and rhyme schemes in traditional Khmer poetry",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g7-khmer-01" },
    body_km: `## ១. បទកាកគតិ (៧ ឃ្លាក្នុងមួយល្បះ)
បទកាកគតិមាន ៧ ឃ្លាក្នុងមួយល្បះ ហើយឃ្លានីមួយៗមាន ៤ ព្យាង្គ (សរុប ២៨ ព្យាង្គ)៖
- **ឃ្លាទី១** ចួននឹង **ឃ្លាទី២** (ព្យាង្គទី៤ ចួននឹងព្យាង្គទី៤)
- **ឃ្លាទី២** ចួននឹង **ឃ្លាទី៣** (ព្យាង្គទី៤ ចួននឹងព្យាង្គទី២)
- **ឃ្លាទី៥** ចួននឹង **ឃ្លាទី៦** (ព្យាង្គទី៤ ចួននឹងព្យាង្គទី៤)
- **ឃ្លាទី៧** ចួននឹងឃ្លាទី២ នៃល្បះបន្ទាប់ (ចំណាប់ចួនឆ្លងល្បះ)

## ២. បទពាក្យ ៧
បទពាក្យ ៧ មាន ៤ ឃ្លាក្នុងមួយល្បះ ឃ្លានីមួយៗមាន ៧ ព្យាង្គ (សរុប ២៨ ព្យាង្គ)៖
- ព្យាង្គទី៧ នៃឃ្លាទី១ ចួននឹងព្យាង្គទី៤ នៃឃ្លាទី២
- ព្យាង្គទី៧ នៃឃ្លាទី២ ចួននឹងព្យាង្គទី៧ នៃឃ្លាទី៣ និងព្យាង្គទី៤ នៃឃ្លាទី៤`,
    body_en: `## 1. Kak-Kati Poetic Form
The Kak-Kati meter consists of 7 phrases of 4 syllables each (28 syllables total per stanza).

## 2. 7-Syllable Meter (Pathya Vat)
Contains 4 lines of 7 syllables each with strict internal and external rhyme schemes.`,
  },
  {
    id: "les-g7-khmer-02",
    grade: 7,
    sort_order: 102,
    title_km: "ថ្នាក់ពាក្យ នាម កិរិយា និងគុណនាម",
    title_en: "Parts of Speech: Nouns, Verbs & Adjectives",
    summary_km: "ការបែងចែកថ្នាក់ពាក្យ និងមុខងារវេយ្យាករណ៍ក្នុងប្រយោគភាសាខ្មែរ",
    summary_en: "Classification of word classes and syntactic roles in Khmer grammar",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g7-khmer-02" },
    body_km: `## ១. នាម (Nouns)
នាម គឺជាពាក្យសម្រាប់សម្គាល់ឈ្មោះមនុស្ស សត្វ វត្ថុ ឬគំនិតអរូបី (ដូចជា៖ សិស្ស, ផ្ទះ, សៀវភៅ, សេចក្តីស្រឡាញ់)។

## ២. កិរិយាស័ព្ទ (Verbs)
កិរិយា បញ្ជាក់ពីសកម្មភាព ឬដំណើរប្រព្រឹត្តទៅ (ដូចជា៖ រៀន, ដើរ, សរសេរ, គិត)។

## ៣. គុណនាម (Adjectives)
គុណនាម បញ្ជាក់លក្ខណៈរបស់នាម (ដូចជា៖ ឆ្លាត, ស្អាត, ខ្ពស់, ធំ)។ ក្នុងភាសាខ្មែរ គុណនាមតែងតែនៅ **ខាងក្រោយ** នាម។`,
    body_en: `## 1. Khmer Word Classes
Nouns name people and concepts. Verbs denote actions. In Khmer syntax, adjectives strictly follow the noun they modify.`,
  },
  {
    id: "les-g7-hist-01",
    grade: 7,
    sort_order: 103,
    title_km: "បុរេប្រវត្តិសាស្ត្រកម្ពុជា (ស្ថានីយល្អាងស្ពាន និងសំរោងសែន)",
    title_en: "Cambodian Prehistory: Laang Spean & Samrong Sen",
    summary_km: "ភស្តុតាងបុរាណវិទ្យាអំពីមនុស្សសម័យថ្មបំបែក ថ្មរំលីង និងយុគសំរឹទ្ធនៅកម្ពុជា",
    summary_en: "Archaeological evidence of Paleolithic, Neolithic, and Bronze ages in Cambodia",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g7-hist-01" },
    body_km: `## ១. ស្ថានីយល្អាងស្ពាន (ខេត្តបាត់ដំបង)
ស្ថានីយល្អាងស្ពានផ្តល់ភស្តុតាងនៃការរស់នៅរបស់មនុស្សតាំងពីប្រមាណ ៧០០០ ឆ្នាំមុនគ.ស. (សម័យហ័រពិញៀន) ដោយរកឃើញឧបករណ៍ថ្មបំបែក និងសំណល់ឆ្អឹងសត្វ។

## ២. ស្ថានីយសំរោងសែន (ខេត្តកំពង់ឆ្នាំង)
ស្ថានីយសំរោងសែនជាកន្លែងរកឃើញឧបករណ៍យុគថ្មរំលីង និងយុគសំរឹទ្ធ រួមមានក្អម ឆ្នាំងដី ពូថៅថ្មរំលីង និងឧបករណ៍ធ្វើពីលោហៈធាតុសំរឹទ្ធ។`,
    body_en: `## 1. Laang Spean Archaeological Site
Discovered in Battambang province, revealing Hoabinhian stone tool culture dating back over 7,000 BCE.

## 2. Samrong Sen Neolithic Site
Located in Kampong Chhnang, providing evidence of early pottery, polished stone adzes, and bronze metallurgy.`,
  },
  {
    id: "les-g7-hist-02",
    grade: 7,
    sort_order: 104,
    title_km: "នគរភ្នំ (ហ្វូណន)៖ ការកកើត និងពាណិជ្ជកម្មកំពង់ផែអូរកែវ",
    title_en: "Funan Kingdom: Origins & Oc Eo Maritime Trade",
    summary_km: "ការកកើតរដ្ឋដំបូងនៅកម្ពុជា ទំនាក់ទំនងពាណិជ្ជកម្មជាមួយឥណ្ឌានិងរ៉ូម និងប្រព័ន្ធធារាសាស្ត្រ",
    summary_en: "Establishment of Cambodia's earliest recorded state, maritime trade through Oc Eo, and early irrigation",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g7-hist-02" },
    body_km: `## ១. ការកកើតរដ្ឋនគរភ្នំ (សតវត្សទី១ ដល់ ទី៦ នៃ គ.ស.)
តាមកំណត់ត្រាប្រវត្តិសាស្ត្រចិន (កាំងថាយ និងជូយីន) នគរភ្នំត្រូវបានកកើតឡើងដោយការរួបរួមរវាងព្រះថោង (ហ៊ុនទៀន) និងនាងនាគ (លីវយី)។ នេះជារដ្ឋដំបូងបង្អស់ដែលមានរចនាសម្ព័ន្ធរដ្ឋបាលច្បាស់លាស់នៅអាស៊ីអាគ្នេយ៍ដីគោក។

## ២. កំពង់ផែអូរកែវ និងបណ្តាញពាណិជ្ជកម្មអន្តរជាតិ
- **កំពង់ផែអូរកែវ** គឺជាមជ្ឈមណ្ឌលពាណិជ្ជកម្មអន្តរជាតិដ៏រុងរឿង តភ្ជាប់ផ្លូវសមុទ្ររវាងប្រទេសចិន ឥណ្ឌា និងចក្រភពរ៉ូម (រកឃើញកាក់ប្រាក់រ៉ូម៉ាំង និងគ្រឿងអលង្ការមាស)។
- ប្រជាជននគរភ្នំចេះជីកប្រឡាយធារាសាស្ត្រខ្វាត់ខ្វែងដើម្បីរំដោះទឹកជំនន់ និងដឹកជញ្ជូនទំនិញតាមទូក។`,
    body_en: `## 1. Establishment of Funan (1st - 6th Century CE)
Recorded by Chinese emissaries Kang Tai and Zhu Ying, Funan emerged as Southeast Asia's first centralized polity, founded through the union of Huntian (Preah Thong) and Liuye (Neang Neak).

## 2. Oc Eo Maritime Port
Oc Eo was a major cosmopolitan entrepot on maritime trade routes linking China, India, and the Roman Empire, yielding Roman medallions and gold artifacts.`,
  },
  {
    id: "les-g7-geo-01",
    grade: 7,
    sort_order: 104,
    title_km: "ភូមិសាស្ត្ររូបវន្តកម្ពុជា (ទន្លេមេគង្គ និងបឹងទន្លេសាប)",
    title_en: "Physical Geography of Cambodia: Mekong & Tonle Sap",
    summary_km: "ប្រព័ន្ធធារាសាស្ត្រធម្មជាតិ របបទឹកហូរច្រាសទិស និងជីវចម្រុះបឹងទន្លេសាប",
    summary_en: "Hydrological systems, reverse flow mechanics, and Tonle Sap biosphere",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g7-geo-01" },
    body_km: `## ១. ទន្លេមេគង្គនៅកម្ពុជា
ទន្លេមេគង្គហូរកាត់កម្ពុជាប្រវែងប្រមាណ ៥០០ គីឡូម៉ែត្រ ចាប់ពីព្រំដែនឡាវ (ល្បាក់ខោន) កាត់ខេត្តស្ទឹងត្រែង ក្រចេះ កំពង់ចាម កណ្តាល និងភ្នំពេញ។

## ២. បាតុភូតទឹកហូរច្រាសទិសនៃបឹងទន្លេសាប
នៅរដូវវស្សា (ឧសភា-តុលា) ទឹកទន្លេមេគង្គឡើងខ្ពស់ ហូរច្រាសចូលបឹងទន្លេសាប ធ្វើឱ្យផ្ទៃក្រឡាបឹងរីកធំដល់ទៅ ៥ ដង (ពី ៣០០០ គម² ដល់ ១៥០០០ គម²)។ នៅរដូវប្រាំង ទឹកហូរត្រឡប់ចេញទៅទន្លេមេគង្គវិញ។`,
    body_en: `## 1. Mekong River in Cambodia
Traverses approximately 500 km through Cambodia, providing rich alluvial sediment.

## 2. Tonle Sap Reverse Flow Phenomenon
During the monsoon season, high Mekong water forces the Tonle Sap River to flow backward into the great lake, expanding its area up to fivefold.`,
  },
  {
    id: "les-g7-geo-02",
    grade: 7,
    sort_order: 106,
    title_km: "សណ្ឋានដី និងអាកាសធាតុកម្ពុជា (ជួរភ្នំក្រវាញ ដងរែក និងខ្យល់មូសុង)",
    title_en: "Landforms & Climate: Cardamom Mountains & Monsoons",
    summary_km: "ការបែងចែកតំបន់ភូមិសាស្ត្រធំៗទាំង ៤ នៃកម្ពុជា និងរបបខ្យល់មូសុងប្រចាំឆ្នាំ",
    summary_en: "Four major physiographic regions: Cardamom & Dangrek ranges, plains, coastal zone, and monsoons",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g7-geo-02" },
    body_km: `## ១. សណ្ឋានដីនៃប្រទេសកម្ពុជា (បែងចែកជា ៤ តំបន់)
- **តំបន់ទំនាបកណ្តាល៖** គ្របដណ្តប់ផ្ទៃដីធំជាងគេ សម្បូរដីល្បាប់មានជីជាតិជុំវិញបឹងទន្លេសាប និងទន្លេមេគង្គ (ជង្រុកស្រូវជាតិ)។
- **តំបន់ខ្ពង់រាប និងភ្នំជុំវិញ៖** រួមមានជួរភ្នំក្រវាញ (ភ្នំឱរ៉ាល់ កម្ពស់ ១៨១៣ម ខ្ពស់ជាងគេនៅកម្ពុជា) ជួរភ្នំដងរែកនៅភាគខាងជើង និងខ្ពង់រាបឦសាន។
- **តំបន់ឆ្នេរសមុទ្រ៖** លាតសន្ធឹងតាមបណ្តោយខេត្តកោះកុង ព្រះសីហនុ កំពត និងកែប ប្រវែង ៤៤០ គីឡូម៉ែត្រ។

## ២. របបខ្យល់មូសុង (អាកាសធាតុត្រូពិចក្តៅហើយសើម)
- **មូសុងនិរតី (ឧសភា ដល់ តុលា)៖** នាំមកនូវពពកទឹកភ្លៀង និងសំណើមខ្ពស់ (រដូវវស្សា)។
- **មូសុងឦសាន (វិច្ឆិកា ដល់ មេសា)៖** នាំមកនូវខ្យល់ស្ងួត ត្រជាក់ក្នុងខែធ្នូ-មករា និងក្តៅខ្លាំងក្នុងខែមីនា-មេសា (រដូវប្រាំង)។`,
    body_en: `## 1. Cambodia's Physiographic Zones
Cambodia features 4 primary domains: the central alluvial floodplain (Mekong-Tonle Sap basin), the surrounding highlands (Cardamom Mountains with Mt. Aural at 1,813m, Dangrek Escarpment), and the 440km Gulf of Thailand coastline.

## 2. Tropical Monsoon Climate
Driven by the Southwest Monsoon (May-Oct: heavy rain, high humidity) and Northeast Monsoon (Nov-Apr: dry season with cooler nights and warm days).`,
  },
  {
    id: "les-g7-eng-01",
    grade: 7,
    sort_order: 105,
    title_km: "Present Simple Tense & Daily Routines",
    title_en: "Present Simple Tense & Daily Routines",
    summary_km: "ការប្រើប្រាស់កាលបច្ចុប្បន្នកាលធម្មតា វិធានបំប្លែងកិរិយា និងប្រយោគបដិសេធ",
    summary_en: "Present simple usage, third-person singular inflection, and interrogative/negative forms",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g7-eng-01" },
    body_km: `## 1. Form & Usage of Present Simple
Used for daily habits, general facts, and routines:
- **Affirmative:** Subject + Verb (s/es with He/She/It)
  - *Example:* She studies science every day.
- **Negative:** Subject + do/does not + Base Verb
  - *Example:* They do not play football on Monday.
- **Question:** Do/Does + Subject + Base Verb?
  - *Example:* Does he speak Khmer?`,
    body_en: `## Present Simple Tense
Describes habits, universal truths, and scheduled routines. Remember to append -s/-es for third-person singular subjects (he, she, it).`,
  },
  {
    id: "les-g7-eng-02",
    grade: 7,
    sort_order: 108,
    title_km: "Past Simple Tense: School Days & Personal Narratives",
    title_en: "Past Simple Tense: School Days & Personal Narratives",
    summary_km: "ការប្រើប្រាស់ Past Simple កិរិយាស័ព្ទប្រក្រតី/មិនប្រក្រតី និងការរៀបរាប់ព្រឹត្តិការណ៍កន្លងផុត",
    summary_en: "Past simple structures, regular (-ed) and irregular verbs, and conversational narrative past",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g7-eng-02" },
    body_km: `## 1. Past Simple: Form & Usage
Used to express actions that started and finished at a definite time in the past.

### Regular Verbs (+ed / +d)
- *play → played*, *study → studied*, *visit → visited*
- *Example:* "Sophea visited the National Museum yesterday."

### Irregular Verbs (Stem Changes)
- *go → went*, *see → saw*, *write → wrote*, *buy → bought*
- *Example:* "They went to Siem Reap during the Water Festival."

## 2. Negative & Question Forms
- **Negative:** *Subject + did not (didn't) + base verb*
  - "I did not forget my homework."
- **Question:** *Did + subject + base verb...?*
  - "Did you finish the science experiment?" (Yes, I did. / No, I didn't.)`,
    body_en: `## Past Simple Structure & Conversational Usage
Master regular inflection rules (-ed) and high-frequency irregular forms (went, saw, wrote) with didactic sentence patterns.`,
  },
  {
    id: "les-g7-ict-01",
    grade: 7,
    sort_order: 106,
    title_km: "កុំព្យូទ័រ និងប្រព័ន្ធប្រតិបត្តិការ (Hardware & OS)",
    title_en: "Computer Hardware & Operating Systems",
    summary_km: "សមាសភាគរឹង (CPU, RAM, Storage) និងតួនាទីនៃប្រព័ន្ធប្រតិបត្តិការ",
    summary_en: "Hardware components (CPU, RAM, SSD) and operating system architecture",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g7-ict-01" },
    body_km: `## ១. សមាសភាគរឹងកុំព្យូទ័រ (Hardware)
- **CPU (Central Processing Unit):** ខួរក្បាលកុំព្យូទ័រសម្រាប់ដំណើរការពាក្យបញ្ជា
- **RAM (Random Access Memory):** អង្គចងចាំបណ្តោះអាសន្នមានល្បឿនលឿន
- **Storage (SSD / HDD):** អង្គចងចាំផ្ទុកទិន្នន័យអចិន្ត្រៃយ៍
- **Input/Output Devices:** ក្តារចុច (Keyboard), កណ្ដុរ (Mouse), អេក្រង់ (Monitor)

## ២. ប្រព័ន្ធប្រតិបត្តិការ (Operating System)
ប្រព័ន្ធប្រតិបត្តិការ (Windows, macOS, Linux, Android) ដើរតួជាស្ពានភ្ជាប់រវាងអ្នកប្រើប្រាស់ កម្មវិធី និងផ្នែករឹងកុំព្យូទ័រ។`,
    body_en: `## 1. Hardware Architecture
CPU executes machine instructions. RAM provides volatile high-speed scratch space. Solid-state drives provide persistent storage.

## 2. Operating Systems
The OS manages hardware allocation, file systems, process scheduling, and user interfaces.`,
  },
  {
    id: "les-g7-ict-02",
    grade: 7,
    sort_order: 110,
    title_km: "ការវាយអក្សរខ្មែរយូនីកូដ និងការរៀបចំឯកសារ (Word Processing)",
    title_en: "Khmer Unicode Typing & Word Processing",
    summary_km: "ប្លង់ក្តារចុចខ្មែរយូនីកូដ ស្រៈពេញតួ ជើងអក្សរ (Coeng) និងការរៀបចំទម្រង់ឯកសារ",
    summary_en: "Khmer Unicode keyboard layout, subscript consonants (Coeng key), and document layout formatting",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g7-ict-02" },
    body_km: `## ១. ប្លង់ក្តារចុចខ្មែរយូនីកូដ (Khmer Unicode Layout)
- **ការវាយព្យញ្ជនៈ និងស្រៈ៖** ប្រើពុម្ពអក្សរស្ដង់ដារ (Khmer OS Battambang, Khmer OS Siemreap)
- **ការវាយជើងអក្សរ (Subscript Consonant):** ត្រូវចុចកូនសោ **'j' (Coeng)** ជាមុនសិន រួចចុចព្យញ្ជនៈដែលត្រូវធ្វើជាជើង (ឧ. 'k' + 'j' + 'n' = ក្ន)។
- **ស្រៈពេញតួ (Independent Vowels):** ដូចជា ឰ, ឪ, ឫ, ឬ ប្រើគ្រាប់ចុចជាក់លាក់ (Shift + Key)។

## ២. ការរៀបចំទម្រង់ឯកសារអត្ថបទ (Formatting)
- កំណត់ទំហំក្រដាស A4 រឹមទំព័រ (Margins: 2.54cm គ្រប់ជ្រុង)
- កំណត់ទំហំអក្សរចំណងជើង (14pt Bold) និងតួសេចក្តី (12pt Regular) ជាមួយគម្លាតបន្ទាត់ 1.15 lines។`,
    body_en: `## Khmer Unicode Standard Typing
Explains the dedicated subscript generator key ('j' for Coeng), vowel combinations, and standard MoEYS typographical formatting principles in word processors.`,
  },
  {
    id: "les-g7-moral-01",
    grade: 7,
    sort_order: 107,
    title_km: "សីលធម៌ក្នុងគ្រួសារ និងសាលារៀន",
    title_en: "Ethics in Family & School Community",
    summary_km: "ការដឹងគុណមាតាបិតា ការគោរពលោកគ្រូអ្នកគ្រូ និងច្បាប់សីលធម៌រស់នៅប្រចាំថ្ងៃ",
    summary_en: "Filial piety, respect for teachers, and fundamental civic duties in school and family",
    xp_reward: 35,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g7-moral-01" },
    body_km: `## ១. សីលធម៌ក្នុងគ្រួសារ
គ្រួសារជាកោសិកាដំបូងនៃសង្គម។ កូនល្អត្រូវមានកតញ្ញូតាធម៌ (ការដឹងគុណ និងតបស្នងសងគុណមាតាបិតា) ជួយការងារផ្ទះ និងគោរពដំបូន្មានឪពុកម្តាយ។

## ២. សីលធម៌ក្នុងសាលារៀន
សាលារៀនជាថ្នាលបណ្តុះចំណេះវិជ្ជា និងចរិយាសម្បត្តិ៖
- គោរពវិន័យសាលារៀន មកឱ្យទាន់ពេល
- គោរពគ្រូបង្រៀន និងយកចិត្តទុកដាក់ស្តាប់ការពន្យល់
- រក្សាសាមគ្គីភាព និងជួយយកអាសាគ្នាក្នុងចំណោមមិត្តភក្តិ។`,
    body_en: `## Family & School Ethics
Family forms society's foundation. Cultivating filial piety, disciplined study habits, and mutual respect builds character.`,
  },
  {
    id: "les-g7-moral-02",
    grade: 7,
    sort_order: 112,
    title_km: "សិទ្ធិកុមារ និងកាតព្វកិច្ចពលរដ្ឋក្នុងសាលារៀន",
    title_en: "Child Rights & Student Civic Duty",
    summary_km: "សិទ្ធិជាមូលដ្ឋានទាំងបួនរបស់កុមារ សមភាពយេនឌ័រ និងការថែរក្សាទ្រព្យសម្បត្តិសាធារណៈ",
    summary_en: "Four core pillars of child rights (UNCRC), gender equity, and stewardship of public property",
    xp_reward: 35,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g7-moral-02" },
    body_km: `## ១. សិទ្ធិជាមូលដ្ឋានទាំង ៤ របស់កុមារ (អនុសញ្ញា UNCRC)
១. **សិទ្ធិរស់រានមានជីវិត (Survival):** ទទួលបានអាហារូបត្ថម្ភ ការថែទាំសុខភាព និងទីជម្រកសុវត្ថិភាព។
២. **សិទ្ធិទទួលបានការអភិវឌ្ឍ (Development):** ទទួលបានការអប់រំប្រកបដោយគុណភាព និងការលេងកម្សាន្ត។
៣. **សិទ្ធិទទួលបានការការពារ (Protection):** ពីអំពើហិង្សា ការរំលោភបំពាន និងការកេងប្រវ័ញ្ចកម្លាំងពលកម្ម។
៤. **សិទ្ធិក្នុងការចូលរួម (Participation):** បញ្ចេញមតិយោបល់ និងចូលរួមក្នុងសកម្មភាពសង្គម។

## ២. កាតព្វកិច្ចសិស្សក្នុងសាលារៀន
- គោរពបទបញ្ជាផ្ទៃក្នុងរបស់សាលា និងថែរក្សាបរិស្ថានស្អាត (គ្មានសំរាម)
- ស្រឡាញ់សមភាពយេនឌ័រ មិនរើសអើង និងជួយការពារសិស្សពិការ ឬខ្វះខាត។`,
    body_en: `## Four Pillars of Children's Rights
Detailing survival, holistic development, safety protection, and active civic participation, balanced with reciprocal student responsibilities in schools.`,
  },

  // ============================================================================
  // GRADE 8 — HUMANITIES, LANGUAGES & TECH
  // ============================================================================
  {
    id: "les-g8-khmer-01",
    grade: 8,
    sort_order: 101,
    title_km: "រឿងទុំទាវ (ស្នាដៃភិក្ខុសោម - ការវិភាគតួអង្គ)",
    title_en: "Tum Teav Literature Analysis (Characters & Society)",
    summary_km: "ការវិភាគតួអង្គទុំ ទាវ នោ ម៉ឺនងួន យាយផាន់ និងទំនាស់រវាងស្នេហានិងប្រពៃណី",
    summary_en: "Character analysis of Tum, Teav, No, and societal conflicts between love and feudal tradition",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g8-khmer-01" },
    body_km: `## ១. សាវតានៃរឿងទុំទាវ
រឿងទុំទាវ និពន្ធដោយ **ភិក្ខុសោម** នៅឆ្នាំ ១៩១៥ ជារឿងប្រលោមលោកកំណាព្យ (បទកាកគតិ និងបទពាក្យ៧) ដ៏ល្បីល្បាញបំផុតមួយក្នុងអក្សរសិល្ប៍ខ្មែរ។

## ២. ការវិភាគតួអង្គសំខាន់ៗ
- **ទុំ៖** តំណាងយុវជនមានទេពកោសល្យខាងសំនៀងកាព្យ ស្នេហាស្មោះស្ម័គ្រ ប៉ុន្តែមានភាពឆេវឆាវ
- **ទាវ៖** នារីរូបស្រស់ ស្មោះត្រង់នឹងស្នេហា និងហ៊ានតស៊ូប្រឆាំងនឹងការបង្ខិតបង្ខំ
- **យាយផាន់៖** តំណាងឱ្យមាតាដែលលោភលន់ចង់បានបុណ្យសក្តិ ទ្រព្យសម្បត្តិ និងប្រកាន់ទស្សនៈ «នំមិនធំជាងនាឡិ»
- **ម៉ឺនងួន៖** តំណាងអភិជនអាត្មានិយម យកអំណាចបុណ្យសក្តិមកដណ្តើមស្នេហា។`,
    body_en: `## Tum Teav Literature Analysis
A cornerstone Khmer poetic masterpiece examining individual autonomy versus feudal societal constraints.`,
  },
  {
    id: "les-g8-khmer-02",
    grade: 8,
    sort_order: 102,
    title_km: "ពាក្យកម្ចីបាលី-សំស្ក្រឹតក្នុងភាសាខ្មែរ",
    title_en: "Pali & Sanskrit Loanwords in Khmer",
    summary_km: "វិធានសម្គាល់ពាក្យបាលី-សំស្ក្រឹត ការប្រើប្រាស់ព្យញ្ជនៈសង្កត់ និងការវិវត្តន័យ",
    summary_en: "Identification rules for Pali-Sanskrit loanwords, consonant clustering, and semantic evolution",
    xp_reward: 38,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g8-khmer-02" },
    body_km: `## ១. ប្រភពនៃពាក្យកម្ចី
ភាសាខ្មែរបានខ្ចីពាក្យពីបាលី និងសំស្ក្រឹតយ៉ាងច្រើនតាមរយៈសាសនាព្រាហ្មណ៍ និងព្រះពុទ្ធសាសនា។

## ២. វិធានសម្គាល់ពាក្យ
- **សំស្ក្រឹត៖** ប្រើស្រៈ ឫ, ឬ, ឭ, ឮ, ស្រៈ ឰ, ឳ និងព្យញ្ជនៈ «ឝ», «ឞ», «ក្ស» (ឧទាហរណ៍៖ ក្សត្រ, ប្រទេស, វិទ្យាសាស្ត្រ)
- **បាលី៖** មិនប្រើព្យញ្ជនៈក្បាល «ក្ស» ឬស្រៈសំស្ក្រឹតឡើយ (ឧទាហរណ៍៖ ខត្តិយ, បទេស, វិជ្ជា)។`,
    body_en: `## Pali & Sanskrit Linguistic Influences
Distinguishing phonological rules between Pali and Sanskrit loanwords in modern formal Khmer registers.`,
  },
  {
    id: "les-g8-hist-01",
    grade: 8,
    sort_order: 103,
    title_km: "សម័យមហានគរ និងការកសាងអង្គរវត្ត",
    title_en: "Angkor Empire & Construction of Angkor Wat",
    summary_km: "រជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ ស្ថាបត្យកម្មប្រាសាទអង្គរវត្ត និងប្រព័ន្ធធារាសាស្ត្រ",
    summary_en: "Reign of King Suryavarman II, Angkor Wat temple architecture, and hydraulic mastery",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g8-hist-01" },
    body_km: `## ១. រជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ (១១១៣-១១៥០)
ព្រះបាទសូរ្យវរ្ម័នទី ២ បានបង្រួបបង្រួមទឹកដី និងពង្រីកឥទ្ធិពលចក្រភពខ្មែរយ៉ាងធំធេងនៅជ្រោយឥណ្ឌូចិន។

## ២. ការកសាងប្រាសាទអង្គរវត្ត
អង្គរវត្តឧទ្ទិសថ្វាយព្រះវិស្ណុ (សាសនាព្រាហ្មណ៍)៖
- បែរមុខទៅទិសខាងលិច (ទិសនៃព្រះវិស្ណុ)
- កំពូល ៥ តំណាងឱ្យកំពូលភ្នំព្រះសុមេរុ (មជ្ឈមណ្ឌលនៃចក្រវាល)
- គូទឹកព័ទ្ធជុំវិញតំណាងឱ្យមហាសមុទ្រសកលលោក។`,
    body_en: `## Angkor Wat & Suryavarman II
Built in the early 12th century, Angkor Wat represents the pinnacle of classical Khmer temple-mountain architecture.`,
  },
  {
    id: "les-g8-hist-02",
    grade: 8,
    sort_order: 104,
    title_km: "ការបង្រួបបង្រួមជាតិ និងការកកើតអាណាចក្រអង្គរ (ព្រះបាទជ័យវរ្ម័នទី ២)",
    title_en: "National Unification & Angkor Foundation (Jayavarman II)",
    summary_km: "ពិធីទេវរាជនៅលើភ្នំគូលែនឆ្នាំ ៨០២ គ.ស. និងការប្រកាសឯករាជ្យពីជ្វា",
    summary_en: "The Devaraja coronation ritual on Mount Kulen in 802 AD and founding of the Angkor Empire",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g8-hist-02" },
    body_km: `## ១. ព្រះបាទជ័យវរ្ម័នទី ២ និងការបង្រួបបង្រួមជាតិ
នៅចុងសតវត្សទី ៨ ប្រទេសកម្ពុជាស្ថិតក្នុងភាពបែកបាក់រវាងចេនឡាទឹកលិច និងចេនឡាដីគោក។ ព្រះបាទជ័យវរ្ម័នទី ២ បានធ្វើចម្បាំងបង្រួបបង្រួមទឹកដី និងរំដោះប្រទេសពីឥទ្ធិពលជ្វា (Java)។

## ២. ពិធីទេវរាជលើភ្នំមហិន្ទ្របព៌ត (ភ្នំគូលែន គ.ស. ៨០២)
- នៅឆ្នាំ ៨០២ គ.ស. ព្រះអង្គបានរៀបចំពិធីសាសនាព្រាហ្មណ៍ "ទេវរាជ" លើកំពូលភ្នំគូលែន ដោយមានព្រាហ្មណ៍សិវកៃវល្យជាអ្នកប្រារព្ធពិធី។
- ពិធីនេះប្រកាសថា ព្រះរាជាជាស្តេចនៃស្តេច (ចក្រវរ្តិន) ហើយប្រទេសកម្ពុជាមិនចំណុះនរណាទៀតឡើយ នេះជាចំណុចចាប់ផ្តើមនៃយុគសម័យអង្គរដ៏រុងរឿង។`,
    body_en: `## 1. Unification by Jayavarman II
Following the fragmentation of Water and Land Chenla, King Jayavarman II re-unified the Khmer territories and cast off Javanese suzerainty.

## 2. The 802 AD Devaraja Cult on Mount Kulen
In 802 AD, on Phnom Kulen (Mahendraparvata), the Devaraja (God-King) consecration consecrated Cambodia's sovereignty, initiating the golden Angkor Empire.`,
  },
  {
    id: "les-g8-geo-01",
    grade: 8,
    sort_order: 104,
    title_km: "អាកាសធាតុខ្យល់មូសុង និងរបបទឹកភ្លៀងនៅកម្ពុជា",
    title_en: "Monsoon Climate & Precipitation in Cambodia",
    summary_km: "ខ្យល់មូសុងនិរតី និងឦសាន រដូវវស្សា រដូវប្រាំង និងឥទ្ធិពលលើកសិកម្ម",
    summary_en: "Southwest and northeast monsoons, wet/dry seasons, and their direct impact on agriculture",
    xp_reward: 38,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g8-geo-01" },
    body_km: `## ១. លក្ខណៈទូទៅនៃអាកាសធាតុកម្ពុជា
កម្ពុជាស្ថិតក្នុងតំបន់ត្រូពិចក្តៅហើយសើម មានរដូវពីរច្បាស់លាស់៖
- **រដូវវស្សា (ឧសភា ដល់ តុលា)៖** ទទួលឥទ្ធិពលពី **ខ្យល់មូសុងនិរតី** បក់មកពីមហាសមុទ្រឥណ្ឌា នាំមកនូវទឹកភ្លៀងច្រើន (៧៥-៨៥% នៃទឹកភ្លៀងប្រចាំឆ្នាំ)
- **រដូវប្រាំង (វិច្ឆិកា ដល់ មេសា)៖** ទទួលឥទ្ធិពលពី **ខ្យល់មូសុងឦសាន** បក់មកពីទ្វីបអាស៊ី (ចិន) អាកាសធាតុស្ងួត និងត្រជាក់ស្រាលនៅខែធ្នូ-មករា។`,
    body_en: `## Cambodia's Monsoon Climate
Governed by tropical southwest (rainy) and northeast (dry) monsoon cycles directly dictating the agricultural calendar.`,
  },
  {
    id: "les-g8-geo-02",
    grade: 8,
    sort_order: 106,
    title_km: "កសិកម្មកម្ពុជា ដំណាំស្រូវ និងប្រព័ន្ធធារាសាស្ត្រ",
    title_en: "Cambodian Agriculture, Rice Cultivation & Irrigation",
    summary_km: "ប្រភេទស្រូវវស្សា ស្រូវប្រាំង បច្ចេកទេសកសិកម្មទំនើប និងប្រព័ន្ធធារាសាស្ត្រកម្ពុជា",
    summary_en: "Wet and dry season paddy rice varieties, modern agro-techniques, and national irrigation networks",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g8-geo-02" },
    body_km: `## ១. ដំណាំស្រូវ ឆ្អឹងខ្នងនៃកសិកម្មកម្ពុជា
- **ស្រូវវស្សា (Wet-Season Rice):** ដាំដុះពឹងផ្អែកលើទឹកភ្លៀងមូសុង (ចាប់ពីខែឧសភា-តុលា) ដូចជាពូជផ្ការំដួល ផ្កាម្លិះ។
- **ស្រូវប្រាំង (Dry-Season Rice):** ដាំដុះនៅរដូវប្រាំងដោយប្រើប្រព័ន្ធធារាសាស្ត្រ ទទួលបានទិន្នផលខ្ពស់ (ពូជស្រូវស្រាលមិនប្រកាន់រដូវ)។

## ២. ទំនើបកម្មកសិកម្ម និងប្រព័ន្ធធារាសាស្ត្រ
- ការប្រើប្រាស់គ្រឿងយន្តកសិកម្ម (ត្រាក់ទ័រ ម៉ាស៊ីនច្រូតកាត់) ជំនួសកម្លាំងសត្វពាហនៈ
- ការជីកស្តារប្រឡាយមេ ប្រឡាយរង និងទំនប់ស្ទាក់ទឹកដើម្បីធានាសន្តិសុខស្បៀងជាតិ។`,
    body_en: `## 1. Wet & Dry Season Paddy Cultivation
Paddy rice is the cornerstone of Cambodia's rural economy, featuring seasonal fragrant varieties (Phka Rumduol) and high-yield irrigated dry-season crops.

## 2. Agro-Mechanization & Water Security
Transformation through combine harvesters, canal dredging, and centralized reservoir infrastructure.`,
  },
  {
    id: "les-g8-eng-01",
    grade: 8,
    sort_order: 105,
    title_km: "Past Simple Tense & Historical Narratives",
    title_en: "Past Simple Tense & Historical Narratives",
    summary_km: "ការប្រើប្រាស់កិរិយាស័ព្ទមិនទៀងទាត់ (Irregular Verbs) និងការនិទានរឿងអតីតកាល",
    summary_en: "Irregular past tense verbs, time markers, and narrative composition",
    xp_reward: 38,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g8-eng-01" },
    body_km: `## 1. Past Simple Structure
- **Regular verbs:** append -ed (worked, played, visited)
- **Irregular verbs:** change vowel or form (go -> went, build -> built, see -> saw)
- **Time markers:** yesterday, last year, in 1993, two days ago.`,
    body_en: `## Past Simple Tense
Crucial for describing completed past actions, historical events, and experimental scientific observations.`,
  },
  {
    id: "les-g8-eng-02",
    grade: 8,
    sort_order: 108,
    title_km: "Modal Verbs: Rules, Necessity & Advice (Can, Must, Should)",
    title_en: "Modal Verbs: Rules, Necessity & Advice (Can, Must, Should)",
    summary_km: "ការប្រើប្រាស់ modal verbs សម្តែងសមត្ថភាព បញ្ជា កាតព្វកិច្ច និងដំបូន្មាន",
    summary_en: "Expressing ability, obligation, prohibition, and advice using modal auxiliaries",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g8-eng-02" },
    body_km: `## 1. Modals of Obligation & Necessity
- **Must:** Strong internal obligation or rule.
  - *Example:* "Students must wear the school uniform during examinations."
- **Must not (Mustn't):** Strict prohibition (forbidden).
  - *Example:* "You mustn't use smartphones inside the laboratory."
- **Have to:** External rule imposed by authority.
  - *Example:* "In Cambodia, motorists have to drive on the right side."

## 2. Modals of Advice & Recommendation
- **Should / Ought to:** Friendly advice or recommendation.
  - *Example:* "You should drink plenty of water during the hot dry season."
  - *Example:* "We should review past exam papers before the Brevet test."`,
    body_en: `## Modal Auxiliaries in Standard English
Core distinctions between strong obligations (*must, have to*), strict prohibitions (*must not*), and normative advice (*should, ought to*).`,
  },
  {
    id: "les-g8-ict-01",
    grade: 8,
    sort_order: 106,
    title_km: "កម្មវិធីសន្លឹកកិច្ចការ និងរូបមន្តគណនា (Spreadsheets)",
    title_en: "Spreadsheets & Calculation Formulas",
    summary_km: "ក្រឡា (Cells) ជួរដេក ជួរឈរ និងរូបមន្តគណនាគ្រឹះ SUM, AVERAGE, MIN, MAX",
    summary_en: "Cell addressing, rows, columns, and foundational formulas (SUM, AVERAGE, IF)",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g8-ict-01" },
    body_km: `## ១. រចនាសម្ព័ន្ធសន្លឹកកិច្ចការ (Excel / Sheets)
- **Cell (ក្រឡា)៖** ប្រសព្វរវាងជួរឈរ (Columns: A, B, C...) និងជួរដេក (Rows: 1, 2, 3...) ដូចជា A1, B5
- **រូបមន្តគ្រឹះ៖**
  - '=SUM(A1:A10)' គណនាផលបូក
  - '=AVERAGE(B1:B10)' គណនាមធ្យមភាគ
  - '=MAX(C1:C10)' រកតម្លៃធំបំផុត`,
    body_en: `## Spreadsheet Fundamentals
Data organization using tabular cell grids and automated algebraic formulas for scientific data processing.`,
  },
  {
    id: "les-g8-ict-02",
    grade: 8,
    sort_order: 110,
    title_km: "សន្លឹកកិច្ចការអេឡិចត្រូនិក (Spreadsheet): រូបមន្ត និងគំនូសតាង",
    title_en: "Spreadsheets: Formulas, SUM/AVERAGE & Charting",
    summary_km: "ការបញ្ចូលរូបមន្តគណិតវិទ្យា អនុគមន៍ SUM, AVERAGE, COUNT និងការបង្កើតគំនូសតាងក្រាហ្វិក",
    summary_en: "Formulas, cell references, core functions (SUM, AVERAGE), and data visualization charts",
    xp_reward: 38,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g8-ict-02" },
    body_km: `## ១. គំនិតគ្រឹះនៃ Spreadsheet (Excel / Google Sheets)
- **Cell Address (អាសយដ្ឋានក្រឡា):** ប្រសព្វរវាងជួរឈរ (Columns: A, B, C...) និងជួរដេក (Rows: 1, 2, 3...) ឧ. 'B5'
- **រូបមន្តតែងតែចាប់ផ្តើមដោយសញ្ញា '='៖** ឧទាហរណ៍ '=A1 + B1'

## ២. អនុគមន៍គណិតវិទ្យាគ្រឹះ
- '=SUM(B2:B20)' គណនាផលបូកសរុបនៃក្រឡាពី B2 ដល់ B20
- '=AVERAGE(C2:C20)' គណនាតម្លៃមធ្យមភាគ
- '=MAX(range)' និង '=MIN(range)' រកតម្លៃខ្ពស់បំផុត និងទាបបំផុត
- **គំនូសតាង (Charts):** បំប្លែងតារាងទិន្នន័យជា Column Chart ឬ Pie Chart សម្រាប់ការបង្ហាញច្បាស់លាស់។`,
    body_en: `## Electronic Spreadsheets & Numerical Analysis
Master cell referencing, basic formulas starting with '=', standard aggregate functions (SUM, AVERAGE, MAX, MIN), and graphical chart visualization.`,
  },

  // ============================================================================
  // GRADE 9 — NATIONAL BREVET EXAM (ឌីប្លូម)
  // ============================================================================
  {
    id: "les-g9-khmer-01",
    grade: 9,
    sort_order: 101,
    title_km: "រឿងកុលាបប៉ៃលិន (ញ៉ុក ថែម - វិញ្ញាសាឌីប្លូម)",
    title_en: "Kulap Pailin Novel Analysis (Brevet Core)",
    summary_km: "ការវិភាគតួអង្គចៅចិត្រ ឃុននារី គុណធម៌ និងបរិបទសង្គមក្នុងរឿងកុលាបប៉ៃលិន",
    summary_en: "Literary character analysis, virtue ethics, and societal context in Kulap Pailin",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g9-khmer-01" },
    body_km: `## ១. សេចក្តីផ្តើមនៃរឿងកុលាបប៉ៃលិន
រឿងកុលាបប៉ៃលិន តែងដោយលោក **ញ៉ុក ថែម** នៅឆ្នាំ ១៩៣៦ ឬ ១៩៤៣ គឺជាប្រលោមលោកទំនើបបែបមនោសញ្ចេតនា និងសីលធម៌ដ៏ល្បីល្បាញបំផុតក្នុងកម្មវិធីសិក្សាឌីប្លូម។

## ២. ការវិភាគតួអង្គសំខាន់ៗ
- **ចៅចិត្រ៖** តំណាងឱ្យយុវជនមានប្រភពក្រីក្រ តែពោរពេញដោយភាពស្មោះត្រង់ ឧស្សាហ៍ព្យាយាម សេចក្តីក្លាហាន និងការគោរពគុណធម៌។
- **ឃុននារី៖** តំណាងឱ្យស្ត្រីខ្មែរដែលមានចរិយាសម្បត្តិល្អ មិនរើសអើងវណ្ណៈ និងមានសន្តានចិត្តមេត្តាធម៌។
- **ហ្លួងរតនសម្បត្តិ៖** តំណាងឱ្យឥស្សរជនដែលមានចិត្តទូលាយ និងចេះឲ្យតម្លៃលើមនុស្សស្មោះត្រង់។

## ៣. តម្លៃអប់រំ និងសង្គម
រឿងនេះបង្រៀនថា «តម្លៃនៃមនុស្សស្ថិតនៅលើអំពើល្អ ភាពស្មោះត្រង់ និងការប្រឹងប្រែង មិនមែនលើទ្រព្យសម្បត្តិ ឬឋានៈសង្គមឡើយ»។`,
    body_en: `## 1. Kulap Pailin by Nhok Them
A seminal Cambodian novel central to the national Grade 9 Brevet curriculum.

## 2. Character Analysis
Chau Chet epitomizes moral integrity, hard work, and loyalty, proving human dignity transcends socioeconomic status.`,
  },
  {
    id: "les-g9-khmer-02",
    grade: 9,
    sort_order: 102,
    title_km: "វេយ្យាករណ៍ល្បះទោល ល្បះផ្សំ និងតែងសេចក្តីពិភាក្សា",
    title_en: "Sentence Structures & Discussion Essay (Brevet)",
    summary_km: "ការបង្កើតល្បះផ្សំ ឈ្នាប់ភាសា និងរចនាសម្ព័ន្ធ ៣ ផ្នែកនៃតែងសេចក្តីពិភាក្សា",
    summary_en: "Compound-complex clauses, coordinating conjunctions, and 3-part discussion essay architecture",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g9-khmer-02" },
    body_km: `## ១. ល្បះទោល និងល្បះផ្សំ
- **ល្បះទោល៖** មានប្រធានមួយ និងកិរិយាមួយ (ឧទាហរណ៍៖ សិស្សរៀនវិទ្យាសាស្ត្រ)
- **ល្បះផ្សំ៖** កើតឡើងពីល្បះទោលពីរឡើងទៅ ដោយប្រើឈ្នាប់ (និង, ប៉ុន្តែ, ពីព្រោះ, ប្រសិនបើ)

## ២. រចនាសម្ព័ន្ធតែងសេចក្តីពិភាក្សា
១. **សេចក្តីផ្តើម៖** លំនាំបញ្ហា ចំណូលបញ្ហា ចំណោទបញ្ហា
២. **តួសេចក្តី៖**
   - គំនិតស្រប (លើកអំណះអំណាង និងឧទាហរណ៍គាំទ្រ)
   - គំនិតប្រឆាំង (លើកទស្សនៈផ្ទុយ ឬកម្រិតព្រំដែននៃគំនិត)
   - ការសំយោគគំនិត (ថ្លឹងថ្លែងរកការពិត)
៣. **សេចក្តីបញ្ចប់៖** វាយតម្លៃប្រធាន និងមតិផ្ទាល់ខ្លួន។`,
    body_en: `## Discussion Essay Architecture for Brevet
3-part structure: Introduction (thesis statement), Body (proponent arguments, counter-perspectives, synthesis), and Conclusion.`,
  },
  {
    id: "les-g9-khmer-03",
    grade: 9,
    sort_order: 103,
    title_km: "វិធីសាស្ត្រតែងសេចក្តីពិពណ៌នា និងសេចក្តីពន្យល់",
    title_en: "Descriptive & Expository Khmer Essay Writing",
    summary_km: "រចនាសម្ព័ន្ធតែងសេចក្តី៖ សេចក្តីផ្តើម តួសេចក្តី និងសេចក្តីបញ្ចប់ សម្រាប់ប្រឡងឌីប្លូម",
    summary_en: "Three-part essay composition framework (Introduction, Body, Conclusion) for Brevet exams",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g9-khmer-03" },
    body_km: `## ១. រចនាសម្ព័ន្ធគំរូនៃតែងសេចក្តីខ្មែរ (៣ ផ្នែកធំៗ)
១. **សេចក្តីផ្តើម (Introduction)៖**
   - លំនាំបញ្ហា (ទិដ្ឋភាពទូទៅក្នុងសង្គម)
   - ចំណូលបញ្ហា (លើកប្រធានមកបញ្ជាក់ ឬសម្រង់ពាក្យស្លោក)
   - ចំណោទបញ្ហា (ចោទជាសំណួរដើម្បីបកស្រាយក្នុងតួសេចក្តី)។

២. **តួសេចក្តី (Body)៖**
   - ពន្យល់ពាក្យគន្លឹះ និងន័យរួមនៃប្រធាន
   - បកស្រាយគំនិតសំខាន់ៗ ភ្ជាប់ជាមួយភស្តុតាងជាក់ស្តែង (ក្នុងសង្គម ឬក្នុងអក្សរសិល្ប៍)
   - សរុបគំនិតក្នុងតួសេចក្តី។

៣. **សេចក្តីបញ្ចប់ (Conclusion)៖**
   - វាយតម្លៃប្រធាន (ប្រធានមានតម្លៃអប់រំយ៉ាងណា)
   - មតិផ្ទាល់ខ្លួន (ការប្តេជ្ញាចិត្តរបស់សិស្ស)។`,
    body_en: `## Three-Tier Architecture of Khmer Essays
Methodological drill on MoEYS Brevet composition structure: Introduction (context, thesis, prompt), Body (argument development, evidence), and Conclusion (synthesis, personal commitment).`,
  },
  {
    id: "les-g9-khmer-04",
    grade: 9,
    sort_order: 104,
    title_km: "វិញ្ញាសាភាសាខ្មែរប្រឡងឌីប្លូម (សំណួរអត្ថបទ និងវេយ្យាករណ៍)",
    title_en: "Brevet Khmer National Exam: Textual Analysis & Grammar",
    summary_km: "ការអនុវត្តវិញ្ញាសាជាក់ស្តែង វិភាគន័យត្រង់ ន័យធៀប និងការកែលម្អកំហុសអក្ខរាវិរុទ្ធ",
    summary_en: "Brevet past-paper drill, literal vs figurative comprehension, and orthographic precision",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g9-khmer-04" },
    body_km: `## ១. គន្លឹះឆ្លើយសំណួរអានយល់ន័យក្នុងវិញ្ញាសាឌីប្លូម
- **ន័យត្រង់ (Literal Meaning):** ន័យដើមនៃពាក្យដូចមានក្នុងវចនានុក្រមសម្ដេចព្រះសង្ឃរាជ ជួន ណាត។
- **ន័យធៀប (Figurative Meaning):** ន័យប្រៀបធៀបដែលបង្កប់ការអប់រំ ឬទស្សនវិជ្ជាជីវិត។
- **ការរកគំនិតសំខាន់ (Main Theme):** អានអត្ថបទពីរដង រកប្រយោគគន្លឹះដែលអ្នកនិពន្ធចង់ដាស់តឿនសង្គម។

## ២. វេយ្យាករណ៍ និងអក្ខរាវិរុទ្ធដែលឧស្សាហ៍ចេញប្រឡង
- កិរិយាសព្ទសកម្ម និងកិរិយាសព្ទអកម្ម
- សំនួនវោហារ៖ ឧបមានវោហារ (Simile), រូបកវោហារ (Metaphor)
- ការប្រើប្រាស់សញ្ញាវណ្ណយុត្តិ៖ សញ្ញាខណ្ឌ (.) សញ្ញាក្បៀស (,) និងសញ្ញាឧទាន (!)`,
    body_en: `## Brevet Khmer Exam Examination Protocol
Techniques for deciphering literal vs figurative semantic layers, grammatical voice conversions, rhetorical tropes, and Choun Nath dictionary spelling fidelity.`,
  },
  {
    id: "les-g9-hist-01",
    grade: 9,
    sort_order: 103,
    title_km: "សម័យមហានគរ និងរជ្ជកាលព្រះបាទជ័យវរ្ម័នទី ៧",
    title_en: "Angkor Empire & Reign of King Jayavarman VII",
    summary_km: "ការកសាងប្រាសាទបាយ័ន មន្ទីរពេទ្យ សាលាសំណាក់ និងការស្តារជាតិឡើងវិញ",
    summary_en: "Bayon construction, Arogyasala hospitals, Dharmasalas, and imperial consolidation",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g9-hist-01" },
    body_km: `## ១. ការរំដោះប្រទេសពីចាម (១១៧៧-១១៨១)
ព្រះបាទជ័យវរ្ម័នទី ៧ បានដឹកនាំការតស៊ូរំដោះរាជធានីអង្គរពីការកាន់កាប់របស់កងទ័ពចាមនៅឆ្នាំ ១១៨១ និងឡើងសោយរាជ្យជាព្រះមហាក្សត្រដ៏អស្ចារ្យ។

## ២. សមិទ្ធផលដ៏ធំធេងក្នុងរជ្ជកាល
- **ស្ថាបត្យកម្ម៖** ប្រាសាទបាយ័ន (Bayon), ប្រាសាទតាព្រហ្ម, ប្រាសាទបន្ទាយឆ្មារ, និងកំពែងក្រុងអង្គរធំ
- **សុខាភិបាល៖** សាងសង់មន្ទីរពេទ្យ «អរោគ្យសាលា» ចំនួន ១០២ ទូទាំងផ្ទៃប្រទេស
- **គមនាគមន៍៖** សាងសង់សាលាសំណាក់ «ធម្មសាលា» ១២១ ខ្នង និងស្ពានថ្មបុរាណរាប់សិបកន្លែង`,
    body_en: `## Reign of Jayavarman VII (1181–1218 CE)
Liberated Angkor in 1181, built the Bayon temple, and instituted the ancient state hospital network (102 Arogyasalas).`,
  },
  {
    id: "les-g9-hist-02",
    grade: 9,
    sort_order: 106,
    title_km: "អាណាព្យាបាលបារាំង និងព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យ ៩ វិច្ឆិកា ១៩៥៣",
    title_en: "French Protectorate & National Independence Crusade 1953",
    summary_km: "សន្ធិសញ្ញាឆ្នាំ ១៨៦៣ ការកែទម្រង់រដ្ឋបាល និងព្រះរាជបូជនីយកិច្ចរបស់ព្រះបាទនរោត្តម សីហនុ",
    summary_en: "The 1863 protectorate treaty, anticolonial resistance, and King Norodom Sihanouk's crusade for independence",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g9-hist-02" },
    body_km: `## ១. ការចុះសន្ធិសញ្ញាអាណាព្យាបាលបារាំង (១១ សីហា ១៨៦៣)
ព្រះបាទនរោត្តម បានចុះសន្ធិសញ្ញាជាមួយបារាំងដើម្បីការពារប្រទេសពីការគំរាមកំហែងពីប្រទេសជិតខាង។ ប៉ុន្តែក្រោយមក បារាំងបានកែប្រែការគ្រប់គ្រងដោយដកហូតអំណាចរដ្ឋបាលបន្តិចម្តងៗ (អនុសញ្ញាឆ្នាំ ១៨៨៤)។

## ២. ព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យជាតិ (១៩៥២-១៩៥៣)
- ព្រះករុណា ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ បានធ្វើ "ព្រះរាជបូជនីយកិច្ច" យ៉ាងស្វិតស្វាញលើឆាកអន្តរជាតិ (បំពេញព្រះរាជទស្សនកិច្ចនៅបារាំង អាមេរិក ជប៉ុន និងថៃ)។
- ជាលទ្ធផល ប្រទេសកម្ពុជាទទួលបាន **ឯករាជ្យពេញលេញនៅថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣** ដោយគ្មានការបង្ហូរឈាម។`,
    body_en: `## 1. 1863 French Protectorate
Signed by King Norodom to safeguard territorial integrity, followed by centralized French colonial administrative encroachment.

## 2. Royal Crusade for Independence
Through diplomatic maneuvers spearheaded by King Norodom Sihanouk across France, the US, and Japan, Cambodia achieved complete independence on November 9, 1953.`,
  },
  {
    id: "les-g9-geo-01",
    grade: 9,
    sort_order: 104,
    title_km: "ប្រជាសាស្ត្រ និងការផ្លាស់ទីលំនៅនៅកម្ពុជា",
    title_en: "Demography & Migration in Cambodia",
    summary_km: "រចនាសម្ព័ន្ធអាយុ ពីរ៉ាមីតប្រជាជន អត្រាកំណើត និងការធ្វើចំណាកស្រុក",
    summary_en: "Age structures, population pyramid, fertility rates, and rural-urban migration",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g9-geo-01" },
    body_km: `## ១. រចនាសម្ព័ន្ធប្រជាជនកម្ពុជា
ប្រជាជនកម្ពុជាមានរចនាសម្ព័ន្ធវ័យក្មេង (ជាង ៦០% ស្ថិតក្នុងវ័យធ្វើការអាយុ ១៥-៦៤ ឆ្នាំ) ដែលផ្តល់ «ភាគលាភប្រជាសាស្ត្រ» (Demographic Dividend) ដល់ការអភិវឌ្ឍសេដ្ឋកិច្ច។

## ២. ចំណាកស្រុក និងនគរូបនីយកម្ម
- ចំណាកស្រុកពីជនបទមកទីក្រុង (ភ្នំពេញ សៀមរាប ព្រះសីហនុ) ដើម្បីស្វែងរកការងារក្នុងវិស័យកាត់ដេរ សំណង់ និងសេវាកម្ម។
- ចំណាកស្រុកទៅក្រៅប្រទេស (ប្រទេសថៃ កូរ៉េខាងត្បូង ជប៉ុន) នាំមកនូវប្រាក់បញ្ញើជួយទ្រទ្រង់ជីវភាពគ្រួសារ។`,
    body_en: `## Demographic Dividend
Cambodia benefits from a young demographic profile with over 60% working-age citizens.`,
  },
  {
    id: "les-g9-geo-02",
    grade: 9,
    sort_order: 108,
    title_km: "វិស័យឧស្សាហកម្ម កាត់ដេរ និងពាណិជ្ជកម្មកម្ពុជា",
    title_en: "Cambodian Industry, Garments & Foreign Trade",
    summary_km: "ឧស្សាហកម្មកាត់ដេរសម្លៀកបំពាក់ ស្បែកជើង កសិ-ឧស្សាហកម្ម និងទីផ្សារនាំចេញ",
    summary_en: "Garment manufacturing, footwear, agro-processing, and Cambodia's trade export partners",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g9-geo-02" },
    body_km: `## ១. ឧស្សាហកម្មកាត់ដេរ និងស្បែកជើង (Garment & Footwear)
- វិស័យកាត់ដេរគឺជាសសរស្តម្ភដ៏ធំមួយនៃសេដ្ឋកិច្ចកម្ពុជា ផ្តល់ការងារដល់កម្មកររាប់សែននាក់ (ភាគច្រើនជានារីមកពីជនបទ)។
- ផលិតផលកាត់ដេរកម្ពុជានាំចេញទៅកាន់ទីផ្សារធំៗ រួមមានសហរដ្ឋអាមេរិក សហភាពអឺរ៉ុប (EBA) និងជប៉ុន។

## ២. ការធ្វើពិពិធកម្មឧស្សាហកម្ម និងពាណិជ្ជកម្ម
- ការអភិវឌ្ឍន៍រោងចក្រដំឡើងគ្រឿងអេឡិចត្រូនិច គ្រឿងបន្លាស់រថយន្ត និងកង់នាំចេញ
- ការកែច្នៃកសិផល (កៅស៊ូ ស្វាយចន្ទី ដំឡូងមី ស្រូវអង្ករ) ដើម្បីបង្កើនតម្លៃបន្ថែមក្នុងស្រុក។`,
    body_en: `## 1. Garment, Footwear & Travel Goods Sector
Primary driver of industrial exports and formal employment, supported by international preferential trade regimes (EBA, GSP).

## 2. Industrial Diversification
Transition into electrical assembly, bicycle manufacturing, and agro-processing value addition.`,
  },
  {
    id: "les-g9-eng-01",
    grade: 9,
    sort_order: 105,
    title_km: "Brevet English: Modals, Passives & Reading",
    title_en: "Brevet English: Modals, Passives & Reading",
    summary_km: "កិរិយាជំនួយ (can, should, must), ល្បះអកម្ម និងបច្ចេកទេសអានវិញ្ញាសាឌីប្លូម",
    summary_en: "Modal auxiliaries, passive voice transformation, and Brevet reading strategies",
    xp_reward: 40,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g9-eng-01" },
    body_km: `## 1. Modals for Rules & Advice
- **Must:** Obligation (You must wear a helmet.)
- **Should:** Advice (You should study every day.)
- **Can:** Ability or permission (She can solve quadratic equations.)

## 2. Basic Passive Voice
*Object + is/are/was/were + Past Participle (V3)*
- *Active:* Engineers build the bridge.
- *Passive:* The bridge is built by engineers.`,
    body_en: `## Brevet English Exam Essentials
Focuses on modal auxiliary verbs, basic active-to-passive voice transformations, and text skimming/scanning.`,
  },
  {
    id: "les-g9-eng-02",
    grade: 9,
    sort_order: 110,
    title_km: "Brevet English: Paragraph Writing & Reading Comprehension",
    title_en: "Brevet English: Paragraph Writing & Reading Comprehension",
    summary_km: "បច្ចេកទេសសរសេរកថាខណ្ឌ ភាសាភ្ជាប់គំនិត និងការឆ្លើយសំណួរអានវិញ្ញាសាឌីប្លូម",
    summary_en: "Cohesive devices, paragraph development, and Brevet reading passage strategies",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g9-eng-02" },
    body_km: `## 1. Paragraph Writing Structure for Brevet
A well-constructed English paragraph requires 3 essential elements:
- **Topic Sentence:** States the controlling idea of the paragraph.
  - *Example:* "Learning digital technology brings three major benefits to Cambodian youth."
- **Supporting Sentences:** Give facts, examples, and detailed explanations.
  - *Connectors:* *First of all, In addition, Furthermore, For example...*
- **Concluding Sentence:** Restates the main thought with closure.
  - *Example:* "In conclusion, digital skills empower students to build brighter futures."

## 2. Question Words & Reading Precision
- **Who:** Identifies people | **Where:** Identifies locations
- **When:** Identifies time/dates | **Why:** Requires reason (*Because... / In order to...*)`,
    body_en: `## Brevet Paragraph Construction & Reading
Mastering topic sentence articulation, cohesive transition markers (*furthermore, consequently*), and exact retrieval of textual details.`,
  },
  {
    id: "les-g9-moral-01",
    grade: 9,
    sort_order: 106,
    title_km: "នីតិរដ្ឋ សិទ្ធិកុមារ និងច្បាប់ចរាចរណ៍ផ្លូវគោក",
    title_en: "Rule of Law, Child Rights & Road Safety",
    summary_km: "សិទ្ធិជាមូលដ្ឋានទាំង ៤ របស់កុមារ សុវត្ថិភាពចរាចរណ៍ និងការគោរពច្បាប់រដ្ឋ",
    summary_en: "Four core child rights (survival, protection, development, participation) and road safety law",
    xp_reward: 40,
    estimated_minutes: 18,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g9-moral-01" },
    body_km: `## ១. សិទ្ធិជាមូលដ្ឋានទាំង ៤ របស់កុមារ (UN CRC)
១. **សិទ្ធិរស់រានមានជីវិត (Survival):** អាហារ ទឹកស្អាត ជម្រក និងការថែទាំសុខភាព
២. **សិទ្ធិទទួលបានការការពារ (Protection):** ការពារពីអំពើហិង្សា ពលកម្មកុមារ និងការរំលោភបំពាន
៣. **សិទ្ធិទទួលបានការអភិវឌ្ឍ (Development):** ការអប់រំ និងការលេងកម្សាន្ត
៤. **សិទ្ធិក្នុងការចូលរួម (Participation):** បញ្ចេញមតិយោបល់ក្នុងកិច្ចការដែលពាក់ព័ន្ធនឹងខ្លួន។

## ២. ច្បាប់ចរាចរណ៍ផ្លូវគោក
ការពាក់មួកសុវត្ថិភាព ការមិនបើកបរក្រោមឥទ្ធិពលគ្រឿងស្រវឹង និងការគោរពភ្លើងសញ្ញាចរាចរណ៍ជាកាតព្វកិច្ចច្បាប់ដើម្បីការពារអាយុជីវិត។`,
    body_en: `## Child Rights & Civic Duty
The 4 pillars of the UN Convention on the Rights of the Child and adherence to traffic laws as core civic duties.`,
  },
  {
    id: "les-g9-moral-02",
    grade: 9,
    sort_order: 112,
    title_km: "ស្ថាប័នប្រជាធិបតេយ្យ និងការចូលរួមរបស់ពលរដ្ឋ",
    title_en: "Democratic Institutions & Citizen Civic Action",
    summary_km: "តួនាទីរដ្ឋសភា ព្រឹទ្ធសភា រាជរដ្ឋាភិបាល និងការបោះឆ្នោតតាមបែបប្រជាធិបតេយ្យ",
    summary_en: "The National Assembly, Senate, Royal Government, and democratic voting participation",
    xp_reward: 40,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g9-moral-02" },
    body_km: `## ១. ស្ថាប័នកំពូលនៃរដ្ឋក្នុងរបបរាជាធិបតេយ្យអាស្រ័យរដ្ឋធម្មនុញ្ញ
- **រដ្ឋសភា (National Assembly)៖** ស្ថាប័ននីតិប្បញ្ញត្តិ អនុម័តច្បាប់ និងតាមដានការអនុវត្តរបស់រាជរដ្ឋាភិបាល។
- **ព្រឹទ្ធសភា (Senate)៖** ស្ថាប័នពិនិត្យ និងឱ្យយោបល់លើសេចក្តីព្រាងច្បាប់។
- **រាជរដ្ឋាភិបាល (Royal Government)៖** ស្ថាប័ននីតិប្រតិបត្តិ ដឹកនាំប្រទេស និងអនុវត្តច្បាប់រដ្ឋ។

## ២. ការបោះឆ្នោត និងសិទ្ធិពលរដ្ឋ
- ពលរដ្ឋខ្មែរគ្រប់រូបដែលមានអាយុចាប់ពី ១៨ ឆ្នាំឡើងទៅ មានសិទ្ធិបោះឆ្នោតជ្រើសរើសតំណាងរាស្ត្រដោយសេរី ស្មើភាព និងសម្ងាត់
- ការចូលរួមអភិវឌ្ឍន៍សហគមន៍ និងការស្ម័គ្រចិត្តជួយសង្គម។`,
    body_en: `## Democratic Governance & Civic Engagement
Covers Cambodia's constitutional monarchy, legislative scrutiny by Parliament, executive governance, and universal suffrage at age 18.`,
  },

  // ============================================================================
  // GRADE 10 — UPPER SECONDARY FOUNDATION
  // ============================================================================
  {
    id: "les-g10-khmer-01",
    grade: 10,
    sort_order: 101,
    title_km: "រឿងរាមកេរ្តិ៍ (កម្រិតវិភាគទស្សនវិជ្ជា និងសិល្បៈតែង)",
    title_en: "Reamker Epic: Philosophy & Classical Art",
    summary_km: "ការវិភាគតួអង្គព្រះរាម ក្រុងរាពណ៍ និងទស្សនវិជ្ជាធម៌ឈ្នះអធម៌ក្នុងសង្គមខ្មែរ",
    summary_en: "Philosophical analysis of Dharma versus Adharma and royal literature in the Reamker",
    xp_reward: 42,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g10-khmer-01" },
    body_km: `## ១. សារៈសំខាន់នៃរឿងរាមកេរ្តិ៍
រឿងរាមកេរ្តិ៍ជាស្នាដៃអក្សរសិល្ប៍បុរាណកំពូលរបស់ខ្មែរ ដែលចាក់គ្រឹះយ៉ាងជ្រៅទៅក្នុងវប្បធម៌ សិល្បៈរបាំព្រះរាជទ្រព្យ និងចម្លាក់តាមជញ្ជាំងប្រាសាទអង្គរវត្ត។

## ២. ទស្សនវិជ្ជាសីលធម៌
- **ព្រះរាម៖** តំណាងឱ្យព្រះធម៌ យុត្តិធម៌ និងការគោរពពាក្យសត្យ
- **ក្រុងរាពណ៍៖** តំណាងឱ្យអំណាចផ្តាច់ការ និងការបំពានសីលធម៌
- **ទស្សនវិជ្ជាស្នូល៖** អធម៌ (អំពើអាក្រក់) អាចមានឥទ្ធិពលមួយគ្រា ប៉ុន្តែទីបំផុតតែងតែត្រូវវិនាសចាញ់ព្រះធម៌ជានិច្ច។`,
    body_en: `## Classical Reamker Foundations
Examines moral philosophy and aesthetic structures depicted on Angkorian bas-reliefs and royal ballet.`,
  },
  {
    id: "les-g10-khmer-02",
    grade: 10,
    sort_order: 103,
    title_km: "កាព្យបទព្រហ្មគីតិ និងឥន្ទ្រជិត",
    title_en: "Brahmagit & Indrajit Classical Khmer Poetic Meters",
    summary_km: "លក្ខណៈចង្វាក់ បទពាក្យ ៧ និង ៨ ក្នុងស្នាដៃអក្សរសិល្ប៍បុរាណ",
    summary_en: "Metric rhythm, internal consonance, and strophic conventions in classical poetry",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g10-khmer-02" },
    body_km: `## ១. បទព្រហ្មគីតិ (បទដែលនិយមប្រើក្នុងការទូន្មាន និងច្បាប់បុរាណ)
បទព្រហ្មគីតិមាន ៤ ឃ្លាក្នុងមួយល្បះ៖
- ឃ្លាទី១ មាន ៥ ព្យាង្គ, ឃ្លាទី២ មាន ៦ ព្យាង្គ
- ឃ្លាទី៣ មាន ៥ ព្យាង្គ, ឃ្លាទី៤ មាន ៦ ព្យាង្គ (សរុប ២២ ព្យាង្គ)
- ចំណាប់ចួន៖ ព្យាង្គទី៥ នៃឃ្លាទី១ ចួននឹងព្យាង្គទី៣ នៃឃ្លាទី២។

## ២. បទឥន្ទ្រជិត
បទឥន្ទ្រជិតជាបទកាព្យមាន ៤ ឃ្លាក្នុងមួយល្បះ ហើយឃ្លានីមួយៗមាន ៧ ព្យាង្គ មានសូរសំនៀងរណ្តំពីរោះរណ្តំ និងក្បួនចួនតឹងរ៉ឹង។`,
    body_en: `## Classical Metrics: Brahmagit & Indrajit
Stanza structures, syllable distributions (5-6-5-6 pattern in Brahmagit), and pedagogical gnomic traditions in Khmer verse.`,
  },
  {
    id: "les-g10-hist-01",
    grade: 10,
    sort_order: 102,
    title_km: "សម័យកណ្តាល (ចតុមុខ លង្វែក និងឧដុង្គ)",
    title_en: "Middle Period Cambodia: Chaktomuk, Longvek & Oudong",
    summary_km: "ការប្តូររាជធានីពីអង្គរ សេដ្ឋកិច្ចពាណិជ្ជកម្មលង្វែក និងការកសាងក្រុងឧដុង្គ",
    summary_en: "Capital relocation from Angkor, maritime trading prosperity in Longvek, and Oudong era",
    xp_reward: 42,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g10-hist-01" },
    body_km: `## ១. ការប្តូររាជធានីមកទួលបាសាន និងចតុមុខ (១៤៣១)
ក្រោយការធ្លាក់ចុះនៃសម័យអង្គរ ព្រះបាទពញាយ៉ាតបានផ្លាស់ប្តូររាជធានីមករកតំបន់ប្រសព្វទន្លេ ៤ មុខ (ភ្នំពេញ/ចតុមុខ) ដើម្បីងាយស្រួលធ្វើពាណិជ្ជកម្មតាមផ្លូវទឹក។

## ២. សម័យរុងរឿងនៃក្រុងលង្វែក (សតវត្សទី ១៦)
ក្រោមរជ្ជកាលព្រះបាទអង្គចន្ទទី ១ ក្រុងលង្វែកបានក្លាយជាមជ្ឈមណ្ឌលពាណិជ្ជកម្មអន្តរជាតិដ៏រស់រវើក ដោយមានឈ្មួញអឺរ៉ុប (អេស្ប៉ាញ ព័រទុយហ្គាល់) ចិន ជប៉ុន ចូលមកធ្វើជំនួញ។`,
    body_en: `## Cambodia's Middle Period
Transition from agrarian inland empire to dynamic maritime trading networks centered at Longvek and Oudong.`,
  },
  {
    id: "les-g10-hist-02",
    grade: 10,
    sort_order: 105,
    title_km: "សេដ្ឋកិច្ចពាណិជ្ជកម្មលង្វែក និងសម័យឧដុង្គ (សតវត្សទី ១៦-១៩)",
    title_en: "Longvek Maritime Prosperity & Oudong Royal Era",
    summary_km: "កំពង់ផែពាណិជ្ជកម្មអន្តរជាតិលង្វែក ទំនាក់ទំនងជាមួយព័រទុយហ្កាល់ អេស្ប៉ាញ និងហូឡង់",
    summary_en: "International trade in Longvek, diplomatic contacts with Europe, and the Oudong period",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g10-hist-02" },
    body_km: `## ១. សម័យលង្វែក៖ មជ្ឈមណ្ឌលពាណិជ្ជកម្មអន្តរជាតិ
ក្រោយការបោះបង់រាជធានីអង្គរ ព្រះបាទអង្គចន្ទទី១ បានកសាងបន្ទាយលង្វែក (ខេត្តកំពង់ឆ្នាំង)។ លង្វែកបានក្លាយជាកំពង់ផែពាណិជ្ជកម្មដ៏មមាញឹក ដោយមានឈ្មួញព័រទុយហ្កាល់ អេស្ប៉ាញ ជប៉ុន និងអារ៉ាប់មកជួញដូរគ្រឿងទេស ឈើក្រអូប និងដំរី។

## ២. សម័យឧដុង្គ (គ.ស. ១៦២០-១៨៦៦)
- ព្រះបាទជ័យជេដ្ឋាទី២ បានតាំងរាជធានីនៅឧដុង្គ (ភ្នំព្រះរាជទ្រព្យ)
- រាជធានីឧដុង្គជាមជ្ឈមណ្ឌលព្រះពុទ្ធសាសនា វប្បធម៌ និងការសាងសង់ព្រះចេតិយតម្កល់ព្រះបរមអដ្ឋិធាតុនៃព្រះមហាក្សត្រខ្មែរ។`,
    body_en: `## Longvek Maritime Entrepôt & Oudong Dynasty
Covers the strategic shift to Longvek as an international trading crossroads, followed by Oudong's Buddhist scholastic and artistic consolidation.`,
  },
  {
    id: "les-g10-geo-01",
    grade: 10,
    sort_order: 103,
    title_km: "ធនធានរ៉ែ ថាមពល និងកសិកម្មកម្ពុជា",
    title_en: "Mineral Resources, Energy & Agriculture in Cambodia",
    summary_km: "សក្តានុពលរ៉ែដែក មាស បុកស៊ីត ទំនប់វារីអគ្គិសនី និងការធ្វើពិពិធកម្មកសិកម្ម",
    summary_en: "Bauxite, gold, iron ore potential, hydropower development, and agricultural diversification",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g10-geo-01" },
    body_km: `## ១. ធនធានរ៉ែនៅកម្ពុជា
- **រ៉ែមាស៖** តំបន់អូរខ្វាវ (ខេត្តមណ្ឌលគិរី) និងខេត្តកំពង់ធំ
- **រ៉ែដែក និងបុកស៊ីត (Bauxite):** តំបន់ភ្នំដែក (ខេត្តព្រះវិហារ) និងខេត្តមណ្ឌលគិរី
- **ថ្មកំបោរ៖** ខេត្តកំពត និងបាត់ដំបង បម្រើដល់ឧស្សាហកម្មស៊ីម៉ង់ត៍។

## ២. វិស័យថាមពល
កម្ពុជាកំពុងពង្រីកថាមពលវារីអគ្គិសនី (សេសានក្រោម២ កំចាយ) និងកសិដ្ឋានថាមពលពន្លឺព្រះអាទិត្យ (Solar Farms) ដើម្បីផ្គត់ផ្គង់តម្រូវការឧស្សាហកម្ម។`,
    body_en: `## Mineral & Energy Landscape
Geological distribution of mineral reserves, cement limestone in Kampot, and clean energy transition.`,
  },
  {
    id: "les-g10-geo-02",
    grade: 10,
    sort_order: 107,
    title_km: "ការអភិរក្សជីវចម្រុះ និងតំបន់ការពារធម្មជាតិនៅកម្ពុជា",
    title_en: "Biodiversity Conservation & Protected Areas",
    summary_km: "ឧទ្យានជាតិ ដែនជម្រកសត្វព្រៃ របៀងអភិរក្សជីវចម្រុះ និងអេកូទេសចរណ៍",
    summary_en: "National parks, wildlife sanctuaries, biodiversity corridors, and sustainable ecotourism",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g10-geo-02" },
    body_km: `## ១. ប្រព័ន្ធតំបន់ការពារធម្មជាតិកម្ពុជា
កម្ពុជាមានតំបន់ការពារធម្មជាតិគ្របដណ្តប់ជាង ៤០% នៃផ្ទៃដីប្រទេស រួមមាន៖
- **ឧទ្យានជាតិ (National Parks)៖** គិរីរម្យ បូកគោ ព្រះមុនីវង្ស ភ្នំគូលែន។
- **ដែនជម្រកសត្វព្រៃ (Wildlife Sanctuaries)៖** ភ្នំព្រឹល ព្រៃឡង់ តំបន់ជួរភ្នំក្រវាញខាងត្បូង។
- **តំបន់រ៉ាមសារ (Ramsar Sites)៖** ដីសើមមានសារៈសំខាន់ជាអន្តរជាតិ (កោះកាពិ ស្ទឹងត្រែង បឹងឆ្មា)។

## ២. អេកូទេសចរណ៍ និងការអភិវឌ្ឍន៍សហគមន៍
- គម្រោងអេកូទេសចរណ៍ជីផាត (កោះកុង) និងអារ៉ែង បង្កើតប្រាក់ចំណូលដល់អ្នកភូមិ និងកាត់បន្ថយការកាប់ឈើ-បរបាញ់សត្វព្រៃ។`,
    body_en: `## Cambodia's Protected Area Network
Analysis of national parks, wildlife corridors, Ramsar wetlands, and community-based ecotourism as economic alternatives to deforestation.`,
  },
  {
    id: "les-g10-eng-01",
    grade: 10,
    sort_order: 104,
    title_km: "Present Perfect vs Past Simple & Academic Texts",
    title_en: "Present Perfect vs Past Simple & Academic Texts",
    summary_km: "ការប្រៀបធៀប Present Perfect និង Past Simple ព្រមទាំងការអានអត្ថបទបែប STEM",
    summary_en: "Contrasting present perfect and past simple in scientific reporting and academic papers",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g10-eng-01" },
    body_km: `## 1. Present Perfect vs. Past Simple
- **Past Simple:** Finished past action with specific time (e.g., Einstein published his paper in 1905).
- **Present Perfect:** Past action connected to present or without specific time (e.g., Scientists have discovered new exoplanets).
- *Form:* Subject + have/has + Past Participle (V3).`,
    body_en: `## Scientific English Conventions
Distinguishing completed past findings from ongoing research findings using correct verb aspects.`,
  },
  {
    id: "les-g10-eng-02",
    grade: 10,
    sort_order: 109,
    title_km: "Conditionals (Type 1 & 2) & Academic Connectors",
    title_en: "Conditionals (Type 1 & 2) & Academic Connectors",
    summary_km: "លក្ខខណ្ឌពិត និងមិនពិត ព្រមទាំងពាក្យភ្ជាប់គំនិតពិភាក្សា",
    summary_en: "Real and unreal conditional hypotheses, with discourse transition words",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g10-eng-02" },
    body_km: `## 1. First Conditional (Real Possibility in Present/Future)
- **Form:** *If + Present Simple, will + base verb*
  - "If you study consistently, you will pass the national examination with Grade A."

## 2. Second Conditional (Hypothetical / Unreal in Present)
- **Form:** *If + Past Simple, would + base verb*
  - "If I had more time, I would research environmental conservation in the Cardamoms."
  - *Note:* Use *were* for all persons in formal academic writing (*"If I were you..."*).

## 3. Cause & Effect Connectors
- *Therefore, Consequently, As a result, Because of this...*`,
    body_en: `## Conditional Grammar & Discursive Logic
Covers First (real) and Second (unreal hypothesis) conditionals alongside rigorous academic consequence connectors.`,
  },
  {
    id: "les-g10-ict-01",
    grade: 10,
    sort_order: 105,
    title_km: "ក្បួនដោះស្រាយ និងដ្យាក្រាមលំហូរ (Algorithms & Flowcharts)",
    title_en: "Algorithms & Flowcharts",
    summary_km: "គំនិតនៃ Algorithm សញ្ញាសម្គាល់ក្នុង Flowchart (Start, Decision, Process) និង Pseudo-code",
    summary_en: "Algorithmic thinking, standard flowchart symbols, decision logic, and pseudocode structures",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g10-ict-01" },
    body_km: `## ១. អ្វីជាក្បួនដោះស្រាយ (Algorithm)?
Algorithm គឺជាសំណុំនៃជំហានច្បាស់លាស់ និងមានលំដាប់លំដោយសម្រាប់ដោះស្រាយបញ្ហាណាមួយ។

## ២. និមិត្តសញ្ញាស្តង់ដារក្នុង Flowchart
- **Oval (រាងពងក្រពើ)៖** Start / End (ចំណុចចាប់ផ្តើម និងបញ្ចប់)
- **Rectangle (ចតុកោណកែង)៖** Process (ដំណើរការ ឬការគណនា)
- **Parallelogram (ប្រលេឡូក្រាម)៖** Input / Output (ការបញ្ចូល ឬបង្ហាញទិន្នន័យ)
- **Diamond (រាងពេជ្រ)៖** Decision (ការសម្រេចចិត្តតាមលក្ខខណ្ឌ If-Else)។`,
    body_en: `## Computational Thinking
Deconstructing complex problems into discrete, deterministic algorithmic sequences and standard flowchart notation.`,
  },
  {
    id: "les-g10-ict-02",
    grade: 10,
    sort_order: 111,
    title_km: "ក្បួនដោះស្រាយបញ្ហា (Algorithms) និងគំនូសតាង (Flowcharts)",
    title_en: "Algorithms, Logic Pseudocode & Flowcharts",
    summary_km: "ការរៀបចំជំហានដោះស្រាយបញ្ហា លក្ខខណ្ឌ IF-THEN-ELSE រង្វិលជុំ LOOP និងនិមិត្តសញ្ញាគំនូសតាង",
    summary_en: "Algorithmic thinking, branching logic, loop constructs, and standard ISO flowchart symbols",
    xp_reward: 42,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g10-ict-02" },
    body_km: `## ១. អ្វីជាក្បួនដោះស្រាយបញ្ហា (Algorithm)?
Algorithm គឺជាលំដាប់លំដោយនៃជំហានដោះស្រាយបញ្ហាយ៉ាងច្បាស់លាស់ ត្រឹមត្រូវ និងមានទីបញ្ចប់។

## ២. និមិត្តសញ្ញាគំនូសតាងស្ដង់ដារ (Flowchart Symbols)
- **Oval (Terminator)៖** ចាប់ផ្តើម (Start) ឬ បញ្ចប់ (End)
- **Rectangle (Process)៖** ការគណនា ឬប្រតិបត្តិការ (ឧ. 'Sum = A + B')
- **Diamond (Decision)៖** ការធ្វើសេចក្តីសម្រេច/លក្ខខណ្ឌ (ឧ. 'Score >= 50 ?') ផ្តល់លទ្ធផល Yes ឬ No
- **Parallelogram (Input/Output)៖** ការបញ្ចូល ឬបង្ហាញទិន្នន័យ (ឧ. 'Read X', 'Print Result')។`,
    body_en: `## Computational Thinking & Flowcharts
Formalization of algorithms, sequential instruction pipelines, conditional branching (diamond gates), and pseudocode syntax.`,
  },

  // ============================================================================
  // GRADE 11 — STREAM SPECIALIZATION
  // ============================================================================
  {
    id: "les-g11-khmer-01",
    grade: 11,
    sort_order: 101,
    title_km: "រឿងស៊ីមអ្នកបរឡាន (អក្សរសិល្ប៍ទំនើប និងសង្គម)",
    title_en: "Sim the Driver Novel (Modern Literature & Society)",
    summary_km: "ការវិភាគតួអង្គស៊ីម ជីវភាពវណ្ណៈកម្មករ និងស្មារតីសាមគ្គីភាពក្នុងសង្គមកម្ពុជា",
    summary_en: "Analysis of working-class consciousness, urban solidarity, and progressive social themes",
    xp_reward: 44,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g11-khmer-01" },
    body_km: `## ១. សាវតានៃរឿងស៊ីមអ្នកបរឡាន
និពន្ធដោយលោក **អ៊ឹម ថុក** នៅឆ្នាំ ១៩៥៦ ជារឿងប្រលោមលោកបែបតថនិយមសង្គម ឆ្លុះបញ្ចាំងពីជីវិតពិតរបស់អ្នកធ្វើការងារស៊ីឈ្នួលនៅភ្នំពេញ។

## ២. ការវិភាគតួអង្គស៊ីម
ស៊ីមជាអ្នកបើកបររថយន្តឈ្នួលដ៏ស្មោះត្រង់ ឧស្សាហ៍ និងចេះជួយយកអាសាមិត្តភក្តិ។ ស៊ីមយល់ច្បាស់ពីតម្លៃនៃកម្លាំងពលកម្ម និងការរួបរួមសាមគ្គីភាពគ្នារវាងកម្មករដើម្បីទាមទារសិទ្ធិ និងភាពយុត្តិធម៌។`,
    body_en: `## Social Realism in Sim the Driver
A benchmark mid-20th century Cambodian progressive novel exploring working-class dignity and collective community support.`,
  },
  {
    id: "les-g11-khmer-02",
    grade: 11,
    sort_order: 103,
    title_km: "រឿងមាលាដួងចិត្ត (ស្នាដៃ នូ ហាច - ការវិភាគស្នេហាជាតិ)",
    title_en: "Mealea Doung Chett Novel Analysis (Nou Hach)",
    summary_km: "ការវិភាគតួអង្គធីតា ធារិទ្ធ ជីវិតនិស្សិតខ្មែរនៅបារាំង និងមនសិការស្នេហាជាតិ",
    summary_en: "Analysis of Nou Hach's classic novel: overseas intellectual struggles and patriotism",
    xp_reward: 42,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g11-khmer-02" },
    body_km: `## ១. សាវតានៃរឿងមាលាដួងចិត្ត
ស្នាដៃនិពន្ធរបស់លោក នូ ហាច (បោះពុម្ពឆ្នាំ ១៩៧២) បង្ហាញពីទស្សនៈទំនើបរបស់បញ្ញវន្តខ្មែរក្នុងទសវត្សរ៍ ១៩៤០-១៩៥០។

## ២. ការវិភាគតួអង្គ និងតម្លៃអប់រំ
- **តួអង្គធារិទ្ធ៖** និស្សិតខ្មែរដែលទៅរៀននៅប្រទេសបារាំង មានមនសិការស្នេហាជាតិខ្ពស់ ខិតខំរៀនសូត្រដើម្បីយកចំណេះដឹងមកអភិវឌ្ឍមាតុភូមិ។
- **តួអង្គធីតា៖** នារីខ្មែរទន់ភ្លន់ រក្សាប្រពៃណីថ្លៃថ្នូរ និងមានចិត្តស្មោះត្រង់។
- **តម្លៃស្នូល៖** ស្នេហាបុគ្គលត្រូវផ្សារភ្ជាប់នឹងស្នេហាជាតិ និងកាតព្វកិច្ចចំពោះសង្គម។`,
    body_en: `## Modern Khmer Realism: Mealea Doung Chett
Analyzes Nou Hach's epistolary style, the diaspora experience of students in mid-century France, and the elevation of national duty over romance.`,
  },
  {
    id: "les-g11-hist-01",
    grade: 11,
    sort_order: 102,
    title_km: "សម័យអាណាព្យាបាលបារាំងនៅកម្ពុជា (១៨៦៣-១៩៥៣)",
    title_en: "French Protectorate Era in Cambodia (1863–1953)",
    summary_km: "សន្ធិសញ្ញា ១១ សីហា ១៨៦៣ ការកែទម្រង់រដ្ឋបាល និងចលនាតស៊ូរបស់ប្រជាជនខ្មែរ",
    summary_en: "The August 11, 1863 treaty, French administrative reorganization, and anticolonial movements",
    xp_reward: 44,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g11-hist-01" },
    body_km: `## ១. ការចុះសន្ធិសញ្ញាអាណាព្យាបាល (១៨៦៣)
ព្រះបាទនរោត្តមបានចុះហត្ថលេខាលើសន្ធិសញ្ញាអាណាព្យាបាលជាមួយបារាំងនៅថ្ងៃទី ១១ ខែសីហា ឆ្នាំ ១៨៦៣ ដើម្បីការពារប្រទេសកម្ពុជាពីការគំរាមកំហែងរបស់ប្រទេសជិតខាង (សៀម និងអណ្ណាម)។

## ២. ចលនាតស៊ូប្រឆាំងបារាំង
- ចលនាតស៊ូរបស់ក្រឡាហោមគង់ (១៨៨៥-១៨៨៦)
- ចលនាតស៊ូរបស់សម្តេចព្រះសង្ឃរាជជួន ណាត និងព្រះសង្ឃក្នុងការការពារអក្សរសាស្ត្រជាតិ
- ព្រឹត្តិការណ៍បះបោរនៅភូមិក្រាំងលាវ (១៩២៥)។`,
    body_en: `## French Protectorate Dynamics
Examines colonial treaties, administrative modernization, and indigenous resistance movements leading to 1953 independence.`,
  },
  {
    id: "les-g11-hist-02",
    grade: 11,
    sort_order: 105,
    title_km: "ចលនាតស៊ូប្រឆាំងបារាំង និងឥទ្ធិពលសង្គ្រាមលោកនៅអាស៊ីអាគ្នេយ៍",
    title_en: "Anticolonial Movements & World War Impacts in Southeast Asia",
    summary_km: "ចលនាតស៊ូរបស់ក្រឡាហោមគង់ អាចារ្យស្វា ព្រះសង្ឃ និងឥទ្ធិពលសង្គ្រាមលោកលើកម្ពុជា",
    summary_en: "Kralahom Kong and Achar Sva uprisings, monastic patriotic mobilization, and wartime shifts",
    xp_reward: 42,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g11-hist-02" },
    body_km: `## ១. ចលនាតស៊ូប្រឆាំងបារាំងនៅចុងសតវត្សទី ១៩
- **ចលនាអាចារ្យស្វា (១៨៦៥-១៨៦៦)៖** ដឹកនាំកសិករ និងអ្នកស្រុកប្រឆាំងនឹងការកៀបសង្កត់ពន្ធដារបារាំង។
- **ចលនាក្រឡាហោមគង់ (១៨៨៥-១៨៨៦)៖** បះបោរប្រឆាំងនឹងអនុសញ្ញាឆ្នាំ ១៨៨៤ ដែលបារាំងបង្ខំឱ្យព្រះបាទនរោត្តមប្រគល់អំណាច។
- **ចលនាឆ័ត្រ (១៩៤២)៖** ការដើរក្បួនដោយសន្តិវិធីរបស់ព្រះសង្ឃ និងបញ្ញវន្តខ្មែរនៅភ្នំពេញ (ដឹកនាំដោយអាចារ្យហែម ចៀវ និងសឺង ង៉ុកថាញ់)។

## ២. ឥទ្ធិពលនៃសង្គ្រាមលោកលើកម្ពុជា
- ជប៉ុនចូលកាន់កាប់ឥណ្ឌូចិនក្នុងសង្គ្រាមលោកលើកទី២ និងការប្រកាសឯករាជ្យបណ្តោះអាសន្នឆ្នាំ ១៩៤៥។`,
    body_en: `## Cambodian Anticolonial Resistance
Traces the trajectory from traditional peasant revolts (Achar Sva, Kralahom Kong) to intellectual-monastic civil protests (1942 Umbrella Demonstration).`,
  },
  {
    id: "les-g11-geo-01",
    grade: 11,
    sort_order: 103,
    title_km: "នគរូបនីយកម្ម និងតំបន់សេដ្ឋកិច្ចពិសេស (SEZ)",
    title_en: "Urbanization & Special Economic Zones (SEZ)",
    summary_km: "ការរីកចម្រើននៃទីក្រុងភ្នំពេញ ហេដ្ឋារចនាសម្ព័ន្ធ និងតួនាទីតំបន់សេដ្ឋកិច្ចពិសេស",
    summary_en: "Phnom Penh municipal growth, infrastructure expansion, and industrial SEZs",
    xp_reward: 44,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g11-geo-01" },
    body_km: `## ១. នគរូបនីយកម្មនៅកម្ពុជា
រាជធានីភ្នំពេញ និងទីក្រុងសំខាន់ៗ (ក្រុងព្រះសីហនុ បាត់ដំបង សៀមរាប ប៉ោយប៉ែត) កំពុងពង្រីកខ្លួនយ៉ាងឆាប់រហ័ស ដែលទាមទារផែនការមេហេដ្ឋារចនាសម្ព័ន្ធ ប្រព័ន្ធលូ និងការគ្រប់គ្រងសំណល់។

## ២. តំបន់សេដ្ឋកិច្ចពិសេស (SEZs)
តំបន់សេដ្ឋកិច្ចពិសេស (ដូចជានៅភ្នំពេញ ក្រុងព្រះសីហនុ បាវិត) ផ្តល់ការលើកទឹកចិត្តពន្ធដារ ដើម្បីទាក់ទាញរោងចក្រផលិតបរិក្ខារអេឡិចត្រូនិក សម្ភារៈបន្ទះ និងគ្រឿងបន្លាស់រថយន្ត។`,
    body_en: `## Urbanization & Industrialization
Spatial dynamics of urban expansion and strategic deployment of SEZs for export diversification.`,
  },
  {
    id: "les-g11-geo-02",
    grade: 11,
    sort_order: 107,
    title_km: "ហេដ្ឋារចនាសម្ព័ន្ធដឹកជញ្ជូន ផ្លូវល្បឿនលឿន និងកំពង់ផែទឹកជ្រៅ",
    title_en: "Transport Infrastructure, Expressways & Deep-Sea Ports",
    summary_km: "ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ កំពង់ផែស្វយ័តក្រុងព្រះសីហនុ និងច្រករបៀងសេដ្ឋកិច្ចភាគខាងត្បូង",
    summary_en: "Phnom Penh-Sihanoukville Expressway, deep-sea container ports, and regional connectivity corridors",
    xp_reward: 42,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g11-geo-02" },
    body_km: `## ១. បណ្តាញផ្លូវគមនាគមន៍យុទ្ធសាស្ត្រ
- **ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ (E1)៖** កាត់បន្ថយពេលវេលាធ្វើដំណើរពី ៥ ម៉ោង មកត្រឹមក្រោម ២ ម៉ោង ជំរុញខ្សែច្រវាក់ផ្គត់ផ្គង់ពាណិជ្ជកម្ម។
- **ផ្លូវជាតិសំខាន់ៗ៖** ផ្លូវជាតិលេខ 1, 3, 4, 5, 6 តភ្ជាប់រាជធានីទៅកាន់គ្រប់បណ្តាខេត្ត និងប្រទេសជិតខាង (ថៃ វៀតណាម ឡាវ)។

## ២. កំពង់ផែសមុទ្រទឹកជ្រៅ និងផ្លូវអាកាស
- **កំពង់ផែស្វយ័តក្រុងព្រះសីហនុ (PAS)៖** កំពង់ផែទឹកជ្រៅតែមួយគត់របស់កម្ពុជា ដែលកំពុងពង្រីកចំណតកុងតឺន័រដើម្បីទទួលកប៉ាល់ធំៗពីអឺរ៉ុប និងអាមេរិក។
- អាកាសយានដ្ឋានអន្តរជាតិតេជោ (ក្រុងតាខ្មៅ) កម្រិត 4F សម្រាប់ហោះហើរអន្តរទ្វីប។`,
    body_en: `## Strategic Logistics & Connectivity Infrastructure
Covers expressways, deep-water port modernization in Sihanoukville, and Class 4F international aviation hubs driving economic competitiveness.`,
  },

  // ============================================================================
  // GRADE 12 — NATIONAL BAC II EXAM (បាក់ឌុប - វិទ្យាសាស្ត្រ និងសង្គម)
  // ============================================================================
  {
    id: "les-g12-khmer-01",
    grade: 12,
    sort_order: 101,
    title_km: "រឿងរាមកេរ្តិ៍ខ្មែរ (អក្សរសិល្ប៍បុរាណ - វិញ្ញាសាបាក់ឌុប)",
    title_en: "Reamker Epic & Classical Khmer Literature (Bac II)",
    summary_km: "ទស្សនវិជ្ជាសីលធម៌ ព្រះធម៌ តួអង្គព្រះរាម នាងសិតា និងក្រុងរាពណ៍",
    summary_en: "Dharmic virtue ethics, hero archetypes, and aesthetic theory in the Reamker",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-01" },
    body_km: `## ១. ប្រភព និងលក្ខណៈពិសេសនៃរឿងរាមកេរ្តិ៍ខ្មែរ
រឿងរាមកេរ្តិ៍ខ្មែរ មានប្រភពដើមមកពីរឿងរាមាយណៈឥណ្ឌា ប៉ុន្តែបុព្វបុរសខ្មែរបានកែច្នៃឱ្យស្របតាមទស្សនវិជ្ជាព្រះពុទ្ធសាសនា ទំនៀមទម្លាប់ និងចិត្តគំនិតខ្មែរ។

## ២. ការវិភាគតួអង្គ និងជម្លោះមនោគមវិជ្ជា
- **ព្រះរាម៖** តំណាងឱ្យអវតារនៃព្រះធម៌ ភាពស្មោះត្រង់ចំពោះពាក្យសច្ចៈ និងកាតព្វកិច្ចរាជការ។
- **នាងសិតា៖** តំណាងឱ្យស្ត្រីខ្មែរដ៏បរិសុទ្ធ មានភក្តីភាព និងការលះបង់ខ្ពស់។
- **ក្រុងរាពណ៍ (រាពណ៌):** តំណាងឱ្យអំណាច អវិជ្ជា តណ្ហា និងភាពអាត្មានិយម ដែលទីបំផុតត្រូវវិនាសដោយសារអធម៌។
- **ហនុមាន៖** តំណាងឱ្យសេចក្តីស្មោះត្រង់ ភាពវៃឆ្លាត និងកម្លាំងខ្លាំងពូកែ។

## ៣. ខ្លឹមសារក្នុងការប្រឡងបាក់ឌុប
វិញ្ញាសាតែងសេចក្តីបាក់ឌុបតែងតែលើកយករឿងរាមកេរ្តិ៍មកធ្វើជាប្រធានពន្យល់ ឬពិភាក្សាអំពី «អំពើល្អតែងតែឈ្នះអំពើអាក្រក់» និង «ការថែរក្សាសច្ចវាចា»។`,
    body_en: `## The Cambodian Reamker
Rooted in the Indian Ramayana but uniquely localized with Theravada Buddhist ethics, shaping national identity and classical royal ballet.`,
  },
  {
    id: "les-g12-khmer-02",
    grade: 12,
    sort_order: 102,
    title_km: "រឿងភូមិតិរច្ឆាន (ឌឹក គាម & ឌឿក អំ - វិញ្ញាសាបាក់ឌុប)",
    title_en: "Phum Tirachan Novel Analysis (Bac II Core)",
    summary_km: "ចលនាតស៊ូរបស់កសិករខ្មែរនៅភូមិក្រាំងលាវប្រឆាំងនឹងពន្ធដារបារាំង (បាដេស)",
    summary_en: "Peasant resistance against French colonial taxation in Krang Leav village (Bandez)",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-02" },
    body_km: `## ១. បរិបទប្រវត្តិសាស្ត្រ
រឿង «ភូមិតិរច្ឆាន» និពន្ធដោយលោក **ឌឹក គាម** និង **ឌឿក អំ** ឆ្លុះបញ្ចាំងពីព្រឹត្តិការណ៍ពិតនៅថ្ងៃទី ១៨ ខែមេសា ឆ្នាំ ១៩២៥ នៅភូមិក្រាំងលាវ ស្រុករលាប្អៀរ ខេត្តកំពង់ឆ្នាំង។

## ២. មូលហេតុនៃព្រឹត្តិការណ៍
បារាំងបានដំឡើងពន្ធដារយ៉ាងធ្ងន់ធ្ងរ (ពន្ធក្បាលមនុស្ស ពន្ធដី ពន្ធសត្វពាហនៈ)។ លោកបាដេស (Bandez) ជាអ្នកប្រមូលពន្ធបារាំង បានចាប់ចង និងធ្វើទារុណកម្មអ្នកភូមិដែលគ្មានប្រាក់បង់ពន្ធ។

## ៣. ការបះបោរ និងការដាក់ឈ្មោះភូមិ
ដោយទ្រាំមិនបាននឹងការជិះជាន់ អ្នកភូមិដឹកនាំដោយតាជួន និងអ្នកភូមិឯទៀត បានងើបបះបោរសម្លាប់បាដេស។ អាជ្ញាធរបារាំងបានសងសឹកដោយប្តូរឈ្មោះភូមិក្រាំងលាវទៅជា «ភូមិតិរច្ឆាន» (ភូមិសត្វតិរច្ឆាន)។

## ៤. សារៈសំខាន់សម្រាប់ការប្រឡងបាក់ឌុប
បង្ហាញពីស្មារតីស្នេហាជាតិ ភាពអង់អាចក្លាហានរបស់កសិករខ្មែរ និងភាពអយុត្តិធម៌នៃរបបអាណានិគម។`,
    body_en: `## Phum Tirachan (Village of the Beasts)
Historical novel documenting the 1925 Krang Leav rebellion against oppressive French colonial taxation.`,
  },
  {
    id: "les-g12-khmer-03",
    grade: 12,
    sort_order: 103,
    title_km: "រឿងកុលាបប៉ៃលិន (ស្នាដៃ ញ៉ុក ថែម - ទស្សនៈមនុស្សធម៌)",
    title_en: "Kolap Pailin Novel: Humanism, Labor & Integrity (Nhok Them)",
    summary_km: "ការវិភាគតួអង្គចៅចិត្រ ឃុននារី ផែនដីពេជ្រប៉ៃលិន និងគុណធម៌ការងារស្មោះត្រង់",
    summary_en: "Literary analysis of Chao Chet, Khun Neary, and the humanistic virtues of honest work in Pailin",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-03" },
    body_km: `## ១. សាវតានិងទស្សនវិជ្ជានៃរឿងកុលាបប៉ៃលិន
និពន្ធដោយលោក ញ៉ុក ថែម (បោះពុម្ពឆ្នាំ ១៩៤៣)។ រឿងនេះឆ្លុះបញ្ចាំងពីតម្លៃសីលធម៌នៃការតស៊ូព្យាយាម ភាពស្មោះត្រង់ និងទស្សនៈមនុស្សធម៌ជឿនលឿន។

## ២. ការវិភាគតួអង្គចៅចិត្រ
- ចៅចិត្រជាយុវជនមានប្រភពពីគ្រួសារក្រីក្រ ប៉ុន្តែមានចរិយាសម្បត្តិថ្លៃថ្នូរ ឧស្សាហ៍ព្យាយាម មានភក្តីភាព និងមិនលោភលន់ចំពោះទ្រព្យសម្បត្តិរបស់អ្នកដទៃ (ពេលរើសបានពេជ្រធ្លាក់)។
- ស្នេហារវាងចៅចិត្រ និងឃុននារី យកឈ្នះលើរបាំងវណ្ណៈសង្គម ដោយសារគុណធម៌ និងការទទួលស្គាល់ពីហ្លួងរតនសម្បត្តិ។

## ៣. តម្លៃអប់រំសម្រាប់វិញ្ញាសាបាក់ឌុប
- "តម្លៃមនុស្សស្ថិតនៅលើអំពើល្អ សេចក្តីព្យាយាម និងចំណេះដឹង មិនមែនលើទ្រព្យសម្បត្តិឡើយ"។`,
    body_en: `## Humanism in Kolap Pailin
Literary critique of Chao Chet's moral integrity, labor dignity, and egalitarian values transcending feudal caste divisions in colonial-era Pailin.`,
  },
  {
    id: "les-g12-khmer-04",
    grade: 12,
    sort_order: 104,
    title_km: "វិធីសាស្ត្រតែងសេចក្តីពន្យល់ និងពិភាក្សាសម្រាប់បាក់ឌុប (Bac II Essay Writing)",
    title_en: "Bac II Khmer Essay Methodology: Expository & Discursive",
    summary_km: "គន្លឹះដោះស្រាយប្រធានតែងសេចក្តីពន្យល់ ពិភាក្សា និងប្រៀបធៀបដើម្បីទទួលបាននិទ្ទេស A",
    summary_en: "Rigorous MoEYS grading rubric structure, argumentative proofs, and rhetorical synthesis for Bac II Grade A",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-04" },
    body_km: `## ១. ក្បួនតែងសេចក្តីកម្រិតបាក់ឌុប (Baccalaureate II Standards)
តែងសេចក្តីមាន ៣ ប្រភេទធំៗដែលតែងចេញប្រឡងបាក់ឌុប៖
១. **ប្រធានពន្យល់៖** តម្រូវឱ្យសិស្សពន្យល់ន័យ លើកឧទាហរណ៍បញ្ជាក់ឱ្យច្បាស់ពីខ្លឹមសារប្រធាន។
២. **ប្រធានពិភាក្សា៖** តម្រូវឱ្យសិស្សពិចារណាគំនិត ២ ផ្ទុយគ្នា (គំនិតស្រប និងគំនិតជំទាស់) រួចធ្វើការសំយោគគំនិត។
៣. **ប្រធានប្រៀបធៀប៖** រកចំណុចដូចគ្នា និងចំណុចខុសគ្នារវាងស្នាដៃពីរ ឬទស្សនៈពីរ។

## ២. ប្លង់លម្អិតនៃតួសេចក្តីប្រធានពិភាក្សា
- **គំនិតស្រប (Thesis):** ពន្យល់និងលើកភស្តុតាងគាំទ្រទស្សនៈទីមួយ
- **គំនិតជំទាស់ (Antithesis):** ចង្អុលបង្ហាញដែនកំណត់ ឬទស្សនៈផ្ទុយ
- **ការសំយោគគំនិត (Synthesis):** រកចំណុចកណ្តាលដ៏ត្រឹមត្រូវតាមទស្សនវិជ្ជាជីវិតជាក់ស្តែង។`,
    body_en: `## Baccalaureate II National Khmer Essay Protocol
Methodological mastery of MoEYS criteria: thesis construction, antithetical counter-arguments, literary evidence integration, and dialectical synthesis.`,
  },
  {
    id: "les-g12-hist-01",
    grade: 12,
    sort_order: 103,
    title_km: "កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១",
    title_en: "Paris Peace Agreements (October 23, 1991)",
    summary_km: "ដំណើរការស្វែងរកសន្តិភាព ការបោះឆ្នោតឆ្នាំ ១៩៩៣ និងការកកើតព្រះរាជាណាចក្រកម្ពុជាទី២",
    summary_en: "Comprehensive peace process, UNTAC mission, 1993 elections, and Second Kingdom",
    xp_reward: 45,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g12-hist-01" },
    body_km: `## ១. មូលហេតុ និងដំណើរការចរចា
ក្រោយសង្គ្រាមស៊ីវិលដ៏រ៉ាំរ៉ៃ ភាគីខ្មែរទាំង ៤ បានចូលរួមចរចារកសន្តិភាព ក្រោមព្រះរាជកិច្ចដឹកនាំរបស់ **ព្រះករុណា ព្រះបាទ សម្តេចព្រះ នរោត្តម សីហនុ** ដោយមានការគាំទ្រពីសហគមន៍អន្តរជាតិ។

## ២. ចំណុចស្នូលនៃកិច្ចព្រមព្រៀង ២៣ តុលា ១៩៩១
- បញ្ចប់ជម្លោះប្រដាប់អាវុធ និងបង្រួបបង្រួមជាតិ
- បង្កើតអាជ្ញាធរបណ្តោះអាសន្នអង្គការសហប្រជាជាតិនៅកម្ពុជា (UNTAC)
- រៀបចំការបោះឆ្នោតសកលដោយសេរី ត្រឹមត្រូវ និងយុត្តិធម៌ នៅខែឧសភា ឆ្នាំ ១៩៩៣
- បង្កើតរដ្ឋធម្មនុញ្ញថ្មី និងស្ថាបនាឡើងវិញនូវ «ព្រះរាជាណាចក្រកម្ពុជា» តាមរបបរាជានិយមអាស្រ័យរដ្ឋធម្មនុញ្ញ។`,
    body_en: `## Paris Peace Accords (1991)
Historical landmark ending civil war, leading to the UNTAC peacekeeping mission and the restoration of the Kingdom of Cambodia.`,
  },
  {
    id: "les-g12-hist-02",
    grade: 12,
    sort_order: 104,
    title_km: "នយោបាយឈ្នះ-ឈ្នះ និងសន្តិភាពពេញលេញនៅកម្ពុជា",
    title_en: "Win-Win Policy & Complete National Peace",
    summary_km: "ការរំលាយអង្គការចាត់តាំងខ្មែរក្រហម ការបង្រួបបង្រួមទឹកដី និងឯកភាពជាតិឆ្នាំ ១៩៩៨",
    summary_en: "Dissolution of Khmer Rouge military structures, territorial integrity, and 1998 unity",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g12-hist-02" },
    body_km: `## ១. សសរស្តម្ភ ៣ នៃនយោបាយឈ្នះ-ឈ្នះ
១. **ធានាអាយុជីវិត និងរូបកាយ៖** គ្មានការសងសឹក ឬចាប់ចងអ្នកផ្តាច់ខ្លួនឡើយ
២. **ធានាអាជីព និងមុខរបរ៖** ទទួលស្គាល់ឋានន្តរសក្តិ និងតួនាទីក្នុងជួរកងទ័ព/រដ្ឋបាល
៣. **ធានាកម្មសិទ្ធិ និងទ្រព្យសម្បត្តិ៖** រក្សាទុកដីធ្លី និងផ្ទះសម្បែងជូនអ្នកផ្តាច់ខ្លួន

## ២. លទ្ធផលជាប្រវត្តិសាស្ត្រ
នៅចុងឆ្នាំ ១៩៩៨ អង្គការចាត់តាំងខាងនយោបាយ និងយោធារបស់ខ្មែរក្រហមត្រូវបានរំលាយទាំងស្រុង ដែលនាំមកនូវសន្តិភាព និងការរួបរួមទឹកដីពេញលេញជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រជាង ៥០០ ឆ្នាំ។`,
    body_en: `## Win-Win Policy (1998)
Guaranteed life, profession, and property to former combatants, achieving complete territorial and political peace for the first time in over five centuries.`,
  },
  {
    id: "les-g12-hist-03",
    grade: 12,
    sort_order: 107,
    title_km: "កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១ និងការបោះឆ្នោតអ៊ុនតាក់",
    title_en: "1991 Paris Peace Accords & UNTAC Democratic Elections",
    summary_km: "ការចរចាសន្តិភាព ការចុះហត្ថលេខានៅប៉ារីស បេសកកម្មអ៊ុនតាក់ និងការបង្កើតរដ្ឋធម្មនុញ្ញថ្មី ១៩៩៣",
    summary_en: "Four-party negotiations, 1991 Paris Accords signing, UNTAC peacekeeping mission, and the 1993 Constitution",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g12-hist-03" },
    body_km: `## ១. កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស (២៣ តុលា ១៩៩១)
បន្ទាប់ពីសង្គ្រាមស៊ីវិលរ៉ាំរ៉ៃជាងពីរទសវត្សរ៍ ភាគីជម្លោះកម្ពុជាទាំង ៤ បានចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងសន្តិភាពនៅទីក្រុងប៉ារីស ដោយមានប្រទេសហត្ថលេខីចំនួន ១៨ ចូលរួមធ្វើជាសាក្សី។
- គោលការណ៍គ្រឹះ៖ បញ្ចប់សង្គ្រាម ដកកងទ័ពបរទេស និងរៀបចំការបោះឆ្នោតតាមបែបប្រជាធិបតេយ្យ។

## ២. បេសកកម្មអ៊ុនតាក់ (UNTAC) និងការបោះឆ្នោតឆ្នាំ ១៩៩៣
- អាជ្ញាធរបណ្តោះអាសន្នអង្គការសហប្រជាជាតិនៅកម្ពុជា (UNTAC) បានរៀបចំការបោះឆ្នោតសកលនៅខែឧសភា ឆ្នាំ ១៩៩៣ ដែលមានប្រជាពលរដ្ឋចូលរួមបោះឆ្នោតជិត ៩០%។
- សភាធម្មនុញ្ញត្រូវបានបង្កើតឡើង និងអនុម័ត **រដ្ឋធម្មនុញ្ញថ្មីនៅថ្ងៃទី ២៤ កញ្ញា ១៩៩៣** ដោយប្រកាសព្រះរាជាណាចក្រកម្ពុជាទីពីរ និងរបបរាជាធិបតេយ្យអាស្រ័យរដ្ឋធម្មនុញ្ញ។`,
    body_en: `## The 1991 Paris Peace Accords & UNTAC
The historic quadripartite diplomatic peace architecture that ended decades of civil conflict, paving the way for the UNTAC mission and the 1993 Constitution.`,
  },
  {
    id: "les-g12-hist-04",
    grade: 12,
    sort_order: 108,
    title_km: "នយោបាយ ឈ្នះ-ឈ្នះ ការរំលាយអង្គការចាត់តាំងខ្មែរក្រហម និងសន្តិភាពពេញលេញ (១៩៩៨)",
    title_en: "Win-Win Policy, Khmer Rouge Dissolution & Complete Peace (1998)",
    summary_km: "គោលការណ៍គ្រឹះទាំងបីនៃនយោបាយឈ្នះ-ឈ្នះ ការធ្វើសមាហរណកម្មកងទ័ព និងសន្តិភាពពេញលេញទូទាំងប្រទេស",
    summary_en: "Three core tenets of Win-Win policy, demobilization, full pacification, and nation-building era",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g12-hist-04" },
    body_km: `## ១. យុទ្ធសាស្ត្រនយោបាយ ឈ្នះ-ឈ្នះ (ដាក់ចេញដោយសម្តេចតេជោ ហ៊ុន សែន)
ទោះបីមានការបោះឆ្នោតឆ្នាំ ១៩៩៣ ក៏កម្ពុជាមិនទាន់មានសន្តិភាពពេញលេញនៅឡើយ ដោយសារកងកម្លាំងខ្មែរក្រហមបន្តកាន់កាប់តំបន់មួយចំនួន (ប៉ៃលិន សំឡូត អន្លង់វែង)។ "នយោបាយ ឈ្នះ-ឈ្នះ" ត្រូវបានដាក់ចេញដើម្បីបញ្ចប់សង្គ្រាមដោយសន្តិវិធី។

## ២. គោលការណ៍គ្រឹះទាំង ៣ នៃនយោបាយ ឈ្នះ-ឈ្នះ
១. **ការធានាអាយុជីវិត និងរូបកាយ៖** គ្មានការសងសឹក គ្មានការចាប់ចង ឬសម្លាប់
២. **ការធានាអាជីព និងមុខរបរ៖** ទទួលស្គាល់ឋានៈ និងបញ្ចូលកងទ័ពខ្មែរក្រហមទៅក្នុងកងយោធពលខេមរភូមិន្ទ
៣. **ការធានាកម្មសិទ្ធិ និងទ្រព្យសម្បត្តិ៖** អនុញ្ញាតឱ្យរក្សាទុកដីធ្លី និងផ្ទះសម្បែងដែលកំពុងកាន់កាប់។

## ៣. លទ្ធផលជាប្រវត្តិសាស្ត្រ (២៩ ធ្នូ ១៩៩៨)
នៅចុងឆ្នាំ ១៩៩៨ អង្គការចាត់តាំងទាំងខាងនយោបាយនិងយោធារបស់ខ្មែរក្រហមត្រូវបានរំលាយទាំងស្រុង កម្ពុជាទទួលបាន **សន្តិភាព និងឯកភាពជាតិពេញលេញជាលើកដំបូងក្នុងរយៈពេលជាង ៥០០ ឆ្នាំ**។`,
    body_en: `## The Win-Win Policy & Comprehensive Pacification
Analyzes the tri-pillar guarantees (life, career integration, property preservation) that peacefully dissolved the Khmer Rouge movement by December 1998.`,
  },
  {
    id: "les-g12-geo-01",
    grade: 12,
    sort_order: 105,
    title_km: "សេដ្ឋកិច្ចកម្ពុជា និងសមាហរណកម្មអាស៊ាន",
    title_en: "Cambodia's Economy & ASEAN Integration",
    summary_km: "សសរស្តម្ភសេដ្ឋកិច្ចទាំង ៤ (កាត់ដេរ ទេសចរណ៍ សំណង់ កសិកម្ម) និងកាលានុវត្តភាពអាស៊ាន",
    summary_en: "Four economic growth pillars (garments, tourism, construction, agriculture) & ASEAN",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g12-geo-01" },
    body_km: `## ១. សសរស្តម្ភទាំង ៤ នៃកំណើនសេដ្ឋកិច្ចកម្ពុជា
១. **វិស័យកាត់ដេរ និងស្បែកជើង៖** ប្រភពនាំចេញដ៏ធំបំផុត និងផ្តល់ការងាររាប់សែនកន្លែង
២. **វិស័យទេសចរណ៍៖** «មាសបៃតង» ទាក់ទាញភ្ញៀវទេសចរអន្តរជាតិមកទស្សនាប្រាសាទបុរាណ និងតំបន់ឆ្នេរ
៣. **វិស័យសំណង់ និងអចលនទ្រព្យ៖** ជំរុញការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធ និងនគរូបនីយកម្ម
៤. **វិស័យកសិកម្ម៖** ស្រូវ អង្ករ កៅស៊ូ ដំឡូងមី ស្វាយចន្ទី ធានាសន្តិសុខស្បៀង

## ២. សមាហរណកម្មក្នុងសហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC)
កម្ពុជាបានចូលជាសមាជិកអាស៊ាននៅឆ្នាំ ១៩៩៩ ដោយទទួលបានអត្ថប្រយោជន៍ពីទីផ្សារសេរី ការវិនិយោគផ្ទាល់ពីបរទេស (FDI) និងកិច្ចសហប្រតិបត្តិការតំបន់។`,
    body_en: `## 4 Pillars of Economic Growth
Garments, tourism, construction, and agriculture sustain Cambodia's GDP expansion within the ASEAN Economic Community.`,
  },
  {
    id: "les-g12-geo-02",
    grade: 12,
    sort_order: 110,
    title_km: "សមាហរណកម្មអាស៊ាន និងសេដ្ឋកិច្ចតំបន់ (ASEAN Community)",
    title_en: "ASEAN Economic Integration & Regional Trade",
    summary_km: "សហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC) កិច្ចព្រមព្រៀង RCEP និងតួនាទីយុទ្ធសាស្ត្រកម្ពុជា",
    summary_en: "AEC single market, RCEP tariff elimination, and Cambodia's geoeconomic position in ASEAN",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g12-geo-02" },
    body_km: `## ១. សហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC)
- កម្ពុជាបានចូលជាសមាជិកអាស៊ាននៅថ្ងៃទី ៣០ ខែមេសា ឆ្នាំ ១៩៩៩ (ជាសមាជិកទី ១០)។
- សហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC) បង្កើតទីផ្សារ និងមូលដ្ឋានផលិតកម្មតែមួយ ដោយមានលំហូរដោយសេរីនូវទំនិញ សេវាកម្ម វិនិយោគ និងពលករជំនាញ។

## ២. កិច្ចព្រមព្រៀង RCEP និងពាណិជ្ជកម្មអន្តរជាតិ
- កិច្ចព្រមព្រៀងភាពជាដៃគូសេដ្ឋកិច្ចគ្រប់ជ្រុងជ្រោយតំបន់ (RCEP) បង្កើតប្លុកពាណិជ្ជកម្មសេរីធំបំផុតក្នុងពិភពលោក (អាស៊ាន + ចិន ជប៉ុន កូរ៉េខាងត្បូង អូស្ត្រាលី នូវែលសេឡង់)
- ផ្តល់ឱកាសឱ្យកម្ពុជានាំចេញកសិផល គ្រឿងអេឡិចត្រូនិក និងទាក់ទាញវិនិយោគទុនផ្ទាល់ពីបរទេស (FDI)។`,
    body_en: `## ASEAN Integration & Regional Geoeconomics
Details Cambodia's entry into ASEAN (1999), AEC market dynamics, and the RCEP megaregional trade agreement.`,
  },
  {
    id: "les-g12-geo-03",
    grade: 12,
    sort_order: 111,
    title_km: "បម្រែបម្រួលអាកាសធាតុ និងការគ្រប់គ្រងធនធានទឹកកម្ពុជា",
    title_en: "Climate Change, Droughts & Sustainable Hydrology",
    summary_km: "ផលប៉ះពាល់នៃការឡើងកម្តៅផែនដី ទឹកជំនន់ រាំងស្ងួត និងយុទ្ធសាស្ត្រធន់នឹងអាកាសធាតុ",
    summary_en: "Impact of global warming on the Mekong-Tonle Sap pulse, drought resilience, and renewable policies",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g12-geo-03" },
    body_km: `## ១. ផលប៉ះពាល់នៃបម្រែបម្រួលអាកាសធាតុនៅកម្ពុជា
- **បាតុភូតអែលនីញ៉ូ (El Niño) និងឡានីញ៉ា (La Niña)៖** បង្កឱ្យមានគ្រោះរាំងស្ងួតអូសបន្លាយ ឬទឹកជំនន់ធ្ងន់ធ្ងរខុសប្រក្រតី។
- **ការប្រែប្រួលរបបទឹកទន្លេមេគង្គ៖** ធ្វើឱ្យប៉ះពាល់ដល់ការហូរច្រាសទិសនៃបឹងទន្លេសាប ការបន្តពូជរបស់ត្រី និងការស្រោចស្រពកសិកម្ម។

## ២. យុទ្ធសាស្ត្រជាតិស្តីពីការប្រែប្រួលអាកាសធាតុ (CCCSP)
- ការកសាងទំនប់អាងស្តុកទឹក និងប្រព័ន្ធព្រមានគ្រោះមហន្តរាយទុកជាមុន
- ការជំរុញថាមពលកកើតឡើងវិញ (ថាមពលពន្លឺព្រះអាទិត្យ វារីអគ្គិសនី) និងការកាត់បន្ថយការបំភាយឧស្ម័នផ្ទះកញ្ចក់។`,
    body_en: `## Climate Resilience & Mekong Hydrology
Analyzes the changing Mekong-Tonle Sap flood pulse, drought vulnerability, and Cambodia's Climate Change Strategic Plan (CCCSP).`,
  },
  {
    id: "les-g12-geo-04",
    grade: 12,
    sort_order: 112,
    title_km: "នគរូបនីយកម្ម និងផែនការមេអភិវឌ្ឍន៍រាជធានីភ្នំពេញ (Urbanization)",
    title_en: "Urban Growth & Phnom Penh Metropolitan Master Plan",
    summary_km: "ការកើនឡើងប្រជាជនទីក្រុង ការគ្រប់គ្រងសំណល់ ហេដ្ឋារចនាសម្ព័ន្ធបៃតង និងទីក្រុងឆ្លាតវៃ (Smart City)",
    summary_en: "Rapid urban demographic growth, zoning, solid waste management, and green smart city master planning",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g12-geo-04" },
    body_km: `## ១. ល្បឿននៃនគរូបនីយកម្មនៅកម្ពុជា
- រាជធានីភ្នំពេញមានប្រជាជនរស់នៅជាង ២,២ លាននាក់ ដោយសារកំណើនសេដ្ឋកិច្ច និងការធ្វើចំណាកស្រុកពីជនបទមករកការងារ។
- ការពង្រីកទីក្រុងរណប (កោះពេជ្រ ជ្រោយចង្វារ អ៊ឹង ខុងទ្រី ទីក្រុងកាំកូ)។

## ២. បញ្ហាប្រឈម និងផែនការមេឆ្នាំ ២០៣៥
- **បញ្ហាប្រឈម៖** ការកកស្ទះចរាចរណ៍ ការគ្រប់គ្រងសំណល់រឹង និងប្រព័ន្ធលូបង្ហូរទឹកភ្លៀងជៀសវាងការលិចលង់។
- **ផែនការមេ៖** ការសាងសង់ប្រព័ន្ធដឹកជញ្ជូនសាធារណៈ (រថយន្តក្រុង ផ្លូវដែកស្រាល AGT) និងការបង្កើនលំហបៃតងសាធារណៈ។`,
    body_en: `## Urban Geography & Phnom Penh Master Plan 2035
Studies demographic concentration, satellite cities, municipal solid waste management, and smart transit infrastructure.`,
  },
  {
    id: "les-g12-moral-01",
    grade: 12,
    sort_order: 106,
    title_km: "សីលធម៌សង្គម នីតិរដ្ឋ និងសិទ្ធិមនុស្ស",
    title_en: "Social Ethics, Rule of Law & Human Rights",
    summary_km: "សេចក្តីថ្លៃថ្នូររបស់មនុស្ស សមភាពចំពោះមុខច្បាប់ និងទំនួលខុសត្រូវពលរដ្ឋ",
    summary_en: "Human dignity, equality before the law, constitutional rights, and civic duties",
    xp_reward: 45,
    estimated_minutes: 20,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g12-moral-01" },
    body_km: `## ១. នីតិរដ្ឋ (Rule of Law)
នីតិរដ្ឋ គឺជាគោលការណ៍ដែលបុគ្គលគ្រប់រូប និងស្ថាប័នទាំងអស់ ត្រូវស្ថិតនៅក្រោមច្បាប់ និងស្មើភាពគ្នាចំពោះមុខច្បាប់ ដោយគ្មានការរើសអើង។

## ២. សិទ្ធិមនុស្ស និងសិទ្ធិពលរដ្ឋក្នុងរដ្ឋធម្មនុញ្ញកម្ពុជា
- **សិទ្ធិរស់រានមានជីវិត សេរីភាព និងសន្តិសុខផ្ទាល់ខ្លួន**
- **សិទ្ធិទទួលបានការអប់រំ និងការថែទាំសុខភាព**
- **សេរីភាពខាងជំនឿសាសនា និងការបញ្ចេញមតិក្នុងក្របខ័ណ្ឌច្បាប់**
- **កាតព្វកិច្ចពលរដ្ឋ៖** គោរពច្បាប់ ស្រឡាញ់មាតុភូមិ និងចូលរួមកសាងសង្គមជាតិ។`,
    body_en: `## Rule of Law & Constitutional Rights
Every citizen is equal before the law with guaranteed human rights, educational access, and reciprocal civic responsibilities.`,
  },
  {
    id: "les-g12-moral-02",
    grade: 12,
    sort_order: 116,
    title_km: "នីតិរដ្ឋ ក្រមសីលធម៌វិជ្ជាជីវៈ និងការប្រឆាំងអំពើពុករលួយ",
    title_en: "Rule of Law, Professional Ethics & Anti-Corruption Mechanisms",
    summary_km: "អភិបាលកិច្ចល្អ តួនាទីអង្គភាពប្រឆាំងអំពើពុករលួយ (ACU) និងតម្លាភាពសង្គម",
    summary_en: "Good governance, Anti-Corruption Unit (ACU) institutional role, accountability, and professional ethics",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g12-moral-02" },
    body_km: `## ១. នីតិរដ្ឋ និងអភិបាលកិច្ចល្អ (Good Governance)
នីតិរដ្ឋ (Rule of Law) ធានាថាច្បាប់ត្រូវតែអនុវត្តស្មើភាពគ្នាចំពោះបុគ្គលគ្រប់រូប ទោះជាមន្ត្រីរដ្ឋ ឬប្រជាពលរដ្ឋសាមញ្ញ។
- **សសរស្តម្ភនៃអភិបាលកិច្ចល្អ៖** តម្លាភាព (Transparency), គណនេយ្យភាព (Accountability), ការចូលរួម (Participation) និងប្រសិទ្ធភាព។

## ២. ច្បាប់ស្តីពីការប្រឆាំងអំពើពុករលួយ និងអង្គភាព ACU
- អំពើពុករលួយបំផ្លាញសេដ្ឋកិច្ចជាតិ អយុត្តិធម៌សង្គម និងបាត់បង់ទំនុកចិត្តពីវិនិយោគិន។
- **តួនាទីរបស់ ACU៖** អប់រំ បង្ការទប់ស្កាត់ និងបង្ក្រាបបទល្មើសពុករលួយគ្រប់ទម្រង់
- **ក្រមសីលធម៌វិជ្ជាជីវៈ៖** ភាពស្មោះត្រង់ យុត្តិធម៌ មិនទទួលសំណូក និងការការពារផលប្រយោជន៍សាធារណៈ។`,
    body_en: `## Rule of Law & Institutional Integrity
Explores principles of good governance, the statutory authority of the Anti-Corruption Unit (ACU), and code of ethics across public and private sectors.`,
  },
  {
    id: "les-g12-eng-01",
    grade: 12,
    sort_order: 107,
    title_km: "Bac II Academic Reading Comprehension & Writing",
    title_en: "Bac II Academic Reading Comprehension & Writing",
    summary_km: "យុទ្ធសាស្ត្រដោះស្រាយវិញ្ញាសាអានយល់ន័យ វាក្យសព្ទ និងវេយ្យាករណ៍បាក់ឌុប",
    summary_en: "Skimming, scanning, contextual vocabulary, and error identification for national exams",
    xp_reward: 45,
    estimated_minutes: 22,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g12-eng-01" },
    body_km: `## 1. Reading Strategies for Bac II Examination
- **Skimming:** Read rapidly for the main idea and thesis statement.
- **Scanning:** Search for specific numbers, dates, proper nouns, or key formulas.
- **Context Clues:** Deduce the meaning of unfamiliar vocabulary using surrounding synonyms and contrast connectors.

## 2. Key Grammar Structures for National Exams
- Passive Voice: *Object + be + Past Participle (V3)*
  - *Active:* Scientists discover new renewable energy sources.
  - *Passive:* New renewable energy sources are discovered by scientists.
- Conditional Sentences (Types 1, 2, and 3)
- Relative Clauses (*who, which, that, where*)`,
    body_en: `## National Bac II English Exam Strategy
Focuses on reading comprehension, contextual vocabulary inference, active-passive voice transformation, and conditional logic.`,
  },
  {
    id: "les-g12-eng-02",
    grade: 12,
    sort_order: 114,
    title_km: "Bac II Argumentative Writing & Advanced Syntax Mastery",
    title_en: "Bac II Argumentative Writing & Advanced Syntax Mastery",
    summary_km: "រចនាសម្ព័ន្ធតែងសេចក្តីជាភាសាអង់គ្លេស ការប្រើ Inversion, Cleft Sentences និង connectors",
    summary_en: "Persuasive argumentation structure, thesis framing, formal syntactic inversions, and essay rubrics",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g12-eng-02" },
    body_km: `## 1. Advanced Argumentative Essay Architecture
- **Introductory Paragraph:** Hook + Background Context + Explicit Thesis Statement (*"While some believe X, evidence strongly indicates Y because A and B."*)
- **Body Paragraphs (PEEL method):**
  - **P**oint: Clear topic sentence introducing the argument
  - **E**xplanation: Detailed explanation of the underlying logic
  - **E**xample / Evidence: Authentic facts, statistics, or real-world cases
  - **L**ink: Connect back to the overarching thesis.
- **Refutation Paragraph:** Address counterarguments directly and refute them logically.

## 2. Advanced Syntactic Structures for High Exam Scores
- **Negative Inversion:**
  - *Normal:* "We rarely see such rapid economic modernization."
  - *Inverted:* "Rarely do we see such rapid economic modernization."
  - *Not only... but also:* "Not only does technology improve education, but it also creates green jobs."`,
    body_en: `## Academic Writing & Formal Inversion
Mastering the PEEL paragraph framework, counter-argument refutation, and stylistically sophisticated negative inversions for national exams.`,
  },
  {
    id: "les-g12-ict-01",
    grade: 12,
    sort_order: 108,
    title_km: "មូលដ្ឋានទិន្នន័យទំនាក់ទំនង និងភាសា SQL",
    title_en: "Relational Databases & SQL Fundamentals",
    summary_km: "តារាងទិន្នន័យ កូនសោចម្បង (Primary Key) កូនសោក្រៅ និងសំណួរ SQL (SELECT, INSERT)",
    summary_en: "Relational tables, primary/foreign keys, normalization, and structured queries",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g12-ict-01" },
    body_km: `## ១. គំនិតគ្រឹះនៃមូលដ្ឋានទិន្នន័យទំនាក់ទំនង (RDBMS)
- **Table (តារាង)៖** ផ្ទុកទិន្នន័យរៀបចំជាជួរដេក (Records/Rows) និងជួរឈរ (Columns/Fields)
- **Primary Key (PK)៖** កូនសោចម្បងសម្រាប់សម្គាល់ទិន្នន័យនីមួយៗមិនឱ្យជាន់គ្នា (Unique)
- **Foreign Key (FK)៖** កូនសោក្រៅសម្រាប់ភ្ជាប់ទំនាក់ទំនងរវាងតារាងពីរ

## ២. សំណួរមូលដ្ឋានក្នុងភាសា SQL
'''sql
-- ទាញយកទិន្នន័យសិស្សទាំងអស់ដែលមានពិន្ទុចាប់ពី ៨០ ឡើងទៅ
SELECT name, grade, score 
FROM students 
WHERE score >= 80 
ORDER BY score DESC;
'''`,
    body_en: `## Relational Databases & SQL
Covers tables, primary/foreign key relational schema design, and standard SQL queries (SELECT, WHERE, JOIN).`,
  },
  {
    id: "les-g12-ict-02",
    grade: 12,
    sort_order: 118,
    title_km: "បណ្តាញកុំព្យូទ័រ សុវត្ថិភាពអ៊ីនធឺណិត និង Cloud Computing",
    title_en: "Computer Networks, Cybersecurity & Cloud Architecture",
    summary_km: "គំរូ OSI, TCP/IP, អាសយដ្ឋាន IP, ការការពារមេរោគ Ransomware និងសេវា Cloud",
    summary_en: "OSI 7-layer stack, TCP/IP, subnetting, symmetric/asymmetric encryption, and Cloud IaaS/PaaS",
    xp_reward: 45,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g12-ict-02" },
    body_km: `## ១. គំនិតគ្រឹះនៃបណ្តាញកុំព្យូទ័រ (Computer Networks)
- **ប្រភេទបណ្តាញ៖** LAN (Local Area Network), WAN (Wide Area Network - អ៊ីនធឺណិត)
- **គំរូ TCP/IP និងអាសយដ្ឋាន IP៖**
  - **IPv4 (32-bit):** ឧ. '192.168.1.1'
  - **IPv6 (128-bit):** ដោះស្រាយបញ្ហាកង្វះអាសយដ្ឋាន IP លើសកលលោក។

## ២. សុវត្ថិភាពអ៊ីនធឺណិត (Cybersecurity)
- **ការគំរាមកំហែងទូទៅ៖** Phishing (ការបោកបញ្ឆោតយកលេខសម្ងាត់), Malware, Ransomware (មេរោគចាប់ជំរិតទិន្នន័យ)
- **វិធានការការពារ៖** ការផ្ទៀងផ្ទាត់ ២ ជាន់ (Two-Factor Authentication - 2FA), ការប្រើលេខកូដសម្ងាត់ខ្លាំង និងការអ៊ិនគ្រីប (Encryption SSL/TLS)។

## ៣. Cloud Computing (IaaS, PaaS, SaaS)
ការប្រើប្រាស់ធនធានកុំព្យូទ័រតាមអ៊ីនធឺណិត (ដូចជា Google Drive, AWS, Cloud Storage) ដោយមិនចាំបាច់វិនិយោគលើម៉ាស៊ីន Server ផ្ទាល់។`,
    body_en: `## Networking, Security & Cloud Paradigm
In-depth coverage of LAN/WAN topologies, IPv4/IPv6 networking, cybersecurity hygiene (2FA, phishing detection, TLS encryption), and Cloud service tiers.`,
  },

  // ============================================================================
  // ADDITIONAL OFFICIAL MOEYS NATIONAL CURRICULUM HUMANITIES LESSONS (GRADE 12)
  // ============================================================================

  {
    id: "les-g12-khmer-05",
    grade: 12,
    sort_order: 119,
    title_km: "ទស្សនវិជ្ជាព្រះពុទ្ធសាសនាក្នុងអក្សរសិល្ប៍ខ្មែរ",
    title_en: "Buddhist Philosophy in Classical Khmer Literature",
    summary_km: "ទ្រឹស្តីកម្មផល ច្បាប់អនិច្ចំ ទុក្ខំ អនត្តា និងឥទ្ធិពលគម្ពីរព្រះត្រៃបិដកលើសីលធម៌ និងអក្សរសិល្ប៍ជាតិ",
    summary_en: "Karmic causality, Buddhist philosophical pillars, and their pervasive ethical influence across classic Khmer literary epics",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-05" },
    body_km: "## ១. ទស្សនវិជ្ជាព្រះពុទ្ធសាសនា និងអក្សរសិល្ប៍\nព្រះពុទ្ធសាសនាថេរវាទជាគ្រឹះវប្បធម៌ និងសីលធម៌ខ្មែរអស់កាលរាប់ពាន់ឆ្នាំ។ ស្នាដៃអក្សរសិល្ប៍បុរាណស្ទើរទាំងអស់ (រឿងរាមកេរ្តិ៍ ទុំទាវ ក្រុងសុភមិត្រ) តែងតែបង្កប់នូវទស្សនវិជ្ជាព្រះធម៌៖\n- **ច្បាប់កម្មផល (Karmic Law) ៖** ធ្វើល្អបានល្អ ធ្វើអាក្រក់បានអាក្រក់។\n- **ត្រៃលក្ខណ៍ ៖** អនិច្ចំ (ភាពមិនទៀង), ទុក្ខំ (ភាពមិនពេញលេញ), អនត្តា (ភាពមិនមែនជារបស់ខ្លួន)។\n\n## ២. សារៈសំខាន់ក្នុងការតែងសេចក្តីបាក់ឌុប\nនៅពេលវិភាគប្រធានតែងសេចក្តីទាក់ទងនឹងសីលធម៌សង្គម ការលើកយកទស្សនៈពុទ្ធសាសនាមកពន្យល់ជួយបង្កើនទម្ងន់ទឡ្ហីករណ៍ និងទទួលបានពិន្ទុខ្ពស់ពីគណៈកម្មការកែវិញ្ញាសាជាតិ។",
    body_en: "## Buddhist Ethics in Literature\nExplores Buddhist dharma principles, cause-and-effect karma, and moral synthesis in Khmer classical literature and national Bac II composition.",
  },

  {
    id: "les-g12-khmer-06",
    grade: 12,
    sort_order: 120,
    title_km: "រឿងគ្រូបង្រៀនស្រុកស្រែ (ការអភិវឌ្ឍជនបទ និងការអប់រំ)",
    title_en: "Krou Bongrean Srok Sre: Rural Education & Social Uplift",
    summary_km: "ការវិភាគតួអង្គគ្រូពុធ ការតស៊ូអភិវឌ្ឍសហគមន៍ជនបទ និងការលុបបំបាត់អនក្ខរភាពក្នុងសង្គមខ្មែរ",
    summary_en: "Literary analysis of teacher Puth in rural development, community empowerment, and eradicating illiteracy",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-06" },
    body_km: "## ១. សង្ខេបរឿងគ្រូបង្រៀនស្រុកស្រែ\nស្នាដៃប្រលោមលោកខេមរនិយមដ៏ល្បីល្បាញ ដែលលើកតម្កើងតម្លៃនៃការអប់រំ និងការលះបង់របស់គ្រូបង្រៀននៅតាមទីជនបទដាច់ស្រយាល។\n- **តួអង្គសំខាន់ ៖** គ្រូពុធ ជាគំរូវិជ្ជាជីវៈគ្រូបង្រៀនប្រកបដោយមនសិការស្នេហាជាតិ និងឆន្ទៈកែលម្អជីវភាពកសិករ។\n\n## ២. តម្លៃអប់រំ និងសង្គម\n- បង្ហាញពីសារៈសំខាន់នៃចំណេះដឹងក្នុងការរំដោះប្រជាជនចេញពីភាពល្ងង់ខ្លៅ និងភាពក្រីក្រ។\n- ការរួបរួមកម្លាំងសាមគ្គីរវាងសាលារៀន វត្តអារាម និងសហគមន៍មូលដ្ឋាន។",
    body_en: "## Rural Education Novel Analysis\nComprehensive breakdown of teacher Puth's civic dedication to village literacy, school-community integration, and youth empowerment.",
  },

  {
    id: "les-g12-khmer-07",
    grade: 12,
    sort_order: 121,
    title_km: "វិធីសាស្ត្រតែងសេចក្តីប្រៀបធៀបតួអង្គ និងអត្ថបទ",
    title_en: "Comparative Essay Writing Methodology (Bac II)",
    summary_km: "គន្លឹះតែងសេចក្តីប្រៀបធៀបតួអង្គ រកចំណុចដូចគ្នា ចំណុចខុសគ្នា និងការសំយោគទស្សនៈតាមស្តង់ដារ MoEYS",
    summary_en: "Standard MoEYS comparative essay structure: analyzing character parallels, thematic contrasts, and synthesizing literary judgements",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.khmer,
    quiz: { id: "quiz-g12-khmer-07" },
    body_km: "## ១. រចនាសម្ព័ន្ធតែងសេចក្តីប្រៀបធៀប\n1. **ផ្តើមសេចក្តី (Introduction) ៖** លំនាំបញ្ហា ចំណូលបញ្ហា (ណែនាំតួអង្គ ឬស្នាដៃទាំងពីរ) និងចំណោទបញ្ហា។\n2. **តួសេចក្តី (Body) ៖**\n   - **ចំណុចដូចគ្នា (Similarities) ៖** ឧ. ចៅចិត្រ (កុលាបប៉ៃលិន) និងគ្រូពុធ (គ្រូបង្រៀនស្រុកស្រែ) សុទ្ធតែជាយុវជនមានមនសិការ និងភាពស្មោះត្រង់។\n   - **ចំណុចខុសគ្នា (Differences) ៖** បរិបទសង្គម វិធីសាស្ត្រដោះស្រាយបញ្ហា និងគោលដៅជីវិត។\n   - **ការវាយតម្លៃ (Evaluation) ៖** តើឥរិយាបថមួយណាដែលផ្តល់ផលវិជ្ជមានជាងសម្រាប់សង្គមជាតិ?\n3. **បញ្ចប់សេចក្តី (Conclusion) ៖** វាយតម្លៃរួម និងមតិផ្ទាល់ខ្លួនភ្ជាប់នឹងសច្ចភាពសង្គមបច្ចុប្បន្ន។",
    body_en: "## Comparative Essay Methodology\nStep-by-step comparative essay framework for Bac II: introduction with thesis, thematic juxtaposition of character arcs, and evaluative synthesis.",
  },

  {
    id: "les-g12-hist-05",
    grade: 12,
    sort_order: 122,
    title_km: "របបកម្ពុជាប្រជាធិបតេយ្យ និងការរំដោះ ៧ មករា ១៩៧៩",
    title_en: "Democratic Kampuchea Regime & 7th January Liberation",
    summary_km: "ឧក្រិដ្ឋកម្មប្រល័យពូជសាសន៍ខ្មែរក្រហម ១៩៧៥-១៩៧៩ រណសិរ្សសាមគ្គីសង្គ្រោះជាតិ និងទិវាជ័យជម្នះ ៧ មករា",
    summary_en: "Genocidal atrocities of Democratic Kampuchea (1975–1979), the United Front for National Salvation, and 7th January liberation",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g12-hist-05" },
    body_km: "## ១. របបកម្ពុជាប្រជាធិបតេយ្យ (១៧ មេសា ១៩៧៥ - ៦ មករា ១៩៧៩)\n- ការជម្លៀសប្រជាជនចេញពីទីក្រុងដោយបង្ខំ ការលុបបំបាត់ទីផ្សារ រូបិយវត្ថុ សាសនា និងប្រព័ន្ធអប់រំ។\n- ការបង្ខំឱ្យធ្វើពលកម្មជាទម្ងន់ ការអត់ឃ្លាន និងការកាប់សម្លាប់រង្គាលបណ្តាលឱ្យប្រជាជនកម្ពុជាជាង ២ លាននាក់បានបាត់បង់ជីវិត។\n\n## ២. ការបង្កើតរណសិរ្ស និងទិវាជ័យជម្នះ ៧ មករា\n- ថ្ងៃទី ២ ធ្នូ ១៩៧៨ ៖ បង្កើតរណសិរ្សសាមគ្គីសង្គ្រោះជាតិកម្ពុជា នៅស្រុកស្នួល ខេត្តក្រចេះ។\n- ថ្ងៃទី ៧ មករា ១៩៧៩ ៖ រំដោះរាជធានីភ្នំពេញ បញ្ចប់របបប្រល័យពូជសាសន៍ ប៉ុល ពត និងបើកទំព័រប្រវត្តិសាស្ត្ររស់ឡើងវិញនៃប្រជាជាតិកម្ពុជា។",
    body_en: "## Democratic Kampuchea & 7th January\nHistorical account of the Khmer Rouge devastation, the founding of the Salvation Front in Snuol, and the historic January 7, 1979 liberation.",
  },

  {
    id: "les-g12-hist-06",
    grade: 12,
    sort_order: 123,
    title_km: "កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា និងនយោបាយឈ្នះ-ឈ្នះ",
    title_en: "1991 Paris Peace Agreements & The Win-Win Policy",
    summary_km: "សន្ធិសញ្ញាសន្តិភាពក្រុងប៉ារីស ២៣ តុលា ១៩៩១ បេសកកម្ម UNTAC ការបោះឆ្នោតជាតិ ១៩៩៣ និងនយោបាយឈ្នះ-ឈ្នះ ឆ្នាំ ១៩៩៨",
    summary_en: "October 23, 1991 Paris Peace Accords, UNTAC democratic transition, and the 1998 Win-Win Policy achieving total national peace",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.history,
    quiz: { id: "quiz-g12-hist-06" },
    body_km: "## ១. កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស (២៣ តុលា ១៩៩១)\nកិច្ចព្រមព្រៀងជាប្រវត្តិសាស្ត្រដែលចុះហត្ថលេខាដោយភាគីជម្លោះកម្ពុជាទាំង ៤ និងប្រទេសហត្ថលេខីចំនួន ១៨ ក្រោមអធិបតីភាពសហប្រធានបារាំង និងឥណ្ឌូនេស៊ី។\n- នាំមកនូវបេសកកម្មអាជ្ញាធរបណ្តោះអាសន្នអង្គការសហប្រជាជាតិ (UNTAC) និងការបោះឆ្នោតសកលឆ្នាំ ១៩៩៣ បង្កើតព្រះរាជាណាចក្រកម្ពុជាទី ២។\n\n## ២. នយោបាយ ឈ្នះ-ឈ្នះ (Win-Win Policy ១៩៩៨)\nបង្កើតឡើងដោយសម្តេចតេជោ ហ៊ុន សែន នាំមកនូវការធ្វើសមាហរណកម្មកងទ័ពខ្មែរក្រហមចុងក្រោយនៅខែធ្នូ ឆ្នាំ ១៩៩៨៖\n- **គោលការណ៍គ្រឹះ ៣ ៖** ធានាអាយុជីវិត, ធានាអាជីព-មុខរបរ, និងធានាកម្មសិទ្ធិទ្រព្យសម្បត្តិ។\n- នាំមកនូវ **សន្តិភាពពេញលេញ និងការឯកភាពទឹកដី ១០០%** ជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រជាង ៥០០ ឆ្នាំ។",
    body_en: "## Paris Peace Accords & Win-Win Policy\nThe 1991 Paris Peace Agreements leading to UNTAC elections, followed by the decisive 1998 Win-Win Policy establishing total national territorial peace.",
  },

  {
    id: "les-g12-geo-05",
    grade: 12,
    sort_order: 124,
    title_km: "វិស័យទេសចរណ៍ និងបេតិកភណ្ឌវប្បធម៌កម្ពុជា",
    title_en: "Cultural Heritage & Ecotourism Potential of Cambodia",
    summary_km: "តំបន់បេតិកភណ្ឌពិភពលោកអង្គរ ព្រះវិហារ សម្បូរព្រៃគុក ឆ្នេរសមុទ្រស្អាតបំផុត និងតំបន់ទេសចរណ៍ធម្មជាតិ",
    summary_en: "UNESCO World Heritage sites (Angkor, Preah Vihear, Sambor Prei Kuk), coastal bays, and green ecotourism economic drivers",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g12-geo-05" },
    body_km: "## ១. សក្តានុពលទេសចរណ៍វប្បធម៌\nកម្ពុជាជាគោលដៅទេសចរណ៍វប្បធម៌លំដាប់ពិភពលោក ដែលមានសម្បត្តិបេតិកភណ្ឌពិភពលោក UNESCO ៖\n- រមណីយដ្ឋានអង្គរ (១៩៩២)\n- ប្រាសាទព្រះវិហារ (២០០៨)\n- ប្រាសាទសម្បូរព្រៃគុក (២០១៧)\n- រមណីយដ្ឋានកោះកេរ្តិ៍ (២០២៣)\n\n## ២. ទេសចរណ៍ធម្មជាតិ និងតំបន់ឆ្នេរ (Green Ecotourism)\n- តំបន់ឆ្នេរសមុទ្រកម្ពុជា (ខេត្តព្រះសីហនុ កំពត កែប កោះកុង) ជាសមាជិកក្លឹបឆ្នេរសមុទ្រដែលស្អាតបំផុតលើសកលលោក។\n- ទេសចរណ៍ធម្មជាតិអេកូឡូស៊ីនៅជួរភ្នំក្រវាញ ភ្នំឱរ៉ាល់ និងបឹងទន្លេសាប។",
    body_en: "## Cultural & Ecotourism Geography\nAnalysis of UNESCO cultural jewels (Angkor, Preah Vihear, Koh Ker) and coastal-mangrove ecotourism driving economic diversification.",
  },

  {
    id: "les-g12-geo-06",
    grade: 12,
    sort_order: 125,
    title_km: "នគរូបនីយកម្ម និងការគ្រប់គ្រងបរិស្ថានទីក្រុង",
    title_en: "Urbanization & Metropolitan Environmental Governance",
    summary_km: "ការរីកចម្រើននៃរាជធានីភ្នំពេញ ការគ្រប់គ្រងសំណល់រឹង-រាវ ការកកស្ទះចរាចរណ៍ និងទីក្រុងឆ្លាតវៃ (Smart City)",
    summary_en: "Urban sprawl in Phnom Penh, municipal solid and wastewater management, smart city integration, and transit planning",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.geography,
    quiz: { id: "quiz-g12-geo-06" },
    body_km: "## ១. ល្បឿននគរូបនីយកម្មនៅកម្ពុជា\nការបម្លាស់ទីពីជនបទចូលទីក្រុងបានជំរុញឱ្យរាជធានីភ្នំពេញ និងក្រុងសៀមរាប ក្រុងព្រះសីហនុ រីកធំធាត់យ៉ាងឆាប់រហ័ស។\n- ផ្ទៃក្រឡារាជធានីភ្នំពេញបានពង្រីកដល់ជិត $៧០០\\text{ km}^2$ ដោយមានប្រជាជនរស់នៅជាង ២ លាននាក់។\n\n## ២. បញ្ហាប្រឈមបរិស្ថានទីក្រុង និងដំណោះស្រាយ\n- **ការគ្រប់គ្រងសំណល់ ៖** បរិមាណសំរាមកើនឡើងលើស ៣០០០ តោន/ថ្ងៃ តម្រូវឱ្យមានការញែកសំរាម និងរោងចក្រដុតសំរាមបង្កើតអគ្គិសនី (Waste-to-Energy)។\n- **ចរាចរណ៍ និងលំនៅឋាន ៖** ការអភិវឌ្ឍប្រព័ន្ធដឹកជញ្ជូនសាធារណៈ រថភ្លើងលើអាកាស និងការរៀបចំផែនការទីក្រុងឆ្លាតវៃ (Smart & Green City)។",
    body_en: "## Urban Dynamics & Green Cities\nUrban migration trends, municipal solid waste management solutions, drainage infrastructure, and smart city urban planning.",
  },

  {
    id: "les-g12-ict-03",
    grade: 12,
    sort_order: 126,
    title_km: "មូលដ្ឋានគ្រឹះភាសា Python និងរចនាសម្ព័ន្ធទិន្នន័យ",
    title_en: "Python Programming & Core Data Structures",
    summary_km: "អថេរ ប្រភេទទិន្នន័យ លក្ខខណ្ឌ if-else រង្វិលជុំ for/while អនុគមន៍ functions និងរចនាសម្ព័ន្ធ List, Dictionary",
    summary_en: "Python syntax, control flow (if/else, loops), function modularity, and built-in data structures (Lists, Dicts, Sets)",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g12-ict-03" },
    body_km: "## ១. ហេតុអ្វីបានជាត្រូវរៀនភាសា Python?\nPython គឺជាភាសាសរសេរកូដកម្រិតខ្ពស់ដ៏មានប្រជាប្រិយភាពបំផុតលើពិភពលោក សមស្របសម្រាប់ការវិភាគទិន្នន័យ និងបញ្ញាសិប្បនិម្មិត (AI)។\n\n## ២. រចនាសម្ព័ន្ធទិន្នន័យគ្រឹះក្នុង Python\n'''python\n# ការបង្កើត List និង Dictionary\nstudents = [\"Sophea\", \"Vireak\", \"Dara\"]\nscores = {\"Sophea\": 95, \"Vireak\": 88, \"Dara\": 92}\n\n# រង្វិលជុំ For Loop គណនាពិន្ទុមធ្យម\ntotal = 0\nfor name in students:\n    total += scores[name]\naverage = total / len(students)\nprint(f\"ពិន្ទុមធ្យមសិស្ស៖ {average:.2f}\")\n'''",
    body_en: "## Python Essentials & Structures\nCore Python constructs: variable types, conditionals, loops, custom function declarations, and collection structures (Lists, Dicts).",
  },

  {
    id: "les-g12-ict-04",
    grade: 12,
    sort_order: 127,
    title_km: "សុវត្ថិភាពព័ត៌មាន និងច្បាប់ឌីជីថល (Cyber Hygiene)",
    title_en: "Cybersecurity, Privacy & Digital Ethics",
    summary_km: "ការការពារទិន្នន័យផ្ទាល់ខ្លួន សុវត្ថិភាពលើបណ្តាញសង្គម ការវាយប្រហារតាមអ៊ីនធឺណិត និងច្បាប់ស្តីពីឧក្រិដ្ឋកម្មបច្ចេកវិទ្យា",
    summary_en: "Personal data privacy, social media safety, threat mitigation (malware, phishing), and digital citizenship laws",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.ict,
    quiz: { id: "quiz-g12-ict-04" },
    body_km: "## ១. វិធានការសុវត្ថិភាពឌីជីថលផ្ទាល់ខ្លួន (Cyber Hygiene)\n- ប្រើពាក្យសម្ងាត់ដែលមានលក្ខណៈស្មុគស្មាញ (អក្សរធំ តូច លេខ និងសញ្ញាពិសេស) និងមិនប្រើលេខសម្ងាត់ដដែលៗ។\n- បើកដំណើរការផ្ទៀងផ្ទាត់ ២ ជាន់ (2FA) លើគណនីបណ្តាញសង្គម និងអ៊ីមែលទាំងអស់។\n- មិនចុចលើតំណភ្ជាប់មិនស្គាល់ប្រភព (Phishing Links) ឬទាញយកឯកសារពីគេហទំព័រខុសច្បាប់។\n\n## ២. ក្រមសីលធម៌ និងច្បាប់ឌីជីថល\n- គោរពកម្មសិទ្ធិបញ្ញា និងច្បាប់រក្សាសិទ្ធិនៃទិន្នន័យរបស់អ្នកដទៃ។\n- ការជៀសវាងការចែកចាយព័ត៌មានមិនពិត (Fake News) ឬការបៀតបៀនតាមអ៊ីនធឺណិត (Cyberbullying)។",
    body_en: "## Cybersecurity & Digital Citizenship\nEssential cyber defense best practices: robust credential habits, 2FA protocols, phishing avoidance, copyright adherence, and anti-cyberbullying ethics.",
  },

  {
    id: "les-g12-moral-03",
    grade: 12,
    sort_order: 128,
    title_km: "វប្បធម៌សន្តិភាព និងការដោះស្រាយវិវាទដោយអហិង្សា",
    title_en: "Culture of Peace & Nonviolent Conflict Resolution",
    summary_km: "គោលការណ៍វប្បធម៌សន្តិភាព ការអត់ឱន ការសន្ទនា ការផ្សះផ្សាជាតិ និងយន្តការដោះស្រាយវិវាទក្រៅប្រព័ន្ធតុលាការ",
    summary_en: "Foundations of a culture of peace, tolerance, inclusive dialogue, national reconciliation, and mediation mechanisms",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g12-moral-03" },
    body_km: "## ១. វប្បធម៌សន្តិភាព (Culture of Peace)\nវប្បធម៌សន្តិភាព គឺជាតម្លៃ ឥរិយាបថ និងរបៀបរស់នៅដែលបដិសេធអំពើហិង្សា និងទប់ស្កាត់ជម្លោះតាមរយៈការចរចា និងការសន្ទនាដោយសន្តិវិធី។\n- ផ្អែកលើការគោរពសិទ្ធិមនុស្ស ការអត់ឱន ការយោគយល់គ្នាទៅវិញទៅមក និងសមភាពយេនឌ័រ។\n\n## ២. វិធីសាស្ត្រដោះស្រាយវិវាទដោយសន្តិវិធី\n- **ការចរចា (Negotiation) ៖** ភាគីទាំងសងខាងជួបពិភាក្សាគ្នាដោយផ្ទាល់ដើម្បីស្វែងរកដំណោះស្រាយឈ្នះ-ឈ្នះ។\n- **ការសម្រុះសម្រួល (Mediation) ៖** ប្រើប្រាស់តតិយជន (ភាគីទីបី) ដែលអព្យាក្រឹត ដើម្បីជួយជម្រុញកិច្ចព្រមព្រៀងសន្តិភាព។",
    body_en: "## Peace Culture & Dispute Resolution\nValues underpinning a nonviolent social contract: active tolerance, empathetic listening, and non-adversarial mediation frameworks.",
  },

  {
    id: "les-g12-moral-04",
    grade: 12,
    sort_order: 129,
    title_km: "សិទ្ធិមនុស្ស និងការចូលរួមជាពលរដ្ឋសកម្ម",
    title_en: "Human Rights & Active Civic Engagement",
    summary_km: "សេចក្តីប្រកាសជាសកលស្តីពីសិទ្ធិមនុស្ស សិទ្ធិស៊ីវិល នយោបាយ សេដ្ឋកិច្ច និងតួនាទីយុវជនក្នុងការអភិវឌ្ឍសហគមន៍",
    summary_en: "Universal Declaration of Human Rights, civil/political/economic freedoms, and youth volunteerism in community development",
    xp_reward: 50,
    estimated_minutes: 25,
    subject: SUBJECT_METADATA.morality,
    quiz: { id: "quiz-g12-moral-04" },
    body_km: "## ១. សេចក្តីប្រកាសជាសកលស្តីពីសិទ្ធិមនុស្ស (UDHR ១៩៤៨)\nមនុស្សទាំងអស់កើតមកមានសេរីភាព និងស្មើភាពគ្នាក្នុងសេចក្តីថ្លៃថ្នូរ និងសិទ្ធិ៖\n- សិទ្ធិរស់រានមានជីវិត សេរីភាព និងសន្តិសុខផ្ទាល់ខ្លួន។\n- សិទ្ធិទទួលបានការអប់រំ សេវាសុខាភិបាល និងការងារសមរម្យ។\n- គ្មានបុគ្គលណាម្នាក់ត្រូវរងការធ្វើទារុណកម្ម ឬការរើសអើងពូជសាសន៍ឡើយ។\n\n## ២. ពលរដ្ឋសកម្ម (Active Citizenship)\n- ការគោរពច្បាប់ចរាចរណ៍ ការបង់ពន្ធជូនរដ្ឋ និងការការពារបរិស្ថាន។\n- ការចូលរួមក្នុងការងារស្ម័គ្រចិត្តជួយសហគមន៍ និងការបោះឆ្នោតតាមលទ្ធិប្រជាធិបតេយ្យ។",
    body_en: "## Human Rights & Civic Engagement\nFoundational human rights tenets from the 1948 Universal Declaration alongside responsibilities of civic youth leadership and community volunteerism.",
  },

  {
    id: "les-g12-eng-03",
    grade: 12,
    sort_order: 130,
    title_km: "អំណានអត្ថបទសិក្សាស្រាវជ្រាវ ៖ សេដ្ឋកិច្ចសកល និងសង្គម",
    title_en: "Academic Reading: Global Economy & Society",
    summary_km: "បច្ចេកទេស Skimming/Scanning ការទាញន័យពាក្យក្នុងបរិបទ និងការវិភាគអត្ថបទសេដ្ឋកិច្ចក្នុងវិញ្ញាសាបាក់ឌុប",
    summary_en: "Skimming and scanning strategies, contextual vocabulary acquisition, and reading comprehension in Bac II national examinations",
    xp_reward: 50,
    estimated_minutes: 24,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g12-eng-03" },
    body_km: "## ១. យុទ្ធសាស្ត្រអំណានអត្ថបទកម្រិតខ្ពស់ (Reading Strategies)\n- **Skimming ៖** អានយ៉ាងលឿនដើម្បីក្តាប់គំនិតចម្បងនៃអត្ថបទ (Main Idea) តាមរយៈការមើលចំណងជើង និងកថាខណ្ឌដំបូង/ចុងក្រោយ។\n- **Scanning ៖** រកមើលទិន្នន័យជាក់លាក់ដូចជា កាលបរិច្ឆេទ តួលេខ ឬឈ្មោះបុគ្គលសំខាន់ៗ។\n- **Context Clues ៖** ទាយអត្ថន័យនៃពាក្យពិបាកដោយផ្អែកលើពាក្យភ្ជាប់ និងបរិបទជុំវិញ។\n\n## ២. អត្ថបទគំរូ និងវាក្យសព្ទគន្លឹះ\nSustainable development, economic diversification, digital transformation, and regional integration within ASEAN trade corridors.",
    body_en: "## Advanced Academic Reading\nSkimming for central thesis statements, scanning for empirical evidence, and inferring technical vocabulary from syntactic context.",
  },

  {
    id: "les-g12-eng-04",
    grade: 12,
    sort_order: 131,
    title_km: "វិធីសាស្ត្រតែងសេចក្តីភាសាអង់គ្លេសបាក់ឌុប (Argumentative Essay)",
    title_en: "Argumentative Essay Writing for National Exams",
    summary_km: "រចនាសម្ព័ន្ធតែងសេចក្តី Argumentative ទម្រង់ ៥ កថាខណ្ឌ ការប្រើពាក្យភ្ជាប់គំនិត និងការសន្និដ្ឋានប្រកបដោយហេតុផល",
    summary_en: "Standard 5-paragraph argumentative essay framework: hook, thesis statement, counter-arguments, and persuasive transitions",
    xp_reward: 50,
    estimated_minutes: 26,
    subject: SUBJECT_METADATA.english,
    quiz: { id: "quiz-g12-eng-04" },
    body_km: "## ១. រចនាសម្ព័ន្ធ Essay ៥ កថាខណ្ឌ\n1. **Introduction ៖** Hook (ទាក់ទាញចំណាប់អារម្មណ៍), Background info, និង Thesis statement (ទស្សនៈស្នូល)។\n2. **Body Paragraph 1 ៖** ទឡ្ហីករណ៍ទី ១ + ឧទាហរណ៍ជាក់ស្តែងគាំទ្រ។\n3. **Body Paragraph 2 ៖** ទឡ្ហីករណ៍ទី ២ + ស្ថិតិ ឬហេតុផលវិទ្យាសាស្ត្រ។\n4. **Body Paragraph 3 (Counter-Argument) ៖** ទស្សនៈផ្ទុយ និងការបដិសេធ (Refutation) យ៉ាងសមហេតុផល។\n5. **Conclusion ៖** សង្ខេបទស្សនៈឡើងវិញ (Restate thesis) និងអនុសាសន៍ទៅអនាគត។\n\n## ២. ពាក្យភ្ជាប់គំនិតចាំបាច់ (Transition Words)\n- *Furthermore, Moreover, In addition* (បន្ថែមគំនិត)\n- *However, On the contrary, Nevertheless* (បង្ហាញភាពផ្ទុយ)\n- *Consequently, Therefore, As a result* (បង្ហាញលទ្ធផល)",
    body_en: "## Baccalaureate Essay Composition\nMastering the 5-paragraph argumentative structure: hook, definitive thesis statement, coherent body evidence, counter-claim rebuttal, and synthesis.",
  },
];
