const VOCAB_DECKS = [
  {
    subject: "physics",
    gradeLevel: 12,
    deckNameKm: "រូបវិទ្យា ថ្នាក់ទី ១២ - មេកានិច និងរលក",
    deckNameEn: "Grade 12 Physics - Mechanics & Waves",
    pairs: [
      { id: "1", km: "ល្បឿនស្ទុះ", en: "Acceleration", phonetic: "Lbeun Stooh", definitionKm: "អត្រាបម្រែបម្រួលល្បឿនធៀបនឹងពេល (a = dv/dt)" },
      { id: "2", km: "កម្លាំងកកិត", en: "Frictional Force", phonetic: "Kamlang Kaket", definitionKm: "កម្លាំងទប់ទល់នឹងចលនារអិលរវាងផ្ទៃប៉ះពីរ" },
      { id: "3", km: "ថាមពលស៊ីនេទិច", en: "Kinetic Energy", phonetic: "Thammopol Kinetic", definitionKm: "ថាមពលដែលវត្ថុមានដោយសារចលនារបស់វា (Ek = 1/2 mv²)" },
      { id: "4", km: "ប្រេកង់រលក", en: "Wave Frequency", phonetic: "Prekang Rawlok", definitionKm: "ចំនួនខួបដែលរលកធ្វើបានក្នុងមួយវិនាទី (Hz)" },
    ],
  },
  {
    subject: "chemistry",
    gradeLevel: 12,
    deckNameKm: "គីមីវិទ្យា ថ្នាក់ទី ១២ - អាស៊ីត បាស និងកាតាលីករ",
    deckNameEn: "Grade 12 Chemistry - Acids, Bases & Catalysts",
    pairs: [
      { id: "5", km: "កាតាលីករ", en: "Catalyst", phonetic: "Kataleekor", definitionKm: "សារធាតុជួយបង្កើនល្បឿនប្រតិកម្មដោយមិនប្រែប្រួលបរិមាណ" },
      { id: "6", km: "ប្រតិកម្មបន្សាប", en: "Neutralization", phonetic: "Protekam Bonsap", definitionKm: "ប្រតិកម្មរវាងអាស៊ីតនិងបាស បង្កើតបានជាអំបិលនិងទឹក" },
      { id: "7", km: "ចំណងកូវ៉ាឡង់", en: "Covalent Bond", phonetic: "Chomnorng Covalent", definitionKm: "ចំណងគីមីកើតពីការចែករំលែកអេឡិចត្រុងរវាងអាតូមពីរ" },
    ],
  },
];

export class VocabService {
  static getDecks(filter?: { subject?: string; grade?: number }) {
    let filtered = [...VOCAB_DECKS];

    if (filter?.subject) {
      filtered = filtered.filter((d) => d.subject === filter.subject);
    }
    if (filter?.grade) {
      filtered = filtered.filter((d) => d.gradeLevel === filter.grade);
    }

    return filtered;
  }
}

