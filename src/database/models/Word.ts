import { Schema, model } from "mongoose";
import { type WordStructure } from "../../types";

const wordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
});

const Word = model<WordStructure>("Word", wordSchema, "words");

export default Word;
