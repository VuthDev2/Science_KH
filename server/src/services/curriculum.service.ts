import { GRADES_CATALOG, SUBJECTS } from "../data/mock-curriculum.js";

export class CurriculumService {
  static getGrades() {
    return {
      grades: GRADES_CATALOG,
      subjects: SUBJECTS,
    };
  }

  static getGradeById(grade: number) {
    const found = GRADES_CATALOG.find((g) => g.grade === grade);
    if (!found) return null;
    return {
      gradeData: found,
      availableSubjects: SUBJECTS,
    };
  }

  static getLessonsByGradeAndSubject(grade: number, subject: string) {
    const units = [
      {
        unitId: `g${grade}-${subject}-u1`,
        unitNumber: 1,
        titleKm: subject === "physics" ? "មេកានិច និងចលនារូបធាតុ" : "មូលដ្ឋានគ្រឹះ និងរចនាសម្ព័ន្ធរូបធាតុ",
        titleEn: subject === "physics" ? "Mechanics & Matter in Motion" : "Foundations of Matter & Structures",
        lessons: [
          {
            id: `les-g${grade}-${subject}-01`,
            lessonNumber: 1,
            titleKm: subject === "physics" ? "ច្បាប់ញូតុន និងការអនុវត្តជាក់ស្តែង" : "រចនាសម្ព័ន្ធអាតូម និងម៉ូលេគុល",
            titleEn: subject === "physics" ? "Newton's Laws & Real-World Applications" : "Atomic & Molecular Structure",
            xpReward: 20,
            completed: false,
            exerciseCount: 5,
          },
          {
            id: `les-g${grade}-${subject}-02`,
            lessonNumber: 2,
            titleKm: subject === "physics" ? "ថាមពលស៊ីនេទិច និងថាមពលប៉ូតង់ស្យែល" : "ប្រតិកម្មគីមី និងសមីការតុល្យភាព",
            titleEn: subject === "physics" ? "Kinetic & Potential Energy" : "Chemical Reactions & Balancing Equations",
            xpReward: 25,
            completed: false,
            exerciseCount: 6,
          },
        ],
      },
      {
        unitId: `g${grade}-${subject}-u2`,
        unitNumber: 2,
        titleKm: subject === "physics" ? "ទែម៉ូឌីណាមិច និងកម្តៅ" : "សមាសធាតុសរីរាង្គ និងសារធាតុជីវសាស្ត្រ",
        titleEn: subject === "physics" ? "Thermodynamics & Heat Transfer" : "Organic Compounds & Biomolecules",
        lessons: [
          {
            id: `les-g${grade}-${subject}-03`,
            lessonNumber: 3,
            titleKm: subject === "physics" ? "ការផ្ទេរកម្តៅ និងអនុវត្តកម្លាំង" : "ចំណងអ៊ីយ៉ុង និងចំណងកូវ៉ាឡង់",
            titleEn: subject === "physics" ? "Thermal Conductivity & Work Done" : "Ionic vs Covalent Bonds",
            xpReward: 30,
            completed: false,
            exerciseCount: 5,
          },
        ],
      },
    ];

    return {
      grade,
      subject,
      unitsCount: units.length,
      units,
    };
  }
}

