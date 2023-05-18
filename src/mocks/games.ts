import { Types } from "mongoose";
import {
  type GameDataRequestStructure,
  type GameDataStructure,
} from "../types";

export const mockGameRequests: GameDataRequestStructure[] = [
  {
    date: new Date(),
    word: "word",
    guesses: 3,
    link: "http://word.com",
    definition: "definition of the word word",
  },
  {
    date: new Date(),
    word: "potato",
    guesses: 4,
    link: "http://word.com",
    definition: "definition of the word potato",
  },
];

export const mockGames: GameDataStructure[] = mockGameRequests.map((game) => ({
  ...game,
  _id: new Types.ObjectId(),
  length: 3,
}));
