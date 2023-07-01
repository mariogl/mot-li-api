import { Router } from "express";
import { validate } from "express-validation";
import WordsMongoRepository from "../../../repositories/words/WordsMongoRepository.js";
import {
  addWord,
  deleteWord,
  getWords,
} from "../../controllers/words/wordsControllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { deleteWordSchema, newWordSchema } from "../../schemas/wordSchemas.js";

const wordsRepository = new WordsMongoRepository();

const wordsRouter = Router();

wordsRouter.get("/", authMiddleware, getWords(wordsRepository));
wordsRouter.post(
  "/",
  authMiddleware,
  validate(newWordSchema, {}, { abortEarly: false }),
  addWord(wordsRepository)
);
wordsRouter.delete(
  "/:wordId",
  authMiddleware,
  validate(deleteWordSchema, {}, { abortEarly: false }),
  deleteWord(wordsRepository)
);

export default wordsRouter;
