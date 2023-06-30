import { type WordStructure } from "../../types";

export interface WordsRepository {
  getWords: () => Promise<WordStructure[]>;
}
