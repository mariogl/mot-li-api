import { type Types } from "mongoose";

export interface GameDataStructure {
  word: string;
  length: number;
}

export interface GameStructure extends GameDataStructure {
  _id: Types.ObjectId;
}
