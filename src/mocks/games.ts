import { Types } from "mongoose";
import {
  type GameDataRequestStructure,
  type GameDataStructure,
} from "../types";

export const mockGameRequests: GameDataRequestStructure[] = [
  {
    date: new Date(),
    actualWord: "word",
    word: "word",
    guesses: 3,
    link: "http://word.com",
    linkText: "Link",
    definition: "definition of the word word",
  },
  {
    date: new Date(),
    actualWord: "potato",
    word: "potato",
    guesses: 4,
    link: "http://word.com",
    linkText: "Link",
    definition: "definition of the word potato",
  },
];

export const mockGames: GameDataStructure[] = mockGameRequests.map((game) => ({
  ...game,
  _id: new Types.ObjectId(),
  length: 3,
}));
