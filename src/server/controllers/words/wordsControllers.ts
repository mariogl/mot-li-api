import { type NextFunction, type Request, type Response } from "express";
import { type WordsRepository } from "../../../repositories/words/types";
import { type WordDataStructure } from "../../../types";

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

export const addWord =
  (wordsRepository: WordsRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      WordDataStructure
    >,
    res: Response,
    next: NextFunction
  ) => {
    const word = req.body;

    try {
      const newWord = await wordsRepository.addWord(word);

      res.status(201).json({ word: newWord });
    } catch (error) {
      next(error);
    }
  };

export const deleteWord =
  (wordsRepository: WordsRepository) =>
  async (
    req: Request<{ wordId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { wordId } = req.params;

    try {
      await wordsRepository.deleteWord(wordId);

      res.status(200).json({ id: wordId });
    } catch (error) {
      next(error);
    }
  };

export const doesWordExist =
  (wordsRepository: WordsRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      Record<string, unknown>,
      { word: string }
    >,
    res: Response
  ) => {
    const { word } = req.query;
    const exists = await wordsRepository.doesWordExist(word);

    res.status(200).json({ exists });
  };
