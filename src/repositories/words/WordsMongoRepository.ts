import CustomError from "../../CustomError/CustomError.js";
import Word from "../../database/models/Word.js";
import { type WordDataStructure, type WordStructure } from "../../types";
import { type WordsRepository } from "./types";

class WordsMongoRepository implements WordsRepository {
  async getWords(length: number): Promise<WordStructure[]> {
    const words = await Word.find({ length }).sort({ word: 1 });

    return words;
  }

  async addWord(word: WordDataStructure): Promise<WordStructure> {
    const newWord = new Word({
      ...word,
      length: word.word.length,
    });

    const existingWord = await Word.findOne({ word: newWord.word });

    if (existingWord) {
      throw new CustomError("Word exists", 409);
    }

    await newWord.save();

    return newWord;
  }

  async deleteWord(wordId: string): Promise<string> {
    const deletedWord = await Word.findByIdAndDelete(wordId);

    if (!deletedWord) {
      throw new CustomError("Word not found", 404);
    }

    return deletedWord._id.toString();
  }
}

export default WordsMongoRepository;
