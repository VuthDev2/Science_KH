// ==============================================================================
// ScienceKH — Official MoEYS Cambodia Bac II Session Dates (2011–2024)
// Verified Against Ministry of Education, Youth and Sport Circulars & Records
// ==============================================================================

export interface ExamSessionMetadata {
  year: number;
  sessionDateKm: string;
  sessionDateEn: string;
  isPostReform: boolean;
  notesKm?: string;
}

export const MOEYS_BACII_SESSIONS: Record<number, ExamSessionMetadata> = {
  2024: {
    year: 2024,
    sessionDateKm: "សម័យប្រឡង៖ ០៨–០៩ តុលា ២០២៤",
    sessionDateEn: "Session: October 8–9, 2024",
    isPostReform: true,
    notesKm: "សម័យប្រឡងផ្លូវការសម្រាប់ឆ្នាំសិក្សា ២០២៣-២០២៤",
  },
  2023: {
    year: 2023,
    sessionDateKm: "សម័យប្រឡង៖ ០៦–០៧ វិច្ឆិកា ២០២៣",
    sessionDateEn: "Session: November 6–7, 2023",
    isPostReform: true,
    notesKm: "សម័យប្រឡងផ្លូវការសម្រាប់ឆ្នាំសិក្សា ២០២២-២០២៣",
  },
  2022: {
    year: 2022,
    sessionDateKm: "សម័យប្រឡង៖ ០៥–០៦ ធ្នូ ២០២២",
    sessionDateEn: "Session: December 5–6, 2022",
    isPostReform: true,
    notesKm: "សម័យប្រឡងផ្លូវការសម្រាប់ឆ្នាំសិក្សា ២០២១-២០២២",
  },
  2021: {
    year: 2021,
    sessionDateKm: "សម័យប្រឡង៖ ២៧–២៨ ធ្នូ ២០២១",
    sessionDateEn: "Session: December 27–28, 2021",
    isPostReform: true,
    notesKm: "សម័យប្រឡងប្រព្រឹត្តទៅនៅចុងឆ្នាំដោយសារវិបត្តិកូវីដ-១៩",
  },
  2020: {
    year: 2020,
    sessionDateKm: "សម័យប្រឡង៖ ១១–១២ មករា ២០២១",
    sessionDateEn: "Session: January 11–12, 2021 (Delayed)",
    isPostReform: true,
    notesKm: "សម័យប្រឡងរៀបចំឡើងនៅដើមឆ្នាំ២០២១ និងអនុក្រឹត្យជាប់ជាស្ថាពរ",
  },
  2019: {
    year: 2019,
    sessionDateKm: "សម័យប្រឡង៖ ១៩–២០ សីហា ២០១៩",
    sessionDateEn: "Session: August 19–20, 2019",
    isPostReform: true,
    notesKm: "សម័យប្រឡងមុនវិបត្តិកូវីដ-១៩ តាមកាលវិភាគធម្មតានៅខែសីហា",
  },
  2018: {
    year: 2018,
    sessionDateKm: "សម័យប្រឡង៖ ២០–២១ សីហា ២០១៨",
    sessionDateEn: "Session: August 20–21, 2018",
    isPostReform: true,
    notesKm: "សម័យប្រឡងបាក់ឌុបជាតិ លើកទី៥ នៃកំណែទម្រង់",
  },
  2017: {
    year: 2017,
    sessionDateKm: "សម័យប្រឡង៖ ២១–២២ សីហា ២០១៧",
    sessionDateEn: "Session: August 21–22, 2017",
    isPostReform: true,
    notesKm: "សម័យប្រឡងបាក់ឌុបជាតិ លើកទី៤ នៃកំណែទម្រង់",
  },
  2016: {
    year: 2016,
    sessionDateKm: "សម័យប្រឡង៖ ២២–២៣ សីហា ២០១៦",
    sessionDateEn: "Session: August 22–23, 2016",
    isPostReform: true,
    notesKm: "សម័យប្រឡងបាក់ឌុបជាតិ លើកទី៣ នៃកំណែទម្រង់",
  },
  2015: {
    year: 2015,
    sessionDateKm: "សម័យប្រឡង៖ ២៤–២៥ សីហា ២០១៥",
    sessionDateEn: "Session: August 24–25, 2015",
    isPostReform: true,
    notesKm: "សម័យប្រឡងបាក់ឌុបជាតិ លើកទី២ នៃកំណែទម្រង់",
  },
  2014: {
    year: 2014,
    sessionDateKm: "សម័យប្រឡង៖ ០៤–០៥ សីហា ២០១៤",
    sessionDateEn: "Session: August 4–5, 2014 (1st Session)",
    isPostReform: true,
    notesKm: "សម័យប្រឡងប្រវត្តិសាស្ត្រចាប់ផ្តើមកំណែទម្រង់ស៊ីជម្រៅ «អ្នកចេះគឺជាប់»",
  },
  2013: {
    year: 2013,
    sessionDateKm: "សម័យប្រឡង៖ ០៥–០៦ សីហា ២០១៣",
    sessionDateEn: "Session: August 5–6, 2013",
    isPostReform: false,
    notesKm: "សម័យប្រឡងជំនាន់មុនកំណែទម្រង់ ២០១៤",
  },
  2012: {
    year: 2012,
    sessionDateKm: "សម័យប្រឡង៖ ០៦–០៧ សីហា ២០១២",
    sessionDateEn: "Session: August 6–7, 2012",
    isPostReform: false,
    notesKm: "សម័យប្រឡងជំនាន់មុនកំណែទម្រង់ ២០១៤",
  },
  2011: {
    year: 2011,
    sessionDateKm: "សម័យប្រឡង៖ ០១–០២ សីហា ២០១១",
    sessionDateEn: "Session: August 1–2, 2011",
    isPostReform: false,
    notesKm: "សម័យប្រឡងជំនាន់មុនកំណែទម្រង់ ២០១៤",
  },
};
