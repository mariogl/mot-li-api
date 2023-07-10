import { Schema, model } from "mongoose";
import { type GameStructure } from "../../types";

const gameSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  actualWord: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  guesses: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  linkText: String,
  definition: {
    type: String,
    required: true,
  },
});

const Game = model<GameStructure>("Game", gameSchema, "games");

export default Game;
