import Word from "../../database/models/Word.js";
import { type WordStructure } from "../../types";
import { type WordsRepository } from "./types";

class WordsMongoRepository implements WordsRepository {
  async getWords(length: number): Promise<WordStructure[]> {
    const words = await Word.find({ length }).sort({ word: 1 });

    return words;
  }
}

export default WordsMongoRepository;
