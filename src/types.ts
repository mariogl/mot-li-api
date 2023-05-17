import { type Types } from "mongoose";

export interface GameDataRequesStructure {
  word: string;
  date: Date;
  guesses: number;
  link: string;
  definition: string;
}

export interface GameDataStructure extends GameDataRequesStructure {
  length: number;
}

export interface GameStructure extends GameDataStructure {
  _id: Types.ObjectId;
}
