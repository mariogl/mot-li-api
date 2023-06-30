import { type NextFunction, type Request, type Response } from "express";
import { type WordsRepository } from "../../../repositories/words/types";

export const getWords =
  (wordsRepository: WordsRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      Record<string, unknown>,
      { length: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { length } = req.query;
      const words = await wordsRepository.getWords(Number(length));

      res.status(200).json({ words });
    } catch (error) {
      next(error);
    }
  };
