import { Request, Response } from "express";
import { CurriculumService } from "../services/curriculum.service.js";
import { sendSuccess, sendError } from "../types/api.js";

export class CurriculumController {
  static getGrades(_req: Request, res: Response) {
    const data = CurriculumService.getGrades();
    return sendSuccess(res, data.grades, 200, { subjects: data.subjects });
  }

  static getGradeById(req: Request, res: Response) {
    const grade = Number(req.params.gradeId);
    const result = CurriculumService.getGradeById(grade);

    if (!result) {
      return sendError(res, `Grade ${grade} not found. Must be between 7 and 12.`, 404);
    }

    return sendSuccess(res, result.gradeData, 200, {
      availableSubjects: result.availableSubjects,
    });
  }

  static getLessonsByGradeAndSubject(req: Request, res: Response) {
    const grade = Number(req.params.grade);
    const subject = req.params.subject;
    const result = CurriculumService.getLessonsByGradeAndSubject(grade, subject);

    return sendSuccess(res, result.units, 200, {
      grade: result.grade,
      subject: result.subject,
      unitsCount: result.unitsCount,
    });
  }
}

