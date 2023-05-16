import { Schema, model } from "mongoose";

const gameSchema = new Schema({
  word: {
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
  definition: {
    type: String,
    required: true,
  },
});

const Game = model("Game", gameSchema, "games");

export default Game;
