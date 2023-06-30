import { type NextFunction, type Request, type Response } from "express";
import { type WordsRepository } from "../../../repositories/words/types";

export const getWords =
  (wordsRepository: WordsRepository) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const words = await wordsRepository.getWords();

      res.status(200).json({ words });
    } catch (error) {
      next(error);
    }
  };
