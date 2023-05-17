import { type Types } from "mongoose";

export interface GameDataRequestStructure {
  word: string;
  date: Date;
  guesses: number;
  link: string;
  definition: string;
}

export interface GameDataStructure extends GameDataRequestStructure {
  length: number;
}

export interface GameStructure extends GameDataStructure {
  _id: Types.ObjectId;
}
