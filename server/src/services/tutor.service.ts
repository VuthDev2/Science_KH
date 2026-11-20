export class TutorService {
  /**
   * Generates Socratic guidance for Cambodian STEM learners
   */
  static generateSocraticResponse(params: {
    message: string;
    gradeLevel: number;
    subject: string;
    language: "km" | "en";
  }): string {
    const { message, gradeLevel, subject, language } = params;

    const mockSocraticResponsesKm = [
      `សួស្តីប្អូន! គ្រូសប្បាយចិត្តណាស់ដែលប្អូនបានសួរសំណួរនេះ។ តោះយើងគិតទាំងអស់គ្នា៖ ចំពោះសំណួរ "${message.slice(0, 40)}..."`,
      `ជំហានទី១៖ តើប្អូនចាំទេថានៅក្នុងមេរៀនថ្នាក់ទី ${gradeLevel} រូបមន្តគ្រឹះទាក់ទងនឹង ${subject} មានអ្វីខ្លះ?`,
      `តើប្អូនអាចសាកល្បងកំណត់ទិន្នន័យដែលប្រធានបានប្រាប់ (បម្រាប់) មកប្រាប់គ្រូបានទេ?`,
    ];

    const mockSocraticResponsesEn = [
      `Hello! I'm glad you asked about "${message.slice(0, 40)}...". Let's solve this step by step.`,
      `Step 1: Do you remember the primary formula in Grade ${gradeLevel} ${subject} that connects these variables?`,
      `Can you identify the given values from the problem statement first?`,
    ];

    return language === "km"
      ? mockSocraticResponsesKm.join("\n\n")
      : mockSocraticResponsesEn.join("\n\n");
  }
}

