import { type Types } from "mongoose";

export interface GameDataStructure {
  word: string;
  length: number;
  date: Date;
  guesses: number;
  link: string;
  definition: string;
}

export interface GameStructure extends GameDataStructure {
  _id: Types.ObjectId;
}
