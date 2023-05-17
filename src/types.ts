import { type Request } from "express";
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

export interface UserCredentials {
  password: string;
}

export interface UserStructure extends UserCredentials {
  _id: Types.ObjectId;
  username: string;
  lastLogin: Date;
}

export interface CustomRequest extends Request {
  userId: string;
}
