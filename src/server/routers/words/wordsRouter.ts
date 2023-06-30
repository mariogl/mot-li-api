import { Router } from "express";
import WordsMongoRepository from "../../../repositories/words/WordsMongoRepository.js";
import { getWords } from "../../controllers/words/wordsControllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const wordsRepository = new WordsMongoRepository();

const wordsRouter = Router();

wordsRouter.get("/", authMiddleware, getWords(wordsRepository));

export default wordsRouter;
