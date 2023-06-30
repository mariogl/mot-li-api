import { type Request } from "express";
import { type Types } from "mongoose";

export interface WordDataRequestStructure {
  word: string;
}

export interface WordDataStructure extends WordDataRequestStructure {
  length: number;
}

export interface WordStructure extends WordDataStructure {
  _id: Types.ObjectId;
}

export interface GameDataRequestStructure extends WordDataRequestStructure {
  date: Date;
  guesses: number;
  link: string;
  linkText: string;
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
