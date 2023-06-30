import { type WordStructure } from "../../types";

export interface WordsRepository {
  getWords: (length: number) => Promise<WordStructure[]>;
}
