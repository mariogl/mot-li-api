import { type GameDataStructure } from "../types";

export const mockGames: GameDataStructure[] = [
  {
    date: new Date(new Date().toUTCString()),
    word: "word",
    guesses: 3,
    length: 4,
    link: "http://word.com",
    definition: "definition of the word word",
  },
  {
    date: new Date(),
    word: "potato",
    guesses: 4,
    length: 6,
    link: "http://word.com",
    definition: "definition of the word potato",
  },
];
