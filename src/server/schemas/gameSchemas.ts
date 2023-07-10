import { Joi } from "express-validation";
import { type GameDataStructure, type GameStructure } from "../../types";

export const newGameSchema = {
  body: Joi.object<GameDataStructure>({
    date: Joi.date().required(),
    word: Joi.string().required(),
    actualWord: Joi.string().required(),
    guesses: Joi.number().required(),
    link: Joi.string().required(),
    linkText: Joi.string().required(),
    definition: Joi.string().required(),
  }),
};

export const getGameByIdSchema = {
  params: Joi.object({
    gameId: Joi.string().required(),
  }),
};

export const updateGameSchema = {
  body: Joi.object<GameStructure>({
    _id: Joi.string(),
    length: Joi.number(),
    date: Joi.date().required(),
    actualWord: Joi.string().required(),
    word: Joi.string().required(),
    guesses: Joi.number().required(),
    link: Joi.string().required(),
    linkText: Joi.string().required(),
    definition: Joi.string().required(),
  }),
};

export const deleteGameSchema = {
  params: Joi.object({
    gameId: Joi.string().required(),
  }),
};
