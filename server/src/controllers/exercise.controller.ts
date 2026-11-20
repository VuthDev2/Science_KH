import { Request, Response } from "express";
import { ExerciseService } from "../services/exercise.service.js";
import { sendSuccess, sendError } from "../types/api.js";

export class ExerciseController {
  static getQuestionsByLesson(req: Request, res: Response) {
    const { lessonId } = req.params;
    const questions = ExerciseService.getPublicQuestions(lessonId);
    return sendSuccess(res, questions);
  }

  static verifyAnswer(req: Request, res: Response) {
    const { lessonId, questionId, selectedIndex } = req.body;
    const result = ExerciseService.verifyAnswer(lessonId, questionId, selectedIndex);

    if (!result) {
      return sendError(res, "Question not found", 404);
    }

    return sendSuccess(res, result);
  }
}

