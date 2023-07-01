import { Router } from "express";
import { validate } from "express-validation";
import WordsMongoRepository from "../../../repositories/words/WordsMongoRepository.js";
import { addWord, getWords } from "../../controllers/words/wordsControllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { newWordSchema } from "../../schemas/wordSchemas.js";

const wordsRepository = new WordsMongoRepository();

const wordsRouter = Router();

wordsRouter.get("/", authMiddleware, getWords(wordsRepository));
wordsRouter.post(
  "/",
  validate(newWordSchema, {}, { abortEarly: false }),
  addWord(wordsRepository)
);

export default wordsRouter;
