import { Request, Response } from "express";
import { ExamService } from "../services/exam.service.js";
import { sendSuccess, sendError } from "../types/api.js";

export class ExamController {
  static getExams(req: Request, res: Response) {
    const examType = typeof req.query.type === "string" ? req.query.type : undefined;
    const subject = typeof req.query.subject === "string" ? req.query.subject : undefined;
    const year = typeof req.query.year === "string" ? Number(req.query.year) : undefined;

    const result = ExamService.getExams({ examType, subject, year });
    return sendSuccess(res, result.exams, 200, { total: result.total });
  }

  static getExamById(req: Request, res: Response) {
    const { id } = req.params;
    const exam = ExamService.getExamById(id);

    if (!exam) {
      return sendError(res, `Exam paper with ID '${id}' not found.`, 404);
    }

    return sendSuccess(res, exam);
  }
}

