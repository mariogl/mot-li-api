import { Joi } from "express-validation";
import { type GameStructure, type GameDataStructure } from "../../types";

export const newGameSchema = {
  body: Joi.object<GameDataStructure>({
    date: Joi.date().required(),
    word: Joi.string().required(),
    guesses: Joi.number().required(),
    link: Joi.string().required(),
    definition: Joi.string().required(),
  }),
};

export const updateGameSchema = {
  body: Joi.object<GameStructure>({
    _id: Joi.string(),
    date: Joi.date().required(),
    word: Joi.string().required(),
    guesses: Joi.number().required(),
    link: Joi.string().required(),
    definition: Joi.string().required(),
  }),
};

export const deleteGameSchema = {
  params: Joi.object({
    gameId: Joi.string().required(),
  }),
};
