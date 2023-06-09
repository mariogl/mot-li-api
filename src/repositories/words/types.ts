import { type WordDataStructure, type WordStructure } from "../../types";

export interface WordsRepository {
  getWords: (length: number) => Promise<WordStructure[]>;
  addWord: (word: WordDataStructure) => Promise<WordStructure>;
  deleteWord: (wordId: string) => Promise<string>;
  doesWordExist: (word: string) => Promise<boolean>;
}
