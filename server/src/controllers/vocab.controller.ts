import { Request, Response } from "express";
import { VocabService } from "../services/vocab.service.js";
import { sendSuccess } from "../types/api.js";

export class VocabController {
  static getDecks(req: Request, res: Response) {
    const subject = typeof req.query.subject === "string" ? req.query.subject : undefined;
    const grade = typeof req.query.grade === "string" ? Number(req.query.grade) : undefined;

    const decks = VocabService.getDecks({ subject, grade });
    return sendSuccess(res, decks);
  }
}

