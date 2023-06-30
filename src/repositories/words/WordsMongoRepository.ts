import Word from "../../database/models/Word";
import { type WordStructure } from "../../types";
import { type WordsRepository } from "./types";

class WordsMongoRepository implements WordsRepository {
  async getWords(): Promise<WordStructure[]> {
    const words = await Word.find().sort({ word: 1 });

    return words;
  }
}

export default WordsMongoRepository;
